const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const AddBtn = document.getElementById("add-btn");
const EditBtn = document.getElementById("edit-btn");
EditBtn.style.display = "none";

const todos = [];
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

AddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todo = todoInput.value.trim();
  todos.push(todo);

  //rendering
  renderTodos();

  //clearing inputs
  todoInput.value = "";
  console.log(todos);
}

function renderTodos() {
  todoList.innerHTML = "";
  console.log(todos);
  todos.map((todo, index) => {
    const list = document.createElement("li");
    const task = document.createElement("span");
    const edit = document.createElement("button");
    const delet = document.createElement("button");

    task.innerText = todo;
    edit.innerText = "✏️";
    delet.innerText = "❌";
    list.appendChild(task);
    list.appendChild(edit);
    list.appendChild(delet);

    todoList.appendChild(list);

    list.addEventListener("click", (e) => {
      checkEditDel(index, e.target);
    });
  });
}

function checkEditDel(index, e) {
  console.log(index, e.textContent);

  if (e.textContent === "✏️") {
    updateEdited(index);
    renderTodos();
  } else {
    todos.splice(index, 1);
    renderTodos();
  }
}

function updateEdited(index) {
  todoInput.focus();
  todoInput.value = todos[index];
  AddBtn.style.display = "none";
  EditBtn.style.display = "inline-block";

  EditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(todos);
    todos[index] = todoInput.value;
    AddBtn.style.display = "inline-block";
    EditBtn.style.display = "none";
  });
}


