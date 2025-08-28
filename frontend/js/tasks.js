// Configuração da API (será usada quando criarmos o backend)
const API_BASE_URL = 'http://localhost:3000/api';

// Elementos do DOM
const taskList = document.getElementById('task-list');
const logoutBtn = document.getElementById('logout');
const newTaskBtn = document.getElementById('new-task');
const searchInput = document.getElementById('search-input');
const loading = document.getElementById('loading');
const emptyState = document.getElementById('empty-state');

// Estado da aplicação
let tasks = [];
let currentFilter = 'todas';
let searchQuery = '';

// Verificar autenticação
function checkAuth() {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!user || !token) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

// Função para mostrar/esconder loading
function showLoading(show = true) {
  loading.classList.toggle('hidden', !show);
}

// Função para mostrar mensagens
function showMessage(message, type = 'info') {
  // Remove mensagens anteriores
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;

  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    ${type === 'error'
      ? 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
      : type === 'success'
        ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
        : 'background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;'
    }
  `;

  document.body.appendChild(messageDiv);

  // Remove a mensagem após 3 segundos
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => messageDiv.remove(), 300);
    }
  }, 3000);
}

// Função para fazer requisições à API
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro na requisição');
    }

    return data;
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
}

// Carregar tarefas
async function loadTasks() {
  if (!checkAuth()) return;

  showLoading(true);

  try {
    // Por enquanto, carregar do localStorage (será substituído pela API)
    const storedTasks = localStorage.getItem('tasks');
    tasks = storedTasks ? JSON.parse(storedTasks) : [];

    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 500));

    renderTasks();
  } catch (error) {
    showMessage('Erro ao carregar tarefas: ' + error.message, 'error');
  } finally {
    showLoading(false);
  }
}

// Filtrar por status
function setFilter(filtro) {
  currentFilter = filtro;

  // Atualizar botões de filtro
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  renderTasks();
}

// Escutar digitação na barra de pesquisa
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase();
  renderTasks();
});

// Renderizar lista de tarefas
function renderTasks() {
  taskList.innerHTML = '';
  const hoje = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter(task => {
    // Filtrar por status
    if (currentFilter !== 'todas' && task.status !== currentFilter) return false;
    // Filtrar por pesquisa
    if (searchQuery && !task.name.toLowerCase().includes(searchQuery)) return false;
    return true;
  });

  // Mostrar estado vazio se não houver tarefas
  if (filteredTasks.length === 0) {
    taskList.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }

  taskList.classList.remove('hidden');
  emptyState.classList.add('hidden');

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    // Verificar se está vencida
    const isOverdue = task.date < hoje && task.status !== 'concluida';
    if (isOverdue) {
      li.classList.add('vencida');
    }

    // Formatar data
    const formattedDate = new Date(task.date).toLocaleDateString('pt-BR');

    li.innerHTML = `
      <div class="task-info">
        <div class="task-name">${task.name}</div>
        <div class="task-meta">
          <span class="status-badge status-${task.status}">${getStatusText(task.status)}</span>
          <span class="task-date">📅 ${formattedDate}</span>
          ${task.description ? `<span class="task-description">${task.description}</span>` : ''}
        </div>
      </div>
      <div class="task-actions">
        <button class="btn btn-secondary" onclick="editTask(${index})" title="Editar">
          ✏️ Editar
        </button>
        <button class="btn btn-danger" onclick="deleteTask(${index})" title="Excluir">
          🗑️ Excluir
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Obter texto do status
function getStatusText(status) {
  const statusMap = {
    'pendente': 'Pendente',
    'andamento': 'Em andamento',
    'concluida': 'Concluída'
  };
  return statusMap[status] || status;
}

// Abrir formulário para criar nova tarefa
newTaskBtn.addEventListener('click', () => {
  window.location.href = 'task-form.html';
});

// Editar tarefa
function editTask(index) {
  window.location.href = `task-form.html?edit=${index}`;
}

// Deletar tarefa
async function deleteTask(index) {
  if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
    return;
  }

  try {
    // Por enquanto, remover do localStorage (será substituído pela API)
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    showMessage('Tarefa excluída com sucesso!', 'success');
    renderTasks();
  } catch (error) {
    showMessage('Erro ao excluir tarefa: ' + error.message, 'error');
  }
}

// Verificar tarefas vencidas
function checkOverdueTasks() {
  const hoje = new Date().toISOString().split('T')[0];
  const overdueTasks = tasks.filter(task =>
    task.date < hoje && task.status !== 'concluida'
  );

  if (overdueTasks.length > 0) {
    showMessage(`Você tem ${overdueTasks.length} tarefa(s) vencida(s)!`, 'error');
  }
}

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
  if (checkAuth()) {
    loadTasks();
    checkOverdueTasks();
  }
});

// Adicionar estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .empty-state {
    text-align: center;
    padding: 40px 20px;
  }

  .empty-icon {
    font-size: 4em;
    margin-bottom: 20px;
    opacity: 0.5;
  }

  .empty-state h3 {
    color: #666;
    margin-bottom: 10px;
  }

  .empty-state p {
    color: #999;
    margin-bottom: 20px;
  }

  .task-description {
    color: #666;
    font-size: 0.9em;
    font-style: italic;
  }

  body.dark .empty-state h3 {
    color: #b0b0b0;
  }

  body.dark .empty-state p {
    color: #888;
  }

  body.dark .task-description {
    color: #b0b0b0;
  }
`;
document.head.appendChild(style);

