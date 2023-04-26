class Task {
  constructor(name) {
    this.name = name;
    this.done = false;

    Task.proxy.push(this);
  }

  static tasks = [];  

  static proxy = new Proxy(Task.tasks, {
    set(target, prop, value) {
      target[prop] = value;
      if (prop != "length") updateDOM(target);
      return true;
    },
    deleteProperty(target, prop) {
      delete target[prop];
      updateDOM(target);
      return true;
    },
  });

  static remove(task) {
    let arr = [...Task.tasks];
    let index;
    arr.find((t, i) => {
      if (t && t.name == task.name) index = i;
    });
    delete Task.proxy[index];
  }
}

//update DOM method
function updateDOM() {
  let list = document.getElementById("list");
  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }
  Task.tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.name;
    li.addEventListener("click", () => {
      Task.remove(task);
    });
    list.append(li);
  });
}

//bind input to create task
let taskInput = document.getElementById("task-input");
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    new Task(e.target.value);
    taskInput.value = "";
  }
});
