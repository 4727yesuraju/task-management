import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../slices/userSlice';


export const Header = () => {
  const dispatch = useDispatch();
  const state = useSelector(state=>state.user);
  console.log(state);
  function handleSignout(){
      dispatch(signout())
  }
  return (
    <header className="flex flex-row justify-between px-10">
        <div>
            <span className="text-slate-500">TASK</span>
            <span>MANAGEMENT</span>
        </div>
        {!state.user ? <Link to="/signin">
            singin
        </Link> : <button onClick={handleSignout}>signout</button>}
    </header>
  )
}
