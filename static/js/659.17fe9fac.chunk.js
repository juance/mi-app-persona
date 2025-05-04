"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[659],{5659:(r,e,a)=>{a.r(e),a.d(e,{default:()=>tr});var o=a(5043),t=a(5464),n=a(5772),i=a(579);const l=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  border-left: 4px solid ${r=>{switch(r.priority){case"high":return"var(--danger-color)";case"medium":return"var(--accent-color)";case"low":return"var(--secondary-color)";default:return"var(--primary-color)"}}};

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--card-shadow-hover);
  }

  opacity: ${r=>r.completed?.7:1};
`,s=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`,d=t.Ay.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  text-decoration: ${r=>r.completed?"line-through":"none"};
  display: flex;
  align-items: center;
  gap: 8px;
`,c=t.Ay.div`
  display: flex;
  gap: 8px;
`,p=t.Ay.button`
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
`,u=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
`,x=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-medium);
`,g=t.Ay.p`
  margin: 8px 0 0;
  font-size: 0.95rem;
  color: var(--text-medium);
  line-height: 1.5;
  text-decoration: ${r=>r.completed?"line-through":"none"};
`,h=t.Ay.span`
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 500;
  background-color: ${r=>{switch(r.priority){case"high":return"rgba(239, 68, 68, 0.1)";case"medium":return"rgba(245, 158, 11, 0.1)";case"low":return"rgba(16, 185, 129, 0.1)";default:return"rgba(99, 102, 241, 0.1)"}}};
  color: ${r=>{switch(r.priority){case"high":return"var(--danger-color)";case"medium":return"var(--accent-color)";case"low":return"var(--secondary-color)";default:return"var(--primary-color)"}}};
`,m=t.Ay.span`
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 500;
  background-color: ${r=>{switch(r.category){case"personal":default:return"rgba(99, 102, 241, 0.1)";case"familia":return"rgba(16, 185, 129, 0.1)";case"duchene":return"rgba(245, 158, 11, 0.1)";case"lavadero":return"rgba(239, 68, 68, 0.1)";case"vapea":return"rgba(168, 85, 247, 0.1)"}}};
  color: ${r=>{switch(r.category){case"personal":default:return"var(--primary-color)";case"familia":return"var(--secondary-color)";case"duchene":return"var(--accent-color)";case"lavadero":return"var(--danger-color)";case"vapea":return"var(--primary-dark)"}}};
`,v=r=>{if(!r)return"Sin fecha";return new Date(r).toLocaleDateString("es-ES")},b=r=>{let{task:e,onToggleComplete:a,onEdit:o,onDelete:t}=r;const{id:b,title:f,description:y,completed:j,due_date:w,priority:k,category:C}=e;return(0,i.jsxs)(l,{priority:k,completed:j,children:[(0,i.jsxs)(s,{children:[(0,i.jsx)(d,{completed:j,children:f}),(0,i.jsxs)(c,{children:[(0,i.jsx)(p,{onClick:()=>a(b),color:j?"var(--text-light)":"var(--secondary-color)",children:(0,i.jsx)(n.YrT,{})}),(0,i.jsx)(p,{onClick:()=>o(e),color:"var(--primary-color)",children:(0,i.jsx)(n.WXf,{})}),(0,i.jsx)(p,{onClick:()=>t(b),color:"var(--danger-color)",children:(0,i.jsx)(n.IXo,{})})]})]}),y&&(0,i.jsx)(g,{completed:j,children:y}),(0,i.jsxs)(u,{children:[w&&(0,i.jsxs)(x,{children:[(0,i.jsx)(n.Ohp,{}),v(w)]}),(0,i.jsxs)(x,{children:[(0,i.jsx)(n.QsL,{}),(0,i.jsx)(h,{priority:k,children:(r=>{switch(r){case"high":return"Alta";case"medium":return"Media";case"low":return"Baja";default:return"Normal"}})(k)})]}),(0,i.jsxs)(x,{children:[(0,i.jsx)(n.cnX,{}),(0,i.jsx)(m,{category:C||"personal",children:(r=>{switch(r){case"personal":default:return"Personal";case"familia":return"Familia";case"duchene":return"Duchene";case"lavadero":return"Lavadero";case"vapea":return"Vapea Conmigo"}})(C||"personal")})]})]})]})},f=t.Ay.div`
  margin-top: 20px;
