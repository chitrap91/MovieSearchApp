import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CardDetails() {
    const { imdbID } = useParams();
    const [content, setContent] = useState(null);

    useEffect(() => {
        if (!imdbID) return;

        async function fetchCard() {
            try {
                const res = await fetch(`https://www.omdbapi.com/?apikey=7d697241&i=${imdbID}`);
                const data = await res.json();
                setContent(data);
                console.log(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchCard();
    }, []);

    if (!content) return <div className="p-4">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-2">{content.Title}</h1>
            <p className="text-gray-400">Year: {content.Year}</p>
            <p className="text-gray-400 mb-4">Genre: {content.Genre}</p>
            <img src={content.Poster} alt={content.Title} className="w-full h-auto mb-4" />
            <p className="mt-4">{content.Plot}</p>
        </div>
    );
}

export default CardDetails;