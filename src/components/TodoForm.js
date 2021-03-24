import React from 'react'

export default props =>
  <form onSubmit={props.handleNewTodoSubmit }>
    <input
      type='text'
      autoFocus
      className="new-todo"
      onChange={props.handleNewTodoChange}
      value={props.currentTodo}
      placeholder="What needs to be done?"/>
  </form>
