import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import TokenExpiredError from "./checkingToken";
const env = require('../env.json');
const notify = (x, iserror=false) => iserror ?  toast.error(x, {theme: "colored",}) : toast.success(x, {theme: "colored",});
/*
    ................
    .....login......
    ................
*/
const login = createAsyncThunk(
    'authentication/login',
    async(action) => {
        try {
            let url = env.ADMIN_API_URL+'login/';
            let option = {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body :JSON.stringify({
                    "email": action.userName.trim(),
                    "password": action.password
                }),
            }
            const response = await (await fetch(url, option)).json()
            if(response.status === "successfull"){
                notify(response.message,false);
                await localStorage.setItem('key',response.jwt);
                await localStorage.setItem('current_user',JSON.stringify(response.data));
                localStorage.setItem('token_expire_time',response.token_expire_time)
                localStorage.setItem('login_time',Date.now())
                return [true,response];
            }else if(response.status === "failed"){
                for (const element of response.errors) {
                    if(element.param==="refrence error")
                         notify(element.msg,true);
                }
                return [false,response.errors];
            }
        } catch (error) {
            console.log(error)
            return [false];
        }
    }
)

/*
..........................
.....Password Forgot ....
..........................
*/
const passwordForget = createAsyncThunk(
    "auth/passwordForget",
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
        }
        try {    
            let url = env.ADMIN_API_URL+'reset-password'
            let option = {
                method : 'POST',
                headers:header,
                body: JSON.stringify({
                    "email": action.email
                })
            }
            const response = await (await fetch(url, option)).json();
            if(response.status ==='successfull'){
                notify("OTP Send Successfully",false);
                return[true, action.email]
            }else{
                for (const element of response.errors) {
                    if(element.param==="refrence error")
                         notify(element.msg,true);
                }
                return [false, response.errors]
            }
            
        } catch (error) {
            console.log(error);
            return[false]
        }
    }
)
/*
..........................
.....Password Update ....
..........................
*/
const passwordUpdate = createAsyncThunk(
    "auth/passwordUpdate",
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
        }
        try {    
            let url = env.ADMIN_API_URL+'update-password'
            let option = {
                method : 'POST',
                headers:header,
                body: JSON.stringify({
                    "email": action.email,
                    "otp": action.otp,
                    "password": action.password
                })
            }
            const response = await (await fetch(url, option)).json();
            if(response.status ==='successfull'){
                notify("Password Changed Successfully",false);
                return[true]
            }else{
                for (const element of response.errors) {
                    if(element.param==="refrence error")
                        notify(element.msg,true);
                }
                return [false, response.errors]
            }
            
        } catch (error) {
            console.log(error);
            return[false]
        }
    }
)

/*
..........................
.....Password Changed ....
..........................
*/
const passwordChanged = createAsyncThunk(
    "auth/passwordChanged",
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {    
            let url = env.ADMIN_API_URL+'change-password'
            let option = {
                method : 'POST',
                headers:header,
                body: JSON.stringify({
                    "old_password": action.old_pass,
                    "new_password": action.new_pass,
                })
            }
            const response = await (await fetch(url, option)).json();
            if(response.status ==='successfuly'){
                notify("Password Changed Successfully, Please Login Again !",false);
                return[true]
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return [false,[]]
            }else{
                for (const element of response.errors) {
                    if(element.param==="refrence error")
                         notify(element.msg,true);
                }
                return [false, response.errors]
            }
            
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error);
            return[false]
        }
    }
)
/*
..........................
........ LOG OUT .........
..........................
*/
const logOut = createAsyncThunk(
    "auth/logout",
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {    
            let url = env.ADMIN_API_URL+'logout'
            let option = {
                method : 'GET',
                headers:header,
            }
            const response = await (await fetch(url, option)).json();
            if(response.status ==='successfull'){
                notify("Logout Successfully !",true);
                localStorage.removeItem("key");
                localStorage.removeItem("current_user");
                localStorage.removeItem("token_expire_time");
                localStorage.removeItem("login_time");
                return[true]
            }else{
                for (const element of response.errors) {
                    if(element.param==="refrence error")
                         notify(element.msg,true);
                }
                return [false]
            }
            
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error);
            return[false]
        }
    }
)

