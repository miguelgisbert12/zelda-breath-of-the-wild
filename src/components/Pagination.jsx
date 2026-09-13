import './Pagination.css'

function Pagination({ currentPage, totalPages, onPageChange }) {

    if(totalPages <= 1) {
        return null
    }

    return(
        <nav className='pagination' aria-label='Paginación'>
            <button
                type='button'
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Anterior
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1

                return(
                    <button
                        key={page}
                        type='button'
                        className={currentPage === page ? 'pagination__button--active' : ''}
                        aria-current={currentPage === page ? 'page' : undefined}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            })}

            <button
                type='button'
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Siguiente
            </button>
        </nav>
    )
}

export default Pagination