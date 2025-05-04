"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[187],{187:(r,e,o)=>{o.r(e),o.d(e,{default:()=>dr});var a=o(5043),t=o(5464),n=o(6058),i=o(7304),s=o(2771),l=o(579);i.t1.register(i.Bs,i.m_,i.s$,i.PP,i.kc,i.E8,i.hE);const c=t.Ay.div`
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
`,p=t.Ay.button`
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
`,g=t.Ay.div`
  height: 350px;
  width: 100%;
  position: relative;
  padding: 10px;
`,m=r=>{let{goals:e}=r;const[o,t]=(0,a.useState)("bar"),{darkMode:i}=(0,s.A)(),[m,x]=(0,a.useState)(null),[h,b]=(0,a.useState)(null);return(0,a.useEffect)((()=>{if(!e||0===e.length)return;const r=e.map((r=>r.name)),a=e.map((r=>r.current_amount)),t=(e.map((r=>r.target_amount)),e.map((r=>Math.max(0,r.target_amount-r.current_amount)))),n=["rgba(99, 102, 241, 0.7)","rgba(239, 68, 68, 0.7)","rgba(245, 158, 11, 0.7)","rgba(16, 185, 129, 0.7)","rgba(59, 130, 246, 0.7)","rgba(168, 85, 247, 0.7)","rgba(236, 72, 153, 0.7)"];"bar"===o?(x({labels:r,datasets:[{label:"Monto Actual",data:a,backgroundColor:"rgba(99, 102, 241, 0.7)",borderColor:"rgba(99, 102, 241, 1)",borderWidth:1},{label:"Monto Restante",data:t,backgroundColor:"rgba(239, 68, 68, 0.7)",borderColor:"rgba(239, 68, 68, 1)",borderWidth:1}]}),b({responsive:!0,maintainAspectRatio:!1,scales:{x:{stacked:!0,ticks:{color:i?"#e5e7eb":"#4b5563"},grid:{color:i?"rgba(255, 255, 255, 0.1)":"rgba(0, 0, 0, 0.1)"}},y:{stacked:!0,beginAtZero:!0,ticks:{callback:function(r){return new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS",maximumFractionDigits:0}).format(r)},color:i?"#e5e7eb":"#4b5563"},grid:{color:i?"rgba(255, 255, 255, 0.1)":"rgba(0, 0, 0, 0.1)"}}},plugins:{legend:{labels:{color:i?"#e5e7eb":"#4b5563"}},tooltip:{callbacks:{label:function(r){return r.dataset.label+": "+new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS"}).format(r.raw)}}}}})):(x({labels:r,datasets:[{data:a,backgroundColor:n,borderColor:n.map((r=>r.replace("0.7","1"))),borderWidth:1}]}),b({responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"right",labels:{color:i?"#e5e7eb":"#4b5563"}},tooltip:{callbacks:{label:function(r){const o=e[r.dataIndex],a=Math.round(o.current_amount/o.target_amount*100);return r.label+": "+new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS"}).format(r.raw)+` (${a}% del objetivo)`}}}}}))}),[e,o,i]),e&&0!==e.length&&m&&h?(0,l.jsxs)(c,{children:[(0,l.jsx)(d,{children:"Resumen de Metas Financieras"}),(0,l.jsxs)(u,{children:[(0,l.jsx)(p,{active:"bar"===o,onClick:()=>t("bar"),children:"Barras"}),(0,l.jsx)(p,{active:"pie"===o,onClick:()=>t("pie"),children:"Circular"})]}),(0,l.jsx)(g,{children:"bar"===o?(0,l.jsx)(n.yP,{data:m,options:h}):(0,l.jsx)(n.Fq,{data:m,options:h})})]}):null},x=t.Ay.div`
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
`,f=r=>{let{filters:e,onFilterChange:o}=r;const a=r=>{const{name:a,value:t}=r.target;o({...e,[a]:t})};return(0,l.jsxs)(x,{children:[(0,l.jsxs)(h,{children:[(0,l.jsx)(b,{htmlFor:"categoryFilter",children:"Filtrar por categor\xeda:"}),(0,l.jsxs)(v,{id:"categoryFilter",name:"category",value:e.category,onChange:a,children:[(0,l.jsx)("option",{value:"all",children:"Todas las categor\xedas"}),(0,l.jsx)("option",{value:"savings",children:"Ahorros"}),(0,l.jsx)("option",{value:"investment",children:"Inversi\xf3n"}),(0,l.jsx)("option",{value:"purchase",children:"Compra"}),(0,l.jsx)("option",{value:"travel",children:"Viaje"}),(0,l.jsx)("option",{value:"education",children:"Educaci\xf3n"}),(0,l.jsx)("option",{value:"home",children:"Hogar"}),(0,l.jsx)("option",{value:"other",children:"Otro"})]})]}),(0,l.jsxs)(h,{children:[(0,l.jsx)(b,{htmlFor:"progressFilter",children:"Filtrar por progreso:"}),(0,l.jsxs)(v,{id:"progressFilter",name:"progress",value:e.progress,onChange:a,children:[(0,l.jsx)("option",{value:"all",children:"Todos"}),(0,l.jsx)("option",{value:"less25",children:"Menos del 25%"}),(0,l.jsx)("option",{value:"25to50",children:"25% - 50%"}),(0,l.jsx)("option",{value:"50to75",children:"50% - 75%"}),(0,l.jsx)("option",{value:"more75",children:"M\xe1s del 75%"}),(0,l.jsx)("option",{value:"completed",children:"Completados"})]})]}),(0,l.jsxs)(h,{children:[(0,l.jsx)(b,{htmlFor:"sortBy",children:"Ordenar por:"}),(0,l.jsxs)(v,{id:"sortBy",name:"sortBy",value:e.sortBy,onChange:a,children:[(0,l.jsx)("option",{value:"name",children:"Nombre"}),(0,l.jsx)("option",{value:"deadline",children:"Fecha l\xedmite"}),(0,l.jsx)("option",{value:"progress",children:"Progreso"}),(0,l.jsx)("option",{value:"amount",children:"Monto objetivo"})]})]})]})},y=t.Ay.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,j=t.Ay.h3`
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
`,w=t.Ay.div`
  color: var(--danger-color);
  margin-bottom: 16px;
  font-size: 0.9rem;
  padding: 12px;
  background-color: rgba(239, 68, 68, 0.08);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--danger-color);
