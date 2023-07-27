import React from 'react'
import axios from 'axios'
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
        <div id='todos'></div>
          <h2>Todos:</h2>
          {
            this.state.todos.reduce((acc, todo) => {
              if (this.state.displayComplete || !todo.completed) return acc.concat(
                <div onClick={this.toggleCompleted(todo.id)} key={todo.id}>{todo.name} {todo.completed? '✅' : ''}</div>
              )
              return acc
            }, [])
          }
        <div>
          <form onSubmit={this.onSubmit}>
            <input 
              value={this.state.todoNameInput}
              onChange={this.onChange}
              type='text' 
              placeholder='type todo'>
            </input>
            <input 
              type='submit'>
            </input>
          </form>
          <button onClick={this.toggleComp}>{this.state.displayComplete ? 'Hide' : 'Show'} Completed</button>
        </div>
        
      </div>
    )
  }
}
