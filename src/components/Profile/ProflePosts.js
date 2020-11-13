import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import './Profile.css'

class ProfilePosts extends Component {

    render () {
        return (
            <div className="profile-post-container d-flex">

                { this.props.posts.photo ? 
                    <img src={ this.props.posts.photo} alt=""/>
                : null }
                
                <div className="profile-post-detail">
                    <Link to={`/post/${this.props.posts._id}`}>
                        <h6>{ this.props.posts.title }</h6>
                    </Link>
                    <p>{ this.props.posts.content }</p>
                    <div className="post-date float-right">Date { new Date(this.props.posts.date).toLocaleDateString() }</div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfilePosts)