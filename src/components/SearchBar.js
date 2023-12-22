import React from "react";
import lang from "../utlils/languageConstants";
import { useSelector } from "react-redux";

const SearchBar = () => {

    const langChange = useSelector(store => store.config.lang); 

  return (
    <div>
        <div>
      <div className="pt-[35%] md:pt-[10%] flex justify-center text-white">
        <form className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg">
          <input
            type="text"
            className=" p-4 m-4 col-span-9 rounded-lg bg-white"
            placeholder={lang[langChange].searchPlaceholder}
            />
          <button
            className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
            onSubmit={(e) => e.preventDefault()}
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
