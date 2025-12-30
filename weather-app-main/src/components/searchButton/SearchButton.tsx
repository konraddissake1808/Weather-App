import React from 'react'

interface SearchButtonProps {
  searchButtonClick: (city: string, index: number) => void
}

function SearchButton({searchButtonClick} : SearchButtonProps ) {
  return (
    <div className='w-full mt-3'>
        <div className='w-full'>
            <button onClick={() => searchButtonClick('', 0)} className='w-full bg-blue-500 h-14 rounded-xl hover:bg-blue-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-white duration-150'>Search</button>
        </div>
    </div>
  )
}

export default SearchButton