"use strict";(self.webpackChunkmy_box=self.webpackChunkmy_box||[]).push([[53],{2865:function(e,n,t){t.d(n,{Z:function(){return l}});var r=t(2791),o=t(5794),a="ErrorModal_ModalAuthError__NoA5V",i="ErrorModal_modalBTN__kzYEi",c=t(184),l=function(e){var n="en"===(0,r.useContext)(o.A).language;return(0,c.jsxs)("div",{className:a,children:[(0,c.jsx)("h1",{children:n?"An error accured!":"\u0423\u043f\u0441... \u0412\u0456\u0434\u0431\u0443\u043b\u0430\u0441\u044f \u043f\u043e\u043c\u0438\u043b\u043a\u0430!"}),(0,c.jsx)("p",{children:e.error}),(0,c.jsx)("div",{className:i,id:"modalBtn",onClick:e.onClick,children:"OK"})]})}},1095:function(e,n,t){var r=t(2791),o=t(6547),a=t(4164),i=t(184),c=function(e){return(0,i.jsx)("div",{onClick:null===e||void 0===e?void 0:e.onClick,className:o.Z.backdrop})},l=function(e){return(0,i.jsx)("div",{className:o.Z.modal,children:(0,i.jsx)("div",{children:e.children})})},s=document.getElementById("overlays");n.Z=function(e){return(0,r.useEffect)((function(){var e=document.getElementById("modalBtn");null===e||void 0===e||e.focus()}),[]),(0,i.jsxs)(i.Fragment,{children:[a.createPortal((0,i.jsx)(c,{onClick:null===e||void 0===e?void 0:e.onClick}),s),a.createPortal((0,i.jsx)(l,{children:e.children}),s)]})}},1402:function(e,n,t){t.d(n,{Z:function(){return l}});var r=t(2791),o=t(5794),a="SuccessModal_ModalAuthError__1ws38",i="SuccessModal_modalBTN__40Yj6",c=t(184),l=function(e){var n="en"===(0,r.useContext)(o.A).language;return(0,c.jsxs)("div",{className:a,children:[(0,c.jsx)("h1",{children:n?"Success!":"\u0412\u0441\u0435 \u0434\u043e\u0431\u0440\u0435!"}),(0,c.jsx)("p",{children:e.text}),(0,c.jsx)("div",{className:i,id:"modalBtn",onClick:e.onClick,children:"OK"})]})}},2053:function(e,n,t){t.r(n),t.d(n,{default:function(){return y}});var r=t(4165),o=t(5861),a=t(9439),i=t(2791),c=t(7689),l=t(1095),s=t(1402),u=t(2865),d=t(1413),f=t(3433),m=t(8351),h=t(2737),g=0,v=(0,h.Z)((function(e){return m.DefaultLoadingManager.onStart=function(n,t,r){e({active:!0,item:n,loaded:t,total:r,progress:(t-g)/(r-g)*100})},m.DefaultLoadingManager.onLoad=function(){e({active:!1})},m.DefaultLoadingManager.onError=function(n){return e((function(e){return{errors:[].concat((0,f.Z)(e.errors),[n])}}))},m.DefaultLoadingManager.onProgress=function(n,t,r){t===r&&(g=r),e({active:!0,item:n,loaded:t,total:r,progress:(t-g)/(r-g)*100||100})},{errors:[],active:!1,progress:0,item:"",loaded:0,total:0}})),x=function(e){return"Loading ".concat(e.toFixed(2),"%")};function p(e){var n=e.containerStyles,t=e.innerStyles,r=e.barStyles,o=e.dataStyles,c=e.dataInterpolation,l=void 0===c?x:c,s=e.initialState,u=void 0===s?function(e){return e}:s,f=v(),m=f.active,h=f.progress,g=i.useRef(0),p=i.useRef(0),k=i.useRef(null),j=i.useState(u(m)),Z=(0,a.Z)(j,2),b=Z[0],w=Z[1];i.useEffect((function(){var e;return m!==b&&(e=setTimeout((function(){return w(m)}),300)),function(){return clearTimeout(e)}}),[b,m]);var E=i.useCallback((function(){k.current&&(g.current+=(h-g.current)/2,(g.current>.95*h||100===h)&&(g.current=h),k.current.innerText=l(g.current),g.current<h&&(p.current=requestAnimationFrame(E)))}),[l,h]);return i.useEffect((function(){return E(),function(){return cancelAnimationFrame(p.current)}}),[E]),b?i.createElement("div",{style:(0,d.Z)((0,d.Z)({},_.container),{},{opacity:m?1:0},n)},i.createElement("div",null,i.createElement("div",{style:(0,d.Z)((0,d.Z)({},_.inner),t)},i.createElement("div",{style:(0,d.Z)((0,d.Z)({},_.bar),{},{transform:"scaleX(".concat(h/100,")")},r)}),i.createElement("span",{ref:k,style:(0,d.Z)((0,d.Z)({},_.data),o)})))):null}var _={container:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"#171717",display:"flex",alignItems:"center",justifyContent:"center",transition:"opacity 300ms ease",zIndex:1e3},inner:{width:100,height:3,background:"#272727",textAlign:"center"},bar:{height:3,width:"100%",background:"white",transition:"transform 200ms",transformOrigin:"left center"},data:{display:"inline-block",position:"relative",fontVariantNumeric:"tabular-nums",marginTop:"0.8em",color:"#f0f0f0",fontSize:"0.6em",fontFamily:'-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Helvetica Neue", Helvetica, Arial, Roboto, Ubuntu, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',whiteSpace:"nowrap"}},k=t(1224),j=t(5794),Z="Countdown_Countdown__nB9Xg",b=t(1087),w=t(184),E=function(e){return(0,w.jsxs)("div",{className:Z,children:[(0,w.jsx)("p",{children:e.isEnglish?"You will be redirected to the main page in ".concat(e.countdown," seconds"):"\u0412\u0438 \u0431\u0443\u0434\u0435\u0442\u0435 \u043f\u0435\u0440\u0435\u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0456 \u043d\u0430 \u0433\u043e\u043b\u043e\u0432\u043d\u0443 \u0441\u0442\u043e\u0440\u0456\u043d\u043a\u0443 \u0447\u0435\u0440\u0435\u0437 ".concat(e.countdown," \u0441\u0435\u043a\u0443\u043d\u0434(\u0438)")}),(0,w.jsx)(b.rU,{to:"/",children:e.isEnglish?"Go to main":"\u0414\u043e \u0433\u043e\u043b\u043e\u0432\u043d\u043e\u0457"})]})},y=function(){var e,n=(0,c.UO)().token,t=(0,i.useContext)(k.V).login,d="en"===(0,i.useContext)(j.A).language,f=(0,i.useState)(!1),m=(0,a.Z)(f,2),h=m[0],g=m[1],v=(0,i.useState)(null),x=(0,a.Z)(v,2),_=x[0],Z=x[1],b=(0,i.useState)(!1),y=(0,a.Z)(b,2),S=y[0],C=y[1],M=(0,i.useState)(10),I=(0,a.Z)(M,2),N=I[0],A=I[1],B=(0,c.s0)(),T=function(){e=setInterval((function(){A((function(e){return e-1}))}),1e3)};(0,i.useEffect)((function(){N<=0&&(clearInterval(e),B("/"))}),[N]);var F=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(n){var o,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,g(!0),Z(null),C(!1),e.next=6,fetch("".concat("http://localhost:5000/","emailconfirmation/").concat(n),{method:"POST"});case 6:return o=e.sent,e.next=9,o.json();case 9:if(a=e.sent,o.ok){e.next=12;break}throw new Error(a.message);case 12:if(!a.userId){e.next=16;break}localStorage.setItem("user_id",a.userId),e.next=17;break;case 16:throw new Error("There is no userId");case 17:t(a.userId,a.token),g(!1),C(!0),T(),e.next=30;break;case 23:e.prev=23,e.t0=e.catch(0),console.log(e.t0),Z(e.t0.message||"Something went wrong, please try again  "),g(!1),C(!1),T();case 30:case"end":return e.stop()}}),e,null,[[0,23]])})));return function(n){return e.apply(this,arguments)}}();return(0,i.useEffect)((function(){return F(n),function(){clearInterval(e)}}),[]),(0,w.jsxs)(w.Fragment,{children:[S&&(0,w.jsx)(l.Z,{onClick:function(){C(!1)},children:(0,w.jsx)(s.Z,{text:"Your email has been verified!",onClick:function(){C(!1)}})}),_&&(0,w.jsx)(l.Z,{onClick:function(){Z(null)},children:(0,w.jsx)(u.Z,{error:_,onClick:function(){Z(null)}})}),h&&(0,w.jsx)(p,{}),(0,w.jsx)(E,{isEnglish:d,countdown:N})]})}},6547:function(e,n){n.Z={backdrop:"Modal_backdrop__xrrQb",modal:"Modal_modal__xYw7Q","slide-down":"Modal_slide-down__2nDfw",modalBTN:"Modal_modalBTN__khJ4T",centralModal:"Modal_centralModal__gKzgM",float:"Modal_float__7EeUJ"}}}]);
//# sourceMappingURL=53.618692cb.chunk.js.map