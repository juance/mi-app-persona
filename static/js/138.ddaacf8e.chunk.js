"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[90,138],{6138:(e,r,a)=>{a.r(r),a.d(r,{default:()=>zr});var n=a(5043),o=a(5464),i=a(5772),t=a(6058),s=a(7304),c=a(579);s.t1.register(s.Bs,s.m_,s.s$);const l=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,d=o.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
  }
`,p=o.Ay.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 12px;
`,u=o.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${e=>{switch(e.type){case"invested":return"rgba(99, 102, 241, 0.1)";case"current":return"rgba(16, 185, 129, 0.1)";case"profit":return e.isPositive?"rgba(16, 185, 129, 0.1)":"rgba(239, 68, 68, 0.1)";default:return"rgba(245, 158, 11, 0.1)"}}};
  color: ${e=>{switch(e.type){case"invested":return"var(--primary-color)";case"current":return"var(--secondary-color)";case"profit":return e.isPositive?"var(--secondary-color)":"var(--danger-color)";default:return"var(--accent-color)"}}};
  font-size: 1.2rem;
`,m=o.Ay.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-medium);
`,g=o.Ay.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: ${e=>{switch(e.type){case"invested":return"var(--primary-color)";case"current":return"var(--secondary-color)";case"profit":return e.isPositive?"var(--secondary-color)":"var(--danger-color)";default:return"var(--accent-color)"}}};
`,x=o.Ay.div`
  font-size: 1rem;
  color: var(--text-light);
`,h=o.Ay.div`
  grid-column: span 4;
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
  }

  @media (max-width: 1024px) {
    grid-column: span 2;
  }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`,v=o.Ay.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
`,b=o.Ay.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
`,f=o.Ay.div`
  height: 300px;
  display: flex;
  justify-content: center;
`,y=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ARS";return new Intl.NumberFormat("es-AR",{style:"currency",currency:r}).format(e)},j=e=>new Intl.NumberFormat("es-ES",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(e/100),w=e=>{let{investments:r,exchangeRate:a=1.1}=e;const n=r.filter((e=>"ARS"===(e.currency||"ARS"))),o=r.filter((e=>"USD"===(e.currency||"ARS"))),s=n.reduce(((e,r)=>e+r.purchase_price*r.quantity),0),w=n.reduce(((e,r)=>e+r.current_price*r.quantity),0),A=w-s,k=s>0?A/s*100:0,S=o.reduce(((e,r)=>e+r.purchase_price*r.quantity),0),E=o.reduce(((e,r)=>e+r.current_price*r.quantity),0),z=E-S,_=S>0?z/S*100:0,C=s+S*a,D=w+E*a-C,q=C>0?D/C*100:0,$=D>=0,I=(()=>{const e={};return n.forEach((r=>{const a=r.current_price*r.quantity,n=`${r.type}_ARS`;e[n]?e[n]+=a:e[n]=a})),o.forEach((r=>{const a=r.current_price*r.quantity,n=`${r.type}_USD`;e[n]?e[n]+=a:e[n]=a})),e})(),F={labels:Object.keys(I).map((e=>(e=>{const[r,a]=e.split("_");let n="";switch(r){case"stock":n="Acciones";break;case"crypto":n="Criptomonedas";break;case"etf":n="ETFs";break;case"bond":n="Bonos";break;case"fund":n="Fondos";break;default:n=r}return`${n} (${a})`})(e))),datasets:[{data:Object.values(I),backgroundColor:Object.keys(I).map((e=>(e=>{const[r,a]=e.split("_");return{stock:"ARS"===a?"rgba(99, 102, 241, 0.7)":"rgba(99, 102, 241, 0.4)",crypto:"ARS"===a?"rgba(245, 158, 11, 0.7)":"rgba(245, 158, 11, 0.4)",etf:"ARS"===a?"rgba(16, 185, 129, 0.7)":"rgba(16, 185, 129, 0.4)",bond:"ARS"===a?"rgba(239, 68, 68, 0.7)":"rgba(239, 68, 68, 0.4)",fund:"ARS"===a?"rgba(168, 85, 247, 0.7)":"rgba(168, 85, 247, 0.4)"}[r]||("ARS"===a?"rgba(99, 102, 241, 0.7)":"rgba(99, 102, 241, 0.4)")})(e))),borderColor:Object.keys(I).map((e=>(e=>{const[r,a]=e.split("_");return{stock:"rgba(99, 102, 241, 1)",crypto:"rgba(245, 158, 11, 1)",etf:"rgba(16, 185, 129, 1)",bond:"rgba(239, 68, 68, 1)",fund:"rgba(168, 85, 247, 1)"}[r]||"rgba(99, 102, 241, 1)"})(e))),borderWidth:1}]},P={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"right",labels:{font:{family:"Poppins"}}},tooltip:{callbacks:{label:function(e){const r=e.raw,a=Object.keys(I)[e.dataIndex],[,n]=a.split("_");let o="ARS"===n?w:E;const i=o>0?r/o*100:0;return`${e.label}: ${y(r,n)} (${j(i)})`}}}}};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(l,{children:[(0,c.jsxs)(d,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(u,{type:"invested",children:(0,c.jsx)(i.z8N,{})}),(0,c.jsx)(m,{children:"Total Invertido (ARS)"})]}),(0,c.jsx)(g,{type:"invested",children:y(s,"ARS")}),(0,c.jsxs)(x,{children:[n.length," inversiones en pesos"]})]}),(0,c.jsxs)(d,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(u,{type:"invested",children:(0,c.jsx)(i.z8N,{})}),(0,c.jsx)(m,{children:"Total Invertido (USD)"})]}),(0,c.jsx)(g,{type:"invested",children:y(S,"USD")}),(0,c.jsxs)(x,{children:[o.length," inversiones en d\xf3lares"]})]}),(0,c.jsxs)(d,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(u,{type:"current",children:(0,c.jsx)(i.z8N,{})}),(0,c.jsx)(m,{children:"Valor Actual (ARS)"})]}),(0,c.jsx)(g,{type:"current",children:y(w,"ARS")}),(0,c.jsxs)(x,{children:[A>=0?"+":"",y(A,"ARS")," (",j(k),")"]})]}),(0,c.jsxs)(d,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(u,{type:"current",children:(0,c.jsx)(i.z8N,{})}),(0,c.jsx)(m,{children:"Valor Actual (USD)"})]}),(0,c.jsx)(g,{type:"current",children:y(E,"USD")}),(0,c.jsxs)(x,{children:[z>=0?"+":"",y(z,"USD")," (",j(_),")"]})]})]}),(0,c.jsxs)(l,{children:[(0,c.jsxs)(d,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(u,{type:"profit",isPositive:A>=0,children:A>=0?(0,c.jsx)(i.ARf,{}):(0,c.jsx)(i.JW4,{})}),(0,c.jsx)(m,{children:"Rendimiento (ARS)"})]}),(0,c.jsxs)(g,{type:"profit",isPositive:A>=0,children:[A>=0?"+":"",j(k)]}),(0,c.jsxs)(x,{children:[A>=0?"+":"",y(A,"ARS")]})]}),(0,c.jsxs)(d,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(u,{type:"profit",isPositive:z>=0,children:z>=0?(0,c.jsx)(i.ARf,{}):(0,c.jsx)(i.JW4,{})}),(0,c.jsx)(m,{children:"Rendimiento (USD)"})]}),(0,c.jsxs)(g,{type:"profit",isPositive:z>=0,children:[z>=0?"+":"",j(_)]}),(0,c.jsxs)(x,{children:[z>=0?"+":"",y(z,"USD")]})]}),(0,c.jsxs)(d,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(u,{type:"profit",isPositive:$,children:$?(0,c.jsx)(i.ARf,{}):(0,c.jsx)(i.JW4,{})}),(0,c.jsx)(m,{children:"Rendimiento Global"})]}),(0,c.jsxs)(g,{type:"profit",isPositive:$,children:[$?"+":"",j(q)]}),(0,c.jsxs)(x,{children:[r.length," inversiones totales"]})]})]}),r.length>0&&(0,c.jsxs)(h,{children:[(0,c.jsxs)(v,{children:[(0,c.jsx)(u,{type:"distribution",children:(0,c.jsx)(i.eXT,{})}),(0,c.jsx)(b,{children:"Distribuci\xf3n de Inversiones"})]}),(0,c.jsx)(f,{children:(0,c.jsx)(t.Fq,{data:F,options:P})})]})]})},A=o.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-speed);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow-hover);
  }
`,k=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`,S=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,E=o.Ay.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${e=>"stock"===e.type?"rgba(99, 102, 241, 0.1)":"crypto"===e.type?"rgba(245, 158, 11, 0.1)":"rgba(16, 185, 129, 0.1)"};
  color: ${e=>"stock"===e.type?"var(--primary-color)":"crypto"===e.type?"var(--accent-color)":"var(--secondary-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
`,z=o.Ay.div`
  display: flex;
  flex-direction: column;
`,_=o.Ay.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
`,C=o.Ay.span`
  font-size: 0.85rem;
  color: var(--text-medium);
  margin-top: 4px;
