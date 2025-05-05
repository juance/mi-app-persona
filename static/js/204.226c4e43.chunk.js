"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[90,204],{5204:(e,r,t)=>{t.r(r),t.d(r,{default:()=>ne});var o=t(5043),a=t(5464),n=t(5772),i=t(579);const s=a.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 12px;
  margin-bottom: 20px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    padding: 8px;
    margin-bottom: 16px;
  }
`,l=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`,d=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,c=a.Ay.h2`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  min-width: 150px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    min-width: 120px;
  }
`,p=a.Ay.button`
  background: none;
  border: none;
  color: var(--text-medium);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: all var(--transition-speed);

  &:hover {
    color: var(--primary-color);
    background-color: rgba(99, 102, 241, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 3px;
  }
`,g=a.Ay.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all var(--transition-speed);

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);
  }

  @media (max-width: 768px) {
    padding: 3px 6px;
    font-size: 0.7rem;
  }
`,u=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    gap: 2px;
    margin-bottom: 2px;
  }
`,x=a.Ay.div`
  text-align: center;
  font-weight: 600;
  color: var(--text-medium);
  padding: 4px 2px;
  font-size: 0.7rem;

  @media (max-width: 768px) {
    padding: 2px 1px;
    font-size: 0.65rem;
  }
`,m=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;

  @media (max-width: 768px) {
    gap: 2px;
  }
`,h=a.Ay.div`
  aspect-ratio: 1;
  border-radius: var(--border-radius);
  padding: 4px 2px;
  cursor: pointer;
  position: relative;
  background-color: ${e=>e.isToday?"rgba(99, 102, 241, 0.1)":e.isSelected?"rgba(99, 102, 241, 0.2)":e.isCurrentMonth?"var(--bg-light)":"var(--bg-medium)"};
  color: ${e=>e.isToday?"var(--primary-color)":e.isCurrentMonth?"var(--text-dark)":"var(--text-light)"};
  font-weight: ${e=>e.isToday?"600":"normal"};
  transition: all var(--transition-speed);

  &:hover {
    background-color: ${e=>e.isToday?"rgba(99, 102, 241, 0.2)":"rgba(99, 102, 241, 0.1)"};
    transform: translateY(-1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 2px 1px;
    border-radius: 4px;
  }
`,v=a.Ay.div`
  font-size: 0.75rem;
  margin-bottom: 1px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 0;
  }
`,b=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  justify-content: center;
  max-height: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    max-height: 6px;
  }
`,f=a.Ay.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: ${e=>{switch(e.category){case"personal":return"var(--primary-color)";case"familia":return"var(--secondary-color)";case"duchene":return"var(--accent-color)";case"lavadero":return"var(--danger-color)";case"vapea":return"var(--primary-dark)";default:return"var(--text-light)"}}};

  @media (max-width: 768px) {
    width: 2px;
    height: 2px;
  }
