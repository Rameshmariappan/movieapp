import React,{ useState,useEffect } from 'react';
import Movie from './component/Movie';

const FEATURE_API="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=495969e91d66f40ca12376e10f9c2ac5&page=1";
const SEARCH_API="https://api.themoviedb.org/3/search/movie?api_key=495969e91d66f40ca12376e10f9c2ac5&query="
function App() {
  const [movies,setMovies] = useState([]);
  useEffect(() => {
    fetch(FEATURE_API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
 
      })
  }, []);


  return(<>
    <header className="headers">
    <input className="search" type="search" placeholder="Search!!!!!!" />
    </header>
  <div className="movie-container"> 
    {movies.length > 0 && movies.map((movie)=>
    <Movie key={movie.id} {...movie}/>)}
  </div>
  </>
  ); 
 
}; 
export default App;
