import React, { Component } from 'react';

class Navbar extends Component {

    authenticated = (currentUser) => {
        const isUser = (
            <>
                <li className="nav-item d-none d-md-block">
                    <div className="py-2 ">
                        <img className="rounded-circle mr-2" src={ this.props.userPhoto } alt="" width="25" height="25"/> 
                        { this.props.slug } :
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href={`/profile/${this.props.currentUser}`}>Profile</a>
                </li>
                <li className="nav-item" onClick={ this.props.logout }>
                    <div className="nav-link" style={{ cursor: 'pointer' }}>Sign out</div>
                </li>
            </>
        )

        const isGuest = (
            <>
                <li className="nav-item">
                    <a className="nav-link" href="/login">Log in</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                </li>
            </>
        );
    
        if (currentUser !== null) return isUser
        else return isGuest
    }

    render() {
        const channels = this.props.category.sort((a, b) => {
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })

        return  <div className="bg-light sticky-top shadow">
                    <div className="col-md-8 mx-auto">
                        <nav className="navbar navbar-expand-lg navbar-light rounded">
                            <a className="navbar-brand" href="/">Write-it</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-1" aria-expanded="false">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbar-1">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">Home</a>
                                    </li>
                                    { channels.map(channel=>{
                                        return  <li className="nav-item" key={ channel._id }>
                                                    <a className="nav-link" href={ `/${channel.name}` } key={ channel.name}>{ channel.name }</a>
                                                </li>
                                    }) }
                                </ul>
                                <ul className="navbar-nav ml-auto">
                                    { this.authenticated(this.props.currentUser) }
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
    }
}

export default Navbar