`,k=t.Ay.div`
  margin-bottom: 20px;
`,A=t.Ay.label`
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
`,_=t.Ay.input`
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
`,C=t.Ay.select`
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
`,E=t.Ay.button`
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
`,z={name:"",target_amount:"",current_amount:"0",category:"savings",deadline:""},F=r=>{let{onSubmit:e,onCancel:o}=r;const[t,n]=(0,a.useState)(z),[i,s]=(0,a.useState)(""),c=r=>{const{name:e,value:o}=r.target;n((r=>({...r,[e]:o})))};return(0,l.jsxs)(y,{children:[(0,l.jsx)(j,{children:"Crear Nuevo Objetivo Financiero"}),i&&(0,l.jsx)(w,{children:i}),(0,l.jsxs)("form",{onSubmit:r=>{r.preventDefault(),t.name.trim()?!t.target_amount||parseFloat(t.target_amount)<=0?s("Por favor ingresa un monto objetivo v\xe1lido."):parseFloat(t.current_amount)>parseFloat(t.target_amount)?s("El monto actual no puede ser mayor que el monto objetivo."):(e({...t,target_amount:parseFloat(t.target_amount),current_amount:parseFloat(t.current_amount||0)}),n(z),s("")):s("Por favor ingresa un nombre para el objetivo.")},children:[(0,l.jsxs)(k,{children:[(0,l.jsx)(A,{htmlFor:"name",required:!0,children:"Nombre del objetivo"}),(0,l.jsx)(_,{type:"text",id:"name",name:"name",value:t.name,onChange:c,required:!0})]}),(0,l.jsxs)(k,{children:[(0,l.jsx)(A,{htmlFor:"target_amount",required:!0,children:"Monto objetivo (ARS)"}),(0,l.jsx)(_,{type:"number",id:"target_amount",name:"target_amount",min:"1",step:"0.01",value:t.target_amount,onChange:c,required:!0})]}),(0,l.jsxs)(k,{children:[(0,l.jsx)(A,{htmlFor:"current_amount",children:"Monto actual (ARS)"}),(0,l.jsx)(_,{type:"number",id:"current_amount",name:"current_amount",min:"0",step:"0.01",value:t.current_amount,onChange:c})]}),(0,l.jsxs)(k,{children:[(0,l.jsx)(A,{htmlFor:"category",required:!0,children:"Categor\xeda"}),(0,l.jsxs)(C,{id:"category",name:"category",value:t.category,onChange:c,required:!0,children:[(0,l.jsx)("option",{value:"savings",children:"Ahorros"}),(0,l.jsx)("option",{value:"investment",children:"Inversi\xf3n"}),(0,l.jsx)("option",{value:"purchase",children:"Compra"}),(0,l.jsx)("option",{value:"travel",children:"Viaje"}),(0,l.jsx)("option",{value:"education",children:"Educaci\xf3n"}),(0,l.jsx)("option",{value:"home",children:"Hogar"}),(0,l.jsx)("option",{value:"other",children:"Otro"})]})]}),(0,l.jsxs)(k,{children:[(0,l.jsx)(A,{htmlFor:"deadline",children:"Fecha l\xedmite"}),(0,l.jsx)(_,{type:"date",id:"deadline",name:"deadline",value:t.deadline,onChange:c})]}),(0,l.jsx)(E,{type:"submit",children:"Guardar Objetivo"})]})]})};var S=o(5772);const N=t.Ay.div`
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
`,$=t.Ay.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`,I=t.Ay.div`
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

  ${N}:hover & {
    transform: scale(1.1);
    background-color: rgba(99, 102, 241, 0.15);
  }
`,D=t.Ay.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  line-height: 1.4;
`,M=t.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: var(--bg-light);
  padding: 16px;
  border-radius: var(--border-radius);
`,P=t.Ay.div`
  display: flex;
  flex-direction: column;
`,R=t.Ay.span`
  font-size: 0.85rem;
  color: var(--text-medium);
  margin-bottom: 4px;
  font-weight: 500;
`,q=t.Ay.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${r=>"current"===r.type?"var(--primary-color)":"var(--secondary-color)"};
`,O=t.Ay.div`
  margin-bottom: 20px;
