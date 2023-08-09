import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Table, Pagination, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../store/admin/employee-absent-present';
import TitleCase from '../../../helper/title-case';
import User from "../../../assets/images/user.jpg";
function PresentAbsent(props) {
    const dispatch = useDispatch()
    const jwt= props.jwt
    const location = useLocation()
    const { active = true } = useMemo(()=>{
      return location.state
    },[location])
    
    const [visit, setVisit] = useState(true)
    const [absentTab, setAbsentTab] = useState(false)
    const data = (useSelector(status=>status.employeeAbsentPresent))
    useEffect(()=>{
        dispatch(getAll({jwt}))
    },[dispatch, jwt, visit])
    //......pagination.......//
        //....present Data...//
        let items = [];
        for (let number = 1; number <= data.pagination_AllData.totalpages; number++) {
            items.push(
            <Pagination.Item
                key={number}
                active={number === data.pagination_AllData.currentpage}
                onClick={() => handelPagination(number)}
            >
                {number}
            </Pagination.Item>
            );
        }
        //...... absent data ........//
        let items1 = [];
        for (let number = 1; number <= data.pagination_absent_AllData.totalpages; number++) {
        items1.push(
            <Pagination.Item key={`absent-`+number} active={number === data.pagination_absent_AllData.currentpage} onClick={ ()=>handelPagination(number)}>
            {number}
            </Pagination.Item>,
        );
        }
        const handelPagination = (number) => {
            return dispatch(getAll({ jwt, pageno: number,type:absentTab?"absent":"present" }));
        };
    const handelTab = (e)=>{
        if(e==="present"){
          setAbsentTab(false)
        }else{
          setAbsentTab(true)
        }
      }
    return (
        <div className="page-section p-4">
          <div className="employees chart mb-5">
            <div className="d-flex justify-content-between">
                        <h4 className="mb-0">{Date().toString().slice(8,10)}-{Date().toString().slice(4,7)}-{Date().toString().slice(11,16)}</h4>
            </div>
            <Tabs
              defaultActiveKey={active?"present":"absent"}
              onSelect={handelTab}
              onClick={()=>setVisit(!visit)}
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="present" title="Present">
                <div className="responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-white">S.No.</th>
                      <th className="text-white">Name</th>
                      <th className="text-white">Designation</th>
                      <th className="text-white">Contact Number</th>
                      <th className="text-white">Gender</th>
                      <th className="text-white">Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.isLoading ? (<tr key={"loading"} className="text-center"><td colSpan={8}>Loading...</td></tr>)
                    :data.allData.length > 0 ? (
                      data.allData.map((result, index) => (
                      <tr key={index}>
                        <td>{(data.pagination_AllData.currentpage - 1) * 10 + (index + 1)}</td>
                        <td>
                          <div className="d-flex">
                            <img
                              src={result.image_link?result.image_link:User}
                              alt="User"
                              className="img-fluid rounded-circle"
                              style={{ width: "40px", height: "40px" }}
                            />
                            <div className="ms-3">
                              <h6 className="mb-0 "><TitleCase text={result.name}/></h6>
                              <small className="mb-0 text-muted">
                                {result.email}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="ms-3">
                            <h6 className="mb-0 "><TitleCase text={result.designation.name}/></h6>
                            <small className="mb-0 text-muted">
                            <TitleCase text={result.designation.department.user_head?result.designation.department.user_head:'n/a'}/>
                            </small>
                          </div>
                        </td>
                        {result.mobile_no && result.alternate_mobile_no  
                        ?  <td >{result.mobile_no}, {result.alternate_mobile_no}</td> 
                        : <td >{result.mobile_no}</td> }
                        <td>
                          {result.gender === "F"
                            ? "Female"
                            : result.gender === "M"
                            ? "Male"
                            : "Other"}
                        </td>
                        <td>
                          <address>
                          <TitleCase text={result.current_address.address}/>,<br />
                          <TitleCase text={result.current_address.state}/>,<br />
                          <TitleCase text={result.current_address.country}/>,<TitleCase text={result.current_address.pincode}/>
                          </address>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key={-1}>
                      <td colSpan={8} className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )
                    }
                  </tbody>
                </Table>
                <Pagination> {items}</Pagination>
                </div>
              </Tab>
              <Tab eventKey="absent" title="Absent">
                <div className="responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-white">S.No.</th>
                      <th className="text-white">Name</th>
                      <th className="text-white">Designation(Department)</th>
                      <th className="text-white">Contact Number</th>
                      <th className="text-white">Gender</th>
                      <th className="text-white">Address</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    data.isLoading ? (<tr key={"loading"} className="text-center"><td colSpan={8}>Loading...</td></tr>) 
                      :data.absent_allData.length > 0 ? (
                        data.absent_allData.map((result, index) => (
                        <tr key={index}>
                          <td>{(data.pagination_absent_AllData.currentpage - 1) * 10 + (index + 1)}</td>
                          <td>
                            <div className="d-flex">
                              <img
                                src={result.image_link?result.image_link:User}
                                alt="User"
                                className="img-fluid rounded-circle"
                                style={{ width: "40px", height: "40px" }}
                              />
                              <div className="ms-3">
                                <h6 className="mb-0 "><TitleCase text={result.name}/></h6>
                                <small className="mb-0 text-muted">
                                  {result.email}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="ms-3">
                              <h6 className="mb-0 "><TitleCase text={result.designation.name}/></h6>
                              <small className="mb-0 text-muted">
                              <TitleCase text={result.designation.department?.user_head?result.designation.department.user_head:"n/a"}/>
                              </small>
                            </div>
                          </td>
                          {result.mobile_no && result.alternate_mobile_no  
                        ?  <td >{result.mobile_no}, {result.alternate_mobile_no}</td> 
                        : <td >{result.mobile_no}</td> }
                          <td>
                            {result.gender === "F"
                              ? "Female"
                              : result.gender === "M"
                              ? "Male"
                              : "Other"}
                          </td>
                          <td>
                            <address>
                            <TitleCase text={result.current_address.address}/>,<br />
                            <TitleCase text={result.current_address.state}/>,<br />
                            <TitleCase text={result.current_address.country}/>,<TitleCase text={result.current_address.pincode}/>
                            </address>
                          </td>
                        </tr>
                      ))
                      ) : (
                        <tr key={-1}>
                          <td colSpan={8} className="text-center">
                            No Data Found
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
                <Pagination> {items1}</Pagination>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
    )
}

export default PresentAbsent;