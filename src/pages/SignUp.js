import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../Firebase'
import { ref, set } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';

export const SignUp = () => {
    const navigate = useNavigate();
    function handlesubmit(e){
         e.preventDefault();
         const {email,password,username} = e.target.elements;
         console.log(email.value);

        
        createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user.uid);
            set(ref(db, 'users/' + user.uid), {
                username: username.value,
                email:email.value
              });
            navigate("/signin")
        })
        .catch((error) => {
            // ..
        });
    }
  return (
    <form onSubmit={handlesubmit} className='flex flex-col border items-center justify-center w-1/4 mx-auto'>
       <input type="text" name='username' placeholder="username" className="text-center border-2"/>
       <input type="email" name="email" placeholder="email" className="text-center border-2"/>
       <input type="password" name="password" placeholder="password" className="text-center border-2"/>
       <button>submit</button>
       <Link to="/signin">
        <span>hava an account </span>
        <span className="text-blue-500">login</span>
       </Link>
    </form>
  )
}