`,D=o.Ay.span`
  font-size: 0.85rem;
  color: var(--accent-color);
  margin-top: 4px;
`,q=o.Ay.div`
  display: flex;
  gap: 8px;
`,$=o.Ay.button`
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
`,I=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`,F=o.Ay.div`
  display: flex;
  flex-direction: column;
`,P=o.Ay.span`
  font-size: 0.85rem;
  color: var(--text-medium);
  margin-bottom: 4px;
`,R=o.Ay.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
`,T=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,U=o.Ay.span`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${e=>e.isPositive?"var(--secondary-color)":"var(--danger-color)"};
  display: flex;
  align-items: center;
  gap: 4px;
`,N=o.Ay.span`
  font-size: 1.2rem;
`,M=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ARS";return new Intl.NumberFormat("es-AR",{style:"currency",currency:r}).format(e)},L=e=>{switch(e){case"stock":return"Acci\xf3n";case"crypto":return"Criptomoneda";case"etf":return"ETF";case"bond":return"Bono";case"fund":return"Fondo de inversi\xf3n";default:return e}},O=e=>{let{investment:r,onEdit:a,onDelete:n}=e;const{id:o,name:t,symbol:s,type:l,quantity:d,purchase_price:p,current_price:u,platform:m,currency:g="ARS",purchase_date:x}=r,h=p*d,v=u*d,b=v-h,f=b/h*100,y=b>=0;return(0,c.jsxs)(A,{children:[(0,c.jsxs)(k,{children:[(0,c.jsxs)(S,{children:[(0,c.jsx)(E,{type:l,children:s.substring(0,2).toUpperCase()}),(0,c.jsxs)(z,{children:[(0,c.jsx)(_,{children:t}),(0,c.jsxs)(C,{children:[L(l)," \u2022 ",s.toUpperCase()]}),m&&(0,c.jsx)(D,{children:m})]})]}),(0,c.jsxs)(q,{children:[(0,c.jsx)($,{onClick:()=>a(r),color:"var(--primary-color)",children:(0,c.jsx)(i.WXf,{})}),(0,c.jsx)($,{onClick:()=>n(o),color:"var(--danger-color)",children:(0,c.jsx)(i.IXo,{})})]})]}),(0,c.jsxs)(I,{children:[(0,c.jsxs)(F,{children:[(0,c.jsx)(P,{children:"Cantidad"}),(0,c.jsx)(R,{children:d})]}),(0,c.jsxs)(F,{children:[(0,c.jsxs)(P,{children:["Precio de compra (",g,")"]}),(0,c.jsx)(R,{children:M(p,g)})]}),(0,c.jsxs)(F,{children:[(0,c.jsxs)(P,{children:["Precio actual (",g,")"]}),(0,c.jsx)(R,{children:M(u,g)})]}),(0,c.jsxs)(F,{children:[(0,c.jsxs)(P,{children:["Inversi\xf3n total (",g,")"]}),(0,c.jsx)(R,{children:M(h,g)})]}),(0,c.jsxs)(F,{children:[(0,c.jsxs)(P,{children:["Valor actual (",g,")"]}),(0,c.jsx)(R,{children:M(v,g)})]}),(0,c.jsxs)(F,{children:[(0,c.jsxs)(P,{children:["Rendimiento (",g,")"]}),(0,c.jsxs)(T,{children:[(0,c.jsxs)(U,{isPositive:y,children:[(0,c.jsx)(N,{children:y?(0,c.jsx)(i.ARf,{}):(0,c.jsx)(i.JW4,{})}),M(b,g)]}),(0,c.jsxs)(U,{isPositive:y,children:["(",(w=f,new Intl.NumberFormat("es-ES",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(w/100)),")"]})]})]})]}),(0,c.jsx)("div",{children:(0,c.jsxs)(P,{children:["Fecha de compra: ",(j=x,new Date(j).toLocaleDateString("es-ES"))]})})]});var j,w},B=o.Ay.div`
  margin-top: 20px;
`,G=o.Ay.div`
  text-align: center;
  color: var(--text-light);
  font-style: italic;
  padding: 30px 0;
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
`,Q=e=>{let{investments:r,onEditInvestment:a,onDeleteInvestment:n}=e;return r&&0!==r.length?(0,c.jsx)(B,{children:r.map((e=>(0,c.jsx)(O,{investment:e,onEdit:a,onDelete:n},e.id)))}):(0,c.jsx)(B,{children:(0,c.jsx)(G,{children:"No hay inversiones. \xa1Registra una nueva!"})})},Y=o.Ay.div`
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
`,J=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,H=o.Ay.h3`
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
`,W=o.Ay.button`
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
`,X=o.Ay.div`
  color: var(--danger-color);
  margin-bottom: 16px;
  font-size: 0.9rem;
  padding: 12px;
  background-color: rgba(239, 68, 68, 0.08);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--danger-color);
`,V=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Z=o.Ay.div`
  margin-bottom: 20px;
`,K=o.Ay.label`
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
`,ee=o.Ay.input`
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
`,re=o.Ay.select`
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
`,ae=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,ne=o.Ay.button`
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
`,oe=o.Ay.button`
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
`,ie={name:"",symbol:"",type:"stock",quantity:"",purchase_price:"",current_price:"",platform:"",currency:"ARS",purchase_date:(new Date).toISOString().split("T")[0]},te=e=>{let{investment:r,onSubmit:a,onCancel:o}=e;const[t,s]=(0,n.useState)(ie),[l,d]=(0,n.useState)(""),p=!(null===r||void 0===r||!r.id);(0,n.useEffect)((()=>{s(r?{name:r.name||"",symbol:r.symbol||"",type:r.type||"stock",quantity:r.quantity||"",purchase_price:r.purchase_price||"",current_price:r.current_price||"",platform:r.platform||"",currency:r.currency||"ARS",purchase_date:r.purchase_date||(new Date).toISOString().split("T")[0]}:ie)}),[r]);const u=e=>{const{name:r,value:a}=e.target;s((e=>({...e,[r]:a})))};return(0,c.jsxs)(Y,{children:[(0,c.jsxs)(J,{children:[(0,c.jsx)(H,{children:p?"Editar Inversi\xf3n":"Registrar Nueva Inversi\xf3n"}),(0,c.jsx)(W,{onClick:o,children:(0,c.jsx)(i.yGN,{})})]}),l&&(0,c.jsx)(X,{children:l}),(0,c.jsxs)("form",{onSubmit:e=>{e.preventDefault(),t.name.trim()?t.symbol.trim()?!t.quantity||parseFloat(t.quantity)<=0?d("Por favor ingresa una cantidad v\xe1lida."):!t.purchase_price||parseFloat(t.purchase_price)<=0?d("Por favor ingresa un precio de compra v\xe1lido."):!t.current_price||parseFloat(t.current_price)<=0?d("Por favor ingresa un precio actual v\xe1lido."):(a({...t,id:(null===r||void 0===r?void 0:r.id)||Date.now(),quantity:parseFloat(t.quantity),purchase_price:parseFloat(t.purchase_price),current_price:parseFloat(t.current_price)}),p||s(ie),d("")):d("Por favor ingresa un s\xedmbolo para la inversi\xf3n."):d("Por favor ingresa un nombre para la inversi\xf3n.")},children:[(0,c.jsxs)(V,{children:[(0,c.jsxs)(Z,{children:[(0,c.jsx)(K,{htmlFor:"name",required:!0,children:"Nombre"}),(0,c.jsx)(ee,{type:"text",id:"name",name:"name",value:t.name,onChange:u,placeholder:"Ej: Apple Inc.",required:!0})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(K,{htmlFor:"symbol",required:!0,children:"S\xedmbolo"}),(0,c.jsx)(ee,{type:"text",id:"symbol",name:"symbol",value:t.symbol,onChange:u,placeholder:"Ej: AAPL",required:!0})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(K,{htmlFor:"type",required:!0,children:"Tipo"}),(0,c.jsxs)(re,{id:"type",name:"type",value:t.type,onChange:u,required:!0,children:[(0,c.jsx)("option",{value:"stock",children:"Acci\xf3n"}),(0,c.jsx)("option",{value:"etf",children:"ETF"}),(0,c.jsx)("option",{value:"crypto",children:"Criptomoneda"}),(0,c.jsx)("option",{value:"bond",children:"Bono"}),(0,c.jsx)("option",{value:"fund",children:"Fondo de inversi\xf3n"})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(K,{htmlFor:"quantity",required:!0,children:"Cantidad"}),(0,c.jsx)(ee,{type:"number",id:"quantity",name:"quantity",value:t.quantity,onChange:u,placeholder:"0",min:"0.00000001",step:"any",required:!0})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(K,{htmlFor:"currency",required:!0,children:"Moneda"}),(0,c.jsxs)(re,{id:"currency",name:"currency",value:t.currency,onChange:u,required:!0,children:[(0,c.jsx)("option",{value:"ARS",children:"Pesos Argentinos (ARS)"}),(0,c.jsx)("option",{value:"USD",children:"D\xf3lares (USD)"})]})]}),(0,c.jsxs)(Z,{children:[(0,c.jsxs)(K,{htmlFor:"purchase_price",required:!0,children:["Precio de compra (",t.currency,")"]}),(0,c.jsx)(ee,{type:"number",id:"purchase_price",name:"purchase_price",value:t.purchase_price,onChange:u,placeholder:"0.00",min:"0.01",step:"0.01",required:!0})]}),(0,c.jsxs)(Z,{children:[(0,c.jsxs)(K,{htmlFor:"current_price",required:!0,children:["Precio actual (",t.currency,")"]}),(0,c.jsx)(ee,{type:"number",id:"current_price",name:"current_price",value:t.current_price,onChange:u,placeholder:"0.00",min:"0.01",step:"0.01",required:!0})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(K,{htmlFor:"platform",children:"Plataforma"}),(0,c.jsx)(ee,{type:"text",id:"platform",name:"platform",value:t.platform,onChange:u,placeholder:"Ej: IOL, PPI, Binance"})]}),(0,c.jsxs)(Z,{children:[(0,c.jsx)(K,{htmlFor:"purchase_date",required:!0,children:"Fecha de compra"}),(0,c.jsx)(ee,{type:"date",id:"purchase_date",name:"purchase_date",value:t.purchase_date,onChange:u,required:!0})]})]}),(0,c.jsxs)(ae,{children:[(0,c.jsx)(ne,{type:"submit",children:p?"Guardar Cambios":"Registrar Inversi\xf3n"}),(0,c.jsx)(oe,{type:"button",onClick:o,children:"Cancelar"})]})]})]})},se=o.Ay.div`
  background-color: var(--bg-medium);
  padding: 16px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
