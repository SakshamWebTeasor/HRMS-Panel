import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import TokenExpiredError from "../checkingToken";
const env = require("../../env.json");
const notify = (x, iserror = false) =>
  iserror
    ? toast.error(x, { theme: "colored" })
    : toast.success(x, { theme: "colored" });

/*
    ................
    .....getAll......
    ................
 */
const getAll = createAsyncThunk("leave/getAll", async (action) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: action.jwt,
  };
  let page = action ? (action.pageno ? action.pageno : 1) : 1;
  let limit = action?(action.limit?action.limit:env.LIMIT):env.LIMIT
  try {
    let url = env.ADMIN_API_URL + "leave?limit="+limit+"&page=" + page;
    let option = {
      method: "GET",
      headers: header,
    };
    const response = await (await fetch(url, option)).json();
    let url1 = env.ADMIN_API_URL+'users/';
    let option1 ={
        method : 'GET',
        headers : header
    }
    const response1 = await (await fetch(url1, option1)).json();
    if (response.status === "successfull") {
            let url = env.ADMIN_API_URL+'leave-type'
            let option = {
                method : 'GET',
                mode: 'cors',
                headers: header,
            }
            const response3 = await (await fetch(url, option)).json();
      return [true ,response, response1,response3 ];
    }else if(response.status === "token_expire"){
      TokenExpiredError()
      return [false]
    } else {
        for (const element of response1.errors) {
          notify(element.msg,true);
        }
        return [false];
    }
  } catch (error) {
    notify("Something went wrong !", true)
    console.log(error);
    return false;
  }
});
/*
    .....................
    .....Leave Apply.....
    .....................
*/
const leaveApply = createAsyncThunk(
  'userleave/leaveApply',
  async(action) => {
      const header = {
          'Content-Type':'application/json',
          'Authorization':action.jwt,
      }
      try {
          let url = env.ADMIN_API_URL+'leave';
          let option = {
              method : 'POST',
              headers: header,
              body: JSON.stringify({
                  "users" : action.user_id,
                  "type": action.leave_type,
                  "start_date": action.start,
                  "end_date": action.end,
                  "reason": action.reason.trim(),
                  "remark": action.remark.trim(),
                  'half_day':action.halfday
                })                   
          }
          const response = await (await fetch(url, option)).json();
          if(response.status === "successfull"){
              notify("Manually Leave Apply Successfully !",false);
              return [response.data,true];
          }else if(response.status === "token_expire"){
            TokenExpiredError()
            return [[],false]
           }else{
              for (const element of response.errors) {
                if(element.param==="refrence error")
                  notify(element.msg,true);
              }
              return [response.errors,false];
          }
      }catch(error) {
        notify("Something went wrong !",true)
        console.log(error)
        return['', false];
      }
  }
)
/*
    ......................
    .....Aprove Leave.....
    ......................
*/
const aproveLeave = createAsyncThunk("leave/aproveLeave", async (action) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: action.jwt,
  };
  try {
    //......validation.....//
    if (!action.remark && !action.isApproved) {
      notify("Please give Remark then Reject !", true);
      return ["", false];
    }
    //......validation.....//
    let url = env.ADMIN_API_URL + "leave/" + action.id;
    let option = {
      method: "PUT",
      headers: header,
      body: JSON.stringify({
        status: action.isApproved ? "approved" : "rejected",
        remark: action.remark.trim(),
      }),
    };
    const response = await (await fetch(url, option)).json();
    if (response.status === "successfull") {
      action.isApproved
        ? notify("Leave Approved !", false)
        : notify("Leave Rejected !", true)
      return [
        { id: action.id, status: action.isApproved, remark: action.remark },
        true,
      ];
    }else if(response.status === "token_expire"){
      TokenExpiredError()
      return ['',false]
  } else {
      for (const element of response.errors) {
        notify(element.msg,true);
      }
      return ["", false];
    }
  } catch (error) {
    notify("Something went wrong !", true)
    console.log(error);
    return ["", false];
  }
});

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    allData: [],
    alluser:[],
    allLeaveType:[],
    singledata: [],
    isError:false,
    errors:[],
    currentpage: 1,
    totalpages: 0,
    isFirstLoading : true,
    isLoading: true,
    isSubmitting: false,
  },
  reducers: {
    getOne(state, action) {
      return {
        ...state,
        singledata: state.allData.filter(
          (product) => product._id === action.payload
        ),
        isError:false,
        errors:[]
      }
    },
    unsetSingleData(state) {
      return { ...state, singledata: [], isError:false, errors:[]};
    },
    unsetError(state){
      return { ...state, isError:false, errors:[]}
    }
  },
  extraReducers: (builder) => {
    //..... Get All ....//
    builder.addCase(getAll.pending, (state) => {
      return { ...state, isLoading:true, isError:false, errors:[] };
    });
    builder.addCase(getAll.fulfilled, (state, action) => {
      if (action.payload[0])
        return {
          ...state,
          allData: [...action.payload[1].data],
          alluser: [...action.payload[2].data.data],
          allLeaveType:[...action.payload[3].data],
          currentpage: action.payload[1].page,
          totalpages: action.payload[1].total_page,
          isLoading: false,
          isFirstLoading:false,
        }
      else
        return { ...state, isLoading:false, isFirstLoading:false }
    });
    builder.addCase(getAll.rejected, (state) => {
      return { ...state, isLoading:false, isFirstLoading:false };
    });
    //..... Leave Apply ....//
      builder.addCase(leaveApply.pending, (state)=>{
        return { ...state, isError:true, errors:[], isSubmitting:true };
      });
      builder.addCase(leaveApply.fulfilled,(state, action) => {
          if(action.payload[1]){
              return {
                  ...state,
                  allData: [action.payload[0], ...state.allData.filter((d,i) => i !== 9)],
                  isError:false,
                  isSubmitting:false
              }
          }else{
              return { ...state, isError:true, errors:[...action.payload[0]], isSubmitting:false }
          }
      });
      builder.addCase(leaveApply.rejected, (state) => {
          return { ...state, isSubmitting:false }
      });
    //..... Aproved leave ....//
      builder.addCase(aproveLeave.pending, (state) => {
        return { ...state };
      });
      builder.addCase(aproveLeave.fulfilled, (state, action) => {
        if (action.payload[1]) {
          return {
            ...state,
            allData: state.allData.map((data) =>
              data._id === action.payload[0].id
                ? {
                    ...data,
                    status: action.payload[0].status ? "approved" : "rejected",
                    remark: action.payload[0].remark,
                  }
                : data
            ),
          };
        } else {
          return { ...state };
        }
      });
      builder.addCase(aproveLeave.rejected, (state) => {
        return { ...state };
      });
    },
});

export { getAll, aproveLeave, leaveApply };
export const { getOne, unsetSingleData, unsetError } = leaveSlice.actions;

export default leaveSlice.reducer;
