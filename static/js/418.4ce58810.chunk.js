"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[418],{3280:(r,e,a)=>{a.d(e,{GF:()=>o,Uh:()=>t,bJ:()=>i});const o=(r,e)=>{if(!r||!r.length)return;const a=Object.keys(r[0]),o=[a.join(","),...r.map((r=>a.map((e=>{const a=r[e];return null===a||void 0===a?"":"object"===typeof a?`"${JSON.stringify(a).replace(/"/g,'""')}"`:"string"===typeof a?`"${a.replace(/"/g,'""')}"`:String(a)})).join(",")))].join("\\n"),t=new Blob([o],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a"),n=URL.createObjectURL(t);i.setAttribute("href",n),i.setAttribute("download",`${e}.csv`),i.style.visibility="hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)},t=(r,e)=>{if(!r)return;const a=new Blob([JSON.stringify(r,null,2)],{type:"application/json"}),o=document.createElement("a"),t=URL.createObjectURL(a);o.setAttribute("href",t),o.setAttribute("download",`${e}.json`),o.style.visibility="hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o)},i=(r,e)=>{o(r,e.replace(/\.xlsx$/,""))}},6418:(r,e,a)=>{a.r(e),a.d(e,{default:()=>Er});var o=a(5043),t=a(5464),i=a(5772),n=a(372);const s=async()=>{try{const{data:{user:r}}=await n.N.auth.getUser();if(!r)throw new Error("No authenticated user found");const{data:e,error:a}=await n.N.from("profiles").select("*").eq("id",r.id).single();if(a&&"PGRST116"!==a.code)throw console.error("Error fetching user profile:",a),a;return e}catch(r){return console.error("Error in getUserProfile:",r),null}},c=async r=>{try{const{data:{user:e}}=await n.N.auth.getUser();if(!e)throw new Error("No authenticated user found");const{data:a,error:o}=await n.N.from("profiles").upsert({id:e.id,...r,updated_at:new Date}).select();if(o)throw console.error("Error upserting user profile:",o),o;return(null===a||void 0===a?void 0:a[0])||null}catch(e){throw console.error("Error in upsertUserProfile:",e),e}};var l=a(5016),d=a(579);const p=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 32px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`,x=t.Ay.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`,u=t.Ay.h2`
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`,h=t.Ay.div`
  margin-bottom: 20px;
`,g=t.Ay.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: var(--text-medium);
  font-weight: 500;
`,m=t.Ay.input`
  width: 100%;
  padding: 12px;
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
`,b=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`,f=t.Ay.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--bg-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    font-size: 2rem;
    color: var(--text-light);
  }
