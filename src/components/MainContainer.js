import React from 'react'
import VideoPlayBack from './VideoPlayBack'
import VideoTitle from './VideoTitle'
import { useSelector } from 'react-redux'

const MainContainer = () => {

const movies = useSelector((store) => store.movies?.nowPlayingMovies);
if(!movies) return;
// console.log(movies);

const mainMovie = movies[0];
console.log(mainMovie);

const {id , original_title , overview} = mainMovie;
    
  return (
    <div className="pt-[30%] bg-black md:pt-0">
        <VideoTitle title={original_title} overview={overview}  />
        <VideoPlayBack movieId={id}  />
    </div>
  )
}

export default MainContainer