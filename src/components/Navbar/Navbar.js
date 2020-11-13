import React, { Component } from 'react';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';

import './Navbar.css'

class Navbar extends Component {
    state = {
        dropdown: '',
        change: false,
    }

    authenticated = (currentUser) => {
        const isUser = (
            <>
                <li className="nav-link">
                    <a href={`/profile/${this.props.currentUser}`}>Profile</a>
                </li>
                <li className="nav-link" onClick={ this.props.logout }>Sign out</li>
            </>
        )

        const isGuest = (
            <>
                <li className="nav-link" onClick={ this.props.loginToggle }>Log in</li>
                <li className="nav-link" onClick={ this.props.signupToggle }>Register</li>
            </>
        );
    
        if (currentUser !== null) {
          return isUser
        } else {
          return isGuest
        }
    }

    handleDropdown = (e) =>{
        this.setState({
          dropdown: e.target.value,
          changed: true
        })
    }

    render() {
        return (
            <>
            <div className="nav-container-fluid">
                <nav className="nav-menu navbar navbar-expand-md nav-dark fixed-top">
                    <div className="nav-box container-fluid">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ width:20, height:20 }}></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                </li>
                            </ul>
                            <div className="dropdown">
                                <button className="dropbtn">Channels</button>
                                <div className="dropdown-content">
                                    {this.props.category.map(channel=>{
                                        return <a href={ `/${channel.name}` } key={ channel.name}>{ channel.name }</a>
                                    })}

                                </div>
                            </div>
                            <div className="nav-authorized">
                                <ul className="navbar-nav">
                                    { this.authenticated(this.props.currentUser) }
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="nav-header">
                    <div className="nav-sub-header container-fluid">
                        <h2 className="display-3">Write-It</h2>
                        <h4>Here you will find news, interesting posts, and share your experiences.</h4>
                    </div>
                </div>
            </div>
            <Login 
                currentUser={ this.props.currentUser }
                username={ this.props.username }
                setCurrentUser={ this.props.setCurrentUser }
                toggle={ this.props.login }
                loginToggle={ this.props.loginToggle } />
            <Signup 
                toggle={ this.props.signup }
                signupToggle={ this.props.signupToggle } />
            </>
        )
    }
}

export default Navbar