`,v=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,j=t.Ay.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--bg-medium);
  color: var(--text-medium);
  border: none;
  padding: 8px 16px;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--bg-dark);
  }
  
  input {
    display: none;
  }
`,y=t.Ay.span`
  font-size: 0.8rem;
  color: var(--text-light);
`,w=t.Ay.button`
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
`,k=t.Ay.div`
  color: var(--danger-color);
  font-size: 0.9rem;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`,A=t.Ay.div`
  color: var(--success-color);
  font-size: 0.9rem;
  margin-top: 16px;
  padding: 8px 12px;
  background-color: rgba(34, 197, 94, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`,E=()=>{const{user:r}=(0,l.A)(),[e,a]=(0,o.useState)({first_name:"",last_name:"",avatar_url:""}),[t,E]=(0,o.useState)(!0),[_,z]=(0,o.useState)(!1),[S,C]=(0,o.useState)(""),[D,N]=(0,o.useState)(""),[T,F]=(0,o.useState)(null);(0,o.useEffect)((()=>{r&&(async()=>{try{E(!0);const r=await s();r&&a({first_name:r.first_name||"",last_name:r.last_name||"",avatar_url:r.avatar_url||""})}catch(r){console.error("Error loading profile:",r),C("Error al cargar el perfil")}finally{E(!1)}})()}),[r]);const P=r=>{const{name:e,value:o}=r.target;a((r=>({...r,[e]:o})))};return t?(0,d.jsx)(p,{children:(0,d.jsx)("div",{style:{textAlign:"center",padding:"20px"},children:"Cargando perfil..."})}):(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{children:(0,d.jsx)(u,{children:"Mi Perfil"})}),(0,d.jsxs)("form",{onSubmit:async r=>{r.preventDefault();try{if(z(!0),C(""),N(""),T){const r=await(async r=>{try{const{data:{user:e}}=await n.N.auth.getUser();if(!e)throw new Error("No authenticated user found");const a=r.name.split(".").pop(),o=`avatars/${e.id}-${Math.random().toString(36).substring(2)}.${a}`,{error:t}=await n.N.storage.from("avatars").upload(o,r);if(t)throw console.error("Error uploading avatar:",t),t;const{data:{publicUrl:i}}=n.N.storage.from("avatars").getPublicUrl(o);return await c({avatar_url:i}),i}catch(S){throw console.error("Error in updateUserAvatar:",S),S}})(T);a((e=>({...e,avatar_url:r})))}await c({first_name:e.first_name,last_name:e.last_name,avatar_url:e.avatar_url}),N("Perfil actualizado correctamente"),F(null)}catch(o){console.error("Error saving profile:",o),C("Error al guardar el perfil")}finally{z(!1)}},children:[(0,d.jsxs)(b,{children:[(0,d.jsx)(f,{children:e.avatar_url?(0,d.jsx)("img",{src:e.avatar_url,alt:"Avatar"}):(0,d.jsx)(i.JXP,{})}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(j,{children:[(0,d.jsx)(i.B88,{})," Subir foto",(0,d.jsx)("input",{type:"file",accept:"image/*",onChange:r=>{const e=r.target.files[0];if(e){F(e);const r=URL.createObjectURL(e);a((e=>({...e,avatar_url:r})))}}})]}),(0,d.jsx)(y,{children:"JPG, PNG o GIF. M\xe1ximo 2MB."})]})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(g,{htmlFor:"first_name",children:"Nombre"}),(0,d.jsx)(m,{type:"text",id:"first_name",name:"first_name",value:e.first_name,onChange:P,placeholder:"Tu nombre"})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(g,{htmlFor:"last_name",children:"Apellido"}),(0,d.jsx)(m,{type:"text",id:"last_name",name:"last_name",value:e.last_name,onChange:P,placeholder:"Tu apellido"})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(g,{children:"Email"}),(0,d.jsx)(m,{type:"email",value:(null===r||void 0===r?void 0:r.email)||"",disabled:!0})]}),(0,d.jsx)(w,{type:"submit",disabled:_,children:_?"Guardando...":(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.Bc_,{})," Guardar Cambios"]})}),S&&(0,d.jsx)(k,{children:S}),D&&(0,d.jsx)(A,{children:D})]})]})},_=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 32px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 24px;
`,z=t.Ay.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`,S=t.Ay.h2`
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`,C=t.Ay.div`
  margin-bottom: 20px;
`,D=t.Ay.label`
  display: block;
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: var(--text-medium);
  font-weight: 500;
`,N=t.Ay.select`
  width: 100%;
  padding: 12px;
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
`,T=t.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
`,F=t.Ay.span`
  font-size: 0.95rem;
  color: var(--text-dark);
