import { useEffect } from 'react'
import { API_OPTIONS } from '../utlils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addPopularMovies } from '../utlils/moviesSlice';

const usePopularMovies = () => {

    const dispatch = useDispatch();

    const popularMovies = useSelector((store) => store.movies.popularMovies)

    const getPopularMoviesList = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS)
         const json = await data.json();
         console.log(json.results);

        dispatch(addPopularMovies(json.results));
       }    
     
       useEffect(() => {
        if(!popularMovies)
         getPopularMoviesList();
       },[]);
     

}

export default usePopularMovies;