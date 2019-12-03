import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';

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
      <div>
        <Navbar 
          logout={this.logout}
          />
        <div class="main">
        <Signup />
        <Login 
          currentUser={this.state.currentUser}
          username={this.state.username}
          setCurrentUser={this.setCurrentUser}
        />
        </div>
      </div>
    );
  }
}

export default App;
