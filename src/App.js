import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Movie from "./component/Movie";
import { checkMovie } from "./component/fetchFunction";
import { FEATURE_API, SEARCH_API, UPCOMING_API, NOWPLAYING_API } from "./Api";
function App() {
  const [movies, setMovies] = useState([]);
  const [searchmovie, setSearchmovie] = useState("");
  const [totalpageNumber, setTotalpageNumber] = useState();
  const [pagenum, setPagenum] = useState();
  const [api, setApi] = useState(FEATURE_API);
  const [currentPage, setCurrentPage] = useState(1);
  const movieperpage = 20;
  useEffect(() => {
    checkMovie(api, currentPage).then((data) => {
      setPagenum(data.page - 1);
      setMovies(data.results);
      setTotalpageNumber(data.total_results);
    });
  }, [api, currentPage]);
  const searchHandle = (e) => {
    e.preventDefault();
    if (searchmovie) {
      setApi(SEARCH_API + searchmovie + `&page=`);
    }
  };
  const pageCounts = Math.ceil(totalpageNumber / movieperpage);
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
            setApi(FEATURE_API);
            setCurrentPage(1);
          }}
        >
          Popular
        </button>
        <button
          className="upcoming"
          onClick={() => {
            setApi(UPCOMING_API);
            setCurrentPage(1);
          }}
        >
          Upcoming
        </button>
        <button
          className="nowplaying"
          onClick={() => {
            setApi(NOWPLAYING_API);
            setCurrentPage(1);
          }}
        >
          Now Playing
        </button>
      </div>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
      <div className="paginate-control">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          onPageChange={(e) => setCurrentPage(e.selected + 1)}
          pageCount={pageCounts}
          disableInitialCallback={false}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          forcePage={pagenum}
        />
      </div>
    </>
  );
}
export default App;
