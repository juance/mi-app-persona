"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[84],{3280:(e,r,a)=>{a.d(r,{GF:()=>o,Uh:()=>t,bJ:()=>n});const o=(e,r)=>{if(!e||!e.length)return;const a=Object.keys(e[0]),o=[a.join(","),...e.map((e=>a.map((r=>{const a=e[r];return null===a||void 0===a?"":"object"===typeof a?`"${JSON.stringify(a).replace(/"/g,'""')}"`:"string"===typeof a?`"${a.replace(/"/g,'""')}"`:String(a)})).join(",")))].join("\\n"),t=new Blob([o],{type:"text/csv;charset=utf-8;"}),n=document.createElement("a"),i=URL.createObjectURL(t);n.setAttribute("href",i),n.setAttribute("download",`${r}.csv`),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n)},t=(e,r)=>{if(!e)return;const a=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),o=document.createElement("a"),t=URL.createObjectURL(a);o.setAttribute("href",t),o.setAttribute("download",`${r}.json`),o.style.visibility="hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o)},n=(e,r)=>{o(e,r.replace(/\.xlsx$/,""))}},8084:(e,r,a)=>{a.r(r),a.d(r,{default:()=>qr});var o=a(5043),t=a(5464),n=a(5772),i=a(579);const s=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,l=(t.Ay.div`
  margin-bottom: 20px;
`,t.Ay.h3`
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 8px;
`,t.Ay.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 1.2rem;
`,t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
  }
`),c=t.Ay.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
`,d=t.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${e=>{switch(e.type){case"income":return"rgba(16, 185, 129, 0.1)";case"expense":return"rgba(239, 68, 68, 0.1)";default:return"rgba(99, 102, 241, 0.1)"}}};
  color: ${e=>{switch(e.type){case"income":return"var(--secondary-color)";case"expense":return"var(--danger-color)";default:return"var(--primary-color)"}}};
  font-size: 1.2rem;
`,p=t.Ay.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-medium);
`,u=t.Ay.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${e=>{switch(e.type){case"income":return"var(--secondary-color)";case"expense":return"var(--danger-color)";default:return"var(--primary-color)"}}};
`,x=t.Ay.div`
  font-size: 1rem;
  color: var(--text-light);
`,m=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ARS";return new Intl.NumberFormat("es-AR",{style:"currency",currency:r}).format(e)},g=e=>{let{transactions:r,exchangeRate:a=1.1}=e;const[g,h]=(0,o.useState)("total"),v=r.filter((e=>"income"===e.type)).reduce(((e,r)=>e+r.amount),0),f=r.filter((e=>"expense"===e.type)).reduce(((e,r)=>e+r.amount),0),y=v-f,b=y*a,j=v*a,w=f*a,k=r.filter((e=>{var r;return(null===(r=e.platform)||void 0===r?void 0:r.toLowerCase().includes("efectivo"))||!e.platform})),C=r.filter((e=>e.platform&&!e.platform.toLowerCase().includes("efectivo"))),S=k.filter((e=>"income"===e.type)).reduce(((e,r)=>e+r.amount),0),A=k.filter((e=>"expense"===e.type)).reduce(((e,r)=>e+r.amount),0),E=S-A,z=C.filter((e=>"income"===e.type)).reduce(((e,r)=>e+r.amount),0),T=C.filter((e=>"expense"===e.type)).reduce(((e,r)=>e+r.amount),0),I=z-T;let D,N,P,$,M,O;switch(g){case"cash":D=E,N=S,P=A,$=E*a,M=S*a,O=A*a;break;case"digital":D=I,N=z,P=T,$=I*a,M=z*a,O=T*a;break;default:D=y,N=v,P=f,$=b,M=j,O=w}const R=t.Ay.div`
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  `,_=t.Ay.button`
    background: none;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: ${e=>e.active?"600":"400"};
    color: ${e=>e.active?"var(--primary-color)":"var(--text-medium)"};
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${e=>e.active?"var(--primary-color)":"transparent"};
      transition: background-color var(--transition-speed);
    }

    &:hover {
      color: var(--primary-color);
    }
  `;return(0,i.jsxs)("div",{children:[(0,i.jsxs)(R,{children:[(0,i.jsxs)(_,{active:"total"===g,onClick:()=>h("total"),children:[(0,i.jsx)(n.z8N,{}),"Total"]}),(0,i.jsxs)(_,{active:"cash"===g,onClick:()=>h("cash"),children:[(0,i.jsx)(n.Yok,{}),"Efectivo"]}),(0,i.jsxs)(_,{active:"digital"===g,onClick:()=>h("digital"),children:[(0,i.jsx)(n.lZI,{}),"Billeteras Virtuales"]})]}),(0,i.jsxs)(s,{children:[(0,i.jsxs)(l,{children:[(0,i.jsxs)(c,{children:[(0,i.jsx)(d,{type:"balance",children:(0,i.jsx)(n.z8N,{})}),(0,i.jsx)(p,{children:"Balance"})]}),(0,i.jsx)(u,{type:"balance",children:m(D)}),(0,i.jsx)(x,{children:m($,"USD")})]}),(0,i.jsxs)(l,{children:[(0,i.jsxs)(c,{children:[(0,i.jsx)(d,{type:"income",children:(0,i.jsx)(n.ei4,{})}),(0,i.jsx)(p,{children:"Ingresos"})]}),(0,i.jsx)(u,{type:"income",children:m(N)}),(0,i.jsx)(x,{children:m(M,"USD")})]}),(0,i.jsxs)(l,{children:[(0,i.jsxs)(c,{children:[(0,i.jsx)(d,{type:"expense",children:(0,i.jsx)(n.LPr,{})}),(0,i.jsx)(p,{children:"Gastos"})]}),(0,i.jsx)(u,{type:"expense",children:m(P)}),(0,i.jsx)(x,{children:m(O,"USD")})]})]})]})};var h=a(1547);const v=function(){let{threshold:e=50,velocityThreshold:r=.3,onSwipeLeft:a=()=>{},onSwipeRight:t=()=>{},onSwipeUp:n=()=>{},onSwipeDown:i=()=>{},onTap:s=()=>{},onDoubleTap:l=()=>{},onLongPress:c=()=>{}}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const[d,p]=(0,o.useState)({x:0,y:0,time:0}),[u,x]=(0,o.useState)({x:0,y:0,time:0}),[m,g]=(0,o.useState)(!1),h=(0,o.useRef)(0),v=(0,o.useRef)(null);(0,o.useEffect)((()=>()=>{v.current&&clearTimeout(v.current)}),[]);return{gestureHandlers:{onTouchStart:e=>{const r=e.touches[0],a=Date.now();p({x:r.clientX,y:r.clientY,time:a}),x({x:r.clientX,y:r.clientY,time:a}),g(!0),v.current=setTimeout((()=>{c(e)}),500)},onTouchMove:e=>{const r=e.touches[0],a=Date.now();x({x:r.clientX,y:r.clientY,time:a}),(Math.abs(r.clientX-d.x)>10||Math.abs(r.clientY-d.y)>10)&&v.current&&(clearTimeout(v.current),v.current=null)},onTouchEnd:o=>{const c=Date.now();g(!1),v.current&&(clearTimeout(v.current),v.current=null);const p=u.x-d.x,x=u.y-d.y,m=u.time-d.time||1,f=Math.sqrt(p*p+x*x)/m;if(Math.abs(p)>e||Math.abs(x)>e||f>r)Math.abs(p)>Math.abs(x)?p>0?t(o):a(o):x>0?i(o):n(o);else{c-h.current<300?(l(o),h.current=0):(s(o),h.current=c)}},onTouchCancel:()=>{g(!1),v.current&&(clearTimeout(v.current),v.current=null)}},touchStart:d,touchEnd:u,isTouching:m}},f=t.Ay.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;
  user-select: none;
`,y=(0,t.Ay)(h.CS.div)`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 16px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
`,b=t.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: white;
  background-color: var(--success-color);
  border-radius: var(--border-radius);
`,j=t.Ay.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: white;
  background-color: var(--danger-color);
  border-radius: var(--border-radius);
`,w=e=>{let{children:r,leftAction:a,rightAction:t,onSwipeLeft:n,onSwipeRight:s,onTap:l,style:c,...d}=e;const[p,u]=(0,o.useState)(!1),[{x:x},m]=(0,h.zh)((()=>({x:0,config:{tension:300,friction:20}}))),{gestureHandlers:g}=v({threshold:80,velocityThreshold:.5,onSwipeLeft:()=>{t&&n?(m.start({x:-200}),u(!0),setTimeout((()=>{n()}),300)):m.start({x:0})},onSwipeRight:()=>{a&&s?(m.start({x:200}),u(!0),setTimeout((()=>{s()}),300)):m.start({x:0})},onTap:()=>{l&&l()}});return(0,i.jsxs)(f,{...d,children:[a&&(0,i.jsx)(b,{children:a}),t&&(0,i.jsx)(j,{children:t}),(0,i.jsx)(y,{style:{...c,transform:x.to((e=>`translateX(${e}px)`))},...g,onTouchMove:e=>{if(p)return;g.onTouchMove(e);const r=e.touches[0].clientX-g.touchStart.x;r>0&&!a||r<0&&!t||Math.abs(r)>200||m.start({x:r})},children:r})]})};var k=a(7607);const C=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`,S=t.Ay.span`
  font-size: 0.9rem;
  color: var(--text-medium);
  cursor: pointer;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--primary-color);
  }
