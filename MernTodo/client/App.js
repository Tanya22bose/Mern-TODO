import React from 'react';
import './App.css';
import ListItems from './ListItems'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

class App extends React.Component {
  constructor(props){
    super(props);

    this.addTask = this.addTask.bind(this);
    this.deleteTask= this.deleteTask.bind(this);
    this.EditTask = this.EditTask.bind(this);
    this.showTask = this.showTask.bind(this);

    this.state = {
      todoitems:[],
      task:""
    }
  }
  
  addTask(e){
    var url = "http://localhost:5000/api/todo/TODOR/AddTask"
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        "task":this.state.task
      }),
      headers:{
        'Content-type':'application/json; charset=UTF-8'
      }
    }).then(() => this.extra());
  };

  extra(){
    this.setState({
      task:"",
  })
  this.showTask()
  }

    async showTask(req,res){
    let test = [];
    let response = await fetch("http://localhost:5000/api/todo/TODOR/ShowTask")
    let data = await response.json();
    for(var i=0; i<data.length; i++)
    {
      test.push(data[i])
    }
    this.setState({
      todoitems: test
    })

    }

  deleteTask(key){
    var url = "http://localhost:5000/api/todo/TODOR/deleteTask/" + key;
    console.log(url);
    fetch(url,{
      method:"POST",
    }).then(() => this.extra())
  }


  EditTask(text,key){
    console.log("items:"+this.state.items);
    var url = "http://localhost:5000/api/todo/TODOR/EditTask"

    fetch(url,{
      method:"PUT",
      body: JSON.stringify({
        'task':text
      }),
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      }
    }).then(() => this.extra())
    
  };

    
 render(){
  return (
   <div>
    <h1>My Todo App</h1>
    <div className="App">
      <header>
        <form id="to-do-form">
          <input type="text" placeholder="Enter task" value= {this.state.task} onChange={(e) => this.setTask(e)}></input>
          <button type="submit" onSubmit={(e) => this.addTask(e)} >Add</button>
        </form>
        <p>{this.state.items.text}</p>
          <ListItems deleteTask={this.deleteTask} EditTask={this.EditTask}/>
      </header>
    </div>
    </div>
  );
 }

 setTask(e){
  e.preventDefault();
  this.setState({
      task:e.target.value
  })
}

}

export default App;
