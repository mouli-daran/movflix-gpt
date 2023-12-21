import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utlils/constants";
import { addUpcomingMovies } from "../utlils/moviesSlice";
import { useEffect } from "react";


const useUpcomingMovies = () => {
    const dispatch = useDispatch();

    const upcomingMovies = useSelector((store) => store.movies.upcomingMovies)

    const getUpcomingMoviesList = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS)
         const json = await data.json();
         console.log(json.results);

        dispatch(addUpcomingMovies(json.results));
       }    
     
       useEffect(() => {
        getUpcomingMoviesList();
       },[]);
     
};

export default useUpcomingMovies;