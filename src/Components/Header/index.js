import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut, passwordChanged } from "../../store/auth";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Modal,
  Button,
  Spinner,
  Offcanvas,
  NavDropdown,
} from "react-bootstrap";

import { useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineAim,
} from "react-icons/ai";
import {
  HiUserGroup,
  HiOutlineCurrencyRupee,
  HiOutlineDocumentReport,
} from "react-icons/hi";
import { RiBuilding2Fill } from "react-icons/ri";
import { FaBullhorn, FaBusinessTime } from "react-icons/fa";
import {
  MdOutlineFormatTextdirectionLToR,
  MdPolicy,
  MdOutlineHolidayVillage,
} from "react-icons/md";
import { GoClippy } from "react-icons/go";
import { FcLeave } from "react-icons/fc";

import Logo from "../../assets/images/logo.png";
import User from "../../assets/images/wt2.png";
import "./index.css";
import TitleCase from "../../helper/title-case";
//import { BsFillBellFill } from "react-icons/bs";

function Header(props) {
  const notify = props.notify;
  const jwt = props.jwt;

  const dispatch = useDispatch();

  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname);

  const [show, setShow] = useState(false);
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const newconformPasswordRef = useRef();
  const data = useSelector((status) => status.auth);
  //....handel submit....//
  const handelSubmit = (e) => {
    e.preventDefault();
    if (newPasswordRef.current.value === newconformPasswordRef.current.value) {
      dispatch(
        passwordChanged({
          jwt: data.jwt,
          isAdmin: data.current_user.is_admin ? true : false,
          old_pass: oldPasswordRef.current.value,
          new_pass: newPasswordRef.current.value,
        })
      )
    } else {
      return notify("Not Match !");
    }
    handleClose();
  };
  //..//
  const handleClose = () => {
    setShow(false);
  };

  //..... set active when router change.....//
  useEffect(() => {
    setIsActive(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const url =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];
    setIsActive(`/${url}`);
  }, []);

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3" collapseOnSelect>
          <Container fluid>
            <Navbar.Brand href="#">
              <img src={Logo} alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Nav>
              <Dropdown className="d-md-block d-none">
                 <Dropdown.Toggle
                   id="dropdown-basic"
                   className="bg-light border-0"
                 >
                   <img
                     src={
                       data.current_user.image_link
                         ? data.current_user.image_link
                         : User
                     }
                     alt="User"
                   />{" "}
                   <span style={{ color: "#000" }}>
                     <TitleCase text={data.current_user.name}/>
                   </span>
                 </Dropdown.Toggle>
                 <Dropdown.Menu>
                   <Dropdown.Item as={Link} to="/profile">
                     My Profile
                   </Dropdown.Item>
                   <Dropdown.Item onClick={() => setShow(true)}>
                     Change Password
                   </Dropdown.Item>
                   <Dropdown.Item onClick={() => dispatch(logOut({ jwt }))}>
                     Logout
                   </Dropdown.Item>
                 </Dropdown.Menu>
               </Dropdown>
            </Nav>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src={Logo} alt="Logo" />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="d-md-none d-block">
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {!props.current_user.is_admin ?
                    <>
                    <Nav.Link eventKey="1" as={Link} to="/" 
                      className={isActive === "/" ? "active" : ""}
                      onClick={() => setIsActive("/")}>
                        <AiOutlineHome />
                        <span className="ms-2">Home</span>
                    </Nav.Link>
                    <Nav.Link eventKey="2" as={Link} to="/attendance" 
                      className={isActive === "/attendance" ? "active" : ""}
                      onClick={() => setIsActive("/attendance")}>
                        <MdOutlineFormatTextdirectionLToR />
                        <span className="ms-2">Attendance</span>
                    </Nav.Link>
                    <Nav.Link eventKey="3" as={Link} to="/leave" 
                      className={isActive === "/leave" ? "active" : ""}
                      onClick={() => setIsActive("/leave")}>
                        <GoClippy />
                        <span className="ms-2">Leave</span>
                    </Nav.Link>
                    <Nav.Link eventKey="4" as={Link} to="/salary" 
                      className={isActive === "/salary" ? "active" : ""}
                      onClick={() => setIsActive("/salary")}>
                        <HiOutlineCurrencyRupee />
                        <span className="ms-2">Salary</span>
                    </Nav.Link>
                    <Nav.Link eventKey="5" as={Link} to="/policy" 
                      className={isActive === "/policy" ? "active" : ""}
                      onClick={() => setIsActive("/policy")}>
                        <MdPolicy />
                        <span className="ms-2">Policy</span>
                    </Nav.Link>
                    <Nav.Link eventKey="6" as={Link} to="/announcement" 
                      className={isActive === "/announcement" ? "active" : ""}
                      onClick={() => setIsActive("/announcement")}>
                        <FaBullhorn />
                        <span className="ms-2">Announcement</span>
                    </Nav.Link>
                    </>
                    :
                    <>
                    <Nav.Link eventKey="7" as={Link} to="/" 
                      className={isActive === "/" ? "active" : ""}
                      onClick={() => setIsActive("/")}>
                        <AiOutlineHome />
                        <span className="ms-2">Home</span>
                    </Nav.Link>
                    <Nav.Link eventKey="8" as={Link} to="/employees" 
                      className={isActive === "/employees" ? "active" : ""}
                      onClick={() => setIsActive("/employees")}>
                        <HiUserGroup />
                        <span className="ms-2">Employees</span>
                    </Nav.Link>
                    <Nav.Link eventKey="9" as={Link} to="/departments" 
                      className={isActive === "/departments" ? "active" : ""}
                      onClick={() => setIsActive("/departments")}>
                        <RiBuilding2Fill />
                        <span className="ms-2">Department</span>
                    </Nav.Link>
                    <Nav.Link eventKey="9" as={Link} to="/designation" 
                      className={isActive === "/designation" ? "active" : ""}
                      onClick={() => setIsActive("/designation")}>
                        <AiOutlineApartment />
                        <span className="ms-2">Degignation</span>
                    </Nav.Link>
                    
                    <Nav.Link eventKey="10" as={Link} to="/policies" 
                      className={isActive === "/policies" ? "active" : ""}
                      onClick={() => setIsActive("/policies")}>
                        <AiOutlineAim />
                        <span className="ms-2">Policies</span>
                    </Nav.Link>
                    <Nav.Link eventKey="11" as={Link} to="/announcement" 
                      className={isActive === "/announcement" ? "active" : ""}
                      onClick={() => setIsActive("/announcement")}>
                        <FaBullhorn />
                        <span className="ms-2">Announcement</span>
                    </Nav.Link>
                    <Nav.Link eventKey="12" as={Link} to="/attendance" 
                      className={isActive === "/attendance" ? "active" : ""}
                      onClick={() => setIsActive("/attendance")}>
                        <MdOutlineFormatTextdirectionLToR />
                        <span className="ms-2">Attendance</span>
                    </Nav.Link>
                    <Nav.Link eventKey="13" as={Link} to="/monthly-report"
                      className={isActive === "/monthly-report" ? "active" : ""}
                      onClick={() => setIsActive("/monthly-report")}>
                        <HiOutlineDocumentReport />
                        <span className="ms-2">Monthly Report</span>
                    </Nav.Link>
                    <Nav.Link eventKey="14" as={Link} to="/office-shift"
                      className={isActive === "/office-shift" ? "active" : ""}
                      onClick={() => setIsActive("/office-shift")}>
                        <FaBusinessTime />
                        <span className="ms-2">Office Shift</span>
                    </Nav.Link>
                    <Nav.Link eventKey="15" as={Link} to="/payroll"
                      className={isActive === "/payroll" ? "active" : ""}
                      onClick={() => setIsActive("/payroll")}>
                       <HiOutlineCurrencyRupee />
                        <span className="ms-2">Pay roll</span>
                    </Nav.Link>
                    <Nav.Link eventKey="16" as={Link} to="/leave-request"
                      className={isActive === "/leave-request" ? "active" : ""}
                      onClick={() => setIsActive("/leave-request")}>
                      <GoClippy />
                        <span className="ms-2">Leave Request</span>
                    </Nav.Link>
                    <Nav.Link eventKey="17" as={Link} to="/leave-type"
                      className={isActive === "/leave-type" ? "active" : ""}
                      onClick={() => setIsActive("/leave-type")}>
                        <FcLeave />
                        <span className="ms-2">Leave Type</span>
                    </Nav.Link>
                    <Nav.Link eventKey="18" as={Link} to="/holiday"
                      className={isActive === "/holiday" ? "active" : ""}
                      onClick={() => setIsActive("/holiday")}>
                        <MdOutlineHolidayVillage />
                        <span className="ms-2">Holiday</span>
                    </Nav.Link>
                  </>
                  }
                
                  <NavDropdown
                    title="Profile"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item eventKey={'19'} as={Link} to="/profile"> My Profile</NavDropdown.Item>
                    <NavDropdown.Item eventKey={"20"} onClick={() => setShow(true)}>
                      Change Password
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey={'21'} onClick={() => dispatch(logOut({ jwt }))}>
                    Logout
                    </NavDropdown.Item>
                  </NavDropdown>

                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handelSubmit}>
            <label>Old Password</label>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Old Password"
                ref={oldPasswordRef}
              />
            </div>
            <label>New Password</label>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="New Password"
                ref={newPasswordRef}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Confirm Password"
                ref={newconformPasswordRef}
              />
            </div>
            <div className="d-flex align-items-center justify-content-between">
              {data.isSubmitting ? (
                <Button variant="danger" className="me-3">
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  &#10240;Change
                </Button>
              ) : (
                <Button variant="danger" type="submit" className="me-3">
                  Change
                </Button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
  // return (
  //   <>
  //     <Navbar collapseOnSelect expand="lg" bg="light">
  //       <Container fluid>
  //         <Navbar.Brand href="#home">
  //           <img src={Logo} alt="Logo" />
  //         </Navbar.Brand>
  //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  //         <Navbar.Collapse id="responsive-navbar-nav" className="mobile-sidebar">
  //           <Nav className="me-auto d-md-none d-block sidebar">
  //             <ul className="d-md-none d-block">
  //               {props.current_user.is_admin ? (
  //                 <>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="1" as={Link} to="/">
  //                       <li
  //                         className={isActive === "/" ? "active" : ""}
  //                         onClick={() => setIsActive("/")}
  //                       >
  //                         <AiOutlineHome />
  //                         <span className="ms-2">Home</span>
  //                       </li>
  //                     </Nav.Link>
  //                   </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="2" as={Link} to="/employees">
  //                       <li
  //                         className={isActive === "/employees" ? "active" : ""}
  //                         onClick={() => setIsActive("/employees")}
  //                       >
  //                         <HiUserGroup />
  //                         <span className="ms-2">Employees</span>
  //                       </li>
  //                     </Nav.Link>
  //                   </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="3" as={Link} to="/departments">
  //                       <li
  //                         className={isActive === "/departments" ? "active" : ""}
  //                         onClick={() => setIsActive("/departments")}
  //                       >
  //                         <RiBuilding2Fill />
  //                         <span className="ms-2">Department</span>
  //                       </li>
  //                     </Nav.Link>
  //                   </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="4" as={Link} to="/designation">
  //                       <li
  //                         className={isActive === "/designation" ? "active" : ""}
  //                         onClick={() => setIsActive("/designation")}
  //                       >
  //                         <AiOutlineApartment />
  //                         <span className="ms-2">Designation</span>
  //                       </li>
  //                     </Nav.Link>
  //                   </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="5" as={Link} to="/policies">
  //                       <li
  //                         className={isActive === "/policies" ? "active" : ""}
  //                         onClick={() => setIsActive("/policies")}
  //                       >
  //                         <AiOutlineAim />
  //                         <span className="ms-2">Policies</span>
  //                       </li>
  //                     </Nav.Link>
  //                   </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="6" as={Link} to="/announcement">
  //                       <li
  //                         className={isActive === "/announcement" ? "active" : ""}
  //                         onClick={() => setIsActive("/announcement")}
  //                       >
  //                         <FaBullhorn />
  //                         <span className="ms-2">Make Announcement</span>
  //                       </li>
  //                     </Nav.Link>
  //                   </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="7" as={Link} to="/attendance">
  //                       <li
  //                         className={isActive === "/attendance" ? "active" : ""}
  //                         onClick={() => setIsActive("/attendance")}
  //                       >
  //                         <MdOutlineFormatTextdirectionLToR />
  //                         <span className="ms-2">Attendance</span>
  //                       </li>
  //                     </Nav.Link>
  //                   </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="8" as={Link} to="/monthly-report">
  //                     <li
  //                       className={
  //                         isActive === "/monthly-report" ? "active" : ""
  //                       }
  //                       onClick={() => setIsActive("/monthly-report")}
  //                     >
  //                       <HiOutlineDocumentReport />
  //                       <span className="ms-2">Monthly Report</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="9" as={Link} to="/office-shift">
  //                     <li
  //                       className={isActive === "/office-shift" ? "active" : ""}
  //                       onClick={() => setIsActive("/office-shift")}
  //                     >
  //                       <FaBusinessTime />
  //                       <span className="ms-2">Office Shift</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="10" as={Link} to="/payroll">
  //                     <li
  //                       className={isActive === "/payroll" ? "active" : ""}
  //                       onClick={() => setIsActive("/payroll")}
  //                     >
  //                       <HiOutlineCurrencyRupee />
  //                       <span className="ms-2">Payroll</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="12" as={Link} to="/leave-request">
  //                     <li
  //                       className={
  //                         isActive === "/leave-request" ? "active" : ""
  //                       }
  //                       onClick={() => setIsActive("/leave-request")}
  //                     >
  //                       <GoClippy />
  //                       <span className="ms-2">Leave Request</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="13" as={Link} to="/leave-type">
  //                     <li
  //                       className={isActive === "/leave-type" ? "active" : ""}
  //                       onClick={() => setIsActive("/leave-type")}
  //                     >
  //                       <FcLeave />
  //                       <span className="ms-2">Leave Type</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="14" as={Link} to="/holiday">
  //                     <li
  //                       className={isActive === "/holiday" ? "active" : ""}
  //                       onClick={() => setIsActive("/holiday")}
  //                     >
  //                       <MdOutlineHolidayVillage />
  //                       <span className="ms-2">Holiday</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                 </>
  //               ) : (
  //                 <>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="15" as={Link} to="/">
  //                     <li
  //                       className={isActive === "/" ? "active" : ""}
  //                       onClick={() => setIsActive("/")}
  //                     >
  //                       <AiOutlineHome />
  //                       <span className="ms-2">Home</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="16" as={Link} to="/attendance">
  //                     <li
  //                       className={isActive === "/attendance" ? "active" : ""}
  //                       onClick={() => setIsActive("/attendance")}
  //                     >
  //                       <MdOutlineFormatTextdirectionLToR />
  //                       <span className="ms-2">Attendance</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="17" as={Link} to="/leave">
  //                     <li
  //                       className={isActive === "/leave" ? "active" : ""}
  //                       onClick={() => setIsActive("/leave")}
  //                     >
  //                       <GoClippy />
  //                       <span className="ms-2">Leave</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="18" as={Link} to="/salary">
  //                     <li
  //                       className={isActive === "/salary" ? "active" : ""}
  //                       onClick={() => setIsActive("/salary")}
  //                     >
  //                       <HiOutlineCurrencyRupee />
  //                       <span className="ms-2">Salary</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="19" as={Link} to="/policy">
  //                     <li
  //                       className={isActive === "/policy" ? "active" : ""}
  //                       onClick={() => setIsActive("/policy")}
  //                     >
  //                       <MdPolicy />
  //                       <span className="ms-2">Policy</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="20" as={Link} to="/announcement">
  //                     <li
  //                       className={isActive === "/announcement" ? "active" : ""}
  //                       onClick={() => setIsActive("/announcement")}
  //                     >
  //                       <FaBullhorn />
  //                       <span className="ms-2">Announcement</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                   <Nav.Item>
  //                     <Nav.Link eventKey="21" as={Link} to="/holiday">
  //                     <li
  //                       className={isActive === "/holiday" ? "active" : ""}
  //                       onClick={() => setIsActive("/holiday")}
  //                     >
  //                       <MdOutlineHolidayVillage />
  //                       <span className="ms-2">Holiday</span>
  //                     </li>
  //                   </Nav.Link>
  //                 </Nav.Item>
  //                 </>
  //               )}
  //             </ul>
  //             <Dropdown className="d-md-none d-block m-4 dropdown-mobile_sidebar mb-5">
  //               <Dropdown.Toggle
  //                 id="dropdown-basic"
  //                 className="bg-light border-0"
  //               >
  //                 <img
  //                   src={
  //                     data.current_user.image_link
  //                       ? data.current_user.image_link
  //                       : User
  //                   }
  //                   alt="User"
  //                 />{" "}
  //                 <span style={{ color: "#000" }}>
  //                   <TitleCase text={data.current_user.name} />
  //                 </span>
  //               </Dropdown.Toggle>
  //               <Dropdown.Menu>
  //                 <Dropdown.Item eventKey={'22'} as={Link} to="/profile">
  //                   My Profile
  //                 </Dropdown.Item>
  //                 <Dropdown.Item  >
  //                   Change Password
  //                 </Dropdown.Item>
  //                 <Dropdown.Item eventKey={'24'} onClick={() => dispatch(logOut({ jwt }))}>
  //                   Logout
  //                 </Dropdown.Item>
  //               </Dropdown.Menu>
  //             </Dropdown>
  //           </Nav>
  //           <Nav className="d-md-block d-none">
  //             <Dropdown>
  //               <Dropdown.Toggle
  //                 id="dropdown-basic"
  //                 className="bg-light border-0"
  //               >
  //                 <img
  //                   src={
  //                     data.current_user.image_link
  //                       ? data.current_user.image_link
  //                       : User
  //                   }
  //                   alt="User"
  //                 />{" "}
  //                 <span style={{ color: "#000" }}>
  //                   <TitleCase text={data.current_user.name} />
  //                 </span>
  //               </Dropdown.Toggle>
  //               <Dropdown.Menu>
  //                 <Dropdown.Item eventKey={'25'} as={Link} to="/profile">
  //                   My Profile
  //                 </Dropdown.Item>
  //                 <Dropdown.Item eventKey={'26'} onClick={() => setShow(true)}>
  //                   Change Password
  //                 </Dropdown.Item>
  //                 <Dropdown.Item eventKey={'27'} onClick={() => dispatch(logOut({ jwt }))}>
  //                   Logout
  //                 </Dropdown.Item>
  //               </Dropdown.Menu>
  //             </Dropdown>
  //           </Nav>
  //         </Navbar.Collapse>
  //       </Container>
  //     </Navbar>

      // <Modal show={show} onHide={handleClose}>
      //   <Modal.Header closeButton>
      //     <Modal.Title>Change Password</Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body>
      //     <form onSubmit={handelSubmit}>
      //       <label>Old Password</label>
      //       <div className="form-group mb-3">
      //         <input
      //           type="text"
      //           className="form-control"
      //           placeholder="Old Password"
      //           ref={oldPasswordRef}
      //         />
      //       </div>
      //       <label>New Password</label>
      //       <div className="form-group mb-3">
      //         <input
      //           type="text"
      //           className="form-control"
      //           placeholder="New Password"
      //           ref={newPasswordRef}
      //         />
      //       </div>
      //       <div className="form-group mb-3">
      //         <input
      //           type="text"
      //           className="form-control"
      //           placeholder="Conform Password"
      //           ref={newconformPasswordRef}
      //         />
      //       </div>
      //       <div className="d-flex align-items-center justify-content-between">
      //         {data.isSubmitting ? (
      //           <Button variant="danger" className="me-3">
      //             <Spinner
      //               as="span"
      //               animation="grow"
      //               size="sm"
      //               role="status"
      //               aria-hidden="true"
      //             />
      //             &#10240;Change
      //           </Button>
      //         ) : (
      //           <Button variant="danger" type="submit" className="me-3">
      //             Change
      //           </Button>
      //         )}
      //       </div>
      //     </form>
      //   </Modal.Body>
      // </Modal>
  //   </>
  // );
}

export default Header;
