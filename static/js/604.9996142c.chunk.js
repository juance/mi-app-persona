"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[604],{2604:(r,n,e)=>{e.r(n),e.d(n,{default:()=>k});var a=e(5043),i=e(5464),o=e(5180),s=e(5772),t=e(159),d=e(6618),c=e(372),l=e(579);const x=i.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${r=>r.syncing||r.disabled?"var(--bg-medium)":"var(--primary-color)"};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${r=>r.syncing||r.disabled?"not-allowed":"pointer"};
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: ${r=>r.disabled?.7:1};

  &:hover {
    background-color: ${r=>r.syncing||r.disabled?"var(--bg-medium)":"var(--primary-dark)"};
  }

  svg {
    animation: ${r=>r.syncing?"spin 1s linear infinite":"none"};
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`,u=()=>{const[r,n]=(0,a.useState)(!1),[e,i]=(0,a.useState)(null),[o,u]=(0,a.useState)(!0);(0,a.useEffect)((()=>{(async()=>{try{const{data:{session:r}}=await c.N.auth.getSession();i((null===r||void 0===r?void 0:r.user)||null)}catch(r){console.error("Error al obtener la sesi\xf3n:",r)}finally{u(!1)}})();const{data:r}=c.N.auth.onAuthStateChange(((r,n)=>{i((null===n||void 0===n?void 0:n.user)||null)}));return()=>{var n;null===r||void 0===r||null===(n=r.subscription)||void 0===n||n.unsubscribe()}}),[]);const p=o||!e;return(0,l.jsxs)(x,{onClick:async()=>{if(!r&&e){n(!0),(0,d.cf)("Iniciando sincronizaci\xf3n forzada...");try{const r=(null===e||void 0===e?void 0:e.id)||"guest_user",n=await(0,t.kO)(r,!0);n.success?(0,d.cf)(`Sincronizaci\xf3n completada: ${n.succeeded} almacenes sincronizados`):(0,d.Qg)(`Sincronizaci\xf3n parcial: ${n.succeeded} sincronizados, ${n.failed} fallidos`)}catch(a){console.error("Error al forzar sincronizaci\xf3n:",a),(0,d.Qg)("Error al sincronizar datos")}finally{n(!1)}}},syncing:r,disabled:p,className:"sync-force-button",children:[(0,l.jsx)(s.jTZ,{size:16}),r?"Sincronizando...":p?"Inicia sesi\xf3n para sincronizar":"Sincronizar datos"]})},p=i.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,h=i.Ay.div`
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
`,m=(0,i.Ay)(o.N_)`
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
`,v=i.Ay.div`
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

  ${m}:hover & {
    transform: scale(1.1);
    background-color: rgba(99, 102, 241, 0.15);
  }
`,b=i.Ay.h3`
  margin: 0 0 8px 0;
  font-size: 1.3rem;
  font-weight: 600;
`,f=i.Ay.p`
  margin: 0;
  color: var(--text-medium);
  font-size: 0.95rem;
`,j=i.Ay.div`
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
`,k=()=>(0,l.jsxs)(p,{children:[(0,l.jsxs)(h,{children:[(0,l.jsx)("h1",{children:"Dashboard"}),(0,l.jsx)("p",{children:"Bienvenido a tu panel de control personal"})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(y,{children:"\xa1Bienvenido a tu App Personal!"}),(0,l.jsx)(z,{children:"Esta aplicaci\xf3n te ayudar\xe1 a gestionar tus tareas, finanzas, inversiones, metas financieras y calendario en un solo lugar. Explora los diferentes m\xf3dulos para comenzar a organizar tu vida personal."}),(0,l.jsx)(u,{})]}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{to:"/tasks",children:[(0,l.jsx)(v,{children:(0,l.jsx)(s.NLe,{})}),(0,l.jsx)(b,{children:"Tareas"}),(0,l.jsx)(f,{children:"Gestiona tus tareas y pendientes"})]}),(0,l.jsxs)(m,{to:"/finances",children:[(0,l.jsx)(v,{children:(0,l.jsx)(s.z8N,{})}),(0,l.jsx)(b,{children:"Finanzas"}),(0,l.jsx)(f,{children:"Controla tus ingresos y gastos"})]}),(0,l.jsxs)(m,{to:"/investments",children:[(0,l.jsx)(v,{children:(0,l.jsx)(s.ARf,{})}),(0,l.jsx)(b,{children:"Inversiones"}),(0,l.jsx)(f,{children:"Gestiona tu cartera de inversiones"})]}),(0,l.jsxs)(m,{to:"/financial-goals",children:[(0,l.jsx)(v,{children:(0,l.jsx)(s.x_j,{})}),(0,l.jsx)(b,{children:"Metas Financieras"}),(0,l.jsx)(f,{children:"Establece y sigue tus objetivos financieros"})]}),(0,l.jsxs)(m,{to:"/calendar",children:[(0,l.jsx)(v,{children:(0,l.jsx)(s.wIk,{})}),(0,l.jsx)(b,{children:"Calendario"}),(0,l.jsx)(f,{children:"Organiza tus eventos y citas"})]}),(0,l.jsxs)(m,{as:"div",onClick:()=>document.querySelector(".sync-force-button").click(),children:[(0,l.jsx)(v,{children:(0,l.jsx)(s.Hbo,{})}),(0,l.jsx)(b,{children:"Sincronizaci\xf3n"}),(0,l.jsx)(f,{children:"Sincroniza tus datos entre dispositivos"})]})]})]})}}]);
//# sourceMappingURL=604.9996142c.chunk.js.map