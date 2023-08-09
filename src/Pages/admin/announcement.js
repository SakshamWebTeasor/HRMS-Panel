import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  deleteRecord,
  addRecord,
  getOne,
  unsetSingleData,
  updateRecord,
  getAllByDepartment,
  serchingData,
} from "../../store/admin/announcement";
import "./employees.css";
import {
  Pagination,
  Table,
  InputGroup,
  Button,
  Form,
  Modal,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { debounce } from "lodash";
import TitleCase from "../../helper/title-case";
import ReadMoreReadLess from "../../helper/readMoreReadLess";

function Announcement(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;

  const [deletedTab, setDeletedTab] = useState(false);
  const [id, setId] = useState();
  const [index, setIndex] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const titleRef = useRef();
  const departmentRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const descriptionRef = useRef();
  const fileRef = useRef();
  const serchingKeyRef = useRef();
  const filterRef = useRef();
  const data = useSelector((status) => status.announcement);
  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);
  //submit....
  useEffect(() => {
    if (!data.isError) {
      setShow(false);
      filterRef.current.value = "";
    }
  }, [data.isError]);
  const handelSubmit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      //....create new Record....//
      dispatch(
        addRecord({
          jwt,
          title: titleRef.current.value,
          department: departmentRef.current.value,
          description: descriptionRef.current.value,
          start_date: startRef.current.value,
          end_date: endRef.current.value,
          file: fileRef.current.files[0],
          total: data.allData.length,
        })
      );
    } else {
      //....update new Record....//
      dispatch(
        updateRecord({
          jwt,
          id: data.singledata[0]._id,
          index,
          old_file_path: data.singledata[0].file_path,
          old_file_link: data.singledata[0].file_link,
          title: titleRef.current.value,
          department: departmentRef.current.value,
          description: descriptionRef.current.value,
          start_date: startRef.current.value,
          end_date: endRef.current.value,
          file: fileRef.current.files[0],
        })
      );
    }
  };
  //shorting.....
  const handelshorting = (key) => {
    dispatch(getAll({ jwt, param: key, x: !data.sorting_on.sort }));
    filterRef.current.value = "";
  };
  //serching......
  const handelserching = debounce(() => {
    let searchKey = serchingKeyRef.current.value;
    if (searchKey.length === 0) dispatch(getAll({ jwt }));
    if (searchKey.length >= 3) {
      dispatch(serchingData({ jwt, searchKey }));
    }
    filterRef.current.value = "";
  }, 500);
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
    setFile();
    setId();
  };

  const handleDeleteShow = (id, file) => {
    setShowDelete(true);
    setFile(file);
    setId(id);
  };
  //edite...//
  const handleClose = () => {
    setShow(false);
    setIsEdit(false);
    dispatch(unsetSingleData());
  };
  const handleShow = (_id, index, edit = false) => {
    setShow(true);
    if (edit) {
      setIsEdit(true);
      setIndex(index);
      dispatch(getOne(_id));
    }
  };
  //......pagination.......//
  //....all data....//
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
    if (data.isSearch && !deletedTab)
      return dispatch(
        serchingData({
          jwt,
          pageno: number,
          searchKey: serchingKeyRef.current.value,
        })
      );
    if (data.isfilter && !deletedTab)
      return dispatch(
        getAllByDepartment({ jwt, pageno: number, id: data.filter })
      );

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
  const filter = (e) => {
    if (e.target.value)
      dispatch(getAllByDepartment({ id: e.target.value, jwt }));
    else dispatch(getAll({ jwt }));
  };
  const handelTab = (e) => {
    if (e === "available") {
      setDeletedTab(false);
    } else {
      setDeletedTab(true);
    }
  };
  return (
    <div className="page-section p-4">
      <div className="employees chart">
        <div className="d-md-flex d-block justify-content-between align-items-center">
          <h4 className="">Announcements</h4>
          <Button variant="danger" onClick={handleShow}>
            + Add New
          </Button>
        </div>
        <div className="row align-items-center justify-content-between mt-4">
          <div className="col-lg-3 col-12">
            <Form.Select
              ref={filterRef}
              onChange={(e) => filter(e)}
              aria-label="Default select example"
            >
              <option value={""}>Departments</option>
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
          </div>
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
          <Tabs
            onSelect={handelTab}
            defaultActiveKey="available"
            id="uncontrolled-tab-example"
            className="my-3 ms-2"
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
                      <th className="text-white">Department</th>
                      <th className="text-white">Description</th>
                      <th
                        className="text-white"
                        onClick={() => handelshorting("start_date")}
                      >
                        Start&#10240;Date
                        {data.sorting_on.field === "start_date" ? (
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
                        onClick={() => handelshorting("end_date")}
                      >
                        End&#10240;Date
                        {data.sorting_on.field === "end_date" ? (
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
                            <TitleCase text={result.title} />
                          </td>
                          <td>
                            <TitleCase
                              text={
                                result.department
                                  ? result.department.name
                                  : "All"
                              }
                            />
                          </td>
                          <td>
                            <ReadMoreReadLess
                              text={result.description}
                              limit={50}
                            />
                          </td>
                          <td>{result.start_date.slice(0, 10)}</td>
                          <td>{result.end_date.slice(0, 10)}</td>
                          <td className="d-lg-block d-flex align-items-center">
                            {!result.is_deleted && (
                              <>
                                <Button
                                  onClick={() => {
                                    handleShow(result._id, index, true);
                                  }}
                                  className="btn btn-warning text-white"
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  className="ms-2"
                                  onClick={() => {
                                    handleDeleteShow(
                                      result._id,
                                      result.file_path
                                    );
                                  }}
                                >
                                  Delete
                                </Button>
                              </>
                            )}
                            {result.file_link ? (
                              <a
                                href={result.file_link}
                                className="ms-2 btn btn-success text-white"
                                target="_blank"
                                rel="noreferrer"
                              >
                                View
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
                      <th className="text-white">Department</th>
                      <th className="text-white">Description</th>
                      <th className="text-white">Start Date</th>
                      <th className="text-white">End Date</th>
                      <th className="text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.isLoading ? (
                      <tr key={0} className="text-center">
                        <td colSpan={7}>Loading...</td>
                      </tr>
                    ) : data.deleted_allData.length > 0 ? (
                      data.deleted_allData.map((result, index) => (
                        <tr key={index}>
                          <td>
                            {(data.pagination_Deleted_AllData.currentpage - 1) *
                              10 +
                              (index + 1)}
                          </td>
                          <td>
                            <TitleCase text={result.title} />
                          </td>
                          <td>
                            <TitleCase
                              text={
                                result.department
                                  ? result.department.name
                                  : "All"
                              }
                            />
                          </td>
                          <td>
                            <ReadMoreReadLess
                              text={result.description}
                              limit={50}
                            />
                          </td>
                          <td>{result.start_date.slice(0, 10)}</td>
                          <td>{result.end_date.slice(0, 10)}</td>
                          <td>
                            {result.file_link ? (
                              <a
                                href={result.file_link}
                                className="ms-2 btn btn-success text-white"
                                target="_blank"
                                rel="noreferrer"
                              >
                                View
                              </a>
                            ) : (
                              <></>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr key={0}>
                        <td colSpan={7} className="text-center">
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? "Edit Announcement" : "Add New Announcement"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handelSubmit}>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Title<span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                ref={titleRef}
                required
                defaultValue={
                  data.singledata.length > 0 ? data.singledata[0].title : ""
                }
                placeholder="Title"
              />
              <span className="text-danger">
                {data.isError && data.errors.length > 0
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
            <Form.Label>
              Department <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              className="form-control"
              defaultValue={
                data.singledata.length > 0
                  ? data.singledata[0].department
                    ? data.singledata[0].department._id
                    : "all"
                  : "all"
              }
              ref={departmentRef}
            >
              <option value={""}>Select</option>
              <option value={"all"}>All</option>
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
            <Form.Group
              className="mb-0"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                Description <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={
                  data.singledata.length > 0
                    ? data.singledata[0].description
                    : ""
                }
                ref={descriptionRef}
                required
                rows={3}
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
            <Form.Group
              className="mb-0"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                Start Date <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                defaultValue={
                  data.singledata.length > 0
                    ? data.singledata[0].start_date.substring(0, 10)
                    : ""
                }
                ref={startRef}
                required
                rows={3}
                placeholder="Start date"
              />
              <span className="text-danger">
                {data.isError && data.errors.length > 0
                  ? data.errors.map((err) =>
                      err.param === "start_date" ? (
                        <TitleCase key="err-3" text={err.msg} />
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
                End Date <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="date"
                defaultValue={
                  data.singledata.length > 0
                    ? data.singledata[0].end_date.substring(0, 10)
                    : ""
                }
                ref={endRef}
                required
                rows={3}
                placeholder="End date"
              />
              <span className="text-danger">
                {data.isError && data.errors.length > 0
                  ? data.errors.map((err) =>
                      err.param === "end_date" ? (
                        <TitleCase key="err-3" text={err.msg} />
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
                <span className="text-danger">
                  {!isEdit && "*"} (only image/pdf)
                </span>
              </Form.Label>
              <Form.Control
                ref={fileRef}
                type="file"
                accept=".pdf,.jpg,.jpeg|image/*|application/pdf"
              />
              <span className="text-danger">
                {data.isError && data.errors.length > 0
                  ? data.errors.map((err) =>
                      err.param === "file" ? (
                        <TitleCase key="err-4" text={err.msg} />
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
                &#10240;{isEdit ? "Update" : "Save"}
              </Button>
            ) : (
              <Button type="submit" variant="danger" className="mt-4">
                {isEdit ? "Update" : "Save"}
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
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
    </div>
  );
}

export default Announcement;
