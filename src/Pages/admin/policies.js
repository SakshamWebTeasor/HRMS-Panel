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
} from "../../store/admin/policies";
import "./policies.css";
import {
  Form,
  Button,
  InputGroup,
  Table,
  Modal,
  Pagination,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { debounce } from "lodash";
import TitleCase from "../../helper/title-case";
import ReadMoreReadLess from "../../helper/readMoreReadLess";
import { LocaDateFormate } from "../../helper/time-set-localtimezone";

function Policies(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;
  //const notify = props.notify

  const titleRef = useRef();
  const editTitleRef = useRef();
  const descriptionRef = useRef();
  const editDescriptionRef = useRef();
  const fileRef = useRef();
  const editFileRef = useRef();
  const serchingKeyRef = useRef();
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [index, setIndex] = useState();
  const [file, setFile] = useState();
  const [deletedTab, setDeletedTab] = useState(false);
  const data = useSelector((status) => status.policy);

  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);

  //... create ....//

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addRecord({
        jwt,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        file: fileRef.current.files[0],
        total: data.allData.length,
      })
    );
  };
  //.....update...//
  useEffect(() => {
    if (
      !data.isError &&
      titleRef.current &&
      fileRef.current &&
      descriptionRef.current
    ) {
      setShow(false);
      dispatch(unsetSingleData());
      titleRef.current.value = null;
      descriptionRef.current.value = null;
      fileRef.current.value = null;
    }
  }, [data.isError, dispatch]);
  const handelEditSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateRecord({
        jwt,
        id: data.singledata[0]._id,
        index,
        description: editDescriptionRef.current.value,
        title: editTitleRef.current.value,
        file: editFileRef.current.files[0],
        attachment_path: data.singledata[0].attachment_path,
        attachment_link: data.singledata[0].attachment_link,
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
    if (searchKey.length === 0) dispatch(getAll({ jwt }));
    if (searchKey.length >= 3) {
      dispatch(serchingData({ jwt, searchKey }));
    }
  }, 500);
  //edite...//
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (_id, index) => {
    setShow(true);
    setIndex(index);
    dispatch(getOne(_id));
    titleRef.current.value = null;
    descriptionRef.current.value = null;
    fileRef.current.value = null;
  };
  //delete.....
  const handeldelete = () => {
    dispatch(
      deleteRecord({
        jwt,
        id,
        fileName: file,
        pageno:
          data.allData.length === 1 && data.pagination_AllData.currentpage > 1
            ? Number(data.pagination_AllData.currentpage) - 1
            : data.pagination_AllData.currentpage,
      })
    );
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleDeleteShow = (id, file, index) => {
    setShowDelete(true);
    setFile(file);
    setId(id);
    setIndex(index);
  };
  //......pagination.......//
  let items = [];
  for (let number = 1; number <= data.pagination_AllData.totalpages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === data.pagination_AllData.currentpage}
        onClick={() => handelPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  //...... deleted data ........//
  let items1 = [];
  for (
    let number = 1;
    number <= data.pagination_Deleted_AllData.totalpages;
    number++
  ) {
    items1.push(
      <Pagination.Item
        key={`deleted-` + number}
        active={number === data.pagination_Deleted_AllData.currentpage}
        onClick={() => handelPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  const handelPagination = (number) => {
    if (data.isSearch && !deletedTab) {
      return dispatch(
        serchingData({
          jwt,
          pageno: number,
          searchKey: serchingKeyRef.current.value,
        })
      );
    }
    return dispatch(
      getAll({
        jwt,
        pageno: number,
        param: data.sorting_on.field,
        x: data.sorting_on.sort,
        type: deletedTab ? "deleted" : "available",
      })
    );
  };

  //.......//
  const handelTab = (e) => {
    if (e === "available") {
      setDeletedTab(false);
    } else {
      setDeletedTab(true);
    }
  };
  return (
    <>
      <div className="page-section p-4">
        <div className="row">
          <div className="col-xl-4 col-lg-5 col-md-12 col-12">
            <div className="add-departmen chart">
              <h4 className="mb-4">Add New Policy</h4>
              <Form onSubmit={handelSubmit}>
                <Form.Group
                  className="my-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Title <span className="text-danger">*</span>{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    ref={titleRef}
                    placeholder="Title"
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "title" ? (
                            <TitleCase key="err-1" text={err.msg} />
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
                    required
                    placeholder="Description"
                  />
                  <span className="text-danger">
                    {data.isError && data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "description" ? (
                            <TitleCase key="err-2" text={err.msg} />
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </span>
                </Form.Group>
                <Form.Group controlId="formFile" className="mt-3">
                  <Form.Label>
                    Attachment{" "}
                    <span className="text-danger">* (.pdf, .jpg, .jpeg)</span>
                  </Form.Label>
                  <Form.Control
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg|image/*|application/pdf"
                    required
                  />
                  <span className="text-danger">
                    {data.isError && data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "file" ? (
                            <TitleCase key="err-3" text={err.msg} />
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
                <h4 className="mb-0">List All Policies</h4>
              </div>
              <div className="row align-items-center justify-content-between my-4">
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
              <Tabs
                onSelect={handelTab}
                defaultActiveKey="available"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="available" title="Available">
                  <div className="responsive mt-4">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th className="text-white">S.No.</th>
                          <th
                            className="text-white"
                            onClick={() => handelshorting("title")}
                          >
                            Title
                            {data.sorting_on.field === "title" ? (
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
                          <th
                            className="text-white"
                            onClick={() => handelshorting("created_at")}
                          >
                            Created&#10240;At
                            {data.sorting_on.field === "created_at" ? (
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
                              <td>
                                {(data.pagination_AllData.currentpage - 1) *
                                  10 +
                                  (index + 1)}
                              </td>

                              <td>
                                <TitleCase text={result.title} />
                              </td>
                              <td>
                                <ReadMoreReadLess
                                  text={result.description}
                                  limit={30}
                                />
                              </td>
                              <td><LocaDateFormate date_arg = {result.created_at}/></td>
                              <td className="d-lg-block d-flex align-items-center">
                                {!result.is_deleted ? (
                                  <>
                                    <Button
                                      onClick={() => {
                                        handleShow(result._id, index);
                                      }}
                                      className="ms-2 btn btn-warning text-white"
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="danger"
                                      className="ms-2"
                                      onClick={() => {
                                        handleDeleteShow(
                                          result._id,
                                          result.attachment_path,
                                          index
                                        );
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </>
                                ) : (
                                  "Deleted"
                                )}
                                {result.attachment_link ? (
                                  <a
                                    href={result.attachment_link}
                                    className="ms-2 btn btn-success text-white"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Open
                                  </a>
                                ) : (
                                  <></>
                                )}
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
                  <Pagination> {items}</Pagination>
                </Tab>
                <Tab eventKey="deleted" title="Deleted">
                  <div className="responsive mt-4">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th className="text-white">S.No.</th>
                          <th className="text-white">Title</th>
                          <th className="text-white">Description</th>
                          <th className="text-white">Created&#10240;At</th>
                          <th className="text-white">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.isLoading ? (
                          <tr key={0} className="text-center">
                            <td colSpan={8}>Loading...</td>
                          </tr>
                        ) : data.deleted_allData.length > 0 ? (
                          data.deleted_allData.map((result, index) => (
                            <tr key={index}>
                              <td>
                                {(data.pagination_Deleted_AllData.currentpage -
                                  1) *
                                  10 +
                                  (index + 1)}
                              </td>

                              <td>
                                <TitleCase text={result.title} />
                              </td>
                              <td>
                                <ReadMoreReadLess
                                  text={result.description}
                                  limit={30}
                                />
                              </td>
                              <td><LocaDateFormate date_arg = {result.created_at}/></td>
                              <td className="d-lg-block d-flex align-items-center">
                                {result.attachment_link ? (
                                  <a
                                    href={result.attachment_link}
                                    className="ms-2 btn btn-success text-white"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Open
                                  </a>
                                ) : (
                                  <></>
                                )}
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
                  <Pagination> {items1}</Pagination>
                </Tab>
              </Tabs>
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
          <Modal.Title>Edit Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handelEditSubmit}>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Title <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                ref={editTitleRef}
                defaultValue={
                  data.singledata.length > 0 ? data.singledata[0].title : ""
                }
                placeholder="Title"
                required
              />
              <span className="text-danger">
                {data.isError && data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                      err.param === "title" ? (
                        <TitleCase key="editerr-1" text={err.msg} />
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
                {data.isError && data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                      err.param === "description" ? (
                        <TitleCase key="editerr-2" text={err.msg} />
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
                  Attachment{" "}
                  <span className="text-danger"> (only .pdf, .jpg, .jpeg)</span>
                </Form.Label>
                <Form.Control
                  ref={editFileRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg|image/*|application/pdf"
                />
              </Form.Group>
            </div>
            {data.isEditSubmitting ? (
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

export default Policies;
