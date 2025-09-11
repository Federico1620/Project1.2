const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupYear = document.getElementById("popup-year");
const popupGenre = document.getElementById("popup-genre");
const popupRegia = document.getElementById("popup-regia");
const popupDescription = document.getElementById("popup-description");
const closeBtn = document.querySelector(".close-btn");
const divSerie = document.getElementById("film-container");
const preferitiClass = "preferiti";

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

const arrSerie = [
  "Breaking Bad", "Game of Thrones", "Stranger Things", "The Witcher",
  "Friends", "The Office", "Sherlock", "The Mandalorian",
  "House of the Dragon", "Loki", "Peaky Blinders", "Vikings",
  "Money Heist", "Umbrella Academy", "Lucifer", "Dexter",
  "Westworld", "The Boys", "Arcane", "Chernobyl"
];

let serieData = [];

function loadFavorites() {
  return JSON.parse(localStorage.getItem("preferiti")) || [];
}

function saveFavorites(array) {
  localStorage.setItem("preferiti", JSON.stringify(array));
}

async function fetchSerie(titolo) {
  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=8e73d393&t=${titolo}&type=series`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

function renderCard(array) {
  divSerie.innerHTML = "";
  if (array.length === 0) {
    divSerie.innerHTML = "<p>Nessuna serie trovata.</p>";
    return;
  }

  array.forEach(serie => {
    const card = `
      <div class="card">
        <div class="card-header" data-title="${serie.Title}">
          <img src="${serie.Poster}" alt="${serie.Title}" class="card-img" />
        </div>
        <div class="card-footer">
          <h3 class="card-title">${serie.Title}</h3>
          <div class="card-buttons">
            <button class="btn"><i class="fa-solid fa-circle-play"></i></button>
            <button class="btn ${preferitiClass}" name="${serie.Title}"><i class="fa-solid fa-heart"></i></button>
          </div>
        </div>
      </div>`;
    divSerie.innerHTML += card;
  });

  document.querySelectorAll(".card-header").forEach(card => {
    card.addEventListener("click", e => {
      e.preventDefault();
      const data = serieData.find(d => d.Title === card.dataset.title) || loadFavorites().find(d => d.Title === card.dataset.title);
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

  document.querySelectorAll(".card-title").forEach(title => {
    title.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  Array.from(document.getElementsByClassName(preferitiClass)).forEach(btn => {
    btn.style.color = loadFavorites().find(x => x.Title === btn.name) ? "red" : "white";

    btn.addEventListener("click", e => {
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

      let seriePreferiti = loadFavorites();
      let serie = seriePreferiti.find(s => s.Title === btn.name) || serieData.find(s => s.Title === btn.name);
      if (!serie) return;

      const index = seriePreferiti.findIndex(x => x.Title === serie.Title);

      if (index === -1) {
        seriePreferiti.push(serie);
        btn.style.color = "red";
        Toastify({ text: "AGGIUNTO AI PREFERITI!", duration: 3000, close: true, backgroundColor: "linear-gradient(to right, red, black)" }).showToast();
      } else {
        seriePreferiti.splice(index, 1);
        btn.style.color = "white";
        Toastify({ text: "RIMOSSO DAI PREFERITI!", duration: 3000, close: true, backgroundColor: "linear-gradient(to right, red, black)" }).showToast();
      }

      saveFavorites(seriePreferiti);

      if (window.location.pathname.includes("preferiti.html")) {
        renderCard(seriePreferiti);
      }
    });
  });
}

closeBtn.addEventListener("click", () => popup.classList.add("hidden"));
window.addEventListener("click", e => { if(e.target === popup) popup.classList.add("hidden"); });

async function start() {
  if (window.location.pathname.includes("preferiti.html")) {
    const seriePreferiti = loadFavorites();
    renderCard(seriePreferiti);
    return;
  }

  const promises = arrSerie.map(t => fetchSerie(t));
  serieData = await Promise.all(promises);

  const params = new URLSearchParams(window.location.search);
  const genereURL = params.get("genere");
  let serieFiltrate = serieData;

  if (genereURL && genereMap[genereURL]) {
    const genereInglese = genereMap[genereURL];
    serieFiltrate = serieData.filter(s => s.Genre &&
      s.Genre.split(",").map(g => g.trim().toLowerCase()).includes(genereInglese.toLowerCase())
    );
  }

  renderCard(serieFiltrate);

  document.querySelectorAll(".nomi-film a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const genereSelezionato = e.target.textContent;
      const genereInglese = genereMap[genereSelezionato] || null;
      let filtrate = serieData;
      if (genereInglese) {
        filtrate = serieData.filter(s => s.Genre &&
          s.Genre.split(",").map(g => g.trim().toLowerCase()).includes(genereInglese.toLowerCase())
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

hamburger.addEventListener("click", function(){
  menuLinks.classList.toggle("active");
});
