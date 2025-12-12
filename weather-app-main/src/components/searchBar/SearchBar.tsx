import React from 'react'

function SearchBar() {
  return (
    <div className='w-full'>
        <input
            type="text"
            placeholder="Search for a place..."
            className="w-full p-4 rounded-xl bg-neutral-800 bg-opacity-30 backdrop-blur-md placeholder-gray-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
  )
}

export default SearchBar