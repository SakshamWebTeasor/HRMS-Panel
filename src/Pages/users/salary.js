import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../store/user/salary";
import "./salary.css";
import { Table, Pagination } from 'react-bootstrap'


function Salary(props){
    const dispatch = useDispatch();
    const jwt = props.jwt;

    const data = useSelector(status => status.userSalary);
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
      dispatch(getAll({jwt, pageno:number}))
    }
    // const date = new Date();
    // let year = date.getFullYear();
    return (
            <div className="page-section p-4">
                <div className="employees chart">
                    <h4 className="mb-0">Salary All List</h4>
                    {/* <div className="row align-items-center justify-content-between mt-4">
                        <div className="col-lg-3 col-12">
                            <Form.Select aria-label="Default select example">
                                <option>{year}</option>
                                <option value={year-1}>{year-1}</option>
                                <option value={year-2}>{year-2}</option>
                                <option value={year-3}>{year-3}</option>
                                <option value={year-4}>{year-4}</option>
                                <option value={year-5}>{year-5}</option>
                                <option value={year-6}>{year-6}</option>
                                <option value={year-7}>{year-7}</option>
                                <option value={year-8}>{year-8}</option>
                                <option value={year-9}>{year-9}</option>
                                <option value={year-10}>{year-10}</option>
                            </Form.Select>
                        </div> 
                    </div> */}
                    <div className="responsive mt-4">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th className="text-white">S.No.</th>
                                <th className="text-white">Month</th>
                                <th className="text-white">Basic Salary</th>
                                <th className="text-white">Net Salary</th>
                                <th className="text-white">Salary Slip</th>
                                <th className="text-white">Status/Salary Slip</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.isLoading ? <tr key={"loading"} className="text-center"><td colSpan={8}>Loading...</td></tr> :data.allData.length > 0 ?  data.allData.map((result,index) =>
                            <tr key={index}>
                                <td>{((data.currentpage-1)*10)+(index+1)}</td>
                                <td>{result.month}</td>
                                <td>{result.users.salary}</td>
                                <td>{result.amount}</td>
                                <td>{result.users.salary_slip?"Yes":"No"}</td>
                                <td>{result.status?(result.users.salary_slip?<a
                                    href={result.pdf_path}
                                    className="ms-2 btn btn-success text-white"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Download
                                </a>:"Paid"):"Pending"}</td>
                            </tr>
                            ) : <tr key={-1}><td colSpan={8} className="text-center">No Data Found</td></tr>}
                         </tbody>
                    </Table>
                    </div>
                    <Pagination>{items}</Pagination>
                </div>
            </div>
        )
    }
    
export default Salary;