const content = document.querySelector(".contenuto-pagina");
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "/pages/auth/login.html";
} else {
  const nome = document.createElement("p");
  const cognome = document.createElement("p");
  const email = document.createElement("p");
  nome.innerText = user.nome;
  cognome.innerText = user.cognome;
  email.innerText = user.email;
  content.appendChild(nome);
  content.appendChild(cognome);
  content.appendChild(email);
  const logout = document.createElement("button");
  logout.addEventListener("click", () => localStorage.removeItem("user"));
  content.appendChild(logout);
}
