import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  deleteRecord,
  addRecord,
  getOne,
  unsetSingleData,
  updateRecord,
  getAllByDepartment,
  serchingData,
  restoreRecord,
  clearMacAddress,
} from "../../store/admin/employees";
import "./employees.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
//import User from "../../assets/images/user.jpg";
import {
  Spinner,
  Pagination,
  Modal,
  Table,
  InputGroup,
  Button,
  Form,
  Tabs,
  Tab,
} from "react-bootstrap";
import { IoIosArrowRoundUp, IoIosArrowRoundDown } from "react-icons/io";
import { debounce } from "lodash";
import EmployeeDetails from "./components/employee-details";
import Verdi from "../../assets/images/verdi.png";
import { CSVLink } from "react-csv";
import Loader from "../../Components/loader";
import TitleCase from "../../helper/title-case";
import { storage } from "../../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";

function Employees(props) {
  const dispatch = useDispatch();
  const notify = props.notify;
  const jwt = props.jwt;

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const [mobile_no, setMobile_no] = useState() 
  const [alter_mobile_no, setAlter_mobile_no] = useState()
  const genderRef = useRef();

  const addressRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const pinCodeRef = useRef();

  const paddressRef = useRef();
  const pstateRef = useRef();
  const pcountryRef = useRef();
  const ppinCodeRef = useRef();

  const shiftRef = useRef();
  const joiningRef = useRef();
  const basicSalaryRef = useRef();
  const degRef = useRef();
  const imageRef = useRef();
  const serchingKeyRef = useRef();
  const filterRef = useRef();
  const [salary, setSalary] = useState({ min: "", max: "" });
  const [deletedTab, setDeletedTab] = useState(false);
  const [slip, setSlip] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [show, setShow] = useState(false);
  const [showMac, setShowMac] = useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState();
  const [is_deleted, setIs_Deleted] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [file, setFile] = useState({ image: null, adhar: null, pan: null });
  const data = useSelector((status) => status.employees);
  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);

  useEffect(()=>{
    if( data.singledata.length > 0){
      setMobile_no(data.singledata[0].mobile_no)
      setAlter_mobile_no(data.singledata[0].alternate_mobile_no)
    }
  },[data.singledata])

  //...///
//   let x 
//   async function checkIfFileExists(filePath) {
//     console.log("hiiii")
    
