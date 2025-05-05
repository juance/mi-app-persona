"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[90,217],{7217:(r,e,a)=>{a.r(e),a.d(e,{default:()=>Ir});var o=a(5043),t=a(5464),n=a(6058),i=a(7304),s=a(2771),l=a(579);i.t1.register(i.Bs,i.m_,i.s$,i.PP,i.kc,i.E8,i.hE);const c=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
  transition: transform var(--transition-speed), box-shadow var(--transition-speed);
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
  }
`,d=t.Ay.h2`
  margin-top: 0;
  margin-bottom: 24px;
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`,u=t.Ay.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  gap: 12px;
`,g=t.Ay.button`
  background-color: ${r=>r.active?"var(--primary-color)":"var(--bg-medium)"};
  color: ${r=>r.active?"white":"var(--text-medium)"};
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  box-shadow: ${r=>r.active?"0 4px 8px rgba(99, 102, 241, 0.3)":"0 2px 4px rgba(0, 0, 0, 0.05)"};

  &:hover {
    background-color: ${r=>r.active?"var(--primary-color)":"var(--bg-light)"};
    transform: translateY(-2px);
  }
`,p=t.Ay.div`
  height: 350px;
  width: 100%;
  position: relative;
  padding: 10px;
`,m=r=>{let{goals:e}=r;const[a,t]=(0,o.useState)("bar"),{darkMode:i}=(0,s.A)(),[m,x]=(0,o.useState)(null),[h,b]=(0,o.useState)(null);return(0,o.useEffect)((()=>{if(!e||0===e.length)return;const r=e.map((r=>r.name)),o=e.map((r=>r.current_amount)),t=(e.map((r=>r.target_amount)),e.map((r=>Math.max(0,r.target_amount-r.current_amount)))),n=["rgba(99, 102, 241, 0.7)","rgba(239, 68, 68, 0.7)","rgba(245, 158, 11, 0.7)","rgba(16, 185, 129, 0.7)","rgba(59, 130, 246, 0.7)","rgba(168, 85, 247, 0.7)","rgba(236, 72, 153, 0.7)"];"bar"===a?(x({labels:r,datasets:[{label:"Monto Actual",data:o,backgroundColor:"rgba(99, 102, 241, 0.7)",borderColor:"rgba(99, 102, 241, 1)",borderWidth:1},{label:"Monto Restante",data:t,backgroundColor:"rgba(239, 68, 68, 0.7)",borderColor:"rgba(239, 68, 68, 1)",borderWidth:1}]}),b({responsive:!0,maintainAspectRatio:!1,scales:{x:{stacked:!0,ticks:{color:i?"#e5e7eb":"#4b5563"},grid:{color:i?"rgba(255, 255, 255, 0.1)":"rgba(0, 0, 0, 0.1)"}},y:{stacked:!0,beginAtZero:!0,ticks:{callback:function(r){return new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(r)},color:i?"#e5e7eb":"#4b5563"},grid:{color:i?"rgba(255, 255, 255, 0.1)":"rgba(0, 0, 0, 0.1)"}}},plugins:{legend:{labels:{color:i?"#e5e7eb":"#4b5563"}},tooltip:{callbacks:{label:function(r){return r.dataset.label+": "+new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS"}).format(r.raw)}}}}})):(x({labels:r,datasets:[{data:o,backgroundColor:n,borderColor:n.map((r=>r.replace("0.7","1"))),borderWidth:1}]}),b({responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"right",labels:{color:i?"#e5e7eb":"#4b5563"}},tooltip:{callbacks:{label:function(r){const a=e[r.dataIndex],o=Math.round(a.current_amount/a.target_amount*100);return r.label+": "+new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS"}).format(r.raw)+` (${o}% del objetivo)`}}}}}))}),[e,a,i]),e&&0!==e.length&&m&&h?(0,l.jsxs)(c,{children:[(0,l.jsx)(d,{children:"Resumen de Metas Financieras"}),(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{active:"bar"===a,onClick:()=>t("bar"),children:"Barras"}),(0,l.jsx)(g,{active:"pie"===a,onClick:()=>t("pie"),children:"Circular"})]}),(0,l.jsx)(p,{children:"bar"===a?(0,l.jsx)(n.yP,{data:m,options:h}):(0,l.jsx)(n.Fq,{data:m,options:h})})]}):null},x=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  background-color: var(--bg-medium);
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`,h=t.Ay.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  flex: 1;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`,b=t.Ay.label`
  margin-bottom: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-medium);
`,v=t.Ay.select`
  padding: 10px 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: var(--border-radius);
  background-color: var(--card-bg);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all var(--transition-speed);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  
  &:hover {
    border-color: var(--primary-light);
  }
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`,f=r=>{let{filters:e,onFilterChange:a}=r;const o=r=>{const{name:o,value:t}=r.target;a({...e,[o]:t})};return(0,l.jsxs)(x,{children:[(0,l.jsxs)(h,{children:[(0,l.jsx)(b,{htmlFor:"categoryFilter",children:"Filtrar por categor\xeda:"}),(0,l.jsxs)(v,{id:"categoryFilter",name:"category",value:e.category,onChange:o,children:[(0,l.jsx)("option",{value:"all",children:"Todas las categor\xedas"}),(0,l.jsx)("option",{value:"savings",children:"Ahorros"}),(0,l.jsx)("option",{value:"investment",children:"Inversi\xf3n"}),(0,l.jsx)("option",{value:"purchase",children:"Compra"}),(0,l.jsx)("option",{value:"travel",children:"Viaje"}),(0,l.jsx)("option",{value:"education",children:"Educaci\xf3n"}),(0,l.jsx)("option",{value:"home",children:"Hogar"}),(0,l.jsx)("option",{value:"other",children:"Otro"})]})]}),(0,l.jsxs)(h,{children:[(0,l.jsx)(b,{htmlFor:"progressFilter",children:"Filtrar por progreso:"}),(0,l.jsxs)(v,{id:"progressFilter",name:"progress",value:e.progress,onChange:o,children:[(0,l.jsx)("option",{value:"all",children:"Todos"}),(0,l.jsx)("option",{value:"less25",children:"Menos del 25%"}),(0,l.jsx)("option",{value:"25to50",children:"25% - 50%"}),(0,l.jsx)("option",{value:"50to75",children:"50% - 75%"}),(0,l.jsx)("option",{value:"more75",children:"M\xe1s del 75%"}),(0,l.jsx)("option",{value:"completed",children:"Completados"})]})]}),(0,l.jsxs)(h,{children:[(0,l.jsx)(b,{htmlFor:"sortBy",children:"Ordenar por:"}),(0,l.jsxs)(v,{id:"sortBy",name:"sortBy",value:e.sortBy,onChange:o,children:[(0,l.jsx)("option",{value:"name",children:"Nombre"}),(0,l.jsx)("option",{value:"deadline",children:"Fecha l\xedmite"}),(0,l.jsx)("option",{value:"progress",children:"Progreso"}),(0,l.jsx)("option",{value:"amount",children:"Monto objetivo"})]})]})]})};var y=a(372);const j="financial_goals_categories",w=[{name:"Ahorros",value:"savings"},{name:"Inversi\xf3n",value:"investment"},{name:"Compra",value:"purchase"},{name:"Viaje",value:"travel"},{name:"Educaci\xf3n",value:"education"},{name:"Hogar",value:"home"},{name:"Otro",value:"other"}],k=async()=>{try{const{data:{user:r}}=await y.N.auth.getUser();if(r){const{data:e,error:a}=await y.N.from("categories").select("*").eq("type","financial_goal").or(`user_id.is.null,user_id.eq.${r.id}`).order("name",{ascending:!0});if(!a&&e&&e.length>0){const r=e.map((r=>({name:r.name,value:r.value})));return localStorage.setItem(j,JSON.stringify(r)),r}}const e=localStorage.getItem(j);return e?JSON.parse(e):w}catch(r){console.error("Error al obtener categor\xedas de objetivos financieros:",r);const e=localStorage.getItem(j);return e?JSON.parse(e):w}},A=t.Ay.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,_=t.Ay.h3`
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-dark);
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 2px;
  }
`,C=t.Ay.div`
  color: var(--danger-color);
  margin-bottom: 16px;
  font-size: 0.9rem;
  padding: 12px;
  background-color: rgba(239, 68, 68, 0.08);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--danger-color);
`,E=t.Ay.div`
  margin-bottom: 20px;
`,S=t.Ay.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-medium);
  font-size: 0.95rem;

  &::after {
    content: ' *';
    color: var(--danger-color);
    display: ${r=>r.required?"inline":"none"};
  }
`,z=t.Ay.input`
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
`,N=t.Ay.select`
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
`,$=t.Ay.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  width: 100%;
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(99, 102, 241, 0.3);
  }
`,F={name:"",target_amount:"",current_amount:"0",category:"savings",deadline:""},I=r=>{let{onSubmit:e,onCancel:a,goal:t}=r;const[n,i]=(0,o.useState)(t||F),[s,c]=(0,o.useState)(""),[d,u]=(0,o.useState)([]);(0,o.useEffect)((()=>{(()=>{const r=k();u(r)})()}),[]);const g=r=>{const{name:e,value:a}=r.target;i((r=>({...r,[e]:a})))};return(0,l.jsxs)(A,{children:[(0,l.jsx)(_,{children:"Crear Nuevo Objetivo Financiero"}),s&&(0,l.jsx)(C,{children:s}),(0,l.jsxs)("form",{onSubmit:r=>{r.preventDefault(),n.name.trim()?!n.target_amount||parseFloat(n.target_amount)<=0?c("Por favor ingresa un monto objetivo v\xe1lido."):parseFloat(n.current_amount)>parseFloat(n.target_amount)?c("El monto actual no puede ser mayor que el monto objetivo."):(e({...n,target_amount:parseFloat(n.target_amount),current_amount:parseFloat(n.current_amount||0)}),i(F),c("")):c("Por favor ingresa un nombre para el objetivo.")},children:[(0,l.jsxs)(E,{children:[(0,l.jsx)(S,{htmlFor:"name",required:!0,children:"Nombre del objetivo"}),(0,l.jsx)(z,{type:"text",id:"name",name:"name",value:n.name,onChange:g,required:!0})]}),(0,l.jsxs)(E,{children:[(0,l.jsx)(S,{htmlFor:"target_amount",required:!0,children:"Monto objetivo (ARS)"}),(0,l.jsx)(z,{type:"number",id:"target_amount",name:"target_amount",min:"1",step:"0.01",value:n.target_amount,onChange:g,required:!0})]}),(0,l.jsxs)(E,{children:[(0,l.jsx)(S,{htmlFor:"current_amount",children:"Monto actual (ARS)"}),(0,l.jsx)(z,{type:"number",id:"current_amount",name:"current_amount",min:"0",step:"0.01",value:n.current_amount,onChange:g})]}),(0,l.jsxs)(E,{children:[(0,l.jsx)(S,{htmlFor:"category",required:!0,children:"Categor\xeda"}),(0,l.jsx)(N,{id:"category",name:"category",value:n.category,onChange:g,required:!0,children:d.map((r=>(0,l.jsx)("option",{value:r.value,children:r.name},r.value)))})]}),(0,l.jsxs)(E,{children:[(0,l.jsx)(S,{htmlFor:"deadline",children:"Fecha l\xedmite"}),(0,l.jsx)(z,{type:"date",id:"deadline",name:"deadline",value:n.deadline,onChange:g})]}),(0,l.jsx)($,{type:"submit",children:"Guardar Objetivo"})]})]})};var D=a(5772);const M=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  border: 1px solid rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  }
`,q=t.Ay.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`,P=t.Ay.div`
  font-size: 1.5rem;
  margin-right: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 12px;
  transition: all var(--transition-speed);
  color: var(--primary-color);

  ${M}:hover & {
    transform: scale(1.1);
    background-color: rgba(99, 102, 241, 0.15);
  }
`,O=t.Ay.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  line-height: 1.4;
`,R=t.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: var(--bg-light);
  padding: 16px;
  border-radius: var(--border-radius);
`,G=t.Ay.div`
  display: flex;
  flex-direction: column;
`,Y=t.Ay.span`
  font-size: 0.85rem;
  color: var(--text-medium);
  margin-bottom: 4px;
  font-weight: 500;
`,B=t.Ay.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${r=>"current"===r.type?"var(--primary-color)":"var(--secondary-color)"};
`,U=t.Ay.div`
  margin-bottom: 20px;
`,T=t.Ay.div`
  height: 12px;
  background-color: var(--bg-medium);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
`,W=t.Ay.div`
  height: 100%;
  width: ${r=>r.progress}%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 6px;
  transition: width 0.5s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%
    );
    background-size: 20px 20px;
    animation: progress-animation 1s linear infinite;
  }

  @keyframes progress-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 20px 0;
    }
  }
`,J=t.Ay.div`
  text-align: right;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-medium);
`,H=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`,V=t.Ay.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-light);
  padding: 10px 14px;
  border-radius: var(--border-radius);
  border-left: 3px solid var(--accent-color);
`,L=t.Ay.span`
  font-size: 0.8rem;
  color: var(--text-medium);
  margin-bottom: 4px;
  font-weight: 500;
`,X=t.Ay.span`
  font-size: 0.95rem;
  color: var(--text-dark);
  font-weight: 600;
`,Z=t.Ay.div`
  display: flex;
  gap: 10px;
`,Q=t.Ay.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  box-shadow: 0 2px 4px rgba(245, 158, 11, 0.2);
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '↑';
    font-weight: bold;
  }

  &:hover {
    background-color: var(--accent-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);
  }
`,K=t.Ay.button`
  background-color: var(--danger-color);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed);
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);

  &:hover {
    background-color: var(--danger-dark);
    transform: rotate(90deg);
    box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
  }
`,rr=r=>{switch(r){case"savings":return(0,l.jsx)(D.z8N,{});case"investment":return(0,l.jsx)(D.ARf,{});case"purchase":return(0,l.jsx)(D.y52,{});case"travel":return(0,l.jsx)(D.HzC,{});case"education":return(0,l.jsx)(D.H9b,{});case"home":return(0,l.jsx)(D.V5Y,{});default:return(0,l.jsx)(D.x_j,{})}},er=r=>new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS"}).format(r),ar=r=>{if(!r)return"Sin fecha l\xedmite";return new Date(r).toLocaleDateString("es-ES")},or=r=>{let{goal:e,onUpdate:a,onDelete:o}=r;const t=Math.min(100,Math.round(e.current_amount/e.target_amount*100));return(0,l.jsxs)(M,{children:[(0,l.jsxs)(q,{children:[(0,l.jsx)(P,{children:rr(e.category)}),(0,l.jsx)(O,{children:e.name})]}),(0,l.jsxs)(R,{children:[(0,l.jsxs)(G,{children:[(0,l.jsx)(Y,{children:"Actual:"}),(0,l.jsx)(B,{type:"current",children:er(e.current_amount)})]}),(0,l.jsxs)(G,{children:[(0,l.jsx)(Y,{children:"Objetivo:"}),(0,l.jsx)(B,{type:"target",children:er(e.target_amount)})]})]}),(0,l.jsxs)(U,{children:[(0,l.jsx)(T,{children:(0,l.jsx)(W,{progress:t})}),(0,l.jsxs)(J,{children:[t,"%"]})]}),(0,l.jsxs)(H,{children:[(0,l.jsxs)(V,{children:[(0,l.jsx)(L,{children:"Fecha l\xedmite:"}),(0,l.jsx)(X,{children:ar(e.deadline)})]}),(0,l.jsxs)(Z,{children:[(0,l.jsx)(Q,{onClick:()=>a(e.id),children:"Actualizar"}),(0,l.jsx)(K,{onClick:()=>o(e.id),children:"\ud83d\uddd1\ufe0f"})]})]})]})},tr=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,nr=t.Ay.div`
  text-align: center;
  color: var(--text-light);
  font-style: italic;
  padding: 30px 0;
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
  grid-column: 1 / -1;
`,ir=r=>{let{goals:e,onUpdateGoal:a,onDeleteGoal:o}=r;return e&&0!==e.length?(0,l.jsx)(tr,{children:e.map((r=>(0,l.jsx)(or,{goal:r,onUpdate:a,onDelete:o},r.id)))}):(0,l.jsx)(tr,{children:(0,l.jsx)(nr,{children:"No hay objetivos financieros. \xa1Crea uno nuevo!"})})},sr=t.Ay.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,lr=t.Ay.h3`
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-dark);
  font-size: 1.25rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--primary-color);
    border-radius: 2px;
  }
