import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecord,
  getAll,
  deleteRecord,
  getOne,
  updateRecord,
  serchingData,
  unsetSingleData,
} from "../../store/admin/department";
import "./departments.css";
import {
  Spinner,
  Modal,
  Table,
  Pagination,
  InputGroup,
  Button,
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";
import { debounce } from "lodash";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import Loader from "../../Components/loader";
import TitleCase from "../../helper/title-case";
import { LocaDateFormate } from "../../helper/time-set-localtimezone";

function Departments(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;
  //const notify = props.notify

  const [deletedDepTab, setDeletedDepTab] = useState(false);
  const [deletedTab, setDeletedTab] = useState(false);

  const [isHead, setIsHead] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState();
  const [index, setIndex] = useState();
  const [show, setShow] = useState(false);
  const nameRef = useRef();
  const departmentRef = useRef();
  const editeNameREf = useRef();
  const editeDepartmentRef = useRef();
  const serchingKeyRef = useRef();
  const data = useSelector((status) => status.department);
  useEffect(() => {
    dispatch(getAll({ jwt, firstTime: true }));
  }, [dispatch, jwt]);
  
  
  //...... Create Submit ......//

  const handelsubmit = (e) => {
    console.log('in handle Submit for Add new department')
    e.preventDefault();
    dispatch(
      addRecord({
        jwt,
        name: nameRef.current.value,
        dep: departmentRef.current.value,
        total: data.allData.length,
      })
    );
    departmentRef.current.value = "";
    nameRef.current.value = "";
  };
  //.... Update Submit ....//
  useEffect(() => {
    if (!data.isError) {
      setShow(false);
      dispatch(unsetSingleData());
    }
  }, [data.isError, dispatch]);
  const update =  (e) => {
    e.preventDefault();
    dispatch(
      updateRecord({
        jwt,
        id: data.singledata[0]._id,
        index,
        name: editeNameREf.current.value,
        dep: !isHead ? editeDepartmentRef.current.value : "empty",
      })
    );
  };
  //shorting.....
  const handelshorting = (key) => {
    dispatch(
      getAll({ jwt, param: key, x: !data.sorting_on.sort, firstTime: true })
    );
  };
  //serching.......
  const handelserching = debounce(() => {
    let searchKey = serchingKeyRef.current.value;
    if (searchKey.length === 0) dispatch(getAll({ jwt, firstTime: true }));
    if (searchKey.length >= 3) {
      dispatch(serchingData({ jwt, searchKey }));
    }
  }, 500);
  //***********************//
  //******pagination*******//
  //***********************//
  //....all head...//
  let items = [];
  for (
    let number = 1;
    number <= data.pagination_headAllData.totalpages;
    number++
  ) {
    items.push(
      <Pagination.Item
        key={`head` + number}
        active={number === data.pagination_headAllData.currentpage}
        onClick={() => handelPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  //....deleted head....//
  let items1 = [];
  for (
    let number = 1;
    number <= data.pagination_Deleted_headAllData.totalpages;
    number++
  ) {
    items1.push(
      <Pagination.Item
        key={`head-delete` + number}
        active={number === data.pagination_Deleted_headAllData.currentpage}
        onClick={() => handelPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  //.....all department ...//
  let items2 = [];
  for (let number = 1; number <= data.pagination_AllData.totalpages; number++) {
    items2.push(
      <Pagination.Item
        key={`all` + number}
        active={number === data.pagination_AllData.currentpage}
        onClick={() => handelPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  //.....deleted department...//
  let items3 = [];
  for (
    let number = 1;
    number <= data.pagination_Deleted_AllData.totalpages;
    number++
  ) {
    items3.push(
      <Pagination.Item
        key={`all-delete` + number}
        active={number === data.pagination_Deleted_AllData.currentpage}
        onClick={() => handelPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  const handelPagination = (number) => {
    if (data.isSearch && !isHead && !deletedDepTab) {
      return dispatch(
        serchingData({
          jwt,
          pageno: number,
          searchKey: serchingKeyRef.current.value,
        })
      );
    } else {
      if (isHead) {
        return dispatch(
          getAll({
            jwt,
            pageno: number,
            param: data.sorting_on.field,
            x: data.sorting_on.sort,
            isHead,
            type: deletedTab ? "deleted" : "available",
          })
        );
      } else {
        return dispatch(
          getAll({
            jwt,
            pageno: number,
            param: data.sorting_on.field,
            x: data.sorting_on.sort,
            type: deletedDepTab ? "deleted" : "available",
          })
        );
      }
    }
  };
  //edite...//
  const handleClose = () => {
    setShow(false);
    dispatch(unsetSingleData());
  };
  const handleShow = (_id, index) => {
    setShow(true);
    setIndex(index);
    dispatch(getOne({ _id, isHead }));
  };
  //delete.....
  const handeldelete = () => {
    dispatch(deleteRecord({ jwt, id, index, isHead,  }));
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
  };

  const handleDeleteShow = (id, index) => {
    setShowDelete(true);
    setId(id);
    setIndex(index);
  };
  //.......//
  const tabChange = () => {
    setDeletedDepTab(false);
    setDeletedTab(false);
    setIsHead(!isHead);
  };
  const handelTab = (e) => {
    if (isHead) {
      if (e === "available") {
        setDeletedTab(false);
      } else {
        setDeletedTab(true);
      }
    } else {
      if (e === "available") {
        setDeletedDepTab(false);
      } else {
        setDeletedDepTab(true);
      }
    }
  };

  if (data.isFirstLoading) return <Loader />;
  return (
    <div className="page-section p-4">
      <div className="row">
        <div className="col-xl-4 col-lg-5 col-md-12 col-12">
          <div className="add-departmen chart">
            <h4 className="mb-4">Add New Department</h4>
            <Form onSubmit={handelsubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Name <span className="text-danger">*</span>{" "}
                </Form.Label>
                <Form.Control type="text" ref={nameRef} placeholder="Name" />
                <span className="text-danger">
                  {data.errors.length > 0
                    ? data.errors.map((err) =>
                        err.param === "user_head" ? (
                          <TitleCase text={err.msg} />
                        ) : (
                          ""
                        )
                      )
                    : ""}
                </span>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Department Head </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="form-control"
                  ref={departmentRef}
                >
                  <option value={""}>Select</option>
                  <option value={"empty"}>---</option>
                  {data.headData.length > 0
                    ? data.headData.map(
                        (result, index) =>
                          !result.is_deleted && (
                            <option key={index} value={result._id}>
                              <TitleCase text={result.name} />
                            </option>
                          )
                      )
                    : ""}
                </Form.Select>
                <span className="text-danger">
                  {data.errors.length > 0
                    ? data.errors.map((err) =>
                        err.param === "name" ? <TitleCase text={err.msg} /> : ""
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
            <h4 className="">{isHead ? "Head" : "Departments"}</h4>
            <div className="row align-items-center justify-content-between my-4">
              <div className="col-lg-3 col-12">
                <Button
                  onClick={tabChange}
                  className="btn btn-warning text-white"
                >
                  {isHead ? "Department" : "Head"}
                </Button>
              </div>
              <div className="col-lg-3 col-12">
                {!isHead && (
                  <InputGroup className="me-3 my-lg-0 my-3">
                    <Form.Control
                      placeholder="Search...."
                      onChange={handelserching}
                      ref={serchingKeyRef}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                  </InputGroup>
                )}
              </div>
            </div>
            {!isHead && (
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
                            Department&#10240;Name
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
                          <th
                            className="text-white"
                            onClick={() => handelshorting("user_head")}
                          >
                            Department&#10240;Head
                            {data.sorting_on.field === "user_head" ? (
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
                                {(data.pagination_AllData.currentpage - 1) *
                                  10 +
                                  (index + 1)}
                              </td>
                              <td>
                                <TitleCase text={result.name} />
                              </td>
                              <td>
                                <TitleCase text={result.user_head} />
                              </td>
                              <td><LocaDateFormate date_arg = {result.created_at}/></td>
                              <td className="d-lg-block d-flex align-items-center">
                                {result.is_deleted ? (
                                  "Deleted"
                                ) : result.no_of_designation === 0 ? (
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
                                        handleDeleteShow(result._id, index);
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
                    <Pagination> {items2}</Pagination>
                  </div>
                </Tab>
                <Tab eventKey="deleted" title="Deleted">
                  <div className="responsive mt-4">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th className="text-white">S.No.</th>
                          <th className="text-white">Department&#10240;Name</th>
                          <th className="text-white">Department&#10240;Head</th>
                          <th className="text-white">Created At</th>
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
                                <TitleCase text={result.name} />
                              </td>
                              <td>
                                <TitleCase text={result.user_head} />
                              </td>
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
                    <Pagination> {items3}</Pagination>
                  </div>
                </Tab>
              </Tabs>
            )}
            {isHead && (
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
                          <th className="text-white">Department&#10240;Head</th>
                          <th className="text-white">Created&#10240;At</th>
                          <th className="text-white">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.isLoading ? (
                        <tr key={0} className="text-center">
                          <td colSpan={8}>Loading...</td>
                        </tr>
                      ) : data.headAllData.length > 0 ? (
                          data.headAllData.map((result, index) => (
                            <tr key={index}>
                              <td>
                                {(data.pagination_headAllData.currentpage - 1) *
                                  10 +
                                  (index + 1)}
                              </td>
                              <td>{result.name}</td>
                              <td><LocaDateFormate date_arg = {result.created_at}/></td>
                              <td className="d-lg-block d-flex align-items-center">
                                {result.is_deleted ? (
                                  "Deleted"
                                ) : result.no_of_designation === 0 ? (
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
                                        handleDeleteShow(result._id, index);
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
                    <Pagination> {items}</Pagination>
                  </div>
                </Tab>
                <Tab eventKey="deleted" title="deleted">
                  <div className="responsive mt-4">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th className="text-white">S.No.</th>
                          <th className="text-white">Department&#10240;Head</th>
                          <th className="text-white">Created&#10240;At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.isLoading ? (
                        <tr key={0} className="text-center">
                          <td colSpan={8}>Loading...</td>
                        </tr>
                      ) : data.deleted_headAllData.length > 0 ? (
                          data.deleted_headAllData.map((result, index) => (
                            <tr key={index}>
                              <td>
                                {(data.pagination_Deleted_headAllData
                                  .currentpage -
                                  1) *
                                  10 +
                                  (index + 1)}
                              </td>
                              <td>{result.name}</td>
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
            )}
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
          <Modal.Title>{!isHead ? "Department" : "Head"} Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={update}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Name <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                ref={editeNameREf}
                defaultValue={
                  data.singledata.length > 0 ? data.singledata[0].name : ""
                }
                placeholder="Name"
              />
              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                      err.param === "name" ? <TitleCase text={err.msg} /> : ""
                    )
                  : ""}
              </span>
            </Form.Group>
            {!isHead && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Department Head </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="form-control"
                    ref={editeDepartmentRef}
                    defaultValue={
                      data.singledata.length > 0
                        ? data.singledata[0].user_head._id
                        : ""
                    }
                  >
                    {data.headData.length > 0
                      ? data.headData.map((result, index) => (
                          <option key={index} value={result._id}>
                            {result.name}
                          </option>
                        ))
                      : ""}
                  </Form.Select>
                  <span className="text-danger">
                    {data.editErrors.length > 0
                      ? data.editErrors.map((err) =>
                          err.param === "user_head" ? (
                            <TitleCase text={err.msg} />
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </span>
                </Form.Group>
              </>
            )}
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
    </div>
  );
}

export default Departments;
