import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../store/admin/dashboard";
import "./dashboard.css";
import { BiCoinStack } from "react-icons/bi";
import { GiBanknote } from "react-icons/gi";
import User from "../../assets/images/user.jpg";
import Chart from "react-apexcharts";
import Loader from "../../Components/loader";
import TitleCase from "../../helper/title-case";
import { Link } from "react-router-dom";

function Dashboard(props) {
  const dispatch = useDispatch();
  const socket = props.socket
  const jwt = props.jwt;

  const data = useSelector((status) => status.dashboard);
  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);

  useEffect(()=>{
    socket.emit("setuser",{email:props.current_user.email, department: props.current_user.designation.department})

    socket.emit('check_notice_admin')

    socket.on('recive_notice_admin', (data)=>{
      if(data.total_leave){
        props.setLeave_new_notice(true)
        props.setTotalLeave(data.total_leave)
      }
    })
  },[props, socket])


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
    },
    series: [
      {
        name: "Employee Count",
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
  const donoutChartSettings = {
    options: {
      labels: [],
    },
    series: [],
  };
  data.departmentWiseStaff.map((result) => {
    return (
      donoutChartSettings.series.push(result.no_of_users),
      donoutChartSettings.options.labels.push(
        result.name + "(" + result.user_head + ") : " + result.no_of_users
      )
    );
  });
  data.attendance_chart.map((result) => {
    return (
      barChartAttendance.series[0].data.push(result.value),
      barChartAttendance.options.xaxis.categories.push(result.date.slice(0, 10))
    );
  });
  data.salary_chart.map((result) => {
    return (
      barChartSettings.series[0].data.push(result.value),
      barChartSettings.options.xaxis.categories.push(result.date)
    );
  });
  if (data.isLoading) return <Loader />;
  return (
    <div className="page-section p-4">
      <div className="row">
        <div className="col-12">
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
              <h4 className="mb-0 rd">
                <TitleCase text={props.current_user.name} />
              </h4>
              <p className="text-muted mb-0">{props.current_user.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
          <div className="box-dashboard">
            <div className="d-flex align-items-center justify-content-between">
              <div className="box-dash">
                <Link to="/employees">
                  <h5 className="text-muted mb-4"> Total Employees </h5>
                </Link>
                <h3 className="text-muted mb-0">{data.total_employee}</h3>
              </div>
              <div className="text-danger">
                <GiBanknote />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
          <div className="box-dashboard">
            <div className="d-flex align-items-center justify-content-between">
              <div className="box-dash">
                <Link to="/absent_present" state={{ active: true }}>
                  <h5 className="text-muted mb-4">Present Employees</h5>
                </Link>
                <h3 className="text-muted mb-0">
                  {data.today_active_employee}
                </h3>
              </div>
              <div className="text-danger">
                <BiCoinStack />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
          <div className="box-dashboard">
            <div className="d-flex align-items-center justify-content-between">
              <div className="box-dash">
                <Link to="/absent_present" state={{ active: false }}>
                  <h5 className="text-muted mb-4">Absent Employees </h5>
                </Link>
                <h3 className="text-muted mb-0">{data.today_absent}</h3>
              </div>
              <div className="text-danger">
                <GiBanknote />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-6 col-12">
          <div className="box-dashboard">
            <div className="d-flex align-items-center justify-content-between">
              <div className="box-dash">
                <h5 className="text-muted mb-4">
                  {" "}
                  Salary Amount <small>(Previous Month)</small>
                </h5>
                <h3 className="text-muted mb-0">
                  {" "}
                  {data.previous_month_salary_amount}{" "}
                </h3>
              </div>
              <div className="text-danger">
                <BiCoinStack />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-0">
        <div className="col-xl-6 col-lg-6 col-12">
          <div className="chart mt-4">
            <h4>Attendance Chart</h4>
            <Chart
              options={barChartAttendance.options}
              series={barChartAttendance.series}
              type="bar"
              width="100%"
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-12">
          <div className="chart mt-4">
            <h4>Payroll monthly report</h4>
            <Chart
              options={barChartSettings.options}
              series={barChartSettings.series}
              type="line"
              width="100%"
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-12">
          <div className="chart mt-4">
            <h4>Department wise staff</h4>
            <Chart
              options={donoutChartSettings.options}
              series={donoutChartSettings.series}
              type="pie"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
