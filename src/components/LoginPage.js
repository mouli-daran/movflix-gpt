import React, { useRef, useState } from "react";
import Header from "./Header";
import { BG_IMG, USER_LOGO } from "../utlils/constants";
import { CheckValidDetails } from "../utlils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utlils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utlils/userSlice";

const LoginPage = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();

  const toggleForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleSubmit = () => {
    const message = CheckValidDetails(
      email.current.value,
      password.current.value,
      );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
        fullName.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: USER_LOGO,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_IMG} alt="logo" className="" />
      </div>
      <form
        className="absolute w-3/12 my-32 left-0 right-0 mx-auto bg-black p-5 text-gray-300 rounded-xl bg-opacity-80"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-3xl my-5 font-semibold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={fullName}
            type="text"
            placeholder="Full Name"
            className=" p-3 w-full my-5 rounded-md bg-stone-600"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email or phone number"
          className=" p-3 w-full my-5 rounded-md bg-stone-600"
        />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className=" p-3 w-full my-5 rounded-md bg-stone-600"
        />
        <p className="text-red-500">{errorMessage}</p>
        <button
          className=" p-3 w-full bg-red-600 my-5 rounded-md font-semibold"
          onClick={handleSubmit}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <div className="flex justify-between">
          <div>
            <input type="checkbox" name="Remember me" className="rememberme" />
            <label htmlFor="rememberme" className="rememberme">
              <span className="mx-2">Remember Me</span>
            </label>
          </div>
          <h2>Need help?</h2>
        </div>
        <h1 className="mt-10 cursor-pointer" onClick={toggleForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now"
            : "Already a user? Sign In "}
        </h1>
        <p className="my-5 text-sm">
          Sign in is protected by Google reCAPTCHA to ensure you’re not a bot.
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
