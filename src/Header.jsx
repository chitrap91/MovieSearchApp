
import favIcon from './assets/favourite.png'

function Header() {

    return (

        <div className="max-w-5xl mx-auto flex justify-center items-center py-8 flex-col">

            <div className="flex justify-evenly">
                <h1 className="poppins-font text-5xl font-bold text-red-500 text-center w-3/4">Welcome to Movie Finder</h1>
                <div className="w-8 h-8 rounded-full flex items-center justify-center  bg-white hover:bg-red-500 transition-colors">
                    <button> <img src={favIcon} alt="favourite" className="w-4 h-4" /></button>
                </div>
            </div>
            <p className=" mt-5 poppins-font text-sm font-bold text-red-500 text-center">Discover movies , series and episodes from the OMDB Database </p>
            
        </div>

    )



}

export default Header;