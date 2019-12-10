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
    loginToggle: false,
    signupToggle: false,
    mainToggle: true,
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
    axios.delete(`${process.env.REACT_APP_API_URL}/logout`, { withCredentials: true }
    ).then(res => {
      this.setState({ currentUser: null, username: '' });
      this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  loginToggle = (e) => {
    this.setState({ 
        loginToggle: !this.state.loginToggle, 
        signupToggle: false, 
        mainToggle: this.state.loginToggle === true ? true: false, });
  }

  signupToggle = (e) => {
    this.setState({ 
        signupToggle: !this.state.signupToggle, 
        loginToggle: false, 
        mainToggle: this.state.signupToggle === true ? true: false, });
  }

  componentDidMount () {
    axios.get(`${process.env.REACT_APP_API_URL}/channel`)
    .then(res => {
        this.setState({ channel: res.data.data });
        })
    .catch(err => console.log(err));
  }

  render() {
    
    return (
      <>
      <Navbar 
        currentUser={ this.state.currentUser }
        username={ this.state.username }
        setCurrentUser={ this.setCurrentUser }
        logout={ this.logout }
        login={ this.state.loginToggle }
        signup={ this.state.signupToggle }
        loginToggle={ this.loginToggle }
        signupToggle={ this.signupToggle } 
        category={ this.state.channel } />

        <main style={{ display: this.state.mainToggle ? 'block': 'none' }}>
          <Routes 
            currentUser={ this.state.currentUser } 
            username={ this.state.username }
            userSlug={ this.state.userSlug}
            category={ this.state.channel } />
        </main>
      </>
    );
  }
}

export default withRouter(App);
