import React from "react";
import Button from 'react-bootstrap/Button';
import "./verify.css";
function Verify () {
    return (<>
        <div className="login-page">
            <div className="row justify-content-center align-items-center m-2">
                <div className="col-lg-4 col-md-10 col-12">
                    <form className="login">
                        <h4 className="mb-4">Verify Password</h4>
                        <div className="form-group mb-3">
                            <input type="email" className="form-control" placeholder="Enter Email Address" id=""/>
                        </div>
                        <Button variant="danger">Verify Password</Button>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default Verify ;