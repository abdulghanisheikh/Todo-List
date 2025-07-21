"use client";
import React, { useState } from 'react';

const page=()=>{
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [task, setTask]=useState([]); //array of tasks{title,desc}

  const submitHandler=(e)=>{
    e.preventDefault();
    if(title!=="" && desc!==""){
      setTask([...task,{title,desc,completed:false}]); //basically append
      setTitle("");
      setDesc("");
    }
  }

  const deleteHandler=(id)=>{
    let copyTask=[...task];
    copyTask.splice(id,1); //splice(startingIndex,elementCount) used to remove elements from array
    setTask(copyTask); 
  }

  const completeHandler=(id)=>{
    const updatedTask=[...task];
    updatedTask[id].completed=!updatedTask[id].completed;
    setTask(updatedTask);
  }

  let renderTask=<li><h1 className='text-md font-medium'>No Task available</h1></li>

  if(task.length>0){
    renderTask=task.map((t,id)=>{
    return <li key={id}>
      <div className={`mb-5 w-2/3 rounded p-10 flex justify-between ${t.completed?'bg-blue-900':'bg-blue-300'}`}>
        <div>
          <p className={`text-2xl font-semibold ${t.completed?'line-through text-white':''}`}>{t.title}</p>
          <p className={`text-xl font-medium ${t.completed?'line-through text-white':''}`}>{t.desc}</p>
        </div>
        <div className='flex gap-5'>
        <button
        onClick={()=>{
          return completeHandler(id);
        }}
        className='duration-250 ease-in-out px-4 py-2 w-35 cursor-pointer hover:shadow-lg shadow-blue-200 hover:scale-105 hover:bg-green-500 active:scale-95 bg-green-600 text-white text-xl rounded font-bold'>{t.completed?"Undo":"Complete"}</button>
        <button 
        onClick={()=>{
          return deleteHandler(id);
        }} 
        className='duration-250 ease-in-out px-4 py-2 w-25 cursor-pointer hover:shadow-lg shadow-blue-200 hover:scale-105 hover:bg-red-500 active:scale-95 bg-red-600 text-white text-xl rounded font-bold'>Delete</button>
        </div>
      </div>
      </li>
    });
  }

  return(
    <div>
      <h1 id='heading' className='bg-gray-700 text-5xl text-white py-10 text-center font-bold'>GetItDone</h1>
      <form id='form' onSubmit={submitHandler}>
        <input
        value={title}
        onChange={(e)=>{
          setTitle(e.target.value);
        }}
        type="text" 
        className='duration-250 ease-in-out hover:scale-102 rounded m-5 px-4 py-2 text-2xl bg-zinc-200' 
        placeholder='Enter Title here'/>
        <input
        value={desc}
        onChange={(e)=>{
          setDesc(e.target.value);
        }}
        type="text" 
        className='duration-250 ease-in-out hover:scale-102 rounded m-5 px-4 py-2 text-2xl bg-zinc-200' 
        placeholder='Enter Description here'/>
        <button className='duration-250 ease-in-out ml-10 px-4 py-2 w-29 cursor-pointer hover:shadow-lg shadow-blue-200 hover:scale-105 hover:bg-blue-500 active:scale-95 bg-blue-600 text-white text-2xl rounded font-bold'>Add</button>
      </form>
      <hr className='border-0' />
      <div id='list' className='p-10 bg-slate-200'>
        <ul>
          {renderTask}
        </ul>
      </div>
    </div>
  )
}

export default page;