import { Link } from 'react-router-dom';
import { FaHome, FaHeart } from 'react-icons/fa'; // 🔹 Home & Favourite icons


function Header() {

    return (

        // <div className="max-w-5xl mx-auto flex justify-center items-center py-8 flex-col">
        <div className="max-w-5xl mx-auto flex justify-between items-center py-4 px-6">
            {/* <div className="flex justify-evenly"> */}
            <div className="flex items-center justify-between w-full">
                <Link to="/">
                    <span className="text-2xl font-bold text-red-500 poppins-font">
                        Movie Finder
                    </span>
                </Link>
            </div>
            {/* <h1 className="poppins-font text-5xl font-bold text-red-500 text-center w-3/4">Welcome to Movie Finder</h1> */}
            {/* Nav Icons */}
            <div className="flex gap-4">
                {/* Home */}
                <Link
                    to="/"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white hover:bg-red-500 transition-colors"
                >
                    <FaHome className="text-red-500 hover:text-white" size={18} />
                </Link>

                {/* Favourites */}
                <Link
                    to="/favorites"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white hover:bg-red-500 transition-colors"
                >
                    <FaHeart className="text-red-500 hover:text-white" size={18} />
                </Link>
            </div>
            {/* <div className="w-8 h-8 rounded-full flex items-center justify-center  bg-white hover:bg-red-500 transition-colors">

                    <Link
                        to={`/favourite-movies`}
                    >
                        <button> <img src={favIcon} alt="favourite" className="w-4 h-4" /></button>
                    </Link>
                </div> */}
            {/* </div> */}
            {/* <p className=" mt-5 poppins-font text-sm font-bold text-red-500 text-center">Discover movies , series and episodes from the OMDB Database </p> */}
        </div>
    )
}

export default Header;