`,A=t.Ay.div`
  position: absolute;
  bottom: -30px;
  left: 0;
  background-color: var(--card-bg);
  padding: 4px 8px;
  border-radius: var(--border-radius);
  font-size: 0.8rem;
  color: var(--text-medium);
  box-shadow: var(--card-shadow);
  z-index: 10;
  white-space: nowrap;
`,E=(0,t.Ay)(n.jTZ)`
  font-size: 0.9rem;
  animation: ${e=>e.isLoading?"spin 1s linear infinite":"none"};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,z=e=>{let{amount:r,fromCurrency:a,toCurrency:t}=e;const[n,s]=(0,o.useState)(null),[l,c]=(0,o.useState)(!0),[d,p]=(0,o.useState)(!1),[u,x]=(0,o.useState)(null);(0,o.useEffect)((()=>{(async()=>{try{c(!0);const e=await(0,k.Ej)(a,t);x(e);const o=await(0,k.hZ)(r,a,t);s(o)}catch(e){console.error("Error al convertir moneda:",e)}finally{c(!1)}})()}),[r,a,t]);const m=async e=>{e.stopPropagation();try{c(!0),localStorage.removeItem("exchange_rates");const e=await(0,k.Ej)(a,t);x(e);const o=await(0,k.hZ)(r,a,t);s(o)}catch(o){console.error("Error al actualizar tasa de cambio:",o)}finally{c(!1)}};return a===t?null:(0,i.jsxs)(C,{children:[(0,i.jsx)(S,{onClick:()=>p(!d),onMouseEnter:()=>p(!0),onMouseLeave:()=>p(!1),role:"button",tabIndex:0,"aria-label":`Valor convertido: ${n?(0,k.vv)(n,t):"Cargando..."}`,"aria-expanded":d,onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(p(!d),e.preventDefault())},children:l?(0,i.jsx)(E,{isLoading:!0,"aria-hidden":"true"}):(0,i.jsxs)(i.Fragment,{children:["(",(0,k.vv)(n,t),")",(0,i.jsx)(E,{onClick:e=>{e.stopPropagation(),m(e)},onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(m(e),e.preventDefault())},style:{marginLeft:"4px",cursor:"pointer"},role:"button",tabIndex:0,"aria-label":"Actualizar tasa de cambio"})]})}),d&&u&&(0,i.jsxs)(A,{role:"tooltip",children:["1 ",a," = ",u.toFixed(2)," ",t]})]})},T=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--card-shadow-hover);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,I=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,D=t.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${e=>"income"===e.type?"rgba(16, 185, 129, 0.1)":"rgba(239, 68, 68, 0.1)"};
  color: ${e=>"income"===e.type?"var(--secondary-color)":"var(--danger-color)"};
  font-size: 1.2rem;
`,N=t.Ay.div`
  display: flex;
  flex-direction: column;
`,P=t.Ay.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
`,$=t.Ay.span`
  font-size: 0.85rem;
  color: var(--text-medium);
  margin-top: 4px;
`,M=t.Ay.span`
  font-size: 0.85rem;
  color: ${e=>"cash"===e.type?"var(--accent-color)":"var(--primary-color)"};
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`,O=t.Ay.span`
  font-size: 0.85rem;
  color: var(--text-light);
  margin-top: 4px;
`,R=t.Ay.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${e=>"income"===e.type?"var(--secondary-color)":"var(--danger-color)"};
`,_=t.Ay.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    margin-left: auto;
  }
`,F=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,L=t.Ay.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed);

  &:hover {
    color: ${e=>e.color||"var(--primary-color)"};
    background-color: rgba(0, 0, 0, 0.05);
  }
`,U=t.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  height: 100%;
  width: 80px;
  color: white;
`,G=(0,t.Ay)(U)`
  background-color: var(--danger-color);
`,J=(0,t.Ay)(U)`
  background-color: var(--primary-color);
`,Y=e=>{let{transaction:r,onEdit:a,onDelete:t}=e;const{id:s,title:l,amount:c,type:d,category:p,platform:u,date:x,currency:m="ARS"}=r,{type:g,name:h}=(e=>{if(!e)return{type:"virtual",name:""};if(e.includes(":")){const[r,a]=e.split(":");return{type:r,name:a}}try{const r=localStorage.getItem("cashPlatforms");return r&&JSON.parse(r).includes(e)||["Efectivo","Caja chica","Caja fuerte"].includes(e)?{type:"cash",name:e}:{type:"virtual",name:e}}catch(r){return console.error("Error al determinar tipo de plataforma:",r),{type:"virtual",name:e}}})(u),v=(0,o.useCallback)((()=>{a(r)}),[r,a]),f=(0,o.useCallback)((()=>{t(s)}),[s,t]),y=(0,o.useMemo)((()=>new Date(x).toLocaleDateString("es-ES")),[x]),b=(0,o.useMemo)((()=>(0,k.vv)(c,m)),[c,m]),j=(0,o.useMemo)((()=>(e=>{let r=[],a=[];try{const e=localStorage.getItem("expenseCategories"),o=localStorage.getItem("incomeCategories");e&&(r=JSON.parse(e)),o&&(a=JSON.parse(o))}catch(t){console.error("Error al cargar categor\xedas:",t)}const o=[...r,...a].find((r=>r.id===e));return o?o.name:{food:"Alimentaci\xf3n",transport:"Transporte",housing:"Vivienda",entertainment:"Entretenimiento",utilities:"Servicios",health:"Salud",education:"Educaci\xf3n",shopping:"Compras",salary:"Salario",investment:"Inversi\xf3n",gift:"Regalo",other:"Otro"}[e]||e})(p)),[p]);return(0,o.useMemo)((()=>window.innerWidth<=768),[])?(0,i.jsx)(w,{leftAction:(0,i.jsx)(J,{children:(0,i.jsx)(n.WXf,{})}),rightAction:(0,i.jsx)(G,{children:(0,i.jsx)(n.IXo,{})}),onSwipeLeft:f,onSwipeRight:v,onTap:v,children:(0,i.jsxs)(I,{children:[(0,i.jsx)(D,{type:d,children:"income"===d?(0,i.jsx)(n.ei4,{}):(0,i.jsx)(n.LPr,{})}),(0,i.jsxs)(N,{children:[(0,i.jsx)(P,{children:l}),(0,i.jsx)($,{children:j}),u&&(0,i.jsxs)(M,{type:g,children:["cash"===g?(0,i.jsx)(n.z8N,{}):(0,i.jsx)(n.lZI,{}),h]}),(0,i.jsx)(O,{children:y})]}),(0,i.jsxs)(R,{type:d,style:{marginLeft:"auto"},children:["income"===d?"+":"-"," ",b,"ARS"===m?(0,i.jsx)(z,{amount:parseFloat(c),fromCurrency:"ARS",toCurrency:"USD"}):(0,i.jsx)(z,{amount:parseFloat(c),fromCurrency:"USD",toCurrency:"ARS"})]})]})}):(0,i.jsxs)(T,{children:[(0,i.jsxs)(I,{children:[(0,i.jsx)(D,{type:d,children:"income"===d?(0,i.jsx)(n.ei4,{}):(0,i.jsx)(n.LPr,{})}),(0,i.jsxs)(N,{children:[(0,i.jsx)(P,{children:l}),(0,i.jsx)($,{children:j}),u&&(0,i.jsxs)(M,{type:g,children:["cash"===g?(0,i.jsx)(n.z8N,{}):(0,i.jsx)(n.lZI,{}),h]}),(0,i.jsx)(O,{children:y})]})]}),(0,i.jsxs)(F,{children:[(0,i.jsxs)(R,{type:d,children:["income"===d?"+":"-"," ",b,"ARS"===m?(0,i.jsx)(z,{amount:parseFloat(c),fromCurrency:"ARS",toCurrency:"USD"}):(0,i.jsx)(z,{amount:parseFloat(c),fromCurrency:"USD",toCurrency:"ARS"})]}),(0,i.jsxs)(_,{children:[(0,i.jsx)(L,{onClick:v,color:"var(--primary-color)","aria-label":"Editar",children:(0,i.jsx)(n.WXf,{})}),(0,i.jsx)(L,{onClick:f,color:"var(--danger-color)","aria-label":"Eliminar",children:(0,i.jsx)(n.IXo,{})})]})]})]})},q=(0,o.memo)(Y),B=function(e){let{initialPageSize:r=10,incrementSize:a=10,maxItems:t=100,loadOnMount:n=!0,dependencies:i=[]}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const[s,l]=(0,o.useState)([]),[c,d]=(0,o.useState)(!1),[p,u]=(0,o.useState)(null),[x,m]=(0,o.useState)(!0),[g,h]=(0,o.useState)(r),[v,f]=(0,o.useState)(0),y=(0,o.useRef)(!1),b=(0,o.useCallback)((async function(){let a=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!y.current)try{y.current=!0,d(!0),u(null),a&&(l([]),h(r),m(!0));const o=a?0:s.length,n=a?r:s.length+g,i=await e({start:o,end:n});l(a?i.data||[]:e=>[...e,...i.data||[]]),void 0!==i.count&&f(i.count);const c=a?(i.data||[]).length:s.length+(i.data||[]).length,p=void 0!==i.hasMore?i.hasMore:void 0!==i.count?c<i.count:(i.data||[]).length>0;m(p&&c<t)}catch(o){u(o)}finally{d(!1),y.current=!1}}),[e,s.length,g,r,t]),j=(0,o.useCallback)((()=>{!c&&x&&(h((e=>e+a)),b())}),[c,x,a,b]),w=(0,o.useCallback)((()=>b(!0)),[b]);return(0,o.useEffect)((()=>{n&&w()}),[n,w,...i]),{data:s,loading:c,error:p,hasMore:x,loadMore:j,refresh:w,totalCount:v,loadedCount:s.length}},V=t.Ay.div`
  position: relative;
`,X=t.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: var(--text-medium);
  
  svg {
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,W=t.Ay.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 8px 16px;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 16px auto;
  display: block;
  transition: all 0.3s;
  
  &:hover {
    background-color: var(--primary-color-dark);
  }
  
  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
  }
