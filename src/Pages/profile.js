import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../store/profile";
import { Tab, Tabs } from "react-bootstrap";
import Loader from "../Components/loader/index";
import Verdi from "../assets/images/verdi.jpg";
import { CiEdit } from "react-icons/ci";
import TitleCase from "../helper/title-case";
import "../Pages/admin/employees.css";

function Profile(props) {
  const dispatch = useDispatch();
  const jwt = props.jwt;

  const [panEdit, setPanEdit] = useState(false);
  const [adharEdit, setAdharEdit] = useState(false);

  const data = useSelector((status) => status.profile);

  useEffect(() => {
    dispatch(getAll({ jwt }));
  }, [dispatch, jwt]);
  if (data.isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="page-section chart page_bg p-4 profile">
        <div className="employees  mb-4">
          <div className="profile-section p-4">
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-3 col-md-3 col-12">
                <div className="profile-box mt-4">
                  <img
                    src={
                      data.current_user.image_link
                        ? data.current_user.image_link
                        : Verdi
                    }
                    alt="Verdi"
                  />
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-12">
                <div className="profile-data">
                  <h3>
                    <TitleCase text={data.current_user.name} />
                  </h3>
                  <small>
                    <TitleCase text={data.current_user.designation.name} />
                  </small>
                  <p>
                    <TitleCase
                      text={data.current_user.designation.description}
                    />
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
                    <p>
                      <TitleCase text={data.current_user.name} />
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Company Email</h6>
                    {data.current_user.company_email}
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Gender</h6>
                    <p>
                      {data.current_user.gender === "M"
                        ? data.current_user.gender === "F"
                          ? "Female"
                          : "Male"
                        : data.current_user.gender === "F"
                        ? "Female"
                        : "Other"}
                    </p>
                  </div>
                </div>

                <div className="row mt-4 mb-5">
                  <div className="col-lg-3 col-md-4 col-6">
                    <div className="basic_page_details">
                      <h6>Phone</h6>
                      <p>{data.current_user.mobile_no}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="contact" title="Contact">
              <div className="row mt-4">
                <h4>Current Address</h4>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Address</h6>
                    <p>
                      <TitleCase
                        text={
                          data.current_user.current_address
                            ? data.current_user.current_address.address
                            : ""
                        }
                      />
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>State</h6>
                    <p>
                      <TitleCase
                        text={
                          data.current_user.current_address
                            ? data.current_user.current_address.state
                            : ""
                        }
                      />
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Country</h6>
                    <p>
                      <TitleCase
                        text={
                          data.current_user.current_address
                            ? data.current_user.current_address.country
                            : ""
                        }
                      />
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Pin Code</h6>
                    <p>
                      {data.current_user.current_address
                        ? data.current_user.current_address.pincode
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mt-4 mb-5">
                <h4>Parmanent Address</h4>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Address</h6>
                    <p>
                      <TitleCase
                        text={
                          data.current_user.parmanent_address
                            ? data.current_user.parmanent_address.address
                            : ""
                        }
                      />
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>State</h6>
                    <p>
                      <TitleCase
                        text={
                          data.current_user.parmanent_address
                            ? data.current_user.parmanent_address.state
                            : ""
                        }
                      />
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Country</h6>
                    <p>
                      <TitleCase
                        text={
                          data.current_user.parmanent_address
                            ? data.current_user.parmanent_address.country
                            : ""
                        }
                      />
                    </p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Pin Code</h6>
                    <p>
                      {data.current_user.parmanent_address
                        ? data.current_user.parmanent_address.pincode
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row mt-4 mb-5">
                <div className="col-lg-3 col-md-4 col-6">
                  <div className="basic_page_details">
                    <h6>Personal Email</h6>
                    <p>{data.current_user.email}</p>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="account" title="Account">
              {data.current_user.account ? (
                <>
                  <h4>Account Information</h4>
                  <div className="row mt-4">
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="basic_page_details">
                        <h6>Bank Holder Name</h6>
                        <p>
                          <TitleCase
                            text={data.current_user.account.accHolder_name}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="basic_page_details">
                        <h6>Bank Name</h6>
                        <p>
                          <TitleCase
                            text={data.current_user.account.bank_name}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="basic_page_details">
                        <h6>Branch Name</h6>
                        <p>
                          <TitleCase
                            text={data.current_user.account.branch_name}
                          />
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="basic_page_details">
                        <h6>Account Number</h6>
                        <p>{data.current_user.account.account_no}</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                      <div className="basic_page_details">
                        <h6>Ifsc Code</h6>
                        <p>{data.current_user.account.ifsc_code}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                "Not added From Admin side"
              )}
            </Tab>
            <Tab eventKey="documents" title="Documents">
              <h4>Documents</h4>
              <div className="row mt-4">
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="basic_page_details">
                    <h6 className="mb-4">
                      Pan Card{" "}
                      {data.current_user.panCard_link ? (
                        <span onClick={() => setPanEdit(!panEdit)}>
                          <CiEdit />
                        </span>
                      ) : (
                        ""
                      )}
                    </h6>
                  </div>
                  <div className="img-document">
                    {data.current_user.panCard_link ? (
                      <img
                        src={
                          data.current_user.panCard_link
                            ? data.current_user.panCard_link
                            : Verdi
                        }
                        alt="Verdi"
                      />
                    ) : (
                      "Not added From Admin side"
                    )}
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="basic_page_details">
                    <h6 className="mb-4">
                      Aadhar Card{" "}
                      {data.current_user.aadharCard_link ? (
                        <span onClick={() => setAdharEdit(!adharEdit)}>
                          <CiEdit />
                        </span>
                      ) : (
                        ""
                      )}
                    </h6>
                  </div>
                  <div className="img-document">
                    {data.current_user.aadharCard_link && !adharEdit ? (
                      <img
                        src={
                          data.current_user.aadharCard_link
                            ? data.current_user.aadharCard_link
                            : Verdi
                        }
                        alt="Verdi"
                      />
                    ) : (
                      "Not added From Admin side"
                    )}
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="basic_page_details">
                    <h6 className="mb-4">Bank Account</h6>
                  </div>
                  <div className="img-document">
                    {data.current_user.account ? (
                      <img
                        src={
                          data.current_user.account
                            ? data.current_user.account.file_link
                              ? data.current_user.account.file_link
                              : Verdi
                            : Verdi
                        }
                        alt="Verdi"
                      />
                    ) : (
                      "Not added From Admin side"
                    )}
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default Profile;
