"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[204],{5204:(e,r,t)=>{t.r(r),t.d(r,{default:()=>oe});var a=t(5043),o=t(5464),i=t(5772),n=t(579);const d=o.Ay.div`
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
`,s=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`,l=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,c=o.Ay.h2`
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
`,p=o.Ay.button`
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
`,x=o.Ay.button`
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
`,g=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    gap: 2px;
    margin-bottom: 2px;
  }
`,m=o.Ay.div`
  text-align: center;
  font-weight: 600;
  color: var(--text-medium);
  padding: 4px 2px;
  font-size: 0.7rem;

  @media (max-width: 768px) {
    padding: 2px 1px;
    font-size: 0.65rem;
  }
`,u=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;

  @media (max-width: 768px) {
    gap: 2px;
  }
`,h=o.Ay.div`
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
`,v=o.Ay.div`
  font-size: 0.75rem;
  margin-bottom: 1px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    margin-bottom: 0;
  }
`,b=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  justify-content: center;
  max-height: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    max-height: 6px;
  }
`,f=o.Ay.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: ${e=>{switch(e.category){case"personal":return"var(--primary-color)";case"familia":return"var(--secondary-color)";case"duchene":return"var(--accent-color)";case"lavadero":return"var(--danger-color)";case"vapea":return"var(--primary-dark)";default:return"var(--text-light)"}}};

  @media (max-width: 768px) {
    width: 2px;
    height: 2px;
  }
`,y=e=>{let{events:r,onSelectDate:t}=e;const[o,y]=(0,a.useState)(new Date),[w,j]=(0,a.useState)(new Date),k=new Date(o.getFullYear(),o.getMonth(),1),A=(new Date(o.getFullYear(),o.getMonth()+1,0),k.getDay()),D=0===A?6:A-1,C=new Date(k);C.setDate(C.getDate()-D);const z=[],S=new Date(C);for(let a=0;a<42;a++)z.push(new Date(S)),S.setDate(S.getDate()+1);const _=e=>{const r=new Date;return e.getDate()===r.getDate()&&e.getMonth()===r.getMonth()&&e.getFullYear()===r.getFullYear()},M=e=>e.getDate()===w.getDate()&&e.getMonth()===w.getMonth()&&e.getFullYear()===w.getFullYear(),E=e=>e.getMonth()===o.getMonth();return(0,n.jsxs)(d,{children:[(0,n.jsxs)(s,{children:[(0,n.jsxs)(l,{children:[(0,n.jsx)(p,{onClick:()=>{const e=new Date(o);e.setMonth(e.getMonth()-1),y(e)},children:(0,n.jsx)(i.irw,{})}),(0,n.jsxs)(c,{children:[["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"][o.getMonth()]," ",o.getFullYear()]}),(0,n.jsx)(p,{onClick:()=>{const e=new Date(o);e.setMonth(e.getMonth()+1),y(e)},children:(0,n.jsx)(i.fOo,{})})]}),(0,n.jsx)(x,{onClick:()=>{y(new Date),j(new Date),t(new Date)},children:"Hoy"})]}),(0,n.jsx)(g,{children:["Lun","Mar","Mi\xe9","Jue","Vie","S\xe1b","Dom"].map((e=>(0,n.jsx)(m,{children:e},e)))}),(0,n.jsx)(u,{children:z.map(((e,a)=>{const o=(i=e,r.filter((e=>{const r=new Date(e.date);return r.getDate()===i.getDate()&&r.getMonth()===i.getMonth()&&r.getFullYear()===i.getFullYear()})));var i;return(0,n.jsxs)(h,{isToday:_(e),isSelected:M(e),isCurrentMonth:E(e),onClick:()=>(e=>{j(e),t(e)})(e),children:[(0,n.jsx)(v,{children:e.getDate()}),(0,n.jsx)(b,{children:o.slice(0,3).map(((e,r)=>(0,n.jsx)(f,{category:e.category},r)))})]},a)}))})]})},w=o.Ay.div`
  margin-top: 20px;
`,j=o.Ay.h3`
  margin: 0 0 16px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
`,k=o.Ay.div`
  text-align: center;
  color: var(--text-light);
  font-style: italic;
  padding: 30px 0;
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
`,A=o.Ay.div`
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
`,D=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,C=o.Ay.h4`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
`,z=o.Ay.div`
  display: flex;
  gap: 8px;
`,S=o.Ay.button`
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
`,_=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,M=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-medium);
  font-size: 0.9rem;
`,E=o.Ay.p`
  margin: 12px 0 0;
  color: var(--text-medium);
  font-size: 0.95rem;
  line-height: 1.5;
