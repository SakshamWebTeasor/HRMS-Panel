"use strict";(self.webpackChunkhrm=self.webpackChunkhrm||[]).push([[509],{7509:(e,s,a)=>{a.r(s),a.d(s,{default:()=>u});var t=a(2791),r=a(9434),l=a(2184),n=a(8116),i=a(3360),c=a(2591),d=a(5316),h=a(4688),o=a(4849),x=a(7770),m=a(4608),j=a(5086),p=a(184);const u=function(e){const s=(0,r.I0)(),a=e.jwt,u=(0,t.useRef)(),g=(0,t.useRef)(),v=(0,t.useRef)(),N=(0,t.useRef)(),[y,f]=(0,t.useState)(!1),[Z,b]=(0,t.useState)(!1),[w,L]=(0,t.useState)(),[k,_]=(0,t.useState)(!1),[D,S]=(0,t.useState)(null),C=(0,r.v9)((e=>e.userLeave));(0,t.useEffect)((()=>{s((0,l.go)({jwt:a}))}),[s,a]),(0,t.useEffect)((()=>{C.isError||(b(!1),f(!1))}),[C.isError]);let R=[];for(let t=1;t<=C.totalpages;t++)R.push((0,p.jsx)(n.Z.Item,{active:t===C.currentpage,onClick:()=>T(t),children:t},t));const T=e=>{s((0,l.go)({jwt:a,pageno:e}))};return C.isFirstTimeLoding?(0,p.jsx)(x.Z,{}):(0,p.jsxs)("div",{className:"page-section p-4",children:[(0,p.jsxs)("div",{className:"chart mt-4",children:[(0,p.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[(0,p.jsx)("h4",{className:"mb-0",children:" List All Leave "}),(0,p.jsx)(i.Z,{variant:"danger",onClick:()=>{b(!0)},children:"+ Apply Leave"})]}),(0,p.jsx)("div",{className:"responsive mt-4",children:(0,p.jsxs)(c.Z,{striped:!0,bordered:!0,hover:!0,children:[(0,p.jsx)("thead",{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)("th",{className:"text-white",children:"SL No"}),(0,p.jsx)("th",{className:"text-white",children:"Leave Type"}),(0,p.jsx)("th",{className:"text-white",children:"Leave Duration"}),(0,p.jsx)("th",{className:"text-white",children:"Days"}),(0,p.jsx)("th",{className:"text-white",children:"Applied On"}),(0,p.jsx)("th",{className:"text-white",children:"Status"})]})}),(0,p.jsx)("tbody",{children:C.isLoading?(0,p.jsx)("tr",{className:"text-center",children:(0,p.jsx)("td",{colSpan:8,children:"Loading..."})},"0-loading"):C.allData.length>0?C.allData.map(((e,s)=>(0,p.jsxs)("tr",{children:[(0,p.jsx)("td",{children:10*(C.currentpage-1)+(s+1)}),(0,p.jsx)("td",{children:(0,p.jsx)(m.Z,{text:e.type.name})}),(0,p.jsxs)("td",{children:[(0,p.jsx)(j.FU,{date_arg:e.start_date})," To ",(0,p.jsx)(j.FU,{date_arg:e.end_date})]}),(0,p.jsx)("td",{children:e.half_day?"Half Day":e.end_date&&e.start_date?(new Date(e.end_date).getTime()-new Date(e.start_date).getTime())/864e5+1:"N/A"}),(0,p.jsx)("td",{children:(0,p.jsx)(j.FU,{date_arg:e.created_at})}),(0,p.jsx)("td",{onClick:()=>((e,s)=>{L(e),S(s),_(!0)})(e.remark,e.approved_by),children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]},s))):(0,p.jsx)("tr",{children:(0,p.jsx)("td",{colSpan:8,className:"text-center",children:"No Data Found"})},"0-nodata")})]})}),(0,p.jsx)(n.Z,{children:R})]}),(0,p.jsxs)(d.Z,{show:k,onHide:()=>{_(!1),L(),S(null)},children:[(0,p.jsx)(d.Z.Header,{closeButton:!0,children:(0,p.jsxs)(d.Z.Title,{children:["Remark By ",D?D.name:"HR"]})}),(0,p.jsx)(d.Z.Body,{children:(0,p.jsx)("pre",{children:w})})]}),(0,p.jsxs)(d.Z,{show:Z,onHide:()=>{b(!1),f(!1),s((0,l.YY)())},children:[(0,p.jsx)(d.Z.Header,{closeButton:!0,children:(0,p.jsx)(d.Z.Title,{children:"Leave Apply"})}),(0,p.jsx)(d.Z.Body,{children:(0,p.jsxs)(h.Z,{onSubmit:async e=>{e.preventDefault(),await s((0,l.x1)(!0)),await s((0,l.rg)({jwt:a,type:u.current.value,start:g.current.value,end:v.current.value,reason:N.current.value,halfday:y})),s((0,l.x1)(!1))},children:[(0,p.jsxs)(h.Z.Group,{className:"my-3",children:[(0,p.jsx)(h.Z.Label,{children:"Leave Type"}),(0,p.jsxs)(h.Z.Select,{"aria-label":"Default select example",ref:u,mode:"multiple",className:"form-control",children:[(0,p.jsx)("option",{value:"",children:"Select"},"key-1"),C.allLeaveType.length>0?C.allLeaveType.map(((e,s)=>(0,p.jsxs)("option",{value:e._id,disabled:0===e.remaining,children:[e.name," - ",e.remaining]},s))):""]}),(0,p.jsx)("span",{className:"text-danger",children:C.errors.length>0?C.errors.map((e=>"type"===e.param?(0,p.jsx)(m.Z,{text:e.msg},e.param):"")):""})]}),(0,p.jsxs)(h.Z.Group,{className:"my-3",controlId:"exampleForm.ControlInput1",children:[(0,p.jsxs)(h.Z.Label,{children:["Duration",(0,p.jsx)("span",{className:"text-danger",children:"*"})," "]}),(0,p.jsxs)("div",{className:"d-flex align-items-center justify-contant-between",children:[(0,p.jsxs)("div",{className:"w-100",children:[(0,p.jsx)(h.Z.Control,{type:"date",ref:g,placeholder:"Duration"}),(0,p.jsx)("span",{className:"text-danger",children:C.errors.length>0?C.errors.map((e=>"start_date"===e.param?(0,p.jsx)(m.Z,{text:e.msg},e.param):"")):""})]}),(0,p.jsx)("p",{className:"mx-3",children:"To"}),(0,p.jsxs)("div",{className:"w-100",children:[(0,p.jsx)(h.Z.Control,{type:"date",ref:v,placeholder:"Description"}),(0,p.jsx)("span",{className:"text-danger",children:C.errors.length>0?C.errors.map((e=>"end_date"===e.param?(0,p.jsx)(m.Z,{text:e.msg},e.param):"")):""})]})]})]}),(0,p.jsx)(h.Z.Group,{children:(0,p.jsx)("div",{className:"radio-btns mt-0",children:(0,p.jsx)("div",{className:"mb-3",children:(0,p.jsx)(h.Z.Check,{type:"checkbox",onChange:e=>{f(e.target.checked)},label:"Half Day"})},"default-checkbox")})}),(0,p.jsxs)(h.Z.Group,{className:"mb-0",children:[(0,p.jsx)(h.Z.Label,{children:"Leave Reason"}),(0,p.jsx)(h.Z.Control,{as:"textarea",ref:N,rows:3,placeholder:"Reason"}),(0,p.jsx)("span",{className:"text-danger",children:C.errors.length>0?C.errors.map((e=>"reason"===e.param?(0,p.jsx)(m.Z,{text:e.msg},e.param):"")):""})]}),C.isSubmitting?(0,p.jsxs)(i.Z,{variant:"primary",className:"mt-4",children:[(0,p.jsx)(o.Z,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),"\u2800Apply"]}):(0,p.jsx)(i.Z,{type:"submit",variant:"danger",className:"mt-4",children:"Apply"})]})})]})]})}},8116:(e,s,a)=>{a.d(s,{Z:()=>v});var t=a(1418),r=a.n(t),l=a(2791),n=a(162),i=a(6445),c=a(184);const d=l.forwardRef(((e,s)=>{let{active:a=!1,disabled:t=!1,className:l,style:n,activeLabel:d="(current)",children:h,linkStyle:o,linkClassName:x,as:m=i.Z,...j}=e;const p=a||t?"span":m;return(0,c.jsx)("li",{ref:s,style:n,className:r()(l,"page-item",{active:a,disabled:t}),children:(0,c.jsxs)(p,{className:r()("page-link",x),style:o,...j,children:[h,a&&d&&(0,c.jsx)("span",{className:"visually-hidden",children:d})]})})}));d.displayName="PageItem";const h=d;function o(e,s){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e;const t=l.forwardRef(((e,t)=>{let{children:r,...l}=e;return(0,c.jsxs)(d,{...l,ref:t,children:[(0,c.jsx)("span",{"aria-hidden":"true",children:r||s}),(0,c.jsx)("span",{className:"visually-hidden",children:a})]})}));return t.displayName=e,t}const x=o("First","\xab"),m=o("Prev","\u2039","Previous"),j=o("Ellipsis","\u2026","More"),p=o("Next","\u203a"),u=o("Last","\xbb"),g=l.forwardRef(((e,s)=>{let{bsPrefix:a,className:t,size:l,...i}=e;const d=(0,n.vE)(a,"pagination");return(0,c.jsx)("ul",{ref:s,...i,className:r()(t,d,l&&"".concat(d,"-").concat(l))})}));g.displayName="Pagination";const v=Object.assign(g,{First:x,Prev:m,Ellipsis:j,Item:h,Next:p,Last:u})}}]);
//# sourceMappingURL=509.534d237e.chunk.js.map