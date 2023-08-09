import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, getReport } from "../../store/admin/monthly-report";
import "./monthly-report.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Loader from "../../Components/loader";
//import User from "../../assets/images/user.jpg";
import TitleCase from "../../helper/title-case";
import { Dropdown, Spinner } from "react-bootstrap";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import LocalTimeZone, {
  LocaDateFormate
} from "../../helper/time-set-localtimezone";
import { CSVLink } from "react-csv";

function Monthlyreport(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;
  const notify = props.notify;

  const employeeRef = useRef();
  const start_dateRef = useRef();
  const end_dateRef = useRef();
  const data = useSelector((status) => status.monthlyReport);
  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);
  //...submit.....//
  const handelSubmit = (e) => {
    e.preventDefault();
    if (!end_dateRef.current.value || !start_dateRef.current.value)
      return notify("Please Select All Fields", true);
    dispatch(
      getReport({
        jwt,
        user_id: employeeRef.current.value,
        start_date: start_dateRef.current.value,
        end_date: end_dateRef.current.value,
      })
    );
  };
  //...//
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData, {
      skipHeader: true,
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  //....//

  if (data.isLoding) return <Loader />;
  return (
    <div className="page-section p-4">
      <form onSubmit={handelSubmit}>
        <div className="page-section chart mt-1 p-4">
          <h4 className="mb-4">Monthly Report</h4>
          <div className="row align-items-center">
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <div className="add-departmen ">
                <Form.Label>Employee</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  ref={employeeRef}
                  className="form-control"
                >
                  <option value={""}>All</option>
                  {data.allUserData.length > 0
                    ? data.allUserData.map(
                        (result, index) =>
                          !result.is_deleted && (
                            <option key={index} value={result._id}>
                              {result.name}({result.email})
                            </option>
                          )
                      )
                    : ""}
                </Form.Select>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <Form.Label>From</Form.Label>
              <Form.Group controlId="duedate">
                <Form.Control
                  type="date"
                  name="start_date"
                  ref={start_dateRef}
                  placeholder="Due date"
                />
              </Form.Group>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <Form.Label>To</Form.Label>
              <Form.Group controlId="duedate">
                <Form.Control
                  type="date"
                  name="end_date"
                  ref={end_dateRef}
                  placeholder="Due date"
                />
              </Form.Group>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              {!data.isSubmiting ? (
                <Button variant="danger" type="submit" className="mt-4">
                  Search
                </Button>
              ) : (
                <Button
                  variant="danger"
                  type="submit"
                  className="mt-4"
                  disabled
                >
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Search
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
     
        {data.isAvailable ? (
           <div className="responsive chart mt-4">
            <div className="d-flex justify-content-between">
              {data.attendance_all_sheet.length > 0 ? (
                
                <div className="ms-auto mb-2">
                  <Dropdown>
                    <Dropdown.Toggle className="text-white" variant="danger" id="dropdown-basic">
                      Download
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/excel" onClick={(e) =>
                            exportToCSV(data.attendance_all_sheet, "attendance")
                          }>
                          Excel
                      </Dropdown.Item>
                      <Dropdown.Item href="#/csv">
                      <CSVLink
                        data={data.attendance_all_sheet}
                        filename={'monthly-report'}> CSV</CSVLink>
                      </Dropdown.Item>
                      {/* <Dropdown.Item href="#/csv">
                        PDF
                      </Dropdown.Item> */}
                      
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : (
                <></>
              )}
            </div>

            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-white">S.No.</th>
                  <th className="text-white">Name</th>
                  <th className="text-white">Designation</th>
                  <th className="text-white">Office Shift</th>
                  <th className="text-white">Date</th>
                  <th className="text-white">Late</th>
                  <th className="text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.reportAllData.length > 0 ? (
                  data.reportAllData.map((result, index) => {
                    return (
                      <tr
                        className={
                          result.status === "absent"
                            ? "table-danger"
                            : result.status === "leave"
                            ? "table-info"
                            : result.status === "weekend"
                            ? "table-warning"
                            : ""
                        }
                        key={index}
                      >
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex">
                            {/* <img
                              src={
                                result.users.image_link
                                  ? result.users.image_link
                                  : User
                              }
                              alt="User"
                              className="img-fluid rounded-circle"
                              style={{ width: "40px", height: "40px" }}
                            /> */}
                            <div className="ms-3">
                              <h6 className="mb-0 ">
                                <TitleCase text={result.users.name} />
                              </h6>
                              <small className="mb-0 text-muted">
                                {result.users.email}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <div className="ms-3">
                              <h6 className="mb-0 ">
                                <TitleCase
                                  text={result.users.designation.name}
                                />
                              </h6>
                              <small className="mb-0 text-muted">
                                <TitleCase
                                  text={
                                    result.users.designation.department.name
                                  }
                                />
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <div className="ms-3">
                              <h6 className="mb-0 ">
                                <TitleCase text={result.timeSlot.shift} />
                              </h6>
                              <small className="mb-0 text-muted">
                                <LocalTimeZone time={result.timeSlot.time_in} />
                                &#10240; To &#10240;
                                <LocalTimeZone
                                  time={result.timeSlot.time_out}
                                />
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex">
                            <div className="ms-3">
                              <h6 className="mb-0 ">
                                <LocaDateFormate date_arg={result.created_at} />
                              </h6>
                              <small className="mb-0 text-muted">
                                {result.status === "present" && (
                                  <>
                                    <LocalTimeZone time = {result.inTime}/>
                                    &#10240; To &#10240;
                                    {result.outTime ? (
                                      <LocalTimeZone time = {result.outTime}/>
                                    ) : (
                                      "--:--"
                                    )}
                                  </>
                                )}
                                {result.status !== "present" && (
                                  <TitleCase text={result.status} />
                                )}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          {result.status === "present" &&
                          result.late !== "ONTIME"
                            ? `${result.late} hrs`
                            : result.late}
                          {result.status !== "present" && (
                            <TitleCase text={result.status} />
                          )}
                        </td>
                        <td>
                          {result.half_day && result.status === "present" ? (
                            <h6 className="mb-0 ">Half Day</h6>
                          ) : (
                            result.status === "present" && (
                              <h6 className="mb-0 ">Full Day</h6>
                            )
                          )}
                          {result.status !== "present" && (
                            <TitleCase text={result.status} />
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr key={-1}>
                    <td colSpan={8} className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}
      </div>
  );
}

export default Monthlyreport;