// }


  //...... submit ......//
  useEffect(() => {
    if (!data.isError) {
      setShow(false);
      setSalary({ max: null, min: null });
      setIsEdit(false);
      setIsEmailSent(false);
      setSelectedFile("");
      dispatch(unsetSingleData());
      setShowMac(false)
    }
  }, [data.isError, dispatch]);
  const handelSubmit = async(e) => {
    e.preventDefault();
    if (!isEdit) {
      //... Create Record ...//
      dispatch(
        addRecord({
          jwt,
          name:
            firstNameRef.current.value.trim() +
            " " +
            lastNameRef.current.value.trim(),
          email: emailRef.current.value.trim(),
          mobile: mobile_no.trim(),
          alternetMobile: alter_mobile_no,
          gender: genderRef.current.value.trim(),
          current_address: {
            address: addressRef.current.value.trim(),
            state: stateRef.current.value.trim(),
            country: countryRef.current.value.trim(),
            pincode: pinCodeRef.current.value.trim(),
          },
          parmanent_address: {
            address: paddressRef.current.value.trim(),
            state: pstateRef.current.value.trim(),
            country: pcountryRef.current.value.trim(),
            pincode: ppinCodeRef.current.value.trim(),
          },
          salary: basicSalaryRef.current.value.trim(),
          shift: shiftRef.current.value.trim(),
          designation: degRef.current.value.trim(),
          date_of_joining: joiningRef.current.value.trim(),
          image: imageRef.current.files[0],
          slip: slip,
          total: data.allData.length,
        })
      );
    } else {
      //... Update Record ...//
      const filePath = data.singledata[0].image_path
      const docRef = ref(storage, filePath)
      try {
          await getDownloadURL(docRef)
          console.log("in",true)
          dispatch(
            updateRecord({
              jwt,
              id: data.singledata[0]._id,
              oldimage_path: data.singledata[0].image_path,
              oldimage_link: data.singledata[0].image_link,
              name:
                firstNameRef.current.value.trim() +
                " " +
                lastNameRef.current.value.trim(),
              email: emailRef.current.value.trim(),
              mobile: mobile_no.trim(),
              alternetMobile: alter_mobile_no,
              gender: genderRef.current.value.trim(),
              current_address: {
                address: addressRef.current.value.trim(),
                state: stateRef.current.value.trim(),
                country: countryRef.current.value.trim(),
                pincode: pinCodeRef.current.value.trim(),
              },
              parmanent_address: {
                address: paddressRef.current.value.trim(),
                state: pstateRef.current.value.trim(),
                country: pcountryRef.current.value.trim(),
                pincode: ppinCodeRef.current.value.trim(),
              },
              salary: basicSalaryRef.current.value.trim(),
              shift: shiftRef.current.value.trim(),
              designation: degRef.current.value.trim(),
              date_of_joining: joiningRef.current.value.trim(),
              image: imageRef.current.files[0],
              slip: slip,
              is_send: isEmailSent,
            })
          );
          return true
      } catch (error) {
          console.log("in",false)
          dispatch(
            updateRecord({
              jwt,
              id: data.singledata[0]._id,
              oldimage_path: null,
              oldimage_link: null,
              name:
                firstNameRef.current.value.trim() +
                " " +
                lastNameRef.current.value.trim(),
              email: emailRef.current.value.trim(),
              mobile: mobile_no.trim(),
              alternetMobile: alter_mobile_no,
              gender: genderRef.current.value.trim(),
              current_address: {
                address: addressRef.current.value.trim(),
                state: stateRef.current.value.trim(),
                country: countryRef.current.value.trim(),
                pincode: pinCodeRef.current.value.trim(),
              },
              parmanent_address: {
                address: paddressRef.current.value.trim(),
                state: pstateRef.current.value.trim(),
                country: pcountryRef.current.value.trim(),
                pincode: ppinCodeRef.current.value.trim(),
              },
              salary: basicSalaryRef.current.value.trim(),
              shift: shiftRef.current.value.trim(),
              designation: degRef.current.value.trim(),
              date_of_joining: joiningRef.current.value.trim(),
              image: imageRef.current.files[0],
              slip: slip,
              is_send: isEmailSent,
            })
          );
          return false
          
      }
      
    }
  };
  //shorting.....
  const handelshorting = (key) => {
    dispatch(getAll({ jwt, param: key, x: !data.sorting_on.sort }));
  };
  //serching.......
  const handelserching = debounce(() => {
    let searchKey = serchingKeyRef.current.value;
    if (searchKey.length === 0) {
      dispatch(getAll({ jwt }));
    }
    if (searchKey.length >= 3) {
      dispatch(serchingData({ jwt, searchKey }));
    }
    filterRef.current.value = "";
  }, 500);

  //......pagination.......//
  //....All Data...//
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
  //...... deleted data ........//
  let items1 = [];
  for (
    let number = 1;
    number <= data.pagination_Deleted_AllData.totalpages;
    number++
  ) {
    items1.push(
      <Pagination.Item
        key={`deleted-` + number}
        active={number === data.pagination_Deleted_AllData.currentpage}
        onClick={() => handelPagination(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  const handelPagination = (number) => {
    if (data.isSearch && !deletedTab)
      return dispatch(
        serchingData({
          jwt,
          pageno: number,
          searchKey: serchingKeyRef.current.value,
        })
      );
    if (data.isfilter && !deletedTab)
      return dispatch(
        getAllByDepartment({ jwt, pageno: number, id: data.filter })
      );
    return dispatch(
      getAll({
        jwt,
        pageno: number,
        type: deletedTab ? "deleted" : "available ",
      })
    );
  };
  //delete.....
  const handeldelete = () => {
    dispatch(
      deleteRecord({
        jwt,
        id,
        file,
        pageno:
          data.allData.length === 1 && data.pagination_AllData.currentpage > 1
            ? Number(data.pagination_AllData.currentpage) - 1
            : data.pagination_AllData.currentpage,
      })
    );
    setView(!view);
    setShowDelete(false);
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
  };
  //.....filter.....//
  const filter = (e) => {
    if (e.target.value)
      dispatch(getAllByDepartment({ id: e.target.value, jwt }));
    else dispatch(getAll({ jwt }));
  };
  const handelTab = (e) => {
    if (e === "available") {
      setDeletedTab(false);
    } else {
      setDeletedTab(true);
    }
  };
  //.......//
  const handleShow = async (id, isedite = false, max, min) => {
    setShow(true);
    if (isedite) {
      setSalary({
        ...salary,
        max: max,
        min: min,
      });
      setIsEdit(true);
      dispatch(getOne(id));
    } else {
      setIsEdit(false);
    }
  };
  const handleClose = () => {
    setShow(false);
    setSalary({ ...salary, max: null, min: null });
    setIsEdit(false);
    setIsEmailSent(false);
    setSlip(false);
    setSelectedFile("");
    setMobile_no()
    setAlter_mobile_no()
    dispatch(unsetSingleData());
  };
  const handelSelectDesingnation = async () => {
    if (degRef.current.value) {
      if (data.alldesignation.length > 0) {
        data.alldesignation.forEach((result) => {
          result.departments.forEach((result2) => {
            if (result2.designation.length > 0)
              result2.designation.forEach((result1) => {
                if (result1._id === degRef.current.value) {
                  setSalary({
                    ...salary,
                    max: result1.max_salary,
                    min: result1.min_salary,
                  });
                  return;
                }
              });
          });
        });
      }
    } else {
      setSalary({ ...salary, max: null, min: null });
    }
  };

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
  const checkAddresh = (e) => {
    if (e.target.checked) {
      paddressRef.current.value = addressRef.current.value;
      pstateRef.current.value = stateRef.current.value;
      pcountryRef.current.value = countryRef.current.value;
      ppinCodeRef.current.value = pinCodeRef.current.value;
    } else {
      paddressRef.current.value = "";
      pstateRef.current.value = "";
      pcountryRef.current.value = "";
      ppinCodeRef.current.value = "";
    }
  };
  const checkvalue = (e) => {
    setSlip(e.target.checked);
  };
  const checkSendEmailOrNot = (e) => {
    setIsEmailSent(e.target.checked);
  };

  const [view, setView] = useState(false);
  const handelview = (id, image, adhar, pan, isDelete = false) => {
    setView(!view);
    setId(id);
    setIs_Deleted(isDelete);
    setFile({ ...file, image: image, adhar: adhar, pan: pan });
  };

  const handlemacShow = (id)=>{
    console.log(id)
    setId(id)
    setShowMac(true)
  }
  const handlecleanMac = ()=>{
    dispatch(clearMacAddress({jwt, id}))
  }

  
  if (data.isFirstLoading) return <Loader />;

  if (!view)
    return (
      <>
        <div className="page-section p-4">
          <div className="employees chart mb-5">
            <div className="d-md-flex d-block justify-content-between">
              <h4>Employees List</h4>
              <div className="d-flex align-items-center">
                <Button variant="dark" onClick={() => handleShow()}>
                  + Add Employees
                </Button>
                {data.allData.length > 0 ? (
                  <CSVLink
                    className="btn btn-info text-white ms-2"
                    data={
                      data.allData.length > 0
                        ? data.allData.map((prod, index) => {
                            return {
                              "S.No.": index + 1,
                              "User Name": prod.name,
                              Gender:
                                prod.gender === "F"
                                  ? "Female"
                                  : prod.gender === "M"
                                  ? "Male"
                                  : "Other",
                              "Phone Number": prod.mobile_no,
                              "Alternate Number": prod.alternate_mobile_no
                                ? prod.alternate_mobile_no
                                : "N/A",
                              Email: prod.email,
                              "Current Address": prod.current_address
                                ? prod.current_address.address +
                                  ", " +
                                  prod.current_address.state +
                                  ", " +
                                  prod.current_address.country +
                                  ", " +
                                  prod.current_address.pincode
                                : "N/A",
                              "Department And Degignation": prod.designation
                                ? prod.designation.department
                                  ? prod.designation.name +
                                    "(" +
                                    prod.designation.department.name +
                                    ")"
                                  : "N/A"
                                : "N/A",
                              "Created At": prod.created_at,
                            };
                          })
                        : " "
                    }
                    filename={`employee-${new Date(
                      Date.now()
                    ).toLocaleDateString()}.csv`}
                  >
                    Download&#10240;Report
                  </CSVLink>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="row align-items-center justify-content-between my-4">
              <div className="col-lg-3 col-12">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => filter(e)}
                  ref={filterRef}
                >
                  <option value={""}>Filter User A/C Department</option>
                  {data.headAllData.length > 0
                    ? data.headAllData.map((result, index) => {
                        const { departments } = result;
                        return (
                          <optgroup key={`opt-${index}`} label={result.name}>
                            {departments.length > 0
                              ? departments.map((result, index1) => (
                                  <option key={index1} value={result.id}>
                                    <TitleCase text={result.name} />
                                  </option>
                                ))
                              : ""}
                          </optgroup>
                        );
                      })
                    : ""}
                </Form.Select>
              </div>
              <div className="col-lg-3 col-12"></div>
              <div className="col-lg-3 col-12">
                <InputGroup className="me-3 my-lg-0 my-3">
                  <Form.Control
                    placeholder="Search...."
                    onChange={handelserching}
                    ref={serchingKeyRef}
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                </InputGroup>
              </div>
            </div>
            <Tabs
              defaultActiveKey="available"
              onSelect={handelTab}
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="available" title="Available">
                <div className="responsive mt-4">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th className="text-white">S.No.</th>
                        <th
                          className="text-white"
                          onClick={() => handelshorting("name")}
                        >
                          Name
                          {data.sorting_on.field === "name" ? (
                            data.sorting_on.sort ? (
                              <span className="text-white">
                                <IoIosArrowRoundUp />
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: "#fff",
                                  position: "relative",
                                  right: "0",
                                }}
                              >
                                <IoIosArrowRoundDown />
                              </span>
                            )
                          ) : (
                            <></>
                          )}
                        </th>
                        <th className="text-white">Designation</th>
                        <th className="text-white">Contact&#10240;Number</th>
                        <th className="text-white">Gender</th>
                        <th className="text-white">Address</th>
                        <th className="text-white">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.isLoading ? (
                        <tr key={"loading"} className="text-center">
                          <td colSpan={8}>Loading...</td>
                        </tr>
                      ) : data.allData.length > 0 ? (
                        data.allData.map((result, index) => (
                          <tr key={index}>
                            <td>
                              {(data.pagination_AllData.currentpage - 1) * 10 +
                                (index + 1)}
                            </td>
                            <td>
                              <div className="d-flex">
                                {/* <img
                                  src={
                                    result.image_link ? result.image_link : User
                                  }
                                  alt="User"
                                  className="img-fluid rounded-circle"
                                  style={{ width: "40px", height: "40px" }}
                                /> */}
                                <div className="ms-3">
                                  <h6 className="mb-0 ">
                                    <TitleCase text={result.name} />
                                  </h6>
                                  <small className="mb-0 text-muted">
                                    {result.email}
                                  </small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="ms-3">
                                <h6 className="mb-0 ">
                                  <TitleCase text={result.designation.name} />
                                </h6>
                                <small className="mb-0 text-muted">
                                  <TitleCase
                                    text={
                                      result.designation.department.user_head
                                    }
                                  />
                                </small>
                              </div>
                            </td>
                            <td>
                              {result.mobile_no}{result.alternate_mobile_no &&`, ${result.alternate_mobile_no}`}
                            </td>
                            <td>
                              {result.gender === "F"
                                ? "Female"
                                : result.gender === "M"
                                ? "Male"
                                : "Other"}
                            </td>
                            <td>
                              <address>
                                <TitleCase
                                  text={result.current_address.address}
                                />
                                ,<br />
                                <TitleCase
                                  text={result.current_address.state}
                                />
                                ,<br />
                                <TitleCase
                                  text={result.current_address.country}
                                />
                                ,
                                <TitleCase
                                  text={result.current_address.pincode}
                                />
                              </address>
                            </td>
                            <td className="table-data-btn">
                              {!result.is_deleted && (
                                <Button
                                  onClick={() => {
                                    handleShow(
                                      result._id,
                                      true,
                                      result.designation.max_salary,
                                      result.designation.min_salary
                                    );
                                  }}
                                  className="btn btn-warning text-white"
                                >
                                  Edit
                                </Button>
                              )}
                              <Button
                                  onClick={() =>handlemacShow(result._id)}
                                  className="btn btn-danger text-white"
                                >
                                  Clear&#10240;MAC
                                </Button>
                              <button
                                type="button"
                                onClick={() =>
                                  handelview(
                                    result._id,
                                    result.image_path,
                                    result.aadharCard_path,
                                    result.panCard_path,
                                    result.is_deleted
                                  )
                                }
                                className="w-100 btn btn-primary"
                              >
                                View
                              </button>
                              
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
                  <Pagination> {items}</Pagination>
                </div>
              </Tab>
              <Tab eventKey="deleted" title="Deleted">
                <div className="responsive mt-4">
                  <Table striped bordered responsive hover>
                    <thead>
                      <tr>
                        <th className="text-white">S.No.</th>
                        <th className="text-white">Name</th>
                        <th className="text-white">Designation</th>
                        <th className="text-white">Contact&#10240;Number</th>
                        <th className="text-white">Gender</th>
                        <th className="text-white">Address</th>
                        <th className="text-white">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.isLoading ? (
                        <tr key={"loading"} className="text-center">
                          <td colSpan={8}>Loading...</td>
                        </tr>
                      ) : data.deleted_allData.length > 0 ? (
                        data.deleted_allData.map((result, index) => (
                          <tr key={index}>
                            <td>
                              {(data.pagination_Deleted_AllData.currentpage -
                                1) *
                                10 +
                                (index + 1)}
                            </td>
                            <td>
                              <div className="d-flex">
                                {/* <img
                                  src={
                                    result.image_link ? result.image_link : User
                                  }
                                  alt="User"
                                  className="img-fluid rounded-circle"
                                  style={{ width: "40px", height: "40px" }}
                                /> */}
                                <div className="ms-3">
                                  <h6 className="mb-0 ">
                                    <TitleCase text={result.name} />
                                  </h6>
                                  <small className="mb-0 text-muted">
                                    {result.email}
                                  </small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="ms-3">
                                <h6 className="mb-0 ">
                                  <TitleCase text={result.designation.name} />
                                </h6>
                                <small className="mb-0 text-muted">
                                  <TitleCase
                                    text={
                                      result.designation.department.user_head
                                    }
                                  />
                                </small>
                              </div>
                            </td>
                            <td>
                              {result.mobile_no} , {result.alternate_mobile_no}
                            </td>
                            <td>
                              {result.gender === "F"
                                ? "Female"
                                : result.gender === "M"
                                ? "Male"
                                : "Other"}
                            </td>
                            <td>
                              <address>
                                <TitleCase
                                  text={result.current_address.address}
                                />
                                ,<br />
                                <TitleCase
                                  text={result.current_address.state}
                                />
                                ,<br />
                                <TitleCase
                                  text={result.current_address.country}
                                />
                                ,
                                <TitleCase
                                  text={result.current_address.pincode}
                                />
                              </address>
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={() =>
                                  handelview(
                                    result._id,
                                    result.image_path,
                                    result.aadharCard_path,
                                    result.panCard_path,
                                    result.is_deleted
                                  )
                                }
                                className="ms-3 btn btn-primary"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  dispatch(
                                    restoreRecord({
                                      id: result._id,
                                      jwt,
                                      pageno:
                                        data.deleted_allData.length === 1 &&
                                        data.pagination_Deleted_AllData
                                          .currentpage > 1
                                          ? Number(
                                              data.pagination_Deleted_AllData
                                                .currentpage
                                            ) - 1
                                          : data.pagination_Deleted_AllData
                                              .currentpage,
                                    })
                                  )
                                }
                                className="ms-3 btn btn-warning"
                              >
                                Restore
                              </button>
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
                  <Pagination> {items1}</Pagination>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <Modal
          contentClassName="employees-modal"
          show={show}
          onHide={handleClose}
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              {isEdit ? "Edit Employees" : "Add Employees"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handelSubmit}>
              <div className="row">
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {" "}
                      First Name <span className="text-danger">*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      ref={firstNameRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].name
                              .split(" ")
                              .slice(0, 1)
                              .join(" ")
                          : ""
                      }
                      placeholder="First Name"
                      required
                    />
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) =>
                            err.param === "name" ? (
                              <TitleCase
                                key={"err" + err.param}
                                text={err.msg}
                              />
                            ) : (
                              ""
                            )
                          )
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Last Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      ref={lastNameRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].name
                              .split(" ")
                              .slice(-1)
                              .join(" ")
                          : ""
                      }
                      placeholder="Last Name"
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Gender<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      ref={genderRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].gender
                          : ""
                      }
                      aria-label="Default select example"
                      required
                    >
                      <option value={""}>Select</option>
                      <option value="F">Female</option>
                      <option value="M">Male</option>
                      <option value="O">Other</option>
                    </Form.Select>
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) =>
                            err.param === "gender" ? (
                              <TitleCase
                                key={"err" + err.param}
                                text={err.msg}
                              />
                            ) : (
                              ""
                            )
                          )
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <hr />
                <h4>Current Address</h4>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group
                    className="mb-0"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>
                      Address<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      ref={addressRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].current_address.address
                          : ""
                      }
                      rows={3}
                      placeholder="Address"
                      required
                    />
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) => {
                            const { param } = err;
                            if (param === "current_address") {
                              const msg = JSON.parse(err.msg);
                              if (msg.param === "address") {
                                return <TitleCase text={msg.msg} />;
                              }
                            }
                            return true;
                          })
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      State<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      ref={stateRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].current_address.state
                          : ""
                      }
                      required
                    >
                    </Form.Control>
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) => {
                            const { param } = err;
                            if (param === "current_address") {
                              const msg = JSON.parse(err.msg);
                              if (msg.param === "state") {
                                return <TitleCase text={msg.msg} />;
                              }
                            }
                            return true;
                          })
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Country <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      ref={countryRef}
                      defaultValue="India"
                      placeholder="Country"
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Pin Code <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      ref={pinCodeRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].current_address.pincode
                          : ""
                      }
                      min={100000}
                      max={999999}
                      placeholder="Pin Code"
                      required
                    />
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) => {
                            const { param } = err;
                            if (param === "current_address") {
                              const msg = JSON.parse(err.msg);
                              if (msg.param === "pincode") {
                                return <TitleCase text={msg.msg} />;
                              }
                            }
                            return true;
                          })
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <h4>Permanent Address</h4>
                {["checkbox"].map((type) => (
                  <div key={`default-${type}`} className="mb-3">
                    <Form.Check
                      type={type}
                      onChange={checkAddresh}
                      label="Same As Current"
                    />
                  </div>
                ))}
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group
                    className="mb-0"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>
                      Address<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      ref={paddressRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].parmanent_address.address
                          : ""
                      }
                      rows={3}
                      placeholder="Address"
                      required
                    />
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) => {
                            const { param } = err;
                            if (param === "parmanent_address") {
                              const msg = JSON.parse(err.msg);
                              if (msg.param === "address") {
                                return <TitleCase text={msg.msg} />;
                              }
                            }
                            return true;
                          })
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      State<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      ref={pstateRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].current_address.state
                          : ""
                      }
                      required
                    >
                    </Form.Control>
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) => {
                            const { param } = err;
                            if (param === "parmanent_address") {
                              const msg = JSON.parse(err.msg);
                              if (msg.param === "state") {
                                return <TitleCase text={msg.msg} />;
                              }
                            }
                            return true;
                          })
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Country <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      ref={pcountryRef}
                      defaultValue="India"
                      placeholder="Country"
                      required
                    />
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) => {
                            const { param } = err;
                            if (param === "parmanent_address") {
                              const msg = JSON.parse(err.msg);
                              if (msg.param === "country") {
                                return <TitleCase text={msg.msg} />;
                              }
                            }
                            return true;
                          })
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Pin Code <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      ref={ppinCodeRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].parmanent_address.pincode
                          : ""
                      }
                      min={100000}
                      max={999999}
                      placeholder="Pin Code"
                      required
                    />
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) => {
                            const { param } = err;
                            if (param === "parmanent_address") {
                              const msg = JSON.parse(err.msg);
                              if (msg.param === "pincode") {
                                return <TitleCase text={msg.msg} />;
                              }
                            }
                            return true;
                          })
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <hr />
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Contact Number <span className="text-danger">*</span>
                    </Form.Label>
                    <PhoneInput
                      placeholder="Enter phone number"
                      international={true}
                      defaultCountry="IN"
                      countries={["IN","AE"]}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].mobile_no
                          : ""
                      }
                      value={mobile_no}
                      onChange={setMobile_no}
                    />
                    {/* <Form.Control
                      type="text"
                      ref={contactNumberRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].mobile_no
                          : ""
                      }
                      placeholder="Contact Number"
                      required
                    /> */}
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) =>
                            err.param === "mobile_no" ? (
                              <TitleCase
                                key={"err" + err.param}
                                text={err.msg}
                              />
                            ) : (
                              ""
                            )
                          )
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Alternate Contact Number</Form.Label>
                    <PhoneInput
                      placeholder="Enter phone number"
                      international={true}
                      defaultCountry="IN"
                      countries={["IN","AE"]}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].alternate_mobile_no
                          : ""
                      }
                      value={alter_mobile_no}
                      onChange={setAlter_mobile_no}
                    />
                    {/* <Form.Control
                      type="text"
                      ref={altcontactNumberRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].alternate_mobile_no
                          : ""
                      }
                      placeholder="Alternate Contact Number"
                    /> */}
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      {" "}
                      Email <span className="text-danger">*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      type="email"
                      ref={emailRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].email
                          : ""
                      }
                      placeholder="Email"
                      required
                    />
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) =>
                            err.param === "email" ? (
                              <TitleCase
                                key={"err" + err.param}
                                text={err.msg}
                              />
                            ) : (
                              ""
                            )
                          )
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {" "}
                      Office Shift <span className="text-danger">*</span>{" "}
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].shift._id
                          : ""
                      }
                      ref={shiftRef}
                      required
                    >
                      <option value={""}> Select</option>
                      {data.allShiftData.length > 0
                        ? data.allShiftData.map((result, index) => (
                            <option key={index} value={result._id}>
                              {result.shift}
                            </option>
                          ))
                        : ""}
                    </Form.Select>
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) =>
                            err.param === "shift" ? (
                              <TitleCase
                                key={"err" + err.param}
                                text={err.msg}
                              />
                            ) : (
                              ""
                            )
                          )
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Designation <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].designation._id
                          : ""
                      }
                      onKeyUp={handelSelectDesingnation}
                      onClick={handelSelectDesingnation}
                      ref={degRef}
                      className="form-control"
                      required
                    >
                      <option key={"option-none"} value={""}>
                        Select
                      </option>
                      {data.alldesignation.length > 0
                        ? data.alldesignation.map((result, ind) => {
                            let { name, departments } = result;
                            return (
                              <Fragment key={ind}>
                                {departments.length > 0
                                  ? departments.map((result1, index1) => {
                                      let { designation } = result1;
                                      return (
                                        <optgroup
                                          key={`opt-${index1}`}
                                          label={
                                            result1.name + "(" + name + ")"
                                          }
                                        >
                                          {designation.length > 0
                                            ? designation.map(
                                                (result3, index) => (
                                                  <option
                                                    key={`option-${index}`}
                                                    value={result3._id}
                                                  >
                                                    {result3.name}
                                                  </option>
                                                )
                                              )
                                            : ""}
                                        </optgroup>
                                      );
                                    })
                                  : ""}
                              </Fragment>
                            );
                          })
                        : ""}
                    </Form.Select>
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) =>
                            err.param === "designation" ? (
                              <TitleCase
                                key={"err" + err.param}
                                text={err.msg}
                              />
                            ) : (
                              ""
                            )
                          )
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>
                      Joining Date <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      ref={joiningRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].date_of_joining.substring(0, 10)
                          : ""
                      }
                      placeholder="Joining date"
                      required
                    />
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) =>
                            err.param === "date_of_joining" ? (
                              <TitleCase
                                key={"err" + err.param}
                                text={err.msg}
                              />
                            ) : (
                              ""
                            )
                          )
                        : ""}
                    </span>
                  </Form.Group>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <Form.Group className="mt-3" controlId="formBasicEmail">
                    <Form.Label>
                      Basic salary
                      {salary.max
                        ? " ( " + salary.min + " to " + salary.max + " )"
                        : ""}{" "}
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      nmae="basicSalary"
                      ref={basicSalaryRef}
                      defaultValue={
                        data.singledata.length > 0
                          ? data.singledata[0].salary
                          : ""
                      }
                      min={0}
                      placeholder="Basic Salary"
                      required
                    />
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) =>
                            err.param === "salary" ? (
                              <TitleCase
                                key={"err" + err.param}
                                text={err.msg}
                              />
                            ) : (
                              ""
                            )
                          )
                        : ""}
                    </span>
                  </Form.Group>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <Form.Group controlId="formFile" className="mt-3">
                    <Form.Label>
                      Image{" "}
                      <span className="text-danger">
                        *(only .jpg, .jpeg, .png)
                      </span>
                    </Form.Label>
                    <Form.Control
                      ref={imageRef}
                      onChange={onSelectFile}
                      type="file"
                      accept=".jpg,.jpeg,.png"
                    />
                    <span className="text-danger">
                      {data.errors.length > 0
                        ? data.errors.map((err) =>
                            err.param === "image" ? (
                              <TitleCase
                                key={"err" + err.param}
                                text={err.msg}
                              />
                            ) : (
                              ""
                            )
                          )
                        : ""}
                    </span>
                  </Form.Group>
                  <div className="img-part ms-3 my-3">
                    <img
                      src={
                        selectedFile
                          ? preview
                          : data.singledata.length > 0
                          ? data.singledata[0].image_link
                          : Verdi
                      }
                      alt="Preview"
                    />
                  </div>
                </div>
                <div className="radio-btns mt-0">
                  {["checkbox"].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                      <Form.Check
                        type={type}
                        defaultChecked={
                          data.singledata.length > 0
                            ? data.singledata[0].salary_slip
                            : false
                        }
                        onChange={checkvalue}
                        label="Salary Slip"
                      />
                    </div>
                  ))}
                </div>
                {isEdit && (
                  <div className="radio-btns mt-0">
                    {["checkbox"].map((type) => (
                      <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                          type={type}
                          onChange={checkSendEmailOrNot}
                          label="Send password "
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="col-12">
                  {data.isSubmitting ? (
                    <Button variant="primary" className="me-3">
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      &#10240;{isEdit ? "Update" : "Save"}
                    </Button>
                  ) : (
                    <Button variant="primary" className="me-3" type="submit">
                      {isEdit ? "Update" : "Save"}
                    </Button>
                  )}
                </div>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={showMac} onHide={()=>setShowMac(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Clear</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to Clear Mac Address?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => {
                handlecleanMac();
              }}
            >
              Yes
            </Button>
            <Button variant="primary" onClick={()=>setShowMac(false)}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  return (
    <>
      <div className="page-section p-4">
        <div className="employees chart">
          <div className="d-flex justify-content-between">
            <button onClick={() => setView(!view)} className="btn btn-success">
              Back to Home
            </button>
            {!is_deleted && (
              <Button
                variant="danger"
                className="ms-3"
                onClick={() => {
                  setShowDelete(true);
                }}
              >
                Delete
              </Button>
            )}
          </div>
          <EmployeeDetails
            jwt={jwt}
            id={id}
            notify={notify}
            is_deleted={is_deleted}
          />
        </div>
        <Modal show={showDelete} onHide={handleDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Do you really want to delete?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                handleDeleteClose();
                handeldelete();
              }}
            >
              Yes
            </Button>
            <Button variant="primary" onClick={handleDeleteClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
export default Employees;
