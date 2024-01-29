import { child, get, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import uuid from 'react-uuid';

export const UpdateTask = () => {
    const [data,setData] = useState({});
    const {id} = useParams();
    console.log(id);
    const state = useSelector(state=>state.user);
    const navigate = useNavigate();
    const [user,setUser] = useState();

    
    useEffect(()=>{
        //getting user
      get(child(ref(db), `users/`)).then((snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

       //getting tasks
      get(child(ref(db), `tasks/`+id)).then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },[])

    console.log(user);
    
    function handleSubmit(e){
        e.preventDefault();
        const {task,description,date,options,colleberate} = e.target.elements;
        set(ref(db, 'tasks/' + id), { 
            id,
            task:task.value,
            description:description.value,
            date:date.value,
            user:state.user.email,
            status:options.value,
            colleberatewith : colleberate.value
          });
          navigate("/")
    }
  return (
    <form className="flex flex-col justify-center items-center gap-2" onSubmit={handleSubmit}>
        <input type="text" className="border-2" placeholder="taskname" name="task" defaultValue={data.task}/>
        <textarea className="border-2" placeholder="description" name="description" defaultValue={data.description}/>
        <div>
          <label>due date : </label>
          <input type="date" className="border-2" min={new Date().toISOString().split("T")[0]} name="date"  defaultValue={data.date}/>
        </div>
        <div>
          <label>status : </label>
          <select name="options" defaultValue={data.options}>
            <option>completed</option>
            <option>pending</option>
            <option>processing</option>
          </select>
        </div>
        <div>
          <label>colleberate with : </label>
          <select name="colleberate" defaultValue={data.colleberate}>
            <option></option>
            {
              user && Object.values(user).map((item,index)=>{
                if(state.user.email == item.email) return;
                return <option key={index}>{item.username}</option>
              })
            }
          </select>
        </div>
        <button>submit</button>
    </form>
  )
}
