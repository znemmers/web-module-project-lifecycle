import React from 'react'
import Todo from './Todo'
export default class TodoList extends React.Component {
  render() {
    return (
      <>
        <div id='todos'></div>
          <h2>Todos:</h2>
          {
            this.props.todos.reduce((acc, todo) => {
              if(this.props.displayComplete || !todo.complete) return acc.concat(
                <Todo 
                key={todo.id}
                toggleCompleted={this.props.toggleCompleted}
                todo={todo}
                />
              )
              return acc
            }, [])
          }
      </>
      
    )
  }
}