`,ce=o.Ay.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  gap: 8px;
  color: var(--text-medium);
  font-weight: 500;
  font-size: 0.95rem;
`,le=(0,o.Ay)(i.K7R)`
  font-size: 1.1rem;
`,de=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,pe=o.Ay.div`
  flex: 2;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`,ue=(0,o.Ay)(i.CKj)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  font-size: 1rem;
`,me=o.Ay.input`
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
`,ge=o.Ay.div`
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
`,xe=o.Ay.select`
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
`,he=e=>{let{filters:r,onFilterChange:a}=e;const n=e=>{const{name:n,value:o}=e.target;a({...r,[n]:o})};return(0,c.jsxs)(se,{children:[(0,c.jsxs)(ce,{children:[(0,c.jsx)(le,{}),"Filtrar inversiones"]}),(0,c.jsxs)(de,{children:[(0,c.jsxs)(pe,{children:[(0,c.jsx)(ue,{}),(0,c.jsx)(me,{type:"text",placeholder:"Buscar inversiones...",name:"search",value:r.search||"",onChange:n})]}),(0,c.jsx)(ge,{children:(0,c.jsxs)(xe,{name:"type",value:r.type||"all",onChange:n,children:[(0,c.jsx)("option",{value:"all",children:"Todos los tipos"}),(0,c.jsx)("option",{value:"stock",children:"Acciones"}),(0,c.jsx)("option",{value:"etf",children:"ETFs"}),(0,c.jsx)("option",{value:"crypto",children:"Criptomonedas"}),(0,c.jsx)("option",{value:"bond",children:"Bonos"}),(0,c.jsx)("option",{value:"fund",children:"Fondos"})]})}),(0,c.jsx)(ge,{children:(0,c.jsxs)(xe,{name:"currency",value:r.currency||"all",onChange:n,children:[(0,c.jsx)("option",{value:"all",children:"Todas las monedas"}),(0,c.jsx)("option",{value:"ARS",children:"Pesos Argentinos (ARS)"}),(0,c.jsx)("option",{value:"USD",children:"D\xf3lares (USD)"})]})}),(0,c.jsx)(ge,{children:(0,c.jsxs)(xe,{name:"performance",value:r.performance||"all",onChange:n,children:[(0,c.jsx)("option",{value:"all",children:"Todos los rendimientos"}),(0,c.jsx)("option",{value:"positive",children:"Ganancias"}),(0,c.jsx)("option",{value:"negative",children:"P\xe9rdidas"})]})}),(0,c.jsx)(ge,{children:(0,c.jsxs)(xe,{name:"sort",value:r.sort||"name_asc",onChange:n,children:[(0,c.jsx)("option",{value:"name_asc",children:"Nombre (A-Z)"}),(0,c.jsx)("option",{value:"name_desc",children:"Nombre (Z-A)"}),(0,c.jsx)("option",{value:"value_desc",children:"Mayor valor primero"}),(0,c.jsx)("option",{value:"value_asc",children:"Menor valor primero"}),(0,c.jsx)("option",{value:"performance_desc",children:"Mayor rendimiento primero"}),(0,c.jsx)("option",{value:"performance_asc",children:"Menor rendimiento primero"}),(0,c.jsx)("option",{value:"date_desc",children:"M\xe1s recientes primero"}),(0,c.jsx)("option",{value:"date_asc",children:"M\xe1s antiguas primero"})]})})]})]})},ve="demo",be=async e=>{try{const r=await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${e}&apikey=${ve}`);if(!r.ok)throw new Error(`Error al obtener datos de la acci\xf3n: ${r.statusText}`);const a=await r.json();if(a["Error Message"])throw new Error(a["Error Message"]);if(a.Note&&a.Note.includes("API call frequency"))throw new Error("Se ha excedido el l\xedmite de llamadas a la API. Por favor, intenta m\xe1s tarde.");return a["Global Quote"]||{}}catch(r){throw console.error("Error en getStockQuote:",r),r}};var fe=a(5594),ye=a(8670),je=a(6618);const we=o.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,Ae=o.Ay.div`
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
`,ke=o.Ay.h2`
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
`,Se=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 24px;
`,Ee=o.Ay.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,ze=o.Ay.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
  margin-bottom: 8px;
`,_e=o.Ay.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-dark);
  margin-bottom: 8px;
`,Ce=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${e=>e.positive?"var(--success-color)":"var(--danger-color)"};
  margin-bottom: 16px;
`,De=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.8rem;
  color: var(--text-medium);
`,qe=o.Ay.div`
  display: flex;
  justify-content: space-between;
`,$e=o.Ay.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed);
  
  &:hover {
    color: var(--danger-color);
    background-color: rgba(239, 68, 68, 0.08);
  }
`,Ie=o.Ay.form`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,Fe=o.Ay.input`
  padding: 8px 12px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  flex: 1;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
  }
`,Pe=o.Ay.div`
  text-align: center;
  padding: 32px;
  color: var(--text-medium);
  background-color: var(--bg-light);
  border-radius: var(--border-radius);
  border: 1px dashed rgba(0, 0, 0, 0.1);
