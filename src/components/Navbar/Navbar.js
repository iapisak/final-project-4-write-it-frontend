import React, { Component } from 'react';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';

class Navbar extends Component {
    state = {
        dropdown: '',
        change: false,
    }

    authenticated = (currentUser) => {
        const isUser = (
            <>
                <li className="nav-link"><img src={ this.props.userPhoto } alt="" width="25" height="25"/> { this.props.slug }</li>
                <li className="nav-link">
                    <a className="nav-link" href={`/profile/${this.props.currentUser}`}>Profile</a>
                </li>
                <li className="nav-link" onClick={ this.props.logout }>Sign out</li>
            </>
        )

        const isGuest = (
            <>
                <li className="nav-link" onClick={ this.props.loginToggle }>Sign in</li>
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
            <nav className="navbar navbar-expand-lg">
                <a className="nav-link" href="/">Write-it</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" style={{ width:20, height:20 }}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample09">
                    <ul className="navbar-nav">
                        { this.authenticated(this.props.currentUser) }
                    </ul>
                </div>
            </nav>
            <div className="jumbotron">
                <div className="col-sm-8 mx-auto">
                    <h1>Write-It</h1>
                    <p>A simple of writing</p>
                    <p>Here you will find news, and share your experiences.</p>
                    <p>For Testing: User= test@gmail.com, password=test</p>
                </div>
            </div>
            <div className="d-none d-md-block">
                <nav className="navbar navbar-expand-md justify-content-center">
                    <ul className="navbar-nav d-flex">
                        <li className="nav-item">
                            <div className="nav-link">Channel</div>
                        </li>
                        {this.props.category.map(channel=>{
                            return  <li className="nav-item">
                                        <a className="nav-link" href={ `/${channel.name}` } key={ channel.name}>{ channel.name }</a>
                                    </li>
                        })}
                    </ul>
                </nav>
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