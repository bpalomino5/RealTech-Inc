import React, { Component } from 'react';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import LoginForm from './pages/LoginPage';
import SignUpForm from './pages/SignUpPage';
import UserProfile from './pages/UserProfilePage'
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/recipes/:id" component={RecipePage} />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/profiles/:id" component={UserProfile} />
        </Switch>
      </div>
    );
  }
}


export default App;