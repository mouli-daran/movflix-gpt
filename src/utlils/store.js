import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import seacrchReducer from "./searchSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
    reducer : {
        user: userReducer,
        movies: moviesReducer,
        search: seacrchReducer,
        config : configReducer,
    }
})

export default appStore;