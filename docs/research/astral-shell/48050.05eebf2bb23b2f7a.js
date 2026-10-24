"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[48050],{48050:(e,a,l)=>{l.r(a),l.d(a,{default:()=>d});var t=l(95155),u=l(12115),r=l(81712),o=l(3907),n=l(2253),i=l(90650);let c=`
varying vec2 vPlane;

void main() {
  vPlane = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,f=`
precision highp float;

varying vec2 vPlane;

uniform vec2 uCanvas;
uniform float uClock;
uniform float uPitch;
uniform float uFill;
uniform float uRound;
uniform float uFeather;
uniform float uWarp;
uniform float uWarpScale;
uniform float uDetailScale;
uniform float uWaveScale;
uniform float uFalloff;
uniform float uGain;
uniform float uAmbient;
uniform vec3 uInk;
uniform vec3 uHot;
uniform float uGamma;
uniform float uVignette;
uniform float uOpacity;
uniform vec3 uBackdrop;
uniform float uBackdropAlpha;
uniform vec3 uPointer;
uniform float uCursorPull;
uniform float uCursorGlow;
uniform float uCursorReach;

float chip(vec2 cell) {
  return fract(sin(dot(cell, vec2(12.543, 514.123))) * 4732.12);
}

float swell(vec2 spot) {
  vec2 cell = floor(spot);
  vec2 lean = fract(spot);
  lean = lean * lean * (3.0 - 2.0 * lean);

  float lo = mix(chip(cell), chip(cell + vec2(1.0, 0.0)), lean.x);
  float hi = mix(chip(cell + vec2(0.0, 1.0)), chip(cell + vec2(1.0, 1.0)), lean.x);
  return mix(lo, hi, lean.y);
}

void main() {
  vec2 pixel = vPlane * uCanvas;
  float pitch = max(uPitch, 2.0);

  vec2 grid = pixel / pitch;
  vec2 local = abs(fract(grid) - 0.5) * 2.0;
  float boxy = max(local.x, local.y);
  float orb = length(local);
  float bite = mix(boxy, orb, uRound);

  float aa = 2.0 / pitch;
  float soft = aa + uFeather * uFill;
  float tile = 1.0 - smoothstep(uFill - soft, uFill + soft, bite);

  vec2 field = pixel / max(uCanvas.y, 1.0);

  vec2 toward = uPointer.xy - field;
  float span = max(uCursorReach, 0.001);
  float near = exp(-dot(toward, toward) / (span * span)) * uPointer.z;
  field += toward * near * uCursorPull;

  float t = uClock;
  float inner = swell(field * uDetailScale - t * 0.66);
  vec2 folded = field + uWarp * swell(field * uWarpScale + t + inner * 0.5);
  float wave = swell(folded * uWaveScale - vec2(0.0, t));

  float ridge = pow(max(1.0 - wave, 0.0), uFalloff) * uGain;
  ridge += near * uCursorGlow;

  float level = clamp(uAmbient + ridge, 0.0, 1.0);
  level = pow(level, 1.0 / max(uGamma, 0.05));

  vec2 off = vPlane - 0.5;
  float edge = 1.0 - uVignette * smoothstep(0.2, 0.75, length(off));

  vec3 tint = mix(uInk, uHot, smoothstep(0.6, 1.0, level));
  float cover = clamp(level * tile * edge, 0.0, 1.0);
  float rest = uBackdropAlpha * (1.0 - cover);
  gl_FragColor = vec4(tint * cover + uBackdrop * rest, cover + rest) * uOpacity;
}
`,s=(e,a,l)=>Math.min(Math.max(e,a),l),v=()=>()=>{},m=()=>window.devicePixelRatio||1,h=e=>{let a=e.trim().toLowerCase();return"transparent"===a||"none"===a||""===a},p=({ceiling:e,readPointer:a,pitch:l,fill:o,shape:i,feather:v,speed:m,warp:p,warpScale:d,detailScale:w,waveScale:x,falloff:g,brightness:C,ambient:P,color:k,hotColor:b,backgroundColor:y,gamma:R,vignette:S,opacity:M,cursorInteraction:F,cursorPull:G,cursorGlow:W,cursorReach:B,adaptiveQuality:A,targetFps:I,paused:E})=>{let{gl:j,invalidate:D,setDpr:_}=(0,r.C)(),H=(0,u.useRef)(null),N=(0,u.useRef)(0),O=(0,u.useRef)(0),L=(0,u.useRef)({scale:e,frames:0,span:0,wins:0,roof:1/0}),[Q,V]=(0,u.useState)(!1);(0,u.useEffect)(()=>{let e=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>V(e.matches);return a(),e.addEventListener("change",a),()=>e.removeEventListener("change",a)},[]),(0,u.useEffect)(()=>{let a=L.current;a.scale=e,a.roof=1/0,a.wins=0,_(e)},[e,_]);let z=(0,u.useMemo)(()=>({uCanvas:{value:new n.I9Y(1,1)},uClock:{value:0},uPitch:{value:4},uFill:{value:.5},uRound:{value:0},uFeather:{value:.15},uWarp:{value:.375},uWarpScale:{value:3},uDetailScale:{value:7},uWaveScale:{value:4},uFalloff:{value:5},uGain:{value:5},uAmbient:{value:0},uInk:{value:new n.Q1f("#3366ff")},uHot:{value:new n.Q1f("#bfd4ff")},uGamma:{value:2.2},uVignette:{value:0},uOpacity:{value:1},uBackdrop:{value:new n.Q1f("#0a0a0a")},uBackdropAlpha:{value:1},uPointer:{value:new n.Pq0(.5,.5,0)},uCursorPull:{value:.35},uCursorGlow:{value:.25},uCursorReach:{value:.28}}),[]);return(0,r.D)((t,u)=>{let r=H.current;if(!r)return;let c=r.uniforms,f=Math.min(u,.05);N.current+=f,E||Q||(O.current+=f*m*.5);let V=j.getDrawingBufferSize(new n.I9Y),z=j.getPixelRatio();c.uCanvas.value.set(V.x,V.y),c.uClock.value=O.current,c.uPitch.value=Math.max(l,2)*z,c.uFill.value=s(o,.05,1),c.uRound.value=+("dot"===i),c.uFeather.value=s(v,0,1),c.uWarp.value=p,c.uWarpScale.value=d,c.uDetailScale.value=w,c.uWaveScale.value=x,c.uFalloff.value=Math.max(g,.1),c.uGain.value=C,c.uAmbient.value=P,c.uInk.value.set(k),c.uHot.value.set(b),c.uGamma.value=Math.max(R,.05),c.uVignette.value=S,c.uOpacity.value=M,h(y)?c.uBackdropAlpha.value=0:(c.uBackdrop.value.set(y),c.uBackdropAlpha.value=1);let Y=a();Y.reach+=(Y.toReach-Y.reach)*Math.min(5*f,1);let q=V.x/Math.max(V.y,1);c.uPointer.value.set(Y.x*q,1-Y.y,F?Y.reach:0),c.uCursorPull.value=G,c.uCursorGlow.value=W,c.uCursorReach.value=B;let T=L.current;if(T.frames+=1,T.span+=u,T.span>=.75){let a=T.frames/T.span;if(T.frames=0,T.span=0,A&&N.current>.5)if(a<.85*I&&T.scale>.5)T.roof=T.scale,T.scale=Math.max(.5,.75*T.scale),T.wins=0,_(T.scale);else if(a>=.95*I&&T.scale<e){T.wins+=1;let a=Math.min(e,1.25*T.scale);T.wins>=3&&a<.98*T.roof&&(T.scale=a,T.wins=0,_(a))}else T.wins=0}D()}),(0,t.jsxs)("mesh",{frustumCulled:!1,children:[(0,t.jsx)("planeGeometry",{args:[2,2]}),(0,t.jsx)("shaderMaterial",{ref:H,uniforms:z,vertexShader:c,fragmentShader:f,transparent:!0,premultipliedAlpha:!0,depthTest:!1,depthWrite:!1})]})},d=({width:e="100%",height:a="100%",className:l,children:r,pitch:n=4,fill:c=.5,shape:f="square",feather:d=.15,speed:w=1,warp:x=.375,warpScale:g=3,detailScale:C=7,waveScale:P=4,falloff:k=5,brightness:b=5,ambient:y=0,color:R="#3366ff",hotColor:S="#bfd4ff",backgroundColor:M="#0a0a0a",gamma:F=2.2,vignette:G=0,opacity:W=1,cursorInteraction:B=!0,cursorPull:A=.35,cursorGlow:I=.25,cursorReach:E=.28,adaptiveQuality:j=!0,targetFps:D=60,dpr:_=2,paused:H=!1})=>{let N=(0,u.useRef)(null),O=(0,u.useRef)({x:.5,y:.5,reach:0,toReach:0}),[L,Q]=(0,u.useState)(!1),V=(0,u.useSyncExternalStore)(v,m,()=>1);(0,u.useEffect)(()=>{let e=N.current;if(!e)return;let a=new IntersectionObserver(([e])=>Q(e.isIntersecting),{rootMargin:"120px"});return a.observe(e),()=>a.disconnect()},[]);let z=(0,u.useCallback)(()=>O.current,[]),Y=(0,u.useCallback)(e=>{let a=N.current;if(!a)return;let l=a.getBoundingClientRect();l.width&&l.height&&(O.current.x=(e.clientX-l.left)/l.width,O.current.y=(e.clientY-l.top)/l.height,O.current.toReach=1)},[]),q=(0,u.useCallback)(()=>{O.current.toReach=0},[]),T=(0,u.useMemo)(()=>s(Math.min(V,_),.5,2),[V,_]);return(0,t.jsxs)("div",{ref:N,className:(0,i.cn)("relative overflow-hidden",l),style:{width:e,height:a,backgroundColor:h(M)?void 0:M},onPointerMove:B?Y:void 0,onPointerLeave:B?q:void 0,children:[(0,t.jsx)(o.Hl,{className:"absolute inset-0",dpr:T,frameloop:L?"always":"demand",gl:{antialias:!1,alpha:!0,powerPreference:"high-performance"},orthographic:!0,children:(0,t.jsx)(p,{ceiling:T,readPointer:z,pitch:n,fill:c,shape:f,feather:d,speed:w,warp:x,warpScale:g,detailScale:C,waveScale:P,falloff:k,brightness:b,ambient:y,color:R,hotColor:S,backgroundColor:M,gamma:F,vignette:G,opacity:W,cursorInteraction:B,cursorPull:A,cursorGlow:I,cursorReach:E,adaptiveQuality:j,targetFps:D,paused:H})}),r?(0,t.jsx)("div",{className:"relative z-10 h-full w-full",children:r}):null]})}}}]);