`,F=o.Ay.span`
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
  background-color: ${e=>{switch(e.category){case"personal":return"rgba(99, 102, 241, 0.1)";case"familia":return"rgba(16, 185, 129, 0.1)";case"duchene":return"rgba(245, 158, 11, 0.1)";case"lavadero":return"rgba(239, 68, 68, 0.1)";case"vapea":return"rgba(168, 85, 247, 0.1)";default:return"rgba(156, 163, 175, 0.1)"}}};
  color: ${e=>{switch(e.category){case"personal":return"var(--primary-color)";case"familia":return"var(--secondary-color)";case"duchene":return"var(--accent-color)";case"lavadero":return"var(--danger-color)";case"vapea":return"var(--primary-dark)";default:return"var(--text-medium)"}}};
`,Y=e=>{if(!e)return"";const[r,t]=e.split(":");return`${r}:${t}`},$=e=>{switch(e){case"personal":return"Personal";case"familia":return"Familia";case"duchene":return"Duchene";case"lavadero":return"Lavadero";case"vapea":return"Vapea Conmigo";default:return"Otro"}},O=e=>{let{events:r,selectedDate:t,onEditEvent:a,onDeleteEvent:o}=e;const d=r.filter((e=>{const r=new Date(e.date);return r.getDate()===t.getDate()&&r.getMonth()===t.getMonth()&&r.getFullYear()===t.getFullYear()}));return(0,n.jsxs)(w,{children:[(0,n.jsxs)(j,{children:["Eventos para ",(s=t,s.toLocaleDateString("es-ES",{weekday:"long",day:"numeric",month:"long",year:"numeric"}))]}),0===d.length?(0,n.jsx)(k,{children:"No hay eventos para esta fecha. \xa1Agrega uno nuevo!"}):d.map((e=>(0,n.jsxs)(A,{category:e.category,children:[(0,n.jsxs)(D,{children:[(0,n.jsx)(C,{children:e.title}),(0,n.jsxs)(z,{children:[(0,n.jsx)(S,{onClick:()=>a(e),color:"var(--primary-color)",children:(0,n.jsx)(i.WXf,{})}),(0,n.jsx)(S,{onClick:()=>o(e.id),color:"var(--danger-color)",children:(0,n.jsx)(i.IXo,{})})]})]}),(0,n.jsxs)(_,{children:[(e.start_time||e.end_time)&&(0,n.jsxs)(M,{children:[(0,n.jsx)(i.Ohp,{}),e.start_time&&Y(e.start_time),e.end_time&&` - ${Y(e.end_time)}`]}),e.location&&(0,n.jsxs)(M,{children:[(0,n.jsx)(i.HzC,{}),e.location]}),(0,n.jsx)(M,{children:(0,n.jsx)(F,{category:e.category,children:$(e.category)})})]}),e.description&&(0,n.jsx)(E,{children:e.description})]},e.id)))]});var s},T=o.Ay.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,q=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,P=o.Ay.h3`
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
`,I=o.Ay.button`
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
`,L=o.Ay.div`
  color: var(--danger-color);
  margin-bottom: 16px;
  font-size: 0.9rem;
  padding: 12px;
  background-color: rgba(239, 68, 68, 0.08);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--danger-color);
