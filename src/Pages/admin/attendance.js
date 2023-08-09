import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  makeAttendence,
  setIsSubmitting,
  unsetErrors,
} from "../../store/admin/attendance";
import "./employees.css";
import {
  Form,
  Table,
  Pagination,
  Button,
  Modal,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import TitleCase from "../../helper/title-case";
import LocalTimeZone, { LocaDateFormate } from "../../helper/time-set-localtimezone";
import { CalculateRealTimePresence } from "../../helper/watch";
import CalculationLate, { CalculateEarlyLeave } from "../../helper/util";

function Attendance(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;
  const notify = props.notify;

  const [filter_date, setFilter_date] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const employeeRef = useRef();
  // const startRef = useRef();
  // const endRef = useRef();
  const data = useSelector((status) => status.attendance);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    e.preventDefault()
    const selectedStartDate = e.target.value;
    console.log("selectedStartDate:", selectedStartDate)
    // If selected start date is after the current end date, update the end date too
    if (selectedStartDate > endDate) {
      setEndDate(selectedStartDate);
    }
    setStartDate(selectedStartDate);
  };

  const handleEndDateChange = (e) => {
    e.preventDefault()
    const selectedEndDate = e.target.value;
    console.log("selectedEndDate:", selectedEndDate)
    // If selected end date is before the current start date, update the start date too
    if (selectedEndDate < startDate) {
      setStartDate(selectedEndDate);
    }
    setEndDate(selectedEndDate);
  };

  useEffect(() => {
    dispatch(getAll({ jwt, date: new Date().toISOString().substring(0, 10) }));
  }, [dispatch, jwt]);
  //...mark Attendance...//
  useEffect(() => {
    if (!data.isError) {
      setShow(false);
      dispatch(unsetErrors());
    }
  }, [data.isError, dispatch]);
  const markAttendance = async (e) => {
    e.preventDefault();
    await dispatch(setIsSubmitting(true));
    if (!navigator.geolocation) {
      notify("Geolocation is not supported by your browser");
    } else {
      await navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          makeAttendence({
            jwt,
            users: employeeRef.current.value,
            start: startDate,
            end: endDate,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      });
    }
    dispatch(setIsSubmitting(false));
  };
  //....filter.......//
  const handelFilter = (reset = false) => {
    if (reset) {
      setFilter_date(new Date().toISOString().substring(0, 10));
      dispatch(
        getAll({ jwt, date: new Date().toISOString().substring(0, 10) })
      );
    } else {
      dispatch(getAll({ jwt, date: filter_date }));
    }
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
    dispatch(getAll({ jwt, pageno: number, date: filter_date }));
  };
  //....//
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    dispatch(unsetErrors());
  };
  return (
    <div className="page-section p-4">
      <div className="employees chart">
        <div className="d-md-flex d-block justify-content-between">
          <h4 className="">Daily Attendace Report</h4>
          <Button variant="dark" onClick={() => handleShow()}>
            + Manual Attendance
          </Button>
        </div>
        <div className="row align-items-center my-2">
          <div className="col-xl-3 col-lg-4 col-12 mt-2">
            <Form.Control
              type="date"
              value={filter_date}
              onChange={(e) => {
                setFilter_date(e.target.value);
              }}
            />
          </div>
          <div className="col-xl-3 col-lg-4 col-12 mt-2">
            <Button variant="danger" onClick={() => handelFilter()}>
              Search
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="dark" onClick={() => handelFilter(true)}>
              Reset
            </Button>
          </div>
        </div>
        <Tabs
          defaultActiveKey="active"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="active" title="Active">
            <div className="responsive mt-4">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="text-white">S.No.</th>
                    <th className="text-white">Employee</th>
                    <th className="text-white">Date</th>
                    <th className="text-white">Shift</th>
                    <th className="text-white">Check&#10240;In</th>
                    <th className="text-white">Check&#10240;Out</th>
                    <th className="text-white">Late</th>
                    <th className="text-white">Early&#10240;Leaving</th>
                    <th className="text-white">Effective&#10240;Hours</th>
                    <th className="text-white">Total&#10240;Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {data.isLoading ? (
                    <tr key={0} className="text-center">
                      <td colSpan={10}>Loading...</td>
                    </tr>
                  ) : data.allData.length > 0 ? (
                    data.allData.map((result, index) => {
                      return (
                        <tr key={index}>
                          <td>{(data.currentpage - 1) * 10 + (index + 1)}</td>
                          <td>
                            <TitleCase
                              text={result.users ? result.users.name : "N/A"}
                            />
                          </td>
                          <td><LocaDateFormate date_arg={result.created_at} /></td>
                          <td>
                            <TitleCase
                              text={
                                result.timeSlot ? result.timeSlot.shift : "N/A"
                              }
                            />
                          </td>
                          <td>
                            <LocalTimeZone time={result.inTime} />
                          </td>
                          <td>
                            {
                              result.outTime ? <LocalTimeZone time={result.outTime} /> : "--:--"
                            }
                          </td>
                          <td className="text-center">
                            <CalculationLate late={result.late} />
                          </td>
                          <td className="text-center">
                            <CalculateEarlyLeave checkOut={result.outTime} outTime={result.timeSlot.time_out} />
                          </td>
                          <td>
                            <CalculateRealTimePresence
                              inTime={result.inTime}
                              outTime={result.outTime}
                              effective={result.effective_hours} />
                          </td>
                          <td>
                            <CalculateRealTimePresence
                              inTime={result.inTime}
                              outTime={result.outTime}
                              duration={result.duration} />

                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr key={0}>
                      <td colSpan={10} className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Pagination>{items}</Pagination>
            </div>
          </Tab>
        </Tabs>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Manual Attendace
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={markAttendance}>
            <Form.Group className="mb-3">
              <Form.Label>Employee</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={employeeRef}
                required
                className="form-control"
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
                      <TitleCase key="err-1" text={err.msg} />
                    ) : (
                      ""
                    )
                  )
                  : ""}
              </span>
            </Form.Group>
            {/* <Col>
                                <Form.Label>
                                    Start Date
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    className="form-control"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>
                                    End Date
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    className="form-control"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </Col> */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Check In Time <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="datetime-local"
                value={startDate}
                placeholder="Name"
                onChange={handleStartDateChange}
                required
              />
              <span className="text-danger">
                {data.errors.length > 0
                  ? data.errors.map((err) =>
                    err.param === "in_time" ? (
                      <TitleCase key="err-2" text={err.msg} />
                    ) : (
                      ""
                    )
                  )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Check Out Time <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="datetime-local"
                value={endDate}
                placeholder="Name"
                onChange={handleEndDateChange}
                required
              />
              <span className="text-danger">
                {data.errors.length > 0
                  ? data.errors.map((err) =>
                    err.param === "out_time" ? (
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
                &#10240;Mark Attendace
              </Button>
            ) : (
              <Button type="submit" variant="danger" className="mt-4">
                Mark Attendace/Update
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Attendance;