`,B=t.Ay.div`
  height: 12px;
  background-color: var(--bg-medium);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
`,Y=t.Ay.div`
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
`,U=t.Ay.div`
  text-align: right;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-medium);
`,G=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`,H=t.Ay.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-light);
  padding: 10px 14px;
  border-radius: var(--border-radius);
  border-left: 3px solid var(--accent-color);
`,W=t.Ay.span`
  font-size: 0.8rem;
  color: var(--text-medium);
  margin-bottom: 4px;
  font-weight: 500;
`,T=t.Ay.span`
  font-size: 0.95rem;
  color: var(--text-dark);
  font-weight: 600;
`,J=t.Ay.div`
  display: flex;
  gap: 10px;
`,V=t.Ay.button`
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
`,L=t.Ay.button`
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
`,Z=r=>{switch(r){case"savings":return(0,l.jsx)(S.z8N,{});case"investment":return(0,l.jsx)(S.ARf,{});case"purchase":return(0,l.jsx)(S.y52,{});case"travel":return(0,l.jsx)(S.HzC,{});case"education":return(0,l.jsx)(S.H9b,{});case"home":return(0,l.jsx)(S.V5Y,{});default:return(0,l.jsx)(S.x_j,{})}},X=r=>new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS"}).format(r),K=r=>{if(!r)return"Sin fecha l\xedmite";return new Date(r).toLocaleDateString("es-ES")},Q=r=>{let{goal:e,onUpdate:o,onDelete:a}=r;const t=Math.min(100,Math.round(e.current_amount/e.target_amount*100));return(0,l.jsxs)(N,{children:[(0,l.jsxs)($,{children:[(0,l.jsx)(I,{children:Z(e.category)}),(0,l.jsx)(D,{children:e.name})]}),(0,l.jsxs)(M,{children:[(0,l.jsxs)(P,{children:[(0,l.jsx)(R,{children:"Actual:"}),(0,l.jsx)(q,{type:"current",children:X(e.current_amount)})]}),(0,l.jsxs)(P,{children:[(0,l.jsx)(R,{children:"Objetivo:"}),(0,l.jsx)(q,{type:"target",children:X(e.target_amount)})]})]}),(0,l.jsxs)(O,{children:[(0,l.jsx)(B,{children:(0,l.jsx)(Y,{progress:t})}),(0,l.jsxs)(U,{children:[t,"%"]})]}),(0,l.jsxs)(G,{children:[(0,l.jsxs)(H,{children:[(0,l.jsx)(W,{children:"Fecha l\xedmite:"}),(0,l.jsx)(T,{children:K(e.deadline)})]}),(0,l.jsxs)(J,{children:[(0,l.jsx)(V,{onClick:()=>o(e.id),children:"Actualizar"}),(0,l.jsx)(L,{onClick:()=>a(e.id),children:"\ud83d\uddd1\ufe0f"})]})]})]})},rr=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,er=t.Ay.div`
  text-align: center;
  color: var(--text-light);
  font-style: italic;
  padding: 30px 0;
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
  grid-column: 1 / -1;
