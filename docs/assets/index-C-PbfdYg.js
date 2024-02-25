(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const n of d.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function l(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function i(o){if(o.ep)return;o.ep=!0;const d=l(o);fetch(o.href,d)}})();let y;const L=new Uint8Array(16);function S(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(L)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function C(e,t=0){return r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]}const P=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:P};function E(e,t,l){if(w.randomUUID&&!t&&!e)return w.randomUUID();e=e||{};const i=e.random||(e.rng||S)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){l=l||0;for(let o=0;o<16;++o)t[l+o]=i[o];return t}return C(i)}class m{constructor(t){this.id=E(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"Completed",Pending:"Pending"},s={todos:[new m("Piedra del alma"),new m("Piedra del infinito"),new m("Piedra del tiempo"),new m("Piedra del poder"),new m("Piedra de la realidad")],filter:a.All},A=()=>{T()},T=()=>{if(localStorage.getItem("state")){const{todos:e,filter:t}=JSON.parse(localStorage.getItem("state"));s.todos=e,s.filter=t}},f=()=>{localStorage.setItem("state",JSON.stringify(s))},k=(e=a.All)=>{switch(e){case a.All:return[...s.todos];case a.Completed:return s.todos.filter(t=>t.done);case a.Pending:return s.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},x=e=>{if(!e)throw new Error("Description is required");s.todos.push(new m(e)),f()},I=e=>{s.todos=s.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},U=e=>{s.todos=s.todos.filter(t=>t.id!==e),f()},q=()=>{s.todos=s.todos.filter(e=>!e.done),f()},D=(e=a.All)=>{s.filter=e,f()},F=()=>s.filter,c={addTodo:x,deleteCompleted:q,deleteTodo:U,getCurrentFilter:F,getTodos:k,initStore:A,loadStore:T,setFilter:D,toggleTodo:I},M=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
        <ul class="filters">\r
            <li>\r
                <a class="selected filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`,O=e=>{const t=`  <div class="view">
                        <input class="toggle" type="checkbox" ${e.done?"checked":""}>
                        <label>${e.description}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="Create a TodoMVC template">`,l=document.createElement("li");return l.innerHTML=t,l.setAttribute("data-id",e.id),e.done&&l.classList.add("completed"),l};let b;const N=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error("Element does not exists");b.innerText=c.getTodos(a.Pending).length};let g;const V=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Errror("Element not found");g.innerHTML="",t.forEach(l=>{g.append(O(l))})},p={TodoList:".todo-list",NewTodoInput:"#new-todo-input",ClearCompleted:".clear-completed",Filters:".filtro",Pending:"#pending-count"},H=e=>{const t=()=>{const n=c.getTodos(c.getCurrentFilter());V(p.TodoList,n),N(p.Pending)};(()=>{const n=document.createElement("div");n.innerHTML=M,document.querySelector(e).append(n),t()})();const l=document.querySelector(p.NewTodoInput),i=document.querySelector(p.TodoList),o=document.querySelector(p.ClearCompleted),d=document.querySelectorAll(p.Filters);l.addEventListener("keyup",n=>{n.keyCode===13&&n.target.value.trim().lenght!==0&&(c.addTodo(n.target.value),t(),n.target.value="")}),i.addEventListener("click",n=>{const u=n.target.closest("[data-id]");c.toggleTodo(u.getAttribute("data-id")),t()}),i.addEventListener("click",n=>{if(n.target.getAttribute("class")==="destroy"){const u=n.target.closest("[data-id]");c.deleteTodo(u.getAttribute("data-id")),t()}}),o.addEventListener("click",n=>{c.deleteCompleted(),t()}),d.forEach(n=>{n.addEventListener("click",u=>{d.forEach(v=>v.classList.remove("selected")),u.target.classList.add("selected");let h=a.All;switch(u.target.text){case"Todos":h=a.All;break;case"Pendientes":h=a.Pending;break;case"Completados":h=a.Completed;break;default:h=a.All;break}c.setFilter(h),t()})})};c.initStore();H("#app");
