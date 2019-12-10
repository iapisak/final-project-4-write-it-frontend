import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import './Profile.css'

class ProfileComments extends Component {

    render () {
        console.log(this.props.comments.comment.length)
        return (
            <div className="profile-comment-container">
                <Link to={`/post/${this.props.comments.post }`}>
                    <p className="comment-link">See this...
                    </p>
                </Link>
                <p className="comment-comment">{ this.props.comments.comment }</p>
                <p className="date text-right">{ new Date(this.props.comments.date).toLocaleDateString() }</p>
            </div>
        )
    }
}

export default withRouter(ProfileComments)

// className={ this.props.comments.comment.length >= 150 ? 'overflow ellipsis' : null} 