import React, { Component } from 'react';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';

class Navbar extends Component {

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

    render() {
        return (
            <>
            <div className="container">
                <h1 className="display-3">Write-It</h1>
                <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
            </div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <a className="navbar-brand" href="/">Writeit</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">News</a>
                        </li> */}
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