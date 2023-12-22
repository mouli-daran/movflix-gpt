import React from 'react'
import SearchBar from './SearchBar'
import MovieSuggestions from './MovieSuggestions'
import { BG_IMG } from '../utlils/constants'

const SearchContainer = () => {
  return (
    <div>
              <img src={BG_IMG} alt="backgroundimage" className="fixed -z-20"  />
      <div>
        <SearchBar />
        <MovieSuggestions />
      </div>
    </div>
  )
}

export default SearchContainer