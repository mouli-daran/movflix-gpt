import { useEffect } from 'react'
import { API_OPTIONS } from '../utlils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utlils/moviesSlice';

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies)

    const getNowPlayingMoviesList = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
         const json = await data.json();
         console.log(json.results);

        dispatch(addNowPlayingMovies(json.results));
       }    
     
       useEffect(() => {
        if(!nowPlayingMovies)
         getNowPlayingMoviesList();
       },[]);
     

}

export default useNowPlayingMovies