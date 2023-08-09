import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "./store/auth";
import {io} from "socket.io-client"
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


import Loader from "./Components/loader";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sidebar from "./Components/sidebar";
import WhiteListIP from "./Pages/admin/white-list-ip";

const env = require('./env.json');

const Login = React.lazy(() => import("./Pages/Login"));
const Dashboard = React.lazy(() => import("./Pages/admin/dashboard"));
const PresentAbsent = React.lazy(()=>import('./Pages/admin/components/employee-present-absent-details'))
const Employees = React.lazy(() => import("./Pages/admin/employees"));
const Departments = React.lazy(() => import("./Pages/admin/departments"));
const Designation = React.lazy(() => import("./Pages/admin/designation"));
const Policies = React.lazy(() => import("./Pages/admin/policies"));
const Holiday = React.lazy(() => import("./Pages/admin/holiday"));
const Announcement = React.lazy(() => import("./Pages/admin/announcement"));
const Attendance = React.lazy(() => import("./Pages/admin/attendance"));

const Monthlyreport = React.lazy(() => import("./Pages/admin/monthly-report"));
const OfficeShift = React.lazy(() => import("./Pages/admin/office-shift"));
const Payroll = React.lazy(() => import("./Pages/admin/payroll"));
const LeaveRequest = React.lazy(() => import("./Pages/admin/leave-request"));
const LeaveDetails = React.lazy(() => import("./Pages/admin/leave-details"));
const LeaveType = React.lazy(() => import("./Pages/admin/laave-type"));

const Dashboardemployee = React.lazy(() => import("./Pages/users/dashboard"));
const Attendanceemployee = React.lazy(() => import("./Pages/users/attendance"));
const LeaveRequestemployee = React.lazy(() => import("./Pages/users/leave"));
const Financeemployee = React.lazy(() => import("./Pages/users/salary"));
const Announcementemployee = React.lazy(() => import("./Pages/users/announcement"));
const Policiyemployee = React.lazy(() => import("./Pages/users/policies"));
const Holidayemployee = React.lazy(() => import("./Pages/users/holiday"));
const Profileemployee = React.lazy(() => import("./Pages/profile"));


const notify = (x, iserror = false) =>
  iserror
    ? toast.error(x, { theme: "colored" })
    : toast.success(x, { theme: "colored" });

// Socket connection 
  
  const socket = io(env.BASE_URL)

