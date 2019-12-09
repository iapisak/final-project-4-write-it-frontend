import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import './Profile.css'

class ProfilePosts extends Component {

    render () {
        return (
            <div className="profile-post-container d-flex">
                <img src={ this.props.posts.photo} alt=""/>
                <div className="profile-post-detail">
                    <Link to={`/post/${this.props.posts._id}`}>
                        <h4>{ this.props.posts.title }</h4>
                    </Link>
                    <p>{ this.props.posts.content }</p>
                    <div className="post-date float-right">Date { new Date(this.props.posts.date).toLocaleDateString() }</div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfilePosts)