(this["webpackJsonpremote-stream-camera"]=this["webpackJsonpremote-stream-camera"]||[]).push([[0],{16:function(e,t,c){},17:function(e,t,c){},25:function(e,t){function c(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}c.keys=function(){return[]},c.resolve=c,e.exports=c,c.id=25},28:function(e,t,c){"use strict";c.r(t);var n=c(1),r=c.n(n),o=c(6),i=c.n(o),a=(c(16),c(2)),d=(c(17),c(29)),s=c(4),u=c.n(s),l=c(0);var j=function(){var e=Object(n.useState)(d.a),t=Object(a.a)(e,1)[0],c=u.a.resolve(window.location.href,u.a.format({query:{id:t,host:"true"}})),r=u.a.resolve(window.location.href,u.a.format({query:{id:t}}));return Object(l.jsxs)("div",{children:[Object(l.jsxs)("h1",{children:["remote-stream-camera (",Object(l.jsx)("a",{href:"https://github.com/PabloDons/remote-stream-camera",children:"github"}),")"]}),Object(l.jsxs)("table",{children:[Object(l.jsx)("thead",{children:Object(l.jsx)("tr",{children:Object(l.jsx)("td",{children:"URLs you need:"})})}),Object(l.jsxs)("tbody",{children:[Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"For"}),Object(l.jsx)("td",{children:"url"})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"Stream host"}),Object(l.jsx)("td",{children:Object(l.jsx)("a",{href:c,children:c})})]}),Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{children:"Stream guest"}),Object(l.jsx)("td",{children:Object(l.jsx)("a",{href:r,children:r})})]})]})]})]})},b=c(5),f=c.n(b),O=c(3),v=c.n(O),h=c(8),m=c.n(h),x=function(){var e=new v.a(window.location.href,!0).query,t=Object(n.useState)(),c=Object(a.a)(t,2),r=c[0],o=c[1],i=Object(n.useState)(),d=Object(a.a)(i,2),s=d[0],u=d[1],j=Object(n.useState)(!1),b=Object(a.a)(j,2),O=b[0],h=b[1],x=Object(n.useState)(),g=Object(a.a)(x,2),p=g[0],w=g[1],y=Object(n.useRef)(null);return Object(n.useEffect)((function(){if(!s||s.disconnected||s.destroyed){if(!s||s.destroyed){s&&s.destroy();var t=new f.a(e.id);return t.on("open",(function(e){h(!0),console.log("client ready with ID: ".concat(e))})),t.on("error",(function(){return h(!1)})),t.on("disconnected",(function(){return h(!1)})),t.on("call",(function(e){console.log("recieved call from ".concat(e.peer)),p&&p.close(),e.on("stream",(function(e){o(e)})),e.answer(),w(e)})),u(t),function(){s&&(s.destroy(),u(void 0)),h(!1)}}s.reconnect()}}),[O]),Object(n.useEffect)((function(){r&&(y.current.srcObject=r)}),[r]),Object(l.jsx)("div",{className:m.a.container,children:Object(l.jsx)("video",{className:m.a.stream,ref:y,autoPlay:!0})})},g=c(9);function p(e){console.log("navigator.MediaDevices.getUserMedia error: ",e.message,e.name)}var w=function(){var e,t,c,r=new v.a(window.location.href,!0).query,o=Object(n.useState)([]),i=Object(a.a)(o,2),d=i[0],s=i[1],u=Object(n.useState)(),j=Object(a.a)(u,2),b=j[0],O=j[1],h=Object(n.useState)(),m=Object(a.a)(h,2),x=m[0],w=m[1],y=Object(n.useState)(!1),S=Object(a.a)(y,2),E=S[0],I=S[1],D=Object(n.useRef)(null),k=Object(n.useRef)(null),C=Object(n.useRef)(null),M=Object(n.useRef)(null),F=Object(n.useState)(),N=Object(a.a)(F,2),P=N[0],R=N[1],q=Object(n.useState)(),U=Object(a.a)(q,2),_=U[0],B=U[1],L=Object(n.useState)(!1),T=Object(a.a)(L,2),A=T[0],J=T[1];return Object(n.useEffect)((function(){var e;R(null===(e=k.current)||void 0===e?void 0:e.value)}),[null===(e=k.current)||void 0===e?void 0:e.value]),Object(n.useEffect)((function(){var e;B(null===(e=M.current)||void 0===e?void 0:e.value)}),[null===(t=M.current)||void 0===t?void 0:t.value]),Object(n.useEffect)((function(){var e;J(null===(e=C.current)||void 0===e?void 0:e.checked)}),[null===(c=C.current)||void 0===c?void 0:c.checked]),Object(n.useEffect)((function(){navigator.mediaDevices.enumerateDevices().then((function(e){s(e)})).catch(p)}),[b]),Object(n.useEffect)((function(){if(!x||x.disconnected||x.destroyed){if(x&&!x.destroyed)return x.reconnect(),void I(!0);x&&(I(!1),x.destroy());var e=new f.a;return e.on("open",(function(e){I(!0),console.log("client ready with ID: ".concat(e))})),e.on("error",(function(e){console.error(e),I(!1)})),e.on("disconnected",(function(e){console.error(e),I(!1)})),w(e),function(){x&&(x.destroy(),w(void 0)),I(!1)}}}),[null===x||void 0===x?void 0:x.disconnected,null===x||void 0===x?void 0:x.destroyed]),Object(n.useEffect)((function(){if(void 0!==P){console.log(A);var e=Object(g.a)(Object(g.a)({},A&&{audio:{deviceId:_?{exact:_}:void 0}}),{},{video:{deviceId:P?{exact:P}:void 0}});navigator.mediaDevices.getUserMedia(e).then((function(e){O(e),D.current.srcObject=e})).catch(p)}}),[P,A]),Object(n.useEffect)((function(){if(E&&b){console.log("calling peerId ".concat(r.id));var e=x.call(r.id,b);return function(){e.close()}}}),[r.id,b,E,x]),Object(l.jsxs)("div",{children:[Object(l.jsxs)("h1",{children:["remote-stream-camera (",Object(l.jsx)("a",{href:"https://github.com/PabloDons/remote-stream-camera",children:"github"}),")"]}),Object(l.jsxs)("div",{id:"container",children:[Object(l.jsxs)("p",{children:[Object(l.jsx)("b",{children:"Note:"})," without permission, the browser will restrict the available devices to at most one per type."]}),Object(l.jsxs)("div",{className:"select",children:[Object(l.jsxs)("label",{children:["Video source: ",Object(l.jsx)("select",{ref:k,onChange:function(){var e;R(null===(e=k.current)||void 0===e?void 0:e.value)},children:d.filter((function(e){return"videoinput"===e.kind})).map((function(e,t){return Object(l.jsx)("option",{value:e.deviceId,children:e.label||"camera ".concat(t)},e.deviceId)}))})]}),Object(l.jsx)("br",{}),Object(l.jsx)("input",{ref:C,type:"checkbox",onChange:function(){var e;J(null===(e=C.current)||void 0===e?void 0:e.checked)}}),Object(l.jsxs)("label",{children:[" Audio source: ",Object(l.jsx)("select",{ref:M,onChange:function(){var e;B(null===(e=M.current)||void 0===e?void 0:e.value)},children:d.filter((function(e){return"audioinput"===e.kind})).map((function(e,t){return Object(l.jsx)("option",{value:e.deviceId,children:e.label||"microphone ".concat(t)},e.deviceId)}))})]})]})]}),Object(l.jsx)("video",{style:{width:"80vw"},ref:D,autoPlay:!0,muted:!0})]})},y=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,30)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,o=t.getLCP,i=t.getTTFB;c(e),n(e),r(e),o(e),i(e)}))},S=new v.a(window.location.href,!0).query;S.id?"true"===S.host?i.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(x,{})}),document.getElementById("root")):i.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(w,{})}),document.getElementById("root")):i.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(j,{})}),document.getElementById("root")),y()},8:function(e,t,c){e.exports={stream:"HostApp_stream__KfcOx"}}},[[28,1,2]]]);
//# sourceMappingURL=main.094f8c58.chunk.js.map