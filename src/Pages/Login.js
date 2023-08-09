import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firstvisit, goToLogin, login } from "../store/auth";
import {Button, Spinner} from 'react-bootstrap'
import "./login.css";
import Forgot from "./forgot";
import TitleCase from "../helper/title-case";
import Logo from "../assets/images/logo.png";
function Login() {
    const dispatch = useDispatch();
    const UserNameRef = useRef();
    const passwordRef = useRef();
    const data = useSelector(status => status.auth);
    useEffect(()=>{dispatch(firstvisit())},[dispatch])
//..login...//
    const handellogin = (e)=>{
        e.preventDefault()
        dispatch(login({
            userName :  UserNameRef.current.value,
            password : passwordRef.current.value
        }))
    }

    return (<>{!data.is_forgot_page?
        <div className="login-page">
            <div className="row justify-content-center align-items-center m-2">
                <div className="col-lg-4 col-md-10 col-12">
                    
                    <img className="img-fluid" src={Logo} alt="Webteasor HRM"/>
                    
                    <form className="login" onSubmit={handellogin}>
                        <h4 className="mb-4">Login</h4>
                        <div className="form-group mb-3">
                            <input type="type"
                            className="form-control"
                            placeholder="Enter Email ID or Mobile No."
                            ref={UserNameRef}
                            required
                            />
                            <span className="text-danger">{data.errors.length>0?data.errors.map((err)=>err.param==="email"?<TitleCase key={"editerr-1"} text={err.msg}/>:''):''}</span>
                        </div>
                        <div className="form-group mb-3">
                            <input type="password"
                            className="form-control" 
                            placeholder="Password" 
                            ref={passwordRef}
                            required
                            />
                            <span className="text-danger">{data.errors.length>0?data.errors.map((err)=>err.param==="password"?<TitleCase key={"editerr-1"} text={err.msg}/>:''):''}</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            {data.isSubmitting 
                                ? 
                                    <Button variant="danger"  className="me-3">
                                    <Spinner 
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    &#10240;Login
                                    </Button>
                                :
                                <Button variant="danger" type="submit" className="me-3">Login</Button>
                            }
                            <p onClick={()=>dispatch(goToLogin(true))}><u>Forget Password</u></p>
                            {/* <Link to="/forgot" className="text-danger">Forgot Password</Link> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>:
        <Forgot/>
    }</>);
}

export default Login;
