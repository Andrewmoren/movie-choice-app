const API_KEY = "edff29d8-901c-49cd-acf4-526e81b03c30";

const API_URL =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

const getMovies = async (url) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();
  console.log(data);
};

getMovies(API_URL);
