import {Link} from 'react-router-dom'
import React from 'react'

export default props =>
  <footer className="footer">
    <span className="todo-count">
      <strong>{props.remaining}</strong> todos left
    </span>
    <ul className="filters">
      <li><Link to="/">All</Link></li>
      {' '}
      <li><Link to="/active">Active</Link></li>
      {' '}
      <li><Link to="/completed">Completed</Link></li>
    </ul>
  </footer>
