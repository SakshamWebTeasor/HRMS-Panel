import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, makeAttendence, setIsSubmitting } from "../../store/user/dashboard";
import { debounce } from "lodash";
import "./dashboard.css";
import { BiCoinStack } from "react-icons/bi";
import { GiBanknote } from "react-icons/gi";
import User from "../../assets/images/user.jpg";
import Chart from "react-apexcharts";
import Loader from "../../Components/loader";
import { Spinner } from "react-bootstrap";
import Watch, { CalculateRealTimePresence } from "../../helper/watch";



function Dashboard(props) {

  const [ip, setIP] = useState("");

  const dispatch = useDispatch();
  const socket = props.socket
  const jwt = props.jwt;
  const notify = props.notify;

  const data = useSelector((status) => status.userDashboard);
  console.log("data:",data)

  const getData = async () => {
    let option = {
      method: 'GET',
      mode: 'cors',
    }
    const res = await fetch("https://api.ipify.org/?format=json", option)
    setIP((await res.json()).ip);
  };

  function getDeviceOS() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("android")) {
      return "Android";
    } else if (userAgent.includes("iphone") || userAgent.includes("ipad") || userAgent.includes("ipod")) {
      return "iOS";
    } else if (userAgent.includes("windows")) {
      return "Windows";
    } else {
      return "Unknown";
    }
  }

  useEffect(() => {
    dispatch(getAll({ jwt }));
    getData(); //getting Ip
  }, [dispatch, jwt]);

  const deviceOS = getDeviceOS() //getting device type
  console.log('ip:', ip, deviceOS)

  useEffect(() => {
    socket.emit("setuser", { email: props.current_user.email, department: props.current_user.designation.department })

    socket.emit('check_notice')

    socket.on('recive_notice', (data) => {
      if (data.is_announ) {
        props.setAnnouncement_New_notice(true)
        props.setTotalAnnoun(data.total_announ)
      }
      if (data.is_policy) {
        props.setPolicy_New_notice(true)
        props.setTotalPlicy(data.total_policy)
      }
    })
  }, [props, socket])

  //......make Attendance....//
  const hendelAttendence = debounce(() => {
    dispatch(setIsSubmitting(true))
    if (!navigator.geolocation) {
      notify("Geolocation is not supported by your browser", true);
      dispatch(setIsSubmitting(false))
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          makeAttendence({
            jwt,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            type:
              !data.todayAttendance.outTime && !data.todayAttendance.inTime
                ? "check_in"
                : "check_out",
          })
        );
      });
    }
  }, 100);
  const barChartAttendance = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        type: "category",
        categories: [],
        labels: {
          formatter: function (val) {
            return val;
          },
        },
      },
      yaxis: [
        {
          labels: {
            formatter: function (val) {
              return val;
            },
          },
          title: {
            text: "In Hours",
          },
        },
      ],
    },

    series: [
      {
        name: "duration",
        data: [],
      },
    ],
  };
  const barChartSettings = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        data: [],
      },
    ],
  };
  data.attendance_chart.map((result) => {
    return (
      barChartAttendance.series[0].data.push(result.value),
      barChartAttendance.options.xaxis.categories.push(result.date.slice(0, 10))
    );
  });

  data.salary_chart.map((result) => {
    return (
      barChartSettings.series[0].data.push(result.value),
      barChartSettings.options.xaxis.categories.push(result.month)
    );
  });

  ///...///
  const date = new Date();


  if (data.isLoading) return <Loader />;
  return (
    <div className="page-section p-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <img
                src={
                  props.current_user.image_link
                    ? props.current_user.image_link
                    : User
                }
                alt="User"
                className="img-fluid rounded-circle"
                style={{ width: "50px", height: "50px" }}
              />
              <div className="ms-2">
                <h5 className="mb-0">
                  <h1 style={{ color: "red" }}>{props.current_user.name}</h1> 
                  Logged in through:{deviceOS}
                </h5>
                {/* <p className="text-muted mb-0">{props.current_user.email}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-9 col-12">
          <div className="row mt-md-4 mt-0">
            <div className="col-xl-3 col-lg-3 col-md-6 col-12">
              <div className="box-dashboard">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="">
                    <h5 className="text-muted mb-4">Total Hours</h5>
                    <h3 className="text-muted mb-0"><CalculateRealTimePresence inTime={data.todayAttendance.inTime} outTime={data.todayAttendance.outTime} duration={data.todayAttendance.duration} /></h3>
                  </div>
                  <div className="text-danger">
                    <BiCoinStack />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-12">
              <div className="box-dashboard">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="">
                    <h5 className="text-muted mb-4"> Total Presence</h5>
                    <h3 className="text-muted mb-0">{data.total_present}</h3>
                  </div>
                  <div className="text-danger">
                    <GiBanknote />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-12">
              <div className="box-dashboard">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="">
                    <h5 className="text-muted mb-4">Total Leave</h5>
                    <h3 className="text-muted mb-0">
                      {data.total_leaves.paid_leave}
                      <span>-Paid</span>
                    </h3>
                    <h3 className="text-muted mb-0">
                      {" "}
                      {data.total_leaves.unpaid_leave}
                      <span>-UnPaid</span>
                    </h3>
                  </div>
                  <div className="text-danger">
                    <GiBanknote />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-6 col-12">
              <div className="box-dashboard">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="">
                    <h5 className="text-muted mb-4"> Total Earning</h5>
                    <h3 className="text-muted mb-0">
                      &#8377; {data.total_salary}{" "}
                    </h3>
                  </div>
                  <div className="text-danger">
                    <BiCoinStack />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-md-4 mt-0">
            <div className="col-xl-6 col-lg-6 col-12">
              <div className="chart">
                <h4>Attendance</h4>
                <Chart
                  options={barChartAttendance.options}
                  series={barChartAttendance.series}
                  type="bar"
                  width="100%"
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-12">
              <div className="chart">
                <h4>Payroll monthly report</h4>
                <Chart
                  options={barChartSettings.options}
                  series={barChartSettings.series}
                  type="line"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-12">
          {deviceOS=="Windows" && <div className="timezone mt-md-4 mt-0">
            <div className="mb-0">
              <span className="date-section">
                Today: {date.toString().slice(0, 15)}
              </span>
              <p className="mb-0">Time</p>
              <span><Watch /></span>
            </div>
            <div className="text-left">
              <small>Get ready for an amazing workday!</small>
              <br></br>
              {data.todayAttendance.outTime && <><h4>Today you completed office Hours</h4></>}
              {!data.isSubmitting ? (!data.todayAttendance.outTime &&
                <button
                  type="button"
                  className={
                    data.todayAttendance.inTime
                      ? data.todayAttendance.outTime
                        ? "btn btn-success"
                        : "btn btn-danger"
                      : "btn btn-success"
                  }
                  onClick={hendelAttendence}
                >
                  {data.todayAttendance.inTime
                    ? data.todayAttendance.outTime
                      ? "Check In"
                      : "Check Out"
                    : "Check In"}
                </button>
              ) : (
                <button
                  type="button"
                  className={
                    data.todayAttendance.inTime
                      ? data.todayAttendance.outTime
                        ? "btn btn-success"
                        : "btn btn-danger"
                      : "btn btn-success"
                  }
                  disabled
                >
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {data.todayAttendance.inTime
                    ? data.todayAttendance.outTime
                      ? "Check In"
                      : "Check Out"
                    : "Check In"}
                </button>
              )}
              <small>Policy: Normal Attendance Policy </small>
            </div>
          </div>}
          {/* <div className="timezone mt-md-4 mt-0">
            <h5>
              Holiday <small>Current Month</small>
            </h5>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
