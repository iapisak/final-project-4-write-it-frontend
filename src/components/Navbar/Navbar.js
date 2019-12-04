import React, { Component } from 'react';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';

class Navbar extends Component {
    // state = {
    //     loginToggle: false,
    //     signupToggle: false,
    //     mainToggle: true,
    // }

    // loginToggle = (e) => {
    //     this.setState({ loginToggle: !this.state.loginToggle, signupToggle: false, mainToggle: false, });
    // }

    // signupToggle = (e) => {
    //     this.setState({ signupToggle: !this.state.signupToggle, loginToggle: false, mainToggle: false, });
    // }

    authenticated = (currentUser) => {
        const isUser = (
            <>
                <li className="nav-link">Create Posts</li>
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

    render() {
        return (
            <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Writeit</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">News</a>
                        </li>
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