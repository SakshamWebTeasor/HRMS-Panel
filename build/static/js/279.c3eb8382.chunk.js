"use strict";(self.webpackChunkhrm=self.webpackChunkhrm||[]).push([[279],{9279:function(e,t,a){a.r(t),a.d(t,{default:function(){return g}});var s=a(9439),n=a(2791),r=a(9434),c=a(8447),i=a(3360),l=a(2591),d=a(8116),h=a(9513),o=a.n(h),x=(a(8639),a(4608)),j=a(5086),u=a(2447),m=a(184);var g=function(e){var t=(0,r.I0)(),a=e.jwt,h=(0,n.useState)(new Date),g=(0,s.Z)(h,2),p=g[0],f=g[1],N=(0,r.v9)((function(e){return e.userAttendance}));(0,n.useEffect)((function(){t((0,c.g)({jwt:a,month:"".concat(p.getFullYear(),"-").concat(p.getMonth()+1)}))}),[t,a,p]);for(var w=[],v=function(e){w.push((0,m.jsx)(d.Z.Item,{active:e===N.currentpage,onClick:function(){return b(e)},children:e},e))},S=1;S<=N.totalpages;S++)v(S);var b=function(e){t((0,c.g)({jwt:a,pageno:e}))};return(0,m.jsx)("div",{className:"page-section p-4",children:(0,m.jsxs)("div",{className:"employees chart",children:[(0,m.jsx)("h4",{className:"mb-0",children:"Monthly Attendace Report"}),(0,m.jsx)("div",{className:"row align-items-center justify-content-between my-4",children:(0,m.jsx)("div",{className:"col-lg-3 col-12",children:(0,m.jsxs)("div",{className:"d-flex align-items-center",children:[(0,m.jsx)(o(),{selected:p,onChange:function(e){return function(e){f(e);var s=new Date(e),n=s.getMonth()+1,r=s.getFullYear();if(1970===r)return t((0,c.g)({jwt:a}));t((0,c.g)({jwt:a,month:"".concat(r,"-").concat(n)}))}(e)},dateFormat:"MM/yyyy",showMonthYearPicker:!0,placeholderText:"All Days"}),(0,m.jsx)(i.Z,{onClick:function(){t((0,c.g)({jwt:a})),f()},children:"Reset"})]})})}),(0,m.jsx)("div",{className:"responsive mt-4",children:(0,m.jsxs)(l.Z,{striped:!0,bordered:!0,hover:!0,children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{children:[(0,m.jsx)("th",{className:"text-white",children:"S.No."}),(0,m.jsx)("th",{className:"text-white",children:"Date"}),(0,m.jsx)("th",{className:"text-white",children:"Shift"}),(0,m.jsx)("th",{className:"text-white",children:"Check\u2800IN"}),(0,m.jsx)("th",{className:"text-white",children:"Check\u2800OUT"}),(0,m.jsx)("th",{className:"text-white",children:"Late"}),(0,m.jsx)("th",{className:"text-white",children:"Early Leaving"}),(0,m.jsx)("th",{className:"text-white",children:"Effective\u2800Work"}),(0,m.jsx)("th",{className:"text-white",children:"Total\u2800Work"})]},"heading")}),(0,m.jsx)("tbody",{children:N.isLoading?(0,m.jsx)("tr",{className:"text-center",children:(0,m.jsx)("td",{colSpan:8,children:"Loading..."})},"o-loading"):N.allData.length>0?N.allData.map((function(e,t){return(0,m.jsxs)(m.Fragment,{children:["present"===e.status&&(0,m.jsxs)("tr",{children:[(0,m.jsx)("td",{children:t+1}),(0,m.jsx)("td",{children:(0,m.jsx)(j.FU,{date_arg:e.created_at})}),(0,m.jsx)("td",{children:(0,m.jsx)(x.Z,{text:e.timeSlot?e.timeSlot.shift:"N/A"})}),(0,m.jsx)("td",{children:(0,m.jsx)(j.ZP,{time:e.inTime})}),(0,m.jsx)("td",{children:e.outTime?(0,m.jsx)(j.ZP,{time:e.outTime}):"--:--"}),(0,m.jsx)("td",{className:"text-center",children:(0,m.jsx)(u.Z,{late:e.late})}),(0,m.jsx)("td",{className:"text-center",children:(0,m.jsx)(u.j,{checkOut:e.outTime,outTime:e.timeSlot.time_out})}),(0,m.jsx)("td",{children:e.effective_hours?"".concat(e.effective_hours):"--:--"}),(0,m.jsx)("td",{children:e.duration?"".concat(e.duration):"--:--"})]},"present-".concat(t)),"present"!==e.status&&(0,m.jsxs)("tr",{className:"absent"===e.status?"table-danger":"leave"===e.status?"table-info":"table-warning",children:[(0,m.jsx)("td",{children:t+1}),(0,m.jsx)("td",{children:(0,m.jsx)(j.FU,{date_arg:e.created_at})}),(0,m.jsx)("td",{colSpan:7,className:"text-center",children:(0,m.jsx)(x.Z,{text:e.status})})]},"absent-".concat(t))]})})):(0,m.jsx)("tr",{children:(0,m.jsx)("td",{colSpan:8,className:"text-center",children:"No Data Found"})},"0-nodata")})]})}),(0,m.jsx)(d.Z,{children:w})]})})}},2447:function(e,t,a){a.d(t,{j:function(){return n}});var s=a(184);function n(e){var t,a=e.outTime,n=e.checkOut,r=new Date(a),c=parseInt(r.getHours().toString().padStart(2,"0")),i=parseInt(r.getMinutes().toString().padStart(2,"0"));if(n){var l=new Date(n),d=parseInt(l.getHours().toString().padStart(2,"0")),h=parseInt(l.getMinutes().toString().padStart(2,"0"));if(c===d)t=i<=h?(0,s.jsx)("span",{className:"bg-success text-white late-area",children:"On\u2800Time"}):(0,s.jsxs)("span",{className:"bg-danger text-white late-area",children:["00:",(i-h).toString().padStart(2,"0")]});else if(c>d){var o=60*c+i-(60*d+h);t=(0,s.jsxs)("span",{className:"bg-danger text-white late-area",children:[Math.floor(o/60).toString().padStart(2,"0"),":",(o%60).toString().padStart(2,"0")]})}else t=(0,s.jsx)("span",{className:"bg-success text-white late-area",children:"On\u2800Time"})}return t}t.Z=function(e){return"ONTIME"!==e.late?Number(e.late.slice(3,5))<=15&&Number(e.late.slice(0,2))<1?(0,s.jsx)("span",{className:"bg-warning text-white late-area",children:e.late}):(0,s.jsx)("span",{className:"bg-danger text-white late-area",children:e.late}):(0,s.jsx)("span",{className:"bg-success text-white late-area",children:"On\u2800Time"})}}}]);
//# sourceMappingURL=279.c3eb8382.chunk.js.map