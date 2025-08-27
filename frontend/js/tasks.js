const taskList = document.getElementById("task-list");
const logoutBtn = document.getElementById("logout");
const newTaskBtn = document.getElementById("new-task");
const searchInput = document.getElementById("search-input");

// Carregar tarefas do LocalStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "todas"; // padrão
let searchQuery = "";

// Filtrar por status
function setFilter(filtro) {
  currentFilter = filtro;
  renderTasks();
}

// Escutar digitação na barra de pesquisa
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase();
  renderTasks();
});

// Renderizar lista de tarefas
function renderTasks() {
  taskList.innerHTML = "";
  const hoje = new Date().toISOString().split("T")[0];

  tasks
    .filter(task => {
      // Filtrar por status
      if (currentFilter !== "todas" && task.status !== currentFilter) return false;
      // Filtrar por pesquisa
      if (searchQuery && !task.name.toLowerCase().includes(searchQuery)) return false;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");

      // Classe de status
      let statusClass = "";
      if (task.status === "pendente") statusClass = "status-pendente";
      if (task.status === "andamento") statusClass = "status-andamento";
      if (task.status === "concluida") statusClass = "status-concluida";

      // Verificar se está vencida
      let vencidaClass = "";
      if (task.date < hoje && task.status !== "concluida") {
        vencidaClass = "vencida";
      }

      li.classList.add(vencidaClass);

      li.innerHTML = `
        <span>
          <strong>${task.name}</strong> - 
          <span class="${statusClass}">${task.status}</span> - 
          📅 ${task.date}
        </span>
        <button onclick="editTask(${index})">Editar</button>
        <button onclick="deleteTask(${index})">Excluir</button>
      `;
      taskList.appendChild(li);
    });
}

// Abrir formulário para criar nova tarefa
newTaskBtn.addEventListener("click", () => {
  window.location.href = "task-form.html";
});

// Editar tarefa
function editTask(index) {
  window.location.href = `task-form.html?edit=${index}`;
}

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
;

