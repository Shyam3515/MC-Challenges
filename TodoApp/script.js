const todoContainer = document.querySelector(".todo-container");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-div");
const addBtn = document.getElementById("add-btn");
const editBtn = document.getElementById("update-btn");
editBtn.style.display = "none";

let storeTodos = localStorage.getItem("todos");
let todos = [];
let count = 1;
if (storeTodos !== null) {
  todos = JSON.parse(storeTodos);
  //hre map returns a new array of count values [1,2,3] and spreading them(0,1,2,3,..) for getting max element
  count = Math.max(0, ...todos.map((todo) => todo.count)) + 1;

  renderTodos();
}
let editId;

addBtn.addEventListener("click", (e) => {
  if (todoInput.value.trim() !== "") {
    const todoObj = {
      todo: todoInput.value,
      count: count++,
    };
    todos.push(todoObj);
    todoInput.value = "";

    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  } else {
    alert("Enter valid Input...");
  }
});

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todoObj) => {
    const dynamicLi = document.createElement("li");
    dynamicLi.textContent = todoObj.todo;
    dynamicLi.id = todoObj.count;
    //edit
    const editBtn = document.createElement("span");
    editBtn.id = todoObj.count;
    editBtn.innerText = "✏️";
    //delete
    const delBtn = document.createElement("span");
    delBtn.id = todoObj.count;
    delBtn.innerText = "❌";

    dynamicLi.appendChild(editBtn);
    dynamicLi.appendChild(delBtn);
    todoList.appendChild(dynamicLi);
    //event Delegation
    dynamicLi.addEventListener("click", (e) => {
      changeInputDiv(e);
    });
  });
}
todoContainer.appendChild(todoList);

//Based on ED checking...
function changeInputDiv(e) {
  console.log(e.target);
  if (e.target.innerText === "❌") {
    const todoObj = todos.find((obj) => e.target.id === obj.count);
    todos.splice(todoObj, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    renderTodos();
  } else if (e.target.innerText === "✏️") {
    editBtn.style.display = "block";
    addBtn.style.display = "none";

    editId = todos.findIndex((obj) => Number(e.target.id) === obj.count);
    todoInput.value = todos[editId].todo;
  }
}

editBtn.addEventListener("click", () => {
  updateInput(editId);
});
function updateInput(id) {
  todos[id].todo = todoInput.value;

  editBtn.style.display = "none";
  addBtn.style.display = "block";
  todoInput.value = "";

  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}