`,y=t.Ay.div`
  text-align: center;
  color: var(--text-light);
  font-style: italic;
  padding: 30px 0;
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
`,j=r=>{let{tasks:e,onToggleComplete:a,onEditTask:o,onDeleteTask:t}=r;return e&&0!==e.length?(0,i.jsx)(f,{children:e.map((r=>(0,i.jsx)(b,{task:r,onToggleComplete:a,onEdit:o,onDelete:t},r.id)))}):(0,i.jsx)(f,{children:(0,i.jsx)(y,{children:"No hay tareas. \xa1Crea una nueva!"})})},w=t.Ay.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,k=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,C=t.Ay.h3`
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
`,A=t.Ay.button`
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
`,_=t.Ay.div`
  color: var(--danger-color);
  margin-bottom: 16px;
  font-size: 0.9rem;
  padding: 12px;
  background-color: rgba(239, 68, 68, 0.08);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--danger-color);
`,E=t.Ay.div`
  margin-bottom: 20px;
`,z=t.Ay.label`
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
`,D=t.Ay.input`
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
`,$=t.Ay.textarea`
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
`,S=t.Ay.select`
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
`,T=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,N=t.Ay.button`
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
`,I=t.Ay.button`
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
`,P={title:"",description:"",due_date:"",priority:"medium",category:"personal"},F=r=>{let{task:e,onSubmit:a,onCancel:t}=r;const[l,s]=(0,o.useState)(P),[d,c]=(0,o.useState)(""),p=!(null===e||void 0===e||!e.id);(0,o.useEffect)((()=>{s(e?{title:e.title||"",description:e.description||"",due_date:e.due_date||"",priority:e.priority||"medium",category:e.category||"personal"}:P)}),[e]);const u=r=>{const{name:e,value:a}=r.target;s((r=>({...r,[e]:a})))};return(0,i.jsxs)(w,{children:[(0,i.jsxs)(k,{children:[(0,i.jsx)(C,{children:p?"Editar Tarea":"Crear Nueva Tarea"}),(0,i.jsx)(A,{onClick:t,children:(0,i.jsx)(n.yGN,{})})]}),d&&(0,i.jsx)(_,{children:d}),(0,i.jsxs)("form",{onSubmit:r=>{r.preventDefault(),l.title.trim()?(a({...l,id:(null===e||void 0===e?void 0:e.id)||Date.now(),completed:(null===e||void 0===e?void 0:e.completed)||!1}),p||s(P),c("")):c("Por favor ingresa un t\xedtulo para la tarea.")},children:[(0,i.jsxs)(E,{children:[(0,i.jsx)(z,{htmlFor:"title",required:!0,children:"T\xedtulo"}),(0,i.jsx)(D,{type:"text",id:"title",name:"title",value:l.title,onChange:u,placeholder:"\xbfQu\xe9 necesitas hacer?",required:!0})]}),(0,i.jsxs)(E,{children:[(0,i.jsx)(z,{htmlFor:"description",children:"Descripci\xf3n"}),(0,i.jsx)($,{id:"description",name:"description",value:l.description,onChange:u,placeholder:"A\xf1ade detalles sobre esta tarea..."})]}),(0,i.jsxs)(E,{children:[(0,i.jsx)(z,{htmlFor:"due_date",children:"Fecha l\xedmite"}),(0,i.jsx)(D,{type:"date",id:"due_date",name:"due_date",value:l.due_date,onChange:u})]}),(0,i.jsxs)(E,{children:[(0,i.jsx)(z,{htmlFor:"priority",required:!0,children:"Prioridad"}),(0,i.jsxs)(S,{id:"priority",name:"priority",value:l.priority,onChange:u,required:!0,children:[(0,i.jsx)("option",{value:"low",children:"Baja"}),(0,i.jsx)("option",{value:"medium",children:"Media"}),(0,i.jsx)("option",{value:"high",children:"Alta"})]})]}),(0,i.jsxs)(E,{children:[(0,i.jsx)(z,{htmlFor:"category",required:!0,children:"Categor\xeda"}),(0,i.jsxs)(S,{id:"category",name:"category",value:l.category,onChange:u,required:!0,children:[(0,i.jsx)("option",{value:"personal",children:"Personal"}),(0,i.jsx)("option",{value:"familia",children:"Familia"}),(0,i.jsx)("option",{value:"duchene",children:"Duchene"}),(0,i.jsx)("option",{value:"lavadero",children:"Lavadero"}),(0,i.jsx)("option",{value:"vapea",children:"Vapea Conmigo"})]})]}),(0,i.jsxs)(T,{children:[(0,i.jsx)(N,{type:"submit",children:p?"Guardar Cambios":"Crear Tarea"}),(0,i.jsx)(I,{type:"button",onClick:t,children:"Cancelar"})]})]})]})},q=t.Ay.div`
  background-color: var(--bg-medium);
  padding: 16px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
