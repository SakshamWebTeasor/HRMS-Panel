import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecord,
  getAll,
  deleteRecord,
  getOne,
  updateRecord,
  serchingData,
  unsetSingleData,
} from "../../store/admin/designation";
import "./designation.css";
import {
  Modal,
  Spinner,
  Table,
  InputGroup,
  Button,
  Form,
  Pagination,
  Tab,
  Tabs,
} from "react-bootstrap";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { debounce } from "lodash";
import Loader from "../../Components/loader";
import ReadMoreReadLess from "../../helper/readMoreReadLess";
import TitleCase from "../../helper/title-case";
import { LocaDateFormate } from "../../helper/time-set-localtimezone";

function Designation(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;
  //const notify = props.notify

  const departmentRef = useRef();
  const editDepartmentRef = useRef();
  const degRef = useRef();
  const editDegRef = useRef();
  const descriptionRef = useRef();
  const editDescriptionRef = useRef();
  const minimunRef = useRef();
  const editMinimunRef = useRef();
  const maximumRef = useRef();
  const editMaximumRef = useRef();
  const serchingKeyRef = useRef();
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const [deletedTab, setDeletedTab] = useState(false);
  const data = useSelector((status) => status.designation);

  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);

  //.... create Record ....//
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addRecord({
        jwt,
        name: degRef.current.value,
        department: departmentRef.current.value,
        description: descriptionRef.current.value,
        min_salary: minimunRef.current.value,
        max_salary: maximumRef.current.value,
        total: data.allData.length,
      })
    );
  };
  //.... update Record ....//
  useEffect(() => {
    if (
      !data.isError &&
      descriptionRef.current &&
      degRef.current &&
      minimunRef.current &&
      maximumRef.current &&
      departmentRef.current
    ) {
      setShow(false);
      dispatch(unsetSingleData());
      departmentRef.current.value = "";
      descriptionRef.current.value = null;
      degRef.current.value = null;
      minimunRef.current.value = null;
      maximumRef.current.value = null;
    }
  }, [data.isError, dispatch]);
  const update = (e) => {
    e.preventDefault();
    dispatch(
      updateRecord({
        jwt,
        id: data.singledata[0]._id,
        name: editDegRef.current.value,
        department: editDepartmentRef.current.value,
        description: editDescriptionRef.current.value,
        min_salary: editMinimunRef.current.value,
        max_salary: editMaximumRef.current.value,
      })
    );
  };
  //....numeric...//
  const handelNumberValue = (e, x = false) => {
    e.preventDefault();
    if (e.key === "e") {
      x ? (maximumRef.current.value = null) : (minimunRef.current.value = null);
      return;
    }
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
  //......pagination.......//
  ////.....all data......//
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
    if (data.isSearch)
      return dispatch(
        serchingData({
          jwt,
          pageno: number,
          searchKey: serchingKeyRef.current.value,
        })
      );
    return dispatch(
      getAll({
        jwt,
        pageno: number,
        param: data.sorting_on.field,
        x: data.sorting_on.sort,
        type: deletedTab ? "deleted" : "available ",
      })
    );
  };

  //edite...//
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (_id) => {
    setShow(true);
    dispatch(getOne(_id));
  };
  const selecthandel = (e) => {
    departmentRef.current.value = e.target.value;
  };
  //delete.....
  const handeldelete = () => {
    dispatch(
      deleteRecord({
        jwt,
        id,
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

  const handleDeleteShow = (id) => {
    setShowDelete(true);
    setId(id);
  };
  ///...///
  const handelTab = (e) => {
    if (e === "available") {
      setDeletedTab(false);
    } else {
      setDeletedTab(true);
    }
  };
  if (data.isFirstLoading) return <Loader />;
  return (
    <div className="page-section p-4">
      <div className="row">
        <div className="col-xl-4 col-lg-5 col-md-12 col-12">
          <div className="add-departmen chart">
            <h4 className="mb-4">Add New Designation</h4>
            <Form onSubmit={handelSubmit}>
              <Form.Group className="my-3">
                <Form.Label>Department</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="form-control"
                  ref={departmentRef}
                  required
                >
                  <option value={""}>Select</option>
                  {data.headAllData.length > 0
                    ? data.headAllData.map((result, index) => {
                        const { departments } = result;
                        return (
                          <optgroup key={`opt-${index}`} label={result.name}>
                            {departments.length > 0
                              ? departments.map((result, index1) => (
                                  <option key={index1} value={result.id}>
                                    {result.name}
                                  </option>
                                ))
                              : ""}
                          </optgroup>
                        );
                      })
                    : ""}
                </Form.Select>
                <span className="text-danger">
                  {data.errors.length > 0
                    ? data.errors.map((err) =>
                        err.param === "department" ? (
                          <TitleCase key={"err" + err.param} text={err.msg} />
                        ) : (
                          ""
                        )
                      )
                    : ""}
                </span>
              </Form.Group>
              <Form.Group
                className="my-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Designation Name<span className="text-danger">*</span>{" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  ref={degRef}
                  placeholder="Name"
                  required
                />
                <span className="text-danger">
                  {data.errors.length > 0
                    ? data.errors.map((err) =>
                        err.param === "name" ? (
                          <TitleCase key={"err" + err.param} text={err.msg} />
                        ) : (
                          ""
                        )
                      )
                    : ""}
                </span>
              </Form.Group>
              <Form.Group className="mb-0">
                <Form.Label>Description</Form.Label>
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
                          <TitleCase key={"err" + err.param} text={err.msg} />
                        ) : (
                          ""
                        )
                      )
                    : ""}
                </span>
              </Form.Group>
              <Form.Group className="mb-0">
                <Form.Label>Minimun Salary</Form.Label>
                <Form.Control
                  type="number"
                  ref={minimunRef}
                  onKeyUp={(e) => handelNumberValue(e)}
                  rows={3}
                  placeholder="Min salary"
                  required
                />
                <span className="text-danger">
                  {data.errors.length > 0
                    ? data.errors.map((err) =>
                        err.param === "min_salary" ? (
                          <TitleCase key={"err" + err.param} text={err.msg} />
                        ) : (
                          ""
                        )
                      )
                    : ""}
                </span>
              </Form.Group>
              <Form.Group className="mb-0">
                <Form.Label>Maximum Salary</Form.Label>
                <Form.Control
                  type="number"
                  ref={maximumRef}
                  onKeyUp={(e) => handelNumberValue(e, true)}
                  rows={3}
                  placeholder="Max salary"
                  required
                />
                <span className="text-danger">
                  {data.errors.length > 0
                    ? data.errors.map((err) =>
                        err.param === "max_salary" ? (
                          <TitleCase key={"err" + err.param} text={err.msg} />
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
            <h4 className="">Designations</h4>
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
            <Tabs
              defaultActiveKey="available"
              onSelect={handelTab}
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
                          onClick={() => handelshorting("name")}
                        >
                          Designation
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
                        <th className="text-white">Department</th>
                        <th className="text-white">Description</th>
                        <th
                          className="text-white"
                          onClick={() => handelshorting("min_salary")}
                        >
                          Min&#10240;Salary
                          {data.sorting_on.field === "min_salary" ? (
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
                        <th
                          className="text-white"
                          onClick={() => handelshorting("max_salary")}
                        >
                          Max&#10240;Salary
                          {data.sorting_on.field === "max_salary" ? (
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
                              {(data.pagination_AllData.currentpage - 1) * 10 +
                                (index + 1)}
                            </td>
                            <td>
                              <TitleCase text={result.name} />
                            </td>
                            <td>
                              <TitleCase
                                text={
                                  result.department
                                    ? result.department.name
                                    : "N/A"
                                }
                              />{" "}
                              (
                              <TitleCase
                                text={
                                  result.department
                                    ? result.department.user_head
                                    : ""
                                }
                              />
                              )
                            </td>
                            <td>
                              <ReadMoreReadLess
                                text={result.description}
                                limit={40}
                              />
                            </td>
                            <td>{result.min_salary}</td>
                            <td>{result.max_salary}</td>
                            <td><LocaDateFormate date_arg = {result.created_at}/></td>

                            <td className="d-lg-block d-flex align-items-center">
                              {result.no_of_users === 0 ? (
                                <>
                                  <Button
                                    onClick={() => {
                                      handleShow(result._id, index);
                                    }}
                                    className="btn btn-warning text-white"
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="danger"
                                    className="ms-3"
                                    onClick={() => {
                                      handleDeleteShow(result._id);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  onClick={() => {
                                    handleShow(result._id, index);
                                  }}
                                  className="btn btn-warning text-white"
                                >
                                  Edit
                                </Button>
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
                        <th className="text-white">Designation</th>
                        <th className="text-white">Department</th>
                        <th className="text-white">Description</th>
                        <th className="text-white">Min Salary</th>
                        <th className="text-white">Max Salary</th>
                        <th className="text-white">Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.deleted_allData.length > 0 ? (
                        data.deleted_allData.map((result, index) => (
                          <tr key={index}>
                            <td>
                              {(data.pagination_Deleted_AllData.currentpage -
                                1) *
                                10 +
                                (index + 1)}
                            </td>
                            <td>
                              <TitleCase text={result.name} />
                            </td>
                            <td>
                              <TitleCase
                                text={
                                  result.department
                                    ? result.department.name
                                    : "N/A"
                                }
                              />{" "}
                              (
                              <TitleCase
                                text={
                                  result.department
                                    ? result.department.user_head
                                    : ""
                                }
                              />
                              )
                            </td>
                            <td>
                              <ReadMoreReadLess
                                text={result.description}
                                limit={40}
                              />
                            </td>
                            <td>{result.min_salary}</td>
                            <td>{result.max_salary}</td>
                            <td><LocaDateFormate date_arg = {result.created_at}/></td>
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
                  <Pagination> {items1}</Pagination>
                </div>
              </Tab>
            </Tabs>
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
          <Modal.Title>Department Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={update}>
            <Form.Group className="my-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="form-control"
                onChange={(e) => selecthandel(e)}
                ref={editDepartmentRef}
                defaultValue={
                  data.singledata.length > 0
                    ? data.singledata[0].department
                      ? data.singledata[0].department._id
                      : ""
                    : ""
                }
                required
              >
                <option value={""}>Select</option>
                {data.headAllData.length > 0
                  ? data.headAllData.map((result, index) => {
                      const { departments } = result;
                      return (
                        <optgroup key={`opt-${index}`} label={result.name}>
                          {departments.length > 0
                            ? departments.map((result, index1) => (
                                <option key={index1} value={result.id}>
                                  {result.name}
                                </option>
                              ))
                            : ""}
                        </optgroup>
                      );
                    })
                  : ""}
              </Form.Select>
              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                      err.param === "department" ? (
                        <TitleCase key={"editerr" + err.param} text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Designation Name<span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                ref={editDegRef}
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
                        <TitleCase key={"editerr" + err.param} text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group className="mb-0">
              <Form.Label>Description</Form.Label>
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
                        <TitleCase key={"editerr" + err.param} text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group className="mb-0">
              <Form.Label>Minimun Salary</Form.Label>
              <Form.Control
                type="number"
                ref={editMinimunRef}
                defaultValue={
                  data.singledata.length > 0
                    ? data.singledata[0].min_salary
                    : ""
                }
                onKeyUp={(e) => handelNumberValue(e)}
                rows={3}
                placeholder="Minimun Salary"
                required
              />
              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                      err.param === "min_salary" ? (
                        <TitleCase key={"editerr" + err.param} text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group className="mb-0">
              <Form.Label>Maximum Salary</Form.Label>
              <Form.Control
                type="number"
                ref={editMaximumRef}
                defaultValue={
                  data.singledata.length > 0
                    ? data.singledata[0].max_salary
                    : ""
                }
                onKeyUp={(e) => handelNumberValue(e, true)}
                rows={3}
                placeholder="Maximum Salary"
                required
              />
              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                      err.param === "max_salary" ? (
                        <TitleCase key={"editerr" + err.param} text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            {data.isEditSubmitting ? (
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
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Designation;
