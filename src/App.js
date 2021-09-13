import React, { useState, useEffect } from "react";
import Movie from "./component/Movie";
const API_KEY = `${process.env.REACT_APP_API_KEY}`;
const BASE_URL = `${process.env.REACT_APP_BASE}`;
const FEATURE_API = `${BASE_URL}discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_API = `${BASE_URL}search/movie?api_key=${API_KEY}&query=`;
const UPCOMING_API = `${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
const NOWPLAYING_API = `${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
function App() {
  const [movies, setMovies] = useState([]);
  const [searchmovie, setSearchmovie] = useState("");
  useEffect(() => {
    checkmovie(FEATURE_API);
  }, []);
  const checkmovie = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };
  const search_handle = (e) => {
    e.preventDefault();
    if (searchmovie) {
      checkmovie(SEARCH_API + searchmovie);
      setSearchmovie("");
    }
  };
  const searchonchange = (e) => setSearchmovie(e.target.value);

  const upcome = () => {
    checkmovie(UPCOMING_API);
  };
  const popularity = () => {
    checkmovie(FEATURE_API);
  };
  const nowplayed = () => {
    checkmovie(NOWPLAYING_API);
  };

  return (
    <>
      <header className="headers">
        <h2 className="mov">movFlix</h2>
        <form className="searchbox" onSubmit={search_handle}>
          <input
            className="search"
            type="search"
            placeholder="Search!!!!!!"
            onChange={searchonchange}
            value={searchmovie}
          />
        </form>
      </header>
      <div className="mybutton">
        <button className="popular" onClick={popularity}>
          Popular
        </button>
        <button className="upcoming" onClick={upcome}>
          Upcoming
        </button>
        <button className="nowplaying" onClick={nowplayed}>
          Now Playing
        </button>
      </div>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}
export default App;
