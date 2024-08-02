import React from 'react'
import Header from './Header';
import { useState, useRef } from 'react';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name= useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if(message) return;


    if(!isSignInForm) {
          //Sign Up Logic
        createUserWithEmailAndPassword(
          auth, 
          email.current.value, 
          password.current.value
        )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, 
            photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                    addUser({
                        uid: uid, 
                        email: email, 
                        displayName: displayName, 
                        photoURL 
                    })
                );
            navigate("/browse");
          }).catch((error) => {
            // An error occurred
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+ "-" + errorMessage)
        });

    } else {
          //Sign In Logic
        signInWithEmailAndPassword(
          auth, 
          email.current.value, 
          password.current.value
        )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+ "-" + errorMessage)
        });

      }
  };

  const toggleSignUpForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
        <Header/>
        <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/8728e059-7686-4d2d-a67a-84872bd71025/e90516bd-6925-4341-a6cf-0b9f3d0c140a/IN-en-20240708-POP_SIGNUP_TWO_WEEKS-perspective_WEB_34324b52-d094-482b-8c2a-708dc64c9065_large.jpg"
        alt="Logo"
        />
        </div>
        <form
          onSubmit={(e) => e.preventDefault()} 
          className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
          <h1 className='font-bold text-3xl py-4'>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input 
              type='text' 
              placeholder='Full Name' 
              className='p-4 my-4 w-full bg-gray-700 rounded-lg'
            />
          )}  
          <input
            ref={email} 
            type='text' 
            placeholder='Email Address' 
            className='p-4 my-4 w-full bg-gray-700 rounded-lg'
          />
          <input
            ref={password} 
            type='password' 
            placeholder='Password' 
            className='p-4 my-4 w-full bg-gray-700 rounded-lg'
          />
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>

          <button className='p-4 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}</button>
          <p className='py-4 cursor-pointer' onClick={toggleSignUpForm}>
            {isSignInForm 
              ? "New to Netflix? Sign Up Now" 
              : "Already registered!! Sign In Now"}
          </p>
        </form>
    </div>
  )
}

export default Login;