`,Re=()=>{const[e,r]=(0,n.useState)([]),[a,o]=(0,n.useState)(!1),[t,s]=(0,n.useState)(""),[l,d]=(0,n.useState)(!1);(0,n.useEffect)((()=>{const e=localStorage.getItem("trackedStocks");e&&r(JSON.parse(e))}),[]),(0,n.useEffect)((()=>{e.length>0&&localStorage.setItem("trackedStocks",JSON.stringify(e))}),[e]);const p=e=>new Intl.NumberFormat("es-AR",{style:"currency",currency:"USD"}).format(e);return(0,c.jsxs)(we,{children:[(0,c.jsxs)(Ae,{children:[(0,c.jsx)(ke,{children:"Seguimiento de Acciones"}),(0,c.jsxs)(ye.A,{variant:"outline",onClick:async()=>{if(0!==e.length)try{d(!0);const a=await Promise.all(e.map((async e=>{try{const r=await be(e.symbol);return r&&0!==Object.keys(r).length?{symbol:r["01. symbol"]||e.symbol,price:parseFloat(r["05. price"])||e.price,change:parseFloat(r["09. change"])||e.change,changePercent:parseFloat(r["10. change percent"].replace("%",""))||e.changePercent,volume:parseInt(r["06. volume"])||e.volume,lastUpdated:r["07. latest trading day"]||(new Date).toISOString().split("T")[0]}:e}catch(r){return console.error(`Error al actualizar ${e.symbol}:`,r),e}})));r(a),(0,je.Te)("Datos actualizados correctamente")}catch(a){console.error("Error al actualizar datos:",a),(0,je.Qg)(`Error al actualizar datos: ${a.message}`)}finally{d(!1)}},disabled:l||0===e.length,children:[(0,c.jsx)(i.jTZ,{})," Actualizar"]})]}),(0,c.jsxs)(Ie,{onSubmit:async a=>{if(a.preventDefault(),t.trim())if(e.some((e=>e.symbol===t.toUpperCase())))(0,je.Qg)(`El s\xedmbolo ${t.toUpperCase()} ya est\xe1 en la lista`);else try{o(!0);const e=await be(t);if(!e||0===Object.keys(e).length)return void(0,je.Qg)(`No se encontraron datos para el s\xedmbolo ${t}`);const a={symbol:e["01. symbol"]||t.toUpperCase(),price:parseFloat(e["05. price"])||0,change:parseFloat(e["09. change"])||0,changePercent:parseFloat(e["10. change percent"].replace("%",""))||0,volume:parseInt(e["06. volume"])||0,lastUpdated:e["07. latest trading day"]||(new Date).toISOString().split("T")[0]};r((e=>[...e,a])),s(""),(0,je.Te)(`S\xedmbolo ${a.symbol} agregado correctamente`)}catch(n){console.error("Error al agregar s\xedmbolo:",n),(0,je.Qg)(`Error al agregar s\xedmbolo: ${n.message}`)}finally{o(!1)}},children:[(0,c.jsx)(Fe,{type:"text",placeholder:"S\xedmbolo (ej. AAPL, MSFT)",value:t,onChange:e=>s(e.target.value.toUpperCase()),disabled:a}),(0,c.jsxs)(ye.A,{type:"submit",disabled:a||!t.trim(),children:[(0,c.jsx)(i.GGD,{})," Agregar"]})]}),a?(0,c.jsx)(fe.A,{text:"Cargando datos..."}):(0,c.jsx)(c.Fragment,{children:e.length>0?(0,c.jsx)(Se,{children:e.map((e=>{return(0,c.jsxs)(Ee,{children:[(0,c.jsx)($e,{onClick:()=>{return a=e.symbol,r((e=>e.filter((e=>e.symbol!==a)))),void(0,je.Te)(`S\xedmbolo ${a} eliminado correctamente`);var a},children:(0,c.jsx)(i.IXo,{})}),(0,c.jsx)(ze,{children:e.symbol}),(0,c.jsx)(_e,{children:p(e.price)}),(0,c.jsxs)(Ce,{positive:e.change>=0,children:[e.change>=0?(0,c.jsx)(i.ei4,{}):(0,c.jsx)(i.LPr,{}),p(Math.abs(e.change))," (",(a=e.changePercent,new Intl.NumberFormat("es-AR",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(a/100)),")"]}),(0,c.jsxs)(De,{children:[(0,c.jsxs)(qe,{children:[(0,c.jsx)("span",{children:"Volumen:"}),(0,c.jsx)("span",{children:e.volume.toLocaleString()})]}),(0,c.jsxs)(qe,{children:[(0,c.jsx)("span",{children:"\xdaltima actualizaci\xf3n:"}),(0,c.jsx)("span",{children:e.lastUpdated})]})]})]},e.symbol);var a}))}):(0,c.jsxs)(Pe,{children:[(0,c.jsx)("p",{children:"No hay acciones en seguimiento"}),(0,c.jsx)("p",{children:"Agrega s\xedmbolos para comenzar a seguir sus cotizaciones"})]})})]})},Te=o.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,Ue=o.Ay.div`
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
`,Ne=o.Ay.h2`
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
`,Me=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Le=o.Ay.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,Oe=o.Ay.div`
  height: 180px;
  background-image: url(${e=>e.src||"https://via.placeholder.com/300x180?text=No+Image"});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`,Be=o.Ay.div`
  padding: 16px;
`,Ge=o.Ay.h3`
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-dark);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,Qe=o.Ay.div`
  font-size: 0.8rem;
  color: var(--text-medium);
  margin-bottom: 8px;
`,Ye=o.Ay.p`
  margin: 0 0 16px 0;
  font-size: 0.9rem;
  color: var(--text-medium);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`,Je=o.Ay.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`,He=o.Ay.div`
  font-size: 0.8rem;
  color: var(--text-light);
  margin-top: 8px;
`,We=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,Xe=o.Ay.input`
  padding: 8px 12px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.9rem;
  flex: 1;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.2);
  }
`,Ve=()=>{const[e,r]=(0,n.useState)([]),[a,o]=(0,n.useState)(!0),[t,s]=(0,n.useState)("finanzas argentina"),[l,d]=(0,n.useState)("finanzas argentina");(0,n.useEffect)((()=>{(async()=>{try{o(!0);const e=await async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"finance",r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5;try{try{const a=await fetch(`https://newsapi.org/v2/everything?q=${e}&language=es&pageSize=${r}&apiKey=demo`);if(!a.ok)throw new Error(`Error al obtener noticias: ${a.statusText}`);const n=await a.json();if("ok"===n.status&&n.articles&&n.articles.length>0)return n.articles;throw new Error("No se pudieron obtener noticias reales")}catch(a){console.warn("Usando noticias simuladas debido a un error en la API:",a);const n=new Date,o=[];let i="finanzas";e.includes("crypto")||e.includes("bitcoin")?i="criptomonedas":e.includes("bolsa")||e.includes("acciones")?i="bolsa":(e.includes("dolar")||e.includes("peso"))&&(i="divisas");const t=[`\xdaltimas tendencias en ${i} para este a\xf1o`,`Expertos analizan el futuro de ${i} en Argentina`,`C\xf3mo invertir en ${i} de manera segura`,`Los mejores consejos para gestionar tus ${i} personales`,`El impacto de la econom\xeda global en ${i} locales`,`Nuevas regulaciones afectan el mercado de ${i}`];for(let e=0;e<Math.min(r,t.length);e++){const r=new Date(n);r.setDate(r.getDate()-e),o.push({source:{id:"mock-source",name:"Noticias Financieras Simuladas"},author:"Equipo Editorial",title:t[e],description:`Este es un art\xedculo simulado sobre ${i}. La informaci\xf3n real no est\xe1 disponible en este momento debido a limitaciones de la API.`,url:"https://example.com/financial-news",urlToImage:`https://via.placeholder.com/600x400?text=Noticias+de+${i.replace(/\s/g,"+")}`,publishedAt:r.toISOString(),content:`Contenido simulado sobre ${i}. Este art\xedculo es generado autom\xe1ticamente para proporcionar una experiencia de usuario continua cuando la API de noticias no est\xe1 disponible.`})}return o}}catch(n){throw console.error("Error en getFinancialNews:",n),n}}(t,6);r(e)}catch(e){console.error("Error al cargar noticias:",e),(0,je.Qg)("Error al cargar noticias financieras")}finally{o(!1)}})()}),[t]);const p=e=>{e.preventDefault(),s(l)};return(0,c.jsxs)(Te,{children:[(0,c.jsxs)(Ue,{children:[(0,c.jsx)(Ne,{children:"Noticias Financieras"}),(0,c.jsxs)(ye.A,{variant:"outline",onClick:()=>s(l),disabled:a,children:[(0,c.jsx)(i.jTZ,{})," Actualizar"]})]}),(0,c.jsxs)(We,{children:[(0,c.jsx)(Xe,{type:"text",placeholder:"Buscar noticias...",value:l,onChange:e=>d(e.target.value),onKeyPress:e=>"Enter"===e.key&&p(e)}),(0,c.jsx)(ye.A,{onClick:p,disabled:a,children:"Buscar"})]}),a?(0,c.jsx)(fe.A,{text:"Cargando noticias..."}):(0,c.jsx)(Me,{children:e.length>0?e.map(((e,r)=>{return(0,c.jsxs)(Le,{children:[(0,c.jsx)(Oe,{src:e.urlToImage}),(0,c.jsxs)(Be,{children:[(0,c.jsx)(Ge,{children:e.title}),(0,c.jsx)(Qe,{children:e.source.name}),(0,c.jsx)(Ye,{children:e.description}),(0,c.jsxs)(Je,{href:e.url,target:"_blank",rel:"noopener noreferrer",children:["Leer m\xe1s ",(0,c.jsx)(i.HaR,{})]}),(0,c.jsx)(He,{children:(a=e.publishedAt,new Date(a).toLocaleDateString("es-AR",{year:"numeric",month:"short",day:"numeric"}))})]})]},r);var a})):(0,c.jsxs)("div",{children:['No se encontraron noticias para "',t,'"']})})]})},Ze=o.Ay.div`
  display: flex;
  margin-bottom: 16px;
  flex-direction: ${e=>e.isUser?"row-reverse":"row"};
`,Ke=o.Ay.div`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  background-color: ${e=>e.isUser?"var(--primary-color)":"var(--card-bg)"};
  color: ${e=>e.isUser?"white":"var(--text-dark)"};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    ${e=>e.isUser?"border-width: 8px 0 8px 8px; border-color: transparent transparent transparent var(--primary-color); right: -8px;":"border-width: 8px 8px 8px 0; border-color: transparent var(--card-bg) transparent transparent; left: -8px;"}
    top: 12px;
  }
