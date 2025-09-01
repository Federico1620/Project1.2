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
  const message = document.createElement("p");
  message.textContent = "";
  if (userExist) {
    message.textContent = "login effettuato con successo";
    formLogin.appendChild(message);
    localStorage.setItem("user", JSON.stringify(userExist));
    setTimeout(() => {
      window.location.href = "/pages/auth/dashboard.html";
    }, 2000);
  } else {
    message.textContent = "credenziali errate!";
    formLogin.appendChild(message);
  }
}
