import { child, get, ref, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../Firebase';
export const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector(state=>state.user);
  console.log(state);

 

  const [tasks,setTasks] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    get(child(ref(db), `tasks`)).then((snapshot) => {
      if (snapshot.exists()) {
        setTasks(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  },[])
  console.log(tasks);

  function deleteTask(id){
    console.log(id);
    remove(ref(db,"tasks/"+id));
    location.reload();
  }
  return (
    
    <div className="border-2 p-2 mt-2">
      {!state?.user ? <h1>login first</h1> : 
      <div>
         <div className="flex justify-between border-2 p-2">
             <input type="text" className="border-2 text-center" placeholder="search"/>
             <Link to="/create-task" className="bg-black px-5 text-[aqua] rounded-lg">new task</Link>
         </div>
         <div>
           <table className="border-2 w-full">
             <tr>
               <th>user</th>
               <th>task</th>
               <th>description</th>
               <th>status</th>
               <th>due date</th>
               <th>colleberation</th>
               <th>actions</th>
             </tr>
           {
             tasks && Object.values(tasks).map((item,index)=>{
              console.log(item);
              console.log("=>",item.user,state.user.email)
              if(!item) return ;
                return <tr key={index} className='text-center' id={item.id}>
                  <td>{item.user}</td>
                  <td>{item.task}</td>
                  <td>{item.description || "yesu "}</td>
                  <td>{item.status}</td>
                  <td>{item.date}</td>
                  <td>{item.colleberatewith || "single"}</td>
                  {item.user==state.user.email ? <td className="flex gap-4 items-center justify-center text-center">
                    <button className="border-2 px-2 rounded-lg bg-green-400" onClick={()=>navigate('/update-task/'+item.id)}>update</button>
                    <button className="border-2 px-2 rounded-lg bg-red-400" onClick={()=>deleteTask(item.id)}>delete</button>
                  </td>: <span className="bg-red-500 px-2 rounded-lg border-2">forbidden</span>}
                </tr>
             })
           }
           </table>
         </div>
      </div> }
      
    </div>
  )
}
