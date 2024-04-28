// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PostList from './PostList';
import PostForm from './PostForm';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/login" render={() => (isAuthenticated ? <Redirect to="/" /> : <LoginForm />)} />
          <Route path="/register" render={() => (isAuthenticated ? <Redirect to="/" /> : <RegisterForm />)} />
          <Route path="/create" render={() => (isAuthenticated ? <PostForm /> : <Redirect to="/login" />)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