function App() {
  const dispatch = useDispatch()

  const [announcement_New_notice, setAnnouncement_New_notice] = useState(false)
  const [totalAnnoun, setTotalAnnoun] = useState()
  const [policy_New_notice, setPolicy_New_notice] = useState(false)
  const [totalPolicy, setTotalPlicy] = useState()
  const [leave_new_notice, setLeave_new_notice] = useState(false)
  const [totalLeave, setTotalLeave] = useState()

  useEffect(() => {
    dispatch(isLogin());
  }, [dispatch]);
  const data = useSelector((status) => status.auth);



  return (
    <>
      {data.isAuthenticated ? (
        <Header notify={notify} current_user={data.current_user} jwt={data.jwt}/>
      ) : (
        <></>
      )}

      <div className="row gx-0">
        {data.isAuthenticated ?(
          <>
            <div className="col-xl-2 col-lg-3 col-md-4 col-12">
              <Sidebar 
                socket= {socket}
                totalAnnoun={totalAnnoun} 
                totalPolicy={totalPolicy} 
                totalLeave = {totalLeave}
                setAnnouncement_New_notice={setAnnouncement_New_notice}
                setPolicy_New_notice ={setPolicy_New_notice}
                setLeave_new_notice = {setLeave_new_notice}
                policy_New_notice={policy_New_notice} 
                announcement_New_notice={announcement_New_notice} 
                leave_new_notice = {leave_new_notice}
                current_user={data.current_user} />
            </div>
            <div className="col-xl-10 col-lg-9 col-md-8 col-12">
              <Suspense fallback={<Loader />}>
                {data.current_user.is_admin ? (
                  <Routes>
                    <Route 
                      path="/" element={ <Dashboard jwt={data.jwt}
                      setLeave_new_notice = {setLeave_new_notice}
                      setTotalLeave = {setTotalLeave}
                      socket = {socket}
                      current_user={data.current_user} />
                      }
                    />
                    <Route
                      path="/employees"
                      element={<Employees jwt={data.jwt} notify={notify} />}
                    />
                    <Route
                      path="/departments"
                      element={<Departments jwt={data.jwt} notify={notify}  />}
                    />{" "}
                    jwt = {data.jwt}
                    <Route
                      path="/designation"
                      element={<Designation jwt={data.jwt} notify={notify} />}
                    />
                    <Route
                      path="/policies"
                      element={<Policies jwt={data.jwt} notify={notify} />}
                    />
                    <Route
                      path="/announcement"
                      element={<Announcement jwt={data.jwt} notify={notify} />}
                    />
                    <Route
                      path="/attendance"
                      element={<Attendance jwt={data.jwt} notify={notify} />}
                    />
                    <Route
                      path="/monthly-report"
                      element={<Monthlyreport jwt={data.jwt} notify={notify} />}
                    />
                    <Route
                      path="/office-shift"
                      element={<OfficeShift jwt={data.jwt} notify={notify} />}
                    />
                    <Route
                      path="/payroll"
                      element={<Payroll jwt={data.jwt} notify={notify} />}
                    />
                    <Route
                      path="/leave-request"
                      element={<LeaveRequest jwt={data.jwt} notify={notify} />}
                    >
                      <Route
                        path=":id"
                        element={<LeaveDetails jwt={data.jwt} notify={notify} />}
                      />
                    </Route>
                    <Route
                      path="/holiday"
                      element={<Holiday jwt={data.jwt} notify={notify} />}
                    />
                    <Route
                      path="/leave-type"
                      element={<LeaveType jwt={data.jwt} notify={notify} />}
                    />
                    <Route
                      path="/profile"
                      element={<Profileemployee jwt={data.jwt} notify={notify} />}
                    />
                    <Route
                      path="/absent_present"
                      element={<PresentAbsent jwt={data.jwt} />}
                    />
                    <Route
                      path="/ip"
                      element={<WhiteListIP jwt={data.jwt} />}
                    />
                  </Routes>
                ) : (
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Dashboardemployee
                          socket= {socket}
                          setAnnouncement_New_notice= {setAnnouncement_New_notice}
                          setPolicy_New_notice ={setPolicy_New_notice}
                          setTotalAnnoun={setTotalAnnoun}
                          setTotalPlicy={setTotalPlicy}
                          jwt={data.jwt}
                          current_user={data.current_user}
                          notify={notify}
                        />
                      }
                    />
                    <Route
                      path="/attendance"
                      element={<Attendanceemployee jwt={data.jwt} />}
                    />
                    <Route
                      path="/leave"
                      element={
                        <LeaveRequestemployee
                          jwt={data.jwt}
                          current_user={data.current_user} notify={notify}
                        />
                      }
                    />
                    <Route
                      path="/salary"
                      element={<Financeemployee jwt={data.jwt}/>}
                    />
                    <Route
                      path="/announcement"
                      element={<Announcementemployee jwt={data.jwt} />}
                    />
                    <Route
                      path="/policy"
                      element={<Policiyemployee jwt={data.jwt} />}
                    />
                    <Route
                      path="/holiday"
                      element={<Holidayemployee jwt={data.jwt}/>}
                    />
                    <Route
                      path="/profile"
                      element={<Profileemployee jwt={data.jwt} />}
                    />
                  </Routes>
                  
                )}
              </Suspense>
            </div>
          </>
        ) : (
          <>
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<Login notify={notify} />} />
                  {/* <Route path="/verify" element={<Verify />} /> */}
                  <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
              </Suspense>
            </div>
          </>
        )}
      </div>

      <ToastContainer />

      <Footer />
    </>
  );
}

export default App;
