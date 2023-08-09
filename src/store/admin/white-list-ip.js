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
    'white-list-ip/getAll',
    async(action) => {
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        let page = action?(action.pageno?action.pageno:1):1;
        try {
            let url = env.ADMIN_API_URL+'white-list-ip?limit=10&page='+page;
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
        'white-list-ip/addRecord',
        async(action) => {
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            try {             
                let url = env.ADMIN_API_URL+'white-list-ip';
                let option = {
                    method : 'POST',
                    headers: header,
                    body: JSON.stringify({
                        "label" :action.label,
                        "ip" : action.ip
                      })                   
                }
                const response = await (await fetch(url, option)).json();
                if(response.status === "successfull"){
                    notify("Created Successfully !",false);
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
    .....Delete Record......
    ........................
*/
const deleteRecord = createAsyncThunk(
    'white-list-ip/deleteRecord',
    async(action)=>{
        const header = {
            'Content-Type':'application/json',
            'Authorization':action.jwt,
        }
        try {

            let url1 = env.ADMIN_API_URL+'white-list-ip/'+action.id;
            let option1 = {
                method : 'DELETE',
                headers : header,
            }
            let response1 = await (await fetch(url1, option1)).json();
            if(response1.status === "successfull"){
                notify("Deleted Successfully !",true);
                return action.id
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

const whiteListIP = createSlice({
    name: 'white-list-ip',
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
    reducers:{},
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
            return { ...state, isLoading:false }
        });
        builder.addCase(getAll.rejected, (state) => {
            return { ...state, isLoading:false }
        });
    //..... Add Record ....//
        builder.addCase(addRecord.pending, (state)=>{
            return { ...state, isError:true, errors:[], editErrors:[], isSubmitting:true }
        });
        builder.addCase(addRecord.fulfilled,(state, action) => {
            if(action.payload[1]){
                return {
                    ...state,
                    allData: [{...action.payload[0],no_of_users:0}, ...state.allData.filter((d,i) => i !== 9)],
                    isError:false,
                    isSubmitting:false
                }
            }else{
                return { ...state, isError:true, errors:[...action.payload[0]], isSubmitting:false }
            }
        });
        builder.addCase(addRecord.rejected, (state) => {
            return { ...state, isSubmitting:false}
        });

        //......delete.....//
        builder.addCase(deleteRecord.pending,(state)=>{
            return { ...state, isLoading:true }
        })
        builder.addCase(deleteRecord.fulfilled,(state, action)=>{
            if(action.payload)
                return {
                    ...state,
                    allData: state.allData.filter((item) => item._id !== action.payload),
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

export {getAll, addRecord, deleteRecord }
export default whiteListIP.reducer;