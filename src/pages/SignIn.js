import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import {signin} from '../slices/userSlice'

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handlesubmit(e){
        e.preventDefault();
        const {email,password} = e.target.elements;  
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(signin(user))
          navigate("/")
        })
        .catch((error) => {
        });
    }
  return (
    <form onSubmit={handlesubmit} className='flex flex-col justify-center items-center border-2 w-1/4 mx-auto'>
      <input type="email" name="email" placeholder="email" className="border-2 text-center"/>
      <input type="password" name="password" placeholder="password" className="border-2 text-center"/>
      <button className="border-2 px-6">submit</button>
      <Link to="/resetpassword">
         <span>forgot password</span>
      </Link>
      <Link to="/signup">don't hava account <span className="text-blue-400">register</span></Link>
    </form>
  )
}
