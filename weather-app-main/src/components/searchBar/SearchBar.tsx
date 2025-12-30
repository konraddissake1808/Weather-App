import React, { ReactNode, useEffect, useRef, useState } from 'react'

interface Location {
  city: string;
  country: string;
  createdAt: string;
  latitude: number;
  longitude: number;
}

interface SearchBarProps {
  locations?: Location[];
  cities?: string[];
  countries?: string[];
  latitude?: number[];
  longitude?: number[];
  searchBarOptionClick: (city: string, index: number) => void;
  searchBarValueFromOptions: string;
  onSearchInput: (inputValue: string) => void;
}

function SearchBar( { locations = [], cities, countries, latitude, longitude, searchBarOptionClick, searchBarValueFromOptions, onSearchInput }: SearchBarProps ) {
  
  const [query, setQuery] = useState<string>(searchBarValueFromOptions ?? '');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  const dropdownMenuRef = useRef<HTMLDivElement>(null)

  const openDropdown = () => {
    dropdownMenuRef.current?.classList.remove('hidden')
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setQuery(value)
    onSearchInput(value)

    if (!value.trim()) {
      setFilteredLocations([])
      dropdownMenuRef.current?.classList.add('hidden')
      return
    }

    const q = value.trim().toLowerCase()

    const matches = locations.filter((loc) => {
      const city = (loc.city || '').toLowerCase()
      const country = (loc.country || '').toLowerCase()
      return city.includes(q) || country.includes(q)
    })

    setFilteredLocations(matches)

    if (matches.length > 0) dropdownMenuRef.current?.classList.remove('hidden')
    else dropdownMenuRef.current?.classList.add('hidden')
  }

  useEffect(() => {
    // initialize filtered list when locations prop changes
    setFilteredLocations(locations)
  }, [locations])

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const searchBar = document.getElementById('searchBar');
      const searchOptions = document.getElementById('searchOptions');
      if (!searchBar?.contains(e.target as HTMLElement)) {
        searchOptions?.classList.add('hidden');
      }
    }

    document.addEventListener('click', handleDocClick)
    return () => document.removeEventListener('click', handleDocClick)
  }, [])

  return (
    <div className='w-full font-dm-sans'>
      <div id='searchBar'>
        <input
            onClick={openDropdown}
            onChange={handleInputChange}
            value={query}
            type="text"
            placeholder="Search for a place..."
            id='search-bar'
            className="w-full p-4 rounded-xl bg-neutral-800 bg-opacity-30 backdrop-blur-md placeholder-gray-700 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div ref={dropdownMenuRef} id='searchOptions' className='hidden relative'>
        <div className='absolute z-10 w-full bg-neutral-800 rounded-lg'>
          {
            filteredLocations && filteredLocations.length > 0 ? (
              filteredLocations.map((loc, index) => (
                <div onClick={() => { searchBarOptionClick(loc.city ?? '', index); setQuery(`${loc.city}, ${loc.country}`); dropdownMenuRef.current?.classList.add('hidden') }} key={`${loc.city}-${loc.country}-${index}`} className='bg-neutral-800 w-full text-neutral-0 px-3 py-4 rounded-lg'>
                  <button>{loc.city}, {loc.country}</button>
                </div>
              ))
            ) : (
              <div className='px-3 py-4 text-gray-400'>No matches found</div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SearchBar