const form = document.getElementById("login-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simulação de login (depois será via API)
  if (username === "admin" && password === "123") {
    localStorage.setItem("loggedUser", username);
    window.location.href = "home.html";
  } else {
    alert("Usuário ou senha incorretos!");
  }
});
