import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storage } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
import TokenExpiredError from "../checkingToken";
const notify = (x, iserror=false) => iserror ?  toast.error(x, {theme: "colored",}) : toast.success(x, {theme: "colored",});
const env = require("../../env.json");
/*
************************
******* Get All ********
************************
*/
const getAll = createAsyncThunk(
    "employeeDetails/getAll",
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            const url = env.ADMIN_API_URL+"user/all-details/"+action.id;
            let option = {
                method : 'GET',
                headers:header
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                return response;
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return false
            }else{
                for (const element of response.errors) {
                    notify(element.msg,true);
                }
                return false;
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error);
            return false;
        }
})
/* 
...................
....add account....
...................
*/
const addRecord = createAsyncThunk(
    'employeeDetails/addRecord',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            //....validation....//
            if (!action.accountHolder || !action.accountNo || !action.bankName || !action.branchName || !action.file || !action.id || !action.ifscCode) {
                notify('please fill required field !', true);
                return ['','', false];
            }
            let fileName=null;
            let fileLink = null;
            if (action.file) {
                const [, ext] = action.file.name.split(".");
                const imageref = await ref(storage, `account/${action.id}.${ext}`)
                fileName =  imageref.fullPath;
                const snapshot = await uploadBytes(imageref , action.file);
                fileLink = await getDownloadURL(snapshot.ref);
            }
            let url = env.ADMIN_API_URL+'account/';
            let option = {
                method : 'POST',
                headers : header,
                body : JSON.stringify({
                    "bank_name":action.bankName.trim(),
                    "branch_name":action.branchName.trim(),
                    "accHolder_name":action.accountHolder.trim(),
                    "account_no": action.accountNo,
                    "ifsc_code":action.ifscCode,
                    "users":action.id,
                    "file_path":fileName,
                    "file_link":fileLink
                })
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === 'successfull'){
                notify("Account Added Successfully !", false);
                return [response,action.id,true];
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return ['','',false]
            }else{
                for (const element of response.errors) {
                    notify(element.msg,true);
                }
                return ['','',false];
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error);
            return ['','',false]
        }
    }
)
/* 
**********************
*** Update Account ***
**********************
*/
const updateRecord = createAsyncThunk(
    'employeeDetails/updateRecord',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            //....validation....//
            if (!action.accountHolder || !action.accountNo || !action.bankName || !action.branchName || !action.id || !action.ifscCode ) {
                notify('please fill required field !', true);
                return ['','', false];
            }
            let fileName = action.oldFilePath;
            let fileLink = action.oldFileLink;
            if (action.file) {
                const desertRef = ref(storage, action.oldFilePath);
                    await deleteObject(desertRef);

                const [, ext] = action.file.name.split(".");
                const imageref = await ref(storage, `account/${action.userid}.${ext}`)
                fileName =  imageref.fullPath;
                const snapshot = await uploadBytes(imageref , action.file);
                fileLink = await getDownloadURL(snapshot.ref);
            }
            let url = env.ADMIN_API_URL+'account/'+action.id;
            let option = {
                method : 'PUT',
                headers : header,
                body : JSON.stringify({
                    "bank_name":action.bankName.trim(),
                    "branch_name":action.branchName.trim(),
                    "accHolder_name":action.accountHolder.trim(),
                    "account_no": Number(action.accountNo),
                    "ifsc_code":action.ifscCode,
                    "users":action.userid,
                    "file_path":fileName,
                    "file_link":fileLink
                })
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === 'successfull'){
                notify("Account Updated Successfully !", false);
                return [response,true];
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return ['',false]
            }else{
                for (const element of response.errors) {
                    notify(element.msg,true);
                }
                return ['',false];
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error);
            return ['',false]
        }
    }
)