`,Z=t.Ay.div`
  color: var(--danger-color);
  text-align: center;
  padding: 16px;
  margin: 16px 0;
  background-color: rgba(255, 99, 132, 0.1);
  border-radius: var(--border-radius);
`,H=t.Ay.div`
  text-align: center;
  padding: 32px 16px;
  color: var(--text-medium);
`,K=e=>{let{fetchFunction:r,renderItem:a,keyExtractor:t,initialPageSize:s=10,incrementSize:l=10,useInfiniteScroll:c=!0,emptyMessage:d="No hay elementos para mostrar",loadingMessage:p="Cargando...",errorMessage:u="Error al cargar los datos",loadMoreText:x="Cargar m\xe1s",dependencies:m=[],...g}=e;const h=(0,o.useRef)(null),{data:v,loading:f,error:y,hasMore:b,loadMore:j,refresh:w,totalCount:k,loadedCount:C}=B(r,{initialPageSize:s,incrementSize:l,loadOnMount:!0,dependencies:m});(0,o.useEffect)((()=>{if(!c||!h.current||f||!b)return;const e=new IntersectionObserver((e=>{e[0].isIntersecting&&j()}),{threshold:.1});return e.observe(h.current),()=>{h.current&&e.unobserve(h.current)}}),[c,f,b,j]);const S=(0,o.useCallback)((()=>0!==v.length||f?v.map(((e,r)=>(0,i.jsx)(o.Fragment,{children:a(e,r)},t?t(e):r))):(0,i.jsx)(H,{children:d})),[v,f,d,a,t]);return(0,i.jsxs)(V,{...g,children:[S(),y&&(0,i.jsxs)(Z,{children:[u,": ",y.message]}),f&&(0,i.jsxs)(X,{children:[(0,i.jsx)(n.TwU,{})," ",p]}),!c&&b&&!f&&(0,i.jsx)(W,{onClick:j,disabled:f,children:x}),c&&b&&(0,i.jsx)("div",{ref:h,style:{height:"20px"}}),k>0&&(0,i.jsxs)("div",{style:{textAlign:"center",color:"var(--text-light)",fontSize:"0.9rem",margin:"8px 0"},children:["Mostrando ",C," de ",k," elementos"]})]})};var Q=a(1301);const ee=function(e,r,a){let t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];const n=(0,o.useMemo)((()=>e.map((e=>r(e)))),[e,r]);return(0,o.useMemo)((()=>e.map((e=>a(e)))),[e,a,n,...t])};var re=a(8670);const ae=t.Ay.div`
  margin-top: 20px;
`,oe=t.Ay.div`
  text-align: center;
  color: var(--text-light);
  font-style: italic;
  padding: 30px 0;
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
`,te=(t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: var(--text-medium);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`,t.Ay.span`
  font-weight: 500;
`,(0,o.memo)(q)),ne=e=>{let{transactions:r,onEditTransaction:a,onDeleteTransaction:t,filters:n={},sortConfig:s={column:"date",direction:"desc"},useProgressiveLoading:l=!0}=e;const c=(0,o.useCallback)((async e=>{let{start:a,end:o}=e;try{return r?{data:r.slice(a,o),count:r.length,hasMore:r.length>o}:await(0,Q.j3)({start:a,end:o,filters:n,sort:{column:s.column||"date",direction:s.direction||"desc"}})}catch(t){return console.error("Error fetching transactions:",t),{data:[],count:0,hasMore:!1}}}),[r,n,s]),d=(0,o.useCallback)((e=>(0,i.jsx)(te,{transaction:e,onEdit:a,onDelete:t},e.id)),[a,t]),p=(0,o.useCallback)((e=>e.id),[]),u=ee(r||[],p,d,[a,t]);return!l&&r?r&&0!==r.length?(0,i.jsx)(ae,{children:u}):(0,i.jsx)(ae,{children:(0,i.jsx)(oe,{children:"No hay transacciones. \xa1Registra una nueva!"})}):(0,i.jsx)(ae,{children:(0,i.jsx)(K,{fetchFunction:c,renderItem:d,keyExtractor:p,initialPageSize:10,incrementSize:10,useInfiniteScroll:!0,emptyMessage:"No hay transacciones. \xa1Registra una nueva!",loadingMessage:"Cargando transacciones...",errorMessage:"Error al cargar las transacciones",loadMoreText:"Cargar m\xe1s transacciones",dependencies:[n,s]})})},ie=(0,o.memo)(ne),se=t.Ay.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,le=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,ce=t.Ay.h3`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 2px;
  }
`,de=t.Ay.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--danger-color);
    background-color: rgba(239, 68, 68, 0.1);
  }
`,pe=t.Ay.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`,ue=t.Ay.button`
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: ${e=>e.active?"600":"400"};
  color: ${e=>e.active?"var(--primary-color)":"var(--text-medium)"};
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${e=>e.active?"var(--primary-color)":"transparent"};
    transition: background-color var(--transition-speed);
  }

  &:hover {
    color: var(--primary-color);
  }
`,xe=t.Ay.div`
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
`,me=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all var(--transition-speed);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
`,ge=t.Ay.div`
  font-weight: 500;
  color: var(--text-dark);
`,he=t.Ay.div`
  display: flex;
  gap: 8px;
`,ve=t.Ay.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed);

  &:hover {
    color: ${e=>e.color||"var(--primary-color)"};
    background-color: rgba(0, 0, 0, 0.05);
  }
`,fe=t.Ay.form`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`,ye=t.Ay.input`
  flex: 1;
  padding: 12px 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);
  transition: all var(--transition-speed);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`,be=t.Ay.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0 16px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
  }
