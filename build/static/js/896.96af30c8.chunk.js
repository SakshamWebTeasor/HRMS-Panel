"use strict";(self.webpackChunkhrm=self.webpackChunkhrm||[]).push([[896],{2896:function(e,r,s){s.r(r),s.d(r,{default:function(){return h}});var n=s(2791),a=s(9434),t=s(8124),i=s(3360),l=s(4849),c=s(4165),o=s(5861),d=s(4608),m=s(184);var u=function(){var e=(0,a.I0)(),r=(0,n.useRef)(),s=(0,n.useRef)(),u=(0,n.useRef)(),p=(0,n.useRef)(),h=(0,a.v9)((function(e){return e.auth}));(0,n.useEffect)((function(){e((0,t.vG)())}),[e]);var f=function(){var s=(0,o.Z)((0,c.Z)().mark((function s(n){return(0,c.Z)().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:n.preventDefault(),console.log("viryfy....:",r),e((0,t.X8)({email:r.current.value}));case 3:case"end":return s.stop()}}),s)})));return function(e){return s.apply(this,arguments)}}(),x=function(){var n=(0,o.Z)((0,c.Z)().mark((function n(a){return(0,c.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:a.preventDefault(),console.log("passwordchange...",r),u.current.value===p.current.value?(console.log("match"),e((0,t.QP)({email:h.verify_email,otp:s.current.value,password:u.current.value}))):console.log("not match");case 3:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,m.jsx)(m.Fragment,{children:(0,m.jsx)("div",{className:"login-page",children:(0,m.jsx)("div",{className:"row justify-content-center align-items-center m-2",children:(0,m.jsx)("div",{className:"col-lg-4 col-md-10 col-12",children:h.is_passWord_changed?(0,m.jsxs)("div",{className:"login",children:[(0,m.jsx)("h4",{children:"Password Changed Successfully ..."}),(0,m.jsx)("p",{onClick:function(){return e((0,t.hh)(!1))},children:(0,m.jsx)("u",{children:"Go to Login"})})]}):h.is_verify&&!h.is_passWord_changed?(0,m.jsxs)("form",{className:"login",onSubmit:x,children:[(0,m.jsx)("h4",{className:"mb-4",children:"Verify Password"}),(0,m.jsxs)("div",{className:"form-group mb-3",children:[(0,m.jsx)("label",{children:"OTP"}),(0,m.jsx)("input",{type:"text",className:"form-control mb-2",ref:s,placeholder:"Otp",id:"otp",required:!0}),(0,m.jsx)("span",{className:"text-danger",children:h.errors.length>0?h.errors.map((function(e){return"otp"===e.param?(0,m.jsx)(d.Z,{text:e.msg},"editerr-1"):""})):""}),(0,m.jsx)("label",{children:"Password"}),(0,m.jsx)("input",{type:"password",className:"form-control mb-2",ref:u,placeholder:"new password",id:"pass",required:!0}),(0,m.jsx)("span",{className:"text-danger",children:h.errors.length>0?h.errors.map((function(e){return"password"===e.param?(0,m.jsx)(d.Z,{text:e.msg},"editerr-1"):""})):""}),(0,m.jsx)("input",{type:"password",className:"form-control",ref:p,placeholder:"verify password",id:"verifypass",required:!0})]}),(0,m.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[h.isSubmitting?(0,m.jsxs)(i.Z,{variant:"primary",className:"me-3",children:[(0,m.jsx)(l.Z,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),"\u2800Verify Password"]}):(0,m.jsx)(i.Z,{variant:"primary",type:"submit",children:"Verify Password"}),(0,m.jsx)("p",{onClick:function(){return e((0,t.hh)(!1))},children:(0,m.jsx)("u",{children:"Go to Login"})})]})]}):(0,m.jsxs)("form",{className:"login",onSubmit:f,children:[(0,m.jsx)("h4",{className:"mb-4",children:"Forgot Password"}),(0,m.jsxs)("div",{className:"form-group mb-3",children:[(0,m.jsx)("input",{type:"email",className:"form-control",ref:r,placeholder:"Enter Email Address",required:!0,id:"verifyemail"}),(0,m.jsx)("span",{className:"text-danger",children:h.errors.length>0?h.errors.map((function(e){return"email"===e.param?(0,m.jsx)(d.Z,{text:e.msg},"editerr-1"):""})):""})]}),(0,m.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[h.isSubmitting?(0,m.jsxs)(i.Z,{variant:"primary",className:"me-3",children:[(0,m.jsx)(l.Z,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),"\u2800Get OTP"]}):(0,m.jsx)(i.Z,{variant:"primary",type:"submit",children:"Get OTP"}),(0,m.jsx)("p",{onClick:function(){return e((0,t.hh)(!1))},children:(0,m.jsx)("u",{children:"Go to Login"})})]})]})})})})})},p=s(4427);var h=function(){var e=(0,a.I0)(),r=(0,n.useRef)(),s=(0,n.useRef)(),c=(0,a.v9)((function(e){return e.auth}));return(0,n.useEffect)((function(){e((0,t.vG)())}),[e]),(0,m.jsx)(m.Fragment,{children:c.is_forgot_page?(0,m.jsx)(u,{}):(0,m.jsx)("div",{className:"login-page",children:(0,m.jsx)("div",{className:"row justify-content-center align-items-center m-2",children:(0,m.jsxs)("div",{className:"col-lg-4 col-md-10 col-12",children:[(0,m.jsx)("img",{className:"img-fluid",src:p,alt:"Webteasor HRM"}),(0,m.jsxs)("form",{className:"login",onSubmit:function(n){n.preventDefault(),e((0,t.x4)({userName:r.current.value,password:s.current.value}))},children:[(0,m.jsx)("h4",{className:"mb-4",children:"Login"}),(0,m.jsxs)("div",{className:"form-group mb-3",children:[(0,m.jsx)("input",{type:"type",className:"form-control",placeholder:"Enter Email ID or Mobile No.",ref:r,required:!0}),(0,m.jsx)("span",{className:"text-danger",children:c.errors.length>0?c.errors.map((function(e){return"email"===e.param?(0,m.jsx)(d.Z,{text:e.msg},"editerr-1"):""})):""})]}),(0,m.jsxs)("div",{className:"form-group mb-3",children:[(0,m.jsx)("input",{type:"password",className:"form-control",placeholder:"Password",ref:s,required:!0}),(0,m.jsx)("span",{className:"text-danger",children:c.errors.length>0?c.errors.map((function(e){return"password"===e.param?(0,m.jsx)(d.Z,{text:e.msg},"editerr-1"):""})):""})]}),(0,m.jsxs)("div",{className:"d-flex align-items-center justify-content-between",children:[c.isSubmitting?(0,m.jsxs)(i.Z,{variant:"danger",className:"me-3",children:[(0,m.jsx)(l.Z,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),"\u2800Login"]}):(0,m.jsx)(i.Z,{variant:"danger",type:"submit",className:"me-3",children:"Login"}),(0,m.jsx)("p",{onClick:function(){return e((0,t.hh)(!0))},children:(0,m.jsx)("u",{children:"Forget Password"})})]})]})]})})})})}}}]);
//# sourceMappingURL=896.96af30c8.chunk.js.map