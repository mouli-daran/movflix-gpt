import React, { useEffect } from "react";
import { APP_LOGO, USER_LOGO } from "../utlils/constants";
import { auth } from "../utlils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utlils/userSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      console.log("/error");
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid , email , displayName , photoURL }= user;
        dispatch(addUser({uid: uid , email: email , displayName: displayName , photoURL: photoURL}));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unSubscribe();
  },[])


  return (
    <div className="absolute w-screen bg-gradient-to-b px-8 py-2 from-black z-10 flex justify-between">
    
      <img
        className="w-44"
        src={APP_LOGO}
        alt=""
        />
    { user && 
      <div className="flex text-white gap-2 text-lg p-2">
        <img className="w-11 h-11 rounded-lg" src={user?.photoURL} alt="user logo" />
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      }    
    </div>
  );
};

export default Header;
