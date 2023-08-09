import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { storage } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import TokenExpiredError from "../checkingToken";
const env = require('../../env.json');
const notify = (x, iserror=false) => iserror ?  toast.error(x, {theme: "colored",}) : toast.success(x, {theme: "colored",});

/*
    ................
    .....get All......
    ................
 */
const getAll = createAsyncThunk(
    'employees/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT;
        let page = action?(action.pageno?action.pageno:1):1;
        var param = action?(action.param?action.param:"name"):"name";
        var key = action?(action.x?1:-1):-1;
        var type= action?(action.type?action.type:"all"):"all"
        try {
            let url1 = env.ADMIN_API_URL+'designation-head';
            let option1 = {
                method : 'GET',
                headers: header,
            }
            const response_designation = await (await fetch(url1, option1)).json();
            let url2 = env.ADMIN_API_URL+'time-slot';
            let option2 = {
                method : 'GET',
                headers: header,
            }
            const response_shift = await (await fetch(url2, option2)).json();

            let url = env.ADMIN_API_URL+`users?limit=${limit}&page=${page}&param=${param}&sort=${key}&key=${type}`;
            let option = {
                method : 'GET',
                headers: header,
            }
            const response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                return {response, response_designation, response_shift, field: param, sort: key===1?true:false,type};
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
            notify("Something Went Wrong !", true)
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
        'employees/getAllByDepartment',
        async(action) => {
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {
                let page= action?action.pageno?action.pageno:1:1
                let limit = action?(action.limit?action.payload:env.LIMIT):env.LIMIT
                let url = env.ADMIN_API_URL+'user/details/'+action.id+"?limit="+limit+'&page='+page
                let option = {
                    method : 'GET',
                    headers: header,
                }
                const response = await (await fetch(url, option)).json()
                if(response.status === "successfull"){
                    return [true,response,action.id];
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
                notify("Something Went Wrong !", true)
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
    'employees/serchingData',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let searchKey = action?action.searchKey?action.searchKey:'':''
        let page = action?(action.pageno?action.pageno:1):1
        let limit = action?(action.limit?action.payload:env.LIMIT):env.LIMIT
        try {
            let url = env.ADMIN_API_URL+'users/search?limit='+limit+'&page='+page+'&search='+searchKey.trim();
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
            notify("Something Went Wrong", true)
            console.log(error)
            return false;
        }
    }
)
/*
    .................
    .....Add Record..
    .................
*/
const addRecord = createAsyncThunk(
    'employees/addRecord',
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL+'user';
            let option = {
                method : 'POST',
                headers : header,
                body : JSON.stringify(
                    {
                        "name" : action.name.trim(),
                        "email" : action.email.trim(),
                        "gender" : action.gender.trim(),
                        "parmanent_address":action.parmanent_address,
                        "current_address":action.current_address,
                        "mobile_no" : action.mobile?action.mobile:null,
                        "alternate_mobile_no":action.alternetMobile,
                        "salary" : action.salary,
                        "shift" : action.shift,
                        "salary_slip" : action.slip,
                        "designation" : action.designation,
                        "date_of_joining" : action.date_of_joining,
                        "image" : action.image?action.image.name:''
                    }
                )
            }
            const response = await(await fetch(url, option)).json()
            if(response.status === "successfull")
            {
                let id = response.data._id
                let imageName = ''
                let image_downloadURL =''
                if(action.image){
                    const [, ext] = action.image.name.split(".")
                    const imageref = await ref(storage, `employee/${id}/image.${ext}`)
                    imageName =  imageref.fullPath
                    const snapshot = await uploadBytes(imageref , action.image)
                    image_downloadURL = await getDownloadURL(snapshot.ref)
                }

                let url2 = env.ADMIN_API_URL+'user/'+id+"?is_send=false";
                let option2 = {
                    method : 'PUT',
                    headers: header,
                    body: JSON.stringify({
                        "image_path": imageName,
                        "image_link": image_downloadURL,
                    })                 
                }
                const response2 = await (await fetch(url2, option2)).json();
                if(response2.status === "successfull")
                {
                    notify("Employee Created Successfully !",false);
                    if(env.LIMIT<=action.total){
                        let url3 = env.ADMIN_API_URL+'users?limit='+env.LIMIT+'&page='+1+'&key=all&sort=-1';
                        let option3 = {
                            method : 'GET',
                            headers: header,
                        }
                        const response3 = await (await fetch(url3, option3)).json();
                        if(response3.status === "successfull"){
                            return [response3, true, {max:true}];
                        }else if(response3.status === "token_expire"){
                            TokenExpiredError()
                            return [[],false,{max:false}]
                        }
                    }
                    return [response2.data,true, {max:false}];
                }else if(response2.status === "token_expire"){
                    TokenExpiredError()
                    return [[],false,{max:false}]
                }else{
                    for(const element of response2.errors) {
                        if(element.param==="refrence error")
                             notify(element.msg,true);
                    }
                    return [response2.errors,false, {max:false}];
                }
            }else{
                for(const element of response.errors) {
                    if(element.param==="refrence error")
                         notify(element.msg,true);
                }
                return [response.errors,false, {max:false}];
            }
            //....validation....//
        } catch (error) {
            notify("Something Went Wrong !", true)
            console.log(error);
            return [[],false, {max:false}];
        }
    }
)

/*
    ......................
    .....Update Record....
    ......................
*/
const updateRecord = createAsyncThunk(
    'employees/updateRecord',
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
                let id =action.id;
                let imageName = action.oldimage_path
                let image_downloadURL =action.oldimage_link;
                if(action.image){
                    if(imageName){
                        const desertRef = ref(storage, imageName);
                        await deleteObject(desertRef);
                    }
                    
                    const [, ext] = action.image.name.split(".");
                    const imageref = await ref(storage, `employee/${id}/image.${ext}`)
                    imageName =  imageref.fullPath;
                    const snapshot = await uploadBytes(imageref , action.image);
                    image_downloadURL = await getDownloadURL(snapshot.ref);
                }
                let url2 = env.ADMIN_API_URL+'user/'+id+"?is_send="+action.is_send;
                let option2 = {
                    method : 'PUT',
                    headers: header,
                    body: JSON.stringify({
                        "name" : action.name.trim(),
                        "email" : action.email.trim(),
                        "gender" : action.gender.trim(),
                        "parmanent_address":action.parmanent_address,
                        "current_address":action.current_address,
                        "mobile_no" : action.mobile?action.mobile:null,
                        "alternate_mobile_no":action.alternetMobile,
                        "salary" : action.salary,
                        "shift" : action.shift,
                        "salary_slip" : action.slip,
                        "designation" : action.designation,
                        "date_of_joining" : action.date_of_joining,
                        "image_path": imageName,
                        "image_link": image_downloadURL,
                    })                 
                }
                const response = await (await fetch(url2, option2)).json();
                if(response.status === "successfull"){
                    notify("Updated Successfully !",false);
                    return [response.data, id ,true];
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
            notify("Something Went Wrong !", true)
            console.log(error);
            return [[],'',false];
        }
    }
)