`,or=r=>{let{goals:e,onUpdateGoal:o,onDeleteGoal:a}=r;return e&&0!==e.length?(0,l.jsx)(rr,{children:e.map((r=>(0,l.jsx)(Q,{goal:r,onUpdate:o,onDelete:a},r.id)))}):(0,l.jsx)(rr,{children:(0,l.jsx)(er,{children:"No hay objetivos financieros. \xa1Crea uno nuevo!"})})};var ar=o(8090);const tr=t.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,nr=t.Ay.div`
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
`,ir=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,sr=t.Ay.div`
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
`,lr=t.Ay.h2`
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
`,cr=t.Ay.button`
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
`,dr=()=>{const[r,e]=(0,a.useState)([]),[o,t]=(0,a.useState)(!1),[n,i]=(0,a.useState)({category:"all",progress:"all",sortBy:"name"}),[s,c]=(0,a.useState)([]),[d,u]=(0,a.useState)(!0);(0,a.useEffect)((()=>{(()=>{try{u(!0);const r=(0,ar.W1)();console.log("Metas financieras cargadas desde el almacenamiento local:",r),e(r||[])}catch(r){console.error("Error al cargar metas financieras:",r)}finally{u(!1)}})()}),[]),(0,a.useEffect)((()=>{let e=[...r];"all"!==n.category&&(e=e.filter((r=>r.category===n.category))),"all"!==n.progress&&(e=e.filter((r=>{const e=Math.round(r.current_amount/r.target_amount*100);switch(n.progress){case"less25":return e<25;case"25to50":return e>=25&&e<50;case"50to75":return e>=50&&e<75;case"more75":return e>=75&&e<100;case"completed":return e>=100;default:return!0}}))),e.sort(((r,e)=>{switch(n.sortBy){case"name":return r.name.localeCompare(e.name);case"deadline":return r.deadline?e.deadline?new Date(r.deadline)-new Date(e.deadline):-1:1;case"progress":const o=r.current_amount/r.target_amount*100;return e.current_amount/e.target_amount*100-o;case"amount":return e.target_amount-r.target_amount;default:return 0}})),c(e)}),[r,n]);return(0,l.jsxs)(tr,{children:[(0,l.jsxs)(nr,{children:[(0,l.jsx)("h1",{children:"Metas Financieras"}),(0,l.jsx)("p",{children:"Establece y realiza seguimiento de tus objetivos financieros"})]}),(0,l.jsx)(m,{goals:r}),(0,l.jsxs)(ir,{children:[(0,l.jsxs)(sr,{children:[(0,l.jsx)(lr,{children:"Objetivos Financieros"}),(0,l.jsx)(cr,{onClick:()=>t(!o),children:o?"Cancelar":"Nuevo Objetivo"})]}),o&&(0,l.jsx)(F,{onSubmit:r=>{try{const o=(0,ar.EP)(r);o?(console.log("Meta financiera agregada correctamente:",o),e((r=>[...r,o])),t(!1)):(console.error("No se pudo agregar la meta financiera"),alert("No se pudo agregar la meta financiera. Por favor, intenta de nuevo."))}catch(o){console.error("Error al agregar meta financiera:",o),alert("Error al agregar meta financiera. Por favor, intenta de nuevo.")}},onCancel:()=>t(!1)}),(0,l.jsx)(f,{filters:n,onFilterChange:i}),(0,l.jsx)(or,{goals:s,onUpdateGoal:o=>{const a=prompt("Ingresa el monto a agregar:");if(a&&!isNaN(a)&&parseFloat(a)>0)try{const t=r.find((r=>r.id===o));if(!t)return void console.error("No se encontr\xf3 la meta financiera");const n=t.current_amount+parseFloat(a),i=(0,ar._y)(o,{...t,current_amount:n});i?(console.log("Meta financiera actualizada correctamente:",i),e((r=>r.map((r=>r.id===o?{...r,current_amount:n}:r))))):(console.error("No se pudo actualizar la meta financiera"),alert("No se pudo actualizar la meta financiera. Por favor, intenta de nuevo."))}catch(t){console.error("Error al actualizar meta financiera:",t),alert("Error al actualizar meta financiera. Por favor, intenta de nuevo.")}},onDeleteGoal:o=>{const a=r.find((r=>r.id===o));if(window.confirm(`\xbfEst\xe1s seguro de que deseas eliminar "${(null===a||void 0===a?void 0:a.name)||"esta meta"}"?`))try{(0,ar.UI)(o)?(console.log("Meta financiera eliminada correctamente"),e((r=>r.filter((r=>r.id!==o))))):(console.error("No se pudo eliminar la meta financiera"),alert("No se pudo eliminar la meta financiera. Por favor, intenta de nuevo."))}catch(t){console.error("Error al eliminar meta financiera:",t),alert("Error al eliminar meta financiera. Por favor, intenta de nuevo.")}}})]})]})}},8090:(r,e,o)=>{o.d(e,{AF:()=>d,DT:()=>y,EP:()=>_,Hm:()=>b,I0:()=>l,J0:()=>j,LS:()=>f,UI:()=>E,Uw:()=>u,W1:()=>A,XZ:()=>m,_y:()=>C,lC:()=>x,vq:()=>h,x1:()=>g,xn:()=>w,xo:()=>s,yY:()=>c});const a="mi_app_personal_simple_",t=(r,e)=>{try{const o=`${a}${r}`;return localStorage.setItem(o,JSON.stringify(e)),console.log(`Datos guardados en localStorage con clave ${r}:`,e),!0}catch(o){return console.error(`Error al guardar datos en localStorage con clave ${r}:`,o),!1}},n=function(r){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;try{const o=`${a}${r}`,t=localStorage.getItem(o);if(!t)return e;const n=JSON.parse(t);return console.log(`Datos recuperados de localStorage con clave ${r}:`,n),n}catch(o){return console.error(`Error al obtener datos de localStorage con clave ${r}:`,o),e}},i=()=>`local_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,s=r=>t("transactions",r),l=()=>n("transactions",[]),c=r=>{try{const e={...r,id:r.id||i()},o=[e,...l()];return s(o),e}catch(e){return console.error("Error al agregar transacci\xf3n:",e),null}},d=(r,e)=>{try{const o=l(),a=o.findIndex((e=>e.id===r));if(-1===a)return console.error(`No se encontr\xf3 la transacci\xf3n con ID ${r}`),!1;const t=[...o];return t[a]={...t[a],...e},s(t),t[a]}catch(o){return console.error("Error al actualizar transacci\xf3n:",o),null}},u=r=>{try{const e=l(),o=e.filter((e=>e.id!==r));return o.length===e.length?(console.error(`No se encontr\xf3 la transacci\xf3n con ID ${r}`),!1):(s(o),!0)}catch(e){return console.error("Error al eliminar transacci\xf3n:",e),!1}},p=r=>t("tasks",r),g=()=>n("tasks",[]),m=r=>{try{const e={...r,id:r.id||i(),created_at:r.created_at||(new Date).toISOString().split("T")[0]},o=[...g(),e];return p(o),e}catch(e){return console.error("Error al agregar tarea:",e),null}},x=(r,e)=>{try{const o=g(),a=o.findIndex((e=>e.id===r));if(-1===a)return console.error(`No se encontr\xf3 la tarea con ID ${r}`),!1;const t=[...o];return t[a]={...t[a],...e},p(t),t[a]}catch(o){return console.error("Error al actualizar tarea:",o),null}},h=r=>{try{const e=g(),o=e.filter((e=>e.id!==r));return o.length===e.length?(console.error(`No se encontr\xf3 la tarea con ID ${r}`),!1):(p(o),!0)}catch(e){return console.error("Error al eliminar tarea:",e),!1}},b=r=>{try{const e=g(),o=e.findIndex((e=>e.id===r));if(-1===o)return console.error(`No se encontr\xf3 la tarea con ID ${r}`),!1;const a=[...e];return a[o]={...a[o],completed:!a[o].completed},p(a),a[o]}catch(e){return console.error("Error al cambiar estado de tarea:",e),null}},v=r=>t("investments",r),f=()=>n("investments",[]),y=r=>{try{const e={...r,id:r.id||i()},o=[...f(),e];return v(o),e}catch(e){return console.error("Error al agregar inversi\xf3n:",e),null}},j=(r,e)=>{try{const o=f(),a=o.findIndex((e=>e.id===r));if(-1===a)return console.error(`No se encontr\xf3 la inversi\xf3n con ID ${r}`),!1;const t=[...o];return t[a]={...t[a],...e},v(t),t[a]}catch(o){return console.error("Error al actualizar inversi\xf3n:",o),null}},w=r=>{try{const e=f(),o=e.filter((e=>e.id!==r));return o.length===e.length?(console.error(`No se encontr\xf3 la inversi\xf3n con ID ${r}`),!1):(v(o),!0)}catch(e){return console.error("Error al eliminar inversi\xf3n:",e),!1}},k=r=>t("financial_goals",r),A=()=>n("financial_goals",[]),_=r=>{try{const e={...r,id:r.id||i()},o=[...A(),e];return k(o),e}catch(e){return console.error("Error al agregar meta financiera:",e),null}},C=(r,e)=>{try{const o=A(),a=o.findIndex((e=>e.id===r));if(-1===a)return console.error(`No se encontr\xf3 la meta financiera con ID ${r}`),!1;const t=[...o];return t[a]={...t[a],...e},k(t),t[a]}catch(o){return console.error("Error al actualizar meta financiera:",o),null}},E=r=>{try{const e=A(),o=e.filter((e=>e.id!==r));return o.length===e.length?(console.error(`No se encontr\xf3 la meta financiera con ID ${r}`),!1):(k(o),!0)}catch(e){return console.error("Error al eliminar meta financiera:",e),!1}}}}]);
//# sourceMappingURL=187.716adfac.chunk.js.map