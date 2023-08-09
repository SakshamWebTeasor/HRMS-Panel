import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../store/admin/leave-details";
import "./dashboard.css";
import { BiCoinStack } from "react-icons/bi";
import { GiBanknote } from "react-icons/gi";
import Chart from "react-apexcharts";
import Loader from '../../Components/loader/index'


function LeaveDetails(props){
    const dispatch = useDispatch();
    const jwt = props.jwt;

    const { id } = useParams();
    const data = useSelector(status => status.leaveDetails)
    useEffect(()=>{
        dispatch(getAll({jwt,id}));
    },[dispatch,id,jwt])

    const donoutChartSettings = {
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
      }
    if(data.isLoading)
      return <Loader/>
    return (
            <div className="page-section p-4">
                <div className="row mt-4">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                        <div className="box-dashboard">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="">
                                    <h5 className="text-muted mb-4">Total Leave</h5>
                                    <h3 className="text-muted mb-0">{data.singledata.current_month_data?data.singledata.current_month_data.total_leaves:'N/A'}<small>(Current Month)</small></h3>
                                    <h3 className="text-muted mb-0">{data.singledata.yearly_leave_data ? data.singledata.yearly_leave_data.total_leaves:"N/A"}<small>(Current Year)</small></h3>
                                </div>
                                <div className="text-danger">
                                    <BiCoinStack/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                        <div className="box-dashboard">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="">
                                    <h5 className="text-muted mb-4"> Approved</h5>
                                    <h3 className="text-muted mb-0">{data.singledata.current_month_data?data.singledata.current_month_data.approved_leaves:'N/A'}<small>(Current Month)</small></h3>
                                    <h3 className="text-muted mb-0">{data.singledata.yearly_leave_data ? data.singledata.yearly_leave_data.approved_leaves:"N/A"}<small>(Current Year)</small></h3>
                                </div>
                                <div className="text-danger">
                                    <GiBanknote/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                        <div className="box-dashboard">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="">
                                    <h5 className="text-muted mb-4">Rejected</h5>
                                    <h3 className="text-muted mb-0">{data.singledata.current_month_data?data.singledata.current_month_data.rejected_leaves:'N/A'}<small>(Current Month)</small></h3>
                                    <h3 className="text-muted mb-0">{data.singledata.yearly_leave_data ? data.singledata.yearly_leave_data.rejected_leaves:"N/A"}<small>(Current Year)</small></h3>
                                </div>
                                <div className="text-danger">
                                    <GiBanknote/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-12">
                        <div className="box-dashboard">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="">
                                    <h5 className="text-muted mb-4">Pending</h5>
                                    <h3 className="text-muted mb-0">{data.singledata.current_month_data?data.singledata.current_month_data.pending_leaves:'N/A'}<small>(Current Month)</small></h3>
                                    <h3 className="text-muted mb-0">{data.singledata.yearly_leave_data ? data.singledata.yearly_leave_data.pending_leaves:"N/A"}<small>(Current Year)</small></h3>
                                </div>
                                <div className="text-danger">
                                    <BiCoinStack/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-12">
                        <div className="chart mt-4">
                            <h4>Leave Status</h4>
                            <Chart options={donoutChartSettings.options} series={donoutChartSettings.series} type="donut" width="100%" />
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-12">
                        <div className="chart mt-4">
                            <h4>Leave Type Status</h4>
                            <Chart options={donoutChartSettings.options} series={donoutChartSettings.series} type="donut" width="100%" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
export default LeaveDetails;