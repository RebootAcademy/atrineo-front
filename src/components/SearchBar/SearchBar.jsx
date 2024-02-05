import { useState } from 'react'

import SearchResult from '../SearchResult/SearchResult'

export default function SearchBar() {
  const [searchResults, setSearchResults] = useState([])

  const handleChange = (e) => {
    console.log(e.target.value)
    searchQuery(e.target.value)
  }

  const searchQuery = async (query) => {
    const result = await search(query)
    setSearchResults(result.features)
  }

  const displayResults = () => {
    return searchResults.map(result => {
      console.log(result)
      return (
        <SearchResult key={result.properties.place_id} data={result || null} />
      )
    })
  }

  return (
    <div className='relative top-4 left-4 z-[9999999999]'>
      <input
        className="pl-8 z-[9999999999] border border-gray rounded-sm p-2 w-60"
        placeholder="Find address, place or company"
        onChange={handleChange}
      />
      <svg className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      <ul className='absolute top-12.5 left-18 z-[999999999] pl-2.5 w-[50%]'>
        {displayResults()}
      </ul>
    </div>
  );
}