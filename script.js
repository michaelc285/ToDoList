const input = document.querySelector("#task-input"); // input
const list = document.querySelector("#list"); //ul
const btnAll = document.querySelector("#btn-all"); // Button - All
const btnActive = document.querySelector("#btn-active"); // Button -Active
const btnCompleted = document.querySelector("#btn-complete"); // Button - Completed
const dateElement = document.querySelector("#date");
const countSpan = document.querySelector("#itemCount");
const clear = document.querySelector(".clear");

const TICK = "fa-check-circle";
const EMPTY = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let taskList, id;

let data = localStorage.getItem("TASK");

function loadList(array) {
  array.forEach(item => nodeAdd(item));
}

if (data) {
  taskList = JSON.parse(data);
  id = taskList.length;
  loadList(taskList);
  itemCount();
} else {
  taskList = [];
  id = 0;
  itemCount();
}

// Show todays date
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//Add new node
function nodeAdd(task) {
  if (task.trash) {
    return;
  }

  const CLEAR = task.clear ? TICK : EMPTY;
  const LINE = task.clear ? LINE_THROUGH : "";

  const li = `<li class="item">
                <i class="fa ${CLEAR} co" job="complete" id="${task.id}"></i>
                <p class="text ${LINE}">${task.content}</p>
                <i class="fa fa-times-circle de" job="delete" id="${task.id}"></i>
              </li>
                `;

  list.insertAdjacentHTML("beforeend", li);
}

//Add new task
input.addEventListener("keyup", e => {
  if (e.keyCode === 13) {
    const task = input.value;

    if (task) {
      let newTask = {
        id: id,
        content: task,
        clear: false,
        trash: false
      };

      taskList.push(newTask);
      nodeAdd(newTask);

      localStorage.setItem("TASK", JSON.stringify(taskList));
      id++;
    }
    input.value = "";
  }
  itemCount();
});

//Click button -  All
btnAll.addEventListener("click", () => {
  removeAll();
  taskList.filter(task => task.trash !== true).forEach(task => nodeAdd(task));
});

//Click button - Active
btnActive.addEventListener("click", () => {
  removeAll();
  taskList
    .filter(task => task.clear === false && task.trash !== true)
    .forEach(task => nodeAdd(task));
  itemCount();
});

//Click button - Completed
btnCompleted.addEventListener("click", () => {
  removeAll();
  taskList
    .filter(task => task.clear === true && task.trash !== true)
    .forEach(task => nodeAdd(task));
  itemCount();
});

list.addEventListener("click", function(e) {
  const element = event.target;
  const job = element.attributes.job.value;
  if (job == "delete") {
    //remove
    removeTask(element);
  } else if (job == "complete") {
    //complete
    completeTask(element);
  }
  itemCount();
});

function itemCount() {
  let count = taskList.filter(
    task => task.clear === false && task.trash !== true
  );
  console.log(count.length);
  const string =
    count.length < 2
      ? `${count.length} item left`
      : `${count.length} items left`;

  countSpan.innerHTML = string;
}

function removeTask(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  taskList[element.id].trash = true;
}

function completeTask(element) {
  element.classList.toggle(TICK);
  element.classList.toggle(EMPTY);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  taskList[element.id].clear = taskList[element.id].clear ? false : true;
}

//Remove all node
function removeAll() {
  while (list.firstChild) {
    list.removeChild(list.lastChild);
  }
}

// clear the local storage
clear.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
});
