import React, { useState,useEffect} from "react";
import './App.css';
import axios from 'axios';
import Input from "./components/input";
import Todo from "./components/todo";
import Subject from "./components/subject";
function App() {
  var d = new Date();
  
  const baseUrl = "http://localhost:8080"

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [userid, setUserid] = useState("");
  const [userpw, setUserpw] = useState("");

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getSubjects();
  }, [])
async function getSubjects() {
  await axios
  .get(baseUrl + "/subject/get")
  .then((response) => {
    setSubjects(response.data);
  })
  .catch((error) => {
    console.error(error)
  })
}


  useEffect(() =>{
    getTodos();
  }, []); 
  async function getTodos() {
    await axios
    .get(baseUrl + "/todo")
    .then((response) => {
      setTodos(response.data);
    })
    .catch((error) => {
      console.error(error)
    })
  }

  function loadTimeTable(e){
    e.preventDefault();
    const loadTimeTable = async () => {
      let body = {
        userId: userid,
        userPw : userpw,
      };
      await axios
            .post(baseUrl + "/subject/insert", body)
            .then((response) => {
              console.log(response);
              setInput("");
              setUserid("");
              setUserpw("");
              getTodos();
              getSubjects();
            })
            .catch((error) => {
              console.error(error);
            })
    }
    loadTimeTable();
    
  }
  function insertTodo(e){
    e.preventDefault();

    const insertTodo = async () => {
      await axios
            .post(baseUrl + "/todo", {todoName : input})
            .then((response) => {
              console.log(response.data)
              setInput("");
              getTodos();
            })
            .catch((error) => {
              console.error(error);
            })
    }
    insertTodo();
    console.log("할일이 추가됨")
  }
  
  function updateTodo(id){
    const updateTodo = async () => {
      await axios
            .put(baseUrl + "/todo/" + id, {})
            .then((response) => {
              console.log(response.data)
              getTodos();
            })
            .catch((error) => {
              console.error(error);
            })
    }
    updateTodo();
  }

  function deleteTodo(id){
    const deleteTodo = async () => {
      await axios
            .delete(baseUrl + "/todo/"+ id,{})
            .then((response) => {
              console.log(response.data)
              getTodos();
            })
            .catch((error) => {
              console.error(error);
            })
    }
    deleteTodo();
  }

  function changeText(e){
    e.preventDefault();
    setInput(e.target.value);
    
  }
  function changeId(e){
    e.preventDefault();
    setUserid(e.target.value);
    
  }
  function changePw(e){
    e.preventDefault();
    setUserpw(e.target.value);
    
  }
  return (
    <div className="App">
      <h1>My planner</h1>
      <Input handleSubmit={insertTodo} input={input} handleChange={changeText}/>

      {
        todos
        ? todos.map((todo) => {
          return (
            <Todo  key={todo.id} todo={todo} handleClick={() => updateTodo(todo.id)} handleDelete={() => deleteTodo(todo.id)}/>
          )
        })
        :null
      }
      
      { 
        subjects
        ? subjects.map((subject) => {
          
          if(subject.day == d.getDay() - 1){
          return (
            <div className="subject" key={subject.id}>
              <h3><label>{subject.name}, {subject.professor}</label>
              
              </h3>

              
            </div>
          )
          }
          
          
        })
        :null
        
      }
      
        
        <form onSubmit={loadTimeTable} >
          <h3>login in Everytime</h3>
          <label>
            id
            <input type="text" required={true} value={userid} onChange={changeId}></input>
            pw
            <input type="password" required={true} value={userpw} onChange={changePw}></input>
          </label>
          &nbsp;<input type="submit" value = "Login" ></input>
        </form>
      
    </div>
  );
}

export default App;