`,cr=t.Ay.div`
  margin-bottom: 20px;
`,dr=t.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all var(--transition-speed);

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }
`,ur=t.Ay.div`
  font-weight: 500;
  color: var(--text-dark);
`,gr=t.Ay.div`
  color: var(--text-medium);
  font-size: 0.9rem;
`,pr=t.Ay.div`
  display: flex;
  gap: 8px;
`,mr=t.Ay.button`
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
    color: ${r=>r.color||"var(--primary-color)"};
    background-color: rgba(0, 0, 0, 0.05);
  }
`,xr=t.Ay.form`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`,hr=t.Ay.input`
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
`,br=t.Ay.button`
  background-color: ${r=>"primary"===r.variant?"var(--primary-color)":"transparent"};
  color: ${r=>"primary"===r.variant?"white":"var(--text-medium)"};
  border: ${r=>"primary"===r.variant?"none":"1px solid rgba(0, 0, 0, 0.1)"};
  padding: ${r=>"primary"===r.variant?"12px 20px":"12px 16px"};
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: ${r=>"primary"===r.variant?"var(--primary-dark)":"rgba(0, 0, 0, 0.05)"};
    transform: ${r=>"primary"===r.variant?"translateY(-2px)":"none"};
    box-shadow: ${r=>"primary"===r.variant?"0 4px 8px rgba(99, 102, 241, 0.2)":"none"};
  }
`,vr=(0,t.Ay)(br)`
  margin-top: 20px;
`,fr=t.Ay.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,yr=t.Ay.div`
  margin-top: 12px;
  padding: 8px 12px;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  background-color: ${r=>"success"===r.type?"rgba(16, 185, 129, 0.1)":"rgba(239, 68, 68, 0.1)"};
  color: ${r=>"success"===r.type?"var(--secondary-color)":"var(--danger-color)"};
  display: flex;
  align-items: center;
  gap: 8px;
`,jr=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`,wr=(0,t.Ay)(hr)`
  margin: 0;