`,y=e=>{let{events:r,onSelectDate:t}=e;const[a,y]=(0,o.useState)(new Date),[w,j]=(0,o.useState)(new Date),k=new Date(a.getFullYear(),a.getMonth(),1),D=(new Date(a.getFullYear(),a.getMonth()+1,0),k.getDay()),E=0===D?6:D-1,A=new Date(k);A.setDate(A.getDate()-E);const z=[],S=new Date(A);for(let o=0;o<42;o++)z.push(new Date(S)),S.setDate(S.getDate()+1);const _=e=>{const r=new Date;return e.getDate()===r.getDate()&&e.getMonth()===r.getMonth()&&e.getFullYear()===r.getFullYear()},C=e=>e.getDate()===w.getDate()&&e.getMonth()===w.getMonth()&&e.getFullYear()===w.getFullYear(),$=e=>e.getMonth()===a.getMonth();return(0,i.jsxs)(s,{children:[(0,i.jsxs)(l,{children:[(0,i.jsxs)(d,{children:[(0,i.jsx)(p,{onClick:()=>{const e=new Date(a);e.setMonth(e.getMonth()-1),y(e)},children:(0,i.jsx)(n.irw,{})}),(0,i.jsxs)(c,{children:[["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][a.getMonth()]," ",a.getFullYear()]}),(0,i.jsx)(p,{onClick:()=>{const e=new Date(a);e.setMonth(e.getMonth()+1),y(e)},children:(0,i.jsx)(n.fOo,{})})]}),(0,i.jsx)(g,{onClick:()=>{y(new Date),j(new Date),t(new Date)},children:"Hoy"})]}),(0,i.jsx)(u,{children:["Lun","Mar","Mi\xe9","Jue","Vie","S\xe1b","Dom"].map((e=>(0,i.jsx)(x,{children:e},e)))}),(0,i.jsx)(m,{children:z.map(((e,o)=>{const a=(n=e,r.filter((e=>{const r=new Date(e.date);return r.getDate()===n.getDate()&&r.getMonth()===n.getMonth()&&r.getFullYear()===n.getFullYear()})));var n;return(0,i.jsxs)(h,{isToday:_(e),isSelected:C(e),isCurrentMonth:$(e),onClick:()=>(e=>{j(e),t(e)})(e),children:[(0,i.jsx)(v,{children:e.getDate()}),(0,i.jsx)(b,{children:a.slice(0,3).map(((e,r)=>(0,i.jsx)(f,{category:e.category},r)))})]},o)}))})]})},w=a.Ay.div`
  margin-top: 20px;
`,j=a.Ay.h3`
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
`,k=a.Ay.div`
  text-align: center;
  color: var(--text-light);
  font-style: italic;
  padding: 30px 0;
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
`,D=a.Ay.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  border-left: 4px solid ${e=>{switch(e.category){case"personal":return"var(--primary-color)";case"familia":return"var(--secondary-color)";case"duchene":return"var(--accent-color)";case"lavadero":return"var(--danger-color)";case"vapea":return"var(--primary-dark)";default:return"var(--text-light)"}}};

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--card-shadow-hover);
  }
`,E=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,A=a.Ay.h4`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
`,z=a.Ay.div`
  display: flex;
  gap: 8px;
`,S=a.Ay.button`
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
`,_=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,C=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-medium);
  font-size: 0.9rem;
`,$=a.Ay.p`
  margin: 12px 0 0;
  color: var(--text-medium);
  font-size: 0.95rem;
  line-height: 1.5;
`,I=a.Ay.span`
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
  background-color: ${e=>{switch(e.category){case"personal":return"rgba(99, 102, 241, 0.1)";case"familia":return"rgba(16, 185, 129, 0.1)";case"duchene":return"rgba(245, 158, 11, 0.1)";case"lavadero":return"rgba(239, 68, 68, 0.1)";case"vapea":return"rgba(168, 85, 247, 0.1)";default:return"rgba(156, 163, 175, 0.1)"}}};
  color: ${e=>{switch(e.category){case"personal":return"var(--primary-color)";case"familia":return"var(--secondary-color)";case"duchene":return"var(--accent-color)";case"lavadero":return"var(--danger-color)";case"vapea":return"var(--primary-dark)";default:return"var(--text-medium)"}}};