`,je=t.Ay.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
  margin-top: 16px;
  width: 100%;

  &:hover {
    background-color: var(--secondary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
  }
`,we=t.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`,ke=t.Ay.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`,Ce=t.Ay.div`
  display: flex;
  gap: 4px;
`,Se=e=>{let{onClose:r,onCategoriesChange:a}=e;const[t,s]=(0,o.useState)("expense"),[l,c]=(0,o.useState)([{id:"food",name:"Alimentaci\xf3n"},{id:"transport",name:"Transporte"},{id:"housing",name:"Vivienda"},{id:"entertainment",name:"Entretenimiento"},{id:"utilities",name:"Servicios"},{id:"health",name:"Salud"},{id:"education",name:"Educaci\xf3n"},{id:"shopping",name:"Compras"},{id:"other",name:"Otro"}]),[d,p]=(0,o.useState)([{id:"salary",name:"Salario"},{id:"investment",name:"Inversi\xf3n"},{id:"gift",name:"Regalo"},{id:"other",name:"Otro"}]),[u,x]=(0,o.useState)(""),[m,g]=(0,o.useState)(null),[h,v]=(0,o.useState)("");(0,o.useEffect)((()=>{const e=localStorage.getItem("expenseCategories"),r=localStorage.getItem("incomeCategories");e&&c(JSON.parse(e)),r&&p(JSON.parse(r))}),[]);const f=()=>{g(null),v("")},y="expense"===t?l:d;return(0,i.jsxs)(se,{children:[(0,i.jsxs)(le,{children:[(0,i.jsx)(ce,{children:"Gestionar Categor\xedas"}),(0,i.jsx)(de,{onClick:r,children:(0,i.jsx)(n.yGN,{})})]}),(0,i.jsxs)(pe,{children:[(0,i.jsx)(ue,{active:"expense"===t,onClick:()=>s("expense"),children:"Categor\xedas de Gastos"}),(0,i.jsx)(ue,{active:"income"===t,onClick:()=>s("income"),children:"Categor\xedas de Ingresos"})]}),(0,i.jsx)(xe,{children:y.map((e=>(0,i.jsx)(me,{children:m===e.id?(0,i.jsxs)(we,{children:[(0,i.jsx)(ke,{type:"text",value:h,onChange:e=>v(e.target.value),autoFocus:!0}),(0,i.jsxs)(Ce,{children:[(0,i.jsx)(ve,{onClick:()=>(e=>{if(h.trim()){if("expense"===t){if(l.some((r=>r.id!==e&&r.name===h)))return void alert("Ya existe una categor\xeda con este nombre");c(l.map((r=>r.id===e?{...r,name:h}:r)))}else{if(d.some((r=>r.id!==e&&r.name===h)))return void alert("Ya existe una categor\xeda con este nombre");p(d.map((r=>r.id===e?{...r,name:h}:r)))}g(null),v("")}})(e.id),color:"var(--secondary-color)",children:(0,i.jsx)(n.YrT,{})}),(0,i.jsx)(ve,{onClick:f,color:"var(--danger-color)",children:(0,i.jsx)(n.yGN,{})})]})]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(ge,{children:e.name}),(0,i.jsxs)(he,{children:[(0,i.jsx)(ve,{onClick:()=>(e=>{g(e.id),v(e.name)})(e),color:"var(--primary-color)",disabled:"other"===e.id,children:(0,i.jsx)(n.WXf,{})}),(0,i.jsx)(ve,{onClick:()=>{var r;"other"!==(r=e.id)?window.confirm("\xbfEst\xe1s seguro de que deseas eliminar esta categor\xeda?")&&("expense"===t?c(l.filter((e=>e.id!==r))):p(d.filter((e=>e.id!==r)))):alert('No se puede eliminar la categor\xeda "Otro"')},color:"var(--danger-color)",disabled:"other"===e.id,children:(0,i.jsx)(n.IXo,{})})]})]})},e.id)))}),(0,i.jsxs)(fe,{onSubmit:e=>{if(e.preventDefault(),!u.trim())return;const r=u.toLowerCase().replace(/\s+/g,"_");if("expense"===t){if(l.some((e=>e.id===r||e.name===u)))return void alert("Esta categor\xeda ya existe");c([...l,{id:r,name:u}])}else{if(d.some((e=>e.id===r||e.name===u)))return void alert("Esta categor\xeda ya existe");p([...d,{id:r,name:u}])}x("")},children:[(0,i.jsx)(ye,{type:"text",placeholder:"Nueva categor\xeda...",value:u,onChange:e=>x(e.target.value)}),(0,i.jsx)(be,{type:"submit",children:(0,i.jsx)(n.GGD,{})})]}),(0,i.jsxs)(je,{onClick:()=>{try{localStorage.setItem("expenseCategories",JSON.stringify(l)),localStorage.setItem("incomeCategories",JSON.stringify(d)),a({expense:l,income:d}),alert("Categor\xedas guardadas correctamente")}catch(e){console.error("Error al guardar categor\xedas:",e),alert("Error al guardar categor\xedas")}},children:[(0,i.jsx)(n.Bc_,{}),"Guardar Cambios"]})]})},Ae=t.Ay.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,Ee=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,ze=t.Ay.h3`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.1rem;
  font-weight: 600;
`,Te=t.Ay.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--text-dark);
    background-color: rgba(0, 0, 0, 0.05);
  }
`,Ie=t.Ay.div`
  margin-bottom: 24px;
`,De=t.Ay.h4`
  margin: 0 0 12px 0;
  color: var(--text-dark);
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${e=>"cash"===e.type?"var(--accent-color)":"var(--primary-color)"};
  }
`,Ne=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,Pe=t.Ay.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  margin-bottom: 8px;
  transition: all var(--transition-speed);

  &:hover {
    background-color: var(--bg-medium);
  }
`,$e=t.Ay.span`
  color: var(--text-dark);
  font-size: 0.95rem;
`,Me=t.Ay.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--danger-color);
    background-color: rgba(239, 68, 68, 0.1);
  }
`,Oe=t.Ay.form`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`,Re=t.Ay.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`,_e=t.Ay.select`
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`,Fe=t.Ay.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all var(--transition-speed);

  &:hover {
    background-color: var(--primary-dark);
  }

  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
  }
`,Le=t.Ay.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
  margin-top: 16px;
  width: 100%;

  &:hover {
    background-color: var(--secondary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
  }
`,Ue={cash:["Efectivo","Caja chica","Caja fuerte"],virtual:["Mercado Pago","Banco Naci\xf3n","Banco Galicia","Ual\xe1","Brubank","Naranja X","Prex"]},Ge=e=>{let{onClose:r,onPlatformsChange:a}=e;const[t,s]=(0,o.useState)({cash:[],virtual:[]}),[l,c]=(0,o.useState)(""),[d,p]=(0,o.useState)("virtual");(0,o.useEffect)((()=>{try{const e=localStorage.getItem("cashPlatforms"),r=localStorage.getItem("virtualPlatforms"),a=e?JSON.parse(e):Ue.cash,o=r?JSON.parse(r):Ue.virtual;s({cash:a,virtual:o})}catch(e){console.error("Error al cargar plataformas:",e),s(Ue)}}),[]);const u=(e,r)=>{s((a=>({...a,[e]:a[e].filter(((e,a)=>a!==r))})))};return(0,i.jsxs)(Ae,{children:[(0,i.jsxs)(Ee,{children:[(0,i.jsx)(ze,{children:"Gestionar Plataformas"}),(0,i.jsx)(Te,{onClick:r,children:(0,i.jsx)(n.yGN,{})})]}),(0,i.jsxs)(Ie,{children:[(0,i.jsx)(De,{type:"cash",children:"Efectivo"}),(0,i.jsx)(Ne,{children:t.cash.map(((e,r)=>(0,i.jsxs)(Pe,{children:[(0,i.jsx)($e,{children:e}),(0,i.jsx)(Me,{onClick:()=>u("cash",r),children:(0,i.jsx)(n.IXo,{})})]},r)))})]}),(0,i.jsxs)(Ie,{children:[(0,i.jsx)(De,{type:"virtual",children:"Billeteras Virtuales"}),(0,i.jsx)(Ne,{children:t.virtual.map(((e,r)=>(0,i.jsxs)(Pe,{children:[(0,i.jsx)($e,{children:e}),(0,i.jsx)(Me,{onClick:()=>u("virtual",r),children:(0,i.jsx)(n.IXo,{})})]},r)))})]}),(0,i.jsxs)(Oe,{onSubmit:e=>{e.preventDefault(),l.trim()&&(s((e=>({...e,[d]:[...e[d],l.trim()]}))),c(""))},children:[(0,i.jsxs)(_e,{value:d,onChange:e=>p(e.target.value),children:[(0,i.jsx)("option",{value:"cash",children:"Efectivo"}),(0,i.jsx)("option",{value:"virtual",children:"Billetera Virtual"})]}),(0,i.jsx)(Re,{type:"text",placeholder:"Nombre de la plataforma",value:l,onChange:e=>c(e.target.value)}),(0,i.jsxs)(Fe,{type:"submit",disabled:!l.trim(),children:[(0,i.jsx)(n.GGD,{}),"Agregar"]})]}),(0,i.jsxs)(Le,{onClick:()=>{try{localStorage.setItem("cashPlatforms",JSON.stringify(t.cash)),localStorage.setItem("virtualPlatforms",JSON.stringify(t.virtual)),a&&a(t),alert("Plataformas guardadas correctamente")}catch(e){console.error("Error al guardar plataformas:",e),alert("Error al guardar plataformas")}},children:[(0,i.jsx)(n.Bc_,{}),"Guardar Cambios"]}),(0,i.jsx)("div",{style:{marginTop:"16px",textAlign:"right"},children:(0,i.jsx)("button",{onClick:()=>{s(Ue)},style:{background:"none",border:"none",color:"var(--text-medium)",textDecoration:"underline",cursor:"pointer",fontSize:"0.9rem"},children:"Restaurar valores predeterminados"})})]})},Je=t.Ay.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,Ye=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,qe=t.Ay.h3`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 2px;
  }
`,Be=t.Ay.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--danger-color);
    background-color: rgba(239, 68, 68, 0.1);
  }
