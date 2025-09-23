function Pagination({ totalResults, currentPage, visiblePages , handlePageClick }) {
    const totalPages = Math.ceil(totalResults / 10);

    if (totalPages <= 1) return null;
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

export default Pagination;