`,P=t.Ay.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-medium);
    transition: .4s;
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: var(--primary-color);
  }
  
  input:checked + span:before {
    transform: translateX(24px);
  }
`,R=t.Ay.button`
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
`,U=t.Ay.div`
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
`,$=()=>{const[r,e]=(0,o.useState)({currency:"ARS",language:"es",notifications_enabled:!0,email_notifications:!0,default_view:"dashboard"}),[a,t]=(0,o.useState)(!0),[n,l]=(0,o.useState)(!1),[p,x]=(0,o.useState)(""),[u,h]=(0,o.useState)("");(0,o.useEffect)((()=>{(async()=>{try{t(!0);const r=await(async()=>{try{const r=await s();return(null===r||void 0===r?void 0:r.preferences)||{}}catch(p){return console.error("Error in getUserPreferences:",p),{}}})();Object.keys(r).length>0&&e((e=>({...e,...r})))}catch(r){console.error("Error loading preferences:",r),x("Error al cargar las preferencias")}finally{t(!1)}})()}),[]);const g=r=>{const{name:a,value:o,type:t,checked:i}=r.target;e((r=>({...r,[a]:"checkbox"===t?i:o})))};return a?(0,d.jsx)(_,{children:(0,d.jsx)("div",{style:{textAlign:"center",padding:"20px"},children:"Cargando preferencias..."})}):(0,d.jsxs)(_,{children:[(0,d.jsx)(z,{children:(0,d.jsx)(S,{children:"Preferencias"})}),(0,d.jsxs)("form",{onSubmit:async e=>{e.preventDefault();try{l(!0),x(""),h(""),await(async r=>{try{const e=await s(),a={...(null===e||void 0===e?void 0:e.preferences)||{},...r};return await c({preferences:a})}catch(p){throw console.error("Error in updateUserPreferences:",p),p}})(r),h("Preferencias actualizadas correctamente")}catch(a){console.error("Error saving preferences:",a),x("Error al guardar las preferencias")}finally{l(!1)}},children:[(0,d.jsxs)(C,{children:[(0,d.jsx)(D,{htmlFor:"currency",children:"Moneda predeterminada"}),(0,d.jsxs)(N,{id:"currency",name:"currency",value:r.currency,onChange:g,children:[(0,d.jsx)("option",{value:"ARS",children:"Peso Argentino (ARS)"}),(0,d.jsx)("option",{value:"USD",children:"D\xf3lar Estadounidense (USD)"}),(0,d.jsx)("option",{value:"EUR",children:"Euro (EUR)"})]})]}),(0,d.jsxs)(C,{children:[(0,d.jsx)(D,{htmlFor:"language",children:"Idioma"}),(0,d.jsxs)(N,{id:"language",name:"language",value:r.language,onChange:g,children:[(0,d.jsx)("option",{value:"es",children:"Espa\xf1ol"}),(0,d.jsx)("option",{value:"en",children:"Ingl\xe9s"})]})]}),(0,d.jsxs)(C,{children:[(0,d.jsx)(D,{htmlFor:"default_view",children:"Vista predeterminada"}),(0,d.jsxs)(N,{id:"default_view",name:"default_view",value:r.default_view,onChange:g,children:[(0,d.jsx)("option",{value:"dashboard",children:"Dashboard"}),(0,d.jsx)("option",{value:"finances",children:"Finanzas"}),(0,d.jsx)("option",{value:"tasks",children:"Tareas"}),(0,d.jsx)("option",{value:"investments",children:"Inversiones"}),(0,d.jsx)("option",{value:"calendar",children:"Calendario"})]})]}),(0,d.jsxs)(C,{children:[(0,d.jsx)(D,{children:"Notificaciones"}),(0,d.jsxs)(T,{children:[(0,d.jsx)(F,{children:"Notificaciones en la aplicaci\xf3n"}),(0,d.jsxs)(P,{children:[(0,d.jsx)("input",{type:"checkbox",name:"notifications_enabled",checked:r.notifications_enabled,onChange:g}),(0,d.jsx)("span",{})]})]}),(0,d.jsxs)(T,{children:[(0,d.jsx)(F,{children:"Notificaciones por email"}),(0,d.jsxs)(P,{children:[(0,d.jsx)("input",{type:"checkbox",name:"email_notifications",checked:r.email_notifications,onChange:g}),(0,d.jsx)("span",{})]})]})]}),(0,d.jsx)(R,{type:"submit",disabled:n,children:n?"Guardando...":(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.Bc_,{})," Guardar Preferencias"]})}),p&&(0,d.jsx)(U,{children:p}),u&&(0,d.jsx)(M,{children:u})]})]})};var I=a(4478),L=a(8670);const G=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,W=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`,J=t.Ay.h2`
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
`,O=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,q=t.Ay.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,B=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: var(--primary-color);
    font-size: 1.5rem;
  }
`,H=t.Ay.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
`,X=t.Ay.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-medium);
`,Q=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;

  label {
    font-size: 0.9rem;
    color: var(--text-medium);
  }

  select {
    padding: 8px 12px;
    border-radius: var(--border-radius);
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: white;
    font-size: 0.9rem;
    flex: 1;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
    }
  }
