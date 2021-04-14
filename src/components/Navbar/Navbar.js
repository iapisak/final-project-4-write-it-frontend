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
                <li className="welcome">Welcome <img src={ this.props.userPhoto } alt="" width="25" height="25"/> { this.props.slug }</li>
                <li className="nav-link">
                    <a href={`/profile/${this.props.currentUser}`}>Profile</a>
                </li>
                <li className="nav-link" onClick={ this.props.logout }>Sign out</li>
            </>
        )

        const isGuest = (
            <>
                <li className="welcome">Welcome you are guess!</li>
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

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#">Disabled</a>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            </nav>


            <div className="nav-container-fluid">
                <div className="nav-header">
                    <div className="nav-sub-header container-fluid">
                        <div className="float-right web-name" style={{ textAlign: "right" }}>
                            <h2 className="display-3">Write-It</h2>
                            <p>A simple of writing</p>
                            <p>Here you will find news, and share your experiences.</p>
                            <p style={{ color: "red"}}>For Testing: User= test@gmail.com, password=test</p>
                        </div>
                    </div>
                </div>
                <nav className="nav-menu navbar navbar-expand-md nav-dark">
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