import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Movie from "./component/Movie";
import { checkMovie } from "./component/fetchFunction";
import { FEATURE_API, SEARCH_API, UPCOMING_API, NOWPLAYING_API } from "./Api";
function App() {
  const [movies, setMovies] = useState([]);
  const [searchmovie, setSearchmovie] = useState("");
  const [api, setApi] = useState(FEATURE_API);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    checkMovie(FEATURE_API, currentPage).then((data) => {
      setMovies(data.results);
    });
  }, []);
  const nextScroll = () => {
    let scrollCount = currentPage + 1;
    setCurrentPage(scrollCount, currentPage);
    checkMovie(api, scrollCount).then((data) => {
      setMovies([...movies, ...data.results]);
    });
  };
  const searchHandle = (e) => {
    e.preventDefault();
    if (searchmovie) {
      setCurrentPage(1);
      checkMovie(SEARCH_API + searchmovie + `&page=`, 1).then((data) => {
        setApi(SEARCH_API + searchmovie + `&page=`);
        setMovies(data.results);
      });
    }
  };
  return (
    <>
      <header className="headers">
        <h2 className="mov">MovFlix</h2>
        <form className="searchbox" onSubmit={searchHandle}>
          <input
            className="search"
            type="search"
            placeholder="Search!!!!!!"
            onChange={(e) => setSearchmovie(e.target.value)}
            value={searchmovie}
          />
        </form>
      </header>
      <div className="mybutton">
        <button
          className="popular"
          onClick={() => {
            setCurrentPage(1);
            checkMovie(FEATURE_API, 1).then((data) => {
              setApi(FEATURE_API);
              setMovies(data.results);
            });
          }}
        >
          Popular
        </button>
        <button
          className="upcoming"
          onClick={() => {
            setCurrentPage(1);
            checkMovie(UPCOMING_API, 1).then((data) => {
              setApi(UPCOMING_API);
              setMovies(data.results);
            });
          }}
        >
          Upcoming
        </button>
        <button
          className="nowplaying"
          onClick={() => {
            setCurrentPage(1);
            checkMovie(NOWPLAYING_API, 1).then((data) => {
              setApi(NOWPLAYING_API);
              setMovies(data.results);
            });
          }}
        >
          Now Playing
        </button>
      </div>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
      <div>
        <InfiniteScroll
          dataLength={movies.length}
          next={nextScroll}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        />
      </div>
    </>
  );
}
export default App;
