import React from 'react'

function SearchBar() {
  return (
    <div>
        <input
            type="text"
            placeholder="Search for a place..."
            className="w-full p-4 rounded-2xl bg-white bg-opacity-30 backdrop-blur-md placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
  )
}

export default SearchBar