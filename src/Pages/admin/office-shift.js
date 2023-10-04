import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecord,
  getAll,
  updateStatus,
  getOne,
  updateRecord,
} from "../../store/admin/timeSlot";
import "./designation.css";
import { Spinner, Modal, Table, Button, Form } from "react-bootstrap";
import TitleCase from "../../helper/title-case";
import LocalTimeZone, { LocaDateFormate } from "../../helper/time-set-localtimezone";

function OfficeShift(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;

  const shiftRef = useRef();
  const lunchTimetRef = useRef();
  const startRef = useRef();
  const endRef = useRef();
  const editEndRef = useRef();
  const editShiftRef = useRef();
  const editStartRef = useRef();
  const editLunchTimetRef = useRef();

  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);
  const data = useSelector((status) => status.timeSlot);
  //...submit....//
  const handelSubmit = (e) => {
    e.preventDefault();
    let start = new Date()
    let x = (startRef.current.value).split(':')
    start.setHours(parseInt(x[0]))
    start.setMinutes(parseInt(x[1]))
    start.setSeconds(0);
    let end = new Date()
    let y = (endRef.current.value).split(':')
    end.setHours(parseInt(y[0]))
    end.setMinutes(parseInt(y[1]))
    end.setSeconds(0);

    dispatch(
      addRecord({
        jwt,
        shift: shiftRef.current.value,
        startTime: start,
        endTime: end,
        lunchTime: lunchTimetRef.current.value,
      })
    );
    // shiftRef.current.value = "";
    // startRef.current.value = null;
    // endRef.current.value = null;
    // lunchTimetRef.current.value = null;
  };
  //... Update submit ...//
  useEffect(() => {
    if (!data.isError) {
      setShow(false);
      shiftRef.current.value = "";
      startRef.current.value = null;
      endRef.current.value = null;
      lunchTimetRef.current.value = null;
    }
  }, [data.isError]);
  const update = (e) => {
    e.preventDefault();
    let start = new Date()
    let x = (editStartRef.current.value).split(':')
    start.setHours(parseInt(x[0]))
    start.setMinutes(parseInt(x[1]))
    start.setSeconds(0);
    let end = new Date()
    let y = (editEndRef.current.value).split(':')
    end.setHours(parseInt(y[0]))
    end.setMinutes(parseInt(y[1]))
    end.setSeconds(0);

    console.log(start, end)
    dispatch(
      updateRecord({
        jwt,
        id: data.singledata[0]._id,
        shift: editShiftRef.current.value,
        startTime: start,
        endTime: end,
        lunchTime: editLunchTimetRef.current.value,
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

  return (
    <>
      <div className="page-section p-4">
        <div className="row">
          <div className="col-xl-4 col-lg-5 col-md-12 col-12">
            <div className="add-departmen chart">
              <h4 className="mb-4">Add New Office Shift</h4>
              <Form onSubmit={handelSubmit}>
                <Form.Group className="my-3">
                  <Form.Label>
                    Shift <span className="text-danger">*</span>{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    aria-label="Default select example"
                    placeholder="Shift Name"
                    ref={shiftRef}
                    required
                  />

                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                        err.param === "shift" ? (
                          <TitleCase key="err-1" text={err.msg} />
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
                    Office Time <span className="text-danger">*</span>{" "}
                  </Form.Label>
                  <Form.Control
                    type="time"
                    ref={startRef}
                    placeholder="Title"
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                        err.param === "time_in" ? (
                          <TitleCase key="err-2" text={err.msg} />
                        ) : (
                          ""
                        )
                      )
                      : ""}
                  </span>
                  <p className="pt-2">To</p>
                  <Form.Control
                    type="time"
                    ref={endRef}
                    placeholder="Name"
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                        err.param === "time_out" ? (
                          <TitleCase key="err-3" text={err.msg} />
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
                    Lunch Duration(HH:MM) <span className="text-danger">*</span>{" "}
                  </Form.Label>
                  <Form.Control
                    type="time"
                    ref={lunchTimetRef}
                    placeholder="enter time"
                    required
                  />
                  <span className="text-danger">
                    {data.errors.length > 0
                      ? data.errors.map((err) =>
                        err.param === "lunch_time" ? (
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
                <h4 className="mb-0">List All Office Shift</h4>
              </div>
              <div className="responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-white">S.No.</th>
                      <th className="text-white">Shift</th>
                      <th className="text-white">
                        Office&#10240;Timing
                      </th>
                      <th className="text-white">
                        Lunch&#10240;Time
                      </th>
                      <th className="text-white">Created&#10240;At</th>
                      <th className="text-white">Status</th>
                      <th className="text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.isLoading ? (
                      <tr key={0} className="text-center">
                        <td colSpan={7}>Loading...</td>
                      </tr>
                    ) : data.allData.length > 0 ? (
                      data.allData.map((result, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <TitleCase text={result.shift} />
                            </td>
                            <td>
                              <LocalTimeZone time={result.time_in} />
                              &#10240;-&#10240;
                              <LocalTimeZone time={result.time_out} />
                            </td>
                            <td>{result.lunch_time}</td>
                            <td><LocaDateFormate date_arg={result.created_at} /></td>
                            <td>
                              <p
                                className={
                                  result.active ? "text-success" : "text-danger"
                                }
                              >
                                {result.active ? "Active" : "Block"}
                              </p>
                            </td>
                            <td className="d-flex align-items-center">
                              <Button
                                onClick={() => {
                                  handleShow(result._id);
                                }}
                                className="btn btn-warning text-white"
                              >
                                Edit
                              </Button>
                              {!result.is_deleted && (
                                <Button
                                  onClick={() =>
                                    dispatch(
                                      updateStatus({
                                        jwt,
                                        id: result._id,
                                        active: !result.active,
                                        data: result,
                                        index,
                                      })
                                    )
                                  }
                                  className={
                                    !result.active
                                      ? "btn btn-primary text-white ms-2"
                                      : "btn btn-danger text-white ms-2"
                                  }
                                  variant={!result.active ? "primary" : "danger"}
                                >
                                  {!result.active ? "Active" : "Block"}
                                </Button>
                              )}
                            </td>
                          </tr>
                        )
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
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Office Timeing </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={update}>
            <Form.Group className="my-3">
              <Form.Label>
                Shift <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                aria-label="Default select example"
                placeholder="Shift Name"
                ref={editShiftRef}
                defaultValue={
                  data.singledata.length > 0 ? data.singledata[0].shift : ""
                }
                required
              />

              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                    err.param === "shift" ? (
                      <TitleCase key="editerr-1" text={err.msg} />
                    ) : (
                      ""
                    )
                  )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Office Time <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="time"
                ref={editStartRef}
                defaultValue={
                  data.singledata.length > 0 ? LocalTimeZone({ time: data.singledata[0].time_in }) : ""
                }
                placeholder="Name"
                required
              />
              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                    err.param === "time_in" ? (
                      <TitleCase key="editerr-2" text={err.msg} />
                    ) : (
                      ""
                    )
                  )
                  : ""}
              </span>
              <p className="pt-2">To</p>
              <Form.Control
                type="time"
                ref={editEndRef}
                defaultValue={
                  data.singledata.length > 0 ? LocalTimeZone({ time: data.singledata[0].time_out }) : ""
                }
                placeholder="Name"
                required
              />
              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                    err.param === "time_out" ? (
                      <TitleCase key="editerr-3" text={err.msg} />
                    ) : (
                      ""
                    )
                  )
                  : ""}
              </span>
            </Form.Group>
            <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Lunch Time <span className="text-danger">*</span>{" "}
              </Form.Label>
              <Form.Control
                type="time"
                defaultValue={
                  data.singledata.length > 0
                    ? data.singledata[0].lunch_time
                    : ""
                }
                ref={editLunchTimetRef}
                placeholder="enter time"
                required
              />
              <span className="text-danger">
                {data.editErrors.length > 0
                  ? data.editErrors.map((err) =>
                    err.param === "lunch_time" ? (
                      <TitleCase key="editerr-4" text={err.msg} />
                    ) : (
                      ""
                    )
                  )
                  : ""}
              </span>
            </Form.Group>
            {data.isEditSubmitting ? (
              <Button variant="danger" className="mt-4">
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

export default OfficeShift;
