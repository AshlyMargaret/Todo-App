import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';


function App() { 

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const date = new Date();
const day = dayNames[date.getDay()];


  const [todo, setToDo] = useState('');
  const [todos, setToDos] = useState([])
  return (
    <div className="app_container">
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {day} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={todo} onChange={(e)=>{
          setToDo(e.target.value)
        }} type="text" placeholder="🖊️ Add item..." />
        <i onClick={()=>{
          setToDos([...todos, { id:Date.now(), text:todo , progressStatus:"on_going" , isDeleted:false } ])
        }} className="fas fa-plus"></i>
      </div>
    </div>

    <div className="flexBox_container">
      <div className="done">
        <div className="title">
          <h3>Done</h3> 
        </div>
        <div className="todos">
          {
            todos.map((todo)=>{
              if(todo.progressStatus=="done" && !todo.isDeleted){
                return(
                  <div className="todo">
                    <div className="left">
                    <input type="checkbox" />
                    <div className="top">
                    <p>{todo.text}</p>
                    </div>
                    </div>
                    <div className="right">
                    <i className="fas fa-times"></i>
                    </div>
                </div>
                )
              }
              return null
            })
          }
        </div>
        
      </div>
      <div className="ongoing">
      <div className="title">
          <h3>On Going</h3>
        </div>
        <div className="todos">
        {
          todos.map((todo)=>{
            if(todo.progressStatus=="on_going" && !todo.isDeleted)
            return(
              <div className="todo">
               <div className="left">
                <input onChange={(e)=>{
                  console.log(e.target.checked);
                  console.log(todo);
                  setToDos(todos.filter(object=>{
                    if(object.id==todo.id){
                      object.progressStatus =e.target.checked ? "done":"on_going";
                    }
                    return object;
                  }))
                }} value={todo.progressStatus=="done"} type="checkbox" name="" id="" />
                <div className="top">
                <p>{todo.text}</p>
                </div>
                </div>

                <div className="right">
                <i onClick={(e)=>{
                 e.target.value = true;
                 console.log(e.target.value);
                 console.log(todo);
                 setToDos(todos.filter(filterTodo=>{
                  if(filterTodo.id==todo.id){  
                    console.log("object id:",filterTodo.id);
                    filterTodo.isDeleted =e.target.value
                    console.log("status drop",filterTodo.isDeleted);
                  }
                  return filterTodo
                 
                 }))
                }}  className="fas fa-times"></i>
               </div>
              </div>
            )
          })
         
        }
      </div>
      </div>
      <div className="trash">
      <div className="title">
          <h3>Trash</h3>
        </div>
        {
           
           todos.map((todo)=>{
              if(todo.isDeleted){
                return(
                  <div className="todo">
                  <p>{todo.text}</p>
                </div>
                )
              }
              return null
            })
         
        }
      </div>
    </div>
    </div>
  );
}

export default App;