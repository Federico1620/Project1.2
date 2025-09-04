const user = JSON.parse(localStorage.getItem("user")) || null;

const buttonLogin = document.getElementById("login-button");

buttonLogin.addEventListener("click", () => {
  if (!user) {
    window.location.replace("/Project1.2/pages/auth/login.html");
  } else {
    window.location.replace("/Project1.2/pages/auth/dashboard.html");
  }
});

function getUserKey() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return null;
  return `preferiti_${user.email}`; // SOLO SE LOGGATO CARICA PREFERITI
}

function loadFavorites() {
  const key = getUserKey();
  if (!key) return []; // RICERCA IN BASE ALL'UTENTE
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveFavorites(favorites) {
  const key = getUserKey();
  if (!key) return; // SE NON LOGGATO NON SALVARE I PREFERITI
  localStorage.setItem(key, JSON.stringify(favorites));
}
