"use strict";(self.webpackChunkhrm=self.webpackChunkhrm||[]).push([[885],{7885:function(e,t,n){n.r(t),n.d(t,{default:function(){return b}});var s=n(4165),a=n(5861),i=n(9439),c=n(2791),o=n(9434),r=n(2427),l=n(763),d=n(7692),u=n(8014),m=n(8478),x=n(3496),h=n(7770),A=n(4849),j=n(8746),f=n(184),p=n(8194);var b=function(e){var t=(0,c.useState)(""),n=(0,i.Z)(t,2),b=n[0],v=n[1],w=(0,o.I0)(),N=e.socket,g=e.jwt,B=e.notify,y=(0,o.v9)((function(e){return e.userDashboard}));console.log("data:",y);var U=function(){var e=(0,a.Z)((0,s.Z)().mark((function e(){var t,n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={method:"GET",mode:"cors"},e.next=3,fetch("https://api.ipify.org/?format=json",t);case 3:return n=e.sent,e.t0=v,e.next=7,n.json();case 7:e.t1=e.sent.ip,(0,e.t0)(e.t1);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();(0,c.useEffect)((function(){w((0,r.go)({jwt:g})),U()}),[w,g]);var S=function(){var e=navigator.userAgent.toLowerCase();return e.includes("android")?"Android":e.includes("iphone")||e.includes("ipad")||e.includes("ipod")?"iOS":e.includes("windows")?"Windows":e.includes("linux")?"Linux":"Unknown"}();console.log("ip:",b,S),(0,c.useEffect)((function(){N.emit("setuser",{email:e.current_user.email,department:e.current_user.designation.department}),N.emit("check_notice"),N.on("recive_notice",(function(t){t.is_announ&&(e.setAnnouncement_New_notice(!0),e.setTotalAnnoun(t.total_announ)),t.is_policy&&(e.setPolicy_New_notice(!0),e.setTotalPlicy(t.total_policy))}))}),[e,N]);var T=(0,l.debounce)((function(){console.log("in hendelAttendence"),w((0,r.x1)(!0)),console.log("post dispatch setIsSubmitting(1)"),navigator.geolocation?(console.log("geolocation found & hit api1"),fetch("https://api.ipgeolocation.io/ipgeo?apiKey=".concat(p.APi_Key)).then((function(e){return e.json()})).then((function(e){var t=e.latitude,n=e.longitude;w((0,r.XY)({jwt:g,latitude:t,longitude:n,type:y.todayAttendance.outTime||y.todayAttendance.inTime?"check_out":"check_in"}))})).catch((function(e){console.error("Error fetching geolocation data:",e),B("Failed to fetch geolocation data",!0),w((0,r.x1)(!1))}))):(console.log("geolocation not found"),B("Geolocation is not supported by your browser",!0),w((0,r.x1)(!1)))}),100),E={options:{chart:{id:"basic-bar"},xaxis:{type:"category",categories:[],labels:{formatter:function(e){return e}}},yaxis:[{labels:{formatter:function(e){return e}},title:{text:"In Hours"}}]},series:[{name:"duration",data:[]}]},D={options:{chart:{id:"basic-bar"},xaxis:{categories:[]}},series:[{data:[]}]};y.attendance_chart.map((function(e){return E.series[0].data.push(e.value),E.options.xaxis.categories.push(e.date.slice(0,10))})),y.salary_chart.map((function(e){return D.series[0].data.push(e.value),D.options.xaxis.categories.push(e.month)}));var Q=new Date;return y.isLoading?(0,f.jsx)(h.Z,{}):(0,f.jsxs)("div",{className:"page-section p-4",children:[(0,f.jsx)("div",{className:"row",children:(0,f.jsx)("div",{className:"col-12",children:(0,f.jsx)("div",{className:"d-flex justify-content-between align-items-center",children:(0,f.jsxs)("div",{className:"d-flex",children:[(0,f.jsx)("img",{src:e.current_user.image_link?e.current_user.image_link:m,alt:"User",className:"img-fluid rounded-circle",style:{width:"50px",height:"50px"}}),(0,f.jsx)("div",{className:"ms-2",children:(0,f.jsxs)("h5",{className:"mb-0",children:[(0,f.jsx)("h1",{style:{color:"red"},children:e.current_user.name}),"Logged in through:",S]})})]})})})}),(0,f.jsxs)("div",{className:"row",children:[(0,f.jsxs)("div",{className:"col-lg-9 col-12",children:[(0,f.jsxs)("div",{className:"row mt-md-4 mt-0",children:[(0,f.jsx)("div",{className:"col-xl-3 col-lg-3 col-md-6 col-12",children:(0,f.jsx)("div",{className:"box-dashboard",children:(0,f.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[(0,f.jsxs)("div",{className:"",children:[(0,f.jsx)("h5",{className:"text-muted mb-4",children:"Total Hours"}),(0,f.jsx)("h3",{className:"text-muted mb-0",children:(0,f.jsx)(j.O,{inTime:y.todayAttendance.inTime,outTime:y.todayAttendance.outTime,duration:y.todayAttendance.duration})})]}),(0,f.jsx)("div",{className:"text-danger",children:(0,f.jsx)(d.Gzv,{})})]})})}),(0,f.jsx)("div",{className:"col-xl-3 col-lg-3 col-md-6 col-12",children:(0,f.jsx)("div",{className:"box-dashboard",children:(0,f.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[(0,f.jsxs)("div",{className:"",children:[(0,f.jsx)("h5",{className:"text-muted mb-4",children:" Total Presence"}),(0,f.jsx)("h3",{className:"text-muted mb-0",children:y.total_present})]}),(0,f.jsx)("div",{className:"text-danger",children:(0,f.jsx)(u.Z_K,{})})]})})}),(0,f.jsx)("div",{className:"col-xl-3 col-lg-3 col-md-6 col-12",children:(0,f.jsx)("div",{className:"box-dashboard",children:(0,f.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[(0,f.jsxs)("div",{className:"",children:[(0,f.jsx)("h5",{className:"text-muted mb-4",children:"Total Leave"}),(0,f.jsxs)("h3",{className:"text-muted mb-0",children:[y.total_leaves.paid_leave,(0,f.jsx)("span",{children:"-Paid"})]}),(0,f.jsxs)("h3",{className:"text-muted mb-0",children:[" ",y.total_leaves.unpaid_leave,(0,f.jsx)("span",{children:"-UnPaid"})]})]}),(0,f.jsx)("div",{className:"text-danger",children:(0,f.jsx)(u.Z_K,{})})]})})}),(0,f.jsx)("div",{className:"col-xl-3 col-lg-3 col-md-6 col-12",children:(0,f.jsx)("div",{className:"box-dashboard",children:(0,f.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[(0,f.jsxs)("div",{className:"",children:[(0,f.jsx)("h5",{className:"text-muted mb-4",children:" Total Earning"}),(0,f.jsxs)("h3",{className:"text-muted mb-0",children:["\u20b9 ",y.total_salary," "]})]}),(0,f.jsx)("div",{className:"text-danger",children:(0,f.jsx)(d.Gzv,{})})]})})})]}),(0,f.jsxs)("div",{className:"row mt-md-4 mt-0",children:[(0,f.jsx)("div",{className:"col-xl-6 col-lg-6 col-12",children:(0,f.jsxs)("div",{className:"chart",children:[(0,f.jsx)("h4",{children:"Attendance"}),(0,f.jsx)(x.Z,{options:E.options,series:E.series,type:"bar",width:"100%"})]})}),(0,f.jsx)("div",{className:"col-xl-6 col-lg-6 col-12",children:(0,f.jsxs)("div",{className:"chart",children:[(0,f.jsx)("h4",{children:"Payroll monthly report"}),(0,f.jsx)(x.Z,{options:D.options,series:D.series,type:"line",width:"100%"})]})})]})]}),(0,f.jsx)("div",{className:"col-lg-3 col-12",children:("Windows"==S||"Linux"==S)&&(0,f.jsxs)("div",{className:"timezone mt-md-4 mt-0",children:[(0,f.jsxs)("div",{className:"mb-0",children:[(0,f.jsxs)("span",{className:"date-section",children:["Today: ",Q.toString().slice(0,15)]}),(0,f.jsx)("p",{className:"mb-0",children:"Time"}),(0,f.jsx)("span",{children:(0,f.jsx)(j.Z,{})})]}),(0,f.jsxs)("div",{className:"text-left",children:[(0,f.jsx)("small",{children:"Get ready for an amazing workday!"}),(0,f.jsx)("br",{}),y.todayAttendance.outTime&&(0,f.jsx)(f.Fragment,{children:(0,f.jsx)("h4",{children:"Today you completed office Hours"})}),y.isSubmitting?(0,f.jsxs)("button",{type:"button",className:y.todayAttendance.inTime?y.todayAttendance.outTime?"btn btn-success":"btn btn-danger":"btn btn-success",disabled:!0,children:[(0,f.jsx)(A.Z,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),y.todayAttendance.inTime?y.todayAttendance.outTime?"Check In":"Check Out":"Check In"]}):!y.todayAttendance.outTime&&(0,f.jsx)("button",{type:"button",className:y.todayAttendance.inTime?y.todayAttendance.outTime?"btn btn-success":"btn btn-danger":"btn btn-success",onClick:T,children:y.todayAttendance.inTime?y.todayAttendance.outTime?"Check In":"Check Out":"Check In"}),(0,f.jsx)("small",{children:"Policy: Normal Attendance Policy "})]})]})})]})]})}},8746:function(e,t,n){n.d(t,{O:function(){return c}});var s=n(9439),a=n(2791),i=n(184);function c(e){var t=(0,a.useState)("00:00"),n=(0,s.Z)(t,2),c=n[0],o=n[1];return(0,a.useEffect)((function(){var t=setInterval((function(){if(e.outTime)return o(e.duration?e.duration:e.effective);if(e.inTime){var t,n=new Date(e.inTime).getHours(),s=new Date(e.inTime).getMinutes(),a=(new Date).getHours(),i=60*a+(new Date).getMinutes();t=a>=n?i-(60*n+s):i+(60-s===0?60*(24-n):60*(24-n-1)+(60-s));var c="".concat(parseInt(t/60).toString().padStart(2,"0"),":").concat("".concat(t%60<=9?Math.round(t%60).toString().padStart(2,"0"):t%60));return o(c)}}),1e3);return function(){clearInterval(t)}}),[e]),(0,i.jsx)("span",{children:c})}t.Z=function(){var e=(0,a.useState)(new Date),t=(0,s.Z)(e,2),n=t[0],c=t[1];return(0,a.useEffect)((function(){var e=setInterval((function(){return c(new Date)}),1e3);return function(){clearInterval(e)}}),[]),(0,i.jsx)("span",{children:n.toLocaleTimeString()})}},8478:function(e){e.exports="data:image/jpeg;base64,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"}}]);
//# sourceMappingURL=885.c53c692c.chunk.js.map