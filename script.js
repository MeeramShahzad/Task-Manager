let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskContainer = document.getElementById("taskContainer");
const addTaskBtn = document.getElementById("addTaskBtn");
const themeToggle = document.getElementById("themeToggle");
function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks(filter = "all") {
taskContainer.innerHTML = "";
const filtered = tasks.filter(task => {
if (filter === "all") return true;
if (filter === "completed") return task.completed;
if (filter === "pending") return !task.completed;
});
filtered.forEach((task, index) => {
const card = document.createElement("div");
card.className = "col task-animated";
card.innerHTML = `
<div class="card p-3 ${task.completed ? 'completed-task' : ''}">
<h5>${task.title}</h5>
<p>Category: ${task.category}</p>
<p>Due: ${task.dueDate}</p>
<div class="badge ${task.completed ? 'badge-complete' : 'badge-pending'} text-center w-100 mb-2">
${task.completed ? 'Completed' : 'Pending'}
</div>
<div class="d-flex justify-content-between">
<button class="btn btn-success btn-sm" onclick="markComplete(${index})"><i class="bi bi-check2-circle"></i> Complete</button>
<button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editTask(${index})"><i class="bi bi-pencil-square"></i> Edit</button>
<button class="btn btn-danger btn-sm" onclick="deleteTask(${index})"><i class="bi bi-trash"></i> Delete</button>
</div>
</div>
`;
taskContainer.appendChild(card);
});
}
addTaskBtn.addEventListener("click", () => {
const title = document.getElementById("taskTitle").value.trim();
const category = document.getElementById("taskCategory").value.trim();
const date = document.getElementById("taskDate").value;
if (!title || !category || !date) return alert("Please fill all fields");
tasks.push({ title, category, dueDate: date, completed: false });
saveTasks();
renderTasks();
document.getElementById("taskTitle").value = "";
document.getElementById("taskCategory").value = "";
document.getElementById("taskDate").value = "";
});
function markComplete(index) {
tasks[index].completed = !tasks[index].completed;
saveTasks();
renderTasks();
}
function deleteTask(index) {
tasks.splice(index, 1);
saveTasks();
renderTasks();
}
function editTask(index) {
document.getElementById("editIndex").value = index;
document.getElementById("editTitle").value = tasks[index].title;
document.getElementById("editCategory").value = tasks[index].category;
document.getElementById("editDate").value = tasks[index].dueDate;
}
document.getElementById("saveEditBtn").addEventListener("click", () => {
const index = document.getElementById("editIndex").value;
tasks[index].title = document.getElementById("editTitle").value;
tasks[index].category = document.getElementById("editCategory").value;
tasks[index].dueDate = document.getElementById("editDate").value;
saveTasks();
renderTasks();
bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
});
document.querySelectorAll("[data-filter]").forEach(btn => {
btn.addEventListener("click", () => {
renderTasks(btn.getAttribute("data-filter"));
});
});
themeToggle.addEventListener("click", () => {
document.body.classList.toggle("dark-mode");
document.body.classList.toggle("light-mode");
themeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});
renderTasks();