`,V=t.Ay.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
      background-color: var(--primary-color);
    }

    &:checked + span:before {
      transform: translateX(24px);
    }

    &:focus + span {
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
    }
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
`,Y=(0,t.Ay)(L.A)`
  margin-top: 16px;
`,Z=()=>{const{settings:r,updateSetting:e,resetSettings:a}=(0,I.Ws)();return(0,d.jsxs)(G,{children:[(0,d.jsxs)(W,{children:[(0,d.jsx)(J,{children:"Configuraci\xf3n de Accesibilidad"}),(0,d.jsxs)(Y,{variant:"outline",onClick:a,children:[(0,d.jsx)(i.jTZ,{})," Restablecer valores predeterminados"]})]}),(0,d.jsxs)(O,{children:[(0,d.jsxs)(q,{children:[(0,d.jsxs)(B,{children:[(0,d.jsx)(i.MRc,{}),(0,d.jsxs)("div",{children:[(0,d.jsx)(H,{children:"Tama\xf1o de fuente"}),(0,d.jsx)(X,{children:"Ajusta el tama\xf1o del texto en toda la aplicaci\xf3n"})]})]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)("label",{htmlFor:"fontSize",children:"Tama\xf1o:"}),(0,d.jsxs)("select",{id:"fontSize",value:r.fontSize,onChange:r=>e("fontSize",r.target.value),children:[(0,d.jsx)("option",{value:"small",children:"Peque\xf1o"}),(0,d.jsx)("option",{value:"medium",children:"Mediano"}),(0,d.jsx)("option",{value:"large",children:"Grande"})]})]})]}),(0,d.jsxs)(q,{children:[(0,d.jsxs)(B,{children:[(0,d.jsx)(i.Vap,{}),(0,d.jsxs)("div",{children:[(0,d.jsx)(H,{children:"Alto contraste"}),(0,d.jsx)(X,{children:"Mejora la visibilidad con colores de alto contraste"})]})]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)("span",{children:"Desactivado"}),(0,d.jsxs)(V,{children:[(0,d.jsx)("input",{type:"checkbox",checked:r.highContrast,onChange:r=>e("highContrast",r.target.checked)}),(0,d.jsx)("span",{})]}),(0,d.jsx)("span",{children:"Activado"})]})]}),(0,d.jsxs)(q,{children:[(0,d.jsxs)(B,{children:[(0,d.jsx)(i.z1n,{}),(0,d.jsxs)("div",{children:[(0,d.jsx)(H,{children:"Reducir movimiento"}),(0,d.jsx)(X,{children:"Minimiza animaciones y transiciones"})]})]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)("span",{children:"Desactivado"}),(0,d.jsxs)(V,{children:[(0,d.jsx)("input",{type:"checkbox",checked:r.reducedMotion,onChange:r=>e("reducedMotion",r.target.checked)}),(0,d.jsx)("span",{})]}),(0,d.jsx)("span",{children:"Activado"})]})]}),(0,d.jsxs)(q,{children:[(0,d.jsxs)(B,{children:[(0,d.jsx)(i.Fv0,{}),(0,d.jsxs)("div",{children:[(0,d.jsx)(H,{children:"Navegaci\xf3n por teclado"}),(0,d.jsx)(X,{children:"Mejora la visibilidad del foco al navegar con teclado"})]})]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)("span",{children:"Desactivado"}),(0,d.jsxs)(V,{children:[(0,d.jsx)("input",{type:"checkbox",checked:r.keyboardNavigation,onChange:r=>e("keyboardNavigation",r.target.checked)}),(0,d.jsx)("span",{})]}),(0,d.jsx)("span",{children:"Activado"})]})]})]})]})};var K=a(3280),rr=a(5594),er=a(6618);const ar=t.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,or=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`,tr=t.Ay.h2`
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
`,ir=t.Ay.div`
  display: flex;
  gap: 8px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`,nr=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,sr=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-size: 0.9rem;
    color: var(--text-medium);
  }
  
  select, input {
    padding: 8px 12px;
    border-radius: var(--border-radius);
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: white;
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
    }
  }
`,cr=t.Ay.div`
  overflow-x: auto;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
    
    th {
      font-weight: 600;
      color: var(--text-dark);
      background-color: rgba(0, 0, 0, 0.02);
    }
    
    tr:hover td {
      background-color: rgba(var(--primary-color-rgb), 0.05);
    }
  }
`,lr=t.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  
  ${r=>"INSERT"===r.action?"\n        background-color: rgba(var(--success-color-rgb), 0.1);\n        color: var(--success-color);\n      ":"UPDATE"===r.action?"\n        background-color: rgba(var(--primary-color-rgb), 0.1);\n        color: var(--primary-color);\n      ":"DELETE"===r.action?"\n        background-color: rgba(var(--danger-color-rgb), 0.1);\n        color: var(--danger-color);\n      ":void 0}
