import React from "react";
import Movie from "./Movie";

function MovieList({ movies, handleSelectmovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          handleSelectmovie={handleSelectmovie}
        />
      ))}
    </ul>
  );
}

export default MovieList;
