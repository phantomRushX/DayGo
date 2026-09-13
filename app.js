let tasks=[
 {text:"Finish Maths homework",done:false,tag:"School"},
 {text:"Study geometry",done:false,tag:"Study"},
 {text:"Pack school bag",done:true,tag:"Personal"},
 {text:"Clean bedroom",done:false,tag:"Home"}
];

const dateEl=document.getElementById("date");
dateEl.textContent=new Date().toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long",year:"numeric"});

function renderTasks(){
 const targets=[document.getElementById("taskList"),document.getElementById("allTasks")];
 targets.forEach((target,index)=>{
  if(!target)return;
  target.innerHTML="";
  tasks.forEach((t,i)=>{
   const row=document.createElement("div");row.className="task"+(t.done?" done":"");
   row.innerHTML=`<input type="checkbox" ${t.done?"checked":""} onchange="toggleTask(${i})"><span>${t.text}</span><span class="tag">${t.tag}</span>`;
   target.appendChild(row);
  });
 });
 const left=tasks.filter(t=>!t.done).length;
 document.getElementById("taskCount").textContent=left;
 const done=tasks.filter(t=>t.done).length;
 document.getElementById("score").textContent=Math.round(done/tasks.length*100)+"%";
}
function toggleTask(i){tasks[i].done=!tasks[i].done;renderTasks()}
function showPage(id){
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));
 document.getElementById(id).classList.add("active-page");
 document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.page===id));
 const titles={home:"Good morning 👋",tasks:"Your tasks",calendar:"Your calendar",goals:"Your goals",achievements:"Your achievements",profile:"Your profile"};
 document.getElementById("pageTitle").textContent=titles[id];
}
document.querySelectorAll(".nav").forEach(n=>n.onclick=()=>showPage(n.dataset.page));
document.getElementById("quickAdd").onclick=()=>document.getElementById("modal").classList.add("show");
function closeModal(){document.getElementById("modal").classList.remove("show")}
function saveTask(){let v=document.getElementById("taskInput").value.trim();if(v){tasks.unshift({text:v,done:false,tag:"New"});document.getElementById("taskInput").value="";closeModal();renderTasks()}}
function addTask(){document.getElementById("modal").classList.add("show")}
const now=new Date(), monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
document.getElementById("month").textContent=monthNames[now.getMonth()]+" "+now.getFullYear();
const first=new Date(now.getFullYear(),now.getMonth(),1).getDay(), total=new Date(now.getFullYear(),now.getMonth()+1,0).getDate(), days=document.getElementById("days");
for(let i=0;i<first;i++)days.appendChild(document.createElement("div"));
for(let d=1;d<=total;d++){let x=document.createElement("div");x.textContent=d;if(d===now.getDate())x.className="today";days.appendChild(x)}
renderTasks();
function openCustomizer(){document.getElementById("customizer").classList.add("show")}
function closeCustomizer(){document.getElementById("customizer").classList.remove("show")}
function setAccent(color){document.documentElement.style.setProperty("--accent",color);document.documentElement.style.setProperty("--button",color);document.querySelectorAll(".add,.bar i").forEach(e=>e.style.background=color);localStorage.setItem("daygoAccent",color)}
function setTheme(theme){
 document.documentElement.classList.remove("dark");
 if(theme==="dark")document.documentElement.classList.add("dark");
 if(theme==="system" && window.matchMedia("(prefers-color-scheme: dark)").matches)document.documentElement.classList.add("dark");
 localStorage.setItem("daygoTheme",theme)
}
function toggleCompact(){document.body.classList.toggle("compact");localStorage.setItem("daygoCompact",document.body.classList.contains("compact"))}
function resetCustomization(){localStorage.removeItem("daygoAccent");localStorage.removeItem("daygoTheme");localStorage.removeItem("daygoCompact");location.reload()}
(function loadCustomization(){
 const a=localStorage.getItem("daygoAccent");if(a)setAccent(a);
 const t=localStorage.getItem("daygoTheme");if(t)setTheme(t);
 if(localStorage.getItem("daygoCompact")==="true")document.body.classList.add("compact");
})();
