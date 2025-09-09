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

  if (userExisit) {
    Toastify({
      text: "UTENTE GIA INSCRITTO!",
      duration: 3000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
  } else {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    inputNome.value = "";
    inputCognome.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
    Toastify({
      text: "UTENTE REGISTRATO CON SUCCESSO!",
      duration: 3000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
    setTimeout(() => {
      window.location.href = "../auth/login.html";
    }, 2000);
  }
}