`,Ve=t.Ay.div`
  color: var(--danger-color);
  margin-bottom: 16px;
  font-size: 0.9rem;
  padding: 12px;
  background-color: rgba(239, 68, 68, 0.08);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--danger-color);
`,Xe=t.Ay.div`
  margin-bottom: 20px;
  position: relative;
`,We=t.Ay.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-medium);
  font-size: 0.95rem;

  &::after {
    content: ' *';
    color: var(--danger-color);
    display: ${e=>e.required?"inline":"none"};
  }
`,Ze=t.Ay.input`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);
  transition: all var(--transition-speed);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`,He=t.Ay.select`
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);
  transition: all var(--transition-speed);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`,Ke=t.Ay.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`,Qe=t.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: var(--border-radius);
  transition: all var(--transition-speed);
  background-color: ${e=>e.checked?"income"===e.type?"rgba(16, 185, 129, 0.1)":"rgba(239, 68, 68, 0.1)":"transparent"};
  border: 1px solid ${e=>e.checked?"income"===e.type?"var(--secondary-color)":"var(--danger-color)":"rgba(0, 0, 0, 0.1)"};
  color: ${e=>e.checked?"income"===e.type?"var(--secondary-color)":"var(--danger-color)":"var(--text-medium)"};
  font-weight: ${e=>e.checked?"500":"normal"};

  &:hover {
    background-color: ${e=>"income"===e.type?"rgba(16, 185, 129, 0.05)":"rgba(239, 68, 68, 0.05)"};
  }
`,er=t.Ay.input`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid ${e=>"income"===e.value?"var(--secondary-color)":"var(--danger-color)"};
  border-radius: 50%;
  margin: 0;
  display: grid;
  place-content: center;
  position: relative;
  cursor: pointer;

  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.1s ease-in-out;
    background-color: ${e=>"income"===e.value?"var(--secondary-color)":"var(--danger-color)"};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
  }

  &:checked::before {
    transform: translate(-50%, -50%) scale(1);
  }
`,rr=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,ar=t.Ay.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  flex: 1;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(99, 102, 241, 0.3);
  }
`,or=t.Ay.button`
  background-color: var(--bg-medium);
  color: var(--text-medium);
  border: none;
  padding: 12px 20px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: var(--bg-dark);
    color: var(--text-light);
  }
`,tr=t.Ay.button`
  position: absolute;
  right: 0;
  top: 6px;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--primary-dark);
    background-color: rgba(99, 102, 241, 0.1);
  }
`,nr={title:"",amount:"",type:"expense",category:"other",platformType:"virtual",platform:"",currency:"ARS",date:(new Date).toISOString().split("T")[0]},ir=e=>{let{transaction:r,onSubmit:a,onCancel:t}=e;const[s,l]=(0,o.useState)(nr),[c,d]=(0,o.useState)(""),[p,u]=(0,o.useState)(!1),[x,m]=(0,o.useState)(!1),[g,h]=(0,o.useState)({expense:[{id:"food",name:"Alimentaci\xf3n"},{id:"transport",name:"Transporte"},{id:"housing",name:"Vivienda"},{id:"entertainment",name:"Entretenimiento"},{id:"utilities",name:"Servicios"},{id:"health",name:"Salud"},{id:"education",name:"Educaci\xf3n"},{id:"shopping",name:"Compras"},{id:"other",name:"Otro"}],income:[{id:"salary",name:"Salario"},{id:"investment",name:"Inversi\xf3n"},{id:"gift",name:"Regalo"},{id:"other",name:"Otro"}]}),[v,f]=(0,o.useState)({cash:[],virtual:[]}),y=!(null===r||void 0===r||!r.id);(0,o.useEffect)((()=>{const e=localStorage.getItem("expenseCategories"),r=localStorage.getItem("incomeCategories");e&&r&&h({expense:JSON.parse(e),income:JSON.parse(r)})}),[]),(0,o.useEffect)((()=>{const e=localStorage.getItem("cashPlatforms"),r=localStorage.getItem("virtualPlatforms"),a={cash:["Efectivo","Caja chica","Caja fuerte"],virtual:["Mercado Pago","Banco Naci\xf3n","Banco Galicia","Ual\xe1","Brubank","Naranja X","Prex"]};f({cash:e?JSON.parse(e):a.cash,virtual:r?JSON.parse(r):a.virtual})}),[]),(0,o.useEffect)((()=>{if(r){let e="virtual";if(r.platform){e=v.cash.includes(r.platform)?"cash":"virtual"}l({title:r.title||"",amount:r.amount||"",type:r.type||"expense",category:r.category||"other",platformType:e,platform:r.platform||"",currency:r.currency||"ARS",date:r.date||(new Date).toISOString().split("T")[0]})}else l(nr)}),[r,v]);const b=e=>{const{name:r,value:a}=e.target;l((e=>({...e,[r]:a})))};return(0,i.jsxs)(Je,{children:[(0,i.jsxs)(Ye,{children:[(0,i.jsx)(qe,{children:y?"Editar Transacci\xf3n":"Registrar Nueva Transacci\xf3n"}),(0,i.jsx)(Be,{onClick:t,children:(0,i.jsx)(n.yGN,{})})]}),p&&(0,i.jsx)(Se,{onClose:()=>u(!1),onCategoriesChange:e=>{h(e)}}),x&&(0,i.jsx)(Ge,{onClose:()=>m(!1),onPlatformsChange:e=>{f(e)}}),c&&(0,i.jsx)(Ve,{children:c}),(0,i.jsxs)("form",{onSubmit:e=>{e.preventDefault(),s.title.trim()?!s.amount||parseFloat(s.amount)<=0?d("Por favor ingresa un monto v\xe1lido."):(a({...s,id:null===r||void 0===r?void 0:r.id,amount:parseFloat(s.amount)}),y||l(nr),d("")):d("Por favor ingresa un t\xedtulo para la transacci\xf3n.")},children:[(0,i.jsxs)(Xe,{children:[(0,i.jsx)(We,{htmlFor:"type",required:!0,children:"Tipo de transacci\xf3n"}),(0,i.jsxs)(Ke,{children:[(0,i.jsxs)(Qe,{type:"expense",checked:"expense"===s.type,children:[(0,i.jsx)(er,{type:"radio",id:"type-expense",name:"type",value:"expense",checked:"expense"===s.type,onChange:b}),"Gasto"]}),(0,i.jsxs)(Qe,{type:"income",checked:"income"===s.type,children:[(0,i.jsx)(er,{type:"radio",id:"type-income",name:"type",value:"income",checked:"income"===s.type,onChange:b}),"Ingreso"]})]})]}),(0,i.jsxs)(Xe,{children:[(0,i.jsx)(We,{htmlFor:"title",required:!0,children:"Descripci\xf3n"}),(0,i.jsx)(Ze,{type:"text",id:"title",name:"title",value:s.title,onChange:b,placeholder:"Ej: Compra de comestibles",required:!0})]}),(0,i.jsxs)(Xe,{children:[(0,i.jsx)(We,{htmlFor:"currency",required:!0,children:"Moneda"}),(0,i.jsxs)(Ke,{children:[(0,i.jsxs)(Qe,{type:"currency",checked:"ARS"===s.currency,children:[(0,i.jsx)(er,{type:"radio",id:"currency-ars",name:"currency",value:"ARS",checked:"ARS"===s.currency,onChange:b}),"Pesos (ARS)"]}),(0,i.jsxs)(Qe,{type:"currency",checked:"USD"===s.currency,children:[(0,i.jsx)(er,{type:"radio",id:"currency-usd",name:"currency",value:"USD",checked:"USD"===s.currency,onChange:b}),"D\xf3lares (USD)"]})]})]}),(0,i.jsxs)(Xe,{children:[(0,i.jsxs)(We,{htmlFor:"amount",required:!0,children:["Monto (",s.currency,")"]}),(0,i.jsx)(Ze,{type:"number",id:"amount",name:"amount",value:s.amount,onChange:b,placeholder:"0.00",min:"0.01",step:"0.01",required:!0})]}),(0,i.jsxs)(Xe,{children:[(0,i.jsx)(We,{htmlFor:"category",required:!0,children:"Categor\xeda"}),(0,i.jsx)(tr,{type:"button",onClick:()=>u(!0),title:"Gestionar categor\xedas",children:(0,i.jsx)(n.VSk,{})}),(0,i.jsx)(He,{id:"category",name:"category",value:s.category,onChange:b,required:!0,children:"expense"===s.type?g.expense.map((e=>(0,i.jsx)("option",{value:e.id,children:e.name},e.id))):g.income.map((e=>(0,i.jsx)("option",{value:e.id,children:e.name},e.id)))})]}),(0,i.jsxs)(Xe,{children:[(0,i.jsx)(We,{htmlFor:"platformType",required:!0,children:"Tipo de plataforma"}),(0,i.jsxs)(Ke,{children:[(0,i.jsxs)(Qe,{type:"cash",checked:"cash"===s.platformType,children:[(0,i.jsx)(er,{type:"radio",id:"platformType-cash",name:"platformType",value:"cash",checked:"cash"===s.platformType,onChange:b}),(0,i.jsx)(n.z8N,{style:{marginRight:"4px"}}),"Efectivo"]}),(0,i.jsxs)(Qe,{type:"virtual",checked:"virtual"===s.platformType,children:[(0,i.jsx)(er,{type:"radio",id:"platformType-virtual",name:"platformType",value:"virtual",checked:"virtual"===s.platformType,onChange:b}),(0,i.jsx)(n.lZI,{style:{marginRight:"4px"}}),"Billeteras Virtuales"]})]})]}),(0,i.jsxs)(Xe,{children:[(0,i.jsx)(We,{htmlFor:"platform",required:!0,children:"Plataforma"}),(0,i.jsx)(tr,{type:"button",onClick:()=>m(!0),title:"Gestionar plataformas",children:(0,i.jsx)(n.VSk,{})}),(0,i.jsxs)(He,{id:"platform",name:"platform",value:s.platform,onChange:b,required:!0,children:[(0,i.jsx)("option",{value:"",children:"Seleccionar plataforma"}),"cash"===s.platformType?v.cash.map(((e,r)=>(0,i.jsx)("option",{value:e,children:e},r))):v.virtual.map(((e,r)=>(0,i.jsx)("option",{value:e,children:e},r)))]})]}),(0,i.jsxs)(Xe,{children:[(0,i.jsx)(We,{htmlFor:"date",required:!0,children:"Fecha"}),(0,i.jsx)(Ze,{type:"date",id:"date",name:"date",value:s.date,onChange:b,required:!0})]}),(0,i.jsxs)(rr,{children:[(0,i.jsx)(ar,{type:"submit",children:y?"Guardar Cambios":"Registrar Transacci\xf3n"}),(0,i.jsx)(or,{type:"button",onClick:t,children:"Cancelar"})]})]})]})},sr=t.Ay.div`
  background-color: var(--bg-medium);
  padding: 16px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
