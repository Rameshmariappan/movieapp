import React from "react";
const IMAGE_API = `${process.env.REACT_APP_IMAGE_BASE}`;
const colorofvotes = (vote) => {
  if (vote > 8) {
    return "red";
  } else if (vote > 5) {
    return "green";
  } else {
    return "yellow";
  }
};
const Movie = ({ title, poster_path, overview, vote_average }) => (
  <div className="movie">
    <img src={IMAGE_API + poster_path} alt={title} />
    <div className="movie-name">
      <h3>{title}</h3>
      <span className={`tag ${colorofvotes(vote_average)}`}>
        {vote_average}
      </span>
    </div>
    <div className="movie-overview">
      <h2>Movie Overview:</h2>
      <p>{overview}</p>
    </div>
  </div>
);

export default Movie;
