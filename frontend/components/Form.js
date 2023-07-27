import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
   <div>
    <form id='todoForm' onSubmit={this.props.onSubmit}>
      <input 
        value={this.props.todoNameInput}
        onChange={this.props.onChange}
        type='text' 
        placeholder='type todo'>
      </input>
      <input 
        type='submit'>
      </input>
    </form>
    <button 
      onClick={this.props.toggleComp}>
      {this.props.displayComplete ? 'Hide' : 'Show'} Completed
    </button>
  </div>
  )
  }
}
