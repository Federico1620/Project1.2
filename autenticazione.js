const user = JSON.parse(localStorage.getItem("user")) || null;

const buttonLogin = document.getElementById("login-button");

buttonLogin.addEventListener("click", () => {
  if (!user) {
    window.location.replace("/Project1.2/pages/auth/login.html");
  } else {
    window.location.replace("/Project1.2/pages/auth/dashboard.html");
  }
});
