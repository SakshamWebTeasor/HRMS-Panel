import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from 'react-toastify';
import TokenExpiredError from "../checkingToken";
const notify = (x, iserror=false) => iserror ?  toast.error(x, {theme: "colored",}) : toast.success(x, {theme: "colored",});
const env = require('../../env.json');

/*
    ................
    .....get All......
    ................
 */
    const getAll = createAsyncThunk(
        'employees-absent-persent/getAll',
        async(action) => {
            const header = {
                'Content-Type':'application/json',
                'Authorization':action.jwt,
            }
            let limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT;
            let page = action?(action.pageno?action.pageno:1):1
            var type= action?(action.type?action.type:"all"):"all"
            try {    
                let url = env.ADMIN_API_URL+'user-attendanceReport?limit='+limit+'&page='+page+'&key='+type;
                let option = {
                    method : 'GET',
                    headers: header,
                }
                const response = await (await fetch(url, option)).json();
                if(response.status === "successfull"){
                    return {response,type}
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

    const employeesAbsentPersent = createSlice({
        name: 'employees-absent-persent',
        initialState : {
            allData:[],
            absent_allData: [],
            pagination_AllData:{
                currentpage: 1,
                totalpages: 0,
            },
            pagination_absent_AllData:{
                currentpage: 1,
                totalpages: 0,
            },
            currentpage: 1,
            totalpages: 0,
            isLoading: true,
        },
        reducers: {},
        extraReducers: (builder) => {
            //....Get All.....//
                builder.addCase(getAll.pending, (state)=>{
                    return { ...state, isLoading:true }
                });
                builder.addCase(getAll.fulfilled,(state, action) => {
                    if (action.payload){
                        if(action.payload.type==="all"){
                            return {
                                ...state,
                                allData: [...action.payload.response.present.data],
                                absent_allData:[...action.payload.response.absent.data],
                                pagination_AllData:{
                                    ...state.pagination_AllData ,
                                    totalpages: action.payload.response.present.total_page, 
                                    currentpage: Number(action.payload.response.present.page)
                                },
                                pagination_absent_AllData:{
                                    ...state.pagination_AllData ,
                                    totalpages: action.payload.response.absent.total_page, 
                                    currentpage:Number(action.payload.response.absent.page)
                                },
                                isLoading : false,
                            }
                        }else if(action.payload.type==="absent"){
                            return {
                                ...state,
                                absent_allData:[...action.payload.response.absent.data],
                                pagination_absent_AllData:{
                                    ...state.pagination_AllData ,
                                    totalpages: action.payload.response.absent.total_page, 
                                    currentpage:Number(action.payload.response.absent.page)
                                },
                                isLoading : false
                            }
                        }else{
                            return {
                                ...state,
                                allData: [...action.payload.response.present.data],
                                pagination_AllData:{
                                    ...state.pagination_AllData ,
                                    totalpages: action.payload.response.present.total_page, 
                                    currentpage: Number(action.payload.response.present.page)
                                },
                                isLoading : false
                            }
                        }
                    }
                    return { ...state, isLoading:false }
                });
                builder.addCase(getAll.rejected, (state) => {
                    return {...state, isLoading : false, isFirstLoading:false };
                });
        }
    })
    export {getAll}
    export default employeesAbsentPersent.reducer;