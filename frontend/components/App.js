import React from 'react'
import axios from 'axios'
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
  }
  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({...this.state, todos: res.data.data})
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    } )
  }
  onChange = evt => {
    const {value} = evt.target
    this.setState({...this.state, todoNameInput: value})
  }
  onSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo()
  }
  postNewTodo = () => {
    axios.post(URL, {name: this.state.todoNameInput})
    .then(res => {
      this.fetchAllTodos()
      this.setState({...this.state, todoNameInput: ''})
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    })
  }
  componentDidMount() {
    this.fetchAllTodos()
  }
  render() {
    return(
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <div id='todos'></div>
          <h2>Todos:</h2>
          {
            this.state.todos.map(todo => {
              return <div key={todo.id}>{todo.name}</div>
            })
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
            <button>Clear Completed</button>
          </form>
        </div>
        
      </div>
    )
  }
}
