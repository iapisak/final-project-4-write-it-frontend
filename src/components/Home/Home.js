import React, { Component } from 'react';
import axios from 'axios';

import Navbar from '../Navbar/Navbar';
import Channel from './Channel/channel';
import Post from './Post/Post';

class Home extends Component {
    state = {
        loginToggle: false,
        signupToggle: false,
        mainToggle: true,
        channel: [],
    }

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
            console.log(res.data.data)
            this.setState({ channel: res.data.data });
            })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
                <Navbar
                    currentUser={this.props.currentUser}
                    username={this.props.username}
                    setCurrentUser={this.props.setCurrentUser}
                    logout={ this.props.logout }
                    login={ this.state.loginToggle }
                    signup={ this.state.signupToggle }
                    loginToggle={ this.loginToggle }
                    signupToggle={ this.signupToggle } />
                <div style={{ display: this.state.mainToggle ? 'block': 'none' }} class="main">
                    <Post />
                    <div>
                        <h3>Channel</h3>
                    {this.state.channel.map((channel) => (
                        <Channel name={channel.name} />
                    ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home