const content = document.querySelector(".contenuto-pagina");
const main = document.getElementsByTagName("main");
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
  window.location.href = "./login.html";
} else {
  const title = document.createElement("h2");

  title.textContent = `Benvenuto nella tua Dashboard, ${user.nome}!`;
  title.style.fontFamily = "Montserrat";
  title.style.fontSize = "23px";
  content.appendChild(title);
  const info = document.createElement("div");
  info.innerHTML = `
  <button class="form-btn credenziali" onclick="window.location.href='CambiaCredenziali.html'">Cambia Credenziali</button>
  <p><strong>Nome:</strong> ${user.nome}</p>
  <p><strong>Cognome:</strong> ${user.cognome}</p>
  <p><strong>Email:</strong> ${user.email}</p>
`;
  info.style.fontFamily = "Montserrat";
  content.appendChild(info);
  const logout = document.createElement("button");
  logout.textContent = "Logout";
  logout.className = "form-btn";
  logout.style.width = "200px";
  logout.addEventListener("click", () => {
    Toastify({
      text: "LOGOUT EFFETTUATO CON SUCCESSO!",
      duration: 2000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
    localStorage.removeItem("user");
    setTimeout(() => {
      window.location.href = "../auth/login.html";
    }, 2000);
  });
  content.appendChild(logout);
}
