console.log("ポートフォリオのJavaScriptが動きました。");
const contactButton=document.getElementById("contactButton");
const contactMessage=document.getElementById("contactMessage");

contactButton.addEventListener("click",function(){
contactMessage.textContent="お問い合わせありがとうございます。";
});

const todoInput=document.getElementById("todoInput");
const addTodo=document.getElementById("addTodo");
const todoList=document.getElementById("todoList");
addTodo.addEventListener("click",function(){
    const todoText=todoInput.value;
    if(todoText===""){
        return;
    }
    const li=document.createElement("li");
    const todoSpan=document.createElement("span");
    todoSpan.textContent=todoText;
    li.appendChild(todoSpan);
   
    const deleteButton=document.createElement("button");
    deleteButton.textContent="削除";
    li.appendChild(deleteButton);
    deleteButton.addEventListener("click",function(){
        li.remove();
        saveTodos();
    });

li.addEventListener("click",function(){
if(todoSpan.style.textDecoration==="line-through"){
    todoSpan.style.textDecoration="none";
}else{
    todoSpan.style.textDecoration="line-through";
}
saveTodos();
});

    todoList.appendChild(li);
    saveTodos();
    todoInput.value="";
});

function saveTodos(){
    const todos=[];
    todoList.querySelectorAll("li").forEach(function(li){
        todos.push({
            text:li.firstChild.textContent,
            completed:li.firstChild.style.textDecoration==="line-through"
        });
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadTodos(){
    const savedTodos=localStorage.getItem("todos");
    if(savedTodos){
        const todos=JSON.parse(savedTodos);
        todos.forEach(function(todo){
            const li=document.createElement("li");
            const todoSpan=document.createElement("Span");
            todoSpan.textContent=todo.text;
            li.appendChild(todoSpan);
            if(todo.completed){
                todoSpan.style.textDecoration="line-through";
            }
            const deleteButton=document.createElement("button");
            deleteButton.textContent="削除";
            li.appendChild(deleteButton);
            deleteButton.addEventListener("click",function(){
                li.remove();
                saveTodos();
            });

            li.addEventListener("click",function(){
                if(todoSpan.style.textDecoration==="line-through"){
                    todoSpan.style.textDecoration="none";
                }else{
                    todoSpan.style.textDecoration="line-through";
                };
                saveTodos();
            });
            todoList.appendChild(li);
        });
    }
}

loadTodos();