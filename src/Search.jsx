


import { useFormik } from "formik";

const Search = ({ handleMovieSearch }) => {
    const formik = useFormik({
        initialValues: {
            search: "",
        },
        onSubmit: (values) => {
            handleMovieSearch(values.search); // ✅ correct function call
            console.log(values);
        },
    });

    return (
        <div className="mt-5 mx-auto flex items-center max-w-5xl md:w-1/3 bg-white rounded-lg overflow-hidden shadow">
            <form onSubmit={formik.handleSubmit} className="flex w-full">
                <input
                    type="text"
                    name="search"
                    onChange={formik.handleChange}
                    value={formik.values.search}
                    placeholder="Search movies..."
                    className="flex-grow w-full p-2 text-gray-900 outline-none"
                />

               
                <input
                    type="submit"
                    value="Search"
                    className="bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 transition-colors cursor-pointer"
                />
            </form>
        </div>
    );
};

export default Search;


