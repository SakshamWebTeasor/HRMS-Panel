"use strict";(self.webpackChunkhrm=self.webpackChunkhrm||[]).push([[173],{6173:function(e,s,a){a.r(s);var t=a(2791),l=a(9434),i=a(7643),c=(a(9468),a(7692)),n=a(8014),r=a(5272),d=a(3496),o=a(7770),m=a(4608),x=a(1087),h=a(184);s.default=function(e){var s=(0,l.I0)(),a=e.socket,u=e.jwt,j=(0,l.v9)((function(e){return e.dashboard}));(0,t.useEffect)((function(){s((0,i.g)({jwt:u}))}),[s,u]),(0,t.useEffect)((function(){a.emit("setuser",{email:e.current_user.email,department:e.current_user.designation.department}),a.emit("check_notice_admin"),a.on("recive_notice_admin",(function(s){s.total_leave&&(e.setLeave_new_notice(!0),e.setTotalLeave(s.total_leave))}))}),[e,a]);var v={options:{chart:{id:"basic-bar"},xaxis:{type:"category",categories:[],labels:{formatter:function(e){return e}}}},series:[{name:"Employee Count",data:[]}]},p={options:{chart:{id:"basic-bar"},xaxis:{categories:[]}},series:[{data:[]}]},N={options:{labels:[]},series:[]};return j.departmentWiseStaff.map((function(e){return N.series.push(e.no_of_users),N.options.labels.push(e.name+"("+e.user_head+") : "+e.no_of_users)})),j.attendance_chart.map((function(e){return v.series[0].data.push(e.value),v.options.xaxis.categories.push(e.date.slice(0,10))})),j.salary_chart.map((function(e){return p.series[0].data.push(e.value),p.options.xaxis.categories.push(e.date)})),j.isLoading?(0,h.jsx)(o.Z,{}):(0,h.jsxs)("div",{className:"page-section p-4",children:[(0,h.jsx)("div",{className:"row",children:(0,h.jsx)("div",{className:"col-12",children:(0,h.jsxs)("div",{className:"d-flex",children:[(0,h.jsx)("img",{src:e.current_user.image_link?e.current_user.image_link:r,alt:"User",className:"img-fluid rounded-circle",style:{width:"50px",height:"50px"}}),(0,h.jsxs)("div",{className:"ms-2",children:[(0,h.jsx)("h4",{className:"mb-0 rd",children:(0,h.jsx)(m.Z,{text:e.current_user.name})}),(0,h.jsx)("p",{className:"text-muted mb-0",children:e.current_user.email})]})]})})}),(0,h.jsxs)("div",{className:"row mt-4",children:[(0,h.jsx)("div",{className:"col-xl-3 col-lg-4 col-md-6 col-12",children:(0,h.jsx)("div",{className:"box-dashboard",children:(0,h.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[(0,h.jsxs)("div",{className:"box-dash",children:[(0,h.jsx)(x.rU,{to:"/employees",children:(0,h.jsx)("h5",{className:"text-muted mb-4",children:" Total Employees "})}),(0,h.jsx)("h3",{className:"text-muted mb-0",children:j.total_employee})]}),(0,h.jsx)("div",{className:"text-danger",children:(0,h.jsx)(n.Z_K,{})})]})})}),(0,h.jsx)("div",{className:"col-xl-3 col-lg-4 col-md-6 col-12",children:(0,h.jsx)("div",{className:"box-dashboard",children:(0,h.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[(0,h.jsxs)("div",{className:"box-dash",children:[(0,h.jsx)(x.rU,{to:"/absent_present",state:{active:!0},children:(0,h.jsx)("h5",{className:"text-muted mb-4",children:"Present Employees"})}),(0,h.jsx)("h3",{className:"text-muted mb-0",children:j.today_active_employee})]}),(0,h.jsx)("div",{className:"text-danger",children:(0,h.jsx)(c.Gzv,{})})]})})}),(0,h.jsx)("div",{className:"col-xl-3 col-lg-4 col-md-6 col-12",children:(0,h.jsx)("div",{className:"box-dashboard",children:(0,h.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[(0,h.jsxs)("div",{className:"box-dash",children:[(0,h.jsx)(x.rU,{to:"/absent_present",state:{active:!1},children:(0,h.jsx)("h5",{className:"text-muted mb-4",children:"Absent Employees "})}),(0,h.jsx)("h3",{className:"text-muted mb-0",children:j.today_absent})]}),(0,h.jsx)("div",{className:"text-danger",children:(0,h.jsx)(n.Z_K,{})})]})})}),(0,h.jsx)("div",{className:"col-xl-3 col-lg-4 col-md-6 col-12",children:(0,h.jsx)("div",{className:"box-dashboard",children:(0,h.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[(0,h.jsxs)("div",{className:"box-dash",children:[(0,h.jsxs)("h5",{className:"text-muted mb-4",children:[" ","Salary Amount ",(0,h.jsx)("small",{children:"(Previous Month)"})]}),(0,h.jsxs)("h3",{className:"text-muted mb-0",children:[" ",j.previous_month_salary_amount," "]})]}),(0,h.jsx)("div",{className:"text-danger",children:(0,h.jsx)(c.Gzv,{})})]})})})]}),(0,h.jsxs)("div",{className:"row mt-0",children:[(0,h.jsx)("div",{className:"col-xl-6 col-lg-6 col-12",children:(0,h.jsxs)("div",{className:"chart mt-4",children:[(0,h.jsx)("h4",{children:"Attendance Chart"}),(0,h.jsx)(d.Z,{options:v.options,series:v.series,type:"bar",width:"100%"})]})}),(0,h.jsx)("div",{className:"col-xl-6 col-lg-6 col-12",children:(0,h.jsxs)("div",{className:"chart mt-4",children:[(0,h.jsx)("h4",{children:"Payroll monthly report"}),(0,h.jsx)(d.Z,{options:p.options,series:p.series,type:"line",width:"100%"})]})}),(0,h.jsx)("div",{className:"col-xl-6 col-lg-6 col-12",children:(0,h.jsxs)("div",{className:"chart mt-4",children:[(0,h.jsx)("h4",{children:"Department wise staff"}),(0,h.jsx)(d.Z,{options:N.options,series:N.series,type:"pie",width:"100%"})]})})]})]})}},9468:function(){}}]);
//# sourceMappingURL=173.b32dbbca.chunk.js.map