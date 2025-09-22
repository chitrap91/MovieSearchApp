import { Link } from 'react-router-dom';
import favIcon from './assets/favourite.png'

function MovieCard({ card, handleFavouriteMovie }) {

    return (

        <div className="mt-10 relative bg-[#1f2937] rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
            {/* Poster */}
            <img
                src={card.Poster}
                alt={card.Title}
                className="w-full h-72 object-cover"
            />

            {/* Info */}
            <div className="p-4">
                <h2 className="text-lg font-bold text-white mb-2">{card.Title}</h2>
                <p className="text-gray-400">Year: {card.Year}</p>
                <p className="text-gray-400 capitalize">Type: {card.Type}</p>
                <div className="flex items-center justify-between mt-3">
                    {/* View on IMDB */}
                    {/* <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<MovieCard />} />
                        </Routes>
                    </BrowserRouter> */}
                    <Link
                        to={`/card-details/${card.imdbID}`}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        View on IMDB
                    </Link>

                    {/* Favourite Button */}
                    <button onClick={() => handleFavouriteMovie(card)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white hover:bg-red-500 transition-colors">
                        <img src={favIcon} alt="favourite" className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )

}



export default MovieCard;