`,M=e=>{if(!e)return"";const[r,t]=e.split(":");return`${r}:${t}`},F=e=>{switch(e){case"personal":return"Personal";case"familia":return"Familia";case"duchene":return"Duchene";case"lavadero":return"Lavadero";case"vapea":return"Vapea Conmigo";default:return"Otro"}},N=e=>{let{events:r,selectedDate:t,onEditEvent:o,onDeleteEvent:a}=e;const s=r.filter((e=>{const r=new Date(e.date);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}));return(0,i.jsxs)(w,{children:[(0,i.jsxs)(j,{children:["Eventos para ",(l=t,l.toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"}))]}),0===s.length?(0,i.jsx)(k,{children:"No hay eventos para esta fecha. \xa1Agrega uno nuevo!"}):s.map((e=>(0,i.jsxs)(D,{category:e.category,children:[(0,i.jsxs)(E,{children:[(0,i.jsx)(A,{children:e.title}),(0,i.jsxs)(z,{children:[(0,i.jsx)(S,{onClick:()=>o(e),color:"var(--primary-color)",children:(0,i.jsx)(n.WXf,{})}),(0,i.jsx)(S,{onClick:()=>a(e.id),color:"var(--danger-color)",children:(0,i.jsx)(n.IXo,{})})]})]}),(0,i.jsxs)(_,{children:[(e.start_time||e.end_time)&&(0,i.jsxs)(C,{children:[(0,i.jsx)(n.Ohp,{}),e.start_time&&M(e.start_time),e.end_time&&` - ${M(e.end_time)}`]}),e.location&&(0,i.jsxs)(C,{children:[(0,i.jsx)(n.HzC,{}),e.location]}),(0,i.jsx)(C,{children:(0,i.jsx)(I,{category:e.category,children:F(e.category)})})]}),e.description&&(0,i.jsx)($,{children:e.description})]},e.id)))]});var l},Y=a.Ay.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,T=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,O=a.Ay.h3`
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
`,P=a.Ay.button`
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
`,q=a.Ay.div`
  color: var(--danger-color);
  margin-bottom: 16px;
  font-size: 0.9rem;
  padding: 12px;
  background-color: rgba(239, 68, 68, 0.08);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--danger-color);
