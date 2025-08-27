const form = document.getElementById("task-form");
const cancelBtn = document.getElementById("cancel");

// Carregar tarefas do LocalStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Pegar parâmetro da URL (caso seja edição)
const urlParams = new URLSearchParams(window.location.search);
const editIndex = urlParams.get("edit");

// Se for edição, carregar os dados no formulário
if (editIndex !== null) {
  const task = tasks[editIndex];
  document.getElementById("form-title").textContent = "Editar Tarefa";
  document.getElementById("task-name").value = task.name;
  document.getElementById("task-status").value = task.status;
  document.getElementById("task-date").value = task.date;
}

// Salvar tarefa
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskData = {
    name: document.getElementById("task-name").value,
    status: document.getElementById("task-status").value,
    date: document.getElementById("task-date").value
  };

  if (editIndex !== null) {
    tasks[editIndex] = taskData;
  } else {
    tasks.push(taskData);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  window.location.href = "home.html";
});

// Cancelar
cancelBtn.addEventListener("click", () => {
  window.location.href = "home.html";
});
