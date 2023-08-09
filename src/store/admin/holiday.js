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
    'holidays/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let page = action?(action.pageno?action.pageno:1):1;
        var param = action?(action.param?action.param:"created_at"):"created_at";
        var limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT;
        var key = action?(action.x?1:-1):-1;
        try {
            let url = env.ADMIN_API_URL+'holiday?limit='+limit+'&page='+page+'&param='+param+'&sort='+key;
            let option = {
                method : 'GET',
                mode: 'cors',
                headers: header,
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                return {response, field: param, sort: key===1?true:false};
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
            notify("Someting Wrong !", true)
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
    'holidays/serchingData',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let searchKey = action?action.searchKey?action.searchKey:'':'';
        let page = action?(action.pageno?action.pageno:1):1;
        let limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT
        try {
            let url = env.ADMIN_API_URL+'holiday/search?limit='+limit+'&page='+page+'&search='+searchKey.trim();
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
            console.log(error)
            return false;
        }
    }
)
/*
    .....................
    .....add Record......
    .....................
*/
    const addRecord = createAsyncThunk(
        'holidays/addRecord',
        async(action) => {
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {     
                let limit = env.LIMIT       
                let url = env.ADMIN_API_URL+'holiday';
                let option = {
                    method : 'POST',
                    headers: header,
                    body: JSON.stringify({
                        "name": action.name.trim(),
                        "description": action.description.trim(),
                        "start_date":action.start,
                        "end_date":action.end
                      })                   
                }
                const response = await (await fetch(url, option)).json();
                if(response.status === "successfull"){
                    notify("New Recoad Created Successfully !",false);
                    if(limit<=action.total){
                        let url1 = env.ADMIN_API_URL+'holiday?limit='+limit+'&page=1&sort=-1'
                        let option1 = {
                            method : 'GET',
                            mode: 'cors',
                            headers: header,
                        }
                        const response1 = await (await fetch(url1, option1)).json();
                        if(response.status === "successfull"){
                            return [response1,true,{max:true}]
                        }
                    }
                    return [response.data,true,{max:false}];
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
                notify("Something went wrong !", true)
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
    " holidays/updateRecord",
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
           let url = env.ADMIN_API_URL+'holiday/'+action.id;
           let option = {
                method : 'PUT',
                headers : header,
                body: JSON.stringify({
                    "name": action.name.trim(),
                    "description": action.description.trim(),
                    "start_date":action.start,
                    "end_date":action.end
                }) 
           }
           let response = await (await fetch(url, option)).json();
           if(response.status === 'successfull'){
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
            console.log(error);
            return ['','',false];
        }
    }
)
/*
    ........................
    .....Delete Record......
    ........................
*/
    const deleteRecord = createAsyncThunk(
        'holidays/deleteRecord',
        async(action)=>{
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {
                let page = action?(action.pageno?action.pageno:1):1;
                var limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT

                let url1 = env.ADMIN_API_URL+'holiday/'+action.id;
                let option1 = {
                    method : 'DELETE',
                    headers : header,
                }
                let response1 = await (await fetch(url1, option1)).json();
                if(response1.status === "successfull"){
                    notify("Deleted Successfully !",true);
                    let url = env.ADMIN_API_URL+'holiday?limit='+limit+'&page='+page;
                    let option = {
                        method : 'GET',
                        mode: 'cors',
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

const holidaySlice = createSlice({
    name: 'holidays',
    initialState : {
        allData:[],
        singledata:[],
        currentpage: 1,
        totalpages: 0,
        isLoading: true,
        isSubmitting: false,
        isEditSubmit:false,
        isError : false,
        errors:[],
        editErrors:[],
        isSearch : false,
        sorting_on: {field: 'created_at', sort: false}
    },
    reducers:{
        getOne(state,action) {
            return { ...state, singledata: state.allData.filter((product) => product._id === action.payload),  currentSelect : true, errors:[], editErrors:[]};
        },
        unsetSingleData(state) {
            return {...state, singledata:{}, errors:[], editErrors:[]}
        }
    },
    extraReducers: (builder)=>{
    //..... Get All ....//
        builder.addCase(getAll.pending, (state)=>{
            return { ...state, errors:[], editErrors:[] };
        });
        builder.addCase(getAll.fulfilled,(state, action) => {
            if (action.payload)
                return {
                    ...state,
                    allData: [...action.payload.response.data],
                    currentpage: action.payload.response.page,
                    totalpages: action.payload.response.total_page,
                    sorting_on :  {...state.sorting_on,  "field": action.payload.field, "sort": action.payload.sort },
                    isLoading : false,
                    isSearch:false,
                    isError:false
                }
            else
                return { ...state, isLoading:false, isSearch:false }
        });
        builder.addCase(getAll.rejected, (state) => {
            return {...state, isLoading : false, isSearch:false};
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
                    currentpage: action.payload.page,
                    totalpages: action.payload.total_page,
                    isSearch:true,
                    isLoading : false
                }
            else
                return { ...state, isLoading:false }
        });
        builder.addCase(serchingData.rejected, (state) => {
            return { ...state, isLoading: false };
        });
    //..... Add Record ....//
        builder.addCase(addRecord.pending, (state)=>{
            return { ...state, errors:[], isError:true, isLoading:true, isSubmitting:true };
        });
        builder.addCase(addRecord.fulfilled,(state, action) => {
            if(action.payload[1]){
                if(action.payload[2].max){
                    return {
                        ...state,
                        allData: [...action.payload[0].data],
                        currentpage: action.payload[0].page,
                        totalpages: action.payload[0].total_page,
                        isLoading : false,
                        isSearch:false,
                        isError:false,
                        isSubmitting:false
                    }
                }else{
                    return {
                        ...state,
                        allData: [action.payload[0], ...state.allData.filter((d,i) => i !== 9)],
                        isError:false,
                        isLoading:false,
                        isSubmitting:false
                    }
                }
            }else{
                return { ...state, errors:[...action.payload[0]] , isError:true, isLoading:false, isSubmitting:false }
            }
        });
        builder.addCase(addRecord.rejected, (state) => {
            return { ...state, isError:false , isLoading:false, isSubmitting:false};
        });
    //..... Update Record ....//
        builder.addCase(updateRecord.pending, (state)=>{
            return {...state, errors:[], isError:true, isEditSubmit:true };
        });
        builder.addCase(updateRecord.fulfilled,(state, action) => {
            if(action.payload[2]){
                return {
                    ...state, 
                    allData: state.allData.map(
                        (data) => data._id === action.payload[1] ? {...data, ...action.payload[0]} : data
                    ),
                    isError:false,
                    isEditSubmit:false
                }
            }else{
                return { ...state, editErrors:[...action.payload[0]] , isError:true, isEditSubmit:false }
            }
        });
        builder.addCase(updateRecord.rejected, (state) => {
            return { ...state, isEditSubmit:false };
        });
    //......delete.....//
        builder.addCase(deleteRecord.pending,(state)=>{
            return { ...state,isLoading:true }
        })
        builder.addCase(deleteRecord.fulfilled,(state, action)=>{
            if(action.payload)
                return {
                    ...state,
                    allData: [...action.payload.data],
                    currentpage: action.payload.page,
                    totalpages: action.payload.total_page,
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

export {getAll, addRecord, deleteRecord, updateRecord, serchingData };
export const { getOne, unsetSingleData } = holidaySlice.actions 
export default holidaySlice.reducer;