`,lr=t.Ay.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
  color: var(--text-medium);
  font-weight: 500;
  font-size: 0.95rem;
`,cr=(0,t.Ay)(n.K7R)`
  font-size: 1.1rem;
`,dr=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,pr=t.Ay.div`
  flex: 2;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`,ur=(0,t.Ay)(n.CKj)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  font-size: 1rem;
`,xr=t.Ay.input`
  width: 100%;
  padding: 10px 10px 10px 36px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);
  transition: all var(--transition-speed);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: var(--text-light);
  }
`,mr=t.Ay.div`
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`,gr=t.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);
  transition: all var(--transition-speed);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`,hr=t.Ay.div`
  display: flex;
  gap: 10px;
  flex: 2;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`,vr=t.Ay.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--card-bg);
  transition: all var(--transition-speed);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`,fr=e=>{let{filters:r,onFilterChange:a}=e;const[t,n]=(0,o.useState)({expense:[{id:"food",name:"Alimentaci\xf3n"},{id:"transport",name:"Transporte"},{id:"housing",name:"Vivienda"},{id:"entertainment",name:"Entretenimiento"},{id:"utilities",name:"Servicios"},{id:"health",name:"Salud"},{id:"education",name:"Educaci\xf3n"},{id:"shopping",name:"Compras"},{id:"other",name:"Otro"}],income:[{id:"salary",name:"Salario"},{id:"investment",name:"Inversi\xf3n"},{id:"gift",name:"Regalo"},{id:"other",name:"Otro"}]});(0,o.useEffect)((()=>{const e=localStorage.getItem("expenseCategories"),r=localStorage.getItem("incomeCategories");e&&r&&n({expense:JSON.parse(e),income:JSON.parse(r)})}),[]);const s=e=>{const{name:o,value:t}=e.target;a({...r,[o]:t})};return(0,i.jsxs)(sr,{children:[(0,i.jsxs)(lr,{children:[(0,i.jsx)(cr,{}),"Filtrar transacciones"]}),(0,i.jsxs)(dr,{children:[(0,i.jsxs)(pr,{children:[(0,i.jsx)(ur,{}),(0,i.jsx)(xr,{type:"text",placeholder:"Buscar transacciones...",name:"search",value:r.search||"",onChange:s})]}),(0,i.jsx)(mr,{children:(0,i.jsxs)(gr,{name:"type",value:r.type||"all",onChange:s,children:[(0,i.jsx)("option",{value:"all",children:"Todos los tipos"}),(0,i.jsx)("option",{value:"income",children:"Ingresos"}),(0,i.jsx)("option",{value:"expense",children:"Gastos"})]})}),(0,i.jsx)(mr,{children:(0,i.jsxs)(gr,{name:"category",value:r.category||"all",onChange:s,children:[(0,i.jsx)("option",{value:"all",children:"Todas las categor\xedas"}),(0,i.jsxs)("optgroup",{label:"Gastos",children:[(0,i.jsx)("option",{value:"food",children:"Alimentaci\xf3n"}),(0,i.jsx)("option",{value:"transport",children:"Transporte"}),(0,i.jsx)("option",{value:"housing",children:"Vivienda"}),(0,i.jsx)("option",{value:"entertainment",children:"Entretenimiento"}),(0,i.jsx)("option",{value:"utilities",children:"Servicios"}),(0,i.jsx)("option",{value:"health",children:"Salud"}),(0,i.jsx)("option",{value:"education",children:"Educaci\xf3n"}),(0,i.jsx)("option",{value:"shopping",children:"Compras"})]}),(0,i.jsxs)("optgroup",{label:"Ingresos",children:[(0,i.jsx)("option",{value:"salary",children:"Salario"}),(0,i.jsx)("option",{value:"investment",children:"Inversi\xf3n"}),(0,i.jsx)("option",{value:"gift",children:"Regalo"})]}),(0,i.jsx)("option",{value:"other",children:"Otro"})]})}),(0,i.jsxs)(hr,{children:[(0,i.jsx)(vr,{type:"date",name:"startDate",value:r.startDate||"",onChange:s,placeholder:"Fecha inicio"}),(0,i.jsx)(vr,{type:"date",name:"endDate",value:r.endDate||"",onChange:s,placeholder:"Fecha fin"})]}),(0,i.jsx)(mr,{children:(0,i.jsxs)(gr,{name:"sort",value:r.sort||"date_desc",onChange:s,children:[(0,i.jsx)("option",{value:"date_desc",children:"M\xe1s recientes primero"}),(0,i.jsx)("option",{value:"date_asc",children:"M\xe1s antiguas primero"}),(0,i.jsx)("option",{value:"amount_desc",children:"Mayor monto primero"}),(0,i.jsx)("option",{value:"amount_asc",children:"Menor monto primero"}),(0,i.jsx)("option",{value:"name_asc",children:"Nombre (A-Z)"}),(0,i.jsx)("option",{value:"name_desc",children:"Nombre (Z-A)"})]})})]})]})};var yr=a(372);const br=function(e,r){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{event:o="*",filter:t=""}=a;return yr.N.channel(`public:${e}`).on("postgres_changes",{event:o,schema:"public",table:e,filter:t},(e=>{r(e)})).subscribe()},jr=e=>{let{items:r,renderItem:a,keyExtractor:o=e=>e.id,config:t={tension:125,friction:20,precision:.1}}=e;const n=(0,h.pn)(r,{keys:o,from:{opacity:0,transform:"translate3d(0,40px,0)"},enter:{opacity:1,transform:"translate3d(0,0px,0)"},leave:{opacity:0,transform:"translate3d(0,-40px,0)"},config:t});return(0,i.jsx)(i.Fragment,{children:n(((e,r)=>(0,i.jsx)(h.CS.div,{style:e,children:a(r)})))})};var wr=a(6618),kr=a(5594),Cr=a(3280);const Sr=t.Ay.div`
  position: relative;
  display: inline-block;
`,Ar=(0,t.Ay)(re.A)`
  display: flex;
  align-items: center;
  gap: 8px;
`,Er=(0,t.Ay)(h.CS.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index: 100;
  min-width: 200px;
  overflow: hidden;
`,zr=t.Ay.div`
  font-weight: 600;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Tr=t.Ay.div`
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: var(--border-radius);
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(var(--primary-color-rgb), 0.1);
  }
  
  svg {
    color: var(--primary-color);
  }
