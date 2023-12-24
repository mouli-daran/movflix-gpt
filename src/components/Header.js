import React, { useEffect } from "react";
import { APP_LOGO, SUPPORTED_LANGUAGES } from "../utlils/constants";
import { auth } from "../utlils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utlils/userSlice";
import { toggleSearchView } from "../utlils/searchSlice";
import { changeLanguage } from "../utlils/configSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSearch = useSelector((store) => store.search.showSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("/error");
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unSubscribe();
  }, []);

  const handleToggleView = () => {
    dispatch(toggleSearchView());
  };

const handleLanguageChange = (e) => {
  dispatch(changeLanguage(e.target.value));
}

  return (
    <div className="absolute w-screen bg-gradient-to-b px-8 py-2 from-black z-10 flex flex-col justify-between  md:flex-row">
      <img className="w-44 mx-auto md:mx-0" src={APP_LOGO} alt="" />
      {user && (
        <div className="flex justify-between text-white gap-4 text-lg p-2">
          {showSearch && <select className="bg-gray-900 p-2 h-11 rounded-lg mx-5" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            className="py-2 px-4 bg-violet-600 text-white rounded-lg h-11"
            onClick={handleToggleView}
          >
            {showSearch ? "Home" : "Search"}
          </button>
          <img
            className="w-11 h-11 rounded-lg hidden md:block"
            src={user?.photoURL}
            alt="user logo"
          />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default Header;
