// Configuração da API (será usada quando criarmos o backend)
const API_BASE_URL = 'http://localhost:3000/api';

// Elementos do DOM
const form = document.getElementById('task-form');
const cancelBtn = document.getElementById('cancel');
const loading = document.getElementById('loading');
const formTitle = document.getElementById('form-title');

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

// Carregar tarefas do LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Pegar parâmetro da URL (caso seja edição)
const urlParams = new URLSearchParams(window.location.search);
const editIndex = urlParams.get('edit');

// Se for edição, carregar os dados no formulário
if (editIndex !== null) {
  const task = tasks[editIndex];
  if (task) {
    formTitle.textContent = '✏️ Editar Tarefa';
    document.getElementById('task-name').value = task.name || '';
    document.getElementById('task-description').value = task.description || '';
    document.getElementById('task-status').value = task.status || 'pendente';
    document.getElementById('task-priority').value = task.priority || 'media';
    document.getElementById('task-date').value = task.date || '';
    document.getElementById('task-time').value = task.time || '';
    document.getElementById('task-notification').checked = task.notification || false;
  } else {
    showMessage('Tarefa não encontrada!', 'error');
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 2000);
  }
}

// Definir data mínima como hoje
document.getElementById('task-date').min = new Date().toISOString().split('T')[0];

// Validações
function validateForm() {
  const name = document.getElementById('task-name').value.trim();
  const date = document.getElementById('task-date').value;

  if (!name) {
    showMessage('Por favor, insira o nome da tarefa', 'error');
    return false;
  }

  if (!date) {
    showMessage('Por favor, selecione uma data de vencimento', 'error');
    return false;
  }

  // Verificar se a data não é anterior a hoje
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    showMessage('A data de vencimento não pode ser anterior a hoje', 'error');
    return false;
  }

  return true;
}

// Salvar tarefa
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!checkAuth()) return;
  if (!validateForm()) return;

  showLoading(true);

  try {
    const taskData = {
      name: document.getElementById('task-name').value.trim(),
      description: document.getElementById('task-description').value.trim(),
      status: document.getElementById('task-status').value,
      priority: document.getElementById('task-priority').value,
      date: document.getElementById('task-date').value,
      time: document.getElementById('task-time').value || null,
      notification: document.getElementById('task-notification').checked,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Por enquanto, salvar no localStorage (será substituído pela API)
    if (editIndex !== null) {
      // Edição
      tasks[editIndex] = { ...tasks[editIndex], ...taskData };
      showMessage('Tarefa atualizada com sucesso!', 'success');
    } else {
      // Nova tarefa
      taskData.id = Date.now(); // ID temporário
      tasks.push(taskData);
      showMessage('Tarefa criada com sucesso!', 'success');
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Redirecionar após 1 segundo
    setTimeout(() => {
      window.location.href = 'home.html';
    }, 1000);

  } catch (error) {
    showMessage('Erro ao salvar tarefa: ' + error.message, 'error');
  } finally {
    showLoading(false);
  }
});

// Cancelar
cancelBtn.addEventListener('click', () => {
  if (confirm('Tem certeza que deseja cancelar? As alterações serão perdidas.')) {
    window.location.href = 'home.html';
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

  .form-group input[type="checkbox"] {
    width: auto;
    margin-right: 10px;
  }

  .form-group label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .form-group label input[type="checkbox"] {
    margin-right: 10px;
  }
`;
document.head.appendChild(style);

// Verificar autenticação ao carregar a página
document.addEventListener('DOMContentLoaded', checkAuth);
