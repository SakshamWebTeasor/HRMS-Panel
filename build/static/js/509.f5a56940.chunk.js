"use strict";(self.webpackChunkhrm=self.webpackChunkhrm||[]).push([[509],{7509:function(e,a,s){s.r(a),s.d(a,{default:function(){return Z}});var t=s(4165),r=s(5861),n=s(9439),l=s(2791),i=s(9434),c=s(2184),d=s(8116),o=s(3360),h=s(2591),x=s(5316),u=s(4578),m=s(4849),p=s(7770),j=s(4608),f=s(5086),v=s(184);var Z=function(e){var a=(0,i.I0)(),s=e.jwt,Z=(0,l.useRef)(),g=(0,l.useRef)(),N=(0,l.useRef)(),y=(0,l.useRef)(),b=(0,l.useState)(!1),w=(0,n.Z)(b,2),L=w[0],k=w[1],S=(0,l.useState)(!1),_=(0,n.Z)(S,2),C=_[0],D=_[1],R=(0,l.useState)(),T=(0,n.Z)(R,2),A=T[0],F=T[1],E=(0,l.useState)(!1),H=(0,n.Z)(E,2),P=H[0],I=H[1],B=(0,l.useState)(null),G=(0,n.Z)(B,2),U=G[0],z=G[1],O=(0,i.v9)((function(e){return e.userLeave}));(0,l.useEffect)((function(){a((0,c.go)({jwt:s}))}),[a,s]),(0,l.useEffect)((function(){O.isError||(D(!1),k(!1))}),[O.isError]);for(var Y=function(){var e=(0,r.Z)((0,t.Z)().mark((function e(r){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.next=3,a((0,c.x1)(!0));case 3:return e.next=5,a((0,c.rg)({jwt:s,type:Z.current.value,start:g.current.value,end:N.current.value,reason:y.current.value,halfday:L}));case 5:a((0,c.x1)(!1));case 6:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),M=[],q=function(e){M.push((0,v.jsx)(d.Z.Item,{active:e===O.currentpage,onClick:function(){return K(e)},children:e},e))},J=1;J<=O.totalpages;J++)q(J);var K=function(e){a((0,c.go)({jwt:s,pageno:e}))};return O.isFirstTimeLoding?(0,v.jsx)(p.Z,{}):(0,v.jsxs)("div",{className:"page-section p-4",children:[(0,v.jsxs)("div",{className:"chart mt-4",children:[(0,v.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[(0,v.jsx)("h4",{className:"mb-0",children:" List All Leave "}),(0,v.jsx)(o.Z,{variant:"danger",onClick:function(){D(!0)},children:"+ Apply Leave"})]}),(0,v.jsx)("div",{className:"responsive mt-4",children:(0,v.jsxs)(h.Z,{striped:!0,bordered:!0,hover:!0,children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{children:[(0,v.jsx)("th",{className:"text-white",children:"SL No"}),(0,v.jsx)("th",{className:"text-white",children:"Leave Type"}),(0,v.jsx)("th",{className:"text-white",children:"Leave Duration"}),(0,v.jsx)("th",{className:"text-white",children:"Days"}),(0,v.jsx)("th",{className:"text-white",children:"Applied On"}),(0,v.jsx)("th",{className:"text-white",children:"Status"})]})}),(0,v.jsx)("tbody",{children:O.isLoading?(0,v.jsx)("tr",{className:"text-center",children:(0,v.jsx)("td",{colSpan:8,children:"Loading..."})},"0-loading"):O.allData.length>0?O.allData.map((function(e,a){return(0,v.jsxs)("tr",{children:[(0,v.jsx)("td",{children:10*(O.currentpage-1)+(a+1)}),(0,v.jsx)("td",{children:(0,v.jsx)(j.Z,{text:e.type.name})}),(0,v.jsxs)("td",{children:[(0,v.jsx)(f.FU,{date_arg:e.start_date})," To ",(0,v.jsx)(f.FU,{date_arg:e.end_date})]}),(0,v.jsx)("td",{children:e.half_day?"Half Day":e.end_date&&e.start_date?(new Date(e.end_date).getTime()-new Date(e.start_date).getTime())/864e5+1:"N/A"}),(0,v.jsx)("td",{children:(0,v.jsx)(f.FU,{date_arg:e.created_at})}),(0,v.jsx)("td",{onClick:function(){return function(e,a){F(e),z(a),I(!0)}(e.remark,e.approved_by)},children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]},a)})):(0,v.jsx)("tr",{children:(0,v.jsx)("td",{colSpan:8,className:"text-center",children:"No Data Found"})},"0-nodata")})]})}),(0,v.jsx)(d.Z,{children:M})]}),(0,v.jsxs)(x.Z,{show:P,onHide:function(){I(!1),F(),z(null)},children:[(0,v.jsx)(x.Z.Header,{closeButton:!0,children:(0,v.jsxs)(x.Z.Title,{children:["Remark By ",U?U.name:"HR"]})}),(0,v.jsx)(x.Z.Body,{children:(0,v.jsx)("pre",{children:A})})]}),(0,v.jsxs)(x.Z,{show:C,onHide:function(){D(!1),k(!1),a((0,c.YY)())},children:[(0,v.jsx)(x.Z.Header,{closeButton:!0,children:(0,v.jsx)(x.Z.Title,{children:"Leave Apply"})}),(0,v.jsx)(x.Z.Body,{children:(0,v.jsxs)(u.Z,{onSubmit:Y,children:[(0,v.jsxs)(u.Z.Group,{className:"my-3",children:[(0,v.jsx)(u.Z.Label,{children:"Leave Type"}),(0,v.jsxs)(u.Z.Select,{"aria-label":"Default select example",ref:Z,mode:"multiple",className:"form-control",children:[(0,v.jsx)("option",{value:"",children:"Select"},"key-1"),O.allLeaveType.length>0?O.allLeaveType.map((function(e,a){return(0,v.jsxs)("option",{value:e._id,disabled:0===e.remaining,children:[e.name," - ",e.remaining]},a)})):""]}),(0,v.jsx)("span",{className:"text-danger",children:O.errors.length>0?O.errors.map((function(e){return"type"===e.param?(0,v.jsx)(j.Z,{text:e.msg},e.param):""})):""})]}),(0,v.jsxs)(u.Z.Group,{className:"my-3",controlId:"exampleForm.ControlInput1",children:[(0,v.jsxs)(u.Z.Label,{children:["Duration",(0,v.jsx)("span",{className:"text-danger",children:"*"})," "]}),(0,v.jsxs)("div",{className:"d-flex align-items-center justify-contant-between",children:[(0,v.jsxs)("div",{className:"w-100",children:[(0,v.jsx)(u.Z.Control,{type:"date",ref:g,placeholder:"Duration"}),(0,v.jsx)("span",{className:"text-danger",children:O.errors.length>0?O.errors.map((function(e){return"start_date"===e.param?(0,v.jsx)(j.Z,{text:e.msg},e.param):""})):""})]}),(0,v.jsx)("p",{className:"mx-3",children:"To"}),(0,v.jsxs)("div",{className:"w-100",children:[(0,v.jsx)(u.Z.Control,{type:"date",ref:N,placeholder:"Description"}),(0,v.jsx)("span",{className:"text-danger",children:O.errors.length>0?O.errors.map((function(e){return"end_date"===e.param?(0,v.jsx)(j.Z,{text:e.msg},e.param):""})):""})]})]})]}),(0,v.jsx)(u.Z.Group,{children:(0,v.jsx)("div",{className:"radio-btns mt-0",children:(0,v.jsx)("div",{className:"mb-3",children:(0,v.jsx)(u.Z.Check,{type:"checkbox",onChange:function(e){k(e.target.checked)},label:"Half Day"})},"default-checkbox")})}),(0,v.jsxs)(u.Z.Group,{className:"mb-0",children:[(0,v.jsx)(u.Z.Label,{children:"Leave Reason"}),(0,v.jsx)(u.Z.Control,{as:"textarea",ref:y,rows:3,placeholder:"Reason"}),(0,v.jsx)("span",{className:"text-danger",children:O.errors.length>0?O.errors.map((function(e){return"reason"===e.param?(0,v.jsx)(j.Z,{text:e.msg},e.param):""})):""})]}),O.isSubmitting?(0,v.jsxs)(o.Z,{variant:"primary",className:"mt-4",children:[(0,v.jsx)(m.Z,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),"\u2800Apply"]}):(0,v.jsx)(o.Z,{type:"submit",variant:"danger",className:"mt-4",children:"Apply"})]})})]})]})}},8116:function(e,a,s){s.d(a,{Z:function(){return b}});var t=s(1413),r=s(5987),n=s(1694),l=s.n(n),i=s(2791),c=s(162),d=s(6445),o=s(184),h=["active","disabled","className","style","activeLabel","children","linkStyle","linkClassName"],x=["children"],u=i.forwardRef((function(e,a){var s=e.active,n=void 0!==s&&s,i=e.disabled,c=void 0!==i&&i,x=e.className,u=e.style,m=e.activeLabel,p=void 0===m?"(current)":m,j=e.children,f=e.linkStyle,v=e.linkClassName,Z=(0,r.Z)(e,h),g=n||c?"span":d.Z;return(0,o.jsx)("li",{ref:a,style:u,className:l()(x,"page-item",{active:n,disabled:c}),children:(0,o.jsxs)(g,(0,t.Z)((0,t.Z)({className:l()("page-link",v),style:f},Z),{},{children:[j,n&&p&&(0,o.jsx)("span",{className:"visually-hidden",children:p})]}))})}));u.displayName="PageItem";var m=u;function p(e,a){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e,n=i.forwardRef((function(e,n){var l=e.children,i=(0,r.Z)(e,x);return(0,o.jsxs)(u,(0,t.Z)((0,t.Z)({},i),{},{ref:n,children:[(0,o.jsx)("span",{"aria-hidden":"true",children:l||a}),(0,o.jsx)("span",{className:"visually-hidden",children:s})]}))}));return n.displayName=e,n}var j=p("First","\xab"),f=p("Prev","\u2039","Previous"),v=p("Ellipsis","\u2026","More"),Z=p("Next","\u203a"),g=p("Last","\xbb"),N=["bsPrefix","className","size"],y=i.forwardRef((function(e,a){var s=e.bsPrefix,n=e.className,i=e.size,d=(0,r.Z)(e,N),h=(0,c.vE)(s,"pagination");return(0,o.jsx)("ul",(0,t.Z)((0,t.Z)({ref:a},d),{},{className:l()(n,h,i&&"".concat(h,"-").concat(i))}))}));y.displayName="Pagination";var b=Object.assign(y,{First:j,Prev:f,Ellipsis:v,Item:m,Next:Z,Last:g})}}]);
//# sourceMappingURL=509.f5a56940.chunk.js.map