import React, {useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, setIsSubmitting, leaveApply, cleanError } from "../../store/user/leave";
import "./leave.css";
import {Modal, Spinner, Table, Button, Form, Pagination} from 'react-bootstrap';
import Loader from "../../Components/loader";
import TitleCase from "../../helper/title-case";
import { LocaDateFormate } from "../../helper/time-set-localtimezone";

function LeaveRequest(props){
    const dispatch = useDispatch();
    const jwt = props.jwt;
    //const notify = props.notify

    const typeRef = useRef();
    const startRef = useRef();
    const endRef = useRef();
    const reasonRef = useRef();
    const [halfday, setHalfday] = useState(false)
    const [show, setShow] = useState(false);
    const [remark, setRemark] = useState();
    const [showremark, setShowRemark] = useState(false);
    const [approved_by, setApproved_by] = useState(null);
    const data = useSelector(status => status.userLeave);
    useEffect(()=>{
        dispatch(getAll({jwt}));
    },[dispatch,jwt])

    //..... Apply Leave .......//
    useEffect(()=>{
        if(!data.isError){
            setShow(false)
            setHalfday(false)
        }
    },[data.isError])
    const handelSubmit = async(e) =>{
        e.preventDefault();
        await dispatch(setIsSubmitting(true));
        await dispatch(leaveApply({
            jwt,
            type : typeRef.current.value,
            start : startRef.current.value,
            end : endRef.current.value,
            reason : reasonRef.current.value,
            halfday
        }))
        dispatch(setIsSubmitting(false))
    }
    //......pagination.......//
    let items = [];
    for (let number = 1; number <= data.totalpages; number++) {
    items.push(
        <Pagination.Item key={number} active={number === data.currentpage} onClick={ ()=>handelPagination(number)}>
        {number}
        </Pagination.Item>,
    );
    }
    const handelPagination = (number)=>{
      dispatch(getAll({jwt,pageno:number}))
    }
    //model open......
    const handleClose = () =>{ 
        setShow(false);
        setHalfday(false);
        dispatch(cleanError())
    };
    const remarkHandel = (remark,approvedBy)=>{
        setRemark(remark);
        setApproved_by(approvedBy);
        setShowRemark(true);
    }
   //.....close remark....//
   const handlaRemarkClose = ()=>{
    setShowRemark(false);
    setRemark();
    setApproved_by(null);
   }
   const checkedHalfDayOrNot =(e)=>{
        setHalfday(e.target.checked)
   }
    if(data.isFirstTimeLoding)
        return <Loader/>
    return (
            <div className="page-section p-4">
                <div className="chart mt-4">
                
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0"> List All Leave </h4>
                        <Button variant="danger" onClick={()=>{setShow(true)}}>+ Apply Leave</Button>
                    </div>
                    
                    <div className="responsive mt-4">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-white">SL No</th>
                                    <th className="text-white">Leave Type</th>
                                    <th className="text-white">Leave Duration</th>
                                    <th className="text-white">Days</th>
                                    <th className="text-white">Applied On</th>
                                    <th className="text-white">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.isLoading ? <tr key={`0-loading`} className="text-center"><td colSpan={8}>Loading...</td></tr> :data.allData.length > 0 ?  data.allData.map((result,index) =>
                                <tr key={index}>
                                    <td>{((data.currentpage-1)*10)+(index+1)}</td>
                                    <td><TitleCase text={result.type.name}/></td>
                                    <td><LocaDateFormate date_arg={result.start_date}/> To <LocaDateFormate date_arg={result.end_date}/></td>
                                    <td>{result.half_day?'Half Day':result.end_date && result.start_date?((( new Date(result.end_date)).getTime()- (new Date(result.start_date)).getTime()) / (1000 * 3600 * 24))+1:"N/A"}</td>
                                    <td><LocaDateFormate date_arg={result.created_at}/></td>
                                    <td onClick={()=>remarkHandel(result.remark, result.approved_by)}>{ result.status.charAt(0).toUpperCase() + result.status.slice(1) }</td>
                                </tr>
                                 ) : <tr key={`0-nodata`}><td colSpan={8} className="text-center">No Data Found</td></tr>}
                            </tbody>
                        </Table>
                    </div>
                    <Pagination>{items}</Pagination>
                </div>
                <Modal show={showremark} onHide={handlaRemarkClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remark By {approved_by?approved_by.name:"HR"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <pre>
                            {remark}
                        </pre>
                    </Modal.Body>
                </Modal>
                <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Leave Apply</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handelSubmit}>
                                    <Form.Group className="my-3">
                                        <Form.Label>Leave Type</Form.Label>
                                        <Form.Select aria-label="Default select example" 
                                        ref={typeRef}
                                        mode="multiple"
                                        className="form-control" >
                                            <option key={`key-1`} value={''}>Select</option>
                                            {data.allLeaveType.length>0?data.allLeaveType.map((result, index)=><option key={index} value={result._id} disabled={result.remaining===0}>{result.name} - {result.remaining}</option>):''}
                                            
                                            
                                        </Form.Select>
                                        <span className="text-danger">{data.errors.length>0?data.errors.map((err)=>err.param==="type"?<TitleCase key={err.param} text={err.msg}/>:''):''}</span>
                                    </Form.Group>


                                    <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Duration<span className="text-danger">*</span> </Form.Label>
                                    <div className="d-flex align-items-center justify-contant-between">
                                        <div className="w-100">
                                            <Form.Control type="date" 
                                            ref={startRef}
                                            placeholder="Duration" />
                                            <span className="text-danger">{data.errors.length>0?data.errors.map((err)=>err.param==="start_date"?<TitleCase key={err.param} text={err.msg}/>:''):''}</span>
                                        </div>
                                         <p className="mx-3">To</p>
                                        <div className="w-100">
                                            <Form.Control type="date" 
                                            ref={endRef}
                                            placeholder="Description"
                                            />
                                            <span className="text-danger">{data.errors.length>0?data.errors.map((err)=>err.param==="end_date"?<TitleCase key={err.param} text={err.msg}/>:''):''}</span>
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
                                    <Form.Group className="mb-0" >
                                        <Form.Label>Leave Reason</Form.Label>
                                        <Form.Control as="textarea" 
                                        ref={reasonRef}
                                        rows={3} placeholder="Reason" 
                                        />
                                        <span className="text-danger">{data.errors.length>0?data.errors.map((err)=>err.param==="reason"?<TitleCase key={err.param} text={err.msg}/>:''):''}</span>
                                    </Form.Group>
                                    {data.isSubmitting 
                                            ?
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
                                            :
                                                <Button type="submit" variant="danger" className="mt-4">Apply</Button>
                                        }
                                </Form>
                            </Modal.Body>
                    </Modal>
            </div>
             
        )
    }
    
export default LeaveRequest;