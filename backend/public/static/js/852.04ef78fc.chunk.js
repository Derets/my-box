"use strict";(self.webpackChunkmy_box=self.webpackChunkmy_box||[]).push([[852],{2865:function(e,n,t){t.d(n,{Z:function(){return i}});var a=t(2791),r=t(5794),o="ErrorModal_ModalAuthError__NoA5V",c="ErrorModal_modalBTN__kzYEi",s=t(184),i=function(e){var n="en"===(0,a.useContext)(r.A).language;return(0,s.jsxs)("div",{className:o,children:[(0,s.jsx)("h1",{children:n?"An error accured!":"\u0423\u043f\u0441... \u0412\u0456\u0434\u0431\u0443\u043b\u0430\u0441\u044f \u043f\u043e\u043c\u0438\u043b\u043a\u0430!"}),(0,s.jsx)("p",{children:e.error}),(0,s.jsx)("div",{className:c,id:"modalBtn",onClick:e.onClick,children:"OK"})]})}},1095:function(e,n,t){var a=t(2791),r=t(6547),o=t(4164),c=t(184),s=function(e){return(0,c.jsx)("div",{onClick:null===e||void 0===e?void 0:e.onClick,className:r.Z.backdrop})},i=function(e){return(0,c.jsx)("div",{className:r.Z.modal,children:(0,c.jsx)("div",{children:e.children})})},l=document.getElementById("overlays");n.Z=function(e){return(0,a.useEffect)((function(){var e=document.getElementById("modalBtn");null===e||void 0===e||e.focus()}),[]),(0,c.jsxs)(c.Fragment,{children:[o.createPortal((0,c.jsx)(s,{onClick:null===e||void 0===e?void 0:e.onClick}),l),o.createPortal((0,c.jsx)(i,{children:e.children}),l)]})}},1402:function(e,n,t){t.d(n,{Z:function(){return i}});var a=t(2791),r=t(5794),o="SuccessModal_ModalAuthError__1ws38",c="SuccessModal_modalBTN__40Yj6",s=t(184),i=function(e){var n="en"===(0,a.useContext)(r.A).language;return(0,s.jsxs)("div",{className:o,children:[(0,s.jsx)("h1",{children:n?"Success!":"\u0412\u0441\u0435 \u0434\u043e\u0431\u0440\u0435!"}),(0,s.jsx)("p",{children:e.text}),(0,s.jsx)("div",{className:c,id:"modalBtn",onClick:e.onClick,children:"OK"})]})}},3852:function(e,n,t){t.r(n),t.d(n,{default:function(){return B}});var a=t(2791),r=t(4165),o=t(5861),c=t(9439),s={link:"UserAuthentication_link__wEeAX",AuthenticationSection:"UserAuthentication_AuthenticationSection__xmQrT",container:"UserAuthentication_container__exxG8",section:"UserAuthentication_section__d7OAI",fullHeight:"UserAuthentication_fullHeight__T5FfO",checkbox:"UserAuthentication_checkbox__KhoET",mb:"UserAuthentication_mb__6YeCB","card-3d-wrap":"UserAuthentication_card-3d-wrap__snI+u","card-3d-wrapper":"UserAuthentication_card-3d-wrapper__5cWrI","card-front":"UserAuthentication_card-front__onqhj","card-back":"UserAuthentication_card-back__3ECWL","center-wrap":"UserAuthentication_center-wrap__ISiWB","form-group":"UserAuthentication_form-group__RX6Ly","form-style":"UserAuthentication_form-style__AaP6n","input-icon":"UserAuthentication_input-icon__X8n31",btn:"UserAuthentication_btn__8ZK+n",Success:"UserAuthentication_Success__qBFeE",GoogleLoginIcon:"UserAuthentication_GoogleLoginIcon__eoLMK"},i=t(1224),l=t(4469),u=t(1095),d=t(5794),h=t(2865),m=t(1402),p=t(6547),x=t(4164),g=t(184),f=function(e){return(0,g.jsx)("div",{onClick:null===e||void 0===e?void 0:e.onClick,className:p.Z.backdrop})},v=function(e){return(0,g.jsx)("div",{className:p.Z.centralModal,children:(0,g.jsx)("div",{children:e.children})})},j=document.getElementById("overlays"),_=function(e){return(0,a.useEffect)((function(){var e=document.getElementById("modalBtn");null===e||void 0===e||e.focus()}),[]),(0,g.jsxs)(g.Fragment,{children:[x.createPortal((0,g.jsx)(f,{onClick:null===e||void 0===e?void 0:e.onClick}),j),x.createPortal((0,g.jsx)(v,{children:e.children}),j)]})},w="PasswordReset_ModalAuthError__OlvC6",k="PasswordReset_EmailInput__d7g+M",b="PasswordReset_modalButtons__OjDuv",y="PasswordReset_modalBTNUnconfirm__vWAQi",N="PasswordReset_modalBTNConfirm__phLfY",S=function(e){var n=(0,a.useState)(void 0),t=(0,c.Z)(n,2),s=t[0],i=t[1],u=(0,a.useState)(!1),h=(0,c.Z)(u,2),m=h[0],p=h[1],x=(0,a.useState)(null),f=(0,c.Z)(x,2),v=f[0],j=f[1],_=(0,a.useState)(!1),S=(0,c.Z)(_,2),C=S[0],Z=S[1],E="en"===(0,a.useContext)(d.A).language,I=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(n){var t,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,p(!0),j(null),Z(!1),e.next=6,fetch("".concat("http://localhost:5000/","resetpassword"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n})});case 6:return t=e.sent,e.next=9,t.json();case 9:if(a=e.sent,t.ok){e.next=12;break}throw new Error(a.message);case 12:p(!1),Z(!0),e.next=22;break;case 16:e.prev=16,e.t0=e.catch(0),console.log(e.t0),j(e.t0.message||"Something went wrong, please try again  "),p(!1),Z(!1);case 22:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(n){return e.apply(this,arguments)}}();return(0,g.jsxs)("div",{className:w,children:[(0,g.jsx)("h1",{children:E?"Enter email: ":"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u043f\u043e\u0448\u0442\u0443: "}),(0,g.jsx)("input",{className:k,type:"text",id:"email",required:!0,value:s,onChange:function(e){i(e.target.value)}}),m&&(0,g.jsx)(l.Z,{}),v&&(0,g.jsx)("p",{children:v}),C&&(0,g.jsx)("p",{children:E?"Password sent successfully, please check your email address.":"\u041f\u0430\u0440\u043e\u043b\u044c \u0431\u0443\u0432 \u0432\u0456\u0434\u0456\u0441\u043b\u0430\u043d\u0438\u0439 \u043d\u0430 \u043f\u043e\u0448\u0442\u0443, \u0431\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430 \u043f\u0435\u0440\u0435\u0433\u043b\u044f\u0442\u043d\u0435 \u0435-\u043c\u0435\u0439\u043b."}),(0,g.jsxs)("div",{className:b,children:[(0,g.jsx)("div",{className:y,id:"modalBtn",onClick:e.onExit,children:E?"Not now":"\u041d\u0435 \u0437\u0430\u0440\u0430\u0437"}),(0,g.jsx)("div",{className:N,id:"modalBtn",onClick:function(){I(s)},children:E?"Send":"\u0412\u0456\u0434\u043f\u0440\u0430\u0432\u0438\u0442\u0438"})]})]})},C=function(e){var n=(0,a.useState)(void 0),t=(0,c.Z)(n,2),s=t[0],i=t[1],u=(0,a.useState)(!1),h=(0,c.Z)(u,2),m=h[0],p=h[1],x=(0,a.useState)(null),f=(0,c.Z)(x,2),v=f[0],j=f[1],_=(0,a.useState)(!1),S=(0,c.Z)(_,2),C=S[0],Z=S[1],E="en"===(0,a.useContext)(d.A).language,I=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(n){var t,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,p(!0),j(null),Z(!1),e.next=6,fetch("".concat("http://localhost:5000/","reconfirmemail"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:n})});case 6:return t=e.sent,e.next=9,t.json();case 9:if(a=e.sent,t.ok){e.next=12;break}throw new Error(a.message);case 12:p(!1),Z(!0),e.next=22;break;case 16:e.prev=16,e.t0=e.catch(0),console.log(e.t0),j(e.t0.message||"Something went wrong, please try again  "),p(!1),Z(!1);case 22:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(n){return e.apply(this,arguments)}}();return(0,g.jsxs)("div",{className:w,children:[(0,g.jsx)("h1",{children:E?"Enter email: ":"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u043f\u043e\u0448\u0442\u0443: "}),(0,g.jsx)("input",{className:k,type:"text",id:"email",required:!0,value:s,onChange:function(e){i(e.target.value)}}),m&&(0,g.jsx)(l.Z,{}),v&&(0,g.jsx)("p",{children:v}),C&&(0,g.jsx)("p",{children:E?"Mail sent successfully, please check your email address.":"\u041f\u0438\u0441\u044c\u043c\u043e \u0432\u0456\u0434\u0456\u0441\u043b\u0430\u043d\u043e \u043d\u0430 \u043f\u043e\u0448\u0442\u0443, \u0431\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430 \u043f\u0435\u0440\u0435\u0433\u043b\u044f\u0442\u043d\u0435 \u0435-\u043c\u0435\u0439\u043b."}),(0,g.jsxs)("div",{className:b,children:[(0,g.jsx)("div",{className:y,id:"modalBtn",onClick:e.onExit,children:E?"Not now":"\u041d\u0435 \u0437\u0430\u0440\u0430\u0437"}),(0,g.jsx)("div",{className:N,id:"modalBtn",onClick:function(){I(s)},children:E?"Send":"\u0412\u0456\u0434\u043f\u0440\u0430\u0432\u0438\u0442\u0438"})]})]})},Z=t(5872);function E(e){this.message=e}E.prototype=new Error,E.prototype.name="InvalidCharacterError";var I="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(e){var n=String(e).replace(/=+$/,"");if(n.length%4==1)throw new E("'atob' failed: The string to be decoded is not correctly encoded.");for(var t,a,r=0,o=0,c="";a=n.charAt(o++);~a&&(t=r%4?64*t+a:a,r++%4)?c+=String.fromCharCode(255&t>>(-2*r&6)):0)a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a);return c};function A(e){var n=e.replace(/-/g,"+").replace(/_/g,"/");switch(n.length%4){case 0:break;case 2:n+="==";break;case 3:n+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(I(e).replace(/(.)/g,(function(e,n){var t=n.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(n)}catch(e){return I(n)}}function T(e){this.message=e}T.prototype=new Error,T.prototype.name="InvalidTokenError";var U=function(e,n){if("string"!=typeof e)throw new T("Invalid token specified");var t=!0===(n=n||{}).header?0:1;try{return JSON.parse(A(e.split(".")[t]))}catch(e){throw new T("Invalid token specified: "+e.message)}},P=function(){var e=(0,a.useContext)(i.V),n=e.login,t=e.isLoggedIn,p=(0,a.useState)(!1),x=(0,c.Z)(p,2),f=x[0],v=x[1],j=(0,a.useState)(null),w=(0,c.Z)(j,2),k=w[0],b=w[1],y=(0,a.useState)(!1),N=(0,c.Z)(y,2),E=N[0],I=N[1],A=(0,a.useState)(!1),T=(0,c.Z)(A,2),P=T[0],B=T[1],M=(0,a.useState)(!1),O=(0,c.Z)(M,2),L=O[0],F=O[1],J="en"===(0,a.useContext)(d.A).language,R=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(t){var a,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,v(!0),b(null),e.next=6,fetch("".concat("http://localhost:5000/","login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t.target.loginEmailInput.value,password:t.target.loginPasswordInput.value})});case 6:return a=e.sent,e.next=9,a.json();case 9:if(o=e.sent,a.ok){e.next=12;break}throw new Error(o.message);case 12:if(!o.userId){e.next=16;break}localStorage.setItem("user_id",o.userId),e.next=17;break;case 16:throw new Error("There is no userId");case 17:v(!1),n(o.userId,o.token,o.role),e.next=26;break;case 21:e.prev=21,e.t0=e.catch(1),console.log(e.t0),b(e.t0.message||"Something went wrong, please try again  "),v(!1);case 26:case"end":return e.stop()}}),e,null,[[1,21]])})));return function(n){return e.apply(this,arguments)}}(),G=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(n){var t,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.prev=1,v(!0),b(null),I(!1),e.next=7,fetch("".concat("http://localhost:5000/","signup"),{method:"POST",body:JSON.stringify({name:n.target.signupUsername.value,email:n.target.signupEmail.value,password:n.target.signupPassword.value}),headers:{"Content-Type":"application/json"}});case 7:return t=e.sent,e.next=10,t.json();case 10:if(a=e.sent,t.ok){e.next=13;break}throw new Error(a.message);case 13:v(!1),I(!0),e.next=23;break;case 17:e.prev=17,e.t0=e.catch(1),console.log(e.t0),b(e.t0.message||"Something went wrong, please try again  "),v(!1),I(!1);case 23:case"end":return e.stop()}}),e,null,[[1,17]])})));return function(n){return e.apply(this,arguments)}}(),K=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(t){var a,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,v(!0),b(null),e.next=5,fetch("".concat("http://localhost:5000/","google/signup"),{method:"POST",body:JSON.stringify({name:t.name,email:t.email,image:t.picture}),headers:{"Content-Type":"application/json"}});case 5:return a=e.sent,e.next=8,a.json();case 8:if(o=e.sent,a.ok){e.next=11;break}throw new Error(o.message);case 11:if(!o.userId){e.next=15;break}localStorage.setItem("user_id",o.userId),e.next=16;break;case 15:throw new Error("There is no userId");case 16:n(o.userId,o.token),v(!1),e.next=25;break;case 20:e.prev=20,e.t0=e.catch(0),console.log(e.t0),b(e.t0.message||"Something went wrong, please try again  "),v(!1);case 25:case"end":return e.stop()}}),e,null,[[0,20]])})));return function(n){return e.apply(this,arguments)}}(),Y=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(t){var a,o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,v(!0),b(null),e.next=5,fetch("".concat("http://localhost:5000/","google/login"),{method:"POST",body:JSON.stringify({email:t.email}),headers:{"Content-Type":"application/json"}});case 5:return a=e.sent,e.next=8,a.json();case 8:if(o=e.sent,a.ok){e.next=11;break}throw new Error(o.message);case 11:if(!o.userId){e.next=15;break}localStorage.setItem("user_id",o.userId),e.next=16;break;case 15:throw new Error("There is no userId");case 16:n(o.userId,o.token,o.role),v(!1),e.next=25;break;case 20:e.prev=20,e.t0=e.catch(0),console.log(e.t0),b(e.t0.message||"Something went wrong, please try again  "),v(!1);case 25:case"end":return e.stop()}}),e,null,[[0,20]])})));return function(n){return e.apply(this,arguments)}}();return(0,g.jsxs)(g.Fragment,{children:[P&&(0,g.jsx)(_,{onClick:function(){B(!1)},children:(0,g.jsx)(S,{onExit:function(){B(!1)}})}),L&&(0,g.jsx)(_,{onClick:function(){F(!1)},children:(0,g.jsx)(C,{onExit:function(){F(!1)}})}),E&&(0,g.jsx)(u.Z,{onClick:function(){I(!1)},children:(0,g.jsx)(m.Z,{text:"".concat(J?"A confirmation link has been sent to your email, be sure to check your spam!":"\u041f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f \u0434\u043b\u044f \u043f\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043d\u043d\u044f \u043d\u0430\u0434\u0456\u0441\u043b\u0430\u043d\u043e \u043d\u0430 \u0432\u0430\u0448\u0443 \u0435\u043b\u0435\u043a\u0442\u0440\u043e\u043d\u043d\u0443 \u043f\u043e\u0448\u0442\u0443, \u043e\u0431\u043e\u0432\u2019\u044f\u0437\u043a\u043e\u0432\u043e \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 \u0441\u043f\u0430\u043c!"),onClick:function(){I(!1)}})}),k&&(0,g.jsx)(u.Z,{onClick:function(){b(null)},children:(0,g.jsx)(h.Z,{error:k,onClick:function(){b(null)}})}),(0,g.jsx)("div",{className:s.AuthenticationSection,children:(0,g.jsx)("div",{className:s.container,children:(0,g.jsx)("div",{className:"".concat(s.row," ").concat(s.fullHeight),children:(0,g.jsx)("div",{className:"".concat(s.col," ").concat(s["text-center"]," ").concat(s["align-self-center"]," ").concat(s.py),children:(0,g.jsxs)("div",{className:"".concat(s.section," ").concat(s.pb," ").concat(s.pt," ").concat(s["pt-sm-2"]," ").concat(s["text-center"]),children:[(0,g.jsxs)("h6",{className:"".concat(s.mb," ").concat(s.pb),children:[(0,g.jsx)("span",{children:J?"Log In":"\u0412\u0445\u0456\u0434"}),(0,g.jsx)("span",{children:J?"Sign Up":"\u0417\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044f"})]}),(0,g.jsx)("input",{className:s.checkbox,type:"checkbox",id:"reg-log",name:"reg-log"}),(0,g.jsx)("label",{htmlFor:"reg-log"}),(0,g.jsx)("div",{className:s["card-3d-wrap"],children:(0,g.jsxs)("div",{className:s["card-3d-wrapper"],children:[(0,g.jsx)("div",{className:s["card-front"],children:(0,g.jsx)("div",{className:s["center-wrap"],children:(0,g.jsxs)("form",{onSubmit:R,className:"".concat(s.section," ").concat(s["text-center"]),children:[(0,g.jsx)("h4",{className:"".concat(s.mb," ").concat(s.pb),children:J?"Log In":"\u0412\u0445\u0456\u0434"}),(0,g.jsxs)("div",{className:s["form-group"],children:[(0,g.jsx)("input",{id:"loginEmailInput",type:"email",className:s["form-style"],placeholder:J?"Email":"\u041f\u043e\u0448\u0442\u0430"}),(0,g.jsx)("i",{className:"".concat(s["input-icon"]," ").concat(s.uil," ").concat(s["uil-at"])})]}),(0,g.jsxs)("div",{className:"".concat(s["form-group"]," ").concat(s.mt2),children:[(0,g.jsx)("input",{id:"loginPasswordInput",type:"password",className:s["form-style"],placeholder:J?"Password":"\u041f\u0430\u0440\u043e\u043b\u044c"}),(0,g.jsx)("i",{className:"".concat(s["input-icon"]," ").concat(s.uil," ").concat(s["uil-lock-alt"])})]}),(0,g.jsxs)("button",{type:"submit",className:"".concat(s.btn," ").concat(f||k||!t?null:s.Success),disabled:!f&&!k&&t,children:[f&&(0,g.jsx)(l.Z,{}),!f&&!k&&!t&&J&&"Login",!f&&!k&&!t&&!J&&"\u0423\u0432\u0456\u0439\u0442\u0438",!f&&!k&&t&&J&&"Already logged in",!f&&!k&&t&&!J&&"\u0412\u0438 \u0432\u0436\u0435 \u0443\u0432\u0456\u0439\u0448\u043b\u0438",k&&J&&"Try again",k&&!J&&"\u0421\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0437\u043d\u043e\u0432\u0443"]}),(0,g.jsxs)("p",{className:"".concat(s.mb," ").concat(s.mt4," ").concat(s["text-center"]),children:[(0,g.jsx)("div",{className:s.GoogleLoginIcon,children:(0,g.jsx)(Z.kZ,{className:s.GoogleLoginIcon,theme:"filled_blue",size:"large",text:"signup_with",onSuccess:function(e){Y(U(e.credential)),console.log(U(e.credential))},onError:function(){console.log("Login Failed")}})}),(0,g.jsx)("button",{className:s.link,type:"button",onClick:function(){B(!0)},children:J?"Forgot your password?":"\u0417\u0430\u0431\u0443\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c?"})]}),(0,g.jsx)("p",{children:(0,g.jsx)("button",{className:s.link,type:"button",onClick:function(){F(!0)},children:J?"Reconfirm email":"\u041f\u0435\u0440\u0435\u043f\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 \u043f\u043e\u0448\u0442\u0443"})})]})})}),(0,g.jsx)("div",{className:s["card-back"],children:(0,g.jsx)("div",{className:s["center-wrap"],children:(0,g.jsxs)("form",{onSubmit:G,className:"".concat(s.section," ").concat(s["text-center"]),children:[(0,g.jsx)("h4",{className:"".concat(s.mb3," ").concat(s.pb3),children:J?"Sign Up":"\u0417\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044f"}),(0,g.jsxs)("div",{className:s["form-group"],children:[(0,g.jsx)("input",{id:"signupUsername",type:"text",className:s["form-style"],placeholder:J?"Full Name":"\u041f\u043e\u0432\u043d\u0435 \u0456\u043c`\u044f"}),(0,g.jsx)("i",{className:"".concat(s["input-icon"]," ").concat(s.uil," ").concat(s["uil-user"])})]}),(0,g.jsxs)("div",{className:"".concat(s["form-group"]," ").concat(s.mt2),children:[(0,g.jsx)("input",{id:"signupEmail",type:"email",className:s["form-style"],placeholder:J?"Email":"\u041f\u043e\u0448\u0442\u0430"}),(0,g.jsx)("i",{className:"".concat(s["input-icon"]," ").concat(s.uil," ").concat(s["uil-at"])})]}),(0,g.jsxs)("div",{className:"".concat(s["form-group"]," ").concat(s.mt2),children:[(0,g.jsx)("input",{id:"signupPassword",type:"password",className:s["form-style"],placeholder:J?"Password":"\u041f\u0430\u0440\u043e\u043b\u044c"}),(0,g.jsx)("i",{className:"".concat(s["input-icon"]," ").concat(s.uil," ").concat(s["uil-lock-alt"])})]}),(0,g.jsxs)("button",{type:"submit",className:s.btn,disabled:!f&&!k&&t,children:[f&&(0,g.jsx)(l.Z,{}),!f&&!k&&!t&&J&&"Register",!f&&!k&&!t&&!J&&"\u0417\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0432\u0430\u0442\u0438\u0441\u044f",!f&&!k&&t&&J&&"Already logged in",!f&&!k&&t&&!J&&"\u0412\u0438 \u0432\u0436\u0435 \u0443\u0432\u0456\u0439\u0448\u043b\u0438",k&&J&&"Try again",k&&!J&&"\u0421\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0437\u043d\u043e\u0432\u0443"]}),(0,g.jsx)("div",{className:s.GoogleLoginIcon,children:(0,g.jsx)(Z.kZ,{theme:"filled_blue",size:"large",text:"signup_with",onSuccess:function(e){K(U(e.credential)),console.log(U(e.credential))},onError:function(){console.log("Login Failed")}})})]})})})]})})]})})})})})]})},B=function(){return(0,g.jsx)(P,{})}},6547:function(e,n){n.Z={backdrop:"Modal_backdrop__xrrQb",modal:"Modal_modal__xYw7Q","slide-down":"Modal_slide-down__2nDfw",modalBTN:"Modal_modalBTN__khJ4T",centralModal:"Modal_centralModal__gKzgM",float:"Modal_float__7EeUJ"}}}]);
//# sourceMappingURL=852.04ef78fc.chunk.js.map