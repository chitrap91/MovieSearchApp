import React, { useEffect, useState } from "react"
import Header from "./Header"
import MovieCard from "./MovieCard"
import { Routes, Route } from 'react-router-dom'
import CardDetails from "./CardDetails"
import Search from "./Search"
import { useParams } from "react-router-dom";
import axios from "axios";


function App() {

  const [cards, setCards] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0); // API totalResults value
  const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4, 5]);
  const [favorites, setFavorites] = useState([])
  const [searchText, setSearchText] = useState("batman")



  useEffect(() => {
    handleMovieSearch(searchText, currentPage);
  }, [])

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

  function renderPagination() {
    const totalPages = Math.ceil(totalResults / 10);

    return (
      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
          className="px-3 py-1 rounded bg-gray-700 text-white"
        >
          {"<<"}
        </button>

        {visiblePages.map((p) =>
          p <= totalPages ? (
            <button
              key={p}
              className={`px-3 py-1 rounded ${currentPage === p ? "bg-red-700 text-white" : "bg-gray-700 text-white"}`}
              onClick={() => handlePageClick(p)}
            >
              {p}
            </button>
          ) : null
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
          className="px-3 py-1 rounded bg-gray-700 text-white"
        >
          {">>"}
        </button>
      </div>
    );
  }


  let handleMovieSearch = async (searchText, currentPage = 1) => {
    try {
      const resp = await axios.get(
        `https://www.omdbapi.com/`,
        {
          params: {
            s: searchText,
            apikey: "7d697241",
            page: currentPage,
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

  let handleFavouriteMovie = (movie) => {
    let newFavourites = [...favorites];


    if (newFavourites.includes(movie)) {

      newFavourites.splice(newFavourites.indexOf(movie), 1);
    } else {

      newFavourites.push(movie);
    }

    setFavorites(newFavourites);
    console.log(newFavourites);
  };

  let renderSearchPage = (movieCards) => {
    return (
      <div>
        <Header />

        <Search handleMovieSearch={handleMovieSearch} />
        {renderMovieCards(movieCards)}
      </div>
    );
  }

  let renderFovouritePage = (movieCards) => {
    return (
      <div>
        <Header />
        {renderMovieCards(movieCards)}
      </div>
    );
  }

  let renderMovieCards = (movieCards) => {
    return (
      <div>
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {movieCards.map((card, key) => (
            <MovieCard card={card} key={key} handleFavouriteMovie={handleFavouriteMovie} />
          ))}
        </div>
        <div>
          {movieCards.length > 10 ? renderPagination(Math.ceil(movieCards.length / 10)) : null}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-[#121212] min-h-screen w-full">



        <Routes>
          <Route path="/" element={<>
            {renderSearchPage(cards)}
          </>} />
          <Route path="/card-details/:imdbID" element={<CardDetails />} />
          <Route path="/favorites" element={<>
            {renderFovouritePage(favorites)}
          </>} />

        </Routes>
      </div>
    </>
  )
}

export default App

