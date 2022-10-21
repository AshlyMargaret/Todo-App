import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';


function App() { 

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const date = new Date();
const day = dayNames[date.getDay()];


  const [todo, setToDo] = useState('');
  const [todos, setToDos] = useState([])

  const clearInputField = () => {
    setToDo('');
 };

  return (
    <div className="app_container">
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {day} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={todo} onChange={(e)=>{
          setToDo(e.target.value)
        }} type="text" placeholder="🖊️ Add item..." />
         <i onClick={clearInputField} className="fas fa-eraser" title="Clear"></i>
        <i onClick={()=>{
          setToDos([...todos, { id:Date.now(), text:todo , progressStatus:"on_going" , isDeleted:false } ])
        }} className="fas fa-plus"></i>
      </div>
    </div>

    <div className="flexBox_container">
      <div className="done">
        <div className="title">
          <h4>Done</h4> 
        </div>
        <div className="todos">
          {
            todos.map((todo)=>{
              if(todo.progressStatus=="done" && !todo.isDeleted){
                return(
                  <div className="todo">
                    <div className="left">
                    <i onClick={(e)=>{
                      e.target.value = true;
                      console.log(e.target.value);
                      console.log(todo);
                      setToDos(todos.filter((object)=>{
                        if(object.id==todo.id){
                          object.progressStatus =e.target.value ? "not_complted":"done";
                        }
                        return object;
                      }))
                    }} className="fas fa-redo-alt" title="Retrieve"></i>
                    </div>
                    <div className="top">
                    <p>{todo.text}</p>
                    </div>
                    
                    <div className="right">
                    <i onClick={(e)=>{
                      console.log(e);
                      console.log(todo);
                      e.target.value = true
                      setToDos(todos.filter((object)=>{
                        if(object.id==todo.id){
                          object.isDeleted=e.target.value
                          object.progressStatus = "trash"
                        }
                        return object
                      }))
                    }} className="fas fa-trash-alt" title="Remove"></i>
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
          <h4>On Going</h4>
        </div>
        <div className="todos">
        {
          todos.map((todo)=>{
            if(todo.progressStatus=="on_going" || todo.progressStatus=="not_complted" && !todo.isDeleted)
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
                 </div>
                <div className="top">
                <p>{todo.text}</p>
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
                    filterTodo.progressStatus =e.target.value ? "trash":"on_going";
                  }
                  return filterTodo
                 
                 }))
                }}  className="fas fa-trash-alt" title="Remove"></i>
               </div>
              </div>
            )
          })
         
        }
      </div>
      </div>
      <div className="trash">
      <div className="title">
          <h4>Trash</h4>
        </div>
        <div className="todos">
        {
           
           todos.map((todo)=>{
              if(todo.progressStatus=="trash" &&todo.isDeleted ){
                return(
                  <div className="todo">
                    <div className="left">
                    <i onClick={(e)=>{
                      console.log(e)
                      console.log(todo);
                      e.target.value="true"
                      setToDos(todos.map((object)=>{
                        if(object.id==todo.id){
                          object.progressStatus =e.target.value ? "on_going":null;
                        }
                        return object
                      }))
                    }
                    } 
                  className="fas fa-redo-alt" title="Retrieve"></i>
                  </div>
                    <div className="top">
                    <p>{todo.text}</p>
                    </div>  
                    
                    <div className="right">
                      <i onClick={(e)=>{
                        e.target.value=true
                        console.log(todo);
                        setToDos(todos.filter((object)=>{
                          if(object.id==todo.id){
                            object.progressStatus=e.target.value ? "permenantly_deleted" : null
                          }
                          return object
                        }))
                      }
                        } className="fas fa-trash-alt" title="Remove"></i>
                    </div>                 
                </div>
                )
              }
              return null
            })
         
        }
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;