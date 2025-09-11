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
  "The Dark Knight",
  "Gladiator",
  "Jurassic Park",
  "Avatar",
  "The Lord of the Rings",
  "Toy Story",
  "Up",
  "Shrek",
  "Schindler's List",
  "The Theory of Everything",
  "Bohemian Rhapsody",
  "Forrest Gump",
  "The Grand Budapest Hotel",
  "The Mask",
  "March of the Penguins",
  "Won’t You Be My Neighbor?",
  "Free Solo",
  "Fight Club",
  "The Shawshank Redemption",
  "A Beautiful Mind",
  "Interstellar",
  "The Matrix",
  "Blade Runner 2049",
  "Harry Potter",
  "The Hobbit",
  "Pan’s Labyrinth",
  "Se7en",
  "Zodiac",
  "Gone Girl",
  "It",
  "Get Out",
  "A Quiet Place",
  "La La Land",
  "The Greatest Showman",
  "Moulin Rouge!",
  "The Godfather",
  "Goodfellas",
  "Heat",
  "Titanic",
  "Pride & Prejudice",
  "The Notebook",
  "Braveheart",
  "12 Years a Slave",
  "Gladiator",
  "Shutter Island",
  "Gone Baby Gone",
  "Mystic River",
  "Django Unchained",
  "The Good, the Bad and the Ugly",
  "Unforgiven",
  "Saving Private Ryan",
  "Hacksaw Ridge",
  "1917",
  "Remember the Titans",
  "Rocky",
  "Moneyball",
  "Finding Nemo",
  "The Lion King",
  "Coco",
  "Piper",
  "Bao",
  "Paperman",
  "Birdman",
  "The Master",
  "Mulholland Drive",
  "Moonlight",
  "Lady Bird",
  "The Lighthouse",
];

let movieData = [];

function loadFavorites() {
  if (!user || !user.email) return [];
  return JSON.parse(localStorage.getItem(`preferiti_${user.email}`)) || [];
}

function saveFavorites(array) {
  localStorage.setItem(`preferiti_${user.email}`, JSON.stringify(array));
}

async function renderFilm(titolo) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=b1ee0065&t=${titolo}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

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
            <button type="button" class="btn circle-play">
            <i class="fa-solid fa-circle-play"></i>
            </button>
            <button type="button" class="btn preferiti" name="${film.Title}"><i class="fa-solid fa-heart"></i></button>
          </div>
        </div>
      </div>`;
    divFilm.innerHTML += card;
  });

  document.querySelectorAll(".circle-play").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Play cliccato, nessun redirect");
    });
  });

  document.querySelectorAll(".card-title").forEach((title) => {
    title.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Titolo cliccato, nessun redirect");
    });
  });
  document.querySelectorAll(".card-footer").forEach((footer) => {
    footer.addEventListener("click", (e) => {
      if (!e.target.closest("button") && !e.target.closest(".card-title")) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Click su card-footer ignorato");
      }
    });
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
    });
  });

  document.querySelectorAll(".card-title").forEach((title) => {
    title.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
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
