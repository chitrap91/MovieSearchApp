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

  // async function fetchCards() {
  //   try {
  //     console.log("fetching cards")
  //     const cardsData = await fetch("https://www.omdbapi.com/?s=english&apikey=7d697241")
  //     const cardsResponse = await cardsData.json()
  //     console.log(cardsResponse)
  //     setCards(cardsResponse.Search || [])
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    handleMovieSearch("avengers")
  }, [])

  let handleMovieSearch = async (searchText) => {
    try {
      const resp = await axios.get(
        `https://www.omdbapi.com/`,
        {
          params: {
            s: searchText,
            apikey: "7d697241",
          },
        }
      );
      console.log(resp);

      setCards(resp.data.Search || []);
    } catch (error) {
      if (error.status == 404) {
        setCards([]);
      }

      if (error.status == 500) {
        alert("Something went wrong...");
      }
    }
  };


  function renderMovieCards(cards) {
    return (

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card, key) => (
          <MovieCard card={card} key={key} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#121212] min-h-screen w-full">

        <Header />

        <Search handleMovieSearch={handleMovieSearch} />



        {/* <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map((card, key) => (
            <MovieCard card={card} key={key} />
          ))}
        </div> */}
        <Routes>
          <Route path="/" element={renderMovieCards(cards)} />
          <Route path="/card-details/:imdbID" element={<CardDetails />} />
        </Routes>
      </div>
    </>
  )
}

export default App

