import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, setIsSubmitting, addRecord, updateRecord, addDocumnets, addEmail } from "../../../store/admin/employee-details";
import { Tab, Tabs, Table, Button, Modal, Form,Spinner } from "react-bootstrap";
import Loader from "../../../Components/loader/index";
import Verdi from "../../../assets/images/no-image.png";
import { CiEdit } from "react-icons/ci"
import TitleCase from "../../../helper/title-case";
import ReadMoreReadLess from "../../../helper/readMoreReadLess";
import LocalTimeZone, { LocaDateFormate } from "../../../helper/time-set-localtimezone";
import CalculationLate, { CalculateEarlyLeave } from "../../../helper/util";

function EmployeeDetails(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;
  const id = props.id;
  const notify = props.notify
  const is_deleted = props.is_deleted

  const [isEdit, setIsEdit]= useState(false)
  const [panEdit, setPanEdit] = useState(false)
  const [adharEdit, setAdharEdit] = useState(false)
  const [show, setShow]=useState(false)
  const [emailShow, setEmailShow] = useState(false)
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const ifscRef = useRef();
  const bankNameRef = useRef();
  const branchNameRef = useRef();
  const fileRef = useRef();
  const accountNoRef = useRef();
  const accountHolderRef = useRef();

  const panRef = useRef();
  const panNumberRef = useRef();
  const adharRef = useRef();
  const adharNumberRef = useRef();

  const emailRef = useRef();
  const data = useSelector((status) => status.employeeDetails)

  useEffect(() => {
    dispatch(getAll({ jwt, id }));
  }, [dispatch, jwt, id]);

//....add company email...//
  const handelemailSubmit = async(e)=>{
    e.preventDefault();
    if(!emailRef.current.value)
      return notify("All Fields are Required !", true)
    await dispatch(setIsSubmitting(true))
    dispatch(addEmail({id, jwt, email : emailRef.current.value}))
    await dispatch(setIsSubmitting(false))
    setEmailShow(false)
  }
//....add Pan Card....//
  const handelPanSubmit = async(e)=>{
    e.preventDefault();
    if(panNumberRef.current.value <= 0)
      return notify("Enter valid Number !", true)
    if(!panNumberRef.current.value){
      return notify("All Fields are Required !", true)
    }
    if(!panEdit && !panRef.current.files[0])
      return notify("All Fields are Required !", true)
    await dispatch(setIsSubmitting(true))
    if (!panEdit) {
    //"pan create"//
      await dispatch(addDocumnets({
        jwt,
        id,
        pan:panRef.current.files[0],
        pan_number : panNumberRef.current.value.trim(),
        panEdit,
        ispan:true
      }))
    } else {
    //'pan update'//
      await dispatch(addDocumnets({
        jwt,
        id,
        old_pan_path:data.employeeDetails.panCard_path.trim(),
        old_pan_link:data.employeeDetails.panCard_link.trim(),
        pan:panRef.current.files[0],
        pan_number : panNumberRef.current.value.trim(),
        panEdit,
        ispan:true
      }))
    }
    await dispatch(setIsSubmitting(false));
    setPanEdit(false)
  }
//..... add adhar Card ....//
  const handelAdharSubmit = async(e)=>{
    e.preventDefault();
    if(adharNumberRef.current.value <= 0)
      return notify("Enter valid Number !", true)
    if(!adharNumberRef.current.value.trim )
      return notify('All Fields are Required !', true);
    if(!adharEdit && !adharRef.current.files[0])
      return notify('All Fields are Required !', true);
    await dispatch(setIsSubmitting(true))
    if (!adharEdit) {
    //"adhar create"//
      await dispatch(addDocumnets({
        jwt,
        id,
        adhar:adharRef.current.files[0],
        adhar_number : adharNumberRef.current.value.trim(),
        adharEdit,
        ispan:false
      }))
    } else {
    //'adhar update'//
      await dispatch(addDocumnets({
        jwt,
        id,
        old_adhar_path:data.employeeDetails.aadharCard_path.trim(),
        old_adhar_link:data.employeeDetails.aadharCard_link.trim(),
        adhar:adharRef.current.files[0],
        adhar_number : adharNumberRef.current.value.trim(),
        adharEdit,
        ispan:false
      }))
    }
    await dispatch(setIsSubmitting(false));
    setAdharEdit(false)
  }

//....add Account....//
  const handelSubmit = async(e)=>{
    e.preventDefault();
    if(accountNoRef.current.value <= 0)
      return notify("Enter Valid Number !", true)
    if(!accountHolderRef.current.value || !accountNoRef.current.value || !branchNameRef.current.value || !bankNameRef.current.value || !ifscRef.current.value || !fileRef.current.files[0])
      return notify('All Fields are Required !', true)
    await dispatch(setIsSubmitting(true))
    if (!isEdit) {
      //"Account create"//
        await dispatch(addRecord({
            jwt,
            id,
            accountHolder : accountHolderRef.current.value.trim(),
            accountNo : accountNoRef.current.value.trim(),
            branchName : branchNameRef.current.value.trim(),
            bankName : bankNameRef.current.value.trim(),
            ifscCode : ifscRef.current.value.trim(),
            file : fileRef.current.files[0]
        }))
    }else{
      //"Account update"//
        await dispatch(updateRecord({
            jwt,
            id:data.accountDetails._id,
            oldFilePath :  data.accountDetails.file_path.trim(),
            oldFileLink :  data.accountDetails.file_link.trim(),
            userid : id,
            accountHolder : accountHolderRef.current.value.trim(),
            accountNo : accountNoRef.current.value.trim(),
            branchName : branchNameRef.current.value.trim(),
            bankName : bankNameRef.current.value.trim(),
            ifscCode : ifscRef.current.value.trim(),
            file : fileRef.current.files[0]
        }))
    }
    await dispatch(setIsSubmitting(false));
    setIsEdit(false)
    setShow(false)
  }
  const handleShow = (isedit = false)=>{
    setShow(true)
    if(isedit)
      setIsEdit(true)
  }
  const handleClose = ()=>{
    setIsEdit(false)
    setShow(false)
  }
  const handelNumberValue = (e)=>{
    if(e.key === "e"){
      accountNoRef.current.value = null;
      return;
    }
}
  
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  
  if (data.isLoading) 
    return <Loader />;

  return (
    <>
      <div className="page-section mt-0 py-4">
        <div className="employees chart page_bg p-0 mb-4">
          <div className="profile-section p-4">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-3 col-md-3 col-12">
                <div className="profile-box mt-4">
                  <img
                    src={
                      data.employeeDetails.image_link
                        ? data.employeeDetails.image_link
                        : Verdi
                    }
                    alt="Verdi"
                  />
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-12">
                <div className="profile-data">
                  <h3><TitleCase text={data.employeeDetails.name}/></h3>
                  <small><TitleCase text={data.employeeDetails.designation.name}/></small>
                  <p>
                    <ReadMoreReadLess text={data.employeeDetails.designation.description} limit={100}/>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chart">
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Home">
              <h4>Basic Information</h4>
              <div className="row mt-4">
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Name</h6>
                    <p><TitleCase text={data.employeeDetails.name}/></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Company Email</h6>
                    {data.employeeDetails.company_email?<p>{data.employeeDetails.company_email}</p>:(!is_deleted &&<Button onClick={()=>{setEmailShow(true)}}>+Add email</Button>)}
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Gender</h6>
                    <p>
                      {data.employeeDetails.gender === "M"
                        ? data.employeeDetails.gender === "F"
                          ? "Female"
                          : "Male"
                        : data.employeeDetails.gender === "F"
                        ? "Female"
                        : "Other"}
                    </p>
                  </div>
                </div>
                
              <div className="row mt-4 mb-5">
              <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Phone</h6>
                    <p>{data.employeeDetails.mobile_no}</p>
                  </div>
                </div>
              </div>
                
                <Modal
                show={emailShow}
                onHide={()=>setEmailShow(false)}
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                      KYC
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handelemailSubmit}>
                      <Form.Group className="my-3" >
                        <Form.Label>Company Email <span className="text-danger">*</span> </Form.Label>
                        <Form.Control type="email"
                        ref={emailRef}
                        defaultValue={ data.accountDetails.company_email}
                        placeholder="Email"
                        required />
                      </Form.Group>
                      <Button variant="success" type={"submit"}>Save</Button>
                    </Form>
                  </Modal.Body>
                </Modal>
              </div>
            </Tab>
            <Tab eventKey="contact" title="Contact">
              <div className="row mt-4">
              <h4>Current Address</h4>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Address</h6>
                    <p><TitleCase text={data.employeeDetails.current_address.address}/></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>State</h6>
                    <p><TitleCase text={data.employeeDetails.current_address.state}/></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Country</h6>
                    <p><TitleCase text={data.employeeDetails.current_address.country}/></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Pin Code</h6>
                    <p>{data.employeeDetails.current_address.pincode}</p>
                  </div>
                </div>
              </div>
              <div className="row mt-4 mb-5">
              <h4>Parmanent Address</h4>
              <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Address</h6>
                    <p><TitleCase text={data.employeeDetails.parmanent_address.address}/></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>State</h6>
                    <p><TitleCase text={data.employeeDetails.parmanent_address.state}/></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Country</h6>
                    <p><TitleCase text={data.employeeDetails.parmanent_address.country}/></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Pin Code</h6>
                    <p>{data.employeeDetails.parmanent_address.pincode}</p>
                  </div>
                </div>
              </div>
              <div className="row mt-4 mb-5">
              <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Personal Email</h6>
                    <p>{data.employeeDetails.email}</p>
                  </div>
                </div>
              </div>
              
            </Tab>
            <Tab eventKey="account" title="Account">
              {data.accountDetails.account_no ? 
              <><h4>Account Information</h4>
              {!is_deleted &&<Button variant="dark" onClick={() => handleShow(true)}>
              + Edit
              </Button>}
              <div className="row mt-4">
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Bank Holder Name</h6>
                    <p><TitleCase text={data.accountDetails.accHolder_name}/></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Bank Name</h6>
                    <p><TitleCase text={data.accountDetails.bank_name}/></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Branch Name</h6>
                    <p><TitleCase text={data.accountDetails.branch_name}/></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Account Number</h6>
                    <p>{data.accountDetails.account_no}</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Ifsc Code</h6>
                    <p>{data.accountDetails.ifsc_code}</p>
                  </div>
                </div>
              </div></>
              :
              (!is_deleted &&<>
                <Button variant="dark" onClick={() => handleShow()}>
                  + Add Account
                </Button><p>No Account details</p>
              </>)}
              <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-custom-modal-styling-title">
                    Add Account
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handelSubmit}>
                    <Form.Group className="my-3">
                        <Form.Label>Account Holder Name<span className="text-danger">*</span> </Form.Label>
                        <Form.Control type="text"
                        ref={accountHolderRef}
                        defaultValue={ data.accountDetails.accHolder_name}
                        placeholder="Account holder name"  required/>
                    </Form.Group>
                    <Form.Group className="my-3" >
                        <Form.Label>Account No<span className="text-danger">*</span> </Form.Label>
                        <Form.Control type="number"
                        ref={accountNoRef}
                        defaultValue={ data.accountDetails.account_no }
                        onKeyUp={(e)=>handelNumberValue(e)}
                        placeholder="account no " required />
                    </Form.Group>
                    <Form.Group className="my-3" >
                        <Form.Label>Ifsc Code<span className="text-danger">*</span> </Form.Label>
                        <Form.Control type="text"
                        ref={ifscRef}
                        defaultValue={ data.accountDetails.ifsc_code }
                        placeholder="Ifsc Code" required/>
                    </Form.Group>
                    <Form.Group className="my-3" >
                        <Form.Label>Bank name<span className="text-danger">*</span> </Form.Label>
                        <Form.Control type="text"
                        ref={bankNameRef}
                        defaultValue={ data.accountDetails.bank_name } 
                        placeholder="Bank name" required />
                    </Form.Group>
                    <Form.Group className="my-3" >
                        <Form.Label>Branch Name</Form.Label>
                        <Form.Control type="text"
                        ref={branchNameRef}
                        defaultValue={ data.accountDetails.branch_name } 
                        placeholder="Branch Name" required />
                    </Form.Group>
                    <div className="d-flex align-items-center justify-content-between">        
                        <Form.Group controlId="formFile" className="mt-3">
                            <Form.Label>Attachment <span className="text-danger">* (only .jpg/.jpeg)</span></Form.Label>
                            <Form.Control 
                            ref={fileRef}
                            onChange={onSelectFile}
                            accept=".jpg,.jpeg|image/*"
                            type="file" />
                        </Form.Group>
                    </div> 
                    <div className="img-part ms-3 my-3">
                      <img
                        src={
                          selectedFile
                            ? preview
                            : data.accountDetails.file_link
                        }
                        alt="Preview"
                      />
                    </div>
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
                                    &#10240;{isEdit?"Update":"Save" }
                                    </Button>
                                :
                            <Button variant="success" type='submit' className="mt-4">
                                { isEdit?"Update":"Save" }
                            </Button>
                        }                                
                    </Form>
                </Modal.Body>
              </Modal>
            </Tab>
            <Tab eventKey="documents" title="Documents">
              <h4>Documents</h4>
              <div className="row mt-4">
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="basic_page_details">
                    <h6 className="mb-4">Pan Card   {data.employeeDetails.panCard_link?(!is_deleted &&<span onClick={()=>setPanEdit(!panEdit)}><CiEdit/></span>): ""}</h6>
                  </div>
                  <div className="img-document">
                    {(data.employeeDetails.panCard_link && !panEdit)?<img
                      src={
                        data.employeeDetails.panCard_link
                          ? data.employeeDetails.panCard_link
                          : Verdi
                      }
                      alt="Verdi"
                    />
                    :(!is_deleted && <Form onSubmit={handelPanSubmit}>
                      <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Pan Card<span className="text-danger">* (only .jpg/,jpeg)</span> </Form.Label>
                        <Form.Control type="file"
                          ref={panRef}
                          accept=".jpg,.jpeg|image/*"
                          placeholder="Account Number" />
                        </Form.Group>
                        <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Pan Number</Form.Label>
                            <Form.Control type="text"
                            ref={panNumberRef}
                            defaultValue={data.employeeDetails.panCard_no}
                            placeholder="Branch Code" />
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
                            &#10240;{(data.employeeDetails.panCard_link && panEdit)?"Update":"Save" }
                            </Button>
                        :
                          <Button variant="success" type='submit' className="mt-4">
                              {(data.employeeDetails.panCard_link && panEdit)?"Update":"Save" }
                          </Button>
                        }
                      </Form>)
                    }
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="basic_page_details">
                    <h6 className="mb-4">Aadhar Card  {data.employeeDetails.aadharCard_link?(!is_deleted &&<span onClick={()=>setAdharEdit(!adharEdit)}><CiEdit/></span>):''}</h6>
                  </div>
                  <div className="img-document">
                  {(data.employeeDetails.aadharCard_link && !adharEdit)?
                  <a href={data.employeeDetails.aadharCard_link } className='ms-2 btn btn-success text-white' target="_blank" rel="noreferrer">Open</a>
                    :(!is_deleted &&<Form onSubmit={handelAdharSubmit}>
                      <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Adhar Card<span className="text-danger">* (only .pdf)</span> </Form.Label>
                        <Form.Control type="file"
                          ref={adharRef}
                          accept="application/pdf"
                          placeholder="Account Number" />
                        </Form.Group>
                        <Form.Group className="my-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Adhar Number</Form.Label>
                            <Form.Control type="text"
                            ref={adharNumberRef}
                            defaultValue={data.employeeDetails.aadharCard_no}
                            placeholder="Branch Code" />
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
                                &#10240;{data.employeeDetails.aadharCard_link?"Update":"Save" }
                                </Button>
                            :
                              <Button variant="success" type='submit' className="mt-4">
                                  { data.employeeDetails.aadharCard_link && adharEdit?"Update":"Save" }
                              </Button>
                            }  
                      </Form>)
                    }
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="basic_page_details">
                    <h6 className="mb-4">Bank Account</h6>
                  </div>
                  <div className="img-document">
                    <img
                      src={
                        data.accountDetails.file_link
                          ? data.accountDetails.file_link
                          : Verdi
                      }
                      alt="Verdi"
                    />
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="attendance" title="Attendance">
              <h4>Attendance</h4>
              <div className="responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-white">Index</th>
                      <th className="text-white">Date</th>
                      <th className="text-white">Shift</th>
                      <th className="text-white">Clock IN</th>
                      <th className="text-white">Clock OUT</th>
                      <th className="text-white">Late</th>
                      <th className="text-white">Early Leaving</th>
                      <th className="text-white">Effective⠀hours</th>
                      <th className="text-white">Total hours</th>   
                    </tr>
                  </thead>
                  <tbody>
                    {data.isLoading ? (
                      <tr key={0} className="text-center">
                        <td colSpan={8}>Loading...</td>
                      </tr>
                    ) : data.attendanceDetails.length > 0 ? (
                      data.attendanceDetails.map((result, index) => {
                        return (<>                        
                        { result.status==="present" && 
                            <tr key={index}>
                            <td>{(index + 1)}</td>
                            <td><LocaDateFormate date_arg = {result.created_at}/></td>
                            <td>
                              <TitleCase
                                text={result.timeSlot ? result.timeSlot.shift : "N/A"}
                              />
                            </td>
                            <td>
                              <LocalTimeZone time = {result.inTime}/>
                            </td>
                            <td>
                              { 
                                  result.outTime? <LocalTimeZone time = {result.outTime}/>:"--:--"
                              }
                            </td>
                            <td className="text-center">
                              <CalculationLate late = {result.late}/>
                            </td>
                            <td className="text-center">
                              <CalculateEarlyLeave checkOut = {result.outTime} outTime = {result.timeSlot.time_out}/>
                            </td>
                            <td>
                              {result.effective_hours
                                ? `${result.effective_hours}`
                                : "--:--"}
                            </td>
                            <td>
                              {result.duration
                                ? `${result.duration}`
                                : "--:--"}
                            </td>
                            </tr>
                        }
                        { result.status !== "present" && 
                            <tr key={index} className={result.status==="absent"?"table-danger":result.status==="leave"?"table-info":"table-warning"}>
                              <td>{(index + 1)}</td>
                              <td><LocaDateFormate date_arg = {result.created_at}/></td>
                              <td colSpan={7} className="text-center" ><TitleCase text ={result.status}/></td>
                            </tr>
                        }
                      </> )})
                    ) : (
                      <tr key={0}>
                        <td colSpan={8} className="text-center">
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Tab>
            <Tab eventKey="salary" title="Salary">
              <h4>Salary</h4>
              <div className="responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-white">S.No.</th>
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
                    ) : data.salaryDetails.length > 0 ? (
                      data.salaryDetails.map((result, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{result.month}</td>
                          <td>{data.employeeDetails.salary}</td>
                          <td>{result.amount}</td>
                          <td>
                            {data.employeeDetails.salary_slip ? "Yes" : "No"}
                          </td>
                          <td>{result.status}</td>
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
              </div>
            </Tab>
            <Tab eventKey="leaves" title="leaves">
              <h4>Leaves</h4>
              <div className="responsive mt-4">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="text-white">SL No</th>
                      <th className="text-white">Leave Type</th>
                      <th className="text-white">Reason</th>
                      <th className="text-white">Leave Duration</th>
                      <th className="text-white">Days</th>
                      <th className="text-white">Applied On</th>
                      <th className="text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.isLoading ? (
                      <tr key={0} className="text-center">
                        <td colSpan={8}>Loading...</td>
                      </tr>
                    ) : data.leaveDetail.length > 0 ? (
                      data.leaveDetail.map((result, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>

                          <td><TitleCase text={result.type}/></td>
                          <td><ReadMoreReadLess text={result.reason} limit={50}/></td>
                          <td>
                            {result.start_date
                              ? result.start_date.slice(0, 10)
                              : "N/A"}{" "}
                            To{" "}
                            {result.end_date
                              ? result.end_date.slice(0, 10)
                              : "N/A"}
                          </td>
                          <td>
                            {result.end_date && result.start_date
                              ? (new Date(result.end_date).getTime() -
                                  new Date(result.start_date).getTime()) /
                                (1000 * 3600 * 24)
                              : "N/A"}
                          </td>
                          <td>{result.created_at.slice(0, 10)}</td>
                          <td>{result.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr key={0}>
                        <td colSpan={8} className="text-center">
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetails;
