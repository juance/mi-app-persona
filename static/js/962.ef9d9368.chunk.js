"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[962],{962:(e,i,s)=>{s.r(i),s.d(i,{default:()=>f});var n=s(5043),r=s(5016),t=s(377),a=s(159),o=s(6823),c=s(6618),l=s(5464),d=s(5772),u=s(579);const g=l.Ay.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  max-width: 300px;

  &.hidden {
    transform: translateY(100px);
    opacity: 0;
    pointer-events: none;
  }

  &.success {
    background-color: rgba(34, 139, 34, 0.9);
  }

  &.warning {
    background-color: rgba(255, 165, 0, 0.9);
  }

  &.error {
    background-color: rgba(220, 53, 69, 0.9);
  }
`,m=l.Ay.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  margin-left: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    animation: ${e=>e.spinning?"spin 1s linear infinite":"none"};
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`,p=l.Ay.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .sync-title {
    font-weight: 600;
    margin-bottom: 2px;
  }

  .sync-message {
    font-size: 0.8rem;
    opacity: 0.9;
  }
`,f=()=>{const{user:e}=(0,r.A)(),[i,s]=(0,n.useState)(!1),[l,f]=(0,n.useState)(!1),[w,v]=(0,n.useState)({visible:!1,status:"idle",title:"",message:"",lastSync:null}),[y,b]=(0,n.useState)((0,t.KJ)()),S=(0,n.useCallback)((async function(){let i=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e&&l){if(!(0,t.KJ)())return v({visible:!0,status:"warning",title:"Sin conexi\xf3n",message:"No se pueden sincronizar datos sin conexi\xf3n a Internet",lastSync:w.lastSync}),void setTimeout((()=>{v((e=>({...e,visible:!1})))}),3e3);try{v({visible:!0,status:"syncing",title:"Sincronizando datos...",message:i?"Sincronizaci\xf3n completa en progreso":"Obteniendo datos m\xe1s recientes",lastSync:w.lastSync});const s=await(0,a.kO)(e.id,i);s.success?(console.log("Datos sincronizados correctamente:",s),v({visible:!0,status:"success",title:"Sincronizaci\xf3n completada",message:`${s.succeeded} almacenes sincronizados`,lastSync:new Date}),window.dispatchEvent(new CustomEvent("data-synced",{detail:{success:!0,stores:s.results?s.results.map((e=>e.store)):[]}})),setTimeout((()=>{v((e=>({...e,visible:!1})))}),3e3)):(console.warn("Advertencia al sincronizar datos:",s),v({visible:!0,status:"warning",title:"Sincronizaci\xf3n parcial",message:`${s.succeeded} sincronizados, ${s.failed} fallidos`,lastSync:new Date}),window.dispatchEvent(new CustomEvent("data-synced",{detail:{success:!1,partial:!0,stores:s.results?s.results.filter((e=>e.success)).map((e=>e.store)):[]}})),setTimeout((()=>{v((e=>({...e,visible:!1})))}),5e3))}catch(s){console.error("Error al sincronizar datos del usuario:",s),v({visible:!0,status:"error",title:"Error de sincronizaci\xf3n",message:s.message||"No se pudieron sincronizar los datos",lastSync:w.lastSync}),window.dispatchEvent(new CustomEvent("data-synced",{detail:{success:!1,error:s.message}})),setTimeout((()=>{v((e=>({...e,visible:!1})))}),5e3)}}}),[e,l,w.lastSync]);(0,n.useEffect)((()=>{const i=()=>{b(!0),e&&l&&S()},s=()=>{b(!1),v({visible:!0,status:"warning",title:"Sin conexi\xf3n",message:"Trabajando en modo offline",lastSync:w.lastSync}),setTimeout((()=>{v((e=>({...e,visible:!1})))}),3e3)};return window.addEventListener("online",i),window.addEventListener("offline",s),()=>{window.removeEventListener("online",i),window.removeEventListener("offline",s)}}),[e,l,S,w.lastSync]),(0,n.useEffect)((()=>((async()=>{if(!i&&!l){s(!0);try{console.log("Inicializando la aplicaci\xf3n..."),await(0,t.s4)(),console.log("Base de datos IndexedDB inicializada");const e=(0,a.xL)({showNotifications:!1,interval:6e4});console.log("Servicio de sincronizaci\xf3n inicializado"),await(0,o.Lz)(),console.log("Service worker registrado"),(0,o.GT)(),console.log("Notificaciones verificadas"),window.syncService=e,e.onSync=e=>{e.success&&(v({visible:!0,status:"success",title:"Sincronizaci\xf3n autom\xe1tica",message:`${e.succeeded} almacenes sincronizados`,lastSync:new Date}),setTimeout((()=>{v((e=>({...e,visible:!1})))}),3e3))},f(!0),console.log("Aplicaci\xf3n inicializada correctamente")}catch(e){console.error("Error al inicializar la aplicaci\xf3n:",e),(0,c.Qg)("Error al inicializar la aplicaci\xf3n")}finally{s(!1)}}})(),()=>{window.syncService&&window.syncService.stopSync()})),[i,l]),(0,n.useEffect)((()=>{e&&l&&y&&S()}),[e,l,y,S]);return(0,u.jsxs)(g,{className:(()=>{if(!w.visible)return"hidden";switch(w.status){case"success":return"success";case"warning":return"warning";case"error":return"error";default:return""}})(),children:[(()=>{switch(w.status){case"syncing":return(0,u.jsx)(d.jTZ,{size:18});case"success":return(0,u.jsx)(d.YrT,{size:18});case"warning":case"error":return(0,u.jsx)(d.eHT,{size:18});default:return y?(0,u.jsx)(d.tMZ,{size:18}):(0,u.jsx)(d.S$_,{size:18})}})(),(0,u.jsxs)(p,{children:[(0,u.jsx)("div",{className:"sync-title",children:w.title}),(0,u.jsxs)("div",{className:"sync-message",children:[w.message,w.lastSync&&` \u2022 \xdaltima: ${h=w.lastSync,h?new Date(h).toLocaleString("es-AR",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"}):"Nunca"}`]})]}),(0,u.jsx)(m,{onClick:()=>S(!0),disabled:"syncing"===w.status||!y,spinning:"syncing"===w.status,title:"Forzar sincronizaci\xf3n","aria-label":"Forzar sincronizaci\xf3n",children:(0,u.jsx)(d.jTZ,{size:16})})]});var h}},6823:(e,i,s)=>{s.d(i,{GT:()=>u,HN:()=>a,Lz:()=>o,mT:()=>t});const n=()=>"Notification"in window,r=()=>"serviceWorker"in navigator,t=async()=>{if(!n())return console.warn("Las notificaciones no son soportadas en este navegador"),"not-supported";try{return await Notification.requestPermission()}catch(e){return console.error("Error al solicitar permiso para notificaciones:",e),"error"}},a=()=>n()?Notification.permission:"not-supported",o=async()=>{if(!r())return console.warn("Service Worker no es soportado en este navegador"),null;try{const e=await navigator.serviceWorker.register("/service-worker.js");return console.log("Service Worker registrado con \xe9xito:",e),e}catch(e){return console.error("Error al registrar el Service Worker:",e),null}},c=async function(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("granted"!==a())return console.warn("No se tiene permiso para mostrar notificaciones"),null;try{if(r()&&navigator.serviceWorker.controller){const s=await navigator.serviceWorker.ready;return await s.showNotification(e,i),!0}return new Notification(e,i)}catch(s){return console.error("Error al mostrar notificaci\xf3n:",s),null}},l=()=>{try{const e=localStorage.getItem("scheduledNotifications");return e?JSON.parse(e):[]}catch(e){return console.error("Error al obtener notificaciones programadas:",e),[]}},d=e=>{try{const i=l().filter((i=>i.id!==e));return localStorage.setItem("scheduledNotifications",JSON.stringify(i)),!0}catch(i){return console.error("Error al eliminar notificaci\xf3n programada:",i),!1}},u=()=>{try{const e=l(),i=new Date;e.forEach((e=>{const s=new Date(e.scheduledTime).getTime()-i.getTime();s<=0?(c(e.title,e.options),d(e.id)):setTimeout((()=>{c(e.title,e.options),d(e.id)}),s)}))}catch(e){console.error("Error al verificar notificaciones programadas:",e)}}}}]);
//# sourceMappingURL=962.ef9d9368.chunk.js.map