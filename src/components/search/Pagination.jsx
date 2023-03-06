import { usePagination, SEPERATOR } from "../../hooks/usePagination"

/**
 * @desc - Pagination component
 * @param {number} props.total - The total number of items
 * @param {number} props.numberPerPage - The number of items per page
 * @param {number} props.currentPage - The current page
 * @param {number} props.siblingCount - The number of sibling pages to show
 * @param {function} props.onPageChange - The function to call when page changes
 * @returns {component} - The pagination component
 */
const Pagination = ({
    total,
    numberPerPage,
    currentPage,
    siblingCount = 1,
    onPageChange
}) => {
    const paginationRange = usePagination({
        total,
        numberPerPage,
        currentPage,
        siblingCount
    })

    if (currentPage === 0 || paginationRange.length < 2) return null

    const nextPage = () => onPageChange(currentPage + 1)
    const prevPage = () => onPageChange(currentPage - 1)
    
    const lastPage = paginationRange[paginationRange.length - 1]

    const pageButtons = paginationRange.map((pageNumber, index) => {
        if (pageNumber === SEPERATOR) {
            return <span key={index}>&#8230;</span>
        }

        return (
            <button
                key={index}
                className={`btn-select btn-page ${+currentPage === pageNumber ? 'page-active' : ''}`}
                onClick={() => onPageChange(pageNumber)}
            >
                {pageNumber}
            </button>
        )
    })

    return (
        <div className="pagination__container">
            <button 
                className={`btn-page-nav ${+currentPage === 1 ? '' : 'btn-page-nav-active'}`}
                onClick={prevPage}
                disabled={+currentPage === 1}
            >
                Prev
            </button>
            <div className="page-btn__container">
                {pageButtons}
            </div>
            <button
                className={`btn-page-nav ${+currentPage === lastPage ? '' : 'btn-page-nav-active'}`}
                onClick={nextPage}
                disabled={+currentPage === lastPage}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination