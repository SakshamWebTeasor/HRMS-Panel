import React, { useEffect, useRef } from "react"
import Button from "react-bootstrap/Button"
import { useDispatch, useSelector } from "react-redux"
import { firstvisit, goToLogin, passwordForget, passwordUpdate } from "../store/auth"
import "./forgot.css"
import TitleCase from "../helper/title-case"
import { Spinner } from "react-bootstrap"
function Forgot() {
  const dispatch = useDispatch()

  const emailRef = useRef()
  const otpRef = useRef()
  const passRef = useRef()
  const verifyPassRef = useRef()
  const data = useSelector((status) => status.auth)
  useEffect(()=>{
    dispatch(firstvisit())
  },[dispatch])

  const hamdelemailverify = async (e) => {
    e.preventDefault();
    console.log("viryfy....:", emailRef)
    dispatch(passwordForget({ email: emailRef.current.value }))
  };

  const handalPasswordChange = async (e) => {
    e.preventDefault()
    console.log("passwordchange...", emailRef)
    if (passRef.current.value === verifyPassRef.current.value) {
      console.log("match")
      dispatch(
        passwordUpdate({
          email: data.verify_email,
          otp: otpRef.current.value,
          password: passRef.current.value,
        })
      )
    } else {
      console.log("not match");
    }
  }
  return (
    <>
      <div className="login-page">
        <div className="row justify-content-center align-items-center m-2">
          <div className="col-lg-4 col-md-10 col-12">
            
            {!data.is_passWord_changed ?
                data.is_verify && !data.is_passWord_changed ? (
                <form className="login" onSubmit={handalPasswordChange}>
                    <h4 className="mb-4">Verify Password</h4>
                    <div className="form-group mb-3">
                    <label>OTP</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        ref={otpRef}
                        placeholder="Otp"
                        id="otp"
                        required
                    />
                    <span className="text-danger">{data.errors.length>0?data.errors.map((err)=>err.param==="otp"?<TitleCase key={"editerr-1"} text={err.msg}/>:''):''}</span>
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control mb-2"
                        ref={passRef}
                        placeholder="new password"
                        id="pass"
                        required
                    />
                    <span className="text-danger">{data.errors.length>0?data.errors.map((err)=>err.param==="password"?<TitleCase key={"editerr-1"} text={err.msg}/>:''):''}</span>
                    <input
                        type="password"
                        className="form-control"
                        ref={verifyPassRef}
                        placeholder="verify password"
                        id="verifypass"
                        required
                    />
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      {data.isSubmitting 
                      ? 
                          <Button variant="primary"  className="me-3">
                          <Spinner 
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                          />
                          &#10240;Verify Password
                          </Button>
                      :
                        <Button variant="primary" type="submit">
                        Verify Password
                        </Button>
                      }
                      <p onClick={()=>dispatch(goToLogin(false))}><u>Go to Login</u></p>
                    </div>
                </form>
                ) : (
                <form className="login" onSubmit={hamdelemailverify}>
                    <h4 className="mb-4">Forgot Password</h4>
                    <div className="form-group mb-3">
                    <input
                        type="email"
                        className="form-control"
                        ref={emailRef}
                        placeholder="Enter Email Address"
                        required
                        id="verifyemail"
                    />
                    <span className="text-danger">{data.errors.length>0?data.errors.map((err)=>err.param==="email"?<TitleCase key={"editerr-1"} text={err.msg}/>:''):''}</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      {data.isSubmitting 
                        ? 
                            <Button variant="primary"  className="me-3">
                            <Spinner 
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            &#10240;Get OTP
                            </Button>
                        :
                          <Button variant="primary" type="submit">
                          Get OTP
                          </Button>
                        }
                        <p onClick={()=>dispatch(goToLogin(false))}><u>Go to Login</u></p>
                    </div>
                </form>
            )
            :
            <div className="login">
                <h4>Password Changed Successfully ...</h4>
                <p onClick={()=>dispatch(goToLogin(false))}><u>Go to Login</u></p>
            </div>
        }
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgot;