const authSlice = createSlice({
    name: 'authentication',
    initialState : {
        isAuthenticated : false,
        isProcesseing : false,
        is_verify : false,
        verify_email : '',
        is_forgot_page:false,
        is_passWord_changed:false,
        is_errors:false,
        errors:[],
        isReady : false,
        jwt:localStorage.getItem("key"),
        isSubmitting: false,
        current_user : {},
    },
    reducers:{
        isLogin(state) {
            if(localStorage.getItem("key") && Number(localStorage.getItem('token_expire_time')) >= Number(Date.now())){
                return { ...state, 
                    isAuthenticated : true,
                    current_user: JSON.parse(localStorage.getItem("current_user"))
                 };
            }else{
                localStorage.removeItem("key");
                localStorage.removeItem("current_user");
                localStorage.removeItem("token_expire_time");
                localStorage.removeItem("login_time");
                if(Number(localStorage.getItem('token_expire_time')) >= Number(Date.now())){
                    notify("Session End !",true);
                    return {...state, isAuthenticated :false}
                }
                return {...state, isAuthenticated :false}
            }
        },
        firstvisit(state){
            return { ...state, is_verify:false, is_passWord_changed:false, is_errors:false, errors:[], verify_email:''}
        },
        goToLogin(state, action){
            return {...state, is_forgot_page:  action.payload, is_errors:false, errors:[]}
        }
    },
    extraReducers: (builder)=>{
    //.....login......//
        builder.addCase(login.pending, (state)=>{
            return {...state, isProcesseing:false, isSubmitting:true, is_errors:true, errors:[]};
        });
        builder.addCase(login.fulfilled,(state, action) => {
            if (action.payload[0])
                return {...state,
                    jwt : action.payload[1].jwt,
                    current_user: action.payload[1].data,
                    isAuthenticated : true,
                    isProcesseing : true,
                    is_errors:false,
                    isSubmitting:false
                }
            else
                return {...state, isSubmitting:false, errors:[...action.payload[1]]}
        });
        builder.addCase(login.rejected, (state) => {
            return {...state, isSubmitting:false}
        });
    //..... Password Forgot....//
        builder.addCase(passwordForget.pending, (state)=>{
            return {...state, is_errors:true, errors:[], verify_email:'', isSubmitting:true}
        })
        builder.addCase(passwordForget.fulfilled, (state, action)=>{
            if (action.payload[0]) {
                return {...state, is_verify: true, verify_email:action.payload[1], isSubmitting:false}
            } else {
                return { ...state, errors:[...action.payload[1]], isSubmitting:false }
            }
        })
        builder.addCase(passwordForget.rejected, (state)=>{
            return {...state, isSubmitting:false}
        })
    //..... Password Update....//
        builder.addCase(passwordUpdate.pending, (state)=>{
            return {...state, is_errors:true, errors:[], isSubmitting:true}
        })
        builder.addCase(passwordUpdate.fulfilled, (state, action)=>{
            if (action.payload[0]) {
                return {...state, is_verify: false, is_passWord_changed : true, verify_email:'', isSubmitting:false}
            } else {
                return { ...state, errors : [...action.payload[1]], isSubmitting:false }
            }
        })
        builder.addCase(passwordUpdate.rejected, (state)=>{
            return { ...state, isSubmitting:false }
        })
    //..... password changed....//
        builder.addCase(passwordChanged.pending, (state)=>{
            return {...state, isSubmitting:true}
        })
        builder.addCase(passwordChanged.fulfilled, (state, action)=>{
            if (action.payload[0]) {
                localStorage.removeItem("key");
                localStorage.removeItem("current_user");
                return {...state, isAuthenticated: false, isSubmitting:false}
            } else {
                return { ...state, isSubmitting:false }
            }
        })
        builder.addCase(passwordChanged.rejected, (state)=>{
            return {...state, isSubmitting:false}
        })
        //..... LOG OUT....//
        builder.addCase(logOut.pending, (state)=>{
            return {...state}
        })
        builder.addCase(logOut.fulfilled, (state, action)=>{
            if (action.payload[0]) {
                return {...state, isAuthenticated: false}
            } else {
                return { ...state }
            }
        })
        builder.addCase(logOut.rejected, (state)=>{
            return {...state}
        })
    }
})

export {login, passwordChanged, passwordUpdate, passwordForget, logOut};
export const { isLogin, firstvisit, goToLogin} =authSlice.actions;
export default authSlice;