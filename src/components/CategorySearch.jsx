import searchIcon from '../assets/icons/buscar.png'

import './CategorySearch.css'

function CategorySearch({ value, onChange, placeholder }) {

    return(
        <div className='category-search'>
            <img
                className='category-search__icon' 
                src={searchIcon} 
                alt="" 
            />

            <input
                className='category-search__input' 
                type="search"
                value={value} 
                onChange={onChange} 
                placeholder={placeholder} 
            />
        </div>
    )
}

export default CategorySearch