`,dr=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`,pr=t.Ay.div`
  font-size: 0.9rem;
  color: var(--text-medium);
`,xr=t.Ay.div`
  display: flex;
  gap: 8px;
`,ur=t.Ay.div`
  text-align: center;
  padding: 32px;
  color: var(--text-medium);
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
`,hr=()=>{const[r,e]=(0,o.useState)([]),[a,t]=(0,o.useState)(!0),[s,c]=(0,o.useState)({table:"",action:"",startDate:"",endDate:""}),[l,p]=(0,o.useState)({limit:10,offset:0,total:0}),[x,u]=(0,o.useState)(!1),h=async()=>{try{t(!0);const r=await async function(){let r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};try{const{limit:e=50,offset:a=0,table:o=null,action:t=null,startDate:i=null,endDate:s=null}=r;let c=n.N.from("audit_logs").select("*").order("created_at",{ascending:!1}).limit(e).range(a,a+e-1);o&&(c=c.eq("table_name",o)),t&&(c=c.eq("action",t.toUpperCase())),i&&(c=c.gte("created_at",`${i}T00:00:00`)),s&&(c=c.lte("created_at",`${s}T23:59:59`));const{data:l,error:d}=await c;if(d)throw d;return l}catch(e){throw console.error("Error al obtener registros de auditor\xeda:",e),e}}({limit:l.limit,offset:l.offset,table:s.table||null,action:s.action||null,startDate:s.startDate||null,endDate:s.endDate||null});e(r),p((e=>({...e,total:r.length>=e.limit?e.total+r.length:e.offset+r.length})))}catch(r){console.error("Error al cargar registros de auditor\xeda:",r),(0,er.Qg)("Error al cargar registros de auditor\xeda")}finally{t(!1)}};(0,o.useEffect)((()=>{h()}),[l.offset,l.limit,s]);const g=r=>new Date(r).toLocaleString("es-AR",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),m=e=>{"prev"===e&&l.offset>0?p((r=>({...r,offset:Math.max(0,r.offset-r.limit)}))):"next"===e&&r.length===l.limit&&p((r=>({...r,offset:r.offset+r.limit})))},b=r=>{const{name:e,value:a}=r.target;c((r=>({...r,[e]:a}))),p((r=>({...r,offset:0})))};return(0,d.jsxs)(ar,{children:[(0,d.jsxs)(or,{children:[(0,d.jsx)(tr,{children:"Registros de Auditor\xeda"}),(0,d.jsxs)(ir,{children:[(0,d.jsxs)(L.A,{variant:"outline",onClick:()=>u(!x),children:[(0,d.jsx)(i.K7R,{})," Filtros"]}),(0,d.jsxs)(L.A,{variant:"outline",onClick:h,disabled:a,children:[(0,d.jsx)(i.jTZ,{})," Actualizar"]}),(0,d.jsxs)(L.A,{variant:"outline",onClick:()=>{try{const e=r.map((r=>({ID:r.id,"Acci\xf3n":r.action,Tabla:r.table_name,"ID de Registro":r.record_id,"Fecha de Creaci\xf3n":g(r.created_at),"Agente de Usuario":r.user_agent})));(0,K.GF)(e,"registros-auditoria")}catch(e){console.error("Error al exportar registros:",e),(0,er.Qg)("Error al exportar registros")}},disabled:a||0===r.length,children:[(0,d.jsx)(i.a4x,{})," Exportar"]})]})]}),x&&(0,d.jsxs)(nr,{children:[(0,d.jsxs)(sr,{children:[(0,d.jsx)("label",{htmlFor:"table",children:"Tabla"}),(0,d.jsxs)("select",{id:"table",name:"table",value:s.table,onChange:b,children:[(0,d.jsx)("option",{value:"",children:"Todas"}),(0,d.jsx)("option",{value:"transactions",children:"Transacciones"}),(0,d.jsx)("option",{value:"tasks",children:"Tareas"}),(0,d.jsx)("option",{value:"investments",children:"Inversiones"}),(0,d.jsx)("option",{value:"financial_goals",children:"Metas Financieras"}),(0,d.jsx)("option",{value:"events",children:"Eventos"})]})]}),(0,d.jsxs)(sr,{children:[(0,d.jsx)("label",{htmlFor:"action",children:"Acci\xf3n"}),(0,d.jsxs)("select",{id:"action",name:"action",value:s.action,onChange:b,children:[(0,d.jsx)("option",{value:"",children:"Todas"}),(0,d.jsx)("option",{value:"INSERT",children:"Inserci\xf3n"}),(0,d.jsx)("option",{value:"UPDATE",children:"Actualizaci\xf3n"}),(0,d.jsx)("option",{value:"DELETE",children:"Eliminaci\xf3n"})]})]}),(0,d.jsxs)(sr,{children:[(0,d.jsx)("label",{htmlFor:"startDate",children:"Fecha de inicio"}),(0,d.jsx)("input",{id:"startDate",name:"startDate",type:"date",value:s.startDate,onChange:b})]}),(0,d.jsxs)(sr,{children:[(0,d.jsx)("label",{htmlFor:"endDate",children:"Fecha de fin"}),(0,d.jsx)("input",{id:"endDate",name:"endDate",type:"date",value:s.endDate,onChange:b})]})]}),a?(0,d.jsx)(rr.A,{text:"Cargando registros de auditor\xeda..."}):(0,d.jsx)(d.Fragment,{children:r.length>0?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(cr,{children:(0,d.jsxs)("table",{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{children:"Acci\xf3n"}),(0,d.jsx)("th",{children:"Tabla"}),(0,d.jsx)("th",{children:"ID de Registro"}),(0,d.jsx)("th",{children:"Fecha"})]})}),(0,d.jsx)("tbody",{children:r.map((r=>(0,d.jsxs)("tr",{children:[(0,d.jsx)("td",{children:(0,d.jsx)(lr,{action:r.action,children:"INSERT"===r.action?"Inserci\xf3n":"UPDATE"===r.action?"Actualizaci\xf3n":"DELETE"===r.action?"Eliminaci\xf3n":r.action})}),(0,d.jsx)("td",{children:r.table_name}),(0,d.jsx)("td",{children:r.record_id||"-"}),(0,d.jsx)("td",{children:g(r.created_at)})]},r.id)))})]})}),(0,d.jsxs)(dr,{children:[(0,d.jsxs)(pr,{children:["Mostrando ",l.offset+1," - ",Math.min(l.offset+r.length,l.total)," de ",l.total," registros"]}),(0,d.jsxs)(xr,{children:[(0,d.jsx)(L.A,{variant:"outline",onClick:()=>m("prev"),disabled:0===l.offset,children:"Anterior"}),(0,d.jsx)(L.A,{variant:"outline",onClick:()=>m("next"),disabled:r.length<l.limit,children:"Siguiente"})]})]})]}):(0,d.jsxs)(ur,{children:[(0,d.jsx)("p",{children:"No se encontraron registros de auditor\xeda"}),(0,d.jsx)("p",{children:"Intenta cambiar los filtros o realizar algunas acciones en la aplicaci\xf3n"})]})})]})};var gr=a(6823);const mr=t.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
`,br=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`,fr=t.Ay.h3`
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-dark);
`,vr=t.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${r=>"granted"===r.status?"rgba(var(--success-color-rgb), 0.1)":"denied"===r.status?"rgba(var(--danger-color-rgb), 0.1)":"rgba(var(--info-color-rgb), 0.1)"};
  color: ${r=>"granted"===r.status?"var(--success-color)":"denied"===r.status?"var(--danger-color)":"var(--info-color)"};
  font-size: 1.2rem;
