import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storage } from "../../firebase-config";
import { deleteObject , ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import TokenExpiredError from "../checkingToken";
const env = require('../../env.json');
const notify = (x, iserror=false) => iserror ?  toast.error(x, {theme: "colored",}) : toast.success(x, {theme: "colored",});
/*
    .................
    .....getAll......
    .................
 */
const getAll = createAsyncThunk(
    'policies/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let limit = action?action.limit?action.limit:env.LIMIT:env.LIMIT;
        let page = action?(action.pageno?action.pageno:1):1;
        var param = action?(action.param?action.param:"created_at"):"created_at";
        var key = action?(action.x?1:-1):-1;
        var type= action?(action.type?action.type:"all"):"all"
        try {
            let url = env.ADMIN_API_URL+'policy?limit='+limit+'&page='+page+'&param='+param+'&sort='+key+'&key='+type;
            let option = {
                method : 'GET',
                headers: header,
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                return {response, field: param, sort: key===1?true:false,type};
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
    .....Searching Data......
    .....................
*/
const serchingData = createAsyncThunk(
    'policies/serchingData',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let searchKey = action?action.searchKey?action.searchKey:'':'';
        let page = action?(action.pageno?action.pageno:1):1;
        let limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT
        try {
            let url = env.ADMIN_API_URL+'policy/search?limit='+limit+'&page='+page+'&search='+searchKey;
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
        'policies/addRecord',
        async(action) => {
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {        
                let url = env.ADMIN_API_URL+'policy';
                let option = {
                    method : 'POST',
                    headers: header,
                    body: JSON.stringify({
                        "title": action.title.trim(),
                        "description": action.description.trim(),
                        "file":action.file?action.file.name:''
                      })                   
                }
                const response = await (await fetch(url, option)).json();
                if(response.status === "successfull"){
                    let id = response.data._id;
                    const [, ext] = action.file.name.split(".");
                    const fileref = await ref(storage, `policies/${id}.${ext}`)
                    var filename = fileref.fullPath;
                    const snapshot = await uploadBytes(fileref , action.file);
                    const downloadURL = await getDownloadURL(snapshot.ref);

                    let url1 = env.ADMIN_API_URL+'policy/'+response.data._id;
                    let option1 = {
                        method : 'PUT',
                        headers: header,
                        body: JSON.stringify({
                            "attachment_path": filename,
                            "attachment_link": downloadURL
                        })                   
                    }
                    const response1 = await (await fetch(url1, option1)).json();
                    if(response1.status === "successfull"){
                        notify("Created Successfully !",false);
                        if(env.LIMIT<=action.total){
                            let url = env.ADMIN_API_URL+'policy?limit='+env.LIMIT+'&page='+1+'&key=all';
                            let option = {
                                method : 'GET',
                                headers: header,
                            }
                            const response = await (await fetch(url, option)).json();
                            if(response.status === "successfull"){
                                return [response, true,{max:true}]
                            }else if(response.status === "token_expire"){
                                TokenExpiredError()
                                return [[],false,{max:false}]
                            }
                        }
                        return [response1.data,true,{max:false}];
                    }else if(response.status === "token_expire"){
                        TokenExpiredError()
                        return [[],false,{max:false}]
                    }
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
    " policies/updateRecord",
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            var filename = action.attachment_path;
            var downloadURL = action.attachment_link;
            if(action.file){
                const desertRef = ref(storage, filename);
                    await deleteObject(desertRef);
                const [, ext] = action.file.name.split(".");
                const fileref = await ref(storage, `policies/${action.id}.${ext}`)
                filename = fileref.fullPath;
                const snapshot = await uploadBytes(fileref , action.file);
                downloadURL = await getDownloadURL(snapshot.ref);
            }
           let url = env.ADMIN_API_URL+'Policy/'+action.id;
           let option = {
                method : 'PUT',
                headers : header,
                body: JSON.stringify({
                    "title": action.title.trim(),
                    "description": action.description.trim(),
                    "attachment_path": filename,
                    "attachment_link": downloadURL,
                    "updated_at" : new Date(Date.now()).toISOString()
                }) 
           }
           let response = await (await fetch(url, option)).json();
           if(response.status === 'successfull'){
            notify("Updated Successfully !",false);
            return [response.data,{index: action.index},true];
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
        'policies/deleteRecord',
        async(action)=>{
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {
                let page = action?(action.pageno?action.pageno:1):1;
                let url1 = env.ADMIN_API_URL+'policy/'+action.id;
                let option1 = {
                    method : 'DELETE',
                    headers : header,
                }
                let response1 = await (await fetch(url1, option1)).json();
                if(response1.status === "successfull"){
                    notify("Deleted Successfully !",true);
                    let url1 = env.ADMIN_API_URL+'policy?limit='+env.LIMIT+'&page='+page+'&key=all';
                    let option1 = {
                        method : 'GET',
                        headers: header,
                    }
                    const response1 = await (await fetch(url1, option1)).json();
                    if(response1.status === "successfull"){
                        return response1;
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
            } catch (error) {
                notify("Something went wrong !", true)
                console.log(error);
                return false
            }
        }
    )

const policiesSlice = createSlice({
    name: 'policies',
    initialState : {
        allData:[],
        deleted_allData:[],
        singledata:[],
        pagination_AllData:{
            currentpage: 1,
            totalpages: 0,
        },
        pagination_Deleted_AllData:{
            currentpage: 1,
            totalpages: 0,
        },
        isError : false,
        errors:[],
        editErrors:[],
        isLoading: true,
        isSubmitting: false,
        isEditSubmitting:false,
        isSearch : false,
        sorting_on: {field: 'created_at', sort: false}
    },
    reducers:{
        getOne(state,action) {
            return { ...state, singledata: state.allData.filter((product) => product._id === action.payload), editErrors:[], errors:[]};
        },
        unsetSingleData( state ) {
            return {...state, singledata:{},editErrors:[]}
        }
    },
    extraReducers: (builder)=>{
    //..... Get All ....//
        builder.addCase(getAll.pending, (state)=>{
            return { ...state, isLoading:true, isError:false,  errors:[], editErrors:[] };
        });
        builder.addCase(getAll.fulfilled,(state, action) => {
            if (action.payload)
                if(action.payload.type==="all"){
                    return {
                        ...state,
                        allData: [...action.payload.response.data.data],
                        deleted_allData:[...action.payload.response.deleted_data.data],
                        pagination_AllData:{
                            ...state.pagination_AllData ,
                            totalpages: action.payload.response.data.total_page, 
                            currentpage: Number(action.payload.response.data.page)
                        },
                        pagination_Deleted_AllData:{
                            ...state.pagination_Deleted_AllData ,
                            totalpages: action.payload.response.deleted_data.total_page, 
                            currentpage:Number(action.payload.response.deleted_data.page)
                        },
                        sorting_on :  {...state.sorting_on,  "field": action.payload.field, "sort": action.payload.sort },
                        isSearch:false,
                        isLoading : false
                    }
                }else if(action.payload.type==="deleted"){
                    return {
                        ...state,
                        deleted_allData:[...action.payload.response.deleted_data.data],
                        pagination_Deleted_AllData:{
                            ...state.pagination_AllData ,
                            totalpages: action.payload.response.deleted_data.total_page, 
                            currentpage:Number(action.payload.response.deleted_data.page)
                        },
                        sorting_on :  {...state.sorting_on,  "field": action.payload.field, "sort": action.payload.sort },
                        isLoading : false
                    }
                }else{
                    return {
                        ...state,
                        allData: [...action.payload.response.data.data],
                        pagination_AllData:{
                            ...state.pagination_AllData ,
                            totalpages: action.payload.response.data.total_page, 
                            currentpage: Number(action.payload.response.data.page)
                        },
                        sorting_on :  {...state.sorting_on,  "field": action.payload.field, "sort": action.payload.sort },
                        isSearch:false,
                        isLoading : false
                    }
                }
            return { ...state, isLoading:false, isSearch:false, isError:false }
        });
        builder.addCase(getAll.rejected, (state) => {
            return { ...state, isLoading:false,isSearch:false };
        });
    //..... Serching ....//
        builder.addCase(serchingData.pending, (state, action)=>{
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
            return { ...state, isLoading:false }
        });
        builder.addCase(serchingData.rejected, (state) => {
            return { ...state, isLoading:false };
        });
    //..... Add Record ....//
        builder.addCase(addRecord.pending, (state)=>{
            return { ...state, errors:[], isError:true, isSubmitting:true, isLoading:true };
        });
        builder.addCase(addRecord.fulfilled,(state, action) => {
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
                        allData: [action.payload[0], ...state.allData.filter((d,i) => i !== 9)],
                        isError:false,
                        isSubmitting:false,
                        isLoading:false
                    }
                }
            }else{
                return { ...state, errors:[...action.payload[0]] , isError:true, isSubmitting:false, isLoading:false}
            }
        });
        builder.addCase(addRecord.rejected, (state) => {
            return { ...state, isSubmitting:false, isLoading:false };
        });
    //..... Update Record ....//
        builder.addCase(updateRecord.pending, (state)=>{
            return {...state, isError:true, editErrors:[], isEditSubmitting:true };
        });
        builder.addCase(updateRecord.fulfilled,(state, action) => {
            if(action.payload[2]){
                var index = action.payload[1].index;
                return {
                    ...state, 
                    allData: state.allData.map(
                        (data, i) => i === index ? {...data, ...action.payload[0]} : data
                    ),
                    isError:false,
                    isEditSubmitting:false
                }
            }else{
                return { ...state, isError:true, editErrors:[...action.payload[0]], isEditSubmitting:false  }
            }
        });
        builder.addCase(updateRecord.rejected, (state) => {
            return { ...state, isError:true, isEditSubmitting:false };
        });
    //......delete.....//
        builder.addCase(deleteRecord.pending,(state)=>{
            return { ...state, isLoading:true }
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
export const { setIsSubmitting, getOne, unsetSingleData } = policiesSlice.actions 
export default policiesSlice.reducer;