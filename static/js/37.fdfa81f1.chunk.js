"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[37],{4037:(r,e,o)=>{o.r(e),o.d(e,{default:()=>B});var a=o(5043),i=o(5180),t=o(5464),n=o(5772),s=o(5016),d=o(579);const l=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 32px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`,c=t.Ay.h2`
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
`,p=t.Ay.div`
  margin-bottom: 20px;
`,x=t.Ay.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: var(--text-medium);
  font-weight: 500;
`,g=t.Ay.div`
  position: relative;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
  }
`,u=t.Ay.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--bg-light);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`,m=t.Ay.button`
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all var(--transition-speed);

  &:hover {
    background-color: var(--primary-dark);
  }

  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
  }

  svg {
    font-size: 1.1rem;
  }
`,h=t.Ay.div`
  color: var(--danger-color);
  font-size: 0.9rem;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`,v=t.Ay.p`
  text-align: center;
  margin-top: 16px;
  font-size: 0.9rem;
  color: var(--text-medium);

  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`,b=t.Ay.div`
  text-align: right;
  margin-top: 8px;
  font-size: 0.9rem;
`,f=t.Ay.a`
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`,y=r=>{let{onSwitchToRegister:e,onSwitchToReset:o}=r;const[i,t]=(0,a.useState)(""),[y,j]=(0,a.useState)(""),[w,k]=(0,a.useState)(""),{login:A,loading:z,error:S}=(0,s.A)();return(0,d.jsxs)(l,{children:[(0,d.jsx)(c,{children:"Iniciar Sesi\xf3n"}),(0,d.jsxs)("form",{onSubmit:async r=>{if(r.preventDefault(),!i.trim())return void k("Por favor ingresa tu email");if(!y)return void k("Por favor ingresa tu contrase\xf1a");const{error:e}=await A(i,y);e&&k(e.message||"Error al iniciar sesi\xf3n")},children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{htmlFor:"email",children:"Email"}),(0,d.jsxs)(g,{children:[(0,d.jsx)(n.pHD,{}),(0,d.jsx)(u,{type:"email",id:"email",value:i,onChange:r=>t(r.target.value),placeholder:"tu@email.com",required:!0})]})]}),(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{htmlFor:"password",children:"Contrase\xf1a"}),(0,d.jsxs)(g,{children:[(0,d.jsx)(n.F5$,{}),(0,d.jsx)(u,{type:"password",id:"password",value:y,onChange:r=>j(r.target.value),placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",required:!0})]}),(0,d.jsx)(b,{children:(0,d.jsx)(f,{href:"#",onClick:o,children:"\xbfOlvidaste tu contrase\xf1a?"})})]}),(0,d.jsx)(m,{type:"submit",disabled:z,children:z?"Iniciando sesi\xf3n...":(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.dUr,{}),"Iniciar Sesi\xf3n"]})}),(w||S)&&(0,d.jsx)(h,{children:w||S})]}),(0,d.jsxs)(v,{children:["\xbfNo tienes una cuenta? ",(0,d.jsx)("a",{href:"#",onClick:e,children:"Reg\xedstrate"})]})]})},j=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 32px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`,w=t.Ay.h2`
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
`,k=t.Ay.div`
  margin-bottom: 20px;
`,A=t.Ay.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: var(--text-medium);
  font-weight: 500;
`,z=t.Ay.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
  }
`,S=t.Ay.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--bg-light);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`,C=t.Ay.button`
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
  }
  
  svg {
    font-size: 1.1rem;
  }
`,E=t.Ay.div`
  color: var(--danger-color);
  font-size: 0.9rem;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`,F=t.Ay.p`
  text-align: center;
  margin-top: 16px;
  font-size: 0.9rem;
  color: var(--text-medium);
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`,P=r=>{let{onSwitchToLogin:e}=r;const[o,i]=(0,a.useState)(""),[t,l]=(0,a.useState)(""),[c,p]=(0,a.useState)(""),[x,g]=(0,a.useState)(""),{register:u,loading:m,error:h}=(0,s.A)();return(0,d.jsxs)(j,{children:[(0,d.jsx)(w,{children:"Crear Cuenta"}),(0,d.jsxs)("form",{onSubmit:async r=>{if(r.preventDefault(),!o.trim())return void g("Por favor ingresa tu email");if(!t)return void g("Por favor ingresa tu contrase\xf1a");if(t.length<6)return void g("La contrase\xf1a debe tener al menos 6 caracteres");if(t!==c)return void g("Las contrase\xf1as no coinciden");const{error:e}=await u(o,t);e&&g(e.message||"Error al registrarse")},children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(A,{htmlFor:"email",children:"Email"}),(0,d.jsxs)(z,{children:[(0,d.jsx)(n.pHD,{}),(0,d.jsx)(S,{type:"email",id:"email",value:o,onChange:r=>i(r.target.value),placeholder:"tu@email.com",required:!0})]})]}),(0,d.jsxs)(k,{children:[(0,d.jsx)(A,{htmlFor:"password",children:"Contrase\xf1a"}),(0,d.jsxs)(z,{children:[(0,d.jsx)(n.F5$,{}),(0,d.jsx)(S,{type:"password",id:"password",value:t,onChange:r=>l(r.target.value),placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",required:!0})]})]}),(0,d.jsxs)(k,{children:[(0,d.jsx)(A,{htmlFor:"confirmPassword",children:"Confirmar Contrase\xf1a"}),(0,d.jsxs)(z,{children:[(0,d.jsx)(n.F5$,{}),(0,d.jsx)(S,{type:"password",id:"confirmPassword",value:c,onChange:r=>p(r.target.value),placeholder:"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",required:!0})]})]}),(0,d.jsx)(C,{type:"submit",disabled:m,children:m?"Registrando...":(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.vq3,{}),"Crear Cuenta"]})}),(x||h)&&(0,d.jsx)(E,{children:x||h})]}),(0,d.jsxs)(F,{children:["\xbfYa tienes una cuenta? ",(0,d.jsx)("a",{href:"#",onClick:e,children:"Inicia sesi\xf3n"})]})]})};var D=o(8816);const R=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 32px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`,T=t.Ay.h2`
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
`,q=t.Ay.p`
  color: var(--text-medium);
  font-size: 0.95rem;
  margin-bottom: 24px;
  text-align: center;
`,L=t.Ay.div`
  margin-bottom: 20px;
`,I=t.Ay.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: var(--text-medium);
  font-weight: 500;
