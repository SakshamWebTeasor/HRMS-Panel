"use strict";(self.webpackChunkhrm=self.webpackChunkhrm||[]).push([[658],{5658:function(e,t,a){a.r(t),a.d(t,{default:function(){return o}});var s=a(2791),n=a(9434),i=a(2889),r=a(2591),l=a(8116),c=a(1462),d=a(4608),h=a(184);var o=function(e){var t=(0,n.I0)(),a=e.jwt;(0,s.useEffect)((function(){t((0,i.g)({jwt:a}))}),[t,a]);for(var o=(0,n.v9)((function(e){return e.userHoliday})),x=[],u=function(e){x.push((0,h.jsx)(l.Z.Item,{active:e===o.currentpage,onClick:function(){return function(e){t((0,i.g)({jwt:a,pageno:e}))}(e)},children:e},e))},m=1;m<=o.totalpages;m++)u(m);return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("div",{className:"page-section p-4",children:(0,h.jsxs)("div",{className:"add-departmen chart",children:[(0,h.jsx)("div",{className:"d-flex justify-content-between align-items-center",children:(0,h.jsx)("h4",{className:"mb-0",children:"List All Holidays"})}),(0,h.jsx)("div",{className:"responsive mt-4",children:(0,h.jsxs)(r.Z,{striped:!0,bordered:!0,hover:!0,children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{className:"text-white",children:"S.No."}),(0,h.jsx)("th",{className:"text-white",children:" Name "}),(0,h.jsx)("th",{className:"text-white",children:"Description"}),(0,h.jsx)("th",{className:"text-white",children:"Date"}),(0,h.jsx)("th",{className:"text-white",children:"Total Days"})]})}),(0,h.jsx)("tbody",{children:o.isLoading?(0,h.jsx)("tr",{className:"text-center",children:(0,h.jsx)("td",{colSpan:8,children:"Loading..."})},0):o.allData.length>0?o.allData.map((function(e,t){return(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:t+1}),(0,h.jsx)("td",{children:(0,h.jsx)(d.Z,{text:e.name})}),(0,h.jsx)("td",{children:(0,h.jsx)(c.Z,{text:e.description,limit:60})}),(0,h.jsxs)("td",{children:[e.start_date?e.start_date.slice(0,10):"n/a"," To ",e.end_date?e.end_date.slice(0,10):"n/a"]}),(0,h.jsx)("td",{children:e.end_date&&e.start_date?(new Date(e.end_date).getTime()-new Date(e.start_date).getTime())/864e5+1:"n/a"})]},t)})):(0,h.jsx)("tr",{children:(0,h.jsx)("td",{colSpan:8,className:"text-center",children:"No Data Found"})},0)})]})}),(0,h.jsx)(l.Z,{children:x})]})})})}},1462:function(e,t,a){var s=a(9439),n=a(2791),i=a(184);t.Z=function(e){var t=e.text,a=e.limit,r=(0,n.useState)(!1),l=(0,s.Z)(r,2),c=l[0],d=l[1];return(0,i.jsx)(i.Fragment,{children:t?(0,i.jsxs)(i.Fragment,{children:[c?t:t.substr(0,e.limit),t.length>a&&(0,i.jsx)("button",{onClick:function(){return d(!c)},children:c?"...Read Less":"...Read More"})]}):(0,i.jsx)(i.Fragment,{})})}},8116:function(e,t,a){a.d(t,{Z:function(){return w}});var s=a(1413),n=a(5987),i=a(1694),r=a.n(i),l=a(2791),c=a(162),d=a(6445),h=a(184),o=["active","disabled","className","style","activeLabel","children","linkStyle","linkClassName"],x=["children"],u=l.forwardRef((function(e,t){var a=e.active,i=void 0!==a&&a,l=e.disabled,c=void 0!==l&&l,x=e.className,u=e.style,m=e.activeLabel,j=void 0===m?"(current)":m,f=e.children,v=e.linkStyle,N=e.linkClassName,p=(0,n.Z)(e,o),g=i||c?"span":d.Z;return(0,h.jsx)("li",{ref:t,style:u,className:r()(x,"page-item",{active:i,disabled:c}),children:(0,h.jsxs)(g,(0,s.Z)((0,s.Z)({className:r()("page-link",N),style:v},p),{},{children:[f,i&&j&&(0,h.jsx)("span",{className:"visually-hidden",children:j})]}))})}));u.displayName="PageItem";var m=u;function j(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e,i=l.forwardRef((function(e,i){var r=e.children,l=(0,n.Z)(e,x);return(0,h.jsxs)(u,(0,s.Z)((0,s.Z)({},l),{},{ref:i,children:[(0,h.jsx)("span",{"aria-hidden":"true",children:r||t}),(0,h.jsx)("span",{className:"visually-hidden",children:a})]}))}));return i.displayName=e,i}var f=j("First","\xab"),v=j("Prev","\u2039","Previous"),N=j("Ellipsis","\u2026","More"),p=j("Next","\u203a"),g=j("Last","\xbb"),Z=["bsPrefix","className","size"],b=l.forwardRef((function(e,t){var a=e.bsPrefix,i=e.className,l=e.size,d=(0,n.Z)(e,Z),o=(0,c.vE)(a,"pagination");return(0,h.jsx)("ul",(0,s.Z)((0,s.Z)({ref:t},d),{},{className:r()(i,o,l&&"".concat(o,"-").concat(l))}))}));b.displayName="Pagination";var w=Object.assign(b,{First:f,Prev:v,Ellipsis:N,Item:m,Next:p,Last:g})}}]);
//# sourceMappingURL=658.2a2892d0.chunk.js.map