import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { destroyTodo, loadTodos, saveTodo } from "../lib/service";

import Footer from "./Footer";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default class TodoApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTodo: "",
      todos: [],
    };

    this.handleNewTodoChange = this.handleNewTodoChange.bind(this);

    this.handleNewTodoSubmit = this.handleNewTodoSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    loadTodos().then(({ data }) => {
      this.setState({ todos: data });
    }).catch(() => {
      this.setState({ error: true });
    });
  }

  handleNewTodoChange(evt) {
    this.setState({ currentTodo: evt.target.value });
  }

  handleNewTodoSubmit(evt) {
    evt.preventDefault();
    const newTodo = { name: this.state.currentTodo, isComplete: false };
    saveTodo(newTodo)
      .then(({ data }) =>
        this.setState({ todos: this.state.todos.concat(data), currentTodo: "" })
      )
      .catch(() => {
        this.setState({ error: true });
      });
  }

  handleDelete (id) {
    destroyTodo(id)
      .then(() => this.setState({
        todos: this.state.todos.filter(t => t.id !== id)
      }))
      console.log("****",  this.state.todos.filter(t => t.id !== id))
  }

  render() {
    const remaining = this.state.todos.filter(t => !t.isComplete).length
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {this.state.error ? <span className="error">Oh no!</span> : null}
            <TodoForm
              currentTodo={this.state.currentTodo}
              handleNewTodoChange={this.handleNewTodoChange}
              handleNewTodoSubmit={this.handleNewTodoSubmit}
            />
          </header>
          <section className="main">
            <TodoList todos={this.state.todos} handleDelete={this.handleDelete} />
          </section>
          <Footer remaining={remaining}/>
        </div>
      </Router>
    );
  }
}
