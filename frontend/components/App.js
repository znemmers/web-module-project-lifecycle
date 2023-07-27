import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayComplete: true
  }
 
  setAxiosResErr = err =>  this.setState({...this.state, error: err.response.data.message})

  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(this.setAxiosResErr)
  }
 
  onChange = evt => {
    const {value} = evt.target
    this.setState({...this.state, todoNameInput: value})
  }
  
  onSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo()
  }
 
  resetForm = () => this.setState({...this.state, todoNameInput: ''})
  
  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
      this.resetForm()
    })
    .catch(this.setAxiosResErr)
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({...this.state, todos: this.state.todos.map(todo => {
        if(todo.id !== id) return todo
        return res.data.data
      })
    })
    })
    .catch(this.setAxiosResErr)
  }
  
  componentDidMount() {
    this.fetchAllTodos()
  }

  toggleComp = () => {
    this.setState({...this.state, displayComplete: !this.state.displayComplete})
  }
  
  render() {
    return(
      <div>
        <div id='error'>Error: {this.state.error}</div>
          <TodoList 
            todos={this.state.todos}
            displayComplete={this.state.displayComplete}
            toggleCompleted={this.toggleCompleted}
          />
          <Form 
          onSubmit={this.onSubmit}
          todoNameInput={this.state.todoNameInput}
          onChange={this.onChange}
          toggleComp={this.toggleComp}
          displayComplete={this.state.displayComplete}
          />
        </div>
        
     
    )
  }
}
