const input = document.querySelector("#task-input"); // input
const list = document.querySelector("#list"); //ul
const btnAll = document.querySelector("#btn-all"); // Button - All
const btnActive = document.querySelector("#btn-active"); // Button -Active
const btnCompleted = document.querySelector("#btn-complete"); // Button - Completed

const defaultText = "What need to be done?";
let index = 0;
let taskList = [];

//Add new node
let nodeAdd = task => {
  let newNode = document.createElement("li");
  newNode = document.createElement("li");
  newNode.className = "task";
  newNode.setAttribute("id", task.id);
  newNode.appendChild(document.createTextNode(task.content));
  list.appendChild(newNode);
};

//Remove all node
let remove = () => {
  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    input.value = defaultText;
  },
  false
);

input.addEventListener("blur", () => {
  input.value = defaultText;
  input.className = "input-default";
});

input.addEventListener("click", () => {
  input.value = "";
  input.className = "input-writing";
});

//Add new task
input.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
    let newTask = {
      id: index,
      clear: false,
      content: e.target.value
    };

    taskList.push(newTask);
    nodeAdd(newTask);
    index++;
  }
});

//Click button -  All
btnAll.addEventListener("click", () => {
  remove();
  taskList.forEach(task => nodeAdd(task));
});

//Click button - Active
btnActive.addEventListener("click", () => {
  remove();
  taskList.filter(task => task.clear === false).forEach(task => nodeAdd(task));
});

//Click button - Completed
btnCompleted.addEventListener("click", () => {
  remove();
  taskList.filter(task => task.clear === true).forEach(task => nodeAdd(task));
});
