let myTaskList = document.getElementById("myTaskList");
let taskInput = document.getElementById("txtItem");
let save = document.getElementById("save");
let update = document.getElementById("update");
update.style.display = "none";

let todoListArray = [];
let count = 1;
let editTaskId;
taskHead();

let isLocalDataPresent = localStorage.getItem("todoTaskList");
if (isLocalDataPresent !== null) {
  todoListArray = JSON.parse(isLocalDataPresent);
  count = Math.max(0, ...todoListArray.map((task) => task.taskId)) + 1; // Update count
  renderTaskLists();
}

function taskHead() {
  if (todoListArray.length === 0) {
    let taskHead = document.createElement("h2");
    taskHead.classList.add("taskHead");
    taskHead.innerText = "No Tasks..!";
    myTaskList.appendChild(taskHead);
  }
}

function saveTask() {
  //   debugger;
  let taskName = taskInput.value.trim();
  let todoObject = {
    taskId: count++,
    taskName,
  };
  todoListArray.push(todoObject);
  console.log(todoListArray);

  // local storage
  localStorage.setItem("todoTaskList", JSON.stringify(todoListArray));

  taskInput.value = "";
  renderTaskLists();
}

function renderTaskLists() {
  myTaskList.innerHTML = "";

  for (let index = 0; index < todoListArray.length; index++) {
    let dynamicLi = document.createElement("li");
    dynamicLi.classList.add("task");
    let myLabel = document.createElement("label");
    myLabel.textContent = todoListArray[index].taskName;
    dynamicLi.appendChild(myLabel);

    // creating dynamic settings
    let myDiv = document.createElement("div");
    myDiv.classList.add("settings");
    // Edit Icon
    let editIcon = document.createElement("span");
    editIcon.classList.add("edit");
    editIcon.innerText = "✏️";
    editIcon.setAttribute("data-task-id", todoListArray[index].taskId);
    editIcon.addEventListener("click", editTask);

    // Delete Icon
    let deleteIcon = document.createElement("span");
    deleteIcon.classList.add("delete");
    deleteIcon.innerText = "❌";
    deleteIcon.setAttribute("data-task-id", todoListArray[index].taskId); // Fix: Use setAttribute
    deleteIcon.addEventListener("click", deleteTask);

    myDiv.appendChild(editIcon);
    myDiv.appendChild(deleteIcon);
    dynamicLi.appendChild(myDiv);

    myTaskList.appendChild(dynamicLi);
  }
}

function editTask(event) {
  let taskId = Number(event.target.getAttribute("data-task-id")); //convert to number
  let obj = todoListArray.find((m) => m.taskId === taskId);

  if (!obj) {
    console.error("Task not found!");
    return;
  }

  console.log("Object: ", obj);
  taskInput.value = obj.taskName;
  editTaskId = todoListArray.findIndex((task) => task.taskId === taskId);
  console.log(editTaskId);
  save.style.display = "none";
  update.style.display = "block";
}

function deleteTask(event) {
  //   debugger;
  let taskId = Number(event.target.getAttribute("data-task-id")); //convert to number
  let index = todoListArray.findIndex((m) => m.taskId === taskId);
  todoListArray.splice(index, 1);
  // local storage
  localStorage.setItem("todoTaskList", JSON.stringify(todoListArray));
  renderTaskLists();
  taskHead();
}

function removeAll() {
  todoListArray.splice(0);
  localStorage.removeItem("todoTaskList"); // Clear storage
  renderTaskLists();
  taskHead();
}

function updateTask() {
  console.log(editTaskId, todoListArray[editTaskId]);
  todoListArray[editTaskId].taskName = taskInput.value.trim();
  taskInput.value = "";
  // local storage
  localStorage.setItem("todoTaskList", JSON.stringify(todoListArray));
  console.log(todoListArray);
  save.style.display = "block";
  update.style.display = "none";
  renderTaskLists();
}
