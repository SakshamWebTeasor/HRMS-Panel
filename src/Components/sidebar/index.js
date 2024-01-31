import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineHome, 
  AiOutlineApartment,
  AiOutlineAim,
} from "react-icons/ai";
import {
  HiUserGroup,
  HiOutlineCurrencyRupee,
  HiOutlineDocumentReport,
} from "react-icons/hi";
import { RiBuilding2Fill } from "react-icons/ri";
import { FaBullhorn, FaBusinessTime } from "react-icons/fa";
import {
  MdOutlineFormatTextdirectionLToR,
  MdPolicy,
  MdOutlineHolidayVillage,
  MdOutlineNetworkWifi
} from "react-icons/md";
import { GoPin } from "react-icons/go";
import { FcLeave } from "react-icons/fc";
import { FaFileInvoice } from "react-icons/fa";
import "./index.css";

function Sidebar(props) {
  const socket = props.socket
  const location = useLocation();

  const [isActive, setIsActive] = useState(location.pathname);
  //..... set active when router change.....//
  useEffect(() => {
    setIsActive(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const url =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];
    setIsActive(`/${url}`);
  }, []);

  //.. when click on announcement and policy 
  const clickOnPolicy = ()=>{
    setIsActive("/policy")
    socket.emit('clean-notice', {status:'policy'})
    props.setPolicy_New_notice(false)
  }
  const clickOnAnnouncement = ()=>{
    setIsActive("/announcement")
    socket.emit('clean-notice', {status:'announcement'})
    props.setAnnouncement_New_notice(false)
  }
  const clickOnleave = () =>{
    setIsActive("/leave-request")
    socket.emit('clean-notice', {status:'leave'})
    props.setLeave_new_notice(false)
  }
  useEffect(()=>{
    socket.emit('check_notice')
    socket.emit('check_notice_admin')
  })
  return (
    <>
      <div className="sidebar d-md-block d-none">
        <ul>
          {props.current_user.is_admin ? (
            <>
              <Link to="/">
                <li
                  className={isActive === "/" ? "active" : ""}
                  onClick={() => setIsActive("/")}
                >
                  <AiOutlineHome />
                  <span className="ms-2">Home</span>
                </li>
              </Link>
              <Link to="/employees">
                <li
                  className={isActive === "/employees" ? "active" : ""}
                  onClick={() => setIsActive("/employees")}
                >
                  <HiUserGroup />
                  <span className="ms-2">Employees</span>
                </li>
              </Link>
              <Link to="/departments">
                <li
                  className={isActive === "/departments" ? "active" : ""}
                  onClick={() => setIsActive("/departments")}
                >
                  <RiBuilding2Fill />
                  <span className="ms-2">Department</span>
                </li>
              </Link>
              <Link to="/designation">
                <li
                  className={isActive === "/designation" ? "active" : ""}
                  onClick={() => setIsActive("/designation")}
                >
                  <AiOutlineApartment />
                  <span className="ms-2">Designation</span>
                </li>
              </Link>
              <Link to="/invoice">
                <li
                  className={isActive === "/invoice" ? "active" : ""}
                  onClick={() => setIsActive("/invoice")}
                >
                  <FaFileInvoice />
                  <span className="ms-2">Invoice</span>
                </li>
              </Link>
              <Link to="/policies">
                <li
                  className={isActive === "/policies" ? "active" : ""}
                  onClick={() => setIsActive("/policies")}
                >
                  <AiOutlineAim />
                  <span className="ms-2">Policies</span>
                </li>
              </Link>
              <Link to="/announcement">
                <li
                  className={isActive === "/announcement" ? "active" : ""}
                  onClick={() => setIsActive("/announcement")}
                >
                  <FaBullhorn />
                  <span className="ms-2">Make Announcement</span>
                </li>
              </Link>
              <Link to="/attendance">
                <li
                  className={isActive === "/attendance" ? "active" : ""}
                  onClick={() => setIsActive("/attendance")}
                >
                  <MdOutlineFormatTextdirectionLToR />
                  <span className="ms-2">Attendance</span>
                </li>
              </Link>
              <Link to="/monthly-report">
                <li
                  className={isActive === "/monthly-report" ? "active" : ""}
                  onClick={() => setIsActive("/monthly-report")}
                >
                  <HiOutlineDocumentReport />
                  <span className="ms-2">Monthly Report</span>
                </li>
              </Link>
              <Link to="/office-shift">
                <li
                  className={isActive === "/office-shift" ? "active" : ""}
                  onClick={() => setIsActive("/office-shift")}
                >
                  <FaBusinessTime />
                  <span className="ms-2">Office Shift</span>
                </li>
              </Link>
              <Link to="/payroll">
                <li
                  className={isActive === "/payroll" ? "active" : ""}
                  onClick={() => setIsActive("/payroll")}
                >
                  <HiOutlineCurrencyRupee />
                  <span className="ms-2">Payroll</span>
                </li>
              </Link>
              <Link to="/leave-request">
                <li
                  className={isActive === "/leave-request" ? "active" : ""}
                  onClick={clickOnleave}
                >
                  <GoPin />
                  <span className="ms-2">Leave Request</span>
                  {props.leave_new_notice && <span className="counter-box">{props.totalLeave}</span>}
                </li>
              </Link>
              <Link to="/leave-type">
                <li
                  className={isActive === "/leave-type" ? "active" : ""}
                  onClick={() => setIsActive("/leave-type")}
                >
                  <FcLeave />
                  <span className="ms-2">Leave Type</span>
                </li>
              </Link>
              <Link to="/holiday">
                <li
                  className={isActive === "/holiday" ? "active" : ""}
                  onClick={() => setIsActive("/holiday")}
                >
                  <MdOutlineHolidayVillage />
                  <span className="ms-2">Holiday</span>
                </li>
              </Link>
              <Link to="/ip">
                <li
                  className={isActive === "/ip" ? "active" : ""}
                  onClick={() => setIsActive("/ip")}
                >
                  <MdOutlineNetworkWifi />
                  <span className="ms-2">White List IP</span>
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <li
                  className={isActive === "/" ? "active" : ""}
                  onClick={() => setIsActive("/")}
                >
                  <AiOutlineHome />
                  <span className="ms-2">Home</span>
                </li>
              </Link>
              <Link to="/attendance">
                <li
                  className={isActive === "/attendance" ? "active" : ""}
                  onClick={() => setIsActive("/attendance")}
                >
                  <MdOutlineFormatTextdirectionLToR />
                  <span className="ms-2">Attendance</span>
                </li>
              </Link>
              <Link to="/leave">
                <li
                  className={isActive === "/leave" ? "active" : ""}
                  onClick={() => setIsActive("/leave")}
                >
                  <GoPin />
                  <span className="ms-2">Leave</span>
                </li>
              </Link>
              <Link to="/salary">
                <li
                  className={isActive === "/salary" ? "active" : ""}
                  onClick={() => setIsActive("/salary")}
                >
                  <HiOutlineCurrencyRupee />
                  <span className="ms-2">Salary</span>
                </li>
              </Link>
              <Link to="/policy">
                <li
                  className={isActive === "/policy" ? "active" : ""}
                  onClick={clickOnPolicy}
                >
                  <MdPolicy />
                  <span className="ms-2">Policy</span>
                  {props.policy_New_notice && <span className="counter-box">{props.totalPolicy}</span>}
                </li>
              </Link>
              <Link to="/announcement">
                <li
                  className={isActive === "/announcement" ? "active" : ""}
                  onClick={clickOnAnnouncement}
                >
                  <FaBullhorn />
                  <span className="ms-2">Announcement</span>
                  {props.announcement_New_notice && <span className="counter-box">{props.totalAnnoun}</span>}
                </li>
              </Link>
              <Link to="/holiday">
                <li
                  className={isActive === "/holiday" ? "active" : ""}
                  onClick={() => setIsActive("/holiday")}
                >
                  <MdOutlineHolidayVillage />
                  <span className="ms-2">Holiday</span>
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