/*
....................................
....add and update pan and adhar....
....................................
*/
const addDocumnets = createAsyncThunk(
    "employeeDetails/addDocuments",
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            if (action.ispan) {
                if(action.panEdit){
                //'pan Edit '//
                    let panName = action.old_pan_path;
                    let pan_downloadURL = action.old_pan_link;
                    if(action.pan){
                        const desertRef = ref(storage, panName);
                        await deleteObject(desertRef);

                        const [, ext] = action.pan.name.split(".")
                        const imageref = await ref(storage, `employee/${action.id}/panCard.${ext}`)
                        panName = imageref.fullPath
                        const snapshot = await uploadBytes(imageref , action.pan)
                        pan_downloadURL = await getDownloadURL(snapshot.ref)
                    }
                    let url = env.ADMIN_API_URL+'user/'+action.id;
                    let option = {
                        method : 'PUT',
                        headers: header,
                        body: JSON.stringify({
                            "panCard_path": panName,
                            "panCard_link" : pan_downloadURL,
                            "panCard_no" : action.pan_number
                        })                 
                    }
                    const response = await (await fetch(url, option)).json();
                    if(response.status==="successfull"){
                        notify("Pan Card Updated Successfully !",false);
                        return [response.data,true];
                    }else if(response.status === "token_expire"){
                        TokenExpiredError()
                        return ['',false]
                    }else{
                        for (const element of response.errors) {
                            notify(element.msg,true);
                        }
                        return ['',false];
                    }
                }else{
                //"add pan"//
                    const [, ext] = action.pan.name.split(".")
                    const imageref = await ref(storage, `employee/${action.id}/panCard.${ext}`)
                    const panName = imageref.fullPath
                    const snapshot = await uploadBytes(imageref , action.pan)
                    const pan_downloadURL = await getDownloadURL(snapshot.ref)

                    let url = env.ADMIN_API_URL+'user/'+action.id;
                    let option = {
                        method : 'PUT',
                        headers: header,
                        body: JSON.stringify({
                            "panCard_path": panName,
                            "panCard_link" : pan_downloadURL,
                            "panCard_no" : action.pan_number
                        })                
                    }
                    const response = await (await fetch(url, option)).json();
                    if(response.status==="successfull"){
                        notify("Pan Card Added Successfully !",false);
                        return [response.data,true];
                    }else if(response.status === "token_expire"){
                        TokenExpiredError()
                        return ['',false]
                    }else{
                        for (const element of response.errors) {
                            notify(element.msg,true);
                        }
                        return ['',false];
                    }
                }
            } else {
                if (action.adharEdit) {
                //" Adhar edit"//
                    let adharName = action.old_adhar_path;
                    let adhar_downloadURL = action.old_adhar_link;
                    if(action.adhar){
                        const desertRef = ref(storage, adharName);
                        await deleteObject(desertRef);

                        const [, ext] = action.adhar.name.split(".")
                        const imageref = await ref(storage, `employee/${action.id}/adharCard.${ext}`)
                        adharName = imageref.fullPath
                        const snapshot = await uploadBytes(imageref , action.adhar)
                        adhar_downloadURL = await getDownloadURL(snapshot.ref)
                    }
                    let url = env.ADMIN_API_URL+'user/'+action.id;
                    let option = {
                        method : 'PUT',
                        headers: header,
                        body: JSON.stringify({
                            "aadharCard_path": adharName,
                            "aadharCard_link" : adhar_downloadURL,
                            "aadharCard_no" : action.adhar_number
                        })                 
                    }
                    const response = await (await fetch(url, option)).json();
                    if(response.status==="successfull"){
                        notify("Adhar Card Updated Successfully !",false);
                        return [response.data,true];
                    }else if(response.status === "token_expire"){
                        TokenExpiredError()
                        return ['',false]
                    }else{
                        for (const element of response.errors) {
                            notify(element.msg,true);
                        }
                        return ['',false];
                    }
                } else {
                //"Adhar Add"//
                    const [, ext] = action.adhar.name.split(".")
                    const imageref = await ref(storage, `employee/${action.id}/adharCard.${ext}`)
                    const adharName = imageref.fullPath
                    const snapshot = await uploadBytes(imageref , action.adhar)
                    const adhar_downloadURL = await getDownloadURL(snapshot.ref)
                    let url = env.ADMIN_API_URL+'user/'+action.id;
                    let option = {
                        method : 'PUT',
                        headers: header,
                        body: JSON.stringify({
                            "aadharCard_path": adharName,
                            "aadharCard_link" : adhar_downloadURL,
                            "aadharCard_no" : action.adhar_number
                        })                 
                    }
                    const response = await (await fetch(url, option)).json();
                    if(response.status === 'successfull'){
                        notify("Adhar Card Added Successfully !",false);
                        return[response.data,true];
                    }else if(response.status === "token_expire"){
                        TokenExpiredError()
                        return ['',false]
                    }else{
                        for (const element of response.errors) {
                            notify(element.msg,true);
                        }
                        return ['',false];
                    }
                }
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error)
            return ['',false]
        }
    }
)
/*
............................
.....add Email.............
........................... 
*/
const addEmail= createAsyncThunk(
    "employeeDetails/addEmai;",
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL+'user/'+action.id;
            let option = {
                method : 'PUT',
                headers: header,
                body: JSON.stringify({
                    "company_email":action.email.trim()
                })             
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === 'successfull'){
                notify("Company Email Added Successfylly !",false);
                return[response.data,true];
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return ['',false]
            }else{
                for (const element of response.errors) {
                    notify(element.msg,true);
                }
                return ['',false];
            }
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error);
            return ['',false]
        }
    }
)

