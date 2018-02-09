import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Todo from './Todo';
import RecipePage from './RecipePage';
import { Route } from 'react-router-dom';

//this is the home screen
const Home = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Recette</h1>
    </header>
    <p className="App-intro">
      <Todo />
    </p>
  </div>
)

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/recipes/:id" component={RecipePage} />
      </div>
    );
  }
}

export default App;
