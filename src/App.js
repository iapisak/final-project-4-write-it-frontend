import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Routes from './config/Routes';
import Navbar from './components/Navbar/Navbar';

import './App.css'

class App extends Component {
  state = {
    currentUser: localStorage.getItem('uid'),
    username: localStorage.getItem('username'),
    userSlug: localStorage.getItem('slug'),
    userPhoto: localStorage.getItem('photo'),
    channel: [],
  }

  setCurrentUser = (userId, username, userSlug, userPhoto) => {
    this.setState({ currentUser: userId, username, userSlug, userPhoto });
    localStorage.setItem('uid', userId);
    localStorage.setItem('username', username);
    localStorage.setItem('slug', userSlug);
    localStorage.setItem('photo', userPhoto);
  };

  logout = () => {
    localStorage.removeItem('uid');
    localStorage.removeItem('username');
    localStorage.removeItem('slug')
    localStorage.removeItem('photo')
    axios.delete(`${process.env.REACT_APP_API_URL}/logout`)
    .then(() => {
      this.setState({ currentUser: null, username: '' });
      this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  componentDidMount () {
    axios.get(`${process.env.REACT_APP_API_URL}/channel`)
    .then(async res => {
      const channels = await res.data.data.filter(item => item._id !== '5fadad8b99d1600017502810')
      this.setState({ channel: channels});
    })
    .catch(err => console.log(err));
  }

  render() {
    return <>
            { this.state.currentUser 
              ? <Navbar currentUser={ this.state.currentUser } logout={ this.logout } category={ this.state.channel } />
              : null
            }
              
            <Routes 
              currentUser={ this.state.currentUser } 
              username={ this.state.username }
              userSlug={ this.state.userSlug}
              setCurrentUser={ this.setCurrentUser }
              category={ this.state.channel } />
            </>
    
  }
}

export default withRouter(App);