`,Y=t.Ay.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
  }
`,_=t.Ay.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-family: 'Poppins', sans-serif;
  color: var(--text-dark);
  background-color: var(--bg-light);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
`,H=t.Ay.button`
  width: 100%;
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
  }
`,$=t.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-top: 16px;
  
  &:hover {
    text-decoration: underline;
  }
`,G=t.Ay.div`
  color: var(--danger-color);
  font-size: 0.9rem;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`,M=t.Ay.div`
  color: var(--success-color);
  font-size: 0.9rem;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: rgba(34, 197, 94, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`,N=r=>{let{onSwitchToLogin:e}=r;const[o,i]=(0,a.useState)(""),[t,s]=(0,a.useState)(!1),[l,c]=(0,a.useState)(""),[p,x]=(0,a.useState)("");return(0,d.jsxs)(R,{children:[(0,d.jsx)(T,{children:"Recuperar Contrase\xf1a"}),(0,d.jsx)(q,{children:"Ingresa tu direcci\xf3n de email y te enviaremos un enlace para restablecer tu contrase\xf1a."}),(0,d.jsxs)("form",{onSubmit:async r=>{if(r.preventDefault(),o.trim())try{s(!0),c(""),x("");const{error:r}=await(0,D.xw)(o);r?c(r.message||"Error al enviar el correo de recuperaci\xf3n"):(x("Se ha enviado un correo de recuperaci\xf3n a tu direcci\xf3n de email"),i(""))}catch(e){console.error("Error resetting password:",e),c("Error al enviar el correo de recuperaci\xf3n")}finally{s(!1)}else c("Por favor ingresa tu email")},children:[(0,d.jsxs)(L,{children:[(0,d.jsx)(I,{htmlFor:"email",children:"Email"}),(0,d.jsxs)(Y,{children:[(0,d.jsx)(n.pHD,{}),(0,d.jsx)(_,{type:"email",id:"email",value:o,onChange:r=>i(r.target.value),placeholder:"tu@email.com",required:!0})]})]}),(0,d.jsx)(H,{type:"submit",disabled:t,children:t?"Enviando...":"Enviar Enlace de Recuperaci\xf3n"}),l&&(0,d.jsx)(G,{children:l}),p&&(0,d.jsx)(M,{children:p})]}),(0,d.jsxs)($,{onClick:e,children:[(0,d.jsx)(n.kRp,{})," Volver al inicio de sesi\xf3n"]})]})},O=t.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, var(--bg-light) 0%, var(--bg-medium) 100%);
`,U=t.Ay.div`
  text-align: center;
  margin-bottom: 32px;
`,V=t.Ay.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 8px;
`,Z=t.Ay.p`
  font-size: 1.1rem;
  color: var(--text-medium);
`,B=()=>{const[r,e]=(0,a.useState)("login"),{user:o,loading:t}=(0,s.A)(),n=(0,i.Zp)();(0,a.useEffect)((()=>{o&&!t&&n("/dashboard")}),[o,t,n]);const l=r=>{r.preventDefault(),e("login")};return t?(0,d.jsx)(O,{children:(0,d.jsx)("div",{children:"Cargando..."})}):(0,d.jsxs)(O,{children:[(0,d.jsxs)(U,{children:[(0,d.jsx)(V,{children:"Mi App Personal"}),(0,d.jsx)(Z,{children:"Gestiona tus finanzas, tareas e inversiones en un solo lugar"})]}),"login"===r&&(0,d.jsx)(y,{onSwitchToRegister:r=>{r.preventDefault(),e("register")},onSwitchToReset:r=>{r.preventDefault(),e("reset")}}),"register"===r&&(0,d.jsx)(P,{onSwitchToLogin:l}),"reset"===r&&(0,d.jsx)(N,{onSwitchToLogin:l})]})}}}]);
//# sourceMappingURL=37.fdfa81f1.chunk.js.map