`,L=t.Ay.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
  color: var(--text-medium);
  font-weight: 500;
  font-size: 0.95rem;
`,M=(0,t.Ay)(n.K7R)`
  font-size: 1.1rem;
`,Y=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,B=t.Ay.div`
  flex: 2;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`,G=(0,t.Ay)(n.CKj)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  font-size: 1rem;
`,O=t.Ay.input`
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
`,X=t.Ay.div`
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`,Z=t.Ay.select`
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
`,J=r=>{let{filters:e,onFilterChange:a}=r;const o=r=>{const{name:o,value:t}=r.target;a({...e,[o]:t})};return(0,i.jsxs)(q,{children:[(0,i.jsxs)(L,{children:[(0,i.jsx)(M,{}),"Filtrar tareas"]}),(0,i.jsxs)(Y,{children:[(0,i.jsxs)(B,{children:[(0,i.jsx)(G,{}),(0,i.jsx)(O,{type:"text",placeholder:"Buscar tareas...",name:"search",value:e.search||"",onChange:o})]}),(0,i.jsx)(X,{children:(0,i.jsxs)(Z,{name:"status",value:e.status||"all",onChange:o,children:[(0,i.jsx)("option",{value:"all",children:"Todas las tareas"}),(0,i.jsx)("option",{value:"active",children:"Pendientes"}),(0,i.jsx)("option",{value:"completed",children:"Completadas"})]})}),(0,i.jsx)(X,{children:(0,i.jsxs)(Z,{name:"priority",value:e.priority||"all",onChange:o,children:[(0,i.jsx)("option",{value:"all",children:"Todas las prioridades"}),(0,i.jsx)("option",{value:"high",children:"Alta"}),(0,i.jsx)("option",{value:"medium",children:"Media"}),(0,i.jsx)("option",{value:"low",children:"Baja"})]})}),(0,i.jsx)(X,{children:(0,i.jsxs)(Z,{name:"category",value:e.category||"all",onChange:o,children:[(0,i.jsx)("option",{value:"all",children:"Todas las categor\xedas"}),(0,i.jsx)("option",{value:"personal",children:"Personal"}),(0,i.jsx)("option",{value:"familia",children:"Familia"}),(0,i.jsx)("option",{value:"duchene",children:"Duchene"}),(0,i.jsx)("option",{value:"lavadero",children:"Lavadero"}),(0,i.jsx)("option",{value:"vapea",children:"Vapea Conmigo"})]})}),(0,i.jsx)(X,{children:(0,i.jsxs)(Z,{name:"sort",value:e.sort||"date_desc",onChange:o,children:[(0,i.jsx)("option",{value:"date_desc",children:"M\xe1s recientes primero"}),(0,i.jsx)("option",{value:"date_asc",children:"M\xe1s antiguas primero"}),(0,i.jsx)("option",{value:"priority_desc",children:"Mayor prioridad primero"}),(0,i.jsx)("option",{value:"priority_asc",children:"Menor prioridad primero"}),(0,i.jsx)("option",{value:"name_asc",children:"Nombre (A-Z)"}),(0,i.jsx)("option",{value:"name_desc",children:"Nombre (Z-A)"})]})})]})]})};var V=a(8090);const H=t.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,K=t.Ay.div`
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
`,Q=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,U=t.Ay.div`
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
`,W=t.Ay.h2`
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
`,R=t.Ay.button`
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
`,rr=t.Ay.div`
  display: flex;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`,er=t.Ay.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all var(--transition-speed);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`,ar=t.Ay.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${r=>r.color||"var(--primary-color)"};
  margin-bottom: 8px;
