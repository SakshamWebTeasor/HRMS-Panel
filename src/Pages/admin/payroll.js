import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSalary, getAll, pay, createSalarySlip } from "../../store/admin/pay-role";
import "./payroll.css";
import { Table, Modal, Button, InputGroup, Tabs, Tab, Pagination, Spinner } from "react-bootstrap";
import User from "../../assets/images/user.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Payroll(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;

  const [isPaid, setIsPaid] = useState(false);
  let dt = new Date();
  const [startDate, setStartDate] = useState(dt.setMonth(dt.getMonth() - 1));
  const [startDate_search, setStartDate_search] = useState(dt);
  const [id, setId] = useState();
  const [salary, setSalary] = useState();
  const [createShow, setCreateShow] = useState(false);
  const [show, setShow] = useState(false);
  const data = useSelector((status) => status.payRoll);
  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);
  //....create Salary ....//
  useEffect(()=>{
    if(!data.isSubmitting){
      setCreateShow(false);
    }
  },[data.isSubmitting])

  const handelCreateSalary = () => {
    const date = new Date(startDate);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    dispatch(createSalary({ jwt, month: `${year}-${month}` }));
    
  };

  //......serching......//
  const serchHandal = ()=>{
    const date = new Date(startDate_search);
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    dispatch(getAll({jwt, month:`${month}-${year}`, is_search:true}))
  }
  //......payment......//
  const handelOpen = (id, salary) => {
    setId(id);
    setSalary(salary);
    setShow(true);
  };
  const handlePay = () => {
    dispatch(pay({ jwt, id }));
    setShow(false);
  };
  //......pagination.......//
  let items = [];
  for (
    let number = 1;
    number <= data.pagination_allPendingData.totalpages;
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === Number(data.pagination_allPendingData.currentpage)}
        onClick={() => handelPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  //...... deleted data ........//
  let items1 = [];
  for (
    let number = 1;
    number <= data.pagination_allPaidData.totalpages;
    number++
  ) {
    items1.push(
      <Pagination.Item
        key={`deleted-` + number}
        active={number === Number(data.pagination_allPaidData.currentpage)}
        onClick={() => handelPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handelPagination = (number) => {
    let date = data.is_search?new Date(startDate_search):new Date(startDate);
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    if(!data.is_search)
      dispatch(getAll({ jwt, pageno: number, type: isPaid ? "paid" : "pending"}));
    else
      dispatch(getAll({ jwt, month:`${month}-${year}`, pageno: number, type: isPaid ? "paid" : "pending", is_search:true }));
    return 
  };

  const genrete_slaary_slip = (id)=>{
    dispatch(createSalarySlip({jwt, id}))
  }
  ///........////
  const dateChange = (date1) => {
    setStartDate(date1);
  };
  const dateChange_search = (date1)=>{
    setStartDate_search(date1);
  }
  const tabChange = (e) => {
    if (e === "pending") {
      setIsPaid(false);
    } else {
      setIsPaid(true);
    }
    //setIsPaid(!isPaid);
  };
  return (
    <>
      <div className="page-section p-4">
        <div className="d-md-flex d-block justify-content-between align-items-center">
          <h4 className="">
            Payment Info for {Date().toString().slice(0, 16)}
          </h4>
          <Button
            variant="warning"
            id="button-addon2"
            onClick={() => setCreateShow(true)}
          >
            Create Salary
          </Button>
        </div>
        <div className="row align-items-center mt-4">
          <div className="col-lg-3 col-12">
            <InputGroup className="me-3 my-lg-0 my-3">
              <DatePicker
                selected={startDate_search}
                onChange={(date) => dateChange_search(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
              />
            </InputGroup>
          </div>
          <div className="col-lg-3 col-12">
            <Button variant="danger" id="button-addon2" onClick={serchHandal}>
              Search
            </Button>
          </div>
        </div>
        {(data.allPendingData.length > 0 || data.allPaidData.length > 0) && (
          <Tabs defaultActiveKey="pending" onSelect={tabChange}>
            <Tab eventKey="pending" title="Pending">
              <div className="responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-white">S.No.</th>
                      <th className="text-white">Employee</th>
                      <th className="text-white">Department</th>
                      <th className="text-white">Month</th>
                      <th className="text-white">Basic Salary</th>
                      <th className="text-white">Net Salary</th>
                      <th className="text-white">Salary Slip</th>
                      <th className="text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.isLoading ? (
                      <tr key={"loading"} className="text-center">
                        <td colSpan={8}>Loading...</td>
                      </tr>
                    ) : data.allPendingData.length > 0 ? (
                      data.allPendingData.map((result, index) => (
                        <tr key={index}>
                          <td>
                            {(data.pagination_allPendingData.currentpage - 1) *
                              10 +
                              (index + 1)}
                          </td>
                          <td>
                            <div className="d-flex">
                              <img
                                src={
                                  result.users
                                    ? result.users.image_link
                                      ? result.users.image_link
                                      : User
                                    : User
                                }
                                alt="User"
                                className="img-fluid rounded-circle"
                                style={{ width: "40px", height: "40px" }}
                              />
                              <div className="ms-3">
                                <h6 className="mb-0 ">
                                  {result.users
                                    ? result.users.name +
                                      " (" +
                                      result.users.emp_code +
                                      ")"
                                    : "n/a"}
                                </h6>
                                <small className="mb-0 text-muted">
                                  {result.users ? result.users.email : "n/a"}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <div className="ms-3">
                                <h6 className="mb-0 ">
                                  {result.users
                                    ? result.users.designation
                                      ? result.users.designation.name
                                      : "n/a"
                                    : "n/a"}
                                </h6>
                                <small className="mb-0 text-muted">
                                  {result.users
                                    ? result.users.designation
                                      ? result.users.designation.department
                                        ? result.users.designation.department
                                            .name
                                        : "n/a"
                                      : "n/a"
                                    : "n/a"}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>{result.month}</td>
                          <td>{result.users ? result.users.salary : "n/a"}</td>
                          <td>{result.amount}</td>
                          <td>
                            {result.users
                              ? result.users.salary_slip
                                ? "Yes"
                                : "No"
                              : "n/a"}
                          </td>
                          <td>
                            {!result.status ? (
                              <Button
                                className="btn btn-success text-white "
                                onClick={() =>
                                  handelOpen(result._id, result.amount)
                                }
                              >
                                Pay
                              </Button>
                            ) : (
                              "Done"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr key={-1}>
                        <td colSpan={8} className="text-center">
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <Pagination>{items}</Pagination>
              </div>
            </Tab>
            <Tab eventKey="paid" title="paid">
              <div className="responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-white">S.No.</th>
                      <th className="text-white">Employee</th>
                      <th className="text-white">Department</th>
                      <th className="text-white">Month</th>
                      <th className="text-white">Basic Salary</th>
                      <th className="text-white">Net Salary</th>
                      <th className="text-white">Salary Slip</th>
                      <th className="text-white">Salary Slip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.isLoading ? (
                      <tr key={"loading"} className="text-center">
                        <td colSpan={8}>Loading...</td>
                      </tr>
                    ) : data.allPaidData.length > 0 ? (
                      data.allPaidData.map((result, index) => (
                        <tr key={index}>
                          <td>
                            {(data.pagination_allPaidData.currentpage - 1) *
                              10 +
                              (index + 1)}
                          </td>
                          <td>
                            <div className="d-flex">
                              <img
                                src={
                                  result.users
                                    ? result.users.image_link
                                      ? result.users.image_link
                                      : User
                                    : User
                                }
                                alt="User"
                                className="img-fluid rounded-circle"
                                style={{ width: "40px", height: "40px" }}
                              />
                              <div className="ms-3">
                                <h6 className="mb-0 ">
                                  {result.users ? result.users.name : "n/a"}
                                </h6>
                                <small className="mb-0 text-muted">
                                  {result.users ? result.users.email : "n/a"}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex">
                              <div className="ms-3">
                                <h6 className="mb-0 ">
                                  {result.users
                                    ? result.users.designation
                                      ? result.users.designation.name
                                      : "n/a"
                                    : "n/a"}
                                </h6>
                                <small className="mb-0 text-muted">
                                  {result.users
                                    ? result.users.designation
                                      ? result.users.designation.department
                                        ? result.users.designation.department
                                            .name
                                        : "n/a"
                                      : "n/a"
                                    : "n/a"}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td>{result.month}</td>
                          <td>{result.users ? result.users.salary : "n/a"}</td>
                          <td>{result.amount}</td>
                          <td>
                            {result.users
                              ? result.users.salary_slip
                                ? "Yes"
                                : "No"
                              : "n/a"}
                          </td>
                          <td>
                            {result.pdf_path ? 
                              <a
                                href={result.pdf_path}
                                className="ms-2 btn btn-success text-white"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Download
                              </a>
                              :
                                (data.isSubmittingGenerate?                             
                                  <Button variant="primary" className="ms-2">
                                    <Spinner
                                      as="span"
                                      animation="grow"
                                      size="sm"
                                      role="status"
                                      aria-hidden="true"
                                    />
                                    &#10240;Genrate
                                  </Button>
                                  :<Button variant="primary" className="ms-2" onClick={()=>genrete_slaary_slip(result._id)}>Genrate</Button>
                                )
                            }
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr key={-1}>
                        <td colSpan={8} className="text-center">
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <Pagination>{items1}</Pagination>
              </div>
            </Tab>
          </Tabs>
        )}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <pre>Total = {salary}</pre>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                handlePay();
              }}
            >
              Yes
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setShow(false);
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={createShow} onHide={() => setCreateShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Select Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => dateChange(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          </Modal.Body>
          <Modal.Footer>
            {!data.isSubmitting ? (
              <Button
                variant="danger"
                onClick={() => {
                  handelCreateSalary();
                }}
              >
                Yes
              </Button>
            ) : (
              <Button variant="danger">
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                Yes
              </Button>
            )}
            <Button
              variant="primary"
              onClick={() => {
                setCreateShow(false);
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Payroll;
