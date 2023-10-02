import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import NavBar from "./NavBar";
import NumResults from "./NumResults";
import Search from "./Search";
import Main from "./Main";
import Box from "./Box";
import Loader from "./Loader";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // const q = "interstellar";

  const { movies, isLoading, error } = useMovies(query);

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  // const [watched, setWatched] = useState(function () {
  //   const storedMovies = localStorage.getItem("watched");
  //   return JSON.parse(storedMovies);
  // });

  function handleSelectmovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCanclemovie() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // useEffect(
  //   function () {
  //     localStorage.setItem("watched", JSON.stringify(watched));
  //   },
  //   [watched]
  // );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} handleSelectmovie={handleSelectmovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              handleCanclemovie={handleCanclemovie}
              handleAddWatchedMovie={handleAddWatchedMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                handleDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
