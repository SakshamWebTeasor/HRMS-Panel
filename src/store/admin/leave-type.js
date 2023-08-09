import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import TokenExpiredError from "../checkingToken";
const env = require('../../env.json');
const notify = (x, iserror=false) => iserror ?  toast.error(x, {theme: "colored",}) : toast.success(x, {theme: "colored",});

/*
    ................
    .....getAll.....
    ................
*/
const getAll = createAsyncThunk(
    'leaveType/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let page = action?(action.pageno?action.pageno:1):1;
        try {
            let url = env.ADMIN_API_URL+'leave-type?limit=10&page='+page;
            let option = {
                method : 'GET',
                mode: 'cors',
                headers: header,
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
            console.log(error)
            return false;
        }
    }
)

/*
    ...................
    .....add Record....
    ...................
*/
    const addRecord = createAsyncThunk(
        'leaveType/addRecord',
        async(action) => {
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {        
                let url = env.ADMIN_API_URL+'leave-type';
                let option = {
                    method : 'POST',
                    headers: header,
                    body: JSON.stringify({
                        "name" : action.name.trim(),
                        "type" :action.type,
                        "total" : action.noOfLeaves,
                      })                   
                }
                const response = await (await fetch(url, option)).json();
                if(response.status === "successfull"){
                    notify("New Recoad Created Successfylly !",false);
                    return [response.data,true];
                }else if(response.status === "token_expire"){
                    TokenExpiredError()
                    return [[],false]
                }else{
                    for(const element of response.errors) {
                        if(element.param==="refrence error")
                             notify(element.msg,true);
                    }
                    return[response.errors,false];
                }
            } catch (error) {
                notify("Something went wrong !", true)
                console.log(error)
                return['',false];;
            }
        }
    )
/*
    ........................
    .....Update Record......
    ........................
*/
const updateRecord = createAsyncThunk(
    " leaveType/updateRecord",
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL+'leave-type/'+action.id;
            let option = {
                method : 'PUT',
                headers:header,
                body: JSON.stringify({
                    "name" : action.name.trim(),
                    "type" :action.type,
                    "total" : action.noOfLeaves,
                  })
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                notify("Updated Successfully !",false);
                return [ response.data, action.id, true];
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return [[],'',false]
            }else{
                for(const element of response.errors) {
                    if(element.param==="refrence error")
                         notify(element.msg,true);
                }
                return [response.errors,'',false];
            }
            //....validation....//
        } catch (error) {
            notify("Something went wrong !", true)
            console.log(error)
            return ['','',false]
        }
    }
)

/*
    ........................
    .....Delete Record......
    ........................
*/
const deleteRecord = createAsyncThunk(
    'leaveType/deleteRecord',
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {

            let url1 = env.ADMIN_API_URL+'leave-type/'+action.id;
            let option1 = {
                method : 'DELETE',
                headers : header,
            }
            let response1 = await (await fetch(url1, option1)).json();
            if(response1.status === "successfull"){
                notify("Deleted Successfully !",true);
                let url = env.ADMIN_API_URL+'leave-type'
                let option = {
                    method : 'GET',
                    headers: header,
                }
                const response = await (await fetch(url, option)).json();
                if(response.status === "successfull"){
                    return response
                }else if(response.status === "token_expire"){
                    TokenExpiredError()
                    return false
                }else{
                    for (const element of response.errors) {
                        notify(element.msg,true);
                    }
                    return false;
                }
            }else if(response1.status === "token_expire"){
                TokenExpiredError()
                return false
            }else{
                for (const element of response1.errors) {
                    notify(element.msg,true);
                }
                return false
            }
        }catch(error){
            notify("Something went wrong !", true)
            console.log(error);
            return false
        }
    }
)

const leaveTypeSlice = createSlice({
    name: 'leaveType',
    initialState : {
        allData:[],
        singledata:[],
        isError:false,
        errors:[],
        editErrors:[],
        currentpage: 1,
        totalpages: 0,
        isLoading: true,
        isSubmitting: false,
        isEditSubmitting:false,
    },
    reducers:{
        getOne(state,action) {
            return { ...state, singledata: state.allData.filter((product) => product._id === action.payload),  currentSelect : true, isError:false, errors:[], editErrors:[]};
        },
    },
    extraReducers: (builder)=>{
    //..... Get All ....//
        builder.addCase(getAll.pending, (state)=>{
            return { ...state, isError:false, errors:[], editErrors:[] };
        });
        builder.addCase(getAll.fulfilled,(state, action) => {
            if (action.payload)
                return {
                    ...state,
                    allData: [...action.payload.data],
                    currentpage: action.payload.page,
                    totalpages: action.payload.total_page,
                    isLoading : false
                }
            else
                return { ...state, isLoading : false }
        });
        builder.addCase(getAll.rejected, (state) => {
            return { ...state, isLoading : false };
        });
    //..... Add Record ....//
        builder.addCase(addRecord.pending, (state)=>{
            return { ...state, errors:[], isError:true, isSubmitting:true };
        });
        builder.addCase(addRecord.fulfilled,(state, action) => {
            if(action.payload[1]){
                return {
                    ...state,
                    allData: [{...action.payload[0],no_of_leaves:0}, ...state.allData.filter((d,i) => i !== 9)],
                    isError:false,
                    isSubmitting:false
                }
            }else{
                return { ...state, isError:true, errors:[...action.payload[0]], isSubmitting:false }
            }
        });
        builder.addCase(addRecord.rejected, (state) => {
            return { ...state, isSubmitting:false };
        });
    //.....Update Record...//
        builder.addCase(updateRecord.pending, (state)=>{
            return { ...state, isError:true, errors:[], editErrors:[], isEditSubmitting:true }
        });
        builder.addCase(updateRecord.fulfilled, (state, action)=>{
            if(action.payload[2])
            { 
                return {
                    ...state, 
                    allData: state.allData.map(
                        (data) => data._id === action.payload[1] ? {...data, ...action.payload[0]} : data
                    ),
                    isError:false,
                    isEditSubmitting:false
                }
            }else{
                return { ...state, isError:true, editErrors:[...action.payload[0]], isEditSubmitting:false }
            }
        });
        builder.addCase(updateRecord.rejected, (state)=>{
            return { ...state, isEditSubmitting:false}
        })   ;
        
        //......delete.....//
        builder.addCase(deleteRecord.pending,(state)=>{
            return { ...state,isLoading:true }
        })
        builder.addCase(deleteRecord.fulfilled,(state, action)=>{
            if(action.payload)
                return {
                    ...state,
                    allData: [...action.payload.data],
                    isLoading : false
                }
            else
                return { ...state, isLoading:false }
        });
        builder.addCase(deleteRecord.rejected,(state)=>{
            return { ...state, isLoading:false }
        });
    }
})

export {getAll, addRecord, updateRecord, deleteRecord };
export const { getOne } = leaveTypeSlice.actions 
export default leaveTypeSlice.reducer;