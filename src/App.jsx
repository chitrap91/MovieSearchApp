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
  const [totalResults, setTotalResults] = useState(0); // API totalResults value
  const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4, 5]);
  const [favorites, setFavorites] = useState([])
  const [searchText, setSearchText] = useState("batman")

  let fetchData = async (searchText, currentPage = 1, type = "") => {
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

  useEffect(() => {
    fetchData(searchText, currentPage);
  }, [])

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



  function handlePageClick(page) {
    fetchData(searchText, page);

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

  let renderSearchPage = (movieCards) => {
    return (
      <div>
        <Header />

        <Search handleMovieSearch={fetchData} />
        {renderMovieCards(movieCards)}
      </div>
    );
  }

  let renderFovouritePage = (movieCards) => {
    return (
      <div>
        <Header />
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {movieCards.map((card, key) => (
            <MovieCard card={card} key={key} handleFavouriteMovie={handleFavouriteMovie} />
          ))}
        </div>
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
          <Pagination
            totalResults={totalResults}
            currentPage={currentPage}
            visiblePages={visiblePages}
            handlePageClick={handlePageClick}
          />
        </div>
      </div>
    );
  }


  return (
    <>
      <div className="bg-[#121212] min-h-screen w-full">
        <Routes>
          <Route path="/" element={
            <>
              {renderSearchPage(cards)}
            </>
          } />
          <Route path="/card-details/:imdbID" element={<CardDetails />} />
          <Route path="/favorites" element={
            <>
              {renderFovouritePage(favorites)}
            </>
          } />
        </Routes>
      </div>
    </>
  )
}

export default App

