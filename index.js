class TaskManager {
   constructor() {
     this.tasks = []
     this.counter = 0
     this.activeCounter = 0
     this.inputBox = document.getElementById("inputed_value")
     this.ulTag = document.getElementById("ul_tag")
     this.allTasks = document.getElementById("all_tasks")
     this.completedCounter = 0
     this.completedTasks = document.getElementById("completed_tasks")
     this.activeTasks = document.getElementById("active_tasks")
     this.initialize()
   }

   initialize() {
     this.inputBox.addEventListener("keydown", this.addTask.bind(this))
   }
 

   addTask(event) {
     if (event.key === "Enter") {
       const task = this.inputBox.value
       const newTask = new Task(task, this.ulTag, this.deleteTask.bind(this), this.markTaskAsDone.bind(this))
       this.tasks.push(newTask)
       this.counter++
       this.activeCounter++
       this.allTasks.textContent = this.counter
       this.activeTasks.textContent = this.activeCounter
       this.inputBox.value = ""
     }
   }
 
   deleteTask(task) {
     task.remove()
     this.tasks = this.tasks.filter((t) => t !== task)
     this.counter--
     this.activeCounter--
  
   }
  
   markTaskAsDone(task) {
     task.markAsDone()
     const doneTasks = this.tasks.filter((t) => t.done)
     this.completedTasks.textContent = doneTasks.length
     this.activeCounter--
     this.activeTasks.textContent = this.activeCounter
   }

   
 }
 
 class Task {
   constructor(text, parent, onDelete, onDone) {
     this.text = text
     this.parent = parent
     this.done = false
     this.liTag = document.createElement("li")
     this.icon = document.createElement("span")
     this.button = document.createElement("button")
     this.deletedCounter = 0
     this.onDelete = onDelete
     this.onDone = onDone
     this.initialize()
   }
 
   initialize() {
     this.icon.className = "material-symbols-outlined"
     this.icon.style.display = "none"
     this.liTag.textContent = this.text
     this.liTag.addEventListener("mouseenter", () => {
       this.icon.style.display = "inline"
     })
     this.liTag.addEventListener("mouseleave", () => {
       this.icon.style.display = "none"  
     })
     this.liTag.prepend(this.icon)
     this.button.setAttribute("type", "button")
     this.button.textContent = "Done!"
     this.button.addEventListener("click", () => {
       this.onDone(this)
     })
     this.liTag.prepend(this.button)
     this.parent.appendChild(this.liTag)
     this.icon.addEventListener("click", () => {
       this.onDelete(this)
     })
   }
 
   remove() {
     this.liTag.parentNode.removeChild(this.liTag)
   }
 
   markAsDone() {
     this.done = true
     this.liTag.style.textDecoration = "line-through"
     this.button.style.display = "none"
   }
 }
 
 const taskManager = new TaskManager()

