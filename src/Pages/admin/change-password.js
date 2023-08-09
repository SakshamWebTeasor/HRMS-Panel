import React from "react";
import Button from 'react-bootstrap/Button';
import "./change-password.css";
function Changepassword() {
    return (<>
        <div className="login-page">
            <div className="row justify-content-center align-items-center m-2">
                <div className="col-lg-4 col-md-10 col-12">
                    <form className="login">
                        <h4 className="mb-4">Change Password</h4>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder="Old Password" id=""/>
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder="New Password" id=""/>
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder="Verify Password" id=""/>
                        </div>
                        <Button variant="danger">Change Password</Button>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default Changepassword;