`,er=o.Ay.div`
  font-size: 0.95rem;
  line-height: 1.5;
  
  p {
    margin: 0 0 8px 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  a {
    color: ${e=>e.isUser?"white":"var(--primary-color)"};
    text-decoration: underline;
    
    &:hover {
      text-decoration: none;
    }
  }
  
  code {
    background-color: ${e=>e.isUser?"rgba(255, 255, 255, 0.2)":"rgba(0, 0, 0, 0.05)"};
    padding: 2px 4px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
  }
  
  ul, ol {
    margin: 8px 0;
    padding-left: 20px;
  }
  
  strong {
    font-weight: 600;
  }
`,rr=o.Ay.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${e=>e.isUser?"var(--primary-light)":"var(--secondary-light)"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${e=>e.isUser?"0 0 0 12px":"0 12px 0 0"};
  color: white;
  font-size: 1.2rem;
`,ar=o.Ay.div`
  font-size: 0.7rem;
  color: ${e=>e.isUser?"rgba(255, 255, 255, 0.7)":"var(--text-light)"};
  margin-top: 4px;
  text-align: ${e=>e.isUser?"right":"left"};
`,nr=e=>{let{message:r,isUser:a}=e;return(0,c.jsxs)(Ze,{isUser:a,children:[(0,c.jsx)(rr,{isUser:a,children:a?(0,c.jsx)(i.JXP,{}):(0,c.jsx)(i.mEP,{})}),(0,c.jsxs)("div",{children:[(0,c.jsx)(Ke,{isUser:a,children:(0,c.jsx)(er,{isUser:a,children:(o=r.content,o.split("\\n").map(((e,r)=>(0,c.jsx)("p",{children:e},r))))})}),(0,c.jsx)(ar,{isUser:a,children:(n=r.timestamp,new Date(n).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))})]})]});var n,o},or=o.Ay.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: var(--bg-light);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0 0 var(--border-radius) var(--border-radius);
`,ir=o.Ay.input`
  flex: 1;
  padding: 12px 16px;
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
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
  }
  
  &::placeholder {
    color: var(--text-light);
  }
