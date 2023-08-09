import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecord,
  getAll,
  deleteRecord,
  getOne,
  updateRecord,
  unsetSingleData,
  serchingData,
} from "../../store/admin/holiday";
import "./holiday.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import { Spinner } from "react-bootstrap";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { debounce } from "lodash";
import TitleCase from "../../helper/title-case";
import ReadMoreReadLess from "../../helper/readMoreReadLess";

function Holiday(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;

  const titleRef = useRef();
  const editTitleRef = useRef();
  const descriptionRef = useRef();
  const editDescriptionRef = useRef();
  const start_dateRef = useRef();
  const end_dateRef = useRef();
  const edit_start_dateRef = useRef();
  const edit_end_dateRef = useRef();
  const serchingKeyRef = useRef();
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const data = useSelector((status) => status.holiday);
  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);

  //... create holiday.....//
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addRecord({
        jwt,
        name: titleRef.current.value,
        description: descriptionRef.current.value,
        start: start_dateRef.current.value,
        end: end_dateRef.current.value,
        total: data.allData.length,
      })
    );
  };
  //...... update holiday ....//
  useEffect(() => {
    if (!data.isError) {
      setShow(false);
      dispatch(unsetSingleData());
      titleRef.current.value = null;
      descriptionRef.current.value = null;
      start_dateRef.current.value = null;
      end_dateRef.current.value = null;
    }
  }, [data.isError, dispatch]);

  const update = (e) => {
    e.preventDefault();
    dispatch(
      updateRecord({
        jwt,
        id: data.singledata[0]._id,
        name: editTitleRef.current.value,
        description: editDescriptionRef.current.value,
        start: edit_start_dateRef.current.value,
        end: edit_end_dateRef.current.value,
      })
    );
  };
  //shorting.....
  const handelshorting = (key) => {
    dispatch(getAll({ jwt, param: key, x: !data.sorting_on.sort }));
  };
  //serching.......
  const handelserching = debounce(() => {
    let searchKey = serchingKeyRef.current.value;
    if (searchKey.length === 0) {
      dispatch(getAll({ jwt }));
    }
    if (searchKey.length >= 3) {
      dispatch(serchingData({ jwt, searchKey }));
    }
  }, 500);
  //edite...//
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (_id) => {
    setShow(true);
    dispatch(getOne(_id));
  };
  //delete.....
  const handeldelete = () => {
    dispatch(
      deleteRecord({
        jwt,
        id,
        pageno:
          data.allData.length === 1 && data.currentpage > 1
            ? Number(data.currentpage) - 1
            : data.currentpage,
      })
    );
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleDeleteShow = (id) => {
    setShowDelete(true);
    setId(id);
  };
  //......pagination.......//
  const handelPagination = (number) => {
    data.isSerch
      ? dispatch(
          serchingData({
            jwt,
            pageno: number,
            searchKey: serchingKeyRef.current.value,
          })
        )
      : dispatch(
          getAll({
            jwt,
            pageno: number,
            param: data.sorting_on.field,
            x: data.sorting_on.sort,
          })
        );
  };
  let items = [];
  for (let number = 1; number <= data.totalpages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === Number(data.currentpage)}
        onClick={() => handelPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  //.......//

  return (
    <>
      <div className="page-section p-4">
        <div className="row">
          <div className="col-xl-4 col-lg-5 col-md-12 col-12">
            <div className="add-departmen chart">
              <h4 className="mb-4">Add New Holiday</h4>
              <Form onSubmit={handelSubmit}>
                <Form.Group
                  className="my-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    ref={titleRef}
                    placeholder="Name"
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "name" ? (
                            <TitleCase key={"err-1"} text={err.msg} />
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </span>
                </Form.Group>
                <Form.Group
                  className="mb-0"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    Description <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    ref={descriptionRef}
                    rows={3}
                    placeholder="Description"
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "description" ? (
                            <TitleCase key={"err-2"} text={err.msg} />
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </span>
                </Form.Group>
                <Form.Group controlId="formFile" className="mt-3">
                  <Form.Label>
                    Date <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    ref={start_dateRef}
                    type="date"
                    min="2022-01-01"
                    max="3000-01-01"
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "start_date" ? (
                            <TitleCase key={"err-3"} text={err.msg} />
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </span>
                  <p className="pt-2">To</p>
                  <Form.Control
                    ref={end_dateRef}
                    type="date"
                    min="2022-01-01"
                    max="3000-01-01"
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "end_date" ? (
                            <TitleCase key={"err-4"} text={err.msg} />
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </span>
                </Form.Group>
                {data.isSubmitting ? (
                  <Button variant="primary" className="mt-4">
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    &#10240;Save
                  </Button>
                ) : (
                  <Button type="submit" variant="danger" className="mt-4">
                    Save
                  </Button>
                )}
              </Form>
            </div>
          </div>
          <div className="col-xl-8 col-lg-7 col-md-12 col-12">
            <div className="add-departmen chart">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">List All Holidays</h4>
              </div>
              <div className="row align-items-center justify-content-between mt-4">
                <div className="col-lg-3 col-12"></div>
                <div className="col-lg-3 col-12">
                  <InputGroup className="me-3 my-lg-0 my-3">
                    <Form.Control
                      placeholder="Search...."
                      onChange={handelserching}
                      ref={serchingKeyRef}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-white">S.No.</th>
                      <th
                        className="text-white"
                        onClick={() => handelshorting("name")}
                      >
                        Name
                        {data.sorting_on.field === "name" ? (
                          data.sorting_on.sort ? (
                            <span className="text-white">
                              <IoIosArrowRoundUp />
                            </span>
                          ) : (
                            <span
                              style={{
                                color: "#fff",
                                position: "relative",
                                right: "0",
                              }}
                            >
                              <IoIosArrowRoundDown />
                            </span>
                          )
                        ) : (
                          <></>
                        )}
                      </th>
                      <th className="text-white">Description</th>
                      <th className="text-white">Date</th>
                      <th className="text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.isLoading ? (
                      <tr key={0} className="text-center">
                        <td colSpan={8}>Loading...</td>
                      </tr>
                    ) : data.allData.length > 0 ? (
                      data.allData.map((result, index) => (
                        <tr key={index}>
                          <td>{(data.currentpage - 1) * 10 + (index + 1)}</td>

                          <td>
                            <TitleCase text={result.name} />
                          </td>
                          <td>
                            <ReadMoreReadLess
                              text={result.description}
                              limit={40}
                            />
                          </td>
                          <td>
                            {result.start_date.slice(0, 10)} To{" "}
                            {result.end_date.slice(0, 10)}
                          </td>
                          <td className="d-lg-block d-flex align-items-center">
                            <Button
                              onClick={() => {
                                handleShow(result._id);
                              }}
                              className="ms-2 btn btn-warning text-white"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              className="ms-2"
                              onClick={() => {
                                handleDeleteShow(result._id);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr key={0}>
                        <td colSpan={8} className="text-center">
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
              <Pagination>{items}</Pagination>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handleDeleteClose();
              handeldelete();
            }}
          >
            Yes
          </Button>
          <Button variant="primary" onClick={handleDeleteClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={update}>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                ref={editTitleRef}
                defaultValue={
                  data.singledata.length > 0 ? data.singledata[0].name : ""
                }
                placeholder="Name"
                required
              />
              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                      err.param === "name" ? (
                        <TitleCase key={"editerr-1"} text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group
              className="mb-0"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                Description <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                ref={editDescriptionRef}
                defaultValue={
                  data.singledata.length > 0
                    ? data.singledata[0].description
                    : ""
                }
                rows={3}
                placeholder="Description"
                required
              />
              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                      err.param === "description" ? (
                        <TitleCase key={"editerr-2"} text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            <div className="d-block align-items-center justify-content-between">
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>
                  Date <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  ref={edit_start_dateRef}
                  defaultValue={
                    data.singledata.length > 0
                      ? data.singledata[0].start_date.slice(0, 10)
                      : ""
                  }
                  type="date"
                  min="2022-01-01"
                  max="3000-01-01"
                  required
                />
                <span className="text-danger">
                  {data.editErrors.length > 0
                    ? data.editErrors.map((err) =>
                        err.param === "start_date" ? (
                          <TitleCase key={"editerr-3"} text={err.msg} />
                        ) : (
                          ""
                        )
                      )
                    : ""}
                </span>
                <p className="pt-2">To</p>
                <Form.Control
                  ref={edit_end_dateRef}
                  defaultValue={
                    data.singledata.length > 0
                      ? data.singledata[0].end_date.slice(0, 10)
                      : ""
                  }
                  type="date"
                  min="2022-01-01"
                  max="3000-01-01"
                  required
                />
                <span className="text-danger">
                  {data.editErrors.length > 0
                    ? data.editErrors.map((err) =>
                        err.param === "end_date" ? (
                          <TitleCase key={"editerr-4"} text={err.msg} />
                        ) : (
                          ""
                        )
                      )
                    : ""}
                </span>
              </Form.Group>
            </div>
            {data.isEditSubmit ? (
              <Button variant="primary" className="mt-4">
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                &#10240;Update
              </Button>
            ) : (
              <Button type="submit" variant="danger" className="mt-4">
                Update
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Holiday;
