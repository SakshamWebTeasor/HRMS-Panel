import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import departmentSlice from "./admin/department";
import authSlice from "./auth";
import profileSlice from './profile';
import employeeAbsentPresentSlice from "./admin/employee-absent-present";

import employeesSlice from "./admin/employees";
import employeDetailsSlice from "./admin/employee-details"
import policiesSlice from "./admin/policies";
import designationSlice from './admin/designation'
import attendanceSlice from "./admin/attendance";
import announcementSlice from "./admin/announcement";
import timeSlotSlice from "./admin/timeSlot";
import leaveSlice from "./admin/leave";
import leaveDetailsSlice from "./admin/leave-details";
import monthlyReportSlice from "./admin/monthly-report";
import payRollSlice from './admin/pay-role'
import holidaySlice from './admin/holiday'
import dashboardSlice from './admin/dashboard'
import leaveTypeSlice from './admin/leave-type'
import whiteListIPSlice from './admin/white-list-ip'


import userDashboardSlice from "./user/dashboard";
import userAttendanceSlice from "./user/attendance";
import userLeaveSlice from "./user/leave";
import userSalarySlice from './user/salary';
import userAnnouncementSlice from './user/announcement'
import userPolicySlice from './user/policy'
import userHolidaySlice from './user/holiday'
// import { invoiceSlice } from "./admin/invoice";
const store = configureStore({
    reducer : {
        auth : authSlice.reducer,
        profile : profileSlice,
        employeeAbsentPresent : employeeAbsentPresentSlice,

        dashboard : dashboardSlice,
        employees : employeesSlice,
        department : departmentSlice,
        policy : policiesSlice,
        designation: designationSlice,
        attendance : attendanceSlice,
        announcement: announcementSlice,
        timeSlot : timeSlotSlice,
        leave : leaveSlice,
        leaveDetails : leaveDetailsSlice,
        monthlyReport : monthlyReportSlice,
        payRoll : payRollSlice,
        holiday : holidaySlice,
        leaveType :leaveTypeSlice,
        whiteListIP: whiteListIPSlice,
        // invoice: invoiceSlice,

        userDashboard : userDashboardSlice,
        userAttendance : userAttendanceSlice,
        userLeave : userLeaveSlice,
        userSalary : userSalarySlice,
        employeeDetails : employeDetailsSlice,
        userannouncement: userAnnouncementSlice,
        userPolicy : userPolicySlice,
        userHoliday : userHolidaySlice
    },
    middleware : (getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck : false}),
},composeWithDevTools());

export default store;