`,jr=t.Ay.div`
  margin-bottom: 16px;
  color: var(--text-medium);
  font-size: 0.95rem;
  line-height: 1.5;
`,yr=t.Ay.div`
  display: flex;
  gap: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`,wr=()=>{const[r,e]=(0,o.useState)("default"),[a,t]=(0,o.useState)(!1);(0,o.useEffect)((()=>{(async()=>{const r=(0,gr.HN)();if(e(r),"granted"===r){const r=await(0,gr.Lz)();t(!!r),(0,gr.GT)()}})()}),[]);const n=async()=>{const r=await(0,gr.mT)();if(e(r),"granted"===r){(0,er.cf)("\xa1Notificaciones activadas! Ahora recibir\xe1s recordatorios importantes.");const r=await(0,gr.Lz)();t(!!r),(0,gr.GT)()}else"denied"===r&&(0,er.cf)("Has denegado el permiso para notificaciones. Puedes cambiar esto en la configuraci\xf3n de tu navegador.")};return(0,d.jsxs)(mr,{children:[(0,d.jsxs)(br,{children:[(0,d.jsx)(vr,{status:r,children:"granted"===r?(0,d.jsx)(i.zd,{}):"denied"===r?(0,d.jsx)(i.EkJ,{}):(0,d.jsx)(i.S8s,{})}),(0,d.jsx)(fr,{children:"Notificaciones"})]}),(()=>{switch(r){case"granted":return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(jr,{children:["Las notificaciones est\xe1n activadas. Recibir\xe1s alertas sobre:",(0,d.jsxs)("ul",{children:[(0,d.jsx)("li",{children:"Recordatorios de tareas pendientes"}),(0,d.jsx)("li",{children:"Eventos pr\xf3ximos en tu calendario"}),(0,d.jsx)("li",{children:"Alertas de movimientos financieros importantes"})]})]}),(0,d.jsx)(yr,{children:(0,d.jsxs)(L.A,{variant:"outline",onClick:()=>e("default"),children:[(0,d.jsx)(i.EkJ,{})," Desactivar notificaciones"]})})]});case"denied":return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(jr,{children:"Has bloqueado las notificaciones para esta aplicaci\xf3n. Para activarlas, debes cambiar la configuraci\xf3n en tu navegador."}),(0,d.jsx)(yr,{children:(0,d.jsxs)(L.A,{variant:"primary",onClick:()=>{window.open("chrome://settings/content/notifications","_blank")},children:[(0,d.jsx)(i.S8s,{})," Abrir configuraci\xf3n del navegador"]})})]});case"not-supported":return(0,d.jsx)(jr,{children:"Tu navegador no soporta notificaciones. Para recibir notificaciones, por favor utiliza un navegador moderno como Chrome, Firefox, Safari o Edge."});default:return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(jr,{children:"Activa las notificaciones para recibir recordatorios de tareas pendientes, eventos pr\xf3ximos y alertas financieras importantes."}),(0,d.jsx)(yr,{children:(0,d.jsxs)(L.A,{variant:"primary",onClick:n,children:[(0,d.jsx)(i.zd,{})," Activar notificaciones"]})})]})}})()]})},kr=t.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,Ar=t.Ay.div`
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
`,Er=()=>(0,d.jsxs)(kr,{children:[(0,d.jsxs)(Ar,{children:[(0,d.jsx)("h1",{children:"Mi Perfil"}),(0,d.jsx)("p",{children:"Gestiona tu informaci\xf3n personal y preferencias"})]}),(0,d.jsx)(E,{}),(0,d.jsx)($,{}),(0,d.jsx)(wr,{}),(0,d.jsx)(Z,{}),(0,d.jsx)(hr,{})]})},6823:(r,e,a)=>{a.d(e,{GT:()=>p,HN:()=>n,Lz:()=>s,mT:()=>i});const o=()=>"Notification"in window,t=()=>"serviceWorker"in navigator,i=async()=>{if(!o())return console.warn("Las notificaciones no son soportadas en este navegador"),"not-supported";try{return await Notification.requestPermission()}catch(r){return console.error("Error al solicitar permiso para notificaciones:",r),"error"}},n=()=>o()?Notification.permission:"not-supported",s=async()=>{if(!t())return console.warn("Service Worker no es soportado en este navegador"),null;try{const r=await navigator.serviceWorker.register("/service-worker.js");return console.log("Service Worker registrado con \xe9xito:",r),r}catch(r){return console.error("Error al registrar el Service Worker:",r),null}},c=async function(r){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("granted"!==n())return console.warn("No se tiene permiso para mostrar notificaciones"),null;try{if(t()&&navigator.serviceWorker.controller){const a=await navigator.serviceWorker.ready;return await a.showNotification(r,e),!0}return new Notification(r,e)}catch(a){return console.error("Error al mostrar notificaci\xf3n:",a),null}},l=()=>{try{const r=localStorage.getItem("scheduledNotifications");return r?JSON.parse(r):[]}catch(r){return console.error("Error al obtener notificaciones programadas:",r),[]}},d=r=>{try{const e=l().filter((e=>e.id!==r));return localStorage.setItem("scheduledNotifications",JSON.stringify(e)),!0}catch(e){return console.error("Error al eliminar notificaci\xf3n programada:",e),!1}},p=()=>{try{const r=l(),e=new Date;r.forEach((r=>{const a=new Date(r.scheduledTime).getTime()-e.getTime();a<=0?(c(r.title,r.options),d(r.id)):setTimeout((()=>{c(r.title,r.options),d(r.id)}),a)}))}catch(r){console.error("Error al verificar notificaciones programadas:",r)}}},8670:(r,e,a)=>{a.d(e,{A:()=>s});a(5043);var o=a(5464),t=a(1547),i=a(579);const n=(0,o.Ay)(t.CS.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  border: none;
  outline: none;
  gap: 8px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${r=>"primary"===r.variant&&"\n    background-color: var(--primary-color);\n    color: white;\n    \n    &:hover:not(:disabled) {\n      background-color: var(--primary-color-dark);\n    }\n  "}
  
  ${r=>"secondary"===r.variant&&"\n    background-color: var(--secondary-color);\n    color: white;\n    \n    &:hover:not(:disabled) {\n      background-color: var(--secondary-color-dark);\n    }\n  "}
  
  ${r=>"danger"===r.variant&&"\n    background-color: var(--danger-color);\n    color: white;\n    \n    &:hover:not(:disabled) {\n      background-color: var(--danger-color-dark);\n    }\n  "}
  
  ${r=>"outline"===r.variant&&"\n    background-color: transparent;\n    color: var(--primary-color);\n    border: 1px solid var(--primary-color);\n    \n    &:hover:not(:disabled) {\n      background-color: rgba(var(--primary-color-rgb), 0.1);\n    }\n  "}
  
  ${r=>r.fullWidth&&"\n    width: 100%;\n  "}
`,s=r=>{let{variant:e="primary",fullWidth:a=!1,disabled:o=!1,onClick:s,children:c,...l}=r;const[d,p]=(0,t.zh)((()=>({scale:1,config:{tension:300,friction:10}})));return(0,i.jsx)(n,{variant:e,fullWidth:a,disabled:o,onClick:r=>{!o&&s&&p.start({scale:.95,onRest:()=>{p.start({scale:1}),s(r)}})},onMouseEnter:()=>{o||p.start({scale:1.05})},onMouseLeave:()=>{p.start({scale:1})},style:d,...l,children:c})}}}]);
//# sourceMappingURL=418.4ce58810.chunk.js.map