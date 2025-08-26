// JAVASCRIPT POPUP
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupYear = document.getElementById("popup-year");
const popupGenre = document.getElementById("popup-genre");
const popupRegia = document.getElementById("popup-regia");
const popupDescription = document.getElementById("popup-description");
const closeBtn = document.querySelector(".close-btn");

// OGGETTO DI FILM
const movieData = [];
const arrFilm = [
  "Inception",
  "Interstellar",
  "The%20Dark%20Knight",
  "The%20Godfather",
  "Pulp%20Fiction",
  "Fight%20Club",
  "The%20Matrix",
  "Forrest%20Gump",
  "The%20Lord%20of%20the%20Rings",
  "The%20Shawshank%20Redemption",
  "Gladiator",
  "Titanic",
  "Avatar",
  "Back%20to%20the%20Future",
  "Jurassic%20Park",
  "Star%20Wars",
  "The%20Silence%20of%20the%20Lambs",
  "Goodfellas",
  "The%20Avengers",
  "Iron%20Man",
];
async function renderFilm(titolo) {
  try {
    const result = await fetch(
      `https://www.omdbapi.com/?apikey=1b0c30bd&t=${titolo}`
    );
    const data = await result.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
renderFilm("Goodfellas").then((result) => console.log(result));

async function popolaFilm(array) {
  try {
    array.forEach(async (titolo) => {
      const film = await renderFilm(titolo);
      movieData.push(film);
    });
  } catch (error) {
    console.error(error);
  }
}
popolaFilm(arrFilm).then(() => console.log(movieData));
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.dataset.title;
    const data = movieData[title];

    if (data) {
      popupImg.src = data.img;
      popupTitle.textContent = title;
      popupYear.textContent = `Data:  ${data.year}`;
      popupGenre.textContent = `Genere:  ${data.genre}`;
      popupRegia.textContent = `Regia:  ${data.regia}`;
      popupDescription.textContent = `Descrizione:  ${data.description}`;
      popup.classList.remove("hidden");
    }
  });
});

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
// JAVASCRIPT PARTE SIMONE
let hamburger = document.querySelector(".hamburger");
let menuLinks = document.querySelector(".menu-links");

hamburger.addEventListener("click", function () {
  menuLinks.classList.toggle("active");
});
