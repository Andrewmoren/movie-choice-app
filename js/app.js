const API_KEY = "edff29d8-901c-49cd-acf4-526e81b03c30";

const API_URL =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const getMovies = async (url) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  showMovies(data);
};

getMovies(API_URL);

const getClassByRate = (vote) => {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
};

const showMovies = (data) => {
  const moviesEl = document.querySelector(".movies");

  //   очистка предыдущих
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((mov) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <div class="movie__cover-inner">
    <img
      src=${mov.posterUrlPreview}
      alt=${mov.nameRu}
      class="movie__cover"
    />
    <div class="movie__cover--darkened"></div>
  </div>
  <div class="movie__info">
    <div class="movie__title">${mov.nameRu}</div>
    <div class="movie__category">${mov.genres.map(
      (genre) => ` ${genre.genre}`
    )}</div>
    ${
      mov.rating &&
      `<div class="movie__average movie__average--${getClassByRate(
        mov.rating
      )}">${mov.rating}</div>
      `
    }
  </div>
    `;
    moviesEl.appendChild(movieEl);
  });
};

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});
