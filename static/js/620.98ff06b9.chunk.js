"use strict";(self.webpackChunkmi_app_personal=self.webpackChunkmi_app_personal||[]).push([[620],{1620:(e,r,a)=>{a.r(r),a.d(r,{default:()=>we});var t=a(5043),n=a(5464),o=a(5772),i=a(7304),s=a(6058),c=a(1301),l=a(5594),d=a(8670),p=a(6618),g=a(579);i.t1.register(i.PP,i.kc,i.FN,i.No,i.E8,i.Bs,i.pr,i.hE,i.m_,i.s$,i.dN);const u=n.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,m=n.Ay.div`
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
`,x=n.Ay.h2`
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
`,h=n.Ay.div`
  display: flex;
  gap: 8px;
  
  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 8px;
  }
`,y=n.Ay.div`
  height: 400px;
  position: relative;
  margin-top: 24px;
`,f=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`,v=n.Ay.div`
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
`,b=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 24px;
`,j=n.Ay.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  border-left: 4px solid ${e=>e.color||"var(--primary-color)"};
  
  h3 {
    margin: 0 0 8px 0;
    font-size: 1rem;
    color: var(--text-dark);
  }
  
  p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: ${e=>e.color||"var(--primary-color)"};
  }
  
  small {
    display: block;
    margin-top: 8px;
    font-size: 0.8rem;
    color: var(--text-medium);
  }
`,w={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"},tooltip:{mode:"index",intersect:!1}},scales:{y:{beginAtZero:!0}}},k=()=>{const[e,r]=(0,t.useState)([]),[a,n]=(0,t.useState)(!0),[i,k]=(0,t.useState)("line"),[A,$]=(0,t.useState)("month"),[_,E]=(0,t.useState)("all"),[D,C]=(0,t.useState)(""),[T,S]=(0,t.useState)("");(0,t.useEffect)((()=>{(async()=>{try{n(!0);const e=await(0,c.I0)();r(e)}catch(e){console.error("Error al cargar las transacciones:",e),(0,p.Qg)("Error al cargar los datos para el an\xe1lisis")}finally{n(!1)}})()}),[]);const z=(0,t.useMemo)((()=>{let r=[...e];return"all"!==_&&(r=r.filter((e=>e.category===_))),D&&(r=r.filter((e=>e.date>=D))),T&&(r=r.filter((e=>e.date<=T))),r}),[e,_,D,T]),F=(0,t.useMemo)((()=>{const r=new Set;return e.forEach((e=>{e.category&&r.add(e.category)})),Array.from(r)}),[e]),I=(0,t.useMemo)((()=>{const e={};z.forEach((r=>{const a=(e=>{const r=new Date(e);switch(A){case"day":default:return e;case"week":const a=new Date(r);return a.setDate(r.getDate()-r.getDay()),a.toISOString().split("T")[0];case"month":return`${r.getFullYear()}-${String(r.getMonth()+1).padStart(2,"0")}`;case"year":return`${r.getFullYear()}`}})(r.date);e[a]||(e[a]={income:0,expense:0}),"income"===r.type?e[a].income+=r.amount:"expense"===r.type&&(e[a].expense+=r.amount)}));const r=Object.keys(e).sort(),a=r.map((e=>{if("month"===A){const[r,a]=e.split("-");return`${a}/${r}`}return e})),t=r.map((r=>e[r].income)),n=r.map((r=>e[r].expense)),o=r.map((r=>e[r].income-e[r].expense)),s={};z.forEach((e=>{e.category&&(s[e.category]||(s[e.category]={income:0,expense:0}),"income"===e.type?s[e.category].income+=e.amount:"expense"===e.type&&(s[e.category].expense+=e.amount))}));const c=Object.keys(s),l=c.map((e=>s[e].income)),d=c.map((e=>s[e].expense)),p=(e=>{const r=[];for(let a=0;a<e;a++){const e=137*a%360;r.push(`hsla(${e}, 70%, 60%, 0.7)`)}return r})(c.length);return{timeSeries:{labels:a,datasets:[{label:"Ingresos",data:t,borderColor:"rgba(75, 192, 192, 0.6)",backgroundColor:"rgba(75, 192, 192, 0.2)",fill:"area"===i,tension:.4},{label:"Gastos",data:n,borderColor:"rgba(255, 99, 132, 0.6)",backgroundColor:"rgba(255, 99, 132, 0.2)",fill:"area"===i,tension:.4},{label:"Balance",data:o,borderColor:"rgba(153, 102, 255, 0.6)",backgroundColor:"rgba(153, 102, 255, 0.2)",fill:"area"===i,tension:.4}]},categoryIncome:{labels:c,datasets:[{label:"Ingresos por categor\xeda",data:l,backgroundColor:p,borderColor:p.map((e=>e.replace("0.7","1"))),borderWidth:1}]},categoryExpense:{labels:c,datasets:[{label:"Gastos por categor\xeda",data:d,backgroundColor:p,borderColor:p.map((e=>e.replace("0.7","1"))),borderWidth:1}]}}}),[z,A]),M=(0,t.useMemo)((()=>{if(0===z.length)return{totalIncome:0,totalExpense:0,balance:0,averageIncome:0,averageExpense:0,largestIncome:0,largestExpense:0};const e=z.filter((e=>"income"===e.type)),r=z.filter((e=>"expense"===e.type)),a=e.reduce(((e,r)=>e+r.amount),0),t=r.reduce(((e,r)=>e+r.amount),0);return{totalIncome:a,totalExpense:t,balance:a-t,averageIncome:e.length>0?a/e.length:0,averageExpense:r.length>0?t/r.length:0,largestIncome:e.length>0?Math.max(...e.map((e=>e.amount))):0,largestExpense:r.length>0?Math.max(...r.map((e=>e.amount))):0}}),[z]),R=e=>new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS"}).format(e);return(0,g.jsxs)(u,{children:[(0,g.jsxs)(m,{children:[(0,g.jsx)(x,{children:"An\xe1lisis Financiero"}),(0,g.jsxs)(h,{children:[(0,g.jsx)(d.A,{variant:"line"===i?"primary":"outline",onClick:()=>k("line"),title:"Gr\xe1fico de l\xednea",children:(0,g.jsx)(o.ARf,{})}),(0,g.jsx)(d.A,{variant:"bar"===i?"primary":"outline",onClick:()=>k("bar"),title:"Gr\xe1fico de barras",children:(0,g.jsx)(o.vQY,{})}),(0,g.jsx)(d.A,{variant:"area"===i?"primary":"outline",onClick:()=>k("area"),title:"Gr\xe1fico de \xe1rea",children:(0,g.jsx)(o.ARf,{})}),(0,g.jsx)(d.A,{variant:"pie-income"===i?"primary":"outline",onClick:()=>k("pie-income"),title:"Gr\xe1fico circular de ingresos",children:(0,g.jsx)(o.eXT,{})}),(0,g.jsx)(d.A,{variant:"pie-expense"===i?"primary":"outline",onClick:()=>k("pie-expense"),title:"Gr\xe1fico circular de gastos",children:(0,g.jsx)(o.eXT,{})})]})]}),(0,g.jsxs)(f,{children:[(0,g.jsxs)(v,{children:[(0,g.jsx)("label",{htmlFor:"timeFrame",children:"Per\xedodo"}),(0,g.jsxs)("select",{id:"timeFrame",value:A,onChange:e=>$(e.target.value),children:[(0,g.jsx)("option",{value:"day",children:"Diario"}),(0,g.jsx)("option",{value:"week",children:"Semanal"}),(0,g.jsx)("option",{value:"month",children:"Mensual"}),(0,g.jsx)("option",{value:"year",children:"Anual"})]})]}),(0,g.jsxs)(v,{children:[(0,g.jsx)("label",{htmlFor:"categoryFilter",children:"Categor\xeda"}),(0,g.jsxs)("select",{id:"categoryFilter",value:_,onChange:e=>E(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"Todas las categor\xedas"}),F.map((e=>(0,g.jsx)("option",{value:e,children:e},e)))]})]}),(0,g.jsxs)(v,{children:[(0,g.jsx)("label",{htmlFor:"startDate",children:"Fecha de inicio"}),(0,g.jsx)("input",{id:"startDate",type:"date",value:D,onChange:e=>C(e.target.value)})]}),(0,g.jsxs)(v,{children:[(0,g.jsx)("label",{htmlFor:"endDate",children:"Fecha de fin"}),(0,g.jsx)("input",{id:"endDate",type:"date",value:T,onChange:e=>S(e.target.value)})]})]}),a?(0,g.jsx)(l.A,{text:"Cargando datos para an\xe1lisis..."}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(y,{children:(()=>{switch(i){case"line":case"area":default:return(0,g.jsx)(s.N1,{data:I.timeSeries,options:w});case"bar":return(0,g.jsx)(s.yP,{data:I.timeSeries,options:w});case"pie-income":return(0,g.jsx)(s.Fq,{data:I.categoryIncome,options:{...w,aspectRatio:1}});case"pie-expense":return(0,g.jsx)(s.Fq,{data:I.categoryExpense,options:{...w,aspectRatio:1}});case"doughnut-income":return(0,g.jsx)(s.nu,{data:I.categoryIncome,options:{...w,aspectRatio:1}});case"doughnut-expense":return(0,g.jsx)(s.nu,{data:I.categoryExpense,options:{...w,aspectRatio:1}});case"polar-income":return(0,g.jsx)(s.O5,{data:I.categoryIncome,options:{...w,aspectRatio:1}});case"polar-expense":return(0,g.jsx)(s.O5,{data:I.categoryExpense,options:{...w,aspectRatio:1}})}})()}),(0,g.jsxs)(b,{children:[(0,g.jsxs)(j,{color:"var(--success-color)",children:[(0,g.jsx)("h3",{children:"Ingresos totales"}),(0,g.jsx)("p",{children:R(M.totalIncome)}),(0,g.jsx)("small",{children:"Durante el per\xedodo seleccionado"})]}),(0,g.jsxs)(j,{color:"var(--danger-color)",children:[(0,g.jsx)("h3",{children:"Gastos totales"}),(0,g.jsx)("p",{children:R(M.totalExpense)}),(0,g.jsx)("small",{children:"Durante el per\xedodo seleccionado"})]}),(0,g.jsxs)(j,{color:M.balance>=0?"var(--success-color)":"var(--danger-color)",children:[(0,g.jsx)("h3",{children:"Balance"}),(0,g.jsx)("p",{children:R(M.balance)}),(0,g.jsx)("small",{children:"Ingresos - Gastos"})]}),(0,g.jsxs)(j,{color:"var(--primary-color)",children:[(0,g.jsx)("h3",{children:"Ingreso promedio"}),(0,g.jsx)("p",{children:R(M.averageIncome)}),(0,g.jsx)("small",{children:"Por transacci\xf3n"})]}),(0,g.jsxs)(j,{color:"var(--secondary-color)",children:[(0,g.jsx)("h3",{children:"Gasto promedio"}),(0,g.jsx)("p",{children:R(M.averageExpense)}),(0,g.jsx)("small",{children:"Por transacci\xf3n"})]}),(0,g.jsxs)(j,{color:"var(--success-color-dark)",children:[(0,g.jsx)("h3",{children:"Mayor ingreso"}),(0,g.jsx)("p",{children:R(M.largestIncome)}),(0,g.jsx)("small",{children:"Transacci\xf3n m\xe1s grande"})]}),(0,g.jsxs)(j,{color:"var(--danger-color-dark)",children:[(0,g.jsx)("h3",{children:"Mayor gasto"}),(0,g.jsx)("p",{children:R(M.largestExpense)}),(0,g.jsx)("small",{children:"Transacci\xf3n m\xe1s grande"})]})]})]})]})};var A=a(377);const $="financial_predictions",_=864e5,E=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3;try{const r=(0,A.zM)($);if(r&&r.expenses&&r.timestamp&&Date.now()-r.timestamp<_)return r.expenses;const a=(await(0,c.I0)()).filter((e=>"expense"===e.type));if(0===a.length)return[];const t=T(a),n=S(a),o=z(t),i=F(n,o,e),s=(0,A.zM)($)||{};return s.expenses=i,s.timestamp=Date.now(),(0,A.lk)($,s),i}catch(r){return console.error("Error al predecir gastos:",r),[]}},D=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3;try{const r=(0,A.zM)($);if(r&&r.income&&r.timestamp&&Date.now()-r.timestamp<_)return r.income;const a=(await(0,c.I0)()).filter((e=>"income"===e.type));if(0===a.length)return[];const t=T(a),n=S(a),o=z(t),i=F(n,o,e),s=(0,A.zM)($)||{};return s.income=i,s.timestamp=Date.now(),(0,A.lk)($,s),i}catch(r){return console.error("Error al predecir ingresos:",r),[]}},C=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3;try{const r=(0,A.zM)($);if(r&&r.balance&&r.timestamp&&Date.now()-r.timestamp<_)return r.balance;const a=await D(e),t=await E(e),n=[];for(let i=0;i<e;i++){const e=a.find((e=>e.monthIndex===i))||{total:0},r=t.find((e=>e.monthIndex===i))||{total:0};n.push({monthIndex:i,month:I(i),income:e.total,expense:r.total,balance:e.total-r.total,categories:{income:e.categories||{},expense:r.categories||{}}})}const o=(0,A.zM)($)||{};return o.balance=n,o.timestamp=Date.now(),(0,A.lk)($,o),n}catch(r){return console.error("Error al predecir balance:",r),[]}},T=e=>{const r={};return e.forEach((e=>{const a=new Date(e.date),t=`${a.getFullYear()}-${a.getMonth()+1}`;r[t]||(r[t]=[]),r[t].push(e)})),r},S=e=>{const r={},a={};e.forEach((e=>{const t=e.category||"Sin categor\xeda";r[t]||(r[t]=0,a[t]=0),r[t]+=e.amount,a[t]++}));const t={};return Object.keys(r).forEach((e=>{t[e]=r[e]/a[e]})),t},z=e=>{const r=Object.keys(e).sort();if(r.length<2)return{overall:0,categories:{}};const a=r.map((r=>{const a=e[r],t=a.reduce(((e,r)=>e+r.amount),0),n={};return a.forEach((e=>{const r=e.category||"Sin categor\xeda";n[r]=(n[r]||0)+e.amount})),{month:r,total:t,categoryTotals:n}})),t=a[0],n=a[a.length-1],o=a.length;if(o<=1)return{overall:0,categories:{}};const i=(n.total-t.total)/(o-1)/(t.total||1),s={},c=new Set;return a.forEach((e=>{Object.keys(e.categoryTotals).forEach((e=>{c.add(e)}))})),c.forEach((e=>{const r=a.find((r=>r.categoryTotals[e])),t=[...a].reverse().find((r=>r.categoryTotals[e]));if(r&&t){const n=r.categoryTotals[e]||0,o=t.categoryTotals[e]||0,i=a.indexOf(r),c=a.indexOf(t)-i;if(c>0){const r=(o-n)/c/(n||1);s[e]=r}else s[e]=0}else s[e]=0})),{overall:i,categories:s}},F=(e,r,a)=>{const t=[];for(let n=0;n<a;n++){const a={monthIndex:n,month:I(n),total:0,categories:{}};Object.keys(e).forEach((t=>{const o=e[t]*(1+(r.categories[t]||0)*(n+1));a.categories[t]=o,a.total+=o})),t.push(a)}return t},I=e=>{const r=new Date;return r.setMonth(r.getMonth()+e),r.toLocaleString("es-ES",{month:"long",year:"numeric"})},M=async()=>{try{const e=(await(0,c.I0)()).filter((e=>"expense"===e.type));if(e.length<5)return[];const r={};e.forEach((e=>{const a=`${e.title.toLowerCase()}_${e.category||"sin_categoria"}`;r[a]||(r[a]=[]),r[a].push(e)}));const a=Object.keys(r).filter((e=>r[e].length>=2)).map((e=>{const a=r[e],t=a[0].title,n=a[0].category;a.sort(((e,r)=>new Date(e.date)-new Date(r.date)));const o=[];for(let r=1;r<a.length;r++){const e=new Date(a[r-1].date),t=new Date(a[r].date),n=Math.round((t-e)/864e5);o.push(n)}const i=o.reduce(((e,r)=>e+r),0)/o.length,s=o.reduce(((e,r)=>e+Math.pow(r-i,2)),0)/o.length,c=Math.sqrt(s),l=c<.3*i,d=a.reduce(((e,r)=>e+r.amount),0)/a.length;let p="irregular";l&&(i>=25&&i<=35?p="mensual":i>=6&&i<=8?p="semanal":i>=13&&i<=16?p="quincenal":i>=85&&i<=95&&(p="trimestral"));let g=null;if(l){const e=new Date(a[a.length-1].date);g=new Date(e),g.setDate(e.getDate()+Math.round(i))}return{title:t,category:n,frequency:p,isRecurring:l,avgAmount:d,avgInterval:Math.round(i),occurrences:a.length,lastDate:a[a.length-1].date,nextDate:g?g.toISOString().split("T")[0]:null,confidence:l?1-c/i:0}})).filter((e=>e.isRecurring)).sort(((e,r)=>r.confidence-e.confidence));return a}catch(e){return console.error("Error al detectar patrones recurrentes:",e),[]}},R=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3;try{const r=(await(0,c.I0)()).reduce(((e,r)=>e+("income"===r.type?r.amount:-r.amount)),0),a=await C(e);let t=r;return{currentBalance:r,predictions:a.map((e=>(t+=e.balance,{...e,startingBalance:t-e.balance,endingBalance:t,cashFlow:e.balance})))}}catch(r){return console.error("Error al predecir flujo de caja:",r),{currentBalance:0,predictions:[]}}},L=n.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,B=n.Ay.div`
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
`,P=n.Ay.h2`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  
  svg {
    color: var(--primary-color);
  }
`,V=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  
  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 8px;
    margin-bottom: 16px;
  }
`,N=n.Ay.button`
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  color: ${e=>e.active?"var(--primary-color)":"var(--text-medium)"};
  font-weight: ${e=>e.active?"600":"400"};
  border-bottom: 2px solid ${e=>e.active?"var(--primary-color)":"transparent"};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    color: var(--primary-color);
  }
`,O=n.Ay.div`
  height: 400px;
  position: relative;
  margin-top: 24px;
  margin-bottom: 32px;
`,G=n.Ay.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  margin-bottom: 16px;
  border-left: 4px solid ${e=>e.color||"var(--primary-color)"};
`,q=n.Ay.h3`
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    color: ${e=>e.color||"var(--primary-color)"};
  }
`,Y=n.Ay.div`
  margin-bottom: 8px;
  font-size: 0.95rem;
  color: var(--text-medium);
  line-height: 1.5;
`,Z=n.Ay.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${e=>e.color||"var(--primary-color)"};
  margin: 8px 0;
`,Q=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 24px;
`,W=n.Ay.div`
  text-align: center;
  padding: 48px 24px;
  color: var(--text-medium);
  
  h4 {
    margin-bottom: 16px;
    color: var(--text-dark);
  }
  
  p {
    margin-bottom: 24px;
  }
`,H={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"top"},tooltip:{mode:"index",intersect:!1}},scales:{y:{beginAtZero:!0}}},K=()=>{const[e,r]=(0,t.useState)(!0),[a,n]=(0,t.useState)("cashflow"),[i,c]=(0,t.useState)({expenses:[],income:[],balance:[],cashFlow:{currentBalance:0,predictions:[]},patterns:[]}),[u,m]=(0,t.useState)(!1);(0,t.useEffect)((()=>{(async()=>{try{r(!0);const[e,a,t,n,o]=await Promise.all([E(6),D(6),C(6),R(6),M()]);c({expenses:e,income:a,balance:t,cashFlow:n,patterns:o}),m(e.length>0||a.length>0||t.length>0||n.predictions.length>0||o.length>0)}catch(e){console.error("Error al cargar predicciones:",e),(0,p.Qg)("Error al cargar predicciones financieras"),m(!1)}finally{r(!1)}})()}),[]);const x=e=>new Intl.NumberFormat("es-AR",{style:"currency",currency:"ARS"}).format(e),h={labels:i.cashFlow.predictions.map((e=>e.month)),datasets:[{label:"Balance Final",data:i.cashFlow.predictions.map((e=>e.endingBalance)),borderColor:"rgba(75, 192, 192, 1)",backgroundColor:"rgba(75, 192, 192, 0.2)",fill:!0,tension:.4},{label:"Ingresos",data:i.cashFlow.predictions.map((e=>e.income)),borderColor:"rgba(54, 162, 235, 1)",backgroundColor:"rgba(54, 162, 235, 0.2)",borderDash:[5,5],tension:.4},{label:"Gastos",data:i.cashFlow.predictions.map((e=>e.expense)),borderColor:"rgba(255, 99, 132, 1)",backgroundColor:"rgba(255, 99, 132, 0.2)",borderDash:[5,5],tension:.4}]},y={labels:i.balance.map((e=>e.month)),datasets:[{label:"Ingresos Previstos",data:i.balance.map((e=>e.income)),borderColor:"rgba(54, 162, 235, 1)",backgroundColor:"rgba(54, 162, 235, 0.2)",fill:!0,tension:.4},{label:"Gastos Previstos",data:i.balance.map((e=>e.expense)),borderColor:"rgba(255, 99, 132, 1)",backgroundColor:"rgba(255, 99, 132, 0.2)",fill:!0,tension:.4}]};return(0,g.jsxs)(L,{children:[(0,g.jsxs)(B,{children:[(0,g.jsxs)(P,{children:[(0,g.jsx)(o.ARf,{})," An\xe1lisis Predictivo"]}),(0,g.jsxs)(d.A,{variant:"outline",onClick:()=>window.location.reload(),disabled:e,children:[(0,g.jsx)(o.jTZ,{})," Actualizar"]})]}),(0,g.jsxs)(V,{children:[(0,g.jsx)(N,{active:"cashflow"===a,onClick:()=>n("cashflow"),children:"Flujo de Caja"}),(0,g.jsx)(N,{active:"income-expense"===a,onClick:()=>n("income-expense"),children:"Ingresos y Gastos"}),(0,g.jsx)(N,{active:"patterns"===a,onClick:()=>n("patterns"),children:"Patrones Recurrentes"})]}),(()=>{if(e)return(0,g.jsx)(l.A,{text:"Calculando predicciones..."});if(!u)return(0,g.jsxs)(W,{children:[(0,g.jsx)("h4",{children:"No hay suficientes datos para generar predicciones"}),(0,g.jsx)("p",{children:"Agrega m\xe1s transacciones para obtener predicciones financieras precisas."}),(0,g.jsx)(d.A,{onClick:()=>window.location.href="/finances",children:"Ir a Finanzas"})]});switch(a){case"cashflow":return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(G,{color:"var(--primary-color)",children:[(0,g.jsxs)(q,{color:"var(--primary-color)",children:[(0,g.jsx)(o.S8s,{})," Predicci\xf3n de Flujo de Caja"]}),(0,g.jsx)(Y,{children:"Basado en tus patrones de ingresos y gastos, as\xed es como podr\xeda evolucionar tu balance en los pr\xf3ximos meses."})]}),(0,g.jsx)(O,{children:(0,g.jsx)(s.N1,{data:h,options:H})}),(0,g.jsx)(Q,{children:i.cashFlow.predictions.map(((e,r)=>(0,g.jsxs)(G,{color:e.balance>=0?"var(--success-color)":"var(--danger-color)",children:[(0,g.jsx)(q,{children:e.month}),(0,g.jsx)(Y,{children:"Balance proyectado al final del mes"}),(0,g.jsx)(Z,{color:e.balance>=0?"var(--success-color)":"var(--danger-color)",children:x(e.endingBalance)}),(0,g.jsxs)(Y,{children:[(0,g.jsx)("strong",{children:"Ingresos:"})," ",x(e.income),(0,g.jsx)("br",{}),(0,g.jsx)("strong",{children:"Gastos:"})," ",x(e.expense),(0,g.jsx)("br",{}),(0,g.jsx)("strong",{children:"Flujo neto:"})," ",x(e.balance)]})]},r)))})]});case"income-expense":return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(G,{color:"var(--primary-color)",children:[(0,g.jsxs)(q,{color:"var(--primary-color)",children:[(0,g.jsx)(o.S8s,{})," Predicci\xf3n de Ingresos y Gastos"]}),(0,g.jsx)(Y,{children:"Proyecci\xf3n de tus ingresos y gastos para los pr\xf3ximos meses, basada en tus patrones hist\xf3ricos."})]}),(0,g.jsx)(O,{children:(0,g.jsx)(s.N1,{data:y,options:H})}),(0,g.jsx)(Q,{children:i.balance.map(((e,r)=>(0,g.jsxs)(G,{color:e.balance>=0?"var(--success-color)":"var(--danger-color)",children:[(0,g.jsx)(q,{children:e.month}),(0,g.jsx)(Y,{children:"Balance proyectado para el mes"}),(0,g.jsx)(Z,{color:e.balance>=0?"var(--success-color)":"var(--danger-color)",children:x(e.balance)}),(0,g.jsxs)(Y,{children:[(0,g.jsx)("strong",{children:"Ingresos:"})," ",x(e.income),(0,g.jsx)("br",{}),(0,g.jsx)("strong",{children:"Gastos:"})," ",x(e.expense)]})]},r)))})]});case"patterns":return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(G,{color:"var(--info-color)",children:[(0,g.jsxs)(q,{color:"var(--info-color)",children:[(0,g.jsx)(o.S8s,{})," Patrones Recurrentes Detectados"]}),(0,g.jsx)(Y,{children:"Hemos identificado estos patrones recurrentes en tus transacciones que podr\xedan ser pagos o ingresos peri\xf3dicos."})]}),i.patterns.length>0?(0,g.jsx)(Q,{children:i.patterns.map(((e,r)=>(0,g.jsxs)(G,{color:e.avgAmount>0?"var(--success-color)":"var(--danger-color)",children:[(0,g.jsx)(q,{children:e.title}),(0,g.jsxs)(Y,{children:[(0,g.jsx)("strong",{children:"Categor\xeda:"})," ",e.category,(0,g.jsx)("br",{}),(0,g.jsx)("strong",{children:"Frecuencia:"})," ",e.frequency,(0,g.jsx)("br",{}),(0,g.jsx)("strong",{children:"Monto promedio:"})," ",x(e.avgAmount),(0,g.jsx)("br",{}),(0,g.jsx)("strong",{children:"Ocurrencias:"})," ",e.occurrences," veces",(0,g.jsx)("br",{}),e.nextDate&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("strong",{children:"Pr\xf3xima fecha estimada:"})," ",new Date(e.nextDate).toLocaleDateString("es-ES")]})]})]},r)))}):(0,g.jsxs)(W,{children:[(0,g.jsx)("h4",{children:"No se detectaron patrones recurrentes"}),(0,g.jsx)("p",{children:"Necesitamos m\xe1s transacciones para identificar patrones confiables."})]})]});default:return(0,g.jsx)("div",{children:"Selecciona una pesta\xf1a para ver las predicciones"})}})()]})};var U=a(372);var X=a(8634);const J=async()=>{try{const{data:{user:r}}=await U.N.auth.getUser();if(!r)return console.error("No authenticated user found"),[];const a=`events_${r.id}`,t=async()=>{console.log("Fetching events from Supabase");const{data:e,error:a}=await U.N.from("events").select("*").eq("user_id",r.id).order("start_date",{ascending:!0});if(a)throw console.error("Error fetching events from Supabase:",a),a;const t=e||[];return await(0,A.cZ)("events",t),t},n=async()=>{console.log("Fetching events from IndexedDB");return(await(0,A.Wj)("events")).filter((e=>e.user_id===r.id))};if(!(0,A.KJ)()){console.log("Offline mode: using IndexedDB");const e=await n();return(0,X.K1)(a,e,6e5,{priority:!0}),e}try{return await(0,X.nT)(t,a,3e5,{priority:!0})}catch(e){return console.error("Error fetching from Supabase with cache:",e),await n()}}catch(e){console.error("Error in getEvents:",e);try{const{data:{user:e}}=await U.N.auth.getUser();if(e){return(await(0,A.Wj)("events")).filter((r=>r.user_id===e.id))}}catch(r){console.error("Error fetching from IndexedDB:",r)}return[]}},ee="personalized_recommendations",re=432e5,ae=async()=>{try{const e=(0,A.zM)(ee);if(e&&e.financial&&e.timestamp&&Date.now()-e.timestamp<re)return e.financial;await(0,c.I0)();const r=await(async()=>{const{data:e,error:r}=await U.N.from("financial_goals").select("*").order("target_date",{ascending:!0});return r?(console.error("Error fetching financial goals:",r),[]):e||[]})(),a=await M(),t=await(async()=>{try{const e=await(0,c.I0)();if(0===e.length)return{increasing:[],decreasing:[]};const r=e.filter((e=>"expense"===e.type)),a=e.filter((e=>"income"===e.type)),t=z(T(r)),n=z(T(a)),o=Object.keys(t.categories),i=o.filter((e=>t.categories[e]>.05)).map((e=>({category:e,trend:t.categories[e],type:"expense"}))).sort(((e,r)=>r.trend-e.trend)).slice(0,3),s=o.filter((e=>t.categories[e]<-.05)).map((e=>({category:e,trend:t.categories[e],type:"expense"}))).sort(((e,r)=>e.trend-r.trend)).slice(0,3),l=Object.keys(n.categories),d=l.filter((e=>n.categories[e]>.05)).map((e=>({category:e,trend:n.categories[e],type:"income"}))).sort(((e,r)=>r.trend-e.trend)).slice(0,3),p=l.filter((e=>n.categories[e]<-.05)).map((e=>({category:e,trend:n.categories[e],type:"income"}))).sort(((e,r)=>e.trend-r.trend)).slice(0,3);return{increasing:[...d,...i],decreasing:[...p,...s]}}catch(e){return console.error("Error al identificar categor\xedas con tendencia:",e),{increasing:[],decreasing:[]}}})(),n=await(async()=>{try{const e=(await(0,c.I0)()).filter((e=>"expense"===e.type));if(0===e.length)return[];const r=e.reduce(((e,r)=>e+r.amount),0),a={};e.forEach((e=>{const r=e.category||"Sin categor\xeda";a[r]||(a[r]=0),a[r]+=e.amount}));const t={};Object.keys(a).forEach((e=>{t[e]=a[e]/r}));const n=Object.keys(t).filter((e=>t[e]>.15)).map((e=>({category:e,percentage:t[e],amount:a[e]}))).sort(((e,r)=>r.percentage-e.percentage)),o=[];n.forEach((e=>{const{category:r,percentage:a,amount:t}=e,n=.1*t;o.push({type:"high_expense_category",category:r,percentage:a,currentAmount:t,potentialSaving:n,message:`Tus gastos en ${r} representan el ${(100*a).toFixed(1)}% de tus gastos totales. Reduciendo un 10% podr\xedas ahorrar ${n.toFixed(2)} pesos.`})}));const i=e.filter((e=>e.amount<500));if(i.length>.3*e.length){const e=i.reduce(((e,r)=>e+r.amount),0),r=.2*e;o.push({type:"small_frequent_expenses",count:i.length,totalAmount:e,potentialSaving:r,message:`Tienes ${i.length} gastos peque\xf1os que suman ${e.toFixed(2)} pesos. Reduciendo estos gastos podr\xedas ahorrar hasta ${r.toFixed(2)} pesos.`})}const s=(await M()).filter((e=>"mensual"===e.frequency&&e.avgAmount<2e3&&e.confidence>.7));if(s.length>0){const e=s.reduce(((e,r)=>e+r.avgAmount),0);o.push({type:"subscriptions",count:s.length,totalAmount:e,subscriptions:s,message:`Tienes ${s.length} posibles suscripciones que suman ${e.toFixed(2)} pesos mensuales. Revisa si todas son necesarias.`})}return o}catch(e){return console.error("Error al generar recomendaciones de ahorro:",e),[]}})(),o=await R(3),i=[];if(t.increasing.length>0&&t.increasing.forEach((e=>{"expense"===e.type?i.push({id:`trend_expense_${e.category}`,type:"warning",category:"trends",title:`Aumento en gastos de ${e.category}`,description:`Tus gastos en ${e.category} est\xe1n aumentando. Considera revisar estos gastos para mantenerlos bajo control.`,actionText:"Ver detalles",actionLink:"/analytics",priority:"medium"}):i.push({id:`trend_income_${e.category}`,type:"success",category:"trends",title:`Aumento en ingresos de ${e.category}`,description:`Tus ingresos en ${e.category} est\xe1n aumentando. \xa1Buen trabajo!`,actionText:"Ver detalles",actionLink:"/analytics",priority:"low"})})),t.decreasing.length>0&&t.decreasing.forEach((e=>{"income"===e.type?i.push({id:`trend_income_decrease_${e.category}`,type:"warning",category:"trends",title:`Disminuci\xf3n en ingresos de ${e.category}`,description:`Tus ingresos en ${e.category} est\xe1n disminuyendo. Considera buscar alternativas para compensar esta reducci\xf3n.`,actionText:"Ver detalles",actionLink:"/analytics",priority:"high"}):i.push({id:`trend_expense_decrease_${e.category}`,type:"success",category:"trends",title:`Disminuci\xf3n en gastos de ${e.category}`,description:`Tus gastos en ${e.category} est\xe1n disminuyendo. \xa1Sigue as\xed!`,actionText:"Ver detalles",actionLink:"/analytics",priority:"low"})})),a.length>0){const e=a.filter((e=>"mensual"===e.frequency&&e.avgAmount<2e3&&e.confidence>.7));if(e.length>0){const r=e.reduce(((e,r)=>e+r.avgAmount),0);i.push({id:"recurring_subscriptions",type:"info",category:"patterns",title:"Revisi\xf3n de suscripciones",description:`Tienes ${e.length} posibles suscripciones que suman ${r.toFixed(2)} pesos mensuales. Revisa si todas son necesarias.`,actionText:"Ver detalles",actionLink:"/finances",priority:"medium",data:e})}const r=a.filter((e=>e.avgAmount>2e3&&e.confidence>.6));r.length>0&&r.forEach((e=>{if(e.nextDate){const r=new Date(e.nextDate),a=new Date,t=Math.round((r-a)/864e5);t<=7&&t>=0&&i.push({id:`upcoming_payment_${e.title}`,type:"warning",category:"upcoming",title:`Pago pr\xf3ximo: ${e.title}`,description:`Tienes un pago de aproximadamente ${e.avgAmount.toFixed(2)} pesos programado para el ${new Date(e.nextDate).toLocaleDateString("es-ES")} (en ${t} d\xedas).`,actionText:"Preparar pago",actionLink:"/finances",priority:"high",data:e})}}))}if(r.length>0&&r.forEach((e=>{const r=new Date(e.target_date),a=new Date,t=Math.round((r-a)/864e5);if(t>0){const a=e.current_amount/e.target_amount,n=1-t/Math.round((r-new Date(e.created_at))/864e5);a<.8*n?i.push({id:`goal_behind_${e.id}`,type:"danger",category:"goals",title:`Meta atrasada: ${e.title}`,description:`Est\xe1s atrasado en tu meta "${e.title}". Para alcanzarla a tiempo, necesitas aumentar tus aportes.`,actionText:"Ver meta",actionLink:"/financial-goals",priority:"high",data:e}):a<n?i.push({id:`goal_slightly_behind_${e.id}`,type:"warning",category:"goals",title:`Meta ligeramente atrasada: ${e.title}`,description:`Est\xe1s un poco atrasado en tu meta "${e.title}". Considera aumentar tus aportes para alcanzarla a tiempo.`,actionText:"Ver meta",actionLink:"/financial-goals",priority:"medium",data:e}):a>1.2*n&&i.push({id:`goal_ahead_${e.id}`,type:"success",category:"goals",title:`\xa1Buen progreso en tu meta: ${e.title}!`,description:`Est\xe1s adelantado en tu meta "${e.title}". \xa1Sigue as\xed!`,actionText:"Ver meta",actionLink:"/financial-goals",priority:"low",data:e}),t<=30&&i.push({id:`goal_ending_soon_${e.id}`,type:a>=.9?"success":"warning",category:"goals",title:`Meta pr\xf3xima a vencer: ${e.title}`,description:`Tu meta "${e.title}" vence en ${t} d\xedas y has completado el ${(100*a).toFixed(0)}%.`,actionText:"Ver meta",actionLink:"/financial-goals",priority:t<=7?"high":"medium",data:e})}})),n.length>0&&n.forEach(((e,r)=>{"high_expense_category"===e.type?i.push({id:`saving_high_expense_${e.category}`,type:"info",category:"saving",title:`Oportunidad de ahorro en ${e.category}`,description:e.message,actionText:"Ver detalles",actionLink:"/finances",priority:"medium",data:e}):"small_frequent_expenses"===e.type?i.push({id:"saving_small_expenses",type:"info",category:"saving",title:"Gastos peque\xf1os pero frecuentes",description:e.message,actionText:"Ver detalles",actionLink:"/finances",priority:"medium",data:e}):"subscriptions"===e.type&&i.push({id:"saving_subscriptions",type:"info",category:"saving",title:"Revisa tus suscripciones",description:e.message,actionText:"Ver detalles",actionLink:"/finances",priority:"medium",data:e})})),o.predictions.length>0){const e=o.predictions[o.predictions.length-1];e.endingBalance<0?i.push({id:"cashflow_negative",type:"danger",category:"cashflow",title:"Posible balance negativo",description:`Seg\xfan nuestras predicciones, podr\xedas tener un balance negativo de ${e.endingBalance.toFixed(2)} pesos en los pr\xf3ximos meses. Considera reducir gastos o aumentar ingresos.`,actionText:"Ver predicciones",actionLink:"/analytics",priority:"high",data:o}):e.endingBalance<.5*o.currentBalance?i.push({id:"cashflow_decreasing",type:"warning",category:"cashflow",title:"Reducci\xf3n de balance",description:"Seg\xfan nuestras predicciones, tu balance podr\xeda reducirse significativamente en los pr\xf3ximos meses. Considera revisar tus gastos.",actionText:"Ver predicciones",actionLink:"/analytics",priority:"medium",data:o}):e.endingBalance>1.5*o.currentBalance&&i.push({id:"cashflow_increasing",type:"success",category:"cashflow",title:"Aumento de balance",description:"Seg\xfan nuestras predicciones, tu balance podr\xeda aumentar significativamente en los pr\xf3ximos meses. \xa1Buen trabajo!",actionText:"Ver predicciones",actionLink:"/analytics",priority:"low",data:o})}const s={high:0,medium:1,low:2},l=i.sort(((e,r)=>s[e.priority]-s[r.priority])),d=(0,A.zM)(ee)||{};return d.financial=l,d.timestamp=Date.now(),(0,A.lk)(ee,d),l}catch(e){return console.error("Error al generar recomendaciones financieras:",e),[]}},te=async()=>{try{const e=(0,A.zM)(ee);if(e&&e.productivity&&e.timestamp&&Date.now()-e.timestamp<re)return e.productivity;const r=await(async()=>{const{data:e,error:r}=await U.N.from("tasks").select("*").order("created_at",{ascending:!1});return r?(console.error("Error fetching tasks:",r),[]):e||[]})(),a=await J(),t=[],n=r.filter((e=>"completed"!==e.status)),o=n.filter((e=>!!e.due_date&&new Date(e.due_date)<new Date));o.length>0&&t.push({id:"overdue_tasks",type:"danger",category:"tasks",title:"Tareas vencidas",description:`Tienes ${o.length} tareas vencidas. Considera priorizarlas o ajustar sus fechas de vencimiento.`,actionText:"Ver tareas",actionLink:"/tasks",priority:"high",data:o});const i=n.filter((e=>{if(!e.due_date)return!1;const r=new Date(e.due_date),a=new Date,t=Math.round((r-a)/864e5);return t>=0&&t<=3}));i.length>0&&t.push({id:"soon_due_tasks",type:"warning",category:"tasks",title:"Tareas pr\xf3ximas a vencer",description:`Tienes ${i.length} tareas que vencen en los pr\xf3ximos 3 d\xedas.`,actionText:"Ver tareas",actionLink:"/tasks",priority:"medium",data:i});const s=a.filter((e=>{const r=new Date(e.start_date),a=new Date,t=Math.round((r-a)/864e5);return t>=0&&t<=3}));s.length>0&&t.push({id:"upcoming_events",type:"info",category:"events",title:"Eventos pr\xf3ximos",description:`Tienes ${s.length} eventos programados para los pr\xf3ximos 3 d\xedas.`,actionText:"Ver calendario",actionLink:"/calendar",priority:"medium",data:s});const c={};a.forEach((e=>{const r=e.start_date.split("T")[0];c[r]||(c[r]=[]),c[r].push(e)})),Object.keys(c).forEach((e=>{const r=c[e];if(r.length>=4){const a=new Date(e),n=new Date,o=Math.round((a-n)/864e5);o>=0&&o<=7&&t.push({id:`busy_day_${e}`,type:"warning",category:"events",title:"D\xeda con muchos eventos",description:`Tienes ${r.length} eventos programados para el ${a.toLocaleDateString("es-ES")}. Considera reorganizar tu agenda si es posible.`,actionText:"Ver calendario",actionLink:"/calendar",priority:o<=2?"high":"medium",data:r})}}));const l={};n.forEach((e=>{const r=e.category||"Sin categor\xeda";l[r]||(l[r]=[]),l[r].push(e)})),Object.keys(l).forEach((e=>{const r=l[e];r.length>=5&&t.push({id:`many_tasks_${e}`,type:"info",category:"tasks",title:`Muchas tareas en ${e}`,description:`Tienes ${r.length} tareas pendientes en la categor\xeda ${e}. Considera priorizarlas o dividirlas en subtareas.`,actionText:"Ver tareas",actionLink:"/tasks",priority:"medium",data:r})}));const d={high:0,medium:1,low:2},p=t.sort(((e,r)=>d[e.priority]-d[r.priority])),g=(0,A.zM)(ee)||{};return g.productivity=p,g.timestamp=Date.now(),(0,A.lk)(ee,g),p}catch(e){return console.error("Error al generar recomendaciones de productividad:",e),[]}},ne=(e,r)=>{try{const a=(0,A.zM)("viewed_recommendations")||{};return a[e]={status:r,timestamp:Date.now()},(0,A.lk)("viewed_recommendations",a),!0}catch(a){return console.error("Error al actualizar estado de recomendaci\xf3n:",a),!1}},oe=n.Ay.div`
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--card-shadow);
  padding: 24px;
  margin-bottom: 32px;
`,ie=n.Ay.div`
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
`,se=n.Ay.h2`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  
  svg {
    color: var(--primary-color);
  }
`,ce=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  
  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 8px;
    margin-bottom: 16px;
  }
`,le=n.Ay.button`
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  color: ${e=>e.active?"var(--primary-color)":"var(--text-medium)"};
  font-weight: ${e=>e.active?"600":"400"};
  border-bottom: 2px solid ${e=>e.active?"var(--primary-color)":"transparent"};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    color: var(--primary-color);
  }
  
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: ${e=>e.active?"var(--primary-color)":"var(--text-light)"};
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 0.8rem;
    margin-left: 8px;
  }
`,de=n.Ay.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  margin-bottom: 16px;
  border-left: 4px solid ${e=>{switch(e.type){case"success":return"var(--success-color)";case"warning":return"var(--warning-color)";case"danger":return"var(--danger-color)";case"info":return"var(--info-color)";default:return"var(--primary-color)"}}};
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`,pe=n.Ay.h3`
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 30px;
  
  svg {
    color: ${e=>{switch(e.type){case"success":return"var(--success-color)";case"warning":return"var(--warning-color)";case"danger":return"var(--danger-color)";case"info":return"var(--info-color)";default:return"var(--primary-color)"}}};
  }
`,ge=n.Ay.div`
  margin-bottom: 16px;
  font-size: 0.95rem;
  color: var(--text-medium);
  line-height: 1.5;
`,ue=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,me=n.Ay.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--text-medium);
  }
`,xe=n.Ay.div`
  text-align: center;
  padding: 48px 24px;
  color: var(--text-medium);
  
  h4 {
    margin-bottom: 16px;
    color: var(--text-dark);
  }
  
  p {
    margin-bottom: 24px;
  }
`,he=n.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: 8px;
  background-color: ${e=>{switch(e.priority){case"high":return"rgba(255, 99, 132, 0.1)";case"medium":return"rgba(255, 159, 64, 0.1)";case"low":return"rgba(75, 192, 192, 0.1)";default:return"rgba(153, 102, 255, 0.1)"}}};
  color: ${e=>{switch(e.priority){case"high":return"var(--danger-color)";case"medium":return"var(--warning-color)";case"low":return"var(--success-color)";default:return"var(--primary-color)"}}};
`,ye=()=>{const[e,r]=(0,t.useState)(!0),[a,n]=(0,t.useState)("all"),[i,s]=(0,t.useState)({all:[],financial:[],productivity:[]}),[c,u]=(0,t.useState)(!1);(0,t.useEffect)((()=>{(async()=>{try{r(!0);const e=await(async()=>{try{const e=await ae(),r=await te();return{financial:e,productivity:r,all:[...e,...r].sort(((e,r)=>{const a={high:0,medium:1,low:2};return a[e.priority]-a[r.priority]}))}}catch(e){return console.error("Error al obtener todas las recomendaciones:",e),{financial:[],productivity:[],all:[]}}})(),a={all:m(e.all),financial:m(e.financial),productivity:m(e.productivity)};s(a),u(a.all.length>0||a.financial.length>0||a.productivity.length>0)}catch(e){console.error("Error al cargar recomendaciones:",e),(0,p.Qg)("Error al cargar recomendaciones personalizadas"),u(!1)}finally{r(!1)}})()}),[]);const m=e=>e.filter((e=>{const r=(e=>{try{return((0,A.zM)("viewed_recommendations")||{})[e]||null}catch(r){return console.error("Error al obtener estado de recomendaci\xf3n:",r),null}})(e.id);return!r||"ignored"!==r.status&&"actioned"!==r.status})),x=e=>{ne(e.id,"ignored"),s((r=>({all:r.all.filter((r=>r.id!==e.id)),financial:r.financial.filter((r=>r.id!==e.id)),productivity:r.productivity.filter((r=>r.id!==e.id))}))),(0,p.Te)("Recomendaci\xf3n descartada")},h=e=>{switch(e){case"success":return(0,g.jsx)(o.A3x,{});case"warning":case"danger":return(0,g.jsx)(o.y3G,{});default:return(0,g.jsx)(o.S8s,{})}};return(0,g.jsxs)(oe,{children:[(0,g.jsxs)(ie,{children:[(0,g.jsxs)(se,{children:[(0,g.jsx)(o.S8s,{})," Recomendaciones Personalizadas"]}),(0,g.jsxs)(d.A,{variant:"outline",onClick:()=>window.location.reload(),disabled:e,children:[(0,g.jsx)(o.jTZ,{})," Actualizar"]})]}),(0,g.jsxs)(ce,{children:[(0,g.jsxs)(le,{active:"all"===a,onClick:()=>n("all"),children:["Todas ",(0,g.jsx)("span",{className:"badge",children:i.all.length})]}),(0,g.jsxs)(le,{active:"financial"===a,onClick:()=>n("financial"),children:["Financieras ",(0,g.jsx)("span",{className:"badge",children:i.financial.length})]}),(0,g.jsxs)(le,{active:"productivity"===a,onClick:()=>n("productivity"),children:["Productividad ",(0,g.jsx)("span",{className:"badge",children:i.productivity.length})]})]}),(()=>{if(e)return(0,g.jsx)(l.A,{text:"Cargando recomendaciones..."});const r=i[a]||[];return 0===r.length?(0,g.jsxs)(xe,{children:[(0,g.jsx)("h4",{children:"No hay recomendaciones disponibles"}),(0,g.jsx)("p",{children:"Actualmente no tenemos recomendaciones personalizadas para ti en esta categor\xeda."}),(0,g.jsxs)(d.A,{onClick:()=>window.location.reload(),children:[(0,g.jsx)(o.jTZ,{})," Actualizar"]})]}):(0,g.jsx)(g.Fragment,{children:r.map((e=>(0,g.jsxs)(de,{type:e.type,children:[(0,g.jsxs)(pe,{type:e.type,children:[h(e.type),e.title,(0,g.jsx)(he,{priority:e.priority,children:"high"===e.priority?"Alta":"medium"===e.priority?"Media":"Baja"})]}),(0,g.jsx)(ge,{children:e.description}),(0,g.jsxs)(ue,{children:[(0,g.jsxs)(d.A,{onClick:()=>(e=>{ne(e.id,"actioned"),e.actionLink&&(window.location.href=e.actionLink),s((r=>({all:r.all.filter((r=>r.id!==e.id)),financial:r.financial.filter((r=>r.id!==e.id)),productivity:r.productivity.filter((r=>r.id!==e.id))}))),(0,p.Te)("Recomendaci\xf3n marcada como completada")})(e),variant:"primary",size:"small",children:[e.actionText||"Ver detalles"," ",(0,g.jsx)(o.dyV,{})]}),(0,g.jsxs)(d.A,{onClick:()=>x(e),variant:"outline",size:"small",children:[(0,g.jsx)(o.Ydy,{})," Gracias"]})]}),(0,g.jsx)(me,{onClick:()=>x(e),title:"Descartar recomendaci\xf3n",children:(0,g.jsx)(o.yGN,{})})]},e.id)))})})()]})},fe=n.Ay.div`
  max-width: 1200px;
  margin: 0 auto;
`,ve=n.Ay.div`
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
`,be=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    overflow-x: auto;
    padding-bottom: 8px;
  }
`,je=n.Ay.button`
  background: none;
  border: none;
  padding: 12px 24px;
  font-size: 1.1rem;
  color: ${e=>e.active?"var(--primary-color)":"var(--text-medium)"};
  font-weight: ${e=>e.active?"600":"400"};
  border-bottom: 3px solid ${e=>e.active?"var(--primary-color)":"transparent"};
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: var(--primary-color);
  }

  svg {
    font-size: 1.2rem;
  }
`,we=()=>{const[e,r]=(0,t.useState)("financial");return(0,g.jsxs)(fe,{children:[(0,g.jsxs)(ve,{children:[(0,g.jsx)("h1",{children:"An\xe1lisis"}),(0,g.jsx)("p",{children:"Visualiza, analiza y recibe recomendaciones personalizadas basadas en tus datos financieros"})]}),(0,g.jsxs)(be,{children:[(0,g.jsxs)(je,{active:"financial"===e,onClick:()=>r("financial"),children:[(0,g.jsx)(o.vQY,{})," An\xe1lisis Hist\xf3rico"]}),(0,g.jsxs)(je,{active:"predictive"===e,onClick:()=>r("predictive"),children:[(0,g.jsx)(o.ARf,{})," Predicciones"]}),(0,g.jsxs)(je,{active:"recommendations"===e,onClick:()=>r("recommendations"),children:[(0,g.jsx)(o.mEP,{})," Recomendaciones"]})]}),(()=>{switch(e){case"financial":default:return(0,g.jsx)(k,{});case"predictive":return(0,g.jsx)(K,{});case"recommendations":return(0,g.jsx)(ye,{})}})()]})}}}]);
//# sourceMappingURL=620.98ff06b9.chunk.js.map