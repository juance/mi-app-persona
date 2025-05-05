"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[195],{9195:(r,e,n)=>{n.r(e),n.d(e,{default:()=>k});var a=n(5043),i=n(5464),o=n(5180),s=n(5772),t=(n(372),n(579));const c=(0,a.createContext)();var d=n(159),l=n(6618);const x=i.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${r=>r.syncing?"var(--bg-medium)":"var(--primary-color)"};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${r=>r.syncing?"not-allowed":"pointer"};
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${r=>r.syncing?"var(--bg-medium)":"var(--primary-dark)"};
  }

  svg {
    animation: ${r=>r.syncing?"spin 1s linear infinite":"none"};
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,p=()=>{const[r,e]=(0,a.useState)(!1),{user:n}=(0,a.useContext)(c);return(0,t.jsxs)(x,{onClick:async()=>{if(!r&&n){e(!0),(0,l.cf)("Iniciando sincronizaci\xf3n forzada...");try{const r=await(0,d.kO)(n.id,!0);r.success?(0,l.cf)(`Sincronizaci\xf3n completada: ${r.succeeded} almacenes sincronizados`):(0,l.Qg)(`Sincronizaci\xf3n parcial: ${r.succeeded} sincronizados, ${r.failed} fallidos`)}catch(a){console.error("Error al forzar sincronizaci\xf3n:",a),(0,l.Qg)("Error al sincronizar datos")}finally{e(!1)}}},syncing:r,disabled:r,className:"sync-force-button",children:[(0,t.jsx)(s.jTZ,{size:16}),r?"Sincronizando...":"Sincronizar datos"]})},h=i.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,m=i.Ay.div`
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
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`,u=(0,i.Ay)(o.N_)`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  text-decoration: none;
  color: var(--text-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
    color: var(--text-dark);
  }
`,f=i.Ay.div`
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: var(--primary-color);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  transition: all var(--transition-speed);

  ${u}:hover & {
    transform: scale(1.1);
    background-color: rgba(99, 102, 241, 0.15);
  }
`,v=i.Ay.h3`
  margin: 0 0 8px 0;
  font-size: 1.3rem;
  font-weight: 600;
`,j=i.Ay.p`
  margin: 0;
  color: var(--text-medium);
  font-size: 0.95rem;
`,b=i.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`,y=i.Ay.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-dark);
`,z=i.Ay.p`
  font-size: 1.1rem;
  color: var(--text-medium);
  max-width: 800px;
  margin: 0 auto 24px;
  line-height: 1.6;
`,k=()=>(0,t.jsxs)(h,{children:[(0,t.jsxs)(m,{children:[(0,t.jsx)("h1",{children:"Dashboard"}),(0,t.jsx)("p",{children:"Bienvenido a tu panel de control personal"})]}),(0,t.jsxs)(b,{children:[(0,t.jsx)(y,{children:"\xa1Bienvenido a tu App Personal!"}),(0,t.jsx)(z,{children:"Esta aplicaci\xf3n te ayudar\xe1 a gestionar tus tareas, finanzas, inversiones, metas financieras y calendario en un solo lugar. Explora los diferentes m\xf3dulos para comenzar a organizar tu vida personal."}),(0,t.jsx)(p,{})]}),(0,t.jsxs)(g,{children:[(0,t.jsxs)(u,{to:"/tasks",children:[(0,t.jsx)(f,{children:(0,t.jsx)(s.NLe,{})}),(0,t.jsx)(v,{children:"Tareas"}),(0,t.jsx)(j,{children:"Gestiona tus tareas y pendientes"})]}),(0,t.jsxs)(u,{to:"/finances",children:[(0,t.jsx)(f,{children:(0,t.jsx)(s.z8N,{})}),(0,t.jsx)(v,{children:"Finanzas"}),(0,t.jsx)(j,{children:"Controla tus ingresos y gastos"})]}),(0,t.jsxs)(u,{to:"/investments",children:[(0,t.jsx)(f,{children:(0,t.jsx)(s.ARf,{})}),(0,t.jsx)(v,{children:"Inversiones"}),(0,t.jsx)(j,{children:"Gestiona tu cartera de inversiones"})]}),(0,t.jsxs)(u,{to:"/financial-goals",children:[(0,t.jsx)(f,{children:(0,t.jsx)(s.x_j,{})}),(0,t.jsx)(v,{children:"Metas Financieras"}),(0,t.jsx)(j,{children:"Establece y sigue tus objetivos financieros"})]}),(0,t.jsxs)(u,{to:"/calendar",children:[(0,t.jsx)(f,{children:(0,t.jsx)(s.wIk,{})}),(0,t.jsx)(v,{children:"Calendario"}),(0,t.jsx)(j,{children:"Organiza tus eventos y citas"})]}),(0,t.jsxs)(u,{as:"div",onClick:()=>document.querySelector(".sync-force-button").click(),children:[(0,t.jsx)(f,{children:(0,t.jsx)(s.Hbo,{})}),(0,t.jsx)(v,{children:"Sincronizaci\xf3n"}),(0,t.jsx)(j,{children:"Sincroniza tus datos entre dispositivos"})]})]})]})}}]);
//# sourceMappingURL=195.9001d2a7.chunk.js.map