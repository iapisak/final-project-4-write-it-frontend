import React, { Component } from 'react';
import axios from 'axios';
import Home from './components/Home/Home';

class App extends Component {
  state = {
    currentUser: localStorage.getItem('uid'),
    username: localStorage.getItem('username'),
  }

  setCurrentUser = (userId, username) => {
    this.setState({ currentUser: userId, username });
    localStorage.setItem('uid', userId);
    localStorage.setItem('username', username);
  };

  logout = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('username');
    axios.delete(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true }
    ).then(res => {
      this.setState({ currentUser: null, username: '' });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        <div className="container">
          <h1 className="display-3">Hello, world!</h1>
          <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        </div>
        <Home
          currentUser={ this.state.currentUser }
          username={ this.state.username }
          setCurrentUser={ this.setCurrentUser }
          logout={ this.logout }
        />
      </>
    );
  }
}

export default App;
