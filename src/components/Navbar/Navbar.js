import React, { Component } from 'react';
import './navbar.css'

class Navbar extends Component {

    componentDidUpdate() {
        const nav = document.querySelector('.navbar-sticky-top')
        function lightNav() {
            if (window.scrollY > 1) {
                nav.classList.add('light-nav')
            } else {
                nav.classList.remove('light-nav')
            }
        }
        window.addEventListener('scroll', lightNav)
    }

    render() {
        const channels = this.props.category.sort((a, b) => {
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })

        return  <div className="navbar-sticky-top">
                    <div className="col-md-8 mx-auto">
                        <nav id="nav-top" className="navbar navbar-expand-lg navbar-dark rounded px-md-0">
                            {/* <h3 className="navbar-item text-warning">Write-it</h3> */}
                            <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbar-1" aria-expanded="false">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbar-1">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <a className="nav-link text-light" href="/home">Home</a>
                                    </li>
                                    { channels.map(channel=>{
                                        return  <li className="nav-item" key={ channel._id }>
                                                    <a className="nav-link text-light" href={ `/${channel.name}` } key={ channel.name}>{ channel.name }</a>
                                                </li>
                                    }) }
                                </ul>
                                <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link text-light" href={`/profile/${this.props.currentUser}`}>Profile</a>
                                </li>
                                <li className="nav-item" onClick={ this.props.logout }>
                                    <div className="nav-link text-light" style={{ cursor: 'pointer' }}>Sign out</div>
                                </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
    }
}

export default Navbar