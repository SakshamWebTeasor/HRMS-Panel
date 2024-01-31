"use strict";(self.webpackChunkhrm=self.webpackChunkhrm||[]).push([[659],{9659:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Z});var r=n(2791),a=n(9434),s=n(577),l=n(8116),i=n(4688),o=n(3360),c=n(4849),d=n(2076),x=n(9485),h=n(1734),m=n(2591),u=n(5316),j=n(4373),p=n(763),g=n(4608),v=n(1462),b=n(5086),E=n(184);const Z=function(e){const t=(0,a.I0)(),n=e.jwt,Z=(0,r.useRef)(),f=(0,r.useRef)(),N=(0,r.useRef)(),y=(0,r.useRef)(),w=(0,r.useRef)(),C=(0,r.useRef)(),_=(0,r.useRef)(),[O,D]=(0,r.useState)(!1),[S,A]=(0,r.useState)(!1),[K,k]=(0,r.useState)(),[I,T]=(0,r.useState)(),[F,P]=(0,r.useState)(),[R,L]=(0,r.useState)(!1),q=(0,a.v9)((e=>e.policy));(0,r.useEffect)((()=>{t((0,s.go)({jwt:n}))}),[t,n]),(0,r.useEffect)((()=>{!q.isError&&Z.current&&w.current&&N.current&&(A(!1),t((0,s.e2)()),Z.current.value=null,N.current.value=null,w.current.value=null)}),[q.isError,t]);const G=e=>{t((0,s.go)({jwt:n,param:e,x:!q.sorting_on.sort}))},U=(0,p.debounce)((()=>{let e=_.current.value;0===e.length&&t((0,s.go)({jwt:n})),e.length>=3&&t((0,s.ic)({jwt:n,searchKey:e}))}),500),B=()=>{D(!1)};let H=[];for(let r=1;r<=q.pagination_AllData.totalpages;r++)H.push((0,E.jsx)(l.Z.Item,{active:r===q.pagination_AllData.currentpage,onClick:()=>V(r),children:r},r));let M=[];for(let r=1;r<=q.pagination_Deleted_AllData.totalpages;r++)M.push((0,E.jsx)(l.Z.Item,{active:r===q.pagination_Deleted_AllData.currentpage,onClick:()=>V(r),children:r},"deleted-"+r));const V=e=>q.isSearch&&!R?t((0,s.ic)({jwt:n,pageno:e,searchKey:_.current.value})):t((0,s.go)({jwt:n,pageno:e,param:q.sorting_on.field,x:q.sorting_on.sort,type:R?"deleted":"available"}));return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)("div",{className:"page-section p-4",children:(0,E.jsxs)("div",{className:"row",children:[(0,E.jsx)("div",{className:"col-xl-4 col-lg-5 col-md-12 col-12",children:(0,E.jsxs)("div",{className:"add-departmen chart",children:[(0,E.jsx)("h4",{className:"mb-4",children:"Add New Policy"}),(0,E.jsxs)(i.Z,{onSubmit:e=>{e.preventDefault(),t((0,s.xK)({jwt:n,title:Z.current.value,description:N.current.value,file:w.current.files[0],total:q.allData.length}))},children:[(0,E.jsxs)(i.Z.Group,{className:"my-3",controlId:"exampleForm.ControlInput1",children:[(0,E.jsxs)(i.Z.Label,{children:["Title ",(0,E.jsx)("span",{className:"text-danger",children:"*"})," "]}),(0,E.jsx)(i.Z.Control,{type:"text",ref:Z,placeholder:"Title",required:!0}),(0,E.jsx)("span",{className:"text-danger",children:q.errors.length>0?q.errors.map((e=>"title"===e.param?(0,E.jsx)(g.Z,{text:e.msg},"err-1"):"")):""})]}),(0,E.jsxs)(i.Z.Group,{className:"mb-0",controlId:"exampleForm.ControlTextarea1",children:[(0,E.jsxs)(i.Z.Label,{children:["Description ",(0,E.jsx)("span",{className:"text-danger",children:"*"})]}),(0,E.jsx)(i.Z.Control,{as:"textarea",ref:N,rows:3,required:!0,placeholder:"Description"}),(0,E.jsx)("span",{className:"text-danger",children:q.isError&&q.errors.length>0?q.errors.map((e=>"description"===e.param?(0,E.jsx)(g.Z,{text:e.msg},"err-2"):"")):""})]}),(0,E.jsxs)(i.Z.Group,{controlId:"formFile",className:"mt-3",children:[(0,E.jsxs)(i.Z.Label,{children:["Attachment"," ",(0,E.jsx)("span",{className:"text-danger",children:"* (.pdf, .jpg, .jpeg)"})]}),(0,E.jsx)(i.Z.Control,{ref:w,type:"file",accept:".pdf,.jpg,.jpeg|image/*|application/pdf",required:!0}),(0,E.jsx)("span",{className:"text-danger",children:q.isError&&q.errors.length>0?q.errors.map((e=>"file"===e.param?(0,E.jsx)(g.Z,{text:e.msg},"err-3"):"")):""})]}),q.isSubmitting?(0,E.jsxs)(o.Z,{variant:"primary",className:"mt-4",children:[(0,E.jsx)(c.Z,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),"\u2800Save"]}):(0,E.jsx)(o.Z,{type:"submit",variant:"danger",className:"mt-4",children:"Save"})]})]})}),(0,E.jsx)("div",{className:"col-xl-8 col-lg-7 col-md-12 col-12",children:(0,E.jsxs)("div",{className:"add-departmen chart",children:[(0,E.jsx)("div",{className:"d-flex justify-content-between align-items-center",children:(0,E.jsx)("h4",{className:"mb-0",children:"List All Policies"})}),(0,E.jsxs)("div",{className:"row align-items-center justify-content-between my-4",children:[(0,E.jsx)("div",{className:"col-lg-3 col-12"}),(0,E.jsx)("div",{className:"col-lg-3 col-12",children:(0,E.jsx)(d.Z,{className:"me-3 my-lg-0 my-3",children:(0,E.jsx)(i.Z.Control,{placeholder:"Search....",onChange:U,ref:_,"aria-label":"Recipient's username","aria-describedby":"basic-addon2"})})})]}),(0,E.jsxs)(x.Z,{onSelect:e=>{L("available"!==e)},defaultActiveKey:"available",id:"uncontrolled-tab-example",className:"mb-3",children:[(0,E.jsxs)(h.Z,{eventKey:"available",title:"Available",children:[(0,E.jsx)("div",{className:"responsive mt-4",children:(0,E.jsxs)(m.Z,{striped:!0,bordered:!0,hover:!0,children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)("th",{className:"text-white",children:"S.No."}),(0,E.jsxs)("th",{className:"text-white",onClick:()=>G("title"),children:["Title","title"===q.sorting_on.field?q.sorting_on.sort?(0,E.jsx)("span",{className:"text-white",children:(0,E.jsx)(j.KKI,{})}):(0,E.jsx)("span",{style:{color:"#fff",position:"relative",right:"0"},children:(0,E.jsx)(j.mLR,{})}):(0,E.jsx)(E.Fragment,{})]}),(0,E.jsx)("th",{className:"text-white",children:"Description"}),(0,E.jsxs)("th",{className:"text-white",onClick:()=>G("created_at"),children:["Created\u2800At","created_at"===q.sorting_on.field?q.sorting_on.sort?(0,E.jsx)("span",{className:"text-white",children:(0,E.jsx)(j.KKI,{})}):(0,E.jsx)("span",{style:{color:"#fff",position:"relative",right:"0"},children:(0,E.jsx)(j.mLR,{})}):(0,E.jsx)(E.Fragment,{})]}),(0,E.jsx)("th",{className:"text-white",children:"Action"})]})}),(0,E.jsx)("tbody",{children:q.isLoading?(0,E.jsx)("tr",{className:"text-center",children:(0,E.jsx)("td",{colSpan:8,children:"Loading..."})},0):q.allData.length>0?q.allData.map(((e,n)=>(0,E.jsxs)("tr",{children:[(0,E.jsx)("td",{children:10*(q.pagination_AllData.currentpage-1)+(n+1)}),(0,E.jsx)("td",{children:(0,E.jsx)(g.Z,{text:e.title})}),(0,E.jsx)("td",{children:(0,E.jsx)(v.Z,{text:e.description,limit:30})}),(0,E.jsx)("td",{children:(0,E.jsx)(b.FU,{date_arg:e.created_at})}),(0,E.jsxs)("td",{className:"d-lg-block d-flex align-items-center",children:[e.is_deleted?"Deleted":(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(o.Z,{onClick:()=>{((e,n)=>{A(!0),T(n),t((0,s.Hd)(e)),Z.current.value=null,N.current.value=null,w.current.value=null})(e._id,n)},className:"ms-2 btn btn-warning text-white",children:"Edit"}),(0,E.jsx)(o.Z,{variant:"danger",className:"ms-2",onClick:()=>{((e,t,n)=>{D(!0),P(t),k(e),T(n)})(e._id,e.attachment_path,n)},children:"Delete"})]}),e.attachment_link?(0,E.jsx)("a",{href:e.attachment_link,className:"ms-2 btn btn-success text-white",target:"_blank",rel:"noreferrer",children:"Open"}):(0,E.jsx)(E.Fragment,{})]})]},n))):(0,E.jsx)("tr",{children:(0,E.jsx)("td",{colSpan:8,className:"text-center",children:"No Data Found"})},0)})]})}),(0,E.jsxs)(l.Z,{children:[" ",H]})]}),(0,E.jsxs)(h.Z,{eventKey:"deleted",title:"Deleted",children:[(0,E.jsx)("div",{className:"responsive mt-4",children:(0,E.jsxs)(m.Z,{striped:!0,bordered:!0,hover:!0,children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)("th",{className:"text-white",children:"S.No."}),(0,E.jsx)("th",{className:"text-white",children:"Title"}),(0,E.jsx)("th",{className:"text-white",children:"Description"}),(0,E.jsx)("th",{className:"text-white",children:"Created\u2800At"}),(0,E.jsx)("th",{className:"text-white",children:"Action"})]})}),(0,E.jsx)("tbody",{children:q.isLoading?(0,E.jsx)("tr",{className:"text-center",children:(0,E.jsx)("td",{colSpan:8,children:"Loading..."})},0):q.deleted_allData.length>0?q.deleted_allData.map(((e,t)=>(0,E.jsxs)("tr",{children:[(0,E.jsx)("td",{children:10*(q.pagination_Deleted_AllData.currentpage-1)+(t+1)}),(0,E.jsx)("td",{children:(0,E.jsx)(g.Z,{text:e.title})}),(0,E.jsx)("td",{children:(0,E.jsx)(v.Z,{text:e.description,limit:30})}),(0,E.jsx)("td",{children:(0,E.jsx)(b.FU,{date_arg:e.created_at})}),(0,E.jsx)("td",{className:"d-lg-block d-flex align-items-center",children:e.attachment_link?(0,E.jsx)("a",{href:e.attachment_link,className:"ms-2 btn btn-success text-white",target:"_blank",rel:"noreferrer",children:"Open"}):(0,E.jsx)(E.Fragment,{})})]},t))):(0,E.jsx)("tr",{children:(0,E.jsx)("td",{colSpan:8,className:"text-center",children:"No Data Found"})},0)})]})}),(0,E.jsxs)(l.Z,{children:[" ",M]})]})]})]})})]})}),(0,E.jsxs)(u.Z,{show:O,onHide:B,children:[(0,E.jsx)(u.Z.Header,{closeButton:!0,children:(0,E.jsx)(u.Z.Title,{children:"Delete"})}),(0,E.jsx)(u.Z.Body,{children:"Do you really want to delete?"}),(0,E.jsxs)(u.Z.Footer,{children:[(0,E.jsx)(o.Z,{variant:"danger",onClick:()=>{B(),t((0,s.JS)({jwt:n,id:K,fileName:F,pageno:1===q.allData.length&&q.pagination_AllData.currentpage>1?Number(q.pagination_AllData.currentpage)-1:q.pagination_AllData.currentpage}))},children:"Yes"}),(0,E.jsx)(o.Z,{variant:"primary",onClick:B,children:"No"})]})]}),(0,E.jsxs)(u.Z,{show:S,onHide:()=>{A(!1)},children:[(0,E.jsx)(u.Z.Header,{closeButton:!0,children:(0,E.jsx)(u.Z.Title,{children:"Edit Policy"})}),(0,E.jsx)(u.Z.Body,{children:(0,E.jsxs)(i.Z,{onSubmit:e=>{e.preventDefault(),t((0,s.Vs)({jwt:n,id:q.singledata[0]._id,index:I,description:y.current.value,title:f.current.value,file:C.current.files[0],attachment_path:q.singledata[0].attachment_path,attachment_link:q.singledata[0].attachment_link}))},children:[(0,E.jsxs)(i.Z.Group,{className:"my-3",controlId:"exampleForm.ControlInput1",children:[(0,E.jsxs)(i.Z.Label,{children:["Title ",(0,E.jsx)("span",{className:"text-danger",children:"*"})," "]}),(0,E.jsx)(i.Z.Control,{type:"text",ref:f,defaultValue:q.singledata.length>0?q.singledata[0].title:"",placeholder:"Title",required:!0}),(0,E.jsx)("span",{className:"text-danger",children:q.isError&&q.editErrors.length>0?q.editErrors.map((e=>"title"===e.param?(0,E.jsx)(g.Z,{text:e.msg},"editerr-1"):"")):""})]}),(0,E.jsxs)(i.Z.Group,{className:"mb-0",controlId:"exampleForm.ControlTextarea1",children:[(0,E.jsxs)(i.Z.Label,{children:["Description ",(0,E.jsx)("span",{className:"text-danger",children:"*"})]}),(0,E.jsx)(i.Z.Control,{as:"textarea",ref:y,defaultValue:q.singledata.length>0?q.singledata[0].description:"",rows:3,placeholder:"Description",required:!0}),(0,E.jsx)("span",{className:"text-danger",children:q.isError&&q.editErrors.length>0?q.editErrors.map((e=>"description"===e.param?(0,E.jsx)(g.Z,{text:e.msg},"editerr-2"):"")):""})]}),(0,E.jsx)("div",{className:"d-block align-items-center justify-content-between",children:(0,E.jsxs)(i.Z.Group,{controlId:"formFile",className:"mt-3",children:[(0,E.jsxs)(i.Z.Label,{children:["Attachment"," ",(0,E.jsx)("span",{className:"text-danger",children:" (only .pdf, .jpg, .jpeg)"})]}),(0,E.jsx)(i.Z.Control,{ref:C,type:"file",accept:".pdf,.jpg,.jpeg|image/*|application/pdf"})]})}),q.isEditSubmitting?(0,E.jsxs)(o.Z,{variant:"primary",className:"mt-4",children:[(0,E.jsx)(c.Z,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),"\u2800Update"]}):(0,E.jsx)(o.Z,{type:"submit",variant:"danger",className:"mt-4",children:"Update"})]})})]})]})}},1462:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(2791),a=n(184);const s=function(e){const t=e.text,n=e.limit,[s,l]=(0,r.useState)(!1);return(0,a.jsx)(a.Fragment,{children:t?(0,a.jsxs)(a.Fragment,{children:[s?t:t.substr(0,e.limit),t.length>n&&(0,a.jsx)("button",{onClick:()=>l(!s),children:s?"...Read Less":"...Read More"})]}):(0,a.jsx)(a.Fragment,{})})}},551:(e,t,n)=>{n.d(t,{W:()=>h,Z:()=>u});var r=n(2791),a=n(165),s=n(8633),l=n(5666),i=n(184);const o=["active","eventKey","mountOnEnter","transition","unmountOnExit","role","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],c=["activeKey","getControlledId","getControllerId"],d=["as"];function x(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}function h(e){let{active:t,eventKey:n,mountOnEnter:l,transition:i,unmountOnExit:d,role:h="tabpanel",onEnter:m,onEntering:u,onEntered:j,onExit:p,onExiting:g,onExited:v}=e,b=x(e,o);const E=(0,r.useContext)(a.Z);if(!E)return[Object.assign({},b,{role:h}),{eventKey:n,isActive:t,mountOnEnter:l,transition:i,unmountOnExit:d,onEnter:m,onEntering:u,onEntered:j,onExit:p,onExiting:g,onExited:v}];const{activeKey:Z,getControlledId:f,getControllerId:N}=E,y=x(E,c),w=(0,s.h)(n);return[Object.assign({},b,{role:h,id:f(n),"aria-labelledby":N(n)}),{eventKey:n,isActive:null==t&&null!=w?(0,s.h)(Z)===w:t,transition:i||y.transition,mountOnEnter:null!=l?l:y.mountOnEnter,unmountOnExit:null!=d?d:y.unmountOnExit,onEnter:m,onEntering:u,onEntered:j,onExit:p,onExiting:g,onExited:v}]}const m=r.forwardRef(((e,t)=>{let{as:n="div"}=e,r=x(e,d);const[o,{isActive:c,onEnter:m,onEntering:u,onEntered:j,onExit:p,onExiting:g,onExited:v,mountOnEnter:b,unmountOnExit:E,transition:Z=l.Z}]=h(r);return(0,i.jsx)(a.Z.Provider,{value:null,children:(0,i.jsx)(s.Z.Provider,{value:null,children:(0,i.jsx)(Z,{in:c,onEnter:m,onEntering:u,onEntered:j,onExit:p,onExiting:g,onExited:v,mountOnEnter:b,unmountOnExit:E,children:(0,i.jsx)(n,Object.assign({},o,{ref:t,hidden:!c,"aria-hidden":!c}))})})})}));m.displayName="TabPanel";const u=m},5561:(e,t,n)=>{n.d(t,{Z:()=>x});var r=n(2791),a=n(3722),s=n(9181),l=n(165),i=n(8633),o=n(551),c=n(184);const d=e=>{const{id:t,generateChildId:n,onSelect:o,activeKey:d,defaultActiveKey:x,transition:h,mountOnEnter:m,unmountOnExit:u,children:j}=e,[p,g]=(0,a.$c)(d,x,o),v=(0,s.gP)(t),b=(0,r.useMemo)((()=>n||((e,t)=>v?"".concat(v,"-").concat(t,"-").concat(e):null)),[v,n]),E=(0,r.useMemo)((()=>({onSelect:g,activeKey:p,transition:h,mountOnEnter:m||!1,unmountOnExit:u||!1,getControlledId:e=>b(e,"tabpane"),getControllerId:e=>b(e,"tab")})),[g,p,h,m,u,b]);return(0,c.jsx)(l.Z.Provider,{value:E,children:(0,c.jsx)(i.Z.Provider,{value:g||null,children:j})})};d.Panel=o.Z;const x=d},1734:(e,t,n)=>{n.d(t,{Z:()=>u});var r=n(2007),a=n.n(r),s=(n(2791),n(5561)),l=n(3507),i=n(184);const o=e=>{let{transition:t,...n}=e;return(0,i.jsx)(s.Z,{...n,transition:(0,l.Z)(t)})};o.displayName="TabContainer";const c=o;var d=n(4886),x=n(4504);const h={eventKey:a().oneOfType([a().string,a().number]),title:a().node.isRequired,disabled:a().bool,tabClassName:a().string,tabAttrs:a().object},m=()=>{throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")};m.propTypes=h;const u=Object.assign(m,{Container:c,Content:d.Z,Pane:x.Z})},4886:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(2791),a=n(1418),s=n.n(a),l=n(162),i=n(184);const o=r.forwardRef(((e,t)=>{let{className:n,bsPrefix:r,as:a="div",...o}=e;return r=(0,l.vE)(r,"tab-content"),(0,i.jsx)(a,{ref:t,className:s()(n,r),...o})}));o.displayName="TabContent";const c=o},4504:(e,t,n)=>{n.d(t,{Z:()=>u});var r=n(1418),a=n.n(r),s=n(2791),l=n(8633),i=n(165),o=n(551),c=n(162),d=n(2709),x=n(3507),h=n(184);const m=s.forwardRef(((e,t)=>{let{bsPrefix:n,transition:r,...s}=e;const[{className:m,as:u="div",...j},{isActive:p,onEnter:g,onEntering:v,onEntered:b,onExit:E,onExiting:Z,onExited:f,mountOnEnter:N,unmountOnExit:y,transition:w=d.Z}]=(0,o.W)({...s,transition:(0,x.Z)(r)}),C=(0,c.vE)(n,"tab-pane");return(0,h.jsx)(i.Z.Provider,{value:null,children:(0,h.jsx)(l.Z.Provider,{value:null,children:(0,h.jsx)(w,{in:p,onEnter:g,onEntering:v,onEntered:b,onExit:E,onExiting:Z,onExited:f,mountOnEnter:N,unmountOnExit:y,children:(0,h.jsx)(u,{...j,ref:t,className:a()(m,C,p&&"active")})})})})}));m.displayName="TabPane";const u=m},9485:(e,t,n)=>{n.d(t,{Z:()=>p});n(2791);var r=n(239),a=n(5561),s=n(6387),l=n(9102),i=n(881),o=n(4886),c=n(4504),d=n(1701),x=n(3507),h=n(184);function m(e){let t;return(0,d.Ed)(e,(e=>{null==t&&(t=e.props.eventKey)})),t}function u(e){const{title:t,eventKey:n,disabled:r,tabClassName:a,tabAttrs:s,id:o}=e.props;return null==t?null:(0,h.jsx)(i.Z,{as:"li",role:"presentation",children:(0,h.jsx)(l.Z,{as:"button",type:"button",eventKey:n,disabled:r,id:o,className:a,...s,children:t})})}const j=e=>{const{id:t,onSelect:n,transition:l,mountOnEnter:i=!1,unmountOnExit:j=!1,variant:p="tabs",children:g,activeKey:v=m(g),...b}=(0,r.Ch)(e,{activeKey:"onSelect"});return(0,h.jsxs)(a.Z,{id:t,activeKey:v,onSelect:n,transition:(0,x.Z)(l),mountOnEnter:i,unmountOnExit:j,children:[(0,h.jsx)(s.Z,{...b,role:"tablist",as:"ul",variant:p,children:(0,d.UI)(g,u)}),(0,h.jsx)(o.Z,{children:(0,d.UI)(g,(e=>{const t={...e.props};return delete t.title,delete t.disabled,delete t.tabClassName,delete t.tabAttrs,(0,h.jsx)(c.Z,{...t})}))})]})};j.displayName="Tabs";const p=j},3507:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(5666),a=n(2709);function s(e){return"boolean"===typeof e?e?a.Z:r.Z:e}}}]);
//# sourceMappingURL=659.f4668321.chunk.js.map