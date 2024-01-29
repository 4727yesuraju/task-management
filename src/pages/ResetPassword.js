import React from 'react'
import { auth } from '../Firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export const ResetPassword = () => {
    function handlesubmit(e){
        e.preventDefault();
        const {email} = e.target.elements;
        sendPasswordResetEmail(auth, email.value)
    }
  return (
    <form onSubmit={handlesubmit} className='flex flex-col justify-center items-center'>
      <input type="email" name="email" placeholder="email" className="border-2 text-center"/>
      <button className="border-2 px-6">submit</button>
    </form>
  )
}
