// JAVASCRIPT POPUP
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupYear = document.getElementById("popup-year");
const popupGenre = document.getElementById("popup-genre");
const popupRegia = document.getElementById("popup-regia");
const popupDescription = document.getElementById("popup-description");
const closeBtn = document.querySelector(".close-btn");
const divFilm = document.querySelector("#film > .scroll-row");
const divSerie = document.querySelector("#serie > .scroll-row");
const preferiti = document.getElementsByClassName("preferiti");
const movieData = [];
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
  "Fringe",
  "Dexter",
  "Breaking Bad",
  "Game of Thrones",
  "Stranger Things",
  "The Crown",
  "The Witcher",
  "The Office",
  "Peaky Blinders",
  "Dark",
  "Better Call Saul",
  "The Mandalorian",
];
function renderCard(array) {
  try {
    const films = array.filter((film) => film.Type === "movie");
    const series = array.filter((serie) => serie.Type === "series");
    films.forEach((film, index) => {
      const card = ` <div class="card">
      <div class="card-header" data-index="${index}" data-title="${film.Title}">
                <img src="${film.Poster}" alt="${film.Title}" class="card-img" />
                </div>
                <div class="card-footer">
                    <h3 class="card-title">${film.Title}</h3>
                    <div class="card-buttons">
                        <button class="btn"><i class="fa-solid fa-circle-play"></i></button>
                        <button class="btn preferiti" name ="${film.Title}"><i class="fa-solid fa-heart"></i></button>
                    </div>
                    </div>
                </div>`;
      divFilm.innerHTML += card;
    });
    series.forEach((serie, index) => {
      const card = ` <div class="card">
                <div class="card-header" data-index="${index}" data-title="${serie.Title}">
                <img src="${serie.Poster}" alt="${serie.Title}" class="card-img" />
                </div>
                <div class="card-footer">
                    <h3 class="card-title">${serie.Title}</h3>
                    <div class="card-buttons">
                        <button class="btn"><i class="fa-solid fa-circle-play"></i></button>
                        <button class="btn preferiti"name ="${serie.Title}"><i class="fa-solid fa-heart"></i></button>
                    </div>
                    </div>
                </div>`;
      divSerie.innerHTML += card;
    });
  } catch (error) {
    console.error(error);
  }
}
//FUNZIONE CHE FA LA CHIAMATA ALL'API IN BASE AL TITOLO
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
async function popolaFilm(array) {
  try {
    const promises = array.map((titolo) => renderFilm(titolo));
    const result = await Promise.all(promises);
    return result;
  } catch (error) {
    console.error(error);
  }
}
//FUNZIONE CHE FA PARTIRE TUTTO:
//ASPETTA LA FUNZIONE POPOLAFILM, POPOLA L'ARRAY MOVIEDATA, PARTE LA FUNZIONE RENDERCARD.
async function start() {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const isLogged = !!user; // true se loggato
  const result = await popolaFilm(arrFilm);
  movieData.push(...result);
  renderCard(result);
  //PER TUTTI I BOTTONI CUORE AGGIUNGE IL ROSSO SE SONO PRESENTI NEL LOCALSTORAGE
  const filmPreferiti = loadFavorites();
  for (let film of preferiti) {
    const trovato = filmPreferiti.find((x) => x.Title === film.name);
    if (trovato) {
      film.style.color = "red";
    } else {
      film.style.color = "white";
    }
  }

  document.querySelectorAll(".card-header").forEach((card) => {
    card.addEventListener("click", () => {
      const data = movieData.find((d) => d.Title === card.dataset.title);
      if (data) {
        popupImg.src = data.Poster;
        popupTitle.textContent = data.Title;
        popupYear.textContent = `Anno:  ${data.Year}`;
        popupGenre.textContent = `Genere:  ${data.Genre}`;
        popupRegia.textContent = `Regia:  ${data.Director}`;
        popupDescription.textContent = `Descrizione:  ${data.Plot}`;
        popup.classList.remove("hidden");
      }
    });
  });
  for (let film of preferiti) {
    film.addEventListener("click", () => {
      const filmPreferiti = loadFavorites();
      const y = movieData.find((x) => x.Title === film.name);
      const index = filmPreferiti.findIndex((x) => x.Title === y.Title);
      if (!isLogged) {
        Toastify({
          text: "ACCEDI PER AGGIUNGERE AI PREFERITI!",
          duration: 3000,
          close: true,
          className: "my-toast",
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, red, black)",
          onClick: () => {
            window.location.href = "/Project1.2/pages/auth/login.html";
          },
        }).showToast();
        return; //
      }
      if (index === -1) {
        filmPreferiti.push(y);
        film.style.color = "red";
        Toastify({
          text: "AGGIUNTO AI PREFERITI!",
          duration: 3000,
          close: true,
          className: "my-toast",
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, red, black)",
        }).showToast();
      } else {
        Toastify({
          text: "RIMOSSO DAI PREFERITI!",
          duration: 3000,
          close: true,
          className: "my-toast",
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, red, black)",
        }).showToast();
        filmPreferiti.splice(index, 1);
        film.style.color = "white";
      }

      saveFavorites(filmPreferiti);
    });
  }
}
// CHIUDE CLICCANDO LA X
closeBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});
// CHIUDE CLICCANDO QUALSIASI PARTE
window.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.classList.add("hidden");
  }
});
start();

// JAVASCRIPT PARTE SIMONE
let hamburger = document.querySelector(".hamburger");
let menuLinks = document.querySelector(".menu-links");

hamburger.addEventListener("click", function () {
  menuLinks.classList.toggle("active");
});
