"use strict";(self.webpackChunkhrm=self.webpackChunkhrm||[]).push([[12],{4012:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});var s=n(2791),a=n(7689),i=n(8116),r=n(9485),l=n(1734),d=n(2591),o=n(9434),c=n(7258),x=n(4608),m=n(8478),h=n(184);const u=function(e){const t=(0,o.I0)(),n=e.jwt,u=(0,a.TH)(),{active:j=!0}=(0,s.useMemo)((()=>u.state),[u]),[b,v]=(0,s.useState)(!0),[g,p]=(0,s.useState)(!1),E=(0,o.v9)((e=>e.employeeAbsentPresent));(0,s.useEffect)((()=>{t((0,c.g)({jwt:n}))}),[t,n,b]);let N=[];for(let s=1;s<=E.pagination_AllData.totalpages;s++)N.push((0,h.jsx)(i.Z.Item,{active:s===E.pagination_AllData.currentpage,onClick:()=>y(s),children:s},s));let Z=[];for(let s=1;s<=E.pagination_absent_AllData.totalpages;s++)Z.push((0,h.jsx)(i.Z.Item,{active:s===E.pagination_absent_AllData.currentpage,onClick:()=>y(s),children:s},"absent-"+s));const y=e=>t((0,c.g)({jwt:n,pageno:e,type:g?"absent":"present"}));return(0,h.jsx)("div",{className:"page-section p-4",children:(0,h.jsxs)("div",{className:"employees chart mb-5",children:[(0,h.jsx)("div",{className:"d-flex justify-content-between",children:(0,h.jsxs)("h4",{className:"mb-0",children:[Date().toString().slice(8,10),"-",Date().toString().slice(4,7),"-",Date().toString().slice(11,16)]})}),(0,h.jsxs)(r.Z,{defaultActiveKey:j?"present":"absent",onSelect:e=>{p("present"!==e)},onClick:()=>v(!b),id:"uncontrolled-tab-example",className:"mb-3",children:[(0,h.jsx)(l.Z,{eventKey:"present",title:"Present",children:(0,h.jsxs)("div",{className:"responsive mt-4",children:[(0,h.jsxs)(d.Z,{striped:!0,bordered:!0,hover:!0,children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{className:"text-white",children:"S.No."}),(0,h.jsx)("th",{className:"text-white",children:"Name"}),(0,h.jsx)("th",{className:"text-white",children:"Designation"}),(0,h.jsx)("th",{className:"text-white",children:"Contact Number"}),(0,h.jsx)("th",{className:"text-white",children:"Gender"}),(0,h.jsx)("th",{className:"text-white",children:"Address"})]})}),(0,h.jsx)("tbody",{children:E.isLoading?(0,h.jsx)("tr",{className:"text-center",children:(0,h.jsx)("td",{colSpan:8,children:"Loading..."})},"loading"):E.allData.length>0?E.allData.map(((e,t)=>(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:10*(E.pagination_AllData.currentpage-1)+(t+1)}),(0,h.jsx)("td",{children:(0,h.jsxs)("div",{className:"d-flex",children:[(0,h.jsx)("img",{src:e.image_link?e.image_link:m,alt:"User",className:"img-fluid rounded-circle",style:{width:"40px",height:"40px"}}),(0,h.jsxs)("div",{className:"ms-3",children:[(0,h.jsx)("h6",{className:"mb-0 ",children:(0,h.jsx)(x.Z,{text:e.name})}),(0,h.jsx)("small",{className:"mb-0 text-muted",children:e.email})]})]})}),(0,h.jsx)("td",{children:(0,h.jsxs)("div",{className:"ms-3",children:[(0,h.jsx)("h6",{className:"mb-0 ",children:(0,h.jsx)(x.Z,{text:e.designation.name})}),(0,h.jsx)("small",{className:"mb-0 text-muted",children:(0,h.jsx)(x.Z,{text:e.designation.department.user_head?e.designation.department.user_head:"n/a"})})]})}),e.mobile_no&&e.alternate_mobile_no?(0,h.jsxs)("td",{children:[e.mobile_no,", ",e.alternate_mobile_no]}):(0,h.jsx)("td",{children:e.mobile_no}),(0,h.jsx)("td",{children:"F"===e.gender?"Female":"M"===e.gender?"Male":"Other"}),(0,h.jsx)("td",{children:(0,h.jsxs)("address",{children:[(0,h.jsx)(x.Z,{text:e.current_address.address}),",",(0,h.jsx)("br",{}),(0,h.jsx)(x.Z,{text:e.current_address.state}),",",(0,h.jsx)("br",{}),(0,h.jsx)(x.Z,{text:e.current_address.country}),",",(0,h.jsx)(x.Z,{text:e.current_address.pincode})]})})]},t))):(0,h.jsx)("tr",{children:(0,h.jsx)("td",{colSpan:8,className:"text-center",children:"No Data Found"})},-1)})]}),(0,h.jsxs)(i.Z,{children:[" ",N]})]})}),(0,h.jsx)(l.Z,{eventKey:"absent",title:"Absent",children:(0,h.jsxs)("div",{className:"responsive mt-4",children:[(0,h.jsxs)(d.Z,{striped:!0,bordered:!0,hover:!0,children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{className:"text-white",children:"S.No."}),(0,h.jsx)("th",{className:"text-white",children:"Name"}),(0,h.jsx)("th",{className:"text-white",children:"Designation(Department)"}),(0,h.jsx)("th",{className:"text-white",children:"Contact Number"}),(0,h.jsx)("th",{className:"text-white",children:"Gender"}),(0,h.jsx)("th",{className:"text-white",children:"Address"})]})}),(0,h.jsx)("tbody",{children:E.isLoading?(0,h.jsx)("tr",{className:"text-center",children:(0,h.jsx)("td",{colSpan:8,children:"Loading..."})},"loading"):E.absent_allData.length>0?E.absent_allData.map(((e,t)=>{var n;return(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:10*(E.pagination_absent_AllData.currentpage-1)+(t+1)}),(0,h.jsx)("td",{children:(0,h.jsxs)("div",{className:"d-flex",children:[(0,h.jsx)("img",{src:e.image_link?e.image_link:m,alt:"User",className:"img-fluid rounded-circle",style:{width:"40px",height:"40px"}}),(0,h.jsxs)("div",{className:"ms-3",children:[(0,h.jsx)("h6",{className:"mb-0 ",children:(0,h.jsx)(x.Z,{text:e.name})}),(0,h.jsx)("small",{className:"mb-0 text-muted",children:e.email})]})]})}),(0,h.jsx)("td",{children:(0,h.jsxs)("div",{className:"ms-3",children:[(0,h.jsx)("h6",{className:"mb-0 ",children:(0,h.jsx)(x.Z,{text:e.designation.name})}),(0,h.jsx)("small",{className:"mb-0 text-muted",children:(0,h.jsx)(x.Z,{text:null!==(n=e.designation.department)&&void 0!==n&&n.user_head?e.designation.department.user_head:"n/a"})})]})}),e.mobile_no&&e.alternate_mobile_no?(0,h.jsxs)("td",{children:[e.mobile_no,", ",e.alternate_mobile_no]}):(0,h.jsx)("td",{children:e.mobile_no}),(0,h.jsx)("td",{children:"F"===e.gender?"Female":"M"===e.gender?"Male":"Other"}),(0,h.jsx)("td",{children:(0,h.jsxs)("address",{children:[(0,h.jsx)(x.Z,{text:e.current_address.address}),",",(0,h.jsx)("br",{}),(0,h.jsx)(x.Z,{text:e.current_address.state}),",",(0,h.jsx)("br",{}),(0,h.jsx)(x.Z,{text:e.current_address.country}),",",(0,h.jsx)(x.Z,{text:e.current_address.pincode})]})})]},t)})):(0,h.jsx)("tr",{children:(0,h.jsx)("td",{colSpan:8,className:"text-center",children:"No Data Found"})},-1)})]}),(0,h.jsxs)(i.Z,{children:[" ",Z]})]})})]})]})})}},551:(e,t,n)=>{n.d(t,{W:()=>m,Z:()=>u});var s=n(2791),a=n(165),i=n(8633),r=n(5666),l=n(184);const d=["active","eventKey","mountOnEnter","transition","unmountOnExit","role","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],o=["activeKey","getControlledId","getControllerId"],c=["as"];function x(e,t){if(null==e)return{};var n,s,a={},i=Object.keys(e);for(s=0;s<i.length;s++)n=i[s],t.indexOf(n)>=0||(a[n]=e[n]);return a}function m(e){let{active:t,eventKey:n,mountOnEnter:r,transition:l,unmountOnExit:c,role:m="tabpanel",onEnter:h,onEntering:u,onEntered:j,onExit:b,onExiting:v,onExited:g}=e,p=x(e,d);const E=(0,s.useContext)(a.Z);if(!E)return[Object.assign({},p,{role:m}),{eventKey:n,isActive:t,mountOnEnter:r,transition:l,unmountOnExit:c,onEnter:h,onEntering:u,onEntered:j,onExit:b,onExiting:v,onExited:g}];const{activeKey:N,getControlledId:Z,getControllerId:y}=E,f=x(E,o),_=(0,i.h)(n);return[Object.assign({},p,{role:m,id:Z(n),"aria-labelledby":y(n)}),{eventKey:n,isActive:null==t&&null!=_?(0,i.h)(N)===_:t,transition:l||f.transition,mountOnEnter:null!=r?r:f.mountOnEnter,unmountOnExit:null!=c?c:f.unmountOnExit,onEnter:h,onEntering:u,onEntered:j,onExit:b,onExiting:v,onExited:g}]}const h=s.forwardRef(((e,t)=>{let{as:n="div"}=e,s=x(e,c);const[d,{isActive:o,onEnter:h,onEntering:u,onEntered:j,onExit:b,onExiting:v,onExited:g,mountOnEnter:p,unmountOnExit:E,transition:N=r.Z}]=m(s);return(0,l.jsx)(a.Z.Provider,{value:null,children:(0,l.jsx)(i.Z.Provider,{value:null,children:(0,l.jsx)(N,{in:o,onEnter:h,onEntering:u,onEntered:j,onExit:b,onExiting:v,onExited:g,mountOnEnter:p,unmountOnExit:E,children:(0,l.jsx)(n,Object.assign({},d,{ref:t,hidden:!o,"aria-hidden":!o}))})})})}));h.displayName="TabPanel";const u=h},5561:(e,t,n)=>{n.d(t,{Z:()=>x});var s=n(2791),a=n(3722),i=n(9181),r=n(165),l=n(8633),d=n(551),o=n(184);const c=e=>{const{id:t,generateChildId:n,onSelect:d,activeKey:c,defaultActiveKey:x,transition:m,mountOnEnter:h,unmountOnExit:u,children:j}=e,[b,v]=(0,a.$c)(c,x,d),g=(0,i.gP)(t),p=(0,s.useMemo)((()=>n||((e,t)=>g?"".concat(g,"-").concat(t,"-").concat(e):null)),[g,n]),E=(0,s.useMemo)((()=>({onSelect:v,activeKey:b,transition:m,mountOnEnter:h||!1,unmountOnExit:u||!1,getControlledId:e=>p(e,"tabpane"),getControllerId:e=>p(e,"tab")})),[v,b,m,h,u,p]);return(0,o.jsx)(r.Z.Provider,{value:E,children:(0,o.jsx)(l.Z.Provider,{value:v||null,children:j})})};c.Panel=d.Z;const x=c},8116:(e,t,n)=>{n.d(t,{Z:()=>g});var s=n(1418),a=n.n(s),i=n(2791),r=n(162),l=n(6445),d=n(184);const o=i.forwardRef(((e,t)=>{let{active:n=!1,disabled:s=!1,className:i,style:r,activeLabel:o="(current)",children:c,linkStyle:x,linkClassName:m,as:h=l.Z,...u}=e;const j=n||s?"span":h;return(0,d.jsx)("li",{ref:t,style:r,className:a()(i,"page-item",{active:n,disabled:s}),children:(0,d.jsxs)(j,{className:a()("page-link",m),style:x,...u,children:[c,n&&o&&(0,d.jsx)("span",{className:"visually-hidden",children:o})]})})}));o.displayName="PageItem";const c=o;function x(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e;const s=i.forwardRef(((e,s)=>{let{children:a,...i}=e;return(0,d.jsxs)(o,{...i,ref:s,children:[(0,d.jsx)("span",{"aria-hidden":"true",children:a||t}),(0,d.jsx)("span",{className:"visually-hidden",children:n})]})}));return s.displayName=e,s}const m=x("First","\xab"),h=x("Prev","\u2039","Previous"),u=x("Ellipsis","\u2026","More"),j=x("Next","\u203a"),b=x("Last","\xbb"),v=i.forwardRef(((e,t)=>{let{bsPrefix:n,className:s,size:i,...l}=e;const o=(0,r.vE)(n,"pagination");return(0,d.jsx)("ul",{ref:t,...l,className:a()(s,o,i&&"".concat(o,"-").concat(i))})}));v.displayName="Pagination";const g=Object.assign(v,{First:m,Prev:h,Ellipsis:u,Item:c,Next:j,Last:b})},1734:(e,t,n)=>{n.d(t,{Z:()=>u});var s=n(2007),a=n.n(s),i=(n(2791),n(5561)),r=n(3507),l=n(184);const d=e=>{let{transition:t,...n}=e;return(0,l.jsx)(i.Z,{...n,transition:(0,r.Z)(t)})};d.displayName="TabContainer";const o=d;var c=n(4886),x=n(4504);const m={eventKey:a().oneOfType([a().string,a().number]),title:a().node.isRequired,disabled:a().bool,tabClassName:a().string,tabAttrs:a().object},h=()=>{throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")};h.propTypes=m;const u=Object.assign(h,{Container:o,Content:c.Z,Pane:x.Z})},4886:(e,t,n)=>{n.d(t,{Z:()=>o});var s=n(2791),a=n(1418),i=n.n(a),r=n(162),l=n(184);const d=s.forwardRef(((e,t)=>{let{className:n,bsPrefix:s,as:a="div",...d}=e;return s=(0,r.vE)(s,"tab-content"),(0,l.jsx)(a,{ref:t,className:i()(n,s),...d})}));d.displayName="TabContent";const o=d},4504:(e,t,n)=>{n.d(t,{Z:()=>u});var s=n(1418),a=n.n(s),i=n(2791),r=n(8633),l=n(165),d=n(551),o=n(162),c=n(2709),x=n(3507),m=n(184);const h=i.forwardRef(((e,t)=>{let{bsPrefix:n,transition:s,...i}=e;const[{className:h,as:u="div",...j},{isActive:b,onEnter:v,onEntering:g,onEntered:p,onExit:E,onExiting:N,onExited:Z,mountOnEnter:y,unmountOnExit:f,transition:_=c.Z}]=(0,d.W)({...i,transition:(0,x.Z)(s)}),O=(0,o.vE)(n,"tab-pane");return(0,m.jsx)(l.Z.Provider,{value:null,children:(0,m.jsx)(r.Z.Provider,{value:null,children:(0,m.jsx)(_,{in:b,onEnter:v,onEntering:g,onEntered:p,onExit:E,onExiting:N,onExited:Z,mountOnEnter:y,unmountOnExit:f,children:(0,m.jsx)(u,{...j,ref:t,className:a()(h,O,b&&"active")})})})})}));h.displayName="TabPane";const u=h},9485:(e,t,n)=>{n.d(t,{Z:()=>b});n(2791);var s=n(239),a=n(5561),i=n(6387),r=n(9102),l=n(881),d=n(4886),o=n(4504),c=n(1701),x=n(3507),m=n(184);function h(e){let t;return(0,c.Ed)(e,(e=>{null==t&&(t=e.props.eventKey)})),t}function u(e){const{title:t,eventKey:n,disabled:s,tabClassName:a,tabAttrs:i,id:d}=e.props;return null==t?null:(0,m.jsx)(l.Z,{as:"li",role:"presentation",children:(0,m.jsx)(r.Z,{as:"button",type:"button",eventKey:n,disabled:s,id:d,className:a,...i,children:t})})}const j=e=>{const{id:t,onSelect:n,transition:r,mountOnEnter:l=!1,unmountOnExit:j=!1,variant:b="tabs",children:v,activeKey:g=h(v),...p}=(0,s.Ch)(e,{activeKey:"onSelect"});return(0,m.jsxs)(a.Z,{id:t,activeKey:g,onSelect:n,transition:(0,x.Z)(r),mountOnEnter:l,unmountOnExit:j,children:[(0,m.jsx)(i.Z,{...p,role:"tablist",as:"ul",variant:b,children:(0,c.UI)(v,u)}),(0,m.jsx)(d.Z,{children:(0,c.UI)(v,(e=>{const t={...e.props};return delete t.title,delete t.disabled,delete t.tabClassName,delete t.tabAttrs,(0,m.jsx)(o.Z,{...t})}))})]})};j.displayName="Tabs";const b=j},3507:(e,t,n)=>{n.d(t,{Z:()=>i});var s=n(5666),a=n(2709);function i(e){return"boolean"===typeof e?e?a.Z:s.Z:e}}}]);
//# sourceMappingURL=12.1b6c5ab2.chunk.js.map