`,tr=o.Ay.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  cursor: pointer;
  transition: all var(--transition-speed);
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);
  
  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
  }
  
  &:disabled {
    background-color: var(--text-light);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`,sr=o.Ay.button`
  background-color: var(--bg-medium);
  color: var(--text-medium);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  cursor: pointer;
  transition: all var(--transition-speed);
  
  &:hover {
    background-color: var(--bg-dark);
    color: var(--text-dark);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: rotate(180deg);
  }
`,cr=e=>{let{onSendMessage:r,onRefreshPrices:a,isRefreshing:o}=e;const[t,s]=(0,n.useState)("");return(0,c.jsxs)(or,{children:[(0,c.jsxs)("form",{onSubmit:e=>{e.preventDefault(),t.trim()&&(r(t),s(""))},style:{display:"flex",width:"100%"},children:[(0,c.jsx)(ir,{type:"text",placeholder:"Pregunta sobre inversiones o finanzas...",value:t,onChange:e=>s(e.target.value)}),(0,c.jsx)(tr,{type:"submit",disabled:!t.trim(),children:(0,c.jsx)(i.kGk,{})})]}),(0,c.jsx)(sr,{onClick:a,disabled:o,title:"Actualizar precios",children:(0,c.jsx)(i.jTZ,{style:{animation:o?"spin 1s linear infinite":"none"}})})]})},lr={commonQuestions:{hola:"Hola, soy tu asistente financiero. \xbfEn qu\xe9 puedo ayudarte hoy?",ayuda:'Puedo ayudarte con consejos sobre inversiones, finanzas personales, ahorro, y m\xe1s. Intenta preguntarme algo espec\xedfico como "\xbfC\xf3mo diversificar mi cartera?" o "\xbfQu\xe9 es un ETF?"',gracias:"De nada. Estoy aqu\xed para ayudarte con tus consultas financieras.",adios:"Hasta luego. Si tienes m\xe1s preguntas sobre finanzas o inversiones, no dudes en volver a consultarme.",chau:"Hasta pronto. Recuerda revisar regularmente tus inversiones y ajustar tu estrategia seg\xfan sea necesario."},investmentAdvice:["Diversifica tu cartera para reducir el riesgo. No pongas todos tus huevos en la misma canasta.","Invierte a largo plazo. El mercado puede ser vol\xe1til a corto plazo, pero hist\xf3ricamente tiende a subir a largo plazo.","Considera tu tolerancia al riesgo al elegir inversiones. Las inversiones m\xe1s arriesgadas pueden ofrecer mayores rendimientos, pero tambi\xe9n mayores p\xe9rdidas potenciales.","Reinvierte tus dividendos para aprovechar el inter\xe9s compuesto.","Mant\xe9n un fondo de emergencia antes de comenzar a invertir en activos de mayor riesgo.","Investiga bien antes de invertir. Comprende en qu\xe9 est\xe1s invirtiendo y por qu\xe9.","Considera los costos de transacci\xf3n y las comisiones, ya que pueden reducir significativamente tus rendimientos.","Revisa y reequilibra tu cartera peri\xf3dicamente para mantener tu asignaci\xf3n de activos deseada.","No intentes cronometrar el mercado. Es muy dif\xedcil predecir los movimientos a corto plazo.","Considera invertir regularmente (dollar-cost averaging) para reducir el impacto de la volatilidad del mercado."],personalFinanceAdvice:["Crea y sigue un presupuesto para controlar tus gastos y maximizar tus ahorros.","Establece metas financieras claras y espec\xedficas, tanto a corto como a largo plazo.","Reduce y elimina deudas de alto inter\xe9s lo antes posible.","Ahorra al menos el 20% de tus ingresos para metas a largo plazo como la jubilaci\xf3n.","Mant\xe9n un fondo de emergencia que cubra de 3 a 6 meses de gastos.","Automatiza tus ahorros e inversiones para mantener la disciplina financiera.","Revisa regularmente tus gastos para identificar \xe1reas donde puedes reducir.","Considera diversificar tus fuentes de ingresos para aumentar tu estabilidad financiera.","Ed\xfacate continuamente sobre finanzas personales y estrategias de inversi\xf3n.","Planifica para grandes gastos futuros como educaci\xf3n, vivienda o jubilaci\xf3n."],specificAdvice:{stocks:["Las acciones ofrecen potencial de crecimiento a largo plazo, pero vienen con mayor volatilidad.","Considera invertir en empresas con fundamentos s\xf3lidos, buen historial de crecimiento y ventajas competitivas.","Los dividendos pueden proporcionar ingresos regulares adem\xe1s de la apreciaci\xf3n del capital.","Las acciones de valor tienden a ser m\xe1s estables, mientras que las de crecimiento ofrecen mayor potencial de apreciaci\xf3n pero con m\xe1s riesgo.","Diversifica entre diferentes sectores e industrias para reducir el riesgo espec\xedfico de cada empresa."],bonds:["Los bonos generalmente ofrecen menor rendimiento pero tambi\xe9n menor riesgo que las acciones.","La duraci\xf3n del bono afecta su sensibilidad a los cambios en las tasas de inter\xe9s.","Los bonos gubernamentales suelen ser m\xe1s seguros, mientras que los corporativos ofrecen mayores rendimientos con mayor riesgo.","Considera la calificaci\xf3n crediticia del emisor al evaluar el riesgo de un bono.","En entornos de tasas de inter\xe9s crecientes, los bonos de corto plazo suelen tener mejor desempe\xf1o."],crypto:["Las criptomonedas son inversiones de alto riesgo y alta volatilidad.","Solo invierte en criptomonedas el dinero que est\xe9s dispuesto a perder.","Diversifica entre diferentes criptomonedas para reducir el riesgo.","Mant\xe9n tus criptomonedas en billeteras seguras y considera opciones de almacenamiento en fr\xedo para mayor seguridad.","Mantente informado sobre desarrollos regulatorios que puedan afectar el mercado de criptomonedas."],etfs:["Los ETFs ofrecen diversificaci\xf3n instant\xe1nea a un costo relativamente bajo.","Considera los ETFs de \xedndice para una estrategia pasiva de bajo costo.","Revisa la composici\xf3n y metodolog\xeda del ETF antes de invertir.","Presta atenci\xf3n al ratio de gastos, ya que afecta directamente tu rendimiento.","Los ETFs tem\xe1ticos pueden ofrecer exposici\xf3n a sectores espec\xedficos o tendencias emergentes."],funds:["Los fondos mutuos ofrecen gesti\xf3n profesional y diversificaci\xf3n.","Compara el rendimiento del fondo con su benchmark para evaluar su desempe\xf1o.","Considera los fondos de \xedndice para una estrategia pasiva de bajo costo.","Presta atenci\xf3n a las comisiones y gastos, ya que pueden reducir significativamente tus rendimientos.","Revisa la filosof\xeda de inversi\xf3n y el historial del gestor del fondo."]},financialTerms:{"qu\xe9 es un etf":"Un ETF (Exchange-Traded Fund) es un fondo que cotiza en bolsa y sigue el rendimiento de un \xedndice, sector, materia prima o activo espec\xedfico. Los ETFs combinan la diversificaci\xf3n de los fondos mutuos con la flexibilidad de negociaci\xf3n de las acciones.","qu\xe9 es la diversificaci\xf3n":"La diversificaci\xf3n es una estrategia que consiste en distribuir tus inversiones entre diferentes tipos de activos, sectores e instrumentos para reducir el riesgo. La idea es que si una inversi\xf3n tiene un mal desempe\xf1o, otras pueden compensar esas p\xe9rdidas.","qu\xe9 es el inter\xe9s compuesto":"El inter\xe9s compuesto es el proceso por el cual el inter\xe9s se suma al capital inicial, generando a su vez m\xe1s inter\xe9s sobre el nuevo monto total. Es como 'inter\xe9s sobre inter\xe9s' y es una de las fuerzas m\xe1s poderosas en las finanzas.","qu\xe9 es la inflaci\xf3n":"La inflaci\xf3n es el aumento generalizado y sostenido de los precios de bienes y servicios en una econom\xeda durante un per\xedodo de tiempo. Reduce el poder adquisitivo del dinero, por lo que es importante que tus inversiones superen la tasa de inflaci\xf3n.","qu\xe9 es un cedear":"Un CEDEAR (Certificado de Dep\xf3sito Argentino) es un certificado que representa acciones de empresas extranjeras y cotiza en la bolsa argentina. Permite a los inversores argentinos acceder a acciones internacionales en pesos argentinos.","qu\xe9 es el dca":"DCA (Dollar-Cost Averaging) o Promediaci\xf3n de Costos es una estrategia de inversi\xf3n que consiste en invertir cantidades fijas de dinero a intervalos regulares, independientemente del precio del activo. Esto reduce el impacto de la volatilidad y elimina la necesidad de cronometrar el mercado.","qu\xe9 es un plazo fijo":"Un plazo fijo es un instrumento financiero que consiste en depositar dinero en una entidad financiera por un per\xedodo determinado a cambio de una tasa de inter\xe9s fija. Al finalizar el plazo, recibes tu capital m\xe1s los intereses generados.","qu\xe9 es el riesgo":"En finanzas, el riesgo es la posibilidad de que el rendimiento real de una inversi\xf3n sea diferente al esperado, especialmente la posibilidad de perder parte o la totalidad del capital invertido. Generalmente, a mayor riesgo, mayor rendimiento potencial.","qu\xe9 es un bono":"Un bono es un instrumento de deuda emitido por gobiernos, municipalidades o empresas para financiar proyectos o actividades. Al comprar un bono, est\xe1s prestando dinero al emisor a cambio de pagos peri\xf3dicos de inter\xe9s y la devoluci\xf3n del principal al vencimiento.","qu\xe9 es el rendimiento":"El rendimiento es la ganancia o p\xe9rdida total de una inversi\xf3n durante un per\xedodo espec\xedfico, expresada como porcentaje del costo inicial. Incluye tanto los ingresos (dividendos, intereses) como la apreciaci\xf3n o depreciaci\xf3n del capital."},generateResponse:(e,r)=>{const a=e.toLowerCase();for(const[n,o]of Object.entries(lr.commonQuestions))if(a.includes(n))return o;for(const[n,o]of Object.entries(lr.financialTerms))if(a.includes(n))return o;if(a.includes("accion")||a.includes("stock"))return lr.specificAdvice.stocks[Math.floor(Math.random()*lr.specificAdvice.stocks.length)];if(a.includes("bono"))return lr.specificAdvice.bonds[Math.floor(Math.random()*lr.specificAdvice.bonds.length)];if(a.includes("cripto")||a.includes("bitcoin")||a.includes("ethereum"))return lr.specificAdvice.crypto[Math.floor(Math.random()*lr.specificAdvice.crypto.length)];if(a.includes("etf"))return lr.specificAdvice.etfs[Math.floor(Math.random()*lr.specificAdvice.etfs.length)];if(a.includes("fondo")||a.includes("mutual"))return lr.specificAdvice.funds[Math.floor(Math.random()*lr.specificAdvice.funds.length)];if(a.includes("consejo")||a.includes("recomend")||a.includes("suger"))return a.includes("inver")?lr.investmentAdvice[Math.floor(Math.random()*lr.investmentAdvice.length)]:lr.personalFinanceAdvice[Math.floor(Math.random()*lr.personalFinanceAdvice.length)];if(a.includes("mi")&&(a.includes("inver")||a.includes("cartera"))){if(r&&r.length>0){const e=r.reduce(((e,r)=>e+r.quantity*r.current_price),0),a=r.filter((e=>"stock"===e.type)).reduce(((e,r)=>e+r.quantity*r.current_price),0),n=r.filter((e=>"crypto"===e.type)).reduce(((e,r)=>e+r.quantity*r.current_price),0),o=r.filter((e=>"bond"===e.type)).reduce(((e,r)=>e+r.quantity*r.current_price),0),i=r.filter((e=>"etf"===e.type)).reduce(((e,r)=>e+r.quantity*r.current_price),0),t=e>0?(a/e*100).toFixed(1):0,s=e>0?(n/e*100).toFixed(1):0,c=e>0?(o/e*100).toFixed(1):0;let l="Basado en tu cartera actual, tienes aproximadamente:\n";return l+=`- ${t}% en acciones\n`,l+=`- ${s}% en criptomonedas\n`,l+=`- ${c}% en bonos\n`,l+=`- ${e>0?(i/e*100).toFixed(1):0}% en ETFs\n\n`,l+=s>20?`Tu exposici\xf3n a criptomonedas es relativamente alta (${s}%). Considera si esto se alinea con tu tolerancia al riesgo, ya que las criptomonedas son muy vol\xe1tiles.`:t+s>80&&c<10?`Tu cartera est\xe1 muy orientada al crecimiento con ${t+s}% en activos de renta variable. Considera a\xf1adir m\xe1s bonos para equilibrar el riesgo, especialmente si est\xe1s cerca de necesitar estos fondos.`:c>70?`Tu cartera es bastante conservadora con ${c}% en bonos. Si tu horizonte de inversi\xf3n es largo, podr\xedas considerar aumentar tu exposici\xf3n a acciones para potenciar el crecimiento.`:"Tu cartera parece estar razonablemente diversificada entre diferentes clases de activos. Recuerda revisar y reequilibrar peri\xf3dicamente para mantener tu asignaci\xf3n de activos deseada.",l}return"No veo inversiones en tu cartera actualmente. \xbfTe gustar\xeda que te d\xe9 algunos consejos para comenzar a invertir?"}return a.includes("precio")||a.includes("mercado")||a.includes("valor")?"Los mercados financieros son impredecibles a corto plazo. En lugar de intentar predecir movimientos de precios, considera enfocarte en los fundamentos de tus inversiones y en tu estrategia a largo plazo. Recuerda que puedes actualizar los precios de tus inversiones haciendo clic en el bot\xf3n de actualizaci\xf3n.":"Esa es una buena pregunta. Como asistente financiero, puedo ayudarte con consejos sobre inversiones, explicaciones de t\xe9rminos financieros, y an\xe1lisis b\xe1sico de tu cartera. \xbfPodr\xedas reformular tu pregunta o ser m\xe1s espec\xedfico sobre qu\xe9 informaci\xf3n buscas?"},getRandomAdvice:()=>{const e=[...lr.investmentAdvice,...lr.personalFinanceAdvice,...lr.specificAdvice.stocks,...lr.specificAdvice.bonds,...lr.specificAdvice.crypto,...lr.specificAdvice.etfs,...lr.specificAdvice.funds];return e[Math.floor(Math.random()*e.length)]}},dr=lr,pr=async e=>{try{return await Promise.all(e.map((async e=>{let r;switch(e.type){case"crypto":r=await(async e=>{try{await new Promise((e=>setTimeout(e,700)));const r={BTC:35e3,ETH:2200,SOL:120,ADA:.5,DOT:7,MATIC:1.2,XRP:.6,DOGE:.08,SHIB:1e-5,AVAX:30}[e]||e.split("").reduce(((e,r)=>e+r.charCodeAt(0)),0)%100,a=(16*Math.random()-8)/100;return{symbol:e,price:parseFloat((r*(1+a)).toFixed("SHIB"===e?8:2)),currency:"USD",timestamp:(new Date).toISOString()}}catch(r){return console.error("Error fetching crypto price:",r),null}})(e.symbol);break;case"bond":r=await(async e=>{try{await new Promise((e=>setTimeout(e,600)));const r=e.split("").reduce(((e,r)=>e+r.charCodeAt(0)),0)%30/100+.7,a=(4*Math.random()-2)/100;return{symbol:e,price:parseFloat((r*(1+a)).toFixed(3)),currency:e.includes("US")?"USD":"ARS",timestamp:(new Date).toISOString()}}catch(r){return console.error("Error fetching bond price:",r),null}})(e.symbol);break;default:r=await(async e=>{try{await new Promise((e=>setTimeout(e,500)));const r=e.split("").reduce(((e,r)=>e+r.charCodeAt(0)),0)%1e3,a=(10*Math.random()-5)/100;return{symbol:e,price:parseFloat((r*(1+a)).toFixed(2)),currency:e.includes("BTC")||e.includes("ETH")?"USD":"ARS",timestamp:(new Date).toISOString()}}catch(r){return console.error("Error fetching stock price:",r),null}})(e.symbol)}return r?{...e,current_price:r.price}:e})))}catch(r){return console.error("Error updating all prices:",r),e}},ur=o.Ay.div`
  position: fixed;
  bottom: ${e=>(e.isOpen,"0")};
  right: 20px;
  width: 360px;
  max-width: calc(100vw - 40px);
  height: ${e=>e.isOpen?"500px":"60px"};
  background-color: var(--bg-light);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 768px) {
    right: 10px;
    width: calc(100vw - 20px);
    height: ${e=>e.isOpen?"400px":"60px"};
  }
`,mr=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
`,gr=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;

  svg {
    font-size: 1.2rem;
  }
`,xr=o.Ay.div`
  display: flex;
  gap: 8px;
`,hr=o.Ay.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`,vr=o.Ay.div`
  text-align: center;
  margin: 20px 0;
  color: var(--text-medium);
  font-size: 0.9rem;

  h3 {
    margin-bottom: 8px;
    color: var(--text-dark);
  }

  p {
    margin-bottom: 16px;
  }
