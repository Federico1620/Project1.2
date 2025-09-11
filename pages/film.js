const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupYear = document.getElementById("popup-year");
const popupGenre = document.getElementById("popup-genre");
const popupRegia = document.getElementById("popup-regia");
const popupDescription = document.getElementById("popup-description");
const closeBtn = document.querySelector(".close-btn");
const divFilm = document.getElementById("film-container");
const params = new URLSearchParams(window.location.search);

const genereItaliano = params.get("genere");
const genereMap = {
  "Azione": "Action",
  "Avventura": "Adventure",
  "Animazione": "Animation",
  "Biografico": "Biography",
  "Commedia": "Comedy",
  "Documentario": "Documentary",
  "Drammatico": "Drama",
  "Fantascienza": "Sci-Fi",
  "Fantasy": "Fantasy",
  "Giallo": "Mystery",
  "Horror": "Horror",
  "Musicale": "Music",
  "Poliziesco": "Crime",
  "Romantico": "Romance",
  "Storico": "History",
  "Thriller": "Thriller",
  "Western": "Western",
  "Guerra": "War",
  "Sportivo": "Sport",
  "Famiglia": "Family",
  "Cortometraggio": "Short",
  "Cinema d’autore": "Art",
  "Indipendente": "Indie"
};
const genereInglese = genereMap[genereItaliano] || null;

const arrFilm = [
  "Inception", "Interstellar", "The Dark Knight", "The Godfather",
  "Pulp Fiction", "Fight Club", "The Matrix", "Forrest Gump",
  "The Lord of the Rings", "The Shawshank Redemption", "Gladiator",
  "Titanic", "Avatar", "Back to the Future", "Jurassic Park",
  "Star Wars", "Goodfellas", "The Avengers", "Iron Man", "Schindler's List"
];

let movieData = [];

function loadFavorites() {
  return JSON.parse(localStorage.getItem("preferiti")) || [];
}

function saveFavorites(array) {
  localStorage.setItem("preferiti", JSON.stringify(array));
}

async function renderFilm(titolo) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=8e73d393&t=${titolo}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function popolaFilm(array) {
  const promises = array.map(titolo => renderFilm(titolo));
  return await Promise.all(promises);
}

function renderCard(array) {
  divFilm.innerHTML = "";
  if (array.length === 0) {
    divFilm.innerHTML = "<p>Nessun film trovato.</p>";
    return;
  }

  array.forEach(film => {
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

  document.querySelectorAll(".card-header").forEach(card => {
    card.addEventListener("click", e => {
      e.preventDefault();
      const data = movieData.find(d => d.Title === card.dataset.title) || loadFavorites().find(d => d.Title === card.dataset.title);
      if (data) {
        popupImg.src = data.Poster;
        popupTitle.textContent = data.Title;
        popupYear.textContent = `Anno: ${data.Year}`;
        popupGenre.textContent = `Genere: ${data.Genre}`;
        popupRegia.textContent = `Regia: ${data.Director}`;
        popupDescription.textContent = `Descrizione: ${data.Plot}`;
        popup.classList.remove("hidden");
      }
      const cardTitle = card.closest(".card").querySelector(".card-title");
      if(cardTitle) cardTitle.style.textDecoration = "none";
    });
  });

  document.querySelectorAll(".card-title").forEach(title => {
    title.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      title.style.textDecoration = "none";
    });
  });

  Array.from(document.getElementsByClassName("preferiti")).forEach(film => {
    const trovato = loadFavorites().find(x => x.Title === film.name);
    film.style.color = trovato ? "red" : "white";

    film.addEventListener("click", e => {
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
          onClick: () => { window.location.href = "/Project1.2/pages/auth/login.html"; }
        }).showToast();
        return;
      }

      let filmPreferiti = loadFavorites();
      const y = movieData.find(x => x.Title === film.name) || filmPreferiti.find(x => x.Title === film.name);
      const index = filmPreferiti.findIndex(x => x.Title === y.Title);

      if (index === -1) {
        filmPreferiti.push(y);
        film.style.color = "red";
        const cardTitle = film.closest(".card").querySelector(".card-title");
        if(cardTitle) cardTitle.style.textDecoration = "none";
        Toastify({ text: "AGGIUNTO AI PREFERITI!", duration: 3000, close: true, backgroundColor: "linear-gradient(to right, red, black)" }).showToast();
      } else {
        filmPreferiti.splice(index, 1);
        film.style.color = "white";
        const cardTitle = film.closest(".card").querySelector(".card-title");
        if(cardTitle) cardTitle.style.textDecoration = "none";
        Toastify({ text: "RIMOSSO DAI PREFERITI!", duration: 3000, close: true, backgroundColor: "linear-gradient(to right, red, black)" }).showToast();
      }

      saveFavorites(filmPreferiti);
    });
  });
}

const user = JSON.parse(localStorage.getItem("user")) || null;
const isLogged = !!user;

closeBtn.addEventListener("click", () => popup.classList.add("hidden"));
window.addEventListener("click", event => {
  if (event.target === popup) popup.classList.add("hidden");
});

async function start() {
  const result = await popolaFilm(arrFilm);
  movieData = result;

  let filmDaMostrare = result;
  if (genereInglese) {
    filmDaMostrare = result.filter(film => film.Genre &&
      film.Genre.split(",").map(g => g.trim().toLowerCase()).includes(genereInglese.toLowerCase())
    );
  }
  renderCard(filmDaMostrare);
}

start();

let hamburger = document.querySelector(".hamburger");
let menuLinks = document.querySelector(".menu-links");

hamburger.addEventListener("click", function () {
  menuLinks.classList.toggle("active");
});