`,kr=t.Ay.div`
  text-align: center;
  color: var(--text-light);
  font-style: italic;
  padding: 20px 0;
`,Ar=r=>{let{categories:e,onSaveCategories:a}=r;const[t,n]=(0,o.useState)(e||[]),[i,s]=(0,o.useState)(""),[c,d]=(0,o.useState)(""),[u,g]=(0,o.useState)(-1),[p,m]=(0,o.useState)(""),[x,h]=(0,o.useState)(""),[b,v]=(0,o.useState)(!1),[f,y]=(0,o.useState)(!1),[j,w]=(0,o.useState)(null);(0,o.useEffect)((()=>{n(e||[])}),[e]);const k=()=>{if(!p.trim()||!x.trim())return;const r=[...t];r[u]={name:p.trim(),value:x.trim()},n(r),g(-1),v(!0)},A=()=>{g(-1)};return(0,l.jsxs)(sr,{children:[(0,l.jsx)(lr,{children:"Gestionar Categor\xedas"}),(0,l.jsxs)(xr,{onSubmit:r=>{if(r.preventDefault(),!i.trim()||!c.trim())return;const e={name:i.trim(),value:c.trim()};n([...t,e]),s(""),d(""),v(!0)},children:[(0,l.jsx)(hr,{type:"text",placeholder:"Nombre de categor\xeda",value:i,onChange:r=>s(r.target.value),required:!0}),(0,l.jsx)(hr,{type:"text",placeholder:"Valor (ej: travel)",value:c,onChange:r=>d(r.target.value),required:!0}),(0,l.jsxs)(br,{type:"submit",variant:"primary",children:[(0,l.jsx)(D.GGD,{})," Agregar"]})]}),(0,l.jsx)(cr,{children:t.length>0?t.map(((r,e)=>(0,l.jsx)(dr,{children:u===e?(0,l.jsxs)(jr,{children:[(0,l.jsx)(wr,{type:"text",value:p,onChange:r=>m(r.target.value),required:!0}),(0,l.jsx)(wr,{type:"text",value:x,onChange:r=>h(r.target.value),required:!0}),(0,l.jsx)(mr,{onClick:k,color:"var(--secondary-color)",children:(0,l.jsx)(D.YrT,{})}),(0,l.jsx)(mr,{onClick:A,color:"var(--danger-color)",children:(0,l.jsx)(D.yGN,{})})]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(ur,{children:r.name}),(0,l.jsxs)(gr,{children:["Valor: ",r.value]})]}),(0,l.jsxs)(pr,{children:[(0,l.jsx)(mr,{onClick:()=>(r=>{g(r),m(t[r].name),h(t[r].value)})(e),color:"var(--primary-color)",children:(0,l.jsx)(D.WXf,{})}),(0,l.jsx)(mr,{onClick:()=>(r=>{if(window.confirm("\xbfEst\xe1s seguro de que deseas eliminar esta categor\xeda?")){const e=t.filter(((e,a)=>a!==r));n(e),v(!0)}})(e),color:"var(--danger-color)",children:(0,l.jsx)(D.IXo,{})})]})]})},e))):(0,l.jsx)(kr,{children:"No hay categor\xedas personalizadas. Agrega una nueva."})}),b&&(0,l.jsx)(vr,{onClick:async()=>{try{y(!0),w(null);await a(t)?(v(!1),w({type:"success",text:"Categor\xedas guardadas correctamente. Se han sincronizado con la nube."})):w({type:"error",text:"No se pudieron guardar las categor\xedas en la nube, pero se guardaron localmente."})}catch(r){console.error("Error al guardar categor\xedas:",r),w({type:"error",text:"Error al guardar categor\xedas: "+(r.message||"Error desconocido")})}finally{y(!1)}},variant:"primary",disabled:f,children:f?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(fr,{children:(0,l.jsx)(D.TwU,{})})," Guardando..."]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(D.Bc_,{})," Guardar Cambios"]})}),j&&(0,l.jsxs)(yr,{type:j.type,children:["success"===j.type?(0,l.jsx)(D.YrT,{}):(0,l.jsx)(D.yGN,{}),j.text]})]})};var _r=a(6618),Cr=a(8090);const Er=t.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,Sr=t.Ay.div`
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
`,zr=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,Nr=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`,$r=t.Ay.h2`
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
`,Fr=t.Ay.button`
  background-color: var(--secondary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '+';
    font-size: 1.2rem;
    font-weight: 600;
  }

  &:hover {
    background-color: var(--secondary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(16, 185, 129, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`,Ir=()=>{const[r,e]=(0,o.useState)([]),[a,t]=(0,o.useState)(!1),[n,i]=(0,o.useState)({category:"all",progress:"all",sortBy:"name"}),[s,c]=(0,o.useState)([]),[d,u]=(0,o.useState)(!0),[g,p]=(0,o.useState)(!1),[x,h]=(0,o.useState)([]);(0,o.useEffect)((()=>{(()=>{try{u(!0);const r=(0,Cr.W1)();console.log("Metas financieras cargadas desde el almacenamiento local:",r),e(r||[])}catch(r){console.error("Error al cargar metas financieras:",r)}finally{u(!1)}})();const r=r=>{const{detail:a}=r;if(a.success&&a.stores&&a.stores.includes("financial_goals")){console.log("Datos de metas financieras sincronizados, recargando...");const r=(0,Cr.W1)();r&&r.length>0&&(console.log("Metas financieras actualizadas desde sincronizaci\xf3n:",r.length),e(r),(0,_r.cf)("Metas financieras actualizadas"))}};return window.addEventListener("data-synced",r),()=>{window.removeEventListener("data-synced",r)}}),[]),(0,o.useEffect)((()=>{(async()=>{try{const r=await k();console.log("Categor\xedas cargadas:",r),h(r||[])}catch(r){console.error("Error al cargar categor\xedas:",r)}})()}),[]),(0,o.useEffect)((()=>{let e=[...r];"all"!==n.category&&(e=e.filter((r=>r.category===n.category))),"all"!==n.progress&&(e=e.filter((r=>{const e=Math.round(r.current_amount/r.target_amount*100);switch(n.progress){case"less25":return e<25;case"25to50":return e>=25&&e<50;case"50to75":return e>=50&&e<75;case"more75":return e>=75&&e<100;case"completed":return e>=100;default:return!0}}))),e.sort(((r,e)=>{switch(n.sortBy){case"name":return r.name.localeCompare(e.name);case"deadline":return r.deadline?e.deadline?new Date(r.deadline)-new Date(e.deadline):-1:1;case"progress":const a=r.current_amount/r.target_amount*100;return e.current_amount/e.target_amount*100-a;case"amount":return e.target_amount-r.target_amount;default:return 0}})),c(e)}),[r,n]);return(0,l.jsxs)(Er,{children:[(0,l.jsxs)(Sr,{children:[(0,l.jsx)("h1",{children:"Metas Financieras"}),(0,l.jsx)("p",{children:"Establece y realiza seguimiento de tus objetivos financieros"})]}),(0,l.jsx)(m,{goals:r}),(0,l.jsxs)(zr,{children:[(0,l.jsxs)(Nr,{children:[(0,l.jsx)($r,{children:"Objetivos Financieros"}),(0,l.jsxs)("div",{style:{display:"flex",gap:"12px"},children:[(0,l.jsx)(Fr,{onClick:()=>{p(!g),t(!1)},style:{backgroundColor:g?"var(--primary-color)":"var(--text-medium)",boxShadow:g?"0 4px 6px rgba(99, 102, 241, 0.2)":"none"},children:g?"Cerrar Categor\xedas":"Gestionar Categor\xedas"}),(0,l.jsx)(Fr,{onClick:()=>{t(!a),p(!1)},children:a?"Cancelar":"Nuevo Objetivo"})]})]}),g&&(0,l.jsx)(Ar,{categories:x,onSaveCategories:async r=>{try{const e=await(async r=>{try{localStorage.setItem(j,JSON.stringify(r));const{data:{user:e}}=await y.N.auth.getUser();if(e){const{data:a}=await y.N.from("categories").select("*").eq("type","financial_goal").eq("user_id",e.id),o={};a&&a.forEach((r=>{o[r.value]=r}));for(const n of r)o[n.value]?(o[n.value].name!==n.name&&await y.N.from("categories").update({name:n.name,updated_at:new Date}).eq("id",o[n.value].id),delete o[n.value]):await y.N.from("categories").insert([{user_id:e.id,type:"financial_goal",name:n.name,value:n.value}]);const t=Object.values(o);if(t.length>0){const r=t.map((r=>r.id));await y.N.from("categories").delete().in("id",r)}}return!0}catch(e){return console.error("Error al guardar categor\xedas de objetivos financieros:",e),!1}})(r);return e?(console.log("Categor\xedas guardadas correctamente:",r),h(r),!0):(console.error("No se pudieron guardar las categor\xedas"),!1)}catch(e){return console.error("Error al guardar categor\xedas:",e),!1}}}),a&&(0,l.jsx)(I,{onSubmit:r=>{try{const a=(0,Cr.EP)(r);a?(console.log("Meta financiera agregada correctamente:",a),e((r=>[...r,a])),t(!1)):(console.error("No se pudo agregar la meta financiera"),alert("No se pudo agregar la meta financiera. Por favor, intenta de nuevo."))}catch(a){console.error("Error al agregar meta financiera:",a),alert("Error al agregar meta financiera. Por favor, intenta de nuevo.")}},onCancel:()=>t(!1)}),(0,l.jsx)(f,{filters:n,onFilterChange:i}),(0,l.jsx)(ir,{goals:s,onUpdateGoal:a=>{const o=prompt("Ingresa el monto a agregar:");if(o&&!isNaN(o)&&parseFloat(o)>0)try{const t=r.find((r=>r.id===a));if(!t)return void console.error("No se encontr\xf3 la meta financiera");const n=t.current_amount+parseFloat(o),i=(0,Cr._y)(a,{...t,current_amount:n});i?(console.log("Meta financiera actualizada correctamente:",i),e((r=>r.map((r=>r.id===a?{...r,current_amount:n}:r))))):(console.error("No se pudo actualizar la meta financiera"),alert("No se pudo actualizar la meta financiera. Por favor, intenta de nuevo."))}catch(t){console.error("Error al actualizar meta financiera:",t),alert("Error al actualizar meta financiera. Por favor, intenta de nuevo.")}},onDeleteGoal:a=>{const o=r.find((r=>r.id===a));if(window.confirm(`\xbfEst\xe1s seguro de que deseas eliminar "${(null===o||void 0===o?void 0:o.name)||"esta meta"}"?`))try{(0,Cr.UI)(a)?(console.log("Meta financiera eliminada correctamente"),e((r=>r.filter((r=>r.id!==a))))):(console.error("No se pudo eliminar la meta financiera"),alert("No se pudo eliminar la meta financiera. Por favor, intenta de nuevo."))}catch(t){console.error("Error al eliminar meta financiera:",t),alert("Error al eliminar meta financiera. Por favor, intenta de nuevo.")}}})]})]})}},8090:(r,e,a)=>{a.d(e,{AF:()=>d,DT:()=>y,EP:()=>_,Hm:()=>b,I0:()=>l,J0:()=>j,LS:()=>f,SX:()=>F,UI:()=>E,Uw:()=>u,W1:()=>A,W2:()=>N,XZ:()=>m,_y:()=>C,kQ:()=>z,lC:()=>x,qM:()=>$,saveEvents:()=>S,saveFinancialGoals:()=>k,saveInvestments:()=>v,saveTasks:()=>g,saveTransactions:()=>s,vq:()=>h,x1:()=>p,xn:()=>w,yY:()=>c});const o="mi_app_personal_simple_",t=(r,e)=>{try{const a=`${o}${r}`;return localStorage.setItem(a,JSON.stringify(e)),console.log(`Datos guardados en localStorage con clave ${r}:`,e),!0}catch(a){return console.error(`Error al guardar datos en localStorage con clave ${r}:`,a),!1}},n=function(r){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;try{const a=`${o}${r}`,t=localStorage.getItem(a);if(!t)return e;const n=JSON.parse(t);return console.log(`Datos recuperados de localStorage con clave ${r}:`,n),n}catch(a){return console.error(`Error al obtener datos de localStorage con clave ${r}:`,a),e}},i=()=>`local_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,s=r=>t("transactions",r),l=()=>n("transactions",[]),c=r=>{try{const e={...r,id:r.id||i()},a=[e,...l()];return s(a),e}catch(e){return console.error("Error al agregar transacci\xf3n:",e),null}},d=(r,e)=>{try{const a=l(),o=a.findIndex((e=>e.id===r));if(-1===o)return console.error(`No se encontr\xf3 la transacci\xf3n con ID ${r}`),!1;const t=[...a];return t[o]={...t[o],...e},s(t),t[o]}catch(a){return console.error("Error al actualizar transacci\xf3n:",a),null}},u=r=>{try{const e=l(),a=e.filter((e=>e.id!==r));return a.length===e.length?(console.error(`No se encontr\xf3 la transacci\xf3n con ID ${r}`),!1):(s(a),!0)}catch(e){return console.error("Error al eliminar transacci\xf3n:",e),!1}},g=r=>t("tasks",r),p=()=>n("tasks",[]),m=r=>{try{const e={...r,id:r.id||i(),created_at:r.created_at||(new Date).toISOString().split("T")[0]},a=[...p(),e];return g(a),e}catch(e){return console.error("Error al agregar tarea:",e),null}},x=(r,e)=>{try{const a=p(),o=a.findIndex((e=>e.id===r));if(-1===o)return console.error(`No se encontr\xf3 la tarea con ID ${r}`),!1;const t=[...a];return t[o]={...t[o],...e},g(t),t[o]}catch(a){return console.error("Error al actualizar tarea:",a),null}},h=r=>{try{const e=p(),a=e.filter((e=>e.id!==r));return a.length===e.length?(console.error(`No se encontr\xf3 la tarea con ID ${r}`),!1):(g(a),!0)}catch(e){return console.error("Error al eliminar tarea:",e),!1}},b=r=>{try{const e=p(),a=e.findIndex((e=>e.id===r));if(-1===a)return console.error(`No se encontr\xf3 la tarea con ID ${r}`),!1;const o=[...e];return o[a]={...o[a],completed:!o[a].completed},g(o),o[a]}catch(e){return console.error("Error al cambiar estado de tarea:",e),null}},v=r=>t("investments",r),f=()=>n("investments",[]),y=r=>{try{const e={...r,id:r.id||i()},a=[...f(),e];return v(a),e}catch(e){return console.error("Error al agregar inversi\xf3n:",e),null}},j=(r,e)=>{try{const a=f(),o=a.findIndex((e=>e.id===r));if(-1===o)return console.error(`No se encontr\xf3 la inversi\xf3n con ID ${r}`),!1;const t=[...a];return t[o]={...t[o],...e},v(t),t[o]}catch(a){return console.error("Error al actualizar inversi\xf3n:",a),null}},w=r=>{try{const e=f(),a=e.filter((e=>e.id!==r));return a.length===e.length?(console.error(`No se encontr\xf3 la inversi\xf3n con ID ${r}`),!1):(v(a),!0)}catch(e){return console.error("Error al eliminar inversi\xf3n:",e),!1}},k=r=>t("financial_goals",r),A=()=>n("financial_goals",[]),_=r=>{try{const e={...r,id:r.id||i()},a=[...A(),e];return k(a),e}catch(e){return console.error("Error al agregar meta financiera:",e),null}},C=(r,e)=>{try{const a=A(),o=a.findIndex((e=>e.id===r));if(-1===o)return console.error(`No se encontr\xf3 la meta financiera con ID ${r}`),!1;const t=[...a];return t[o]={...t[o],...e},k(t),t[o]}catch(a){return console.error("Error al actualizar meta financiera:",a),null}},E=r=>{try{const e=A(),a=e.filter((e=>e.id!==r));return a.length===e.length?(console.error(`No se encontr\xf3 la meta financiera con ID ${r}`),!1):(k(a),!0)}catch(e){return console.error("Error al eliminar meta financiera:",e),!1}},S=r=>t("events",r),z=()=>n("events",[]),N=r=>{try{const e={...r,id:r.id||i()},a=[...z(),e];return S(a),e}catch(e){return console.error("Error al agregar evento:",e),null}},$=(r,e)=>{try{const a=z(),o=a.findIndex((e=>e.id===r));if(-1===o)return console.error(`No se encontr\xf3 el evento con ID ${r}`),!1;const t=[...a];return t[o]={...t[o],...e},S(t),t[o]}catch(a){return console.error("Error al actualizar evento:",a),null}},F=r=>{try{const e=z(),a=e.filter((e=>e.id!==r));return a.length===e.length?(console.error(`No se encontr\xf3 el evento con ID ${r}`),!1):(S(a),!0)}catch(e){return console.error("Error al eliminar evento:",e),!1}}}}]);
//# sourceMappingURL=217.f138ddae.chunk.js.map