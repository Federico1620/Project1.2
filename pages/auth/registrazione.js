console.log("JS caricato");
const formRegistrazione = document.getElementById("registrazione-form");
console.log("Form trovato:", formRegistrazione);
const inputNome = document.getElementById("nome");
const inputCognome = document.getElementById("cognome");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

const users = JSON.parse(localStorage.getItem("users")) || [];

formRegistrazione.addEventListener("submit", (event) => {
  console.log("Submit intercettato");
  registrazione(event);
});
function registrazione(event) {
  event.preventDefault();
  const nome = inputNome.value.trim();
  const cognome = inputCognome.value.trim();
  const email = inputEmail.value.trim();
  const password = inputPassword.value.trim();
  const user = { nome, cognome, email, password };

  //CONTROLLO SU NOME E COGNOME, MINIMO 2 CARATTERI E SOLO LETTERE
  const nomeRegex = /^[a-zA-ZàèéìòùÀÈÉÌÒÙ' -]{2,}$/;
  if (!nomeRegex.test(nome)) {
    Toastify({
      text: "NOME NON VALIDO!",
      duration: 3000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
    return;
  }
  if (!nomeRegex.test(cognome)) {
    Toastify({
      text: "COGNOME NON VALIDO!",
      duration: 3000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
    return;
  }
  //CONTROLLO SULL ESISTENZA DEI CAMPI
  if (!nome || !cognome || !email || !password) {
    Toastify({
      text: "COMPILA TUTTI I CAMPI!",
      duration: 3000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
    return;
  }
  //CONTROLLO SULLA FORMA DELL'EMAIL (QUALCOSA@QUALCOSA.QUALCOSA)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Toastify({
      text: "EMAIL NON VALIDA",
      duration: 3000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
    return;
  }
  //CONTROLLO SULLA PASSWORD CON REGOLE SPECIFICHE
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passRegex.test(password)) {
    Toastify({
      text: "LA PASSWORD DEVE ESSERE MINIMO DI 8 CARATTERI, MINIMO UNA MAIUSCOLA, UNA MINUSCOLA E UN NUMERO!",
      duration: 4000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
    return;
  }
  const userExisit = users.find((user) => user.email === email);
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
