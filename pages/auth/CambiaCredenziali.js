const userLoggato = JSON.parse(localStorage.getItem("user"));
const emailCredenziali = document.getElementById("email");
const passwordNuova = document.getElementById("new-password");
const passwordConferma = document.getElementById("confirm-password");
const buttonCredenziali = document.getElementById("btn-credenziali");
buttonCredenziali.addEventListener("click", (e) => {
  e.preventDefault();
  if (emailCredenziali.value !== userLoggato.email) {
    Toastify({
      text: "EMAIL NON ESISTE!",
      duration: 2000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
    return;
  }
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passRegex.test(passwordNuova.value)) {
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
  if (passwordNuova.value !== passwordConferma.value) {
    Toastify({
      text: "PASSWORD NON COINCIDE!",
      duration: 2000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
    return;
  }
  if (
    emailCredenziali.value === userLoggato.email &&
    passwordNuova.value === passwordConferma.value
  ) {
    Toastify({
      text: "CREDENZIALI CAMBITE CON SUCCESSO!",
      duration: 2000,
      close: true,
      className: "my-toast",
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, red, black)",
    }).showToast();
    userLoggato.password = passwordNuova.value;
    localStorage.setItem("user", JSON.stringify(userLoggato));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.email === userLoggato.email);
    if (index !== -1) {
      users[index].password = passwordNuova.value;
    }
    localStorage.setItem("users", JSON.stringify(users));
    setTimeout(() => {
      window.location.href = "../auth/dashboard.html";
    }, 2000);
  }
});
