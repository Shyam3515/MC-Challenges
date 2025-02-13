const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoForm = document.getElementById("todo-form");
const AddBtn = document.getElementById("add-btn");
const EditBtn = document.getElementById("edit-btn");
EditBtn.style.display = "none";

const todos = [];
// Prevent form submission on "Enter"
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

AddBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todo = todoInput.value.trim();
  if (todo === "") return; // Prevent adding empty todos
  todos.push(todo);

  //rendering
  renderTodos();

  //clearing inputs
  todoInput.value = "";
}
function renderTodos() {
  todoList.innerHTML = ""; // Clear the list
  console.log(todos);
  todos.map((todo, index) => {
    const list = document.createElement("li");
    const task = document.createElement("span");
    const edit = document.createElement("button");
    const delet = document.createElement("button");

    // Set content
    task.innerText = todo;
    edit.innerText = "✏️";
    delet.innerText = "❌";

    // Append elements
    list.appendChild(task);
    list.appendChild(edit);
    list.appendChild(delet);

    todoList.appendChild(list);

    // Attach specific event listeners
    edit.addEventListener("click", () => checkEditDel(index, edit));
    delet.addEventListener("click", () => checkEditDel(index, delet));
  });
}

function checkEditDel(index, button) {
  console.log(index, button);
  if (button.innerText === "✏️") {
    updateEdited(index);
  } else {
    todos.splice(index, 1); // Remove the task
    renderTodos(); // Re-render the list
  }
}

function updateEdited(index) {
  todoInput.focus();
  todoInput.value = todos[index];
  AddBtn.style.display = "none";
  EditBtn.style.display = "inline-block";

  // Remove previous listeners and add a new one
  //   const newEditBtn = EditBtn.cloneNode(true); // Clone the button to remove old listeners
  //   EditBtn.replaceWith(newEditBtn); // Replace the button
  EditBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission
    todos[index] = todoInput.value.trim(); // Update the task
    if (todos[index] === "") return; // Prevent empty updates
    AddBtn.style.display = "inline-block";
    EditBtn.style.display = "none";
    todoInput.value = ""; // Clear the input field
    renderTodos(); // Re-render the updated list
  });
}
