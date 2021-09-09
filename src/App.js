import React, { useState, useEffect } from "react";
import Movie from "./component/Movie";
const API_KEY = `${process.env.REACT_APP_API_KEY}`;
const BASE_URL = `${process.env.REACT_APP_BASE}`;
const FEATURE_API = `${BASE_URL}discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_API = `${BASE_URL}search/movie?api_key=${API_KEY}&query=`;
function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(FEATURE_API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  return (
    <>
      <header className="headers">
        <input className="search" type="search" placeholder="Search!!!!!!" />
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}
export default App;
