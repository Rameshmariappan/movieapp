import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Movie from "./component/Movie";
const API_KEY = `${process.env.REACT_APP_API_KEY}`;
const BASE_URL = `${process.env.REACT_APP_BASE}`;
const FEATURE_API = `${BASE_URL}discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=`;
const SEARCH_API = `${BASE_URL}search/movie?api_key=${API_KEY}&query=`;
const UPCOMING_API = `${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=`;
const NOWPLAYING_API = `${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=`;
function App() {
  const [movies, setMovies] = useState([]);
  const [searchmovie, setSearchmovie] = useState("");
  const [totalpageNumber, setTotalpageNumber] = useState();
  const [catagory, setCatagory] = useState("popularity");
  const [initial, setInitial] = useState(1);
  const [pagenum, setPagenum] = useState();
  const movieperpage = 20;
  useEffect(() => {
    checkmovie(FEATURE_API);
  }, []);
  const checkmovie = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        // setInitial(data.page);
        console.log(data.page);
        setPagenum(data.page - 1);
        setMovies(data.results);
        setTotalpageNumber(data.total_results);
      });
  };
  const search_handle = (e) => {
    e.preventDefault();
    if (searchmovie) {
      checkmovie(SEARCH_API + searchmovie);
      setCatagory("search");
    }
  };
  const searchonchange = (e) => {
    setSearchmovie(e.target.value);
  };

  const upcome = () => {
    setInitial(0);
    setCatagory("upcoming");
    checkmovie(UPCOMING_API + 1);
    setSearchmovie("");
  };
  const popularity = () => {
    setInitial(0);
    setCatagory("popularity");
    checkmovie(FEATURE_API + 1);
    setSearchmovie("");
  };
  const nowplayed = () => {
    setPagenum();
    setCatagory("nowPlaying");
    checkmovie(NOWPLAYING_API + 1);
    setSearchmovie("");
  };

  const pageCounts = Math.ceil(totalpageNumber / movieperpage);
  const pagechange = ({ selected }) => {
    let select = selected + 1;
    console.log(selected);
    // setPagenum(0);
    if (catagory === "popularity") {
      checkmovie(FEATURE_API + select);
    } else if (catagory === "upcoming") {
      checkmovie(UPCOMING_API + select);
    } else if (catagory === "nowPlaying") {
      checkmovie(NOWPLAYING_API + select);
    } else if (catagory === "search") {
      checkmovie(SEARCH_API + searchmovie + `&page=` + select);
    } else {
      console.log("error");
    }
  };

  return (
    <>
      <header className="headers">
        <h2 className="mov">MovFlix</h2>
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
      <div className="paginate-control">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          onPageChange={pagechange}
          // pagenum={pagenum}

          // initialPage={initial}
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
