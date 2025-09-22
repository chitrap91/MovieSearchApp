import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CardDetails() {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        if (!imdbID) return;

        async function fetchCard() {
            try {
                const res = await fetch(`https://www.omdbapi.com/?apikey=7d697241&i=${imdbID}`);
                const data = await res.json();
                setMovie(data);
                console.log(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchCard();
    }, []);

    if (!movie) return <div className="p-4">Loading...</div>;

    return (
        <div className="bg-black w-5xl mx-auto text-white min-h-screen p-6">

            <div className="flex flex-col md:flex-row gap-8">

                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-72 h-auto rounded-lg shadow-lg"
                />


                <div className="flex flex-col justify-start">
                    <h1 className="text-4xl font-bold">
                        {movie.Title}{" "}
                        <span className="text-gray-400 text-2xl">({movie.Year})</span>
                    </h1>


                    <p className="text-yellow-400 mt-3 text-lg">
                        ⭐ {movie.imdbRating} / 10
                    </p>


                    <p className="text-gray-400 mt-1">
                        {movie.Runtime} | {movie.Released} | {movie.Language}
                    </p>

                    <div className="mt-6 flex gap-4">
                        <a
                            href={`https://www.imdb.com/title/${imdbID}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                        >
                            ▶ Play
                        </a>
                        <button className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition">
                            + Add to Favourites
                        </button>
                    </div>
                </div>
            </div>


            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-2">Plot</h2>
                <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
            </div>


            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Cast</h2>
                    <p className="text-gray-300">{movie.Actors}</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Director</h2>
                    <p className="text-gray-300">{movie.Director}</p>
                </div>
            </div>


            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-2">Ratings</h2>
                <p className="text-gray-300">IMDB: {movie.imdbRating}</p>
            </div>
        </div>
    );

}

export default CardDetails;