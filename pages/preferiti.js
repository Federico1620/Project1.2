const preferiti = loadFavorites();
// console.log(preferiti);

const p = document.getElementById("paragrafoDaRimuovere");
const pS = document.getElementById("paragrafoDaRimuovereS");
const divFilm = document.querySelector("#film > .scroll-row");
const divSerie = document.querySelector("#serie > .scroll-row");

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
                        <button class="btn preferiti" data-title="${film.Title}" name ="${film.Title}"><i class="fa-solid fa-heart"></i></button>
                    </div>
                    </div>
                </div>`;
      p.textContent = "";
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
                        <button class="btn preferiti" data-title="${serie.Title}" name ="${serie.Title}"><i class="fa-solid fa-heart"></i></button>
                    </div>
                    </div>
                </div>`;
      pS.textContent = "";
      divSerie.innerHTML += card;
    });
  } catch (error) {
    console.error(error);
  }
}
renderCard(preferiti);

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupYear = document.getElementById("popup-year");
const popupGenre = document.getElementById("popup-genre");
const popupRegia = document.getElementById("popup-regia");
const popupDescription = document.getElementById("popup-description");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".card-header").forEach((card) => {
  card.addEventListener("click", () => {
    const data = preferiti.find((d) => d.Title === card.dataset.title);
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

const buttonPreferiti = document.querySelectorAll(".preferiti");
buttonPreferiti.forEach((button) => {
  button.style.color = "red";
  button.addEventListener("click", () => {
    const title = button.dataset.title;

    // rimuovo dal localStorage
    const nuovoArray = preferiti.filter((item) => item.Title !== title);
    saveFavorites(nuovoArray);

    preferiti.length = 0; // COSI SVUOTIAMO L'ARRAY PREFERITI
    preferiti.push(...nuovoArray); // COSI AGGIORNIAMO L'ARRAY SENZA IL TITOLO CLICCATO

    //RIMUOVIAMO LA CARD CLICCATA
    button.closest(".card").remove();

    const films = preferiti.filter((film) => film.Type === "movie");
    const series = preferiti.filter((serie) => serie.Type === "series");
    if (films.length === 0) {
      p.textContent = "Nessun Film ancora aggiunto ai preferiti";
    }
    if (series.length === 0) {
      pS.textContent = "Nessuna Serie TV ancora aggiunta ai preferiti";
    }
  });
});
