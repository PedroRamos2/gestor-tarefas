// Configuração da API (será usada quando criarmos o backend)
const API_BASE_URL = 'http://localhost:3000/api';

// Elementos do DOM
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const loading = document.getElementById('loading');

// Função para alternar entre formulários
function toggleForms() {
  loginForm.classList.toggle('hidden');
  registerForm.classList.toggle('hidden');
  loginLink.classList.toggle('hidden');
  registerLink.classList.toggle('hidden');
}

// Função para mostrar/esconder loading
function showLoading(show = true) {
  loading.classList.toggle('hidden', !show);
}

// Função para mostrar mensagens de erro/sucesso
function showMessage(message, type = 'error') {
  // Remove mensagens anteriores
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = `message message-${type}`;
  messageDiv.textContent = message;

  // Adiciona estilos inline para a mensagem
  messageDiv.style.cssText = `
    padding: 12px 20px;
    border-radius: 8px;
    margin: 15px 0;
    font-weight: 500;
    text-align: center;
    ${type === 'error'
      ? 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
      : 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
    }
  `;

  // Insere a mensagem após o título do formulário ativo
  const activeForm = loginForm.classList.contains('hidden') ? registerForm : loginForm;
  const title = activeForm.querySelector('h2');
  title.parentNode.insertBefore(messageDiv, title.nextSibling);

  // Remove a mensagem após 5 segundos
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Validações
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateName(name) {
  return name.trim().length >= 2;
}

function validatePhone(phone) {
  if (!phone) return true; // Telefone é opcional
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Função para fazer requisições à API
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
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

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  // Validações
  if (!validateEmail(email)) {
    showMessage('Por favor, insira um email válido');
    return;
  }

  if (!validatePassword(password)) {
    showMessage('A senha deve ter pelo menos 6 caracteres');
    return;
  }

  showLoading(true);

  try {
    // Por enquanto, simulação de login (será substituído pela API)
    if (email === 'admin@teste.com' && password === '123456') {
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Salvar dados do usuário
      const userData = {
        id: 1,
        name: 'Administrador',
        email: email,
        token: 'fake-jwt-token-' + Date.now()
      };

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);

      showMessage('Login realizado com sucesso!', 'success');

      // Redirecionar após 1 segundo
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 1000);
    } else {
      throw new Error('Email ou senha incorretos');
    }
  } catch (error) {
    showMessage(error.message);
  } finally {
    showLoading(false);
  }
});

// Cadastro
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('register-name').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  const phone = document.getElementById('register-phone').value.trim();

  // Validações
  if (!validateName(name)) {
    showMessage('O nome deve ter pelo menos 2 caracteres');
    return;
  }

  if (!validateEmail(email)) {
    showMessage('Por favor, insira um email válido');
    return;
  }

  if (!validatePassword(password)) {
    showMessage('A senha deve ter pelo menos 6 caracteres');
    return;
  }

  if (password !== confirmPassword) {
    showMessage('As senhas não coincidem');
    return;
  }

  if (!validatePhone(phone)) {
    showMessage('Por favor, insira um número de telefone válido');
    return;
  }

  showLoading(true);

  try {
    // Por enquanto, simulação de cadastro (será substituído pela API)
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simular sucesso no cadastro
    showMessage('Conta criada com sucesso! Faça login para continuar.', 'success');

    // Limpar formulário e voltar para login
    setTimeout(() => {
      registerForm.reset();
      toggleForms();
    }, 2000);

  } catch (error) {
    showMessage(error.message);
  } finally {
    showLoading(false);
  }
});

// Verificar se usuário já está logado
function checkAuth() {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (user && token) {
    // Se estiver na página de login e já logado, redirecionar
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
      window.location.href = 'home.html';
    }
  } else {
    // Se não estiver logado e não estiver na página de login, redirecionar
    if (!window.location.pathname.includes('index.html') && !window.location.pathname.endsWith('/')) {
      window.location.href = 'index.html';
    }
  }
}

// Logout
function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

// Verificar autenticação ao carregar a página
document.addEventListener('DOMContentLoaded', checkAuth);

// Expor função de logout globalmente
window.logout = logout;