`,or=t.Ay.div`
  font-size: 0.9rem;
  color: var(--text-medium);
  font-weight: 500;
`,tr=()=>{const[r,e]=(0,o.useState)([]),[a,t]=(0,o.useState)(!1),[l,s]=(0,o.useState)(null),[d,c]=(0,o.useState)({search:"",status:"all",priority:"all",category:"all",sort:"date_desc"}),[p,u]=(0,o.useState)([]),[x,g]=(0,o.useState)(!0);(0,o.useEffect)((()=>{(()=>{try{g(!0);const r=(0,V.x1)();console.log("Tareas cargadas desde el almacenamiento local:",r),e(r||[])}catch(r){console.error("Error al cargar tareas:",r)}finally{g(!1)}})()}),[]),(0,o.useEffect)((()=>{let e=[...r];if(d.search){const r=d.search.toLowerCase();e=e.filter((e=>e.title.toLowerCase().includes(r)||e.description&&e.description.toLowerCase().includes(r)))}"all"!==d.status&&(e=e.filter((r=>"completed"===d.status&&r.completed||"active"===d.status&&!r.completed))),"all"!==d.priority&&(e=e.filter((r=>r.priority===d.priority))),"all"!==d.category&&(e=e.filter((r=>r.category===d.category))),e.sort(((r,e)=>{switch(d.sort){case"date_asc":return new Date(r.created_at)-new Date(e.created_at);case"date_desc":return new Date(e.created_at)-new Date(r.created_at);case"priority_desc":const a={high:3,medium:2,low:1};return a[e.priority]-a[r.priority];case"priority_asc":const o={high:3,medium:2,low:1};return o[r.priority]-o[e.priority];case"name_asc":return r.title.localeCompare(e.title);case"name_desc":return e.title.localeCompare(r.title);default:return 0}})),u(e)}),[r,d]);const h=r.length,m=r.filter((r=>r.completed)).length,v=h-m,b=r.filter((r=>"high"===r.priority&&!r.completed)).length;return(0,i.jsxs)(H,{children:[(0,i.jsxs)(K,{children:[(0,i.jsx)("h1",{children:"Tareas"}),(0,i.jsx)("p",{children:"Gestiona tus tareas y pendientes"})]}),(0,i.jsxs)(rr,{children:[(0,i.jsxs)(er,{children:[(0,i.jsx)(ar,{children:h}),(0,i.jsx)(or,{children:"Total de tareas"})]}),(0,i.jsxs)(er,{children:[(0,i.jsx)(ar,{color:"var(--secondary-color)",children:m}),(0,i.jsx)(or,{children:"Completadas"})]}),(0,i.jsxs)(er,{children:[(0,i.jsx)(ar,{color:"var(--accent-color)",children:v}),(0,i.jsx)(or,{children:"Pendientes"})]}),(0,i.jsxs)(er,{children:[(0,i.jsx)(ar,{color:"var(--danger-color)",children:b}),(0,i.jsx)(or,{children:"Alta prioridad"})]})]}),(0,i.jsxs)(Q,{children:[(0,i.jsxs)(U,{children:[(0,i.jsx)(W,{children:"Mis Tareas"}),(0,i.jsxs)(R,{onClick:()=>{s(null),t(!a)},children:[(0,i.jsx)(n.GGD,{}),a?"Cancelar":"Nueva Tarea"]})]}),a&&(0,i.jsx)(F,{task:l,onSubmit:r=>{try{if(l){const a={...r,created_at:l.created_at},o=(0,V.lC)(r.id,a);o?(console.log("Tarea actualizada correctamente:",o),e((e=>e.map((e=>e.id===r.id?a:e)))),s(null)):(console.error("No se pudo actualizar la tarea"),alert("No se pudo actualizar la tarea. Por favor, intenta de nuevo."))}else{const a={...r,created_at:(new Date).toISOString().split("T")[0]},o=(0,V.XZ)(a);o?(console.log("Tarea agregada correctamente:",o),e((r=>[...r,o]))):(console.error("No se pudo agregar la tarea"),alert("No se pudo agregar la tarea. Por favor, intenta de nuevo."))}t(!1)}catch(a){console.error("Error al guardar la tarea:",a),alert("Error al guardar la tarea. Por favor, intenta de nuevo.")}},onCancel:()=>{t(!1),s(null)}}),(0,i.jsx)(J,{filters:d,onFilterChange:c}),(0,i.jsx)(j,{tasks:p,onToggleComplete:r=>{try{const a=(0,V.Hm)(r);a?(console.log("Estado de tarea actualizado correctamente:",a),e((e=>e.map((e=>e.id===r?{...e,completed:!e.completed}:e))))):console.error("No se pudo actualizar el estado de la tarea")}catch(a){console.error("Error al actualizar el estado de la tarea:",a)}},onEditTask:r=>{s(r),t(!0)},onDeleteTask:r=>{if(window.confirm("\xbfEst\xe1s seguro de que deseas eliminar esta tarea?"))try{(0,V.vq)(r)?(console.log("Tarea eliminada correctamente"),e((e=>e.filter((e=>e.id!==r))))):(console.error("No se pudo eliminar la tarea"),alert("No se pudo eliminar la tarea. Por favor, intenta de nuevo."))}catch(a){console.error("Error al eliminar la tarea:",a),alert("Error al eliminar la tarea. Por favor, intenta de nuevo.")}}})]})]})}},8090:(r,e,a)=>{a.d(e,{AF:()=>c,DT:()=>y,EP:()=>A,Hm:()=>v,I0:()=>s,J0:()=>j,LS:()=>f,UI:()=>E,Uw:()=>p,W1:()=>C,XZ:()=>g,_y:()=>_,lC:()=>h,vq:()=>m,x1:()=>x,xn:()=>w,xo:()=>l,yY:()=>d});const o="mi_app_personal_simple_",t=(r,e)=>{try{const a=`${o}${r}`;return localStorage.setItem(a,JSON.stringify(e)),console.log(`Datos guardados en localStorage con clave ${r}:`,e),!0}catch(a){return console.error(`Error al guardar datos en localStorage con clave ${r}:`,a),!1}},n=function(r){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;try{const a=`${o}${r}`,t=localStorage.getItem(a);if(!t)return e;const n=JSON.parse(t);return console.log(`Datos recuperados de localStorage con clave ${r}:`,n),n}catch(a){return console.error(`Error al obtener datos de localStorage con clave ${r}:`,a),e}},i=()=>`local_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,l=r=>t("transactions",r),s=()=>n("transactions",[]),d=r=>{try{const e={...r,id:r.id||i()},a=[e,...s()];return l(a),e}catch(e){return console.error("Error al agregar transacci\xf3n:",e),null}},c=(r,e)=>{try{const a=s(),o=a.findIndex((e=>e.id===r));if(-1===o)return console.error(`No se encontr\xf3 la transacci\xf3n con ID ${r}`),!1;const t=[...a];return t[o]={...t[o],...e},l(t),t[o]}catch(a){return console.error("Error al actualizar transacci\xf3n:",a),null}},p=r=>{try{const e=s(),a=e.filter((e=>e.id!==r));return a.length===e.length?(console.error(`No se encontr\xf3 la transacci\xf3n con ID ${r}`),!1):(l(a),!0)}catch(e){return console.error("Error al eliminar transacci\xf3n:",e),!1}},u=r=>t("tasks",r),x=()=>n("tasks",[]),g=r=>{try{const e={...r,id:r.id||i(),created_at:r.created_at||(new Date).toISOString().split("T")[0]},a=[...x(),e];return u(a),e}catch(e){return console.error("Error al agregar tarea:",e),null}},h=(r,e)=>{try{const a=x(),o=a.findIndex((e=>e.id===r));if(-1===o)return console.error(`No se encontr\xf3 la tarea con ID ${r}`),!1;const t=[...a];return t[o]={...t[o],...e},u(t),t[o]}catch(a){return console.error("Error al actualizar tarea:",a),null}},m=r=>{try{const e=x(),a=e.filter((e=>e.id!==r));return a.length===e.length?(console.error(`No se encontr\xf3 la tarea con ID ${r}`),!1):(u(a),!0)}catch(e){return console.error("Error al eliminar tarea:",e),!1}},v=r=>{try{const e=x(),a=e.findIndex((e=>e.id===r));if(-1===a)return console.error(`No se encontr\xf3 la tarea con ID ${r}`),!1;const o=[...e];return o[a]={...o[a],completed:!o[a].completed},u(o),o[a]}catch(e){return console.error("Error al cambiar estado de tarea:",e),null}},b=r=>t("investments",r),f=()=>n("investments",[]),y=r=>{try{const e={...r,id:r.id||i()},a=[...f(),e];return b(a),e}catch(e){return console.error("Error al agregar inversi\xf3n:",e),null}},j=(r,e)=>{try{const a=f(),o=a.findIndex((e=>e.id===r));if(-1===o)return console.error(`No se encontr\xf3 la inversi\xf3n con ID ${r}`),!1;const t=[...a];return t[o]={...t[o],...e},b(t),t[o]}catch(a){return console.error("Error al actualizar inversi\xf3n:",a),null}},w=r=>{try{const e=f(),a=e.filter((e=>e.id!==r));return a.length===e.length?(console.error(`No se encontr\xf3 la inversi\xf3n con ID ${r}`),!1):(b(a),!0)}catch(e){return console.error("Error al eliminar inversi\xf3n:",e),!1}},k=r=>t("financial_goals",r),C=()=>n("financial_goals",[]),A=r=>{try{const e={...r,id:r.id||i()},a=[...C(),e];return k(a),e}catch(e){return console.error("Error al agregar meta financiera:",e),null}},_=(r,e)=>{try{const a=C(),o=a.findIndex((e=>e.id===r));if(-1===o)return console.error(`No se encontr\xf3 la meta financiera con ID ${r}`),!1;const t=[...a];return t[o]={...t[o],...e},k(t),t[o]}catch(a){return console.error("Error al actualizar meta financiera:",a),null}},E=r=>{try{const e=C(),a=e.filter((e=>e.id!==r));return a.length===e.length?(console.error(`No se encontr\xf3 la meta financiera con ID ${r}`),!1):(k(a),!0)}catch(e){return console.error("Error al eliminar meta financiera:",e),!1}}}}]);
//# sourceMappingURL=659.17fe9fac.chunk.js.map