const employeDetailsSlice = createSlice({
    name: "employeeDetails",
    initialState:{
        employeeDetails:{},
        accountDetails:{},
        leaveDetail: [],
        salaryDetails:[],
        attendanceDetails:[],
        isLoading: true,
        isSubmitting:false,
    },
    reducers:{
        setIsSubmitting(state, action) {
            return {...state, isSubmitting: action.payload}
        },
    },
    extraReducers:(builder)=>{
    //.... Get ALL Data .....//
        builder.addCase(getAll.pending,(state,action)=>{
            return {...state, isLoading : true }
        })
        builder.addCase(getAll.fulfilled,(state, action)=>{
            if(action.payload)
                return {
                    ...state,
                    employeeDetails:{...action.payload.userDetails},
                    accountDetails:{...action.payload.accountDetails},
                    salaryDetails:[...action.payload.salaryDetails],
                    leaveDetail:[...action.payload.leaveDetails],
                    attendanceDetails:[...action.payload.attendanceDetails],
                    isLoading:false
                }
            else
                return { ...state, isLoading:false }
        })
        builder.addCase(getAll.rejected,(state,action)=>{
            return{ ...state, isLoading:false }
        })
        //.....add Account...//
        builder.addCase(addRecord.pending,(state) => {
            return { ...state };
        });
        builder.addCase(addRecord.fulfilled,(state, action) => {
            if (action.payload[1]) {
                return {
                    ...state,
                    accountDetails : {...action.payload[0].data },
                }
            } else {
                return { ...state }
            }
        });
        builder.addCase(addRecord.rejected,(state) => {
            return { ...state }
        })
    //....update Account...//
        builder.addCase(updateRecord.pending,(state)=>{
            return { ...state }
        });
        builder.addCase(updateRecord.fulfilled,(state,action)=>{
            if(action.payload[1]){
                return {
                    ...state, 
                    accountDetails :{...action.payload[0].data },
                }
            }else{
                return { ...state }
            }
        });
        builder.addCase(updateRecord.rejected,(state)=>{
            return { ...state }
        })
    //............add company email....//
        builder.addCase(addEmail.pending, (state)=>{
            return { ...state }
        })
        builder.addCase(addEmail.fulfilled, (state, action)=>{
            if(action.payload[1]){
                return {
                    ...state,
                    employeeDetails : {...action.payload[0]}
                }
            }else{
                return { ...state }
            }
        })
        builder.addCase(addEmail.rejected, (state)=>{
            return { ...state }
        })
    //............add and update adhar and pan....//
        builder.addCase(addDocumnets.pending, (state)=>{
            return { ...state }
        })
        builder.addCase(addDocumnets.fulfilled, (state, action)=>{
            if(action.payload[1]){
                return {
                    ...state,
                    employeeDetails : {...action.payload[0]}
                }
            }else{
                return { ...state }
            }
        })
        builder.addCase(addDocumnets.rejected, (state)=>{
            return { ...state }
        })
    }

})

export { getAll, addRecord, updateRecord, addDocumnets, addEmail }
export const {setIsSubmitting} = employeDetailsSlice.actions
export default employeDetailsSlice.reducer