/*
    ....................
    .....Delete Record..
    ....................
*/
const deleteRecord = createAsyncThunk(
    'employees/deleteRecord',
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let page = action?(action.pageno?action.pageno:1):1;
            let url1 = env.ADMIN_API_URL+'user/'+action.id;
            let option1 = {
                method : 'DELETE',
                headers : header,
            }
            let response1 = await (await fetch(url1, option1)).json();
            if(response1.status === "successfuly"){
                notify("Deleted Successfully !",true);
                let url2 = env.ADMIN_API_URL+'users?limit='+env.LIMIT+'&page='+page+'&key=all&sort=-1';
                let option2 = {
                    method : 'GET',
                    headers: header,
                }
                const response2 = await (await fetch(url2, option2)).json();
                if(response2.status === "successfull"){
                    return response2;
                }else if(response2.status === "token_expire"){
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
        }catch(error) {
            notify("Something Went Wrong !", true)
            console.log(error);
            return false
        }
    }
)
/*
    .......................
    .....Restore Record....
    .......................
*/
const restoreRecord = createAsyncThunk(
    'employees/restoreRecord',
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let page = action?(action.pageno?action.pageno:1):1;
            let url = env.ADMIN_API_URL+'user-restore/'+action.id+'?page='+page+'&limit='+env.LIMIT;
            let option = {
                method : 'PUT',
                headers : header,
            }
            let response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                notify("Restored Successfully !",true);
                return response
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return false
            }else{
                for (const element of response.errors) {
                    notify(element.msg,true);
                }
                return false
            }
        }catch(error) {
            notify("Something Went Wrong !", true)
            console.log(error);
            return false
        }
    }
)
/*
    ..........................
    .....Clear Mac Address....
    ..........................
*/
const clearMacAddress = createAsyncThunk(
    'employees/clearMacAddress',
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {
            let url = env.ADMIN_API_URL+'mac-address/'+action.id;
            let option = {
                method : 'PUT',
                headers : header,
            }
            let response = await (await fetch(url, option)).json();
            if(response.status === "successfull"){
                notify("Clean Mac Address",false);
                return response.data
            }else if(response.status === "token_expire"){
                TokenExpiredError()
                return false
            }else{
                for (const element of response.errors) {
                    notify(element.msg,true);
                }
                return false
            }
        }catch(error) {
            notify("Something went wrong !", true)
            console.log(error);
            return false
        }
    }
)