`,L=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,W=a.Ay.div`
  margin-bottom: 20px;
  grid-column: ${e=>e.fullWidth?"span 2":"span 1"};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`,G=a.Ay.label`
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
`,J=a.Ay.input`
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
`,H=a.Ay.textarea`
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
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`,X=a.Ay.select`
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
`,U=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,V=a.Ay.button`
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
`,B=a.Ay.button`
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
`,R=e=>{let{event:r,selectedDate:t,onSubmit:a,onCancel:s}=e;const[l,d]=(0,o.useState)({title:"",description:"",date:t?t.toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],start_time:"",end_time:"",location:"",category:"personal"}),[c,p]=(0,o.useState)(""),g=!(null===r||void 0===r||!r.id);(0,o.useEffect)((()=>{r?d({title:r.title||"",description:r.description||"",date:r.date||(t?t.toISOString().split("T")[0]:(new Date).toISOString().split("T")[0]),start_time:r.start_time||"",end_time:r.end_time||"",location:r.location||"",category:r.category||"personal"}):t&&d((e=>({...e,date:t.toISOString().split("T")[0]})))}),[r,t]);const u=e=>{const{name:r,value:t}=e.target;d((e=>({...e,[r]:t})))};return(0,i.jsxs)(Y,{children:[(0,i.jsxs)(T,{children:[(0,i.jsx)(O,{children:g?"Editar Evento":"Crear Nuevo Evento"}),(0,i.jsx)(P,{onClick:s,children:(0,i.jsx)(n.yGN,{})})]}),c&&(0,i.jsx)(q,{children:c}),(0,i.jsxs)("form",{onSubmit:e=>{e.preventDefault(),l.title.trim()?l.start_time&&l.end_time&&l.start_time>l.end_time?p("La hora de inicio debe ser anterior a la hora de fin."):(a({...l,id:(null===r||void 0===r?void 0:r.id)||Date.now()}),p("")):p("Por favor ingresa un t\xedtulo para el evento.")},children:[(0,i.jsxs)(L,{children:[(0,i.jsxs)(W,{fullWidth:!0,children:[(0,i.jsx)(G,{htmlFor:"title",required:!0,children:"T\xedtulo"}),(0,i.jsx)(J,{type:"text",id:"title",name:"title",value:l.title,onChange:u,placeholder:"Ej: Reuni\xf3n de trabajo",required:!0})]}),(0,i.jsxs)(W,{children:[(0,i.jsx)(G,{htmlFor:"date",required:!0,children:"Fecha"}),(0,i.jsx)(J,{type:"date",id:"date",name:"date",value:l.date,onChange:u,required:!0})]}),(0,i.jsxs)(W,{children:[(0,i.jsx)(G,{htmlFor:"category",required:!0,children:"Categor\xeda"}),(0,i.jsxs)(X,{id:"category",name:"category",value:l.category,onChange:u,required:!0,children:[(0,i.jsx)("option",{value:"personal",children:"Personal"}),(0,i.jsx)("option",{value:"familia",children:"Familia"}),(0,i.jsx)("option",{value:"duchene",children:"Duchene"}),(0,i.jsx)("option",{value:"lavadero",children:"Lavadero"}),(0,i.jsx)("option",{value:"vapea",children:"Vapea Conmigo"}),(0,i.jsx)("option",{value:"other",children:"Otro"})]})]}),(0,i.jsxs)(W,{children:[(0,i.jsx)(G,{htmlFor:"start_time",children:"Hora de inicio"}),(0,i.jsx)(J,{type:"time",id:"start_time",name:"start_time",value:l.start_time,onChange:u})]}),(0,i.jsxs)(W,{children:[(0,i.jsx)(G,{htmlFor:"end_time",children:"Hora de fin"}),(0,i.jsx)(J,{type:"time",id:"end_time",name:"end_time",value:l.end_time,onChange:u})]}),(0,i.jsxs)(W,{fullWidth:!0,children:[(0,i.jsx)(G,{htmlFor:"location",children:"Ubicaci\xf3n"}),(0,i.jsx)(J,{type:"text",id:"location",name:"location",value:l.location,onChange:u,placeholder:"Ej: Oficina central"})]}),(0,i.jsxs)(W,{fullWidth:!0,children:[(0,i.jsx)(G,{htmlFor:"description",children:"Descripci\xf3n"}),(0,i.jsx)(H,{id:"description",name:"description",value:l.description,onChange:u,placeholder:"A\xf1ade detalles sobre este evento..."})]})]}),(0,i.jsxs)(U,{children:[(0,i.jsx)(V,{type:"submit",children:g?"Guardar Cambios":"Crear Evento"}),(0,i.jsx)(B,{type:"button",onClick:s,children:"Cancelar"})]})]})]})};var Z=t(6618),K=t(8090);const Q=a.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,ee=a.Ay.div`
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
`,re=a.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,te=a.Ay.div`
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
`,oe=a.Ay.h2`
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
`,ae=a.Ay.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all var(--transition-speed);
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(99, 102, 241, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`,ne=()=>{const[e,r]=(0,o.useState)([]),[t,a]=(0,o.useState)(new Date),[s,l]=(0,o.useState)(!1),[d,c]=(0,o.useState)(null),[p,g]=(0,o.useState)(!0);(0,o.useEffect)((()=>{(()=>{try{g(!0);const e=(0,K.getEvents)();console.log("Eventos cargados desde el almacenamiento local:",e),r(e||[])}catch(e){console.error("Error al cargar eventos:",e)}finally{g(!1)}})();const e=e=>{const{detail:t}=e;if(t.success&&t.stores&&t.stores.includes("events")){console.log("Datos de eventos sincronizados, recargando...");const e=(0,K.getEvents)();e&&e.length>0&&(console.log("Eventos actualizados desde sincronizaci\xf3n:",e.length),r(e),(0,Z.cf)("Eventos actualizados"))}};return window.addEventListener("data-synced",e),()=>{window.removeEventListener("data-synced",e)}}),[]);return(0,i.jsxs)(Q,{children:[(0,i.jsxs)(ee,{children:[(0,i.jsx)("h1",{children:"Calendario"}),(0,i.jsx)("p",{children:"Organiza tus eventos y citas"})]}),(0,i.jsx)(y,{events:e,onSelectDate:e=>{a(e)}}),(0,i.jsxs)(re,{children:[(0,i.jsxs)(te,{children:[(0,i.jsx)(oe,{children:"Eventos"}),(0,i.jsxs)(ae,{onClick:()=>{c(null),l(!s)},children:[(0,i.jsx)(n.GGD,{}),s?"Cancelar":"Nuevo Evento"]})]}),s&&(0,i.jsx)(R,{event:d,selectedDate:t,onSubmit:e=>{try{if(d){const t=(0,K.qM)(e.id,e);t?(console.log("Evento actualizado correctamente:",t),r((r=>r.map((r=>r.id===e.id?t:r)))),c(null),(0,Z.cf)("Evento actualizado correctamente")):(console.error("No se pudo actualizar el evento"),alert("No se pudo actualizar el evento. Por favor, intenta de nuevo."))}else{const t={...e,id:e.id||`event_${Date.now()}_${Math.random().toString(36).substr(2,9)}`},o=(0,K.W2)(t);o?(console.log("Evento agregado correctamente:",o),r((e=>[...e,o])),(0,Z.cf)("Evento creado correctamente")):(console.error("No se pudo agregar el evento"),alert("No se pudo agregar el evento. Por favor, intenta de nuevo."))}l(!1)}catch(t){console.error("Error al guardar el evento:",t),alert("Error al guardar el evento. Por favor, intenta de nuevo.")}},onCancel:()=>{l(!1),c(null)}}),p?(0,i.jsx)("div",{style:{textAlign:"center",padding:"20px"},children:(0,i.jsx)("p",{children:"Cargando eventos..."})}):(0,i.jsx)(N,{events:e,selectedDate:t,onEditEvent:e=>{c(e),l(!0)},onDeleteEvent:e=>{if(window.confirm("\xbfEst\xe1s seguro de que deseas eliminar este evento?"))try{(0,K.SX)(e)?(console.log("Evento eliminado correctamente"),r((r=>r.filter((r=>r.id!==e)))),(0,Z.cf)("Evento eliminado correctamente")):(console.error("No se pudo eliminar el evento"),alert("No se pudo eliminar el evento. Por favor, intenta de nuevo."))}catch(t){console.error("Error al eliminar el evento:",t),alert("Error al eliminar el evento. Por favor, intenta de nuevo.")}}})]})]})}},8090:(e,r,t)=>{t.d(r,{AF:()=>c,DT:()=>y,EP:()=>E,Hm:()=>v,J0:()=>w,SX:()=>I,UI:()=>z,Uw:()=>p,W2:()=>C,XZ:()=>x,_y:()=>A,getEvents:()=>_,getFinancialGoals:()=>D,getInvestments:()=>f,getTasks:()=>u,getTransactions:()=>l,lC:()=>m,qM:()=>$,saveEvents:()=>S,saveFinancialGoals:()=>k,saveInvestments:()=>b,saveTasks:()=>g,saveTransactions:()=>s,vq:()=>h,xn:()=>j,yY:()=>d});const o="mi_app_personal_simple_",a=(e,r)=>{try{const t=`${o}${e}`;return localStorage.setItem(t,JSON.stringify(r)),console.log(`Datos guardados en localStorage con clave ${e}:`,r),!0}catch(t){return console.error(`Error al guardar datos en localStorage con clave ${e}:`,t),!1}},n=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;try{const t=`${o}${e}`,a=localStorage.getItem(t);if(!a)return r;const n=JSON.parse(a);return console.log(`Datos recuperados de localStorage con clave ${e}:`,n),n}catch(t){return console.error(`Error al obtener datos de localStorage con clave ${e}:`,t),r}},i=()=>`local_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,s=e=>a("transactions",e),l=()=>n("transactions",[]),d=e=>{try{const r={...e,id:e.id||i()},t=[r,...l()];return s(t),r}catch(r){return console.error("Error al agregar transacci\xf3n:",r),null}},c=(e,r)=>{try{const t=l(),o=t.findIndex((r=>r.id===e));if(-1===o)return console.error(`No se encontr\xf3 la transacci\xf3n con ID ${e}`),!1;const a=[...t];return a[o]={...a[o],...r},s(a),a[o]}catch(t){return console.error("Error al actualizar transacci\xf3n:",t),null}},p=e=>{try{const r=l(),t=r.filter((r=>r.id!==e));return t.length===r.length?(console.error(`No se encontr\xf3 la transacci\xf3n con ID ${e}`),!1):(s(t),!0)}catch(r){return console.error("Error al eliminar transacci\xf3n:",r),!1}},g=e=>a("tasks",e),u=()=>n("tasks",[]),x=e=>{try{const r={...e,id:e.id||i(),created_at:e.created_at||(new Date).toISOString().split("T")[0]},t=[...u(),r];return g(t),r}catch(r){return console.error("Error al agregar tarea:",r),null}},m=(e,r)=>{try{const t=u(),o=t.findIndex((r=>r.id===e));if(-1===o)return console.error(`No se encontr\xf3 la tarea con ID ${e}`),!1;const a=[...t];return a[o]={...a[o],...r},g(a),a[o]}catch(t){return console.error("Error al actualizar tarea:",t),null}},h=e=>{try{const r=u(),t=r.filter((r=>r.id!==e));return t.length===r.length?(console.error(`No se encontr\xf3 la tarea con ID ${e}`),!1):(g(t),!0)}catch(r){return console.error("Error al eliminar tarea:",r),!1}},v=e=>{try{const r=u(),t=r.findIndex((r=>r.id===e));if(-1===t)return console.error(`No se encontr\xf3 la tarea con ID ${e}`),!1;const o=[...r];return o[t]={...o[t],completed:!o[t].completed},g(o),o[t]}catch(r){return console.error("Error al cambiar estado de tarea:",r),null}},b=e=>a("investments",e),f=()=>n("investments",[]),y=e=>{try{const r={...e,id:e.id||i()},t=[...f(),r];return b(t),r}catch(r){return console.error("Error al agregar inversi\xf3n:",r),null}},w=(e,r)=>{try{const t=f(),o=t.findIndex((r=>r.id===e));if(-1===o)return console.error(`No se encontr\xf3 la inversi\xf3n con ID ${e}`),!1;const a=[...t];return a[o]={...a[o],...r},b(a),a[o]}catch(t){return console.error("Error al actualizar inversi\xf3n:",t),null}},j=e=>{try{const r=f(),t=r.filter((r=>r.id!==e));return t.length===r.length?(console.error(`No se encontr\xf3 la inversi\xf3n con ID ${e}`),!1):(b(t),!0)}catch(r){return console.error("Error al eliminar inversi\xf3n:",r),!1}},k=e=>a("financial_goals",e),D=()=>n("financial_goals",[]),E=e=>{try{const r={...e,id:e.id||i()},t=[...D(),r];return k(t),r}catch(r){return console.error("Error al agregar meta financiera:",r),null}},A=(e,r)=>{try{const t=D(),o=t.findIndex((r=>r.id===e));if(-1===o)return console.error(`No se encontr\xf3 la meta financiera con ID ${e}`),!1;const a=[...t];return a[o]={...a[o],...r},k(a),a[o]}catch(t){return console.error("Error al actualizar meta financiera:",t),null}},z=e=>{try{const r=D(),t=r.filter((r=>r.id!==e));return t.length===r.length?(console.error(`No se encontr\xf3 la meta financiera con ID ${e}`),!1):(k(t),!0)}catch(r){return console.error("Error al eliminar meta financiera:",r),!1}},S=e=>a("events",e),_=()=>n("events",[]),C=e=>{try{const r={...e,id:e.id||i()},t=[..._(),r];return S(t),r}catch(r){return console.error("Error al agregar evento:",r),null}},$=(e,r)=>{try{const t=_(),o=t.findIndex((r=>r.id===e));if(-1===o)return console.error(`No se encontr\xf3 el evento con ID ${e}`),!1;const a=[...t];return a[o]={...a[o],...r},S(a),a[o]}catch(t){return console.error("Error al actualizar evento:",t),null}},I=e=>{try{const r=_(),t=r.filter((r=>r.id!==e));return t.length===r.length?(console.error(`No se encontr\xf3 el evento con ID ${e}`),!1):(S(t),!0)}catch(r){return console.error("Error al eliminar evento:",r),!1}}}}]);
//# sourceMappingURL=204.226c4e43.chunk.js.map