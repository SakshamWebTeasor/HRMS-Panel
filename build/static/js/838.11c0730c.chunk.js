"use strict";(self.webpackChunkhrm=self.webpackChunkhrm||[]).push([[838],{1838:(e,t,n)=>{n.r(t),n.d(t,{default:()=>b});var a=n(2791),r=n(9434),s=n(944),l=(n(594),n(8116)),i=n(3360),o=n(4688),d=n(2076),c=n(9485),x=n(1734),h=n(2591),m=n(5316),u=n(4849),j=n(4373),p=n(763),g=n(4608),v=n(1462),f=n(184);const b=function(e){const t=(0,r.I0)(),n=e.jwt,[b,E]=(0,a.useState)(!1),[Z,N]=(0,a.useState)(),[y,_]=(0,a.useState)(),[w,D]=(0,a.useState)(!1),[C,A]=(0,a.useState)(!1),[S,O]=(0,a.useState)(!1),[K,k]=(0,a.useState)(),I=(0,a.useRef)(),T=(0,a.useRef)(),R=(0,a.useRef)(),F=(0,a.useRef)(),L=(0,a.useRef)(),P=(0,a.useRef)(),V=(0,a.useRef)(),q=(0,a.useRef)(),B=(0,r.v9)((e=>e.announcement));(0,a.useEffect)((()=>{t((0,s.go)({jwt:n}))}),[t,n]),(0,a.useEffect)((()=>{B.isError||(O(!1),q.current.value="")}),[B.isError]);const G=e=>{t((0,s.go)({jwt:n,param:e,x:!B.sorting_on.sort})),q.current.value=""},H=(0,p.debounce)((()=>{let e=V.current.value;0===e.length&&t((0,s.go)({jwt:n})),e.length>=3&&t((0,s.ic)({jwt:n,searchKey:e})),q.current.value=""}),500),U=()=>{A(!1),k(),N()},M=function(e,n){let a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];O(!0),a&&(D(!0),_(n),t((0,s.Hd)(e)))};let W=[];for(let a=1;a<=B.pagination_AllData.totalpages;a++)W.push((0,f.jsx)(l.Z.Item,{active:a===B.pagination_AllData.currentpage,onClick:()=>J(a),children:a},a));let z=[];for(let a=1;a<=B.pagination_Deleted_AllData.totalpages;a++)z.push((0,f.jsx)(l.Z.Item,{active:a===B.pagination_Deleted_AllData.currentpage,onClick:()=>J(a),children:a},"deleted-"+a));const J=e=>B.isSearch&&!b?t((0,s.ic)({jwt:n,pageno:e,searchKey:V.current.value})):B.isfilter&&!b?t((0,s.q5)({jwt:n,pageno:e,id:B.filter})):t((0,s.go)({jwt:n,pageno:e,param:B.sorting_on.field,x:B.sorting_on.sort,type:b?"deleted":"available"}));return(0,f.jsxs)("div",{className:"page-section p-4",children:[(0,f.jsxs)("div",{className:"employees chart",children:[(0,f.jsxs)("div",{className:"d-md-flex d-block justify-content-between align-items-center",children:[(0,f.jsx)("h4",{className:"",children:"Announcements"}),(0,f.jsx)(i.Z,{variant:"danger",onClick:M,children:"+ Add New"})]}),(0,f.jsxs)("div",{className:"row align-items-center justify-content-between mt-4",children:[(0,f.jsx)("div",{className:"col-lg-3 col-12",children:(0,f.jsxs)(o.Z.Select,{ref:q,onChange:e=>(e=>{e.target.value?t((0,s.q5)({id:e.target.value,jwt:n})):t((0,s.go)({jwt:n}))})(e),"aria-label":"Default select example",children:[(0,f.jsx)("option",{value:"",children:"Departments"}),B.headAllData.length>0?B.headAllData.map(((e,t)=>{const{departments:n}=e;return(0,f.jsx)("optgroup",{label:e.name,children:n.length>0?n.map(((e,t)=>(0,f.jsx)("option",{value:e.id,children:e.name},t))):""},"opt-".concat(t))})):""]})}),(0,f.jsx)("div",{className:"col-lg-3 col-12",children:(0,f.jsx)(d.Z,{className:"me-3 my-lg-0 my-3",children:(0,f.jsx)(o.Z.Control,{placeholder:"Search....",onChange:H,ref:V,"aria-label":"Recipient's username","aria-describedby":"basic-addon2"})})}),(0,f.jsxs)(c.Z,{onSelect:e=>{E("available"!==e)},defaultActiveKey:"available",id:"uncontrolled-tab-example",className:"my-3 ms-2",children:[(0,f.jsxs)(x.Z,{eventKey:"available",title:"Available",children:[(0,f.jsx)("div",{className:"responsive mt-4",children:(0,f.jsxs)(h.Z,{striped:!0,bordered:!0,hover:!0,children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{className:"text-white",children:"S.No."}),(0,f.jsxs)("th",{className:"text-white",onClick:()=>G("title"),children:["Title","title"===B.sorting_on.field?B.sorting_on.sort?(0,f.jsx)("span",{className:"text-white",children:(0,f.jsx)(j.KKI,{})}):(0,f.jsx)("span",{style:{color:"#fff",position:"relative",right:"0"},children:(0,f.jsx)(j.mLR,{})}):(0,f.jsx)(f.Fragment,{})]}),(0,f.jsx)("th",{className:"text-white",children:"Department"}),(0,f.jsx)("th",{className:"text-white",children:"Description"}),(0,f.jsxs)("th",{className:"text-white",onClick:()=>G("start_date"),children:["Start\u2800Date","start_date"===B.sorting_on.field?B.sorting_on.sort?(0,f.jsx)("span",{className:"text-white",children:(0,f.jsx)(j.KKI,{})}):(0,f.jsx)("span",{style:{color:"#fff",position:"relative",right:"0"},children:(0,f.jsx)(j.mLR,{})}):(0,f.jsx)(f.Fragment,{})]}),(0,f.jsxs)("th",{className:"text-white",onClick:()=>G("end_date"),children:["End\u2800Date","end_date"===B.sorting_on.field?B.sorting_on.sort?(0,f.jsx)("span",{className:"text-white",children:(0,f.jsx)(j.KKI,{})}):(0,f.jsx)("span",{style:{color:"#fff",position:"relative",right:"0"},children:(0,f.jsx)(j.mLR,{})}):(0,f.jsx)(f.Fragment,{})]}),(0,f.jsx)("th",{className:"text-white",children:"Action"})]})}),(0,f.jsx)("tbody",{children:B.isLoading?(0,f.jsx)("tr",{className:"text-center",children:(0,f.jsx)("td",{colSpan:8,children:"Loading..."})},0):B.allData.length>0?B.allData.map(((e,t)=>(0,f.jsxs)("tr",{children:[(0,f.jsx)("td",{children:10*(B.pagination_AllData.currentpage-1)+(t+1)}),(0,f.jsx)("td",{children:(0,f.jsx)(g.Z,{text:e.title})}),(0,f.jsx)("td",{children:(0,f.jsx)(g.Z,{text:e.department?e.department.name:"All"})}),(0,f.jsx)("td",{children:(0,f.jsx)(v.Z,{text:e.description,limit:50})}),(0,f.jsx)("td",{children:e.start_date.slice(0,10)}),(0,f.jsx)("td",{children:e.end_date.slice(0,10)}),(0,f.jsxs)("td",{className:"d-lg-block d-flex align-items-center",children:[!e.is_deleted&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(i.Z,{onClick:()=>{M(e._id,t,!0)},className:"btn btn-warning text-white",children:"Edit"}),(0,f.jsx)(i.Z,{variant:"danger",className:"ms-2",onClick:()=>{((e,t)=>{A(!0),k(t),N(e)})(e._id,e.file_path)},children:"Delete"})]}),e.file_link?(0,f.jsx)("a",{href:e.file_link,className:"ms-2 btn btn-success text-white",target:"_blank",rel:"noreferrer",children:"View"}):(0,f.jsx)(f.Fragment,{})]})]},t))):(0,f.jsx)("tr",{children:(0,f.jsx)("td",{colSpan:8,className:"text-center",children:"No Data Found"})},0)})]})}),(0,f.jsxs)(l.Z,{children:[" ",W]})]}),(0,f.jsxs)(x.Z,{eventKey:"deleted",title:"Deleted",children:[(0,f.jsx)("div",{className:"responsive mt-4",children:(0,f.jsxs)(h.Z,{striped:!0,bordered:!0,hover:!0,children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{className:"text-white",children:"S.No."}),(0,f.jsx)("th",{className:"text-white",children:"Title"}),(0,f.jsx)("th",{className:"text-white",children:"Department"}),(0,f.jsx)("th",{className:"text-white",children:"Description"}),(0,f.jsx)("th",{className:"text-white",children:"Start Date"}),(0,f.jsx)("th",{className:"text-white",children:"End Date"}),(0,f.jsx)("th",{className:"text-white",children:"Action"})]})}),(0,f.jsx)("tbody",{children:B.isLoading?(0,f.jsx)("tr",{className:"text-center",children:(0,f.jsx)("td",{colSpan:7,children:"Loading..."})},0):B.deleted_allData.length>0?B.deleted_allData.map(((e,t)=>(0,f.jsxs)("tr",{children:[(0,f.jsx)("td",{children:10*(B.pagination_Deleted_AllData.currentpage-1)+(t+1)}),(0,f.jsx)("td",{children:(0,f.jsx)(g.Z,{text:e.title})}),(0,f.jsx)("td",{children:(0,f.jsx)(g.Z,{text:e.department?e.department.name:"All"})}),(0,f.jsx)("td",{children:(0,f.jsx)(v.Z,{text:e.description,limit:50})}),(0,f.jsx)("td",{children:e.start_date.slice(0,10)}),(0,f.jsx)("td",{children:e.end_date.slice(0,10)}),(0,f.jsx)("td",{children:e.file_link?(0,f.jsx)("a",{href:e.file_link,className:"ms-2 btn btn-success text-white",target:"_blank",rel:"noreferrer",children:"View"}):(0,f.jsx)(f.Fragment,{})})]},t))):(0,f.jsx)("tr",{children:(0,f.jsx)("td",{colSpan:7,className:"text-center",children:"No Data Found"})},0)})]})}),(0,f.jsxs)(l.Z,{children:[" ",z]})]})]})]})]}),(0,f.jsxs)(m.Z,{show:S,onHide:()=>{O(!1),D(!1),t((0,s.e2)())},children:[(0,f.jsx)(m.Z.Header,{closeButton:!0,children:(0,f.jsx)(m.Z.Title,{children:w?"Edit Announcement":"Add New Announcement"})}),(0,f.jsx)(m.Z.Body,{children:(0,f.jsxs)(o.Z,{onSubmit:e=>{e.preventDefault(),t(w?(0,s.Vs)({jwt:n,id:B.singledata[0]._id,index:y,old_file_path:B.singledata[0].file_path,old_file_link:B.singledata[0].file_link,title:I.current.value,department:T.current.value,description:L.current.value,start_date:R.current.value,end_date:F.current.value,file:P.current.files[0]}):(0,s.xK)({jwt:n,title:I.current.value,department:T.current.value,description:L.current.value,start_date:R.current.value,end_date:F.current.value,file:P.current.files[0],total:B.allData.length}))},children:[(0,f.jsxs)(o.Z.Group,{className:"my-3",controlId:"exampleForm.ControlInput1",children:[(0,f.jsxs)(o.Z.Label,{children:["Title",(0,f.jsx)("span",{className:"text-danger",children:"*"})," "]}),(0,f.jsx)(o.Z.Control,{type:"text",ref:I,required:!0,defaultValue:B.singledata.length>0?B.singledata[0].title:"",placeholder:"Title"}),(0,f.jsx)("span",{className:"text-danger",children:B.isError&&B.errors.length>0?B.errors.map((e=>"title"===e.param?(0,f.jsx)(g.Z,{text:e.msg},"err-1"):"")):""})]}),(0,f.jsxs)(o.Z.Label,{children:["Department ",(0,f.jsx)("span",{className:"text-danger",children:"*"})]}),(0,f.jsxs)(o.Z.Select,{"aria-label":"Default select example",className:"form-control",defaultValue:B.singledata.length>0&&B.singledata[0].department?B.singledata[0].department._id:"all",ref:T,children:[(0,f.jsx)("option",{value:"",children:"Select"}),(0,f.jsx)("option",{value:"all",children:"All"}),B.headAllData.length>0?B.headAllData.map(((e,t)=>{const{departments:n}=e;return(0,f.jsx)("optgroup",{label:e.name,children:n.length>0?n.map(((e,t)=>(0,f.jsx)("option",{value:e.id,children:e.name},t))):""},"opt-".concat(t))})):""]}),(0,f.jsxs)(o.Z.Group,{className:"mb-0",controlId:"exampleForm.ControlTextarea1",children:[(0,f.jsxs)(o.Z.Label,{children:["Description ",(0,f.jsx)("span",{className:"text-danger",children:"*"})]}),(0,f.jsx)(o.Z.Control,{as:"textarea",defaultValue:B.singledata.length>0?B.singledata[0].description:"",ref:L,required:!0,rows:3,placeholder:"Description"}),(0,f.jsx)("span",{className:"text-danger",children:B.isError&&B.errors.length>0?B.errors.map((e=>"description"===e.param?(0,f.jsx)(g.Z,{text:e.msg},"err-2"):"")):""})]}),(0,f.jsxs)(o.Z.Group,{className:"mb-0",controlId:"exampleForm.ControlTextarea1",children:[(0,f.jsxs)(o.Z.Label,{children:["Start Date ",(0,f.jsx)("span",{className:"text-danger",children:"*"})]}),(0,f.jsx)(o.Z.Control,{type:"date",defaultValue:B.singledata.length>0?B.singledata[0].start_date.substring(0,10):"",ref:R,required:!0,rows:3,placeholder:"Start date"}),(0,f.jsx)("span",{className:"text-danger",children:B.isError&&B.errors.length>0?B.errors.map((e=>"start_date"===e.param?(0,f.jsx)(g.Z,{text:e.msg},"err-3"):"")):""})]}),(0,f.jsxs)(o.Z.Group,{className:"mb-0",controlId:"exampleForm.ControlTextarea1",children:[(0,f.jsxs)(o.Z.Label,{children:["End Date ",(0,f.jsx)("span",{className:"text-danger",children:"*"})]}),(0,f.jsx)(o.Z.Control,{type:"date",defaultValue:B.singledata.length>0?B.singledata[0].end_date.substring(0,10):"",ref:F,required:!0,rows:3,placeholder:"End date"}),(0,f.jsx)("span",{className:"text-danger",children:B.isError&&B.errors.length>0?B.errors.map((e=>"end_date"===e.param?(0,f.jsx)(g.Z,{text:e.msg},"err-3"):"")):""})]}),(0,f.jsxs)(o.Z.Group,{controlId:"formFile",className:"mt-3",children:[(0,f.jsxs)(o.Z.Label,{children:["Attachment"," ",(0,f.jsxs)("span",{className:"text-danger",children:[!w&&"*"," (only image/pdf)"]})]}),(0,f.jsx)(o.Z.Control,{ref:P,type:"file",accept:".pdf,.jpg,.jpeg|image/*|application/pdf"}),(0,f.jsx)("span",{className:"text-danger",children:B.isError&&B.errors.length>0?B.errors.map((e=>"file"===e.param?(0,f.jsx)(g.Z,{text:e.msg},"err-4"):"")):""})]}),B.isSubmitting?(0,f.jsxs)(i.Z,{variant:"primary",className:"mt-4",children:[(0,f.jsx)(u.Z,{as:"span",animation:"grow",size:"sm",role:"status","aria-hidden":"true"}),"\u2800",w?"Update":"Save"]}):(0,f.jsx)(i.Z,{type:"submit",variant:"danger",className:"mt-4",children:w?"Update":"Save"})]})})]}),(0,f.jsxs)(m.Z,{show:C,onHide:U,children:[(0,f.jsx)(m.Z.Header,{closeButton:!0,children:(0,f.jsx)(m.Z.Title,{children:"Delete"})}),(0,f.jsx)(m.Z.Body,{children:"Do you really want to delete?"}),(0,f.jsxs)(m.Z.Footer,{children:[(0,f.jsx)(i.Z,{variant:"danger",onClick:()=>{U(),t((0,s.JS)({jwt:n,id:Z,fileName:K,pageno:1===B.allData.length&&B.pagination_AllData.currentpage>1?Number(B.pagination_AllData.currentpage)-1:B.pagination_AllData.currentpage}))},children:"Yes"}),(0,f.jsx)(i.Z,{variant:"primary",onClick:U,children:"No"})]})]})]})}},1462:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(2791),r=n(184);const s=function(e){const t=e.text,n=e.limit,[s,l]=(0,a.useState)(!1);return(0,r.jsx)(r.Fragment,{children:t?(0,r.jsxs)(r.Fragment,{children:[s?t:t.substr(0,e.limit),t.length>n&&(0,r.jsx)("button",{onClick:()=>l(!s),children:s?"...Read Less":"...Read More"})]}):(0,r.jsx)(r.Fragment,{})})}},551:(e,t,n)=>{n.d(t,{W:()=>h,Z:()=>u});var a=n(2791),r=n(165),s=n(8633),l=n(5666),i=n(184);const o=["active","eventKey","mountOnEnter","transition","unmountOnExit","role","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],d=["activeKey","getControlledId","getControllerId"],c=["as"];function x(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}function h(e){let{active:t,eventKey:n,mountOnEnter:l,transition:i,unmountOnExit:c,role:h="tabpanel",onEnter:m,onEntering:u,onEntered:j,onExit:p,onExiting:g,onExited:v}=e,f=x(e,o);const b=(0,a.useContext)(r.Z);if(!b)return[Object.assign({},f,{role:h}),{eventKey:n,isActive:t,mountOnEnter:l,transition:i,unmountOnExit:c,onEnter:m,onEntering:u,onEntered:j,onExit:p,onExiting:g,onExited:v}];const{activeKey:E,getControlledId:Z,getControllerId:N}=b,y=x(b,d),_=(0,s.h)(n);return[Object.assign({},f,{role:h,id:Z(n),"aria-labelledby":N(n)}),{eventKey:n,isActive:null==t&&null!=_?(0,s.h)(E)===_:t,transition:i||y.transition,mountOnEnter:null!=l?l:y.mountOnEnter,unmountOnExit:null!=c?c:y.unmountOnExit,onEnter:m,onEntering:u,onEntered:j,onExit:p,onExiting:g,onExited:v}]}const m=a.forwardRef(((e,t)=>{let{as:n="div"}=e,a=x(e,c);const[o,{isActive:d,onEnter:m,onEntering:u,onEntered:j,onExit:p,onExiting:g,onExited:v,mountOnEnter:f,unmountOnExit:b,transition:E=l.Z}]=h(a);return(0,i.jsx)(r.Z.Provider,{value:null,children:(0,i.jsx)(s.Z.Provider,{value:null,children:(0,i.jsx)(E,{in:d,onEnter:m,onEntering:u,onEntered:j,onExit:p,onExiting:g,onExited:v,mountOnEnter:f,unmountOnExit:b,children:(0,i.jsx)(n,Object.assign({},o,{ref:t,hidden:!d,"aria-hidden":!d}))})})})}));m.displayName="TabPanel";const u=m},5561:(e,t,n)=>{n.d(t,{Z:()=>x});var a=n(2791),r=n(3722),s=n(9181),l=n(165),i=n(8633),o=n(551),d=n(184);const c=e=>{const{id:t,generateChildId:n,onSelect:o,activeKey:c,defaultActiveKey:x,transition:h,mountOnEnter:m,unmountOnExit:u,children:j}=e,[p,g]=(0,r.$c)(c,x,o),v=(0,s.gP)(t),f=(0,a.useMemo)((()=>n||((e,t)=>v?"".concat(v,"-").concat(t,"-").concat(e):null)),[v,n]),b=(0,a.useMemo)((()=>({onSelect:g,activeKey:p,transition:h,mountOnEnter:m||!1,unmountOnExit:u||!1,getControlledId:e=>f(e,"tabpane"),getControllerId:e=>f(e,"tab")})),[g,p,h,m,u,f]);return(0,d.jsx)(l.Z.Provider,{value:b,children:(0,d.jsx)(i.Z.Provider,{value:g||null,children:j})})};c.Panel=o.Z;const x=c},1734:(e,t,n)=>{n.d(t,{Z:()=>u});var a=n(2007),r=n.n(a),s=(n(2791),n(5561)),l=n(3507),i=n(184);const o=e=>{let{transition:t,...n}=e;return(0,i.jsx)(s.Z,{...n,transition:(0,l.Z)(t)})};o.displayName="TabContainer";const d=o;var c=n(4886),x=n(4504);const h={eventKey:r().oneOfType([r().string,r().number]),title:r().node.isRequired,disabled:r().bool,tabClassName:r().string,tabAttrs:r().object},m=()=>{throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")};m.propTypes=h;const u=Object.assign(m,{Container:d,Content:c.Z,Pane:x.Z})},4886:(e,t,n)=>{n.d(t,{Z:()=>d});var a=n(2791),r=n(1418),s=n.n(r),l=n(162),i=n(184);const o=a.forwardRef(((e,t)=>{let{className:n,bsPrefix:a,as:r="div",...o}=e;return a=(0,l.vE)(a,"tab-content"),(0,i.jsx)(r,{ref:t,className:s()(n,a),...o})}));o.displayName="TabContent";const d=o},4504:(e,t,n)=>{n.d(t,{Z:()=>u});var a=n(1418),r=n.n(a),s=n(2791),l=n(8633),i=n(165),o=n(551),d=n(162),c=n(2709),x=n(3507),h=n(184);const m=s.forwardRef(((e,t)=>{let{bsPrefix:n,transition:a,...s}=e;const[{className:m,as:u="div",...j},{isActive:p,onEnter:g,onEntering:v,onEntered:f,onExit:b,onExiting:E,onExited:Z,mountOnEnter:N,unmountOnExit:y,transition:_=c.Z}]=(0,o.W)({...s,transition:(0,x.Z)(a)}),w=(0,d.vE)(n,"tab-pane");return(0,h.jsx)(i.Z.Provider,{value:null,children:(0,h.jsx)(l.Z.Provider,{value:null,children:(0,h.jsx)(_,{in:p,onEnter:g,onEntering:v,onEntered:f,onExit:b,onExiting:E,onExited:Z,mountOnEnter:N,unmountOnExit:y,children:(0,h.jsx)(u,{...j,ref:t,className:r()(m,w,p&&"active")})})})})}));m.displayName="TabPane";const u=m},9485:(e,t,n)=>{n.d(t,{Z:()=>p});n(2791);var a=n(239),r=n(5561),s=n(6387),l=n(9102),i=n(881),o=n(4886),d=n(4504),c=n(1701),x=n(3507),h=n(184);function m(e){let t;return(0,c.Ed)(e,(e=>{null==t&&(t=e.props.eventKey)})),t}function u(e){const{title:t,eventKey:n,disabled:a,tabClassName:r,tabAttrs:s,id:o}=e.props;return null==t?null:(0,h.jsx)(i.Z,{as:"li",role:"presentation",children:(0,h.jsx)(l.Z,{as:"button",type:"button",eventKey:n,disabled:a,id:o,className:r,...s,children:t})})}const j=e=>{const{id:t,onSelect:n,transition:l,mountOnEnter:i=!1,unmountOnExit:j=!1,variant:p="tabs",children:g,activeKey:v=m(g),...f}=(0,a.Ch)(e,{activeKey:"onSelect"});return(0,h.jsxs)(r.Z,{id:t,activeKey:v,onSelect:n,transition:(0,x.Z)(l),mountOnEnter:i,unmountOnExit:j,children:[(0,h.jsx)(s.Z,{...f,role:"tablist",as:"ul",variant:p,children:(0,c.UI)(g,u)}),(0,h.jsx)(o.Z,{children:(0,c.UI)(g,(e=>{const t={...e.props};return delete t.title,delete t.disabled,delete t.tabClassName,delete t.tabAttrs,(0,h.jsx)(d.Z,{...t})}))})]})};j.displayName="Tabs";const p=j},3507:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(5666),r=n(2709);function s(e){return"boolean"===typeof e?e?r.Z:a.Z:e}},594:()=>{}}]);
//# sourceMappingURL=838.11c0730c.chunk.js.map