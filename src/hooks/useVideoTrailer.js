import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utlils/constants";
import { addVideoTrailer } from "../utlils/moviesSlice";
import { useEffect } from "react";


const useVideoTrailer = (movieId) => {
    const dispatch = useDispatch();


    const getMovieTrailer = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
          API_OPTIONS
        );
        const json = await data.json();
        console.log(json);
    
        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];
        console.log(trailer);
        dispatch(addVideoTrailer(trailer))
      };
    
      useEffect(() => {
        getMovieTrailer();
      }, []);
};

export default useVideoTrailer;