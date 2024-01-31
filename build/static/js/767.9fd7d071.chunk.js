"use strict";(self.webpackChunkhrm=self.webpackChunkhrm||[]).push([[767],{6767:(e,s,t)=>{t.r(s),t.d(s,{default:()=>N});var a=t(2791),l=t(9434),c=t(5792),n=t(4688),d=t(3360),r=t(7770),i=t(4608),m=t(4849),h=t(7225),x=t(4802),o=t(4045),j=t(5086),u=t(8472),p=t(184);const N=function(e){const s=(0,l.I0)(),t=e.jwt,N=e.notify,b=(0,a.useRef)(),v=(0,a.useRef)(),f=(0,a.useRef)(),g=(0,l.v9)((e=>e.monthlyReport));return(0,a.useEffect)((()=>{s((0,c.go)({jwt:t}))}),[s,t]),g.isLoding?(0,p.jsx)(r.Z,{}):(0,p.jsxs)("div",{className:"page-section p-4",children:[(0,p.jsx)("form",{onSubmit:e=>{if(e.preventDefault(),!f.current.value||!v.current.value)return N("Please Select All Fields",!0);s((0,c.QL)({jwt:t,user_id:b.current.value,start_date:v.current.value,end_date:f.current.value}))},children:(0,p.jsxs)("div",{className:"page-section chart mt-1 p-4",children:[(0,p.jsx)("h4",{className:"mb-4",children:"Monthly Report"}),(0,p.jsxs)("div",{className:"row align-items-center",children:[(0,p.jsx)("div",{className:"col-xl-3 col-lg-6 col-md-6 col-12",children:(0,p.jsxs)("div",{className:"add-departmen ",children:[(0,p.jsx)(n.Z.Label,{children:"Employee"}),(0,p.jsxs)(n.Z.Select,{"aria-label":"Default select example",ref:b,className:"form-control",children:[(0,p.jsx)("option",{value:"",children:"All"}),g.allUserData.length>0?g.allUserData.map(((e,s)=>!e.is_deleted&&(0,p.jsxs)("option",{value:e._id,children:[e.name,"(",e.email,")"]},s))):""]})]})}),(0,p.jsxs)("div",{className:"col-xl-3 col-lg-6 col-md-6 col-12",children:[(0,p.jsx)(n.Z.Label,{children:"From"}),(0,p.jsx)(n.Z.Group,{controlId:"duedate",children:(0,p.jsx)(n.Z.Control,{type:"date",name:"start_date",ref:v,placeholder:"Due date"})})]}),(0,p.jsxs)("div",{className:"col-xl-3 col-lg-6 col-md-6 col-12",children:[(0,p.jsx)(n.Z.Label,{children:"To"}),(0,p.jsx)(n.Z.Group,{controlId:"duedate",children:(0,p.jsx)(n.Z.Control,{type:"date",name:"end_date",ref:f,placeholder:"Due date"})})]}),(0,p.jsx)("div",{className:"col-xl-3 col-lg-6 col-md-6 col-12",children:g.isSubmiting?(0,p.jsxs)(d.Z,{variant:"danger",type:"submit",className:"mt-4",disabled:!0,children:[(0,p.jsx)(m.Z,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),"Search"]}):(0,p.jsx)(d.Z,{variant:"danger",type:"submit",className:"mt-4",children:"Search"})})]})]})}),g.isAvailable?(0,p.jsxs)("div",{className:"responsive chart mt-4",children:[(0,p.jsx)("div",{className:"d-flex justify-content-between",children:g.attendance_all_sheet.length>0?(0,p.jsx)("div",{className:"ms-auto mb-2",children:(0,p.jsxs)(h.Z,{children:[(0,p.jsx)(h.Z.Toggle,{className:"text-white",variant:"danger",id:"dropdown-basic",children:"Download"}),(0,p.jsxs)(h.Z.Menu,{children:[(0,p.jsx)(h.Z.Item,{href:"#/excel",onClick:e=>((e,s)=>{const t={Sheets:{data:o.P6.json_to_sheet(e,{skipHeader:!0})},SheetNames:["data"]},a=o.cW(t,{bookType:"xlsx",type:"array"}),l=new Blob([a],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});x.saveAs(l,s+".xlsx")})(g.attendance_all_sheet,"attendance"),children:"Excel"}),(0,p.jsx)(h.Z.Item,{href:"#/csv",children:(0,p.jsx)(u.CSVLink,{data:g.attendance_all_sheet,filename:"monthly-report",children:" CSV"})})]})]})}):(0,p.jsx)(p.Fragment,{})}),(0,p.jsxs)("table",{className:"table table-striped table-bordered table-hover",children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{className:"text-white",children:"S.No."}),(0,p.jsx)("th",{className:"text-white",children:"Name"}),(0,p.jsx)("th",{className:"text-white",children:"Designation"}),(0,p.jsx)("th",{className:"text-white",children:"Office Shift"}),(0,p.jsx)("th",{className:"text-white",children:"Date"}),(0,p.jsx)("th",{className:"text-white",children:"Late"}),(0,p.jsx)("th",{className:"text-white",children:"Status"})]})}),(0,p.jsx)("tbody",{children:g.reportAllData.length>0?g.reportAllData.map(((e,s)=>(0,p.jsxs)("tr",{className:"absent"===e.status?"table-danger":"leave"===e.status?"table-info":"weekend"===e.status?"table-warning":"",children:[(0,p.jsx)("td",{children:s+1}),(0,p.jsx)("td",{children:(0,p.jsx)("div",{className:"d-flex",children:(0,p.jsxs)("div",{className:"ms-3",children:[(0,p.jsx)("h6",{className:"mb-0 ",children:(0,p.jsx)(i.Z,{text:e.users.name})}),(0,p.jsx)("small",{className:"mb-0 text-muted",children:e.users.email})]})})}),(0,p.jsx)("td",{children:(0,p.jsx)("div",{className:"d-flex",children:(0,p.jsxs)("div",{className:"ms-3",children:[(0,p.jsx)("h6",{className:"mb-0 ",children:(0,p.jsx)(i.Z,{text:e.users.designation.name})}),(0,p.jsx)("small",{className:"mb-0 text-muted",children:(0,p.jsx)(i.Z,{text:e.users.designation.department.name})})]})})}),(0,p.jsx)("td",{children:(0,p.jsx)("div",{className:"d-flex",children:(0,p.jsxs)("div",{className:"ms-3",children:[(0,p.jsx)("h6",{className:"mb-0 ",children:(0,p.jsx)(i.Z,{text:e.timeSlot.shift})}),(0,p.jsxs)("small",{className:"mb-0 text-muted",children:[(0,p.jsx)(j.ZP,{time:e.timeSlot.time_in}),"\u2800 To \u2800",(0,p.jsx)(j.ZP,{time:e.timeSlot.time_out})]})]})})}),(0,p.jsx)("td",{children:(0,p.jsx)("div",{className:"d-flex",children:(0,p.jsxs)("div",{className:"ms-3",children:[(0,p.jsx)("h6",{className:"mb-0 ",children:(0,p.jsx)(j.FU,{date_arg:e.created_at})}),(0,p.jsxs)("small",{className:"mb-0 text-muted",children:["present"===e.status&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j.ZP,{time:e.inTime}),"\u2800 To \u2800",e.outTime?(0,p.jsx)(j.ZP,{time:e.outTime}):"--:--"]}),"present"!==e.status&&(0,p.jsx)(i.Z,{text:e.status})]})]})})}),(0,p.jsxs)("td",{children:["present"===e.status&&"ONTIME"!==e.late?"".concat(e.late," hrs"):e.late,"present"!==e.status&&(0,p.jsx)(i.Z,{text:e.status})]}),(0,p.jsxs)("td",{children:[e.half_day&&"present"===e.status?(0,p.jsx)("h6",{className:"mb-0 ",children:"Half Day"}):"present"===e.status&&(0,p.jsx)("h6",{className:"mb-0 ",children:"Full Day"}),"present"!==e.status&&(0,p.jsx)(i.Z,{text:e.status})]})]},s))):(0,p.jsx)("tr",{children:(0,p.jsx)("td",{colSpan:8,className:"text-center",children:"No Data Found"})},-1)})]})]}):(0,p.jsx)(p.Fragment,{})]})}}}]);
//# sourceMappingURL=767.9fd7d071.chunk.js.map