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
                <li className="nav-link" onClick={ this.props.loginToggle }>Sign In</li>
                <li className="nav-link" onClick={ this.props.signupToggle }>Sign Up</li>
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
            <div className="container">
                <h1 className="display-3">Write-It</h1>
                <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
            </div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>

                        <div className="dropdown">
                            <button className="dropbtn">Channel</button>
                            <div className="dropdown-content">

                                {this.props.category.map(channel=>{
                                    return <a href={ `/${channel.name}` }>{ channel.name }</a>
                                })}

                            </div>
                        </div>

                        { this.authenticated(this.props.currentUser) }

                    </ul>
                </div>
            </nav>
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