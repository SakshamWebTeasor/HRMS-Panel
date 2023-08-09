import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import TokenExpiredError from "../checkingToken";
const env = require('../../env.json');
const notify = (x, iserror=false) => iserror ?  toast.error(x, {theme: "colored",}) : toast.success(x, {theme: "colored",});

/*
    ................
    .....getAll......
    ................
*/
const getAll = createAsyncThunk(
    'Designation/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let page = action?(action.pageno?action.pageno:1):1;
        var param = action?(action.param?action.param:"created_at"):"created_at";
        var key = action?(action.x?1:-1):-1;
        var type= action?(action.type?action.type:"all"):"all"
        let limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT
        try {
            //....get user_head ...//
          
            let url1 = env.ADMIN_API_URL+'department-head';
            let option1 = {
                method : 'GET',
                headers: header,
            }
            //....get degingnation ....//
            const head_response = await (await fetch(url1, option1)).json();
            let url = env.ADMIN_API_URL+'designation?limit='+limit+'&page='+page+'&param='+param+'&sort='+key+'&key='+type;
            let option = {
                method : 'GET',
                headers:header
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                return {response, head_response, field: param, sort: key===1?true:false,type};
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
            notify("Something went wrong !",true)
            console.log(error)
            return false;
        }
    }
)
/*
    .........................
    .....Searching Data......
    .........................
*/
const serchingData = createAsyncThunk(
    'Designation/serchingData',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let searchKey = action?action.searchKey?action.searchKey:'':''
        let page = action?(action.pageno?action.pageno:1):1
        let limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT
        try {
            let url = env.ADMIN_API_URL+'designation/search?limit='+limit+'&page='+page+'&search='+searchKey.trim();
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
            notify("Something went wrong !",true)
            console.log(error)
            return false;
        }
    }
)
/*
    .....................
    .....ADD RECORD......
    .....................
*/
const addRecord = createAsyncThunk(
    " Designation/addRecord",
    async(action) => {
        try {
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            let url = env.ADMIN_API_URL+'designation';
            let option = {
                method : 'POST',
                headers : header,
                body : JSON.stringify({
                    "name":action.name.trim(),
                    "department":action.department,
                    "description":action.description.trim(),
                    "min_salary":action.min_salary?Number(action.min_salary):null,
                    "max_salary":action.max_salary?Number(action.max_salary):null   
                })
            }
            let response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                notify("New Designation Created",false)
                if(env.LIMIT<=action.total){
                    let url3 = env.ADMIN_API_URL+'designation?limit='+env.LIMIT+'&page='+1+'&key=all';
                    let option3 = {
                        method : 'GET',
                        headers:header
                    }
                    const response3 = await (await fetch(url3, option3)).json();
                    if(response3.status === "successfull"){
                        return [response3,true,{max:true}];
                    }else if(response3.status === "token_expire"){
                        TokenExpiredError()
                        return [[],false,{max:false}]
                    }
                }
                return [response,true, {max:false}];
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return [[],false,{max:false}]
            }else{
                for(const element of response.errors) {
                    if(element.param==="refrence error")
                         notify(element.msg,true);
                } 
                return[response.errors,false,{max:false}];
            }
        } catch (error) {
            notify("Something went wrong !",true)
            console.log(error)
            return['',false,{max:false}];
        }
    }
)
/*
    ........................
    .....Update RECORD......
    ........................
*/
const updateRecord = createAsyncThunk(
    " Designation/updateRecord",
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL+'designation/'+action.id;
            let option = {
                    method : 'PUT',
                    headers : header,
                    body: JSON.stringify({
                        "name": action.name.trim(),
                        "department": action.department,
                        "description": action.description.trim(),
                        "min_salary": Number(action.min_salary),
                        "max_salary": Number(action.max_salary),
                        "updated_at" : new Date(Date.now()).toISOString()
                    }) 
            }
            let response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                notify(response.message,false);
                return [response.data,action.id,true];
                }else if(response.status === "token_expire"){
                    TokenExpiredError()
                    return [[],'',false]
                }else{
                    for(const element of response.errors) {
                        if(element.param==="refrence error")
                             notify(element.msg,true);
                    } 
                    return  [response.errors,'',false]
                }
            } catch (error) {
                notify("Something went wrong !", true)
                return  ['','',false]
            }
        }
    )
