import { Link } from 'react-router-dom';
import { FaHome, FaHeart } from 'react-icons/fa'; 

function Header() {

    return (
        <div className="max-w-5xl mx-auto flex justify-between items-center py-4 px-6">
          
            <div className="flex items-center justify-between w-full">
                <Link to="/">
                    <span className="text-2xl font-bold text-red-500 poppins-font">
                        Movie Finder
                    </span>
                </Link>
            </div>
      
            <div className="flex gap-4">
               
                <Link
                    to="/"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white hover:bg-red-500 transition-colors"
                >
                    <FaHome className="text-red-500 hover:text-white" size={18} />
                </Link>

                <Link
                    to="/favorites"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white hover:bg-red-500 transition-colors"
                >
                    <FaHeart className="text-red-500 hover:text-white" size={18} />
                </Link>
            </div>
        </div>
    )
}

export default Header;

