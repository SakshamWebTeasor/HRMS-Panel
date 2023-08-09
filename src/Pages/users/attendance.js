import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../store/user/attendance";
import "./attendance.css";
import { Table, Button } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TitleCase from "../../helper/title-case";
import LocalTimeZone, { LocaDateFormate } from "../../helper/time-set-localtimezone";
import CalculationLate, { CalculateEarlyLeave } from "../../helper/util";

function Attendance(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;

  const [startDate, setStartDate] = useState(new Date());
  const data = useSelector((status) => status.userAttendance);
  useEffect(() => {
    dispatch(getAll({ jwt, month: `${startDate.getFullYear()}-${startDate.getMonth()+1}` }));
  }, [dispatch, jwt, startDate]);
  //...... filter ......//
  const resetFilter = () => {
    dispatch(getAll({ jwt }));
    setStartDate();
  };
  const dateChange = (date1) => {
    setStartDate(date1);
    const date = new Date(date1);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (year === 1970) return dispatch(getAll({ jwt }));
    dispatch(getAll({ jwt, month: `${year}-${month}` }));
  };
  //......pagination.......//
  let items = [];
  for (let number = 1; number <= data.totalpages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === data.currentpage}
        onClick={() => handelPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  const handelPagination = (number) => {
    dispatch(getAll({ jwt, pageno: number }));
  };
  return (
    <div className="page-section p-4">
      <div className="employees chart">
        <h4 className="mb-0">Monthly Attendace Report</h4>
        <div className="row align-items-center justify-content-between my-4">
          <div className="col-lg-3 col-12">
            <div className="d-flex align-items-center">
              <DatePicker
                selected={startDate}
                onChange={(date) => dateChange(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="All Days"
              />
              <Button onClick={resetFilter}>Reset</Button>
            </div>
          </div>
        </div>
        <div className="responsive mt-4">
          <Table striped bordered hover>
            <thead>
              <tr key='heading'>
                <th className="text-white">S.No.</th>
                <th className="text-white">Date</th>
                <th className="text-white">Shift</th>
                <th className="text-white">Check&#10240;IN</th>
                <th className="text-white">Check&#10240;OUT</th>
                <th className="text-white">Late</th>
                <th className="text-white">Early Leaving</th>
                <th className="text-white">Effective&#10240;Work</th>
                <th className="text-white">Total&#10240;Work</th>
              </tr>
            </thead>
            <tbody>
              {data.isLoading ? (
                <tr key={`o-loading`} className="text-center">
                  <td colSpan={8}>Loading...</td>
                </tr>
              ) : data.allData.length > 0 ? (
                data.allData.map((result, index) => {
                  return(<>              
                  { result.status==="present" && 
                      <tr key={`present-${index}`}>
                          <td>{(index + 1)}</td>
                          <td><LocaDateFormate date_arg = {result.created_at}/></td>
                          <td>
                            <TitleCase
                              text={result.timeSlot ? result.timeSlot.shift : "N/A"}
                            />
                          </td>
                          <td>
                            <LocalTimeZone time = {result.inTime}/>
                          </td>
                          <td>
                            { 
                                result.outTime? <LocalTimeZone time = {result.outTime}/>:"--:--"
                            }
                          </td>
                          <td className="text-center">
                            <CalculationLate late = {result.late}/>
                          </td>
                          <td className="text-center">
                            <CalculateEarlyLeave checkOut = {result.outTime} outTime = {result.timeSlot.time_out}/>
                          </td>
                          <td>
                            {result.effective_hours
                              ? `${result.effective_hours}`
                              : "--:--"}
                          </td>
                          <td>
                            {result.duration
                              ? `${result.duration}`
                              : "--:--"}
                          </td>
                          </tr>
                      }
                      { result.status !== "present" && 
                          <tr key={`absent-${index}`} className={result.status==="absent"?"table-danger":result.status==="leave"?"table-info":"table-warning"}>
                            <td>{(index + 1)}</td>
                            <td><LocaDateFormate date_arg = {result.created_at}/></td>
                            <td colSpan={7} className="text-center" ><TitleCase text ={result.status}/></td>
                          </tr>
                      }
                    </> )})
              ) : (
                <tr key={`0-nodata`}>
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
  );
}

export default Attendance;
