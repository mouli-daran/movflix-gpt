import React from 'react'
import SearchBar from './SearchBar'
import MovieSuggestions from './MovieSuggestions'
import { BG_IMG } from '../utlils/constants'

const SearchContainer = () => {
  return (
    <>
<div className="fixed -z-10">             
 <img src={BG_IMG} alt="backgroundimage" className="h-screen w-screen object-cover"  />
    </div>
      <div>
        <SearchBar />
        <MovieSuggestions />
      </div>
    </>
  )
}

export default SearchContainer