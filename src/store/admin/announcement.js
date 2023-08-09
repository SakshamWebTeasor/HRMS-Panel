import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import { storage } from "../../firebase-config";
import { deleteObject, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
    'announcement/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let page = action?(action.pageno?action.pageno:1):1;
        let limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT
        var param = action?(action.param?action.param:"created_at"):"created_at";
        var key = action?(action.x?1:-1):-1;
        var type= action?(action.type?action.type:"all"):"all"
        try {
            //....get user_head ...//
            let url1 = env.ADMIN_API_URL+'department-head';
            let option1 = {
                method : 'GET',
                headers: header,
            }
            const head_response = await (await fetch(url1, option1)).json();
            //...get anouncement..//
            let url = env.ADMIN_API_URL+'announcement?limit='+limit+'&page='+page+'&param='+param+'&sort='+key+'&key='+type;
            let option = {
                method : 'GET',
                headers: header,
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                return {response,head_response, field: param, sort: key===1?true:false,type};
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
    ................................
    .....get All by Department......
    ................................
 */
    const getAllByDepartment = createAsyncThunk(
        'announcement/getAllByDepartment',
        async(action) => {
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {
                let filter=action?action.id?action.id:"":"";
                let limit = action?action.limit?action.limit:env.LIMIT:env.LIMIT
                let page= action?action.pageno?action.pageno:1:1 
                let url = env.ADMIN_API_URL+'announcement/details/'+filter+"?limit="+limit+'&page='+page;
                let option = {
                    method : 'GET',
                    headers: header,
                }
                const response = await (await fetch(url, option)).json();
                if(response.status === "successfull"){
                    return [true,response,filter];
                }else if(response.status === "token_expire"){
                    TokenExpiredError()
                    return [false]
                }else{
                    for (const element of response.errors) {
                        notify(element.msg,true);
                    }
                    return [false];
                }
            } catch (error) {
                notify("Something went wrong !", true)
                console.log(error)
                return [false];
            }
        }
    )
/*
    .........................
    .....Searching Data......
    .........................
*/
const serchingData = createAsyncThunk(
    'announcement/serchingData',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let searchKey = action?action.searchKey?action.searchKey:'':'';
        let page = action?(action.pageno?action.pageno:1):1;
        let limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT
        try {
            let url = env.ADMIN_API_URL+'announcement/search?limit='+limit+'&page='+page+'&search='+searchKey.trim();
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
    ....................
    .....Add Record.....
    ....................
*/
    const addRecord = createAsyncThunk(
        'announcement/addRecord',
        async(action) => {
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {
                let url = env.ADMIN_API_URL+'announcement';
                    let option = {
                        method : 'POST',
                        headers: header,
                        body:JSON.stringify({
                            "title": action.title.trim(),
                            "department": action.department,
                            'description': action.description.trim(),
                            "start_date": new Date(action.start_date),
                            "end_date": new Date(action.end_date),
                            "file":action.file?action.file.name:''
                        })              
                    }
                    const response = await (await fetch(url, option)).json();
                    if(response.status === "successfull"){
                        if(action.file){
                            let id = response.data._id;
                            const [, ext] = action.file.name.split(".");
                            const fileref = await ref(storage, `announcement/${id}.${ext}`)
                            var filename = fileref.fullPath;
                            const snapshot = await uploadBytes(fileref , action.file);
                            const downloadURL = await getDownloadURL(snapshot.ref);

                            let url2 = env.ADMIN_API_URL+'announcement/'+ response.data._id;
                            let option2 = {
                                method : 'PUT',
                                headers: header,
                                body: JSON.stringify({
                                "file_path": filename,
                                "file_link": downloadURL
                                })              
                            }
                            const response2 = await (await fetch(url2, option2)).json();
                            if(response2.status === "successfull"){
                                notify("New Announcement Created",false);
                                if(env.LIMIT<=action.total){
                                    let url4 = env.ADMIN_API_URL+'announcement?limit='+env.LIMIT+'&page='+1+'&key=all';
                                    let option4 = {
                                        method : 'GET',
                                        headers: header,
                                    }
                                    const response4 = await (await fetch(url4, option4)).json();
                                    if(response4.status === "successfull"){
                                        return [response4,true,{max:true}];
                                    }
                                }
                                return [response2,true,{max:false}];
                            }else{
                                return[response.errors,false,{max:false}];
                            }
                        }
                        notify("New Announcement Created",false);
                        return [response,true,{max:false}];
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
                return['',false];
            }
        }
    )
/*
    ......................
    .....Update Record....
    ......................
*/
    const updateRecord = createAsyncThunk(
        'announcement/updateRecord',
        async(action) => {
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {
                let filename = action.old_file_path;
                let downloadURL = action.old_file_link;
                if(action.file){
                    const desertRef = ref(storage, action.old_file_path);
                    await deleteObject(desertRef);

                    const [, ext] = action.file.name.split(".");
                    const fileref = await ref(storage, `announcement/${action.id}.${ext}`)
                    filename = fileref.fullPath;
                    const snapshot = await uploadBytes(fileref , action.file);
                    downloadURL = await getDownloadURL(snapshot.ref);
                }

                let url = env.ADMIN_API_URL+'announcement/'+action.id;
                    let option = {
                        method : 'PUT',
                        headers: header,
                        body: JSON.stringify({
                            "title":action.title.trim(),
                            "department":action.department,
                            'description': action.description.trim(),
                            "start_date":new Date(action.start_date),
                            "end_date":new Date(action.end_date),
                            "file_path": filename,
                            "file_link": downloadURL
                        })              
                    }
                    const response = await (await fetch(url, option)).json();
                    if(response.status === "successfull"){
                        notify("Announcement Updated !",false);
                        return [response.data, action.id, true];
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
                console.log(error)
                return['','',false];;
            }
        }
    )
/*
    ................
    .....Delete Record..
    ................
*/
    const deleteRecord = createAsyncThunk(
        'announcement/deleteRecord',
        async(action)=>{
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {
                let page = action?(action.pageno?action.pageno:1):1;
                let url = env.ADMIN_API_URL+'announcement/'+action.id;
                let option = {
                    method : 'DELETE',
                    headers : header,
                }
                let response = await (await fetch(url, option)).json();
                if(response.status === "successfull"){
                    notify("Deleted Successfully !",true);
                    let url = env.ADMIN_API_URL+'announcement?limit='+env.LIMIT+'&page='+page+'&key=all';
                    let option = {
                        method : 'GET',
                        headers: header,
                    }
                    const response = await (await fetch(url, option)).json();
                    if(response.status === "successfull"){
                        return response;
                    }
                    return false
                }else if(response.status === "token_expire"){
                    TokenExpiredError()
                    return false
                }else{
                    for (const element of response.errors) {
                        notify(element.msg,true);
                    }
                    return false
                }
            } catch (error) {
                notify("Something went Wrong !", true)
                console.log(error);
                return false
            }
        }
    )

const announcementSlice = createSlice({
    name: 'announcement',
    initialState : {
        allData: [],
        deleted_allData: [],
        headAllData: [],
        singledata: [],
        errors:[],
        isError:false,
        pagination_AllData:{
            currentpage: 1,
            totalpages: 0,
        },
        pagination_Deleted_AllData:{
            currentpage: 1,
            totalpages: 0,
        },
        isLoading: true,
        isSubmitting:false,
        isSearch : false,
        isfilter : false,
        filter:'',
        sorting_on: {field: 'created_at', sort: false}
    },
    reducers:{
        getOne(state,action) {
            return { ...state, singledata: state.allData.filter((product) => product._id === action.payload)};
        },
        unsetSingleData (state){
            return { ...state, singledata:[], errors:[], isError:false}
        }
    },
    extraReducers: (builder)=>{
    //..... Get All ....//
        builder.addCase(getAll.pending, (state)=>{
            return {...state, isLoading:true, isError:false, errors:[] };
        });
        builder.addCase(getAll.fulfilled,(state, action) => {
            if (action.payload){
                if(action.payload.type==="all"){
                    return {
                        ...state,
                        allData: [...action.payload.response.data.data],
                        deleted_allData:[...action.payload.response.deletd_data.data],
                        headAllData : [...action.payload.head_response.data],
                        pagination_AllData:{
                            ...state.pagination_AllData ,
                            totalpages: action.payload.response.data.total_page, 
                            currentpage: Number(action.payload.response.data.page)
                        },
                        pagination_Deleted_AllData:{
                            ...state.pagination_AllData ,
                            totalpages: action.payload.response.deletd_data.total_page, 
                            currentpage:Number(action.payload.response.deletd_data.page)
                        },
                        sorting_on :  {...state.sorting_on,  field: action.payload.field, sort: action.payload.sort },
                        isLoading : false,
                        isSearch:false,
                        isfilter:false,
                    }
                }else if(action.payload.type==="deleted"){
                    return {
                        ...state,
                        deleted_allData:[...action.payload.response.deletd_data.data],
                        headAllData : [...action.payload.head_response.data],
                        pagination_Deleted_AllData:{
                            ...state.pagination_AllData ,
                            totalpages: action.payload.response.deletd_data.total_page, 
                            currentpage:Number(action.payload.response.deletd_data.page)
                        },
                        sorting_on :  {...state.sorting_on,  field: action.payload.field, sort: action.payload.sort },
                        isLoading : false,
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
                            sorting_on :  {...state.sorting_on,  field: action.payload.field, sort: action.payload.sort },
                            isLoading : false,
                            isSearch:false,
                            isfilter:false,
                        }
                    }
                }else{
                    return { ...state, isSearch:false, isfilter:false }
                }
                
        });
        builder.addCase(getAll.rejected, (state) => {
            return {
                ...state, 
                isLoading : false,
                isSearch:false,
                isfilter:false,
            };
        });
    //....Get All By Department .....//
        builder.addCase(getAllByDepartment.pending, (state)=>{
            return {...state, isLoading : true };
        });
        builder.addCase(getAllByDepartment.fulfilled,(state, action) => {
            if (action.payload[0])
                return {
                    ...state,
                    allData: [...action.payload[1].data],
                    pagination_AllData:{
                        ...state.pagination_AllData ,
                        totalpages: action.payload[1].total_page, 
                        currentpage: Number(action.payload[1].page)
                    },
                    filter:action.payload[2],
                    isfilter:true,
                    isSearch:false,
                    isLoading : false
                }
            return {...state, isLoading:false}
        });
        builder.addCase(getAllByDepartment.rejected, (state, action) => {
            return {...state, isLoading : false};
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
                    isfilter:false,
                    isLoading : false
                }
            else
                return {...state}
        });
        builder.addCase(serchingData.rejected, (state, action) => {
            return {...state};
        });
        //..... Add Record ....//
        builder.addCase(addRecord.pending, (state)=>{
            return {...state, isError:true, errors:[], isSubmitting:true, isLoading:true};
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
                        allData: [action.payload[0].data, ...state.allData.filter((d,i) => i !== 9)],
                        isError:false,
                        errors:[],
                        isSubmitting:false,
                        isLoading:false
                    }
                }
            }else{
                return { ...state, errors:[...action.payload[0]], isError:true, isSubmitting:false, isLoading:false }
            }
        });
        builder.addCase(addRecord.rejected, (state) => {
            return {...state, isSubmitting:false, isLoading:false};
        });
        //..... Update Record ....//
        builder.addCase(updateRecord.pending, (state)=>{
            return {...state, isError:true, errors:[], isSubmitting:true, isLoading:true};
        });
        builder.addCase(updateRecord.fulfilled,(state, action) => {
            if(action.payload[2]){
                return {
                    ...state, 
                    allData: state.allData.map(
                        (data) => data._id === action.payload[1] ? {...data, ...action.payload[0]} : data
                    ),
                    isError:false,
                    errors:[],
                    isSubmitting:false,
                    isLoading:false
                }
            }else{
                return { ...state, isError:true, errors:[...action.payload[0]], isSubmitting:false, isLoading:false }
            }
        });
        builder.addCase(updateRecord.rejected, (state) => {
            return {...state, isSubmitting:false, isLoading:false};
        });
        //......delete.....//
        builder.addCase(deleteRecord.pending,(state)=>{
            return { ...state,isLoading:true}
        })
        builder.addCase(deleteRecord.fulfilled,(state, action)=>{
            if(action.payload)
                return {
                    ...state,
                    allData: [...action.payload.data.data],
                    deleted_allData:[...action.payload.deletd_data.data],
                    pagination_AllData:{
                        ...state.pagination_AllData ,
                        totalpages: action.payload.data.total_page,
                        currentpage: Number(action.payload.data.page)
                    },
                    pagination_Deleted_AllData:{
                        ...state.pagination_Deleted_AllData ,
                        totalpages: action.payload.deletd_data.total_page, 
                        currentpage:Number(action.payload.deletd_data.page)
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

export {getAll, addRecord, deleteRecord, updateRecord, getAllByDepartment, serchingData};
export const { getOne, unsetSingleData } = announcementSlice.actions

export default announcementSlice.reducer;