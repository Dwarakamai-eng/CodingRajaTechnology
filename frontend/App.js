// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostList from './PostList';
import PostForm from './PostForm';
import LoginForm from './LoginForm';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route path="/login" component={LoginForm} />
          <Route path="/create" component={PostForm} />
          {/* Add route for editing post */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
