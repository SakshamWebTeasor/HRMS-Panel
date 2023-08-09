import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../store/user/announcement";
import "./announcement.css";
import {Pagination, Table} from 'react-bootstrap';
import TitleCase from '../../helper/title-case'
import ReadMoreReadLess from '../../helper/readMoreReadLess'
function Announcement(props){
    const dispatch = useDispatch();
    const jwt = props.jwt;
   
    const data = useSelector(status=>status.userannouncement);
    useEffect(()=>{
        dispatch(getAll({jwt}));
    },[dispatch,jwt])
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
    return (
            <div className="page-section p-4">
                <div className="employees chart">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">List All Announcements</h4>
                    </div>
                    
                    <div className="responsive mt-4">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th className="text-white">S.No.</th>
                                    <th className="text-white">
                                        Title
                                    </th>
                                    <th className="text-white">Description</th>
                                    <th className="text-white">
                                        Start Date
                                    </th>
                                    <th className="text-white">
                                        End Date
                                    </th>
                                    <th className="text-white">Attachment</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.isLoading ? <tr key={0} className="text-center"><td colSpan={8}>Loading...</td></tr> :data.allData.length > 0 ?  data.allData.map((result,index) =>
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td><TitleCase text={result.title}/></td>
                                            <td><ReadMoreReadLess text={result.description} limit={60}/></td>
                                            <td>{result.start_date.slice(0,10)}</td>
                                            <td>{result.end_date.slice(0,10)}</td>
                                            <td className='d-lg-block d-flex align-items-center'>
                                                {result.file_link?<a href={result.file_link} className='ms-2 btn btn-success text-white' target="_blank" rel="noreferrer">View</a>:<></>}
                                            </td>
                                        </tr>
                                     ) : <tr key={0}><td colSpan={8} className="text-center">No Data Found</td></tr>}
                            </tbody>
                        </Table>
                    </div>
                    <Pagination>{items}</Pagination>
                </div>
            </div>
        )
    }
    
export default Announcement;