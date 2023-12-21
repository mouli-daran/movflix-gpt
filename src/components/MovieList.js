import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title , movies}) => {
  return (
    <div>

    <div className='px-6'>
        <h1 className=' md:text-3xl py-4 font-bold text-white'>{title}</h1>
        <div className='flex overflow-x-scroll scrollbar-hide '>
        <div className='flex '>
        {movies.map((movie) => (
            <MovieCard key={movie.id} posterpath={movie.poster_path}/>
            ))
        }
        </div>
        </div>
    </div>
        </div>
  )
}

export default MovieList