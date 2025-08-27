const taskList = document.getElementById("task-list");
const logoutBtn = document.getElementById("logout");
const newTaskBtn = document.getElementById("new-task");

// Carregar tarefas do LocalStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Renderizar lista de tarefas
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        <strong>${task.name}</strong> - 
        <em>${task.status}</em> - 
        📅 ${task.date}
      </span>
      <button onclick="editTask(${index})">Editar</button>
      <button onclick="deleteTask(${index})">Excluir</button>
    `;
    taskList.appendChild(li);
  });
}

// Criar nova tarefa → abre o formulário
newTaskBtn.addEventListener("click", () => {
  window.location.href = "task-form.html";
});

// Editar tarefa
function editTask(index) {
  window.location.href = `task-form.html?edit=${index}`;
}

// Criar nova tarefa
newTaskBtn.addEventListener("click", () => {
  const taskName = prompt("Digite a nova tarefa:");
  if (taskName) {
    tasks.push(taskName);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
});

// Deletar tarefa
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "index.html";
});

// Iniciar
renderTasks();
