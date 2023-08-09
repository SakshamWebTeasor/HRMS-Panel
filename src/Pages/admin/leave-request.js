import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  aproveLeave,
  leaveApply,
  unsetError,
} from "../../store/admin/leave";
import "./dashboard.css";
import User from "../../assets/images/user.jpg";
import {
  Table,
  Form,
  Button,
  Pagination,
  Modal,
  Spinner,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import Loader from "../../Components/loader";
import TitleCase from "../../helper/title-case";
import ReadMoreReadLess from "../../helper/readMoreReadLess";
import { LocaDateFormate } from "../../helper/time-set-localtimezone";

function LeaveRequest(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;

  const remarkRef = useRef();
  const employeeRef = useRef();
  const typeRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const reasonRef = useRef();
  const addRemarkRef = useRef();
  const [halfday, setHalfday] = useState(false)
  const [id, setId] = useState();
  const [applyshow, applyshowSetShow] = useState(false);
  const [isApproved, setIsApproved] = useState();
  const [show, setShow] = useState(false);
  const data = useSelector((status) => status.leave);
  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);

  //.....Leave Apply.......//
  useEffect(() => {
    if (!data.isError) {
      applyshowSetShow(false);
      dispatch(unsetError());
    }
  }, [data.isError, dispatch]);
  const handelSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      leaveApply({
        jwt,
        user_id: employeeRef.current.value,
        leave_type: typeRef.current.value,
        start: startRef.current.value,
        end: endRef.current.value,
        reason: reasonRef.current.value,
        remark: addRemarkRef.current.value,
        halfday
      })
    );
  };
  //......pagination.......//
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
  const handelPagination = (number) => {
    dispatch(getAll({ jwt, pageno: number }));
  };
  //.....leave approve...//
  const handelLeaveApprove = () => {
    dispatch(
      aproveLeave({ jwt, id, isApproved, remark: remarkRef.current.value })
    );
    setShow(false);
  };
  //....open....//
  const handelOpen = (id, status) => {
    setShow(true);
    setId(id);
    setIsApproved(status);
  };
  //.....closed ....//
  const handleClose = () => {
    setShow(false);
  };
  //model open......
  const applyhandleClose = () => {
    applyshowSetShow(false);
    dispatch(unsetError());
  };
  //model open......
  const [remark, setRemark] = useState();
  const [approved_by, setApproved_by] = useState(null);
  const [showremark, setShowRemark] = useState(false);
  const remarkHandel = (remark, approvedBy) => {
    setRemark(remark);
    setApproved_by(approvedBy);
    setShowRemark(true);
  };
  //.....close remark....//
  const handlaRemarkClose = () => {
    setShowRemark(false);
    setRemark();
    setApproved_by(null);
  };
  const checkedHalfDayOrNot =(e)=>{
    setHalfday(e.target.checked)
  }
  if (data.isFirstLoading) return <Loader />;
  return (
    <div className="page-section p-4">
      <div className="chart mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Leave Requests</h4>
          <Button
            variant="danger"
            onClick={() => {
              applyshowSetShow(true);
            }}
          >
            + Apply Leave
          </Button>
        </div>
        <div className="row align-items-center justify-content-between mt-4"></div>
        <div className="responsive mt-4">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-white">S.No.</th>
                <th className="text-white">Employee</th>
                <th className="text-white">Leave&#10240;Type</th>
                <th className="text-white">Reason</th>
                <th className="text-white">Leave&#10240;Duration</th>
                <th className="text-white">Days</th>
                <th className="text-white">Applied&#10240;On</th>
                <th className="text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.isLoading ? (
                <tr key={0} className="text-center">
                  <td colSpan={8}>Loading...</td>
                </tr>
              ) : data.allData.length > 0 ? (
                data.allData.map((result, index) => {
                  return (
                    <tr key={index}>
                      <td>{(data.currentpage - 1) * 10 + (index + 1)}</td>
                      <td>
                        <Link to={"/leave-request/" + result.users._id}>
                          <div className="d-flex">
                            <img
                              src={User}
                              alt="User"
                              className="img-fluid rounded-circle"
                              style={{ width: "40px", height: "40px" }}
                            />
                            <div className="ms-3">
                              <h6 className="mb-0 ">
                                <TitleCase
                                  text={result.users ? result.users.name : ""}
                                />
                              </h6>
                              <small className="mb-0 text-muted">
                                {result.users ? result.users.email : ""}
                              </small>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <TitleCase text={result.type.name} />
                      </td>
                      <td>
                        <ReadMoreReadLess text={result.reason} limit={20} />
                      </td>
                      <td>
                        <LocaDateFormate date_arg = {result.start_date}/>
                        &#10240;To&#10240;
                        <LocaDateFormate date_arg = {result.end_date}/>
                      </td>
                      <td>
                        {result.half_day?'Half Day':result.end_date && result.start_date
                          ? (new Date(result.end_date).getTime() -
                              new Date(result.start_date).getTime()) /
                              (1000 * 3600 * 24) +
                            1
                          : "N/A"}
                      </td>

                      <td><LocaDateFormate date_arg = {result.created_at}/></td>
                      <td>
                        {result.status === "pending" ? (
                          <>
                            <Button
                              className="btn btn-success text-white"
                              onClick={() => handelOpen(result._id, true)}
                            >
                              {" "}
                              Approve{" "}
                            </Button>
                            <Button
                              className="btn btn-warning text-white ms-3"
                              onClick={() => handelOpen(result._id, false)}
                            >
                              {" "}
                              Reject{" "}
                            </Button>
                          </>
                        ) : (
                          <u
                            className={
                              result.status === "approved"
                                ? "text-success"
                                : "text-danger"
                            }
                            onClick={() => remarkHandel(result.remark, result.approved_by)}
                          >
                            <TitleCase text={result.status} />{" "}
                          </u>
                        )}
                      </td>
                    </tr>
                  );
                })
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
      <Modal show={applyshow} onHide={applyhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leave Apply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handelSubmit}>
            <Form.Group>
              <Form.Label>Leave Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={typeRef}
                className="form-control"
                required
              >
                <option value={""}>Select</option>
                {data.allLeaveType.length > 0
                  ? data.allLeaveType.map(
                      (result, index) =>
                        !result.is_deleted && (
                          <option key={index} value={result._id}>
                            {result.name}
                          </option>
                        )
                    )
                  : ""}
              </Form.Select>
              <span className="text-danger">
                {data.errors.length > 0
                  ? data.errors.map((err) =>
                      err.param === "type" ? (
                        <TitleCase key="err-1" text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group>
              <Form.Label>Employee</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={employeeRef}
                className="form-control"
                required
              >
                <option value={""}>Select</option>
                {data.alluser.length > 0
                  ? data.alluser.map(
                      (result, index) =>
                        !result.is_deleted && (
                          <option key={index} value={result._id}>
                            {result.name}({result.email})
                          </option>
                        )
                    )
                  : ""}
              </Form.Select>
              <span className="text-danger">
                {data.errors.length > 0
                  ? data.errors.map((err) =>
                      err.param === "users" ? (
                        <TitleCase key="err-2" text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Duration<span className="text-danger">*</span>{" "}
              </Form.Label>
              <div className="d-flex align-items-center justify-contant-between">
                <div className="w-100">
                  <Form.Control
                    type="date"
                    ref={startRef}
                    placeholder="Start date"
                    min="2022-01-01"
                    max="3000-01-01"
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "start_date" ? (
                            <TitleCase key="err-3" text={err.msg} />
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </span>
                </div>
                  <p className="pt-2">To</p>
                <div className="w-100">
                  <Form.Control
                    type="date"
                    ref={endRef}
                    placeholder="end Date"
                    min="2022-01-01"
                    max="3000-01-01"
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                          err.param === "end_date" ? (
                            <TitleCase key="err-4" text={err.msg} />
                          ) : (
                            ""
                          )
                        )
                      : ""}
                  </span>
                </div>
              </div>
            </Form.Group>
            <Form.Group>
                <div className="radio-btns mt-0">
                    <div key={`default-checkbox`} className="mb-3">
                        <Form.Check
                        type="checkbox"
                        onChange={checkedHalfDayOrNot}
                        label="Half Day"
                        />
                    </div>
                </div>
            </Form.Group>
            <Form.Group
              className="mb-0"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Leave Reason</Form.Label>
              <Form.Control
                as="textarea"
                ref={reasonRef}
                rows={3}
                placeholder="Reason"
                required
              />
              <span className="text-danger">
                {data.errors.length > 0
                  ? data.errors.map((err) =>
                      err.param === "reason" ? (
                        <TitleCase key="err-5" text={err.msg} />
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group className="mb-0">
              <Form.Label>Leave Remark</Form.Label>
              <Form.Control
                as="textarea"
                ref={addRemarkRef}
                rows={3}
                placeholder="Remark"
                required
              />
              <span className="text-danger">
                {data.errors.length > 0
                  ? data.errors.map((err) =>
                      err.param === "remark" ? (
                        <TitleCase key="err-6" text={err.msg} />
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
                &#10240;Apply
              </Button>
            ) : (
              <Button type="submit" variant="danger" className="mt-4">
                Apply
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leave {isApproved ? "Approve" : "Reject"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              ref={remarkRef}
              rows={3}
              placeholder={
                "enter remark for " + (isApproved ? "Approve" : "Reject")
              }
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handelLeaveApprove();
            }}
          >
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showremark} onHide={handlaRemarkClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remark By {approved_by?approved_by.name:"HR"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{remark}</pre>
        </Modal.Body>
      </Modal>
      <Outlet />
    </div>
  );
}

export default LeaveRequest;