const employees = createSlice({
    name: 'employees',
    initialState : {
        allData:[],
        deleted_allData: [],
        headAllData:[],
        alldesignation :[],
        allShiftData:[],
        singledata:[],
        isError:false,
        errors:[],
        pagination_AllData:{
            currentpage: 1,
            totalpages: 0,
        },
        pagination_Deleted_AllData:{
            currentpage: 1,
            totalpages: 0,
        },
        currentpage: 1,
        totalpages: 0,
        isFirstLoading : true,
        isLoading: true,
        isSubmitting: false,
        isSearch:false,
        isfilter : false,
        filter:'',
        sorting_on: {field: 'created_at', sort: false}
    },
    reducers:{
        getOne(state,action) {
            return { ...state, singledata: state.allData.filter((product) => product._id === action.payload), isError:false, errors:[]};
        },
        unsetSingleData (state){
            return { ...state, singledata:[], isError:false, errors:[]}
        }
    },
    extraReducers: (builder)=>{
    //....Get All.....//
        builder.addCase(getAll.pending, (state)=>{
            return { ...state, isError:false, errors:[], isLoading:true }
        });
        builder.addCase(getAll.fulfilled,(state, action) => {
            if (action.payload)
            if(action.payload.type==="all"){
                return {
                    ...state,
                    allData: [...action.payload.response.data.data],
                    deleted_allData:[...action.payload.response.deletd_data.data],
                    alldesignation:[...action.payload.response_designation.data.map((item)=>{
                        return {...item, departments: [...item.departments.map((items1)=>{
                            return{...items1,designation:[...items1.designation.filter((result) => ((result.active === true) && !result.is_deleted))]}
                        })]}
                    })],
                    headAllData : [...action.payload.response_designation.data],
                    allShiftData :[...action.payload.response_shift.data.filter((item)=>((item.active === true) && !item.is_deleted))],
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
                    isLoading : false,
                    isFirstLoading:false,
                    isSearch:false,
                    isfilter : false,
                    sorting_on :  {...state.sorting_on,  "field": action.payload.field, "sort": action.payload.sort }
                }
            }else if(action.payload.type==="deleted"){
                return {
                    ...state,
                    deleted_allData:[...action.payload.response.deletd_data.data],
                    alldesignation:[...action.payload.response_designation.data.map((item)=>{
                        return {...item, departments: [...item.departments.map((items1)=>{
                            return{...items1,designation:[...items1.designation.filter((result) => ((result.active === true) && !result.is_deleted))]}
                        })]}
                    })],
                    headAllData : [...action.payload.response_designation.data],
                    allShiftData :[...action.payload.response_shift.data.filter((item)=>((item.active === true) && !item.is_deleted))],
                    pagination_Deleted_AllData:{
                        ...state.pagination_AllData ,
                        totalpages: action.payload.response.deletd_data.total_page, 
                        currentpage:Number(action.payload.response.deletd_data.page)
                    },
                    isLoading : false,
                    isFirstLoading:false,
                    sorting_on :  {...state.sorting_on,  "field": action.payload.field, "sort": action.payload.sort }
                }
            }else{
                return {
                    ...state,
                    allData: [...action.payload.response.data.data],
                    alldesignation:[...action.payload.response_designation.data.map((item)=>{
                        return {...item, departments: [...item.departments.map((items1)=>{
                            return{...items1,designation:[...items1.designation.filter((result) => ((result.active === true) && !result.is_deleted))]}
                        })]}
                    })],
                    headAllData : [...action.payload.response_designation.data],
                    allShiftData :[...action.payload.response_shift.data.filter((item)=>((item.active === true) && !item.is_deleted))],
                    pagination_AllData:{
                        ...state.pagination_AllData ,
                        totalpages: action.payload.response.data.total_page, 
                        currentpage: Number(action.payload.response.data.page)
                    },
                    isLoading : false,
                    isFirstLoading:false,
                    isSearch:false,
                    isfilter : false,
                    sorting_on :  {...state.sorting_on,  "field": action.payload.field, "sort": action.payload.sort }
                }
            }
            return { ...state, isLoading:false, isFirstLoading:false,isSearch:false, isfilter : false }
        });
        builder.addCase(getAll.rejected, (state) => {
            return {...state, isLoading : false, isFirstLoading:false };
        });
        //....Get All By Department .....//
        builder.addCase(getAllByDepartment.pending, (state)=>{
            return {...state, isLoading:true};
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
                    isLoading : false,
                    isSearch:false,
                    isfilter : true,
                }
            return { ...state, isLoading:false, isSearch: false, isfilter:true}
        });
        builder.addCase(getAllByDepartment.rejected, (state) => {
            return { ...state, isLoading : false };
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
                    isfilter : false,
                    isLoading : false,
                }
            else
                return {...state, isLoading : false, isfilter : false}
        });
        builder.addCase(serchingData.rejected, (state) => {
            return {...state, isLoading : false, isfilter : false};
        });
    //......add Record.....//
        builder.addCase(addRecord.pending, (state) => {
            return { ...state, isError:true, errors:[], isSubmitting:true, isLoading:true }
        });
        builder.addCase(addRecord.fulfilled, (state, action) => {
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
                return { ...state, errors:[...action.payload[0]], isSubmitting:false, isLoading:false }
            }
        });
        builder.addCase(addRecord.rejected, (state) => {
            return { ...state, isSubmitting:false, isLoading:false}
        });
    //......Update Record.....//
        builder.addCase(updateRecord.pending, (state) => {
            return { ...state, isError:true, errors:[], isSubmitting:true}
        });
        builder.addCase(updateRecord.fulfilled, (state, action) => {
            if(action.payload[2]){
                return {
                    ...state,
                    allData: state.allData.map(
                        (data) => data._id === action.payload[1] ? {...data, ...action.payload[0]} : data
                    ),
                    isError:false,
                    isSubmitting:false
                }
            }else{
                return { ...state, errors:[...action.payload[0]], isSubmitting:false}
            }
        });
        builder.addCase(updateRecord.rejected, (state) => {
            return { ...state, isSubmitting:false}
        });
    //......delete.....//
        builder.addCase(deleteRecord.pending,(state) => {
            return { ...state, isLoading:true }
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
            else
                return { ...state, isLoading:false }
        });
        builder.addCase(deleteRecord.rejected,(state)=>{
            return { ...state, isLoading:false }
        });

        //...... Restore .....//
        builder.addCase(restoreRecord.pending,(state) => {
            return { ...state, isLoading:true }
        })
        builder.addCase(restoreRecord.fulfilled,(state, action)=>{
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
            else
                return { ...state, isLoading:false }
        });
        builder.addCase(restoreRecord.rejected,(state)=>{
            return { ...state, isLoading:false }
        });
         //......Clear  Record.....//
         builder.addCase(clearMacAddress.pending, (state) => {
            return { ...state, isError:true, errors:[], isSubmitting:true}
        });
        builder.addCase(clearMacAddress.fulfilled, (state, action) => {
            if(action.payload){
                return {
                    ...state,
                    isError:false,
                    isSubmitting:false
                }
            }else{
                return { ...state, errors:[...action.payload[0]], isSubmitting:false}
            }
        });
        builder.addCase(clearMacAddress.rejected, (state) => {
            return { ...state, isSubmitting:false}
        });
    }
})

export {getAll, addRecord, deleteRecord, updateRecord, getAllByDepartment,serchingData, restoreRecord, clearMacAddress};
export const { getOne, unsetSingleData} = employees.actions;
export default employees.reducer;