`,br=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`,fr=o.Ay.button`
  background-color: var(--bg-medium);
  border: none;
  padding: 8px 12px;
  border-radius: var(--border-radius);
  text-align: left;
  font-size: 0.9rem;
  color: var(--text-dark);
  cursor: pointer;
  transition: all var(--transition-speed);

  &:hover {
    background-color: var(--bg-dark);
  }
`,yr=e=>{let{investments:r}=e;const[a,o]=(0,n.useState)(!1),[t,s]=(0,n.useState)([]),[l,d]=(0,n.useState)(!1),p=(0,n.useRef)(null);(0,n.useEffect)((()=>{p.current&&p.current.scrollIntoView({behavior:"smooth"})}),[t]),(0,n.useEffect)((()=>{if(a&&0===t.length){const e={id:Date.now(),content:"Hola, soy tu asistente financiero. Puedo ayudarte con consejos sobre inversiones, finanzas personales y responder tus preguntas sobre t\xe9rminos financieros. \xbfEn qu\xe9 puedo ayudarte hoy?",timestamp:(new Date).toISOString(),isUser:!1};s([e])}}),[a,t.length]);const u=e=>{const a={id:Date.now(),content:e,timestamp:(new Date).toISOString(),isUser:!0};s((e=>[...e,a])),setTimeout((()=>{const a={id:Date.now()+1,content:dr.generateResponse(e,r),timestamp:(new Date).toISOString(),isUser:!1};s((e=>[...e,a]))}),500)};return(0,c.jsxs)(ur,{isOpen:a,children:[(0,c.jsxs)(mr,{onClick:()=>o(!a),children:[(0,c.jsxs)(gr,{children:[(0,c.jsx)(i.mEP,{}),"Asistente Financiero"]}),(0,c.jsx)(xr,{children:a?(0,c.jsx)(i.fK4,{}):(0,c.jsx)(i.wAb,{})})]}),a&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(hr,{children:[t.map((e=>(0,c.jsx)(nr,{message:e,isUser:e.isUser},e.id))),0===t.length&&(0,c.jsxs)(vr,{children:[(0,c.jsx)("h3",{children:"Bienvenido al Asistente Financiero"}),(0,c.jsx)("p",{children:"Puedo ayudarte con consejos sobre inversiones, finanzas personales y responder tus preguntas sobre t\xe9rminos financieros."}),(0,c.jsx)(br,{children:["\xbfQu\xe9 es un ETF?","\xbfC\xf3mo diversificar mi cartera?","\xbfQu\xe9 opinas de mis inversiones actuales?","Dame un consejo sobre inversiones","\xbfQu\xe9 es el inter\xe9s compuesto?"].map(((e,r)=>(0,c.jsx)(fr,{onClick:()=>u(e),children:e},r)))})]}),(0,c.jsx)("div",{ref:p})]}),(0,c.jsx)(cr,{onSendMessage:u,onRefreshPrices:async()=>{if(r&&0!==r.length&&!l){d(!0);try{const e={id:Date.now(),content:"Actualizando precios de tus inversiones...",timestamp:(new Date).toISOString(),isUser:!1};s((r=>[...r,e]));const a=await pr(r);await(async e=>{try{return console.log("Saving updated prices to database:",e),e}catch(r){return console.error("Error saving price updates:",r),e}})(a);const n=a.map((e=>{const a=r.find((r=>r.id===e.id));if(!a)return null;const n=e.current_price-a.current_price,o=n/a.current_price*100;return{name:e.name,symbol:e.symbol,oldPrice:a.current_price,newPrice:e.current_price,priceDiff:n,percentChange:o,currency:e.currency||"ARS"}})).filter(Boolean);let o="Precios actualizados:\\n\\n";0===n.length?o+="No se encontraron cambios en los precios.":n.forEach((e=>{const r=e.priceDiff>=0?"\u2191":"\u2193",a=new Intl.NumberFormat("es-AR",{style:"currency",currency:e.currency}).format(e.newPrice),n=new Intl.NumberFormat("es-AR",{style:"percent",minimumFractionDigits:2,maximumFractionDigits:2}).format(Math.abs(e.percentChange)/100);o+=`${e.name} (${e.symbol}): ${a} ${r} ${n}\\n`}));const i={id:Date.now()+1,content:o,timestamp:(new Date).toISOString(),isUser:!1};s((e=>[...e,i]))}catch(e){console.error("Error refreshing prices:",e);const r={id:Date.now()+1,content:"Lo siento, hubo un error al actualizar los precios. Por favor, intenta de nuevo m\xe1s tarde.",timestamp:(new Date).toISOString(),isUser:!1};s((e=>[...e,r]))}finally{d(!1)}}},isRefreshing:l})]})]})};var jr=a(8090);const wr=o.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,Ar=o.Ay.div`
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
`,kr=o.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,Sr=o.Ay.div`
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
`,Er=o.Ay.h2`
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
`,zr=(o.Ay.button`
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
`,()=>{const[e,r]=(0,n.useState)([]),[a,o]=(0,n.useState)(!1),[t,s]=(0,n.useState)(null),[l,d]=(0,n.useState)({search:"",type:"all",currency:"all",performance:"all",sort:"name_asc"}),[p,u]=(0,n.useState)([]),[m,g]=(0,n.useState)(!0);(0,n.useEffect)((()=>{(()=>{try{g(!0);const e=(0,jr.getInvestments)();console.log("Inversiones cargadas desde el almacenamiento local:",e),r(e||[])}catch(e){console.error("Error al cargar inversiones:",e)}finally{g(!1)}})();const e=e=>{const{detail:a}=e;if(a.success&&a.stores&&a.stores.includes("investments")){console.log("Datos de inversiones sincronizados, recargando...");const e=(0,jr.getInvestments)();e&&e.length>0&&(console.log("Inversiones actualizadas desde sincronizaci\xf3n:",e.length),r(e),(0,je.cf)("Inversiones actualizadas"))}};return window.addEventListener("data-synced",e),()=>{window.removeEventListener("data-synced",e)}}),[]),(0,n.useEffect)((()=>{let r=[...e];if(l.search){const e=l.search.toLowerCase();r=r.filter((r=>r.name.toLowerCase().includes(e)||r.symbol.toLowerCase().includes(e)))}"all"!==l.type&&(r=r.filter((e=>e.type===l.type))),"all"!==l.currency&&(r=r.filter((e=>(e.currency||"ARS")===l.currency))),"all"!==l.performance&&(r=r.filter((e=>{const r=e.current_price-e.purchase_price;return"positive"===l.performance?r>=0:r<0}))),r.sort(((e,r)=>{switch(l.sort){case"name_desc":return r.name.localeCompare(e.name);case"value_desc":return r.current_price*r.quantity-e.current_price*e.quantity;case"value_asc":return e.current_price*e.quantity-r.current_price*r.quantity;case"performance_desc":{const a=(e.current_price-e.purchase_price)/e.purchase_price*100;return(r.current_price-r.purchase_price)/r.purchase_price*100-a}case"performance_asc":return(e.current_price-e.purchase_price)/e.purchase_price*100-(r.current_price-r.purchase_price)/r.purchase_price*100;case"date_desc":return new Date(r.purchase_date)-new Date(e.purchase_date);case"date_asc":return new Date(e.purchase_date)-new Date(r.purchase_date);default:return e.name.localeCompare(r.name)}})),u(r)}),[e,l]);return(0,c.jsxs)(wr,{children:[(0,c.jsxs)(Ar,{children:[(0,c.jsx)("h1",{children:"Inversiones"}),(0,c.jsx)("p",{children:"Gestiona tu cartera de inversiones"})]}),(0,c.jsx)(w,{investments:e,exchangeRate:1.1}),(0,c.jsxs)(kr,{children:[(0,c.jsxs)(Sr,{children:[(0,c.jsx)(Er,{children:"Mi Cartera"}),(0,c.jsxs)(ye.A,{variant:a?"outline":"primary",onClick:()=>{s(null),o(!a)},children:[(0,c.jsx)(i.GGD,{}),a?"Cancelar":"Nueva Inversi\xf3n"]})]}),a&&(0,c.jsx)(te,{investment:t,onSubmit:e=>{try{if(t){const a=(0,jr.J0)(e.id,e);a?(console.log("Inversi\xf3n actualizada correctamente:",a),r((r=>r.map((r=>r.id===e.id?e:r)))),s(null)):(console.error("No se pudo actualizar la inversi\xf3n"),alert("No se pudo actualizar la inversi\xf3n. Por favor, intenta de nuevo."))}else{const a={...e,id:e.id||`inv_${Date.now()}_${Math.random().toString(36).substr(2,9)}`},n=(0,jr.DT)(a);n?(console.log("Inversi\xf3n agregada correctamente:",n),r((e=>[...e,n]))):(console.error("No se pudo agregar la inversi\xf3n"),alert("No se pudo agregar la inversi\xf3n. Por favor, intenta de nuevo."))}o(!1)}catch(a){console.error("Error al guardar la inversi\xf3n:",a),alert("Error al guardar la inversi\xf3n. Por favor, intenta de nuevo.")}},onCancel:()=>{o(!1),s(null)}}),(0,c.jsx)(he,{filters:l,onFilterChange:d}),(0,c.jsx)(Q,{investments:p,onEditInvestment:e=>{s(e),o(!0)},onDeleteInvestment:e=>{if(window.confirm("\xbfEst\xe1s seguro de que deseas eliminar esta inversi\xf3n?"))try{(0,jr.xn)(e)?(console.log("Inversi\xf3n eliminada correctamente"),r((r=>r.filter((r=>r.id!==e))))):(console.error("No se pudo eliminar la inversi\xf3n"),alert("No se pudo eliminar la inversi\xf3n. Por favor, intenta de nuevo."))}catch(a){console.error("Error al eliminar la inversi\xf3n:",a),alert("Error al eliminar la inversi\xf3n. Por favor, intenta de nuevo.")}}})]}),(0,c.jsx)(Re,{}),(0,c.jsx)(Ve,{}),(0,c.jsx)(yr,{investments:e})]})})},8090:(e,r,a)=>{a.d(r,{AF:()=>d,DT:()=>y,EP:()=>S,Hm:()=>v,J0:()=>j,SX:()=>$,UI:()=>z,Uw:()=>p,W2:()=>D,XZ:()=>g,_y:()=>E,getEvents:()=>C,getFinancialGoals:()=>k,getInvestments:()=>f,getTasks:()=>m,getTransactions:()=>c,lC:()=>x,qM:()=>q,saveEvents:()=>_,saveFinancialGoals:()=>A,saveInvestments:()=>b,saveTasks:()=>u,saveTransactions:()=>s,vq:()=>h,xn:()=>w,yY:()=>l});const n="mi_app_personal_simple_",o=(e,r)=>{try{const a=`${n}${e}`;return localStorage.setItem(a,JSON.stringify(r)),console.log(`Datos guardados en localStorage con clave ${e}:`,r),!0}catch(a){return console.error(`Error al guardar datos en localStorage con clave ${e}:`,a),!1}},i=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;try{const a=`${n}${e}`,o=localStorage.getItem(a);if(!o)return r;const i=JSON.parse(o);return console.log(`Datos recuperados de localStorage con clave ${e}:`,i),i}catch(a){return console.error(`Error al obtener datos de localStorage con clave ${e}:`,a),r}},t=()=>`local_${Date.now()}_${Math.random().toString(36).substr(2,9)}`,s=e=>o("transactions",e),c=()=>i("transactions",[]),l=e=>{try{const r={...e,id:e.id||t()},a=[r,...c()];return s(a),r}catch(r){return console.error("Error al agregar transacci\xf3n:",r),null}},d=(e,r)=>{try{const a=c(),n=a.findIndex((r=>r.id===e));if(-1===n)return console.error(`No se encontr\xf3 la transacci\xf3n con ID ${e}`),!1;const o=[...a];return o[n]={...o[n],...r},s(o),o[n]}catch(a){return console.error("Error al actualizar transacci\xf3n:",a),null}},p=e=>{try{const r=c(),a=r.filter((r=>r.id!==e));return a.length===r.length?(console.error(`No se encontr\xf3 la transacci\xf3n con ID ${e}`),!1):(s(a),!0)}catch(r){return console.error("Error al eliminar transacci\xf3n:",r),!1}},u=e=>o("tasks",e),m=()=>i("tasks",[]),g=e=>{try{const r={...e,id:e.id||t(),created_at:e.created_at||(new Date).toISOString().split("T")[0]},a=[...m(),r];return u(a),r}catch(r){return console.error("Error al agregar tarea:",r),null}},x=(e,r)=>{try{const a=m(),n=a.findIndex((r=>r.id===e));if(-1===n)return console.error(`No se encontr\xf3 la tarea con ID ${e}`),!1;const o=[...a];return o[n]={...o[n],...r},u(o),o[n]}catch(a){return console.error("Error al actualizar tarea:",a),null}},h=e=>{try{const r=m(),a=r.filter((r=>r.id!==e));return a.length===r.length?(console.error(`No se encontr\xf3 la tarea con ID ${e}`),!1):(u(a),!0)}catch(r){return console.error("Error al eliminar tarea:",r),!1}},v=e=>{try{const r=m(),a=r.findIndex((r=>r.id===e));if(-1===a)return console.error(`No se encontr\xf3 la tarea con ID ${e}`),!1;const n=[...r];return n[a]={...n[a],completed:!n[a].completed},u(n),n[a]}catch(r){return console.error("Error al cambiar estado de tarea:",r),null}},b=e=>o("investments",e),f=()=>i("investments",[]),y=e=>{try{const r={...e,id:e.id||t()},a=[...f(),r];return b(a),r}catch(r){return console.error("Error al agregar inversi\xf3n:",r),null}},j=(e,r)=>{try{const a=f(),n=a.findIndex((r=>r.id===e));if(-1===n)return console.error(`No se encontr\xf3 la inversi\xf3n con ID ${e}`),!1;const o=[...a];return o[n]={...o[n],...r},b(o),o[n]}catch(a){return console.error("Error al actualizar inversi\xf3n:",a),null}},w=e=>{try{const r=f(),a=r.filter((r=>r.id!==e));return a.length===r.length?(console.error(`No se encontr\xf3 la inversi\xf3n con ID ${e}`),!1):(b(a),!0)}catch(r){return console.error("Error al eliminar inversi\xf3n:",r),!1}},A=e=>o("financial_goals",e),k=()=>i("financial_goals",[]),S=e=>{try{const r={...e,id:e.id||t()},a=[...k(),r];return A(a),r}catch(r){return console.error("Error al agregar meta financiera:",r),null}},E=(e,r)=>{try{const a=k(),n=a.findIndex((r=>r.id===e));if(-1===n)return console.error(`No se encontr\xf3 la meta financiera con ID ${e}`),!1;const o=[...a];return o[n]={...o[n],...r},A(o),o[n]}catch(a){return console.error("Error al actualizar meta financiera:",a),null}},z=e=>{try{const r=k(),a=r.filter((r=>r.id!==e));return a.length===r.length?(console.error(`No se encontr\xf3 la meta financiera con ID ${e}`),!1):(A(a),!0)}catch(r){return console.error("Error al eliminar meta financiera:",r),!1}},_=e=>o("events",e),C=()=>i("events",[]),D=e=>{try{const r={...e,id:e.id||t()},a=[...C(),r];return _(a),r}catch(r){return console.error("Error al agregar evento:",r),null}},q=(e,r)=>{try{const a=C(),n=a.findIndex((r=>r.id===e));if(-1===n)return console.error(`No se encontr\xf3 el evento con ID ${e}`),!1;const o=[...a];return o[n]={...o[n],...r},_(o),o[n]}catch(a){return console.error("Error al actualizar evento:",a),null}},$=e=>{try{const r=C(),a=r.filter((r=>r.id!==e));return a.length===r.length?(console.error(`No se encontr\xf3 el evento con ID ${e}`),!1):(_(a),!0)}catch(r){return console.error("Error al eliminar evento:",r),!1}}},8670:(e,r,a)=>{a.d(r,{A:()=>s});a(5043);var n=a(5464),o=a(1547),i=a(579);const t=(0,n.Ay)(o.CS.button)`
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
  
  ${e=>"primary"===e.variant&&"\n    background-color: var(--primary-color);\n    color: white;\n    \n    &:hover:not(:disabled) {\n      background-color: var(--primary-color-dark);\n    }\n  "}
  
  ${e=>"secondary"===e.variant&&"\n    background-color: var(--secondary-color);\n    color: white;\n    \n    &:hover:not(:disabled) {\n      background-color: var(--secondary-color-dark);\n    }\n  "}
  
  ${e=>"danger"===e.variant&&"\n    background-color: var(--danger-color);\n    color: white;\n    \n    &:hover:not(:disabled) {\n      background-color: var(--danger-color-dark);\n    }\n  "}
  
  ${e=>"outline"===e.variant&&"\n    background-color: transparent;\n    color: var(--primary-color);\n    border: 1px solid var(--primary-color);\n    \n    &:hover:not(:disabled) {\n      background-color: rgba(var(--primary-color-rgb), 0.1);\n    }\n  "}
  
  ${e=>e.fullWidth&&"\n    width: 100%;\n  "}
`,s=e=>{let{variant:r="primary",fullWidth:a=!1,disabled:n=!1,onClick:s,children:c,...l}=e;const[d,p]=(0,o.zh)((()=>({scale:1,config:{tension:300,friction:10}})));return(0,i.jsx)(t,{variant:r,fullWidth:a,disabled:n,onClick:e=>{!n&&s&&p.start({scale:.95,onRest:()=>{p.start({scale:1}),s(e)}})},onMouseEnter:()=>{n||p.start({scale:1.05})},onMouseLeave:()=>{p.start({scale:1})},style:d,...l,children:c})}}}]);
//# sourceMappingURL=138.ddaacf8e.chunk.js.map