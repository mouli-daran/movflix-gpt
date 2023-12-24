import React, { useRef } from "react";
import lang from "../utlils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utlils/openai";
import { API_OPTIONS } from "../utlils/constants";
import { addGptMovieResult } from "../utlils/searchSlice";

const SearchBar = () => {
  const langChange = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const SearchMovieTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "s&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearch = async () => {
    console.log(searchText.current.value);

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 6 movies, comma seperated like the example result given ahead. Example Result: Jawan, Sholay, Don, Koi Mil Gaya";

    const gptSearchResults = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: gptQuery }],
    });
    console.log(gptSearchResults?.choices?.[0]?.message?.content);

    const gptMovies =
      gptSearchResults?.choices?.[0]?.message?.content.split(",");
    console.log(gptMovies);

    const returnedPromiseArray = gptMovies.map(movie => SearchMovieTmdb(movie));

    const tmdbResults = await Promise.all(returnedPromiseArray);
    console.log(tmdbResults);
    dispatch(addGptMovieResult({movieNames:gptMovies , movieResults:tmdbResults}));
  };

  return (
    <div>
      <div>
        <div className="pt-[35%] md:pt-[10%] flex justify-center ">
          <form
            className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg text-black"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={searchText}
              type="text"
              className=" p-4 m-4 col-span-9 rounded-lg text-black"
              placeholder={lang[langChange].searchPlaceholder}
            />
            <button
              className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
              onClick={handleGptSearch}
            >
              {lang[langChange].search}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
