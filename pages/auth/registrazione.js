const formRegistrazione = document.getElementById("registrazione-form");
const inputNome = document.getElementById("nome");
const inputCognome = document.getElementById("cognome");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

const users = JSON.parse(localStorage.getItem("users")) || [];

formRegistrazione.addEventListener("submit", (event) => registrazione(event));
function registrazione(event) {
  event.preventDefault();
  const user = {
    nome: inputNome.value,
    cognome: inputCognome.value,
    email: inputEmail.value,
    password: inputPassword.value,
  };
  const userExisit = users.find((user) => user.email === inputEmail.value);
  const message = document.createElement("p");
  message.textContent = "";
  if (userExisit) {
    message.textContent = "Utente già iscritto!";
    formRegistrazione.appendChild(message);
  } else {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    inputNome.value = "";
    inputCognome.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
    message.textContent = "Utente registrato con successo!";
    formRegistrazione.appendChild(message);
    setTimeout(() => {
      window.location.href = "/pages/auth/login.html";
    }, 2000);
  }
}