/*
    ........................
    .....Delete Record......
    ........................
*/
const deleteRecord = createAsyncThunk(
    'Designation/deleteRecord',
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let page = action?(action.pageno?action.pageno:1):1;
            let url1 = env.ADMIN_API_URL+'designation/'+action.id;
            let option1 = {
                method : 'DELETE',
                headers : header
            }
            let response1 = await (await fetch(url1, option1)).json();
            if(response1.status === "successfull"){
                notify("Deleted Successfully !",true);
                let url3 = env.ADMIN_API_URL+'designation?limit='+env.LIMIT+'&page='+page+'&key=all';
                let option3 = {
                    method : 'GET',
                    headers:header
                }
                const response3 = await (await fetch(url3, option3)).json();
                if(response3.status === "successfull"){
                    return response3;
                }else if(response3.status === "token_expire"){
                    TokenExpiredError()
                    return false
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
            notify("Something went wrong !",true)
            console.log(error);
            return false
        }
    }
)

const desingnation = createSlice({
    name: 'desingnation',
    initialState : {
        allData:[],
        headAllData: [],
        deleted_allData:[],
        singledata: [],
        isError:false,
        errors:[],
        editErrors:[],
        pagination_AllData:{
            currentpage: 1,
            totalpages: 0,
        },
        pagination_Deleted_AllData:{
            currentpage: 1,
            totalpages: 0,
        },
        isFirstLoading:true,
        isLoading: true,
        isSubmitting : false,
        isEditSubmitting:false,
        isValidate : true,
        isSearch : false,
        sorting_on: {field: 'created_at', sort: false}
    },
    reducers:{
        getOne(state,action) {
            const singleobj = state.allData.filter((product) => product._id === action.payload);
            const headobj = state.headAllData.filter((head)=> head.name === singleobj[0].user_head);
            return { ...state, singledata: [{...singleobj[0], user_head: headobj[0]}], isError:false, errors:[], editErrors:[]};
        },
        unsetSingleData (state){
            return { ...state, singledata:{},editErrors:[]}
        }
    },
    extraReducers: (builder)=>{
    //..... Get All ....//
        builder.addCase(getAll.pending, (state)=>{
            return { ...state, isLoading:true, isError:false };
        });
        builder.addCase(getAll.fulfilled,(state, action) => {
            if(action.payload){
                if(action.payload.type==="all"){
                    return {
                        ...state,
                        allData: [...action.payload.response.data.data],
                        deleted_allData:[...action.payload.response.deleted_data.data],
                        headAllData : [...action.payload.head_response.data],
                        pagination_AllData:{
                            ...state.pagination_AllData ,
                            totalpages: action.payload.response.data.total_page, 
                            currentpage: Number(action.payload.response.data.page)
                        },
                        pagination_Deleted_AllData:{
                            ...state.pagination_AllData ,
                            totalpages: action.payload.response.deleted_data.total_page, 
                            currentpage:Number(action.payload.response.deleted_data.page)
                        },
                        sorting_on :  {...state.sorting_on,  "field": action.payload.field, "sort": action.payload.sort },
                        isSearch : false,
                        isFirstLoading:false,
                        isLoading : false
                    }
                }else if(action.payload.type==="deleted"){
                    return {
                        ...state,
                        deleted_allData:[...action.payload.response.deleted_data.data],
                        headAllData : [...action.payload.head_response.data],
                        pagination_Deleted_AllData:{
                            ...state.pagination_AllData ,
                            totalpages: action.payload.response.deleted_data.total_page, 
                            currentpage:Number(action.payload.response.deleted_data.page)
                        },
                        sorting_on :  {...state.sorting_on,  "field": action.payload.field, "sort": action.payload.sort },
                        isFirstLoading:false,
                        isLoading : false
                    }
                }else{
                    return {
                        ...state,
                        allData: [...action.payload.response.data.data],
                        headAllData : [...action.payload.head_response.data],
                        pagination_AllData:{
                            ...state.pagination_AllData ,
                            totalpages: action.payload.response.data.total_page,
                            currentpage: Number(action.payload.response.data.page)
                        },
                        sorting_on :  {...state.sorting_on,  "field": action.payload.field, "sort": action.payload.sort },
                        isSearch : false,
                        isFirstLoading:false,
                        isLoading : false
                    }
                }
            }
            return {...state, isLoading : false, isFirstLoading:false }
        });
        builder.addCase(getAll.rejected, (state) => {
            return {...state, isLoading : false, isFirstLoading:false };
        });
    //..... Serching ....//
        builder.addCase(serchingData.pending, (state)=>{
            return {...state, isLoading:true};
        });
        builder.addCase(serchingData.fulfilled,(state, action) => {
            if (action.payload)
                return {
                    ...state,
                    allData: [...action.payload.data],
                    pagination_AllData:{
                        ...state.pagination_AllData ,
                        totalpages: action.payload.total_page, 
                        currentpage: Number(action.payload.page)
                    },
                    isSearch:true,
                    isLoading : false
                }
            else
                return {...state, isLoading : false}
        });
        builder.addCase(serchingData.rejected, (state) => {
            return {...state, isLoading : false};
        });
    //....addRecord...//
        builder.addCase(addRecord.pending, (state)=>{
            return {...state, isError:true, errors:[], editErrors:[], isSubmitting:true, isLoading:true}
        });
        builder.addCase(addRecord.fulfilled, (state,action)=>{
            if(action.payload[1]){
                if(action.payload[2].max){
                    return {
                        ...state,
                        allData: [...action.payload[0].data.data],
                        pagination_AllData:{
                            ...state.pagination_AllData ,
                            totalpages: action.payload[0].data.total_page, 
                            currentpage: Number(action.payload[0].data.page)
                        },
                        isLoading : false,
                        isSearch:false,
                        isError:false,
                        isSubmitting:false
                    }
                }else{
                    return {
                        ...state,
                        allData: [{...action.payload[0].data,no_of_users:0}, ...state.allData.filter((d,i) => i !== 9)],
                        isValidate: true,
                        isError:false,
                        isSubmitting:false,
                        isLoading:false
                    }
                }
            }else{
                return { ...state, isError:true, errors:[...action.payload[0]], isSubmitting:false, isLoading:false }
            }
        });
        builder.addCase(addRecord.rejected, (state)=>{
            return {...state, isSubmitting:false, isLoading:false}
        });
    //..... Update Record ....//
        builder.addCase(updateRecord.pending, (state)=>{
            return { ...state, isError:true, editErrors:[], errors:[], isEditSubmitting:true }
        });
        builder.addCase(updateRecord.fulfilled,(state, action) => {
            if(action.payload[2]){
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
        builder.addCase(updateRecord.rejected, (state) => {
            return {...state, isEditSubmitting:false};
        });
        //......delete.....//
        builder.addCase(deleteRecord.pending, (state)=>{
            return { ...state, isLoading:true };
        })
        builder.addCase(deleteRecord.fulfilled,(state, action)=>{
            if(action.payload)
                return {
                    ...state,
                    allData: [...action.payload.data.data],
                    deleted_allData:[...action.payload.deleted_data.data],
                    pagination_AllData:{
                        ...state.pagination_AllData ,
                        totalpages: action.payload.data.total_page, 
                        currentpage: Number(action.payload.data.page)
                    },
                    pagination_Deleted_AllData:{
                        ...state.pagination_Deleted_AllData ,
                        totalpages: action.payload.deleted_data.total_page, 
                        currentpage:Number(action.payload.deleted_data.page)
                    },
                    isLoading : false
                }
            return { ...state, isLoading:false }
        });
        builder.addCase(deleteRecord.rejected,(state)=>{
            return { ...state, isLoading:false }
        });
    }
})

export {getAll, addRecord, deleteRecord, updateRecord, serchingData };
export const {  getOne, unsetSingleData } = desingnation.actions;

export default desingnation.reducer;