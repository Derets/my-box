"use strict";(self.webpackChunkmy_box=self.webpackChunkmy_box||[]).push([[135],{8064:function(t,e,o){var a=o(9439),r=o(2661),s=o(2791),i=o(5331),n=o(184);e.Z=function(t){var e=(0,s.useRef)(),o=(0,s.useState)(!1),h=(0,a.Z)(o,2),m=h[0],c=h[1],l=(0,s.useState)(!1),x=(0,a.Z)(l,2),j=x[0],y=x[1];(0,s.useEffect)((function(){y(!1)}),[t.length,t.height,t.width]);(0,s.useEffect)((function(){j?(i.ZP.to(e.current.position,{x:G[0],y:G[1],z:G[2],duration:.125,ease:"none"}),i.ZP.to(e.current.rotation,{x:z[0],y:z[1],z:z[2],duration:.125,ease:"none"}),i.ZP.to(e.current.position,{x:Z[0],y:Z[1],z:Z[2],duration:.125,delay:.125,ease:"none"}),i.ZP.to(e.current.rotation,{x:w[0],y:w[1],z:w[2],duration:.125,delay:.125,ease:"none"})):(i.ZP.to(e.current.position,{x:G[0],y:G[1],z:G[2],duration:.125,ease:"none"}),i.ZP.to(e.current.rotation,{x:z[0],y:z[1],z:z[2],duration:.125,ease:"none"}),i.ZP.to(e.current.position,{x:L[0],y:L[1],z:L[2],duration:.125,delay:.125,ease:"none"}),i.ZP.to(e.current.rotation,{x:I[0],y:I[1],z:I[2],duration:.125,delay:.125,ease:"none"}))}),[j]),(0,r.A)((function(){}));var u=t.colorOne||"#333",g=t.colorTwo||"#b3b3b3",d=t.colorThree||"#999",b=t.width||3,M=t.height||2,p=t.length||3,P=p?p/60:.05,f=4*P,L=[0,0,0],G=[p/2-(p/2-f/2),M+f+p/4,0],Z=[-p,M+f,0],I=[0,0,0],z=[0,0,Math.PI/180*90],w=[0,0,Math.PI/180*180];return(0,n.jsxs)("group",{onClick:function(){m||(c(!0),y(!j),setTimeout((function(){c(!1)}),100))},children:[(0,n.jsxs)("group",{ref:e,children:[(0,n.jsxs)("mesh",{rotation:[0,0,0],position:[0,M/2+f/2,0],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[p,f,b]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,n.jsxs)("mesh",{rotation:[0,0,0],position:[p/2,M/2+f,0],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[p/10,P/10,b/10]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:d})]})]}),(0,n.jsxs)("mesh",{rotation:[0,0,0],position:[0,-M/2+f/2,0],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[p,f,b]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,n.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[p/2-f/2,0,0],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[M,f,b]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,n.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[-(p/2-f/2),0,0],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[M,f,b]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,n.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,0,-(b/2-f/2)],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[p,f,M]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,n.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,0,b/2-f/2],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[p,f,M]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,n.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,f/2,b/2+P/2],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[p,P,M+f]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:u})]}),(0,n.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,f/2,-(b/2+P/2)],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[p,P,M+f]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:u})]}),(0,n.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[p/2-f,-M/4+f+P/10,0],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[M/2,P/10,b-2*f]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:d})]}),(0,n.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[-(p/2-f),-M/4+f+P/10,0],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[M/2,P/10,b-2*f]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:d})]}),(0,n.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,-M/4+f+P/10,-(b/2-f)],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[p-2*f,P/10,M/2]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:d})]}),(0,n.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,-M/4+f+P/10,b/2-f],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[p-2*f,P/10,M/2]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:d})]}),(0,n.jsxs)("mesh",{rotation:[0,0,0],position:[0,-M/2+f+P/20,0],children:[(0,n.jsx)("boxGeometry",{attach:"geometry",args:[p-2*f,P/10,b-2*f]}),(0,n.jsx)("meshLambertMaterial",{attach:"material",color:d})]})]})}},8135:function(t,e,o){o.d(e,{Z:function(){return u}});var a=o(5892),r=o(3520),s=o(976),i={},n=o(9439),h=o(2791),m=o(5331),c=o(184),l=function(t){var e=(0,h.useRef)(),o=(0,h.useRef)(),a=(0,h.useState)(!1),r=(0,n.Z)(a,2),s=r[0],i=r[1],l=(0,h.useState)(!1),x=(0,n.Z)(l,2),j=x[0],y=x[1];(0,h.useEffect)((function(){y(!1)}),[t.length,t.height,t.width]);(0,h.useEffect)((function(){j?(m.ZP.to(e.current.position,{x:G[0],y:G[1],z:G[2],duration:.125,ease:"none"}),m.ZP.to(e.current.rotation,{x:v[0],y:v[1],z:v[2],duration:.125,ease:"none"}),m.ZP.to(e.current.position,{x:Z[0],y:Z[1],z:Z[2],duration:.125,delay:.125,ease:"none"}),m.ZP.to(e.current.rotation,{x:k[0],y:k[1],z:k[2],duration:.125,delay:.125,ease:"none"}),m.ZP.to(o.current.position,{x:z[0],y:z[1],z:z[2],duration:.125,delay:.25,ease:"none"}),m.ZP.to(o.current.rotation,{x:R[0],y:R[1],z:R[2],duration:.125,delay:.25,ease:"none"}),m.ZP.to(o.current.position,{x:I[0],y:I[1],z:I[2],duration:.125,delay:.375,ease:"none"}),m.ZP.to(o.current.rotation,{x:S[0],y:S[1],z:S[2],duration:.125,delay:.375,ease:"none"})):(m.ZP.to(o.current.position,{x:z[0],y:z[1],z:z[2],duration:.125,ease:"none"}),m.ZP.to(o.current.rotation,{x:R[0],y:R[1],z:R[2],duration:.125,ease:"none"}),m.ZP.to(o.current.position,{x:w[0],y:w[1],z:w[2],duration:.125,delay:.125,ease:"none"}),m.ZP.to(o.current.rotation,{x:T[0],y:T[1],z:T[2],duration:.125,delay:.125,ease:"none"}),m.ZP.to(e.current.position,{x:G[0],y:G[1],z:G[2],duration:.125,delay:.25,ease:"none"}),m.ZP.to(e.current.rotation,{x:v[0],y:v[1],z:v[2],duration:.125,delay:.25,ease:"none"}),m.ZP.to(e.current.position,{x:L[0],y:L[1],z:L[2],duration:.125,delay:.375,ease:"none"}),m.ZP.to(e.current.rotation,{x:T[0],y:T[1],z:T[2],duration:.125,delay:.375,ease:"none"}))}),[j]);var u=t.colorOne||"#333",g=t.colorTwo||"#b3b3b3",d=t.length||3,b=t.height||2,M=t.width||3,p=M?M/100:.05,P=3*p,f=.03,L=[0,(b+P)/2+.06+P,0],G=[-M/2-P+f,b/2+M/2+3*P,0],Z=[-M-2*P,(b+P)/2+.06+P,0],I=[M+f,(b+P)/2+f+P,0],z=[P-f+M/2,b/2+d/2-4*P+f,0],w=[P+f,(b+P)/2+f,0],T=[0,0,0],R=[0,0,Math.PI/180*-90],v=[0,0,Math.PI/180*90],S=[0,0,Math.PI/180*-180],k=[0,0,Math.PI/180*180];return(0,c.jsxs)("group",{onClick:function(){s||(i(!0),y(!j),setTimeout((function(){i(!1)}),100))},children:[(0,c.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[-(M-p)/2,0,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[b,p,d]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,c.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,0,-(d-p)/2],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[M,p,b]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,c.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[(M-p)/2,0,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[b,p,d]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,c.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,0,(d-p)/2],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[M,p,b]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,c.jsxs)("mesh",{rotation:[0,0,0],position:[0,-(b-p)/2,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[M,p,d]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,c.jsxs)("mesh",{rotation:[0,0,0],position:[0,-((b+P)/2+f),0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[M+2*(f+P),P,d]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:u})]}),(0,c.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[(M+P)/2+f,0,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[b+2*(f+P),P,d]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:u})]}),(0,c.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[-((M+P)/2+f),(P+f)/2,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[b+.09+3*P,P,d]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:u})]}),(0,c.jsxs)("mesh",{ref:o,rotation:[0,0,0],position:[P+f,(b+P)/2+f,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[M,P,d]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:u})]}),(0,c.jsxs)("mesh",{rotation:[0,0,0],position:[0,(b+P)/2+.06+P,0],ref:e,children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[M+.06+2*P,P,d]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:u})]})]})},x=o(8064),j=o(2661),y=function(t){var e=(0,h.useRef)(),o=(0,h.useState)(!1),a=(0,n.Z)(o,2),r=a[0],s=a[1],i=(0,h.useState)(!1),l=(0,n.Z)(i,2),x=l[0],y=l[1];(0,h.useEffect)((function(){y(!1)}),[t.length,t.height,t.width]);(0,h.useEffect)((function(){x?m.ZP.to(e.current.position,{x:G[0],y:G[1],z:G[2],duration:.25,ease:"power4.out"}):m.ZP.to(e.current.position,{x:L[0],y:L[1],z:L[2],duration:.25,ease:"power4.out"})}),[x]),(0,j.A)((function(){}));var u=t.colorOne||"red",g=t.colorTwo||"#b3b3b3",d=t.colorThree||"#999",b=t.width||3,M=t.height||2,p=t.length||3,P=p?b/60:.05,f=2*P,L=[0,0,0],G=[.7*p,0,0];return(0,c.jsxs)("group",{onClick:function(){r||(s(!0),y(!x),setTimeout((function(){s(!1)}),100))},children:[(0,c.jsxs)("group",{ref:e,children:[(0,c.jsxs)("mesh",{rotation:[0,0,0],position:[p/2,0,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[p/10,P/10,b/10]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:d})]}),(0,c.jsxs)("mesh",{rotation:[0,0,0],position:[0,-M/2+f/2,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[p,f,b]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,c.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[p/2-f/2,0,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[M,f,b]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,c.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[-(p/2-f/2),0,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[M,f,b]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,c.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,0,-(b/2-f/2)],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[p,f,M]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,c.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,0,b/2-f/2],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[p,f,M]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:g})]}),(0,c.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[p/2-f,-M/4+f+P/10,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[M/2,P/10,b-2*f]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:d})]}),(0,c.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[-(p/2-f),-M/4+f+P/10,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[M/2,P/10,b-2*f]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:d})]}),(0,c.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,-M/4+f+P/10,-(b/2-f)],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[p-2*f,P/10,M/2]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:d})]}),(0,c.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,-M/4+f+P/10,b/2-f],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[p-2*f,P/10,M/2]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:d})]}),(0,c.jsxs)("mesh",{rotation:[0,0,0],position:[0,-M/2+f+P/20,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[p-2*f,P/10,b-2*f]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:d})]})]}),(0,c.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,0,b/2+f/2],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[p,f,M+2*f]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:u})]}),(0,c.jsxs)("mesh",{rotation:[Math.PI/2,0,0],position:[0,0,-(b/2+f/2)],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[p,f,M+2*f]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:u})]}),(0,c.jsxs)("mesh",{rotation:[0,0,Math.PI/2],position:[-(p/2+f/2),0,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[M+2*f,f,b+2*f]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:u})]}),(0,c.jsxs)("mesh",{rotation:[0,0,0],position:[0,M/2+f/2,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[p,f,b]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:u})]}),(0,c.jsxs)("mesh",{rotation:[0,0,0],position:[0,-M/2-f/2,0],children:[(0,c.jsx)("boxGeometry",{attach:"geometry",args:[p,f,b]}),(0,c.jsx)("meshLambertMaterial",{attach:"material",color:u})]})]})},u=function(t){var e=t.colorOne,o=t.colorTwo,n=t.colorThree,h=t.width,m=t.height,j=t.length,u=!!t.autoRotate&&t.autoRotate,g=t.autoRotateSpeed?t.autoRotateSpeed:2,d=t.boxType?t.boxType:"CubeBox",b=t.zoom?t.zoom:1,M=!!t.enableRotate&&t.enableRotate,p=!!t.enableZoom&&t.enableZoom;return(0,c.jsxs)(a.Xz,{className:i.Canvas,children:[(0,c.jsx)(r.z,{target:[0,0,0],autoRotate:u,autoRotateSpeed:g,enableRotate:M,enableZoom:p}),(0,c.jsx)(s.c,{makeDefault:!0,position:[6,5,10],zoom:b}),(0,c.jsx)("directionalLight",{position:[-2,5,2],intensity:.9}),(0,c.jsx)("ambientLight",{intensity:.6}),"CubeBox"===d&&(0,c.jsx)(l,{colorOne:e,colorTwo:o,colorThree:n,width:h,height:m,length:j}),"CasketBox"===d&&(0,c.jsx)(x.Z,{colorOne:e,colorTwo:o,colorThree:n,width:h,height:m,length:j}),"SliderBox"===d&&(0,c.jsx)(y,{colorOne:e,colorTwo:o,colorThree:n,width:h,height:m,length:j})]})}}}]);
//# sourceMappingURL=135.ef96b64e.chunk.js.map