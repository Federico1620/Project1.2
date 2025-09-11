const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupYear = document.getElementById("popup-year");
const popupGenre = document.getElementById("popup-genre");
const popupRegia = document.getElementById("popup-regia");
const popupDescription = document.getElementById("popup-description");
const closeBtn = document.querySelector(".close-btn");
const divFilm = document.getElementById("film-container");
const user = JSON.parse(localStorage.getItem("user")) || null;
const preferitiClass = `preferiti`;

const genereMap = {
  Azione: "Action",
  Avventura: "Adventure",
  Animazione: "Animation",
  Biografico: "Biography",
  Commedia: "Comedy",
  Documentario: "Documentary",
  Drammatico: "Drama",
  Fantascienza: "Sci-Fi",
  Fantasy: "Fantasy",
  Giallo: "Mystery",
  Horror: "Horror",
  Musicale: "Music",
  Poliziesco: "Crime",
  Romantico: "Romance",
  Storico: "History",
  Thriller: "Thriller",
  Western: "Western",
  Guerra: "War",
  Sportivo: "Sport",
  Famiglia: "Family",
  Cortometraggio: "Short",
  "Cinema d’autore": "Art",
  Indipendente: "Indie",
};

const arrFilm = [
  "Inception",
  "Interstellar",
  "The Dark Knight",
  "The Godfather",
  "Pulp Fiction",
  "Fight Club",
  "The Matrix",
  "Forrest Gump",
  "The Lord of the Rings",
  "The Shawshank Redemption",
  "Gladiator",
  "Titanic",
  "Avatar",
  "Back to the Future",
  "Jurassic Park",
  "Star Wars",
  "Goodfellas",
  "The Avengers",
  "Iron Man",
  "Schindler's List",
];

let movieData = [];

function loadFavorites() {
  return JSON.parse(localStorage.getItem(`preferiti_${user.email}`)) || [];
}

function saveFavorites(array) {
  localStorage.setItem(`preferiti_${user.email}`, JSON.stringify(array));
}

async function renderFilm(titolo) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=8e73d393&t=${titolo}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// async function popolaFilm(array) {
//   const promises = array.map((titolo) => renderFilm(titolo));
//   return await Promise.all(promises);
// }

function renderCard(array) {
  divFilm.innerHTML = "";
  if (array.length === 0) {
    divFilm.innerHTML = "<p>Nessun film trovato.</p>";
    return;
  }

  array.forEach((film) => {
    const card = `
      <div class="card">
        <div class="card-header" data-title="${film.Title}">
          <img src="${film.Poster}" alt="${film.Title}" class="card-img" />
        </div>
        <div class="card-footer">
          <h3 class="card-title">${film.Title}</h3>
          <div class="card-buttons">
            <button class="btn"><i class="fa-solid fa-circle-play"></i></button>
            <button class="btn preferiti" name="${film.Title}"><i class="fa-solid fa-heart"></i></button>
          </div>
        </div>
      </div>`;
    divFilm.innerHTML += card;
  });

  document.querySelectorAll(".card-header").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const data =
        movieData.find((d) => d.Title === card.dataset.title) ||
        loadFavorites().find((d) => d.Title === card.dataset.title);
      if (data) {
        popupImg.src = data.Poster;
        popupTitle.textContent = data.Title;
        popupYear.textContent = `Anno: ${data.Year}`;
        popupGenre.textContent = `Genere: ${data.Genre}`;
        popupRegia.textContent = `Regia: ${data.Director}`;
        popupDescription.textContent = `Descrizione: ${data.Plot}`;
        popup.classList.remove("hidden");
      }
      // const cardTitle = card.closest(".card").querySelector(".card-title");
      // if (cardTitle) cardTitle.style.textDecoration = "none";
    });
  });

  document.querySelectorAll(".card-title").forEach((title) => {
    title.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      // title.style.textDecoration = "none";
    });
  });

  Array.from(document.getElementsByClassName(preferitiClass)).forEach((btn) => {
    btn.style.color = loadFavorites().find((x) => x.Title === btn.name)
      ? "red"
      : "white";

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const user = JSON.parse(localStorage.getItem("user")) || null;
      if (!user) {
        Toastify({
          text: "ACCEDI PER AGGIUNGERE AI PREFERITI!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, red, black)",
          onClick: () => {
            window.location.href = "/Project1.2/pages/auth/login.html";
          },
        }).showToast();
        return;
      }

      let filmPreferiti = loadFavorites();
      let film =
        movieData.find((x) => x.Title === btn.name) ||
        filmPreferiti.find((x) => x.Title === btn.name);

      const index = filmPreferiti.findIndex((x) => x.Title === film.Title);

      if (index === -1) {
        filmPreferiti.push(film);
        btn.style.color = "red";
        Toastify({
          text: "AGGIUNTO AI PREFERITI!",
          duration: 3000,
          close: true,
          backgroundColor: "linear-gradient(to right, red, black)",
        }).showToast();
      } else {
        filmPreferiti.splice(index, 1);
        btn.style.color = "white";
        Toastify({
          text: "RIMOSSO DAI PREFERITI!",
          duration: 3000,
          close: true,
          backgroundColor: "linear-gradient(to right, red, black)",
        }).showToast();
      }

      saveFavorites(filmPreferiti);

      if (window.location.pathname.includes("preferiti.html")) {
        renderCard(seriePreferiti);
      }
    });
  });
}

closeBtn.addEventListener("click", () => popup.classList.add("hidden"));
window.addEventListener("click", (event) => {
  if (event.target === popup) popup.classList.add("hidden");
});

async function start() {
  if (window.location.pathname.includes("preferiti.html")) {
    const seriePreferiti = loadFavorites();
    renderCard(seriePreferiti);
    return;
  }
  const promises = arrFilm.map((t) => renderFilm(t));
  movieData = await Promise.all(promises);

  const params = new URLSearchParams(window.location.search);
  const genereURL = params.get("genere");
  let filmFiltrati = movieData;

  if (genereURL && genereMap[genereURL]) {
    const genereInglese = genereMap[genereURL];
    filmFiltrati = movieData.filter(
      (s) =>
        s.Genre &&
        s.Genre.split(",")
          .map((g) => g.trim().toLowerCase())
          .includes(genereInglese.toLowerCase())
    );
  }

  renderCard(filmFiltrati);

  document.querySelectorAll(".nomi-film a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const genereSelezionato = e.target.textContent;
      const genereInglese = genereMap[genereSelezionato] || null;
      let filtrate = movieData;
      if (genereInglese) {
        filtrate = movieData.filter(
          (s) =>
            s.Genre &&
            s.Genre.split(",")
              .map((g) => g.trim().toLowerCase())
              .includes(genereInglese.toLowerCase())
        );
      }
      renderCard(filtrate);
      history.replaceState(null, "", `?genere=${genereSelezionato}`);
    });
  });
}

start();

let hamburger = document.querySelector(".hamburger");
let menuLinks = document.querySelector(".menu-links");

hamburger.addEventListener("click", function () {
  menuLinks.classList.toggle("active");
});