`,Ir=t.Ay.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`,Dr=e=>{let{data:r,filename:a="export"}=e;const[t,s]=(0,o.useState)(!1),l=(0,o.useRef)(null),c=(0,h.zh)({opacity:t?1:0,transform:t?"translateY(0)":"translateY(-20px)",config:{tension:300,friction:20}}),d=e=>{l.current&&!l.current.contains(e.target)&&s(!1)};o.useEffect((()=>(t?document.addEventListener("mousedown",d):document.removeEventListener("mousedown",d),()=>{document.removeEventListener("mousedown",d)})),[t]);return(0,i.jsxs)(Sr,{ref:l,children:[(0,i.jsxs)(Ar,{variant:"outline",onClick:()=>{s(!t)},children:[(0,i.jsx)(n.a4x,{}),"Exportar"]}),t&&(0,i.jsxs)(Er,{style:c,children:[(0,i.jsxs)(zr,{children:["Exportar datos",(0,i.jsx)(Ir,{onClick:()=>s(!1),children:(0,i.jsx)(n.yGN,{})})]}),(0,i.jsxs)(Tr,{onClick:()=>{(0,Cr.GF)(r,a),s(!1)},children:[(0,i.jsx)(n.jH2,{}),"Exportar como CSV"]}),(0,i.jsxs)(Tr,{onClick:()=>{(0,Cr.Uh)(r,a),s(!1)},children:[(0,i.jsx)(n.Hbo,{}),"Exportar como JSON"]}),(0,i.jsxs)(Tr,{onClick:()=>{(0,Cr.bJ)(r,`${a}.xlsx`),s(!1)},children:[(0,i.jsx)(n.jH2,{}),"Exportar como Excel"]})]})]})},Nr=(0,t.Ay)(h.CS.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`,Pr=(0,t.Ay)(h.CS.div)`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 24px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`,$r=t.Ay.h3`
  margin-top: 0;
  margin-bottom: 16px;
  color: var(--text-dark);
  font-size: 1.3rem;
  font-weight: 600;
`,Mr=t.Ay.div`
  margin-bottom: 24px;
  color: var(--text-medium);
  font-size: 1rem;
  line-height: 1.5;
`,Or=t.Ay.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`,Rr=e=>{let{isOpen:r,onClose:a,onConfirm:o,title:t="Confirmar",children:n,confirmText:s="Confirmar",cancelText:l="Cancelar",confirmVariant:c="primary"}=e;const d=(0,h.zh)({opacity:r?1:0,config:{tension:300,friction:20}}),p=(0,h.zh)({opacity:r?1:0,transform:r?"translateY(0)":"translateY(-50px)",config:{tension:300,friction:20}});return r?(0,i.jsx)(Nr,{style:d,onClick:a,children:(0,i.jsxs)(Pr,{style:p,onClick:e=>e.stopPropagation(),children:[(0,i.jsx)($r,{children:t}),(0,i.jsx)(Mr,{children:n}),(0,i.jsxs)(Or,{children:[(0,i.jsx)(re.A,{variant:"outline",onClick:a,fullWidth:window.innerWidth<=480,children:l}),(0,i.jsx)(re.A,{variant:c,onClick:()=>{o(),a()},fullWidth:window.innerWidth<=480,children:s})]})]})}):null};var _r=a(8090);const Fr=t.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,Lr=t.Ay.div`
  margin-bottom: 36px;

  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--text-dark);
    margin-bottom: 12px;
    position: relative;
    padding-bottom: 12px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      border-radius: 2px;
    }
  }

  p {
    color: var(--text-medium);
    font-size: 1.1rem;
  }
`,Ur=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,Gr=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--bg-medium);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`,Jr=t.Ay.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`,Yr=t.Ay.h2`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  position: relative;
  padding-left: 16px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 24px;
    background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
    border-radius: 2px;
  }
`,qr=()=>{const[e,r]=(0,o.useState)([]),[a,t]=(0,o.useState)(!1),[s,l]=(0,o.useState)(null),[c,d]=(0,o.useState)(!0),[p,u]=(0,o.useState)(null),[x,m]=(0,o.useState)({search:"",type:"all",category:"all",startDate:"",endDate:"",sort:"date_desc"}),[h,v]=(0,o.useState)([]),[f,y]=(0,o.useState)({isOpen:!1,title:"",message:"",onConfirm:()=>{},confirmText:"Confirmar",confirmVariant:"primary"});(0,o.useEffect)((()=>{let e;(async()=>{try{d(!0);const a=(0,_r.I0)();if(a&&a.length>0){console.log("Transacciones cargadas desde el almacenamiento local:",a),r(a),u(null),d(!1);try{const e=await(0,Q.I0)();e&&e.length>0&&(console.log("Transacciones cargadas desde la API:",e),r(e),(0,_r.xo)(e))}catch(e){console.error("Error al cargar transacciones desde la API:",e)}}else try{const e=await(0,Q.I0)();console.log("Transacciones cargadas desde la API:",e),r(e),(0,_r.xo)(e),u(null)}catch(e){console.error("Error al cargar transacciones desde la API:",e),u("Error al cargar las transacciones. Por favor, intenta de nuevo m\xe1s tarde."),r([])}}catch(a){console.error("Error al cargar las transacciones:",a),u("Error al cargar las transacciones. Por favor, intenta de nuevo m\xe1s tarde."),r([])}finally{d(!1)}})();return(async()=>{try{e=await async function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!r)try{const{data:{user:e}}=await yr.N.auth.getUser();r=null===e||void 0===e?void 0:e.id}catch(p){console.error("Error al obtener el usuario actual:",p)}return r?br("transactions",e,{filter:`user_id=eq.${r}`}):br("transactions",e)}((e=>{console.log("Cambio en tiempo real:",e);const{eventType:a,new:o,old:t}=e;switch(a){case"INSERT":r((e=>{const r=[...e,o];return(0,_r.xo)(r),r})),(0,wr.cf)(`Nueva transacci\xf3n: ${o.title}`);break;case"UPDATE":r((e=>{const r=e.map((e=>e.id===o.id?o:e));return(0,_r.xo)(r),r})),(0,wr.cf)(`Transacci\xf3n actualizada: ${o.title}`);break;case"DELETE":r((e=>{const r=e.filter((e=>e.id!==t.id));return(0,_r.xo)(r),r})),(0,wr.cf)("Transacci\xf3n eliminada")}}))}catch(p){console.error("Error al suscribirse a cambios en tiempo real:",p)}})(),()=>{(e=>{e&&yr.N.removeChannel(e)})(e)}}),[]),(0,o.useEffect)((()=>{let r=[...e];if(x.search){const e=x.search.toLowerCase();r=r.filter((r=>r.title.toLowerCase().includes(e)))}"all"!==x.type&&(r=r.filter((e=>e.type===x.type))),"all"!==x.category&&(r=r.filter((e=>e.category===x.category))),x.startDate&&(r=r.filter((e=>e.date>=x.startDate))),x.endDate&&(r=r.filter((e=>e.date<=x.endDate))),r.sort(((e,r)=>{switch(x.sort){case"date_asc":return new Date(e.date)-new Date(r.date);case"date_desc":return new Date(r.date)-new Date(e.date);case"amount_desc":return r.amount-e.amount;case"amount_asc":return e.amount-r.amount;case"name_asc":return e.title.localeCompare(r.title);case"name_desc":return r.title.localeCompare(e.title);default:return 0}})),v(r)}),[e,x]);return(0,i.jsxs)(Fr,{children:[(0,i.jsxs)(Lr,{children:[(0,i.jsx)("h1",{children:"Finanzas"}),(0,i.jsx)("p",{children:"Controla tus ingresos y gastos"})]}),p&&(0,i.jsx)(jr,{items:[p],keyExtractor:()=>"error",renderItem:e=>(0,i.jsxs)("div",{style:{padding:"16px",backgroundColor:"rgba(239, 68, 68, 0.1)",color:"var(--danger-color)",borderRadius:"var(--border-radius)",marginBottom:"16px",display:"flex",alignItems:"center",gap:"12px",boxShadow:"0 4px 6px rgba(239, 68, 68, 0.1)",border:"1px solid rgba(239, 68, 68, 0.2)"},children:[(0,i.jsx)("div",{style:{backgroundColor:"var(--danger-color)",color:"white",borderRadius:"50%",width:"24px",height:"24px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"},children:"!"}),e,(0,i.jsx)(re.A,{variant:"outline",style:{marginLeft:"auto",padding:"4px 8px",minWidth:"auto",color:"var(--danger-color)",borderColor:"var(--danger-color)"},onClick:()=>u(null),children:"Cerrar"})]})}),c?(0,i.jsx)(jr,{items:[c],keyExtractor:()=>"loading",renderItem:()=>(0,i.jsx)(kr.A,{text:"Cargando transacciones..."})}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(g,{transactions:e,exchangeRate:1.1}),(0,i.jsxs)(Ur,{children:[(0,i.jsxs)(Gr,{children:[(0,i.jsx)(Yr,{children:"Transacciones"}),(0,i.jsxs)(Jr,{children:[(0,i.jsx)(Dr,{data:h,filename:"transacciones"}),(0,i.jsxs)(re.A,{variant:a?"outline":"primary",onClick:()=>{l(null),t(!a)},children:[(0,i.jsx)(n.GGD,{}),a?"Cancelar":"Nueva Transacci\xf3n"]})]})]}),a&&(0,i.jsx)(ir,{transaction:s,onSubmit:async e=>{try{if(console.log("Transaction to save:",e),s){console.log("Updating transaction with ID:",e.id);const o=(0,_r.AF)(e.id,e);if(o){console.log("Transaction updated successfully in local storage:",o),r((e=>{const r=e.map((e=>e.id===o.id?o:e));return(0,_r.xo)(r),r})),l(null),(0,wr.Te)("Transacci\xf3n actualizada correctamente");try{const r=await(0,Q.AF)(e.id,e);console.log("Transaction updated in API:",r)}catch(a){console.error("Error updating transaction in API:",a)}}}else{console.log("Creating new transaction");const o=(0,_r.yY)(e);if(o){console.log("Transaction created successfully in local storage:",o),r((e=>{const r=[...e,o];return(0,_r.xo)(r),r})),(0,wr.Te)("Transacci\xf3n creada correctamente");try{const r=await(0,Q.zS)(e);console.log("Transaction created in API:",r)}catch(a){console.error("Error creating transaction in API:",a)}}}t(!1),u(null)}catch(o){console.error("Error al guardar la transacci\xf3n:",o),u(`Error al guardar la transacci\xf3n: ${o.message}`),(0,wr.Qg)(`Error al guardar la transacci\xf3n: ${o.message}`)}},onCancel:()=>{t(!1),l(null)}}),(0,i.jsx)(fr,{filters:x,onFilterChange:m}),(0,i.jsx)(ie,{transactions:h,onEditTransaction:e=>{l(e),t(!0)},onDeleteTransaction:e=>{y({isOpen:!0,title:"Eliminar transacci\xf3n",message:"\xbfEst\xe1s seguro de que deseas eliminar esta transacci\xf3n? Esta acci\xf3n no se puede deshacer.",onConfirm:async()=>{try{if((0,_r.Uw)(e)){console.log("Transaction deleted successfully from local storage"),r((r=>{const a=r.filter((r=>r.id!==e));return(0,_r.xo)(a),a})),(0,wr.Te)("Transacci\xf3n eliminada correctamente");try{await(0,Q.Uw)(e),console.log("Transaction deleted from API")}catch(a){console.error("Error deleting transaction from API:",a)}}else(0,wr.Qg)("No se pudo eliminar la transacci\xf3n")}catch(o){console.error("Error al eliminar la transacci\xf3n:",o),(0,wr.Qg)("Error al eliminar la transacci\xf3n. Por favor, intenta de nuevo m\xe1s tarde.")}},confirmText:"Eliminar",confirmVariant:"danger"})},filters:{type:"all"!==x.type?x.type:void 0,category:"all"!==x.category?x.category:void 0,startDate:x.startDate||void 0,endDate:x.endDate||void 0,search:x.search||void 0},sortConfig:{column:x.sort?x.sort.split("_")[0]:"date",direction:x.sort?x.sort.split("_")[1]:"desc"},useProgressiveLoading:!0})]})]}),(0,i.jsx)(Rr,{isOpen:f.isOpen,onClose:()=>y({...f,isOpen:!1}),onConfirm:f.onConfirm,title:f.title,confirmText:f.confirmText,confirmVariant:f.confirmVariant,children:f.message})]})}},8090:(e,r,a)=>{a.d(r,{AF:()=>d,DT:()=>b,EP:()=>S,Hm:()=>v,I0:()=>l,J0:()=>j,LS:()=>y,UI:()=>E,Uw:()=>p,W1:()=>C,XZ:()=>m,_y:()=>A,lC:()=>g,vq:()=>h,x1:()=>x,xn:()=>w,xo:()=>s,yY:()=>c});const o="mi_app_personal_simple_",t=(e,r)=>{try{const a=`${o}${e}`;return localStorage.setItem(a,JSON.stringify(r)),console.log(`Datos guardados en localStorage con clave ${e}:`,r),!0}catch(a){return console.error(`Error al guardar datos en localStorage con clave ${e}:`,a),!1}},n=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;try{const a=`${o}${e}`,t=localStorage.getItem(a);if(!t)return r;const n=JSON.parse(t);return console.log(`Datos recuperados de localStorage con clave ${e}:`,n),n}catch(a){return console.error(`Error al obtener datos de localStorage con clave ${e}:`,a),r}},i=()=>`local_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,s=e=>t("transactions",e),l=()=>n("transactions",[]),c=e=>{try{const r={...e,id:e.id||i()},a=[r,...l()];return s(a),r}catch(r){return console.error("Error al agregar transacci\xf3n:",r),null}},d=(e,r)=>{try{const a=l(),o=a.findIndex((r=>r.id===e));if(-1===o)return console.error(`No se encontr\xf3 la transacci\xf3n con ID ${e}`),!1;const t=[...a];return t[o]={...t[o],...r},s(t),t[o]}catch(a){return console.error("Error al actualizar transacci\xf3n:",a),null}},p=e=>{try{const r=l(),a=r.filter((r=>r.id!==e));return a.length===r.length?(console.error(`No se encontr\xf3 la transacci\xf3n con ID ${e}`),!1):(s(a),!0)}catch(r){return console.error("Error al eliminar transacci\xf3n:",r),!1}},u=e=>t("tasks",e),x=()=>n("tasks",[]),m=e=>{try{const r={...e,id:e.id||i(),created_at:e.created_at||(new Date).toISOString().split("T")[0]},a=[...x(),r];return u(a),r}catch(r){return console.error("Error al agregar tarea:",r),null}},g=(e,r)=>{try{const a=x(),o=a.findIndex((r=>r.id===e));if(-1===o)return console.error(`No se encontr\xf3 la tarea con ID ${e}`),!1;const t=[...a];return t[o]={...t[o],...r},u(t),t[o]}catch(a){return console.error("Error al actualizar tarea:",a),null}},h=e=>{try{const r=x(),a=r.filter((r=>r.id!==e));return a.length===r.length?(console.error(`No se encontr\xf3 la tarea con ID ${e}`),!1):(u(a),!0)}catch(r){return console.error("Error al eliminar tarea:",r),!1}},v=e=>{try{const r=x(),a=r.findIndex((r=>r.id===e));if(-1===a)return console.error(`No se encontr\xf3 la tarea con ID ${e}`),!1;const o=[...r];return o[a]={...o[a],completed:!o[a].completed},u(o),o[a]}catch(r){return console.error("Error al cambiar estado de tarea:",r),null}},f=e=>t("investments",e),y=()=>n("investments",[]),b=e=>{try{const r={...e,id:e.id||i()},a=[...y(),r];return f(a),r}catch(r){return console.error("Error al agregar inversi\xf3n:",r),null}},j=(e,r)=>{try{const a=y(),o=a.findIndex((r=>r.id===e));if(-1===o)return console.error(`No se encontr\xf3 la inversi\xf3n con ID ${e}`),!1;const t=[...a];return t[o]={...t[o],...r},f(t),t[o]}catch(a){return console.error("Error al actualizar inversi\xf3n:",a),null}},w=e=>{try{const r=y(),a=r.filter((r=>r.id!==e));return a.length===r.length?(console.error(`No se encontr\xf3 la inversi\xf3n con ID ${e}`),!1):(f(a),!0)}catch(r){return console.error("Error al eliminar inversi\xf3n:",r),!1}},k=e=>t("financial_goals",e),C=()=>n("financial_goals",[]),S=e=>{try{const r={...e,id:e.id||i()},a=[...C(),r];return k(a),r}catch(r){return console.error("Error al agregar meta financiera:",r),null}},A=(e,r)=>{try{const a=C(),o=a.findIndex((r=>r.id===e));if(-1===o)return console.error(`No se encontr\xf3 la meta financiera con ID ${e}`),!1;const t=[...a];return t[o]={...t[o],...r},k(t),t[o]}catch(a){return console.error("Error al actualizar meta financiera:",a),null}},E=e=>{try{const r=C(),a=r.filter((r=>r.id!==e));return a.length===r.length?(console.error(`No se encontr\xf3 la meta financiera con ID ${e}`),!1):(k(a),!0)}catch(r){return console.error("Error al eliminar meta financiera:",r),!1}}}}]);
//# sourceMappingURL=84.55516405.chunk.js.map