const formLogin = document.getElementById("login-form");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const users = JSON.parse(localStorage.getItem("users")) || [];
formLogin.addEventListener("submit", (event) => login(event));
function login(event) {
  event.preventDefault();
  const userExist = users.find(
    (x) =>
      x.email.toLowerCase() === inputEmail.value.toLowerCase() &&
      x.password === inputPassword.value
  );
  if (userExist) {
    Toastify({
      text: "LOGIN EFFETTUATO CON SUCCESSO!",
      duration: 3000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
    localStorage.setItem("user", JSON.stringify(userExist));
    setTimeout(() => {
      window.location.href = "../auth/dashboard.html";
    }, 2000);
  } else {
    Toastify({
      text: "CREDENZIALI ERRATE!",
      duration: 2000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
    formLogin.appendChild(message);
  }
}