`,N=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,W=o.Ay.div`
  margin-bottom: 20px;
  grid-column: ${e=>e.fullWidth?"span 2":"span 1"};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`,G=o.Ay.label`
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
`,H=o.Ay.input`
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
`,J=o.Ay.textarea`
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
`,V=o.Ay.select`
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
`,X=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,B=o.Ay.button`
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
`,R=o.Ay.button`
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
`,U=e=>{let{event:r,selectedDate:t,onSubmit:o,onCancel:d}=e;const[s,l]=(0,a.useState)({title:"",description:"",date:t?t.toISOString().split("T")[0]:(new Date).toISOString().split("T")[0],start_time:"",end_time:"",location:"",category:"personal"}),[c,p]=(0,a.useState)(""),x=!(null===r||void 0===r||!r.id);(0,a.useEffect)((()=>{r?l({title:r.title||"",description:r.description||"",date:r.date||(t?t.toISOString().split("T")[0]:(new Date).toISOString().split("T")[0]),start_time:r.start_time||"",end_time:r.end_time||"",location:r.location||"",category:r.category||"personal"}):t&&l((e=>({...e,date:t.toISOString().split("T")[0]})))}),[r,t]);const g=e=>{const{name:r,value:t}=e.target;l((e=>({...e,[r]:t})))};return(0,n.jsxs)(T,{children:[(0,n.jsxs)(q,{children:[(0,n.jsx)(P,{children:x?"Editar Evento":"Crear Nuevo Evento"}),(0,n.jsx)(I,{onClick:d,children:(0,n.jsx)(i.yGN,{})})]}),c&&(0,n.jsx)(L,{children:c}),(0,n.jsxs)("form",{onSubmit:e=>{e.preventDefault(),s.title.trim()?s.start_time&&s.end_time&&s.start_time>s.end_time?p("La hora de inicio debe ser anterior a la hora de fin."):(o({...s,id:(null===r||void 0===r?void 0:r.id)||Date.now()}),p("")):p("Por favor ingresa un t\xedtulo para el evento.")},children:[(0,n.jsxs)(N,{children:[(0,n.jsxs)(W,{fullWidth:!0,children:[(0,n.jsx)(G,{htmlFor:"title",required:!0,children:"T\xedtulo"}),(0,n.jsx)(H,{type:"text",id:"title",name:"title",value:s.title,onChange:g,placeholder:"Ej: Reuni\xf3n de trabajo",required:!0})]}),(0,n.jsxs)(W,{children:[(0,n.jsx)(G,{htmlFor:"date",required:!0,children:"Fecha"}),(0,n.jsx)(H,{type:"date",id:"date",name:"date",value:s.date,onChange:g,required:!0})]}),(0,n.jsxs)(W,{children:[(0,n.jsx)(G,{htmlFor:"category",required:!0,children:"Categor\xeda"}),(0,n.jsxs)(V,{id:"category",name:"category",value:s.category,onChange:g,required:!0,children:[(0,n.jsx)("option",{value:"personal",children:"Personal"}),(0,n.jsx)("option",{value:"familia",children:"Familia"}),(0,n.jsx)("option",{value:"duchene",children:"Duchene"}),(0,n.jsx)("option",{value:"lavadero",children:"Lavadero"}),(0,n.jsx)("option",{value:"vapea",children:"Vapea Conmigo"}),(0,n.jsx)("option",{value:"other",children:"Otro"})]})]}),(0,n.jsxs)(W,{children:[(0,n.jsx)(G,{htmlFor:"start_time",children:"Hora de inicio"}),(0,n.jsx)(H,{type:"time",id:"start_time",name:"start_time",value:s.start_time,onChange:g})]}),(0,n.jsxs)(W,{children:[(0,n.jsx)(G,{htmlFor:"end_time",children:"Hora de fin"}),(0,n.jsx)(H,{type:"time",id:"end_time",name:"end_time",value:s.end_time,onChange:g})]}),(0,n.jsxs)(W,{fullWidth:!0,children:[(0,n.jsx)(G,{htmlFor:"location",children:"Ubicaci\xf3n"}),(0,n.jsx)(H,{type:"text",id:"location",name:"location",value:s.location,onChange:g,placeholder:"Ej: Oficina central"})]}),(0,n.jsxs)(W,{fullWidth:!0,children:[(0,n.jsx)(G,{htmlFor:"description",children:"Descripci\xf3n"}),(0,n.jsx)(J,{id:"description",name:"description",value:s.description,onChange:g,placeholder:"A\xf1ade detalles sobre este evento..."})]})]}),(0,n.jsxs)(X,{children:[(0,n.jsx)(B,{type:"submit",children:x?"Guardar Cambios":"Crear Evento"}),(0,n.jsx)(R,{type:"button",onClick:d,children:"Cancelar"})]})]})]})},K=o.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,Q=o.Ay.div`
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
`,Z=o.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,ee=o.Ay.div`
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
`,re=o.Ay.h2`
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
`,te=o.Ay.button`
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
`,ae=[],oe=()=>{const[e,r]=(0,a.useState)(ae),[t,o]=(0,a.useState)(new Date),[d,s]=(0,a.useState)(!1),[l,c]=(0,a.useState)(null);return(0,n.jsxs)(K,{children:[(0,n.jsxs)(Q,{children:[(0,n.jsx)("h1",{children:"Calendario"}),(0,n.jsx)("p",{children:"Organiza tus eventos y citas"})]}),(0,n.jsx)(y,{events:e,onSelectDate:e=>{o(e)}}),(0,n.jsxs)(Z,{children:[(0,n.jsxs)(ee,{children:[(0,n.jsx)(re,{children:"Eventos"}),(0,n.jsxs)(te,{onClick:()=>{c(null),s(!d)},children:[(0,n.jsx)(i.GGD,{}),d?"Cancelar":"Nuevo Evento"]})]}),d&&(0,n.jsx)(U,{event:l,selectedDate:t,onSubmit:e=>{l?(r((r=>r.map((r=>r.id===e.id?e:r)))),c(null)):r((r=>[...r,e])),s(!1)},onCancel:()=>{s(!1),c(null)}}),(0,n.jsx)(O,{events:e,selectedDate:t,onEditEvent:e=>{c(e),s(!0)},onDeleteEvent:e=>{window.confirm("\xbfEst\xe1s seguro de que deseas eliminar este evento?")&&r((r=>r.filter((r=>r.id!==e))))}})]})]})}}}]);
//# sourceMappingURL=204.6e5af6bc.chunk.js.map