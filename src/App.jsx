import { useState, useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import axios from "axios";

import MovieCard from "./MovieCard"
import Header from "./Header"
import CardDetails from "./CardDetails"
import Search from "./Search"
import Pagination from "./Pagination"

function App() {

  const [cards, setCards] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4, 5]);
  const [favorites, setFavorites] = useState([])
  const [searchText, setSearchText] = useState("batman")


  useEffect(() => {
    handleMovieSearch(searchText, currentPage);
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  // useEffect(() => {
  //   localStorage.setItem("favorites", JSON.stringify(favorites));
  // }, [favorites]);

  async function handleMovieSearch(searchText, currentPage = 1, type = "") {
    try {
      const resp = await axios.get(
        `https://www.omdbapi.com/`,
        {
          params: {
            s: searchText,
            apikey: "7d697241",
            page: currentPage,
            type: type,
          },
        }
      );
      console.log(resp);

      setCards(resp.data.Search || []);
      setTotalResults(resp.data.totalResults || 0);
      setCurrentPage(currentPage);
      setSearchText(searchText);
    } catch (error) {
      if (error.status == 404) {
        setCards([]);
      }

      if (error.status == 500) {
        alert("Something went wrong...");
      }
    }
  };

  function handleFavouriteMovie(movie) {
    // return () => {
    let newFavorites = [...favorites];

    const isAlreadyFav = newFavorites.find((fav) => fav.imdbID === movie.imdbID);

    if (isAlreadyFav) {
      // Remove from favorites
      newFavorites = newFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      // Add to favorites
      newFavorites.push(movie);
    }

    setFavorites(newFavorites); // localStorage updated automatically by useEffect
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    // };
  }


  function handlePageClick(page) {
    handleMovieSearch(searchText, page);

    // if user clicks on last page in visible set
    if (page === visiblePages[visiblePages.length - 1]) {
      const newPages = visiblePages.map((p) => p + 1);
      setVisiblePages(newPages);
    }

    // if user clicks on first page in visible set
    if (page === visiblePages[0] && page !== 1) {
      const newPages = visiblePages.map((p) => p - 1);
      setVisiblePages(newPages);
    }
  }
  return (
    <>
      <div className="bg-[#121212] min-h-screen w-full">

        <Header />
        <Routes>

          <Route path="/" element={
            <>
              <div>
                <Search handleMovieSearch={handleMovieSearch} />
                <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                  {cards.map((card, key) => (
                    <MovieCard card={card} key={key} handleFavouriteMovie={handleFavouriteMovie} />
                  ))}
                </div>
                <Pagination
                  totalResults={totalResults}
                  currentPage={currentPage}
                  visiblePages={visiblePages}
                  handlePageClick={handlePageClick}
                />
                {/* {renderMovieCards(movieCards)} */}
              </div>
            </>
          } />
          <Route path="/card-details/:imdbID" element={<CardDetails />} />
          <Route path="/favorites" element={
            <>
              {/* {renderFovouritePage(favorites)} */}
              <div>

                <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                  {favorites.map((card, key) => (
                    <MovieCard card={card} key={key} handleFavouriteMovie={handleFavouriteMovie} />
                  ))}
                </div>
              </div>
            </>
          } />
        </Routes>
      </div>
    </>
  )
}

export default App

