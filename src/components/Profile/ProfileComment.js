import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import './Profile.css'

class ProfileComments extends Component {

    render () {
        return (
            <div className="profile-comment-container">
                <Link to={`/post/${this.props.comments.post }`}>
                    <div>
                        <p className="comment-comment">{ this.props.comments.comment }</p>
                        <p className="date text-right">{ new Date(this.props.comments.date).toLocaleDateString() }</p>
                    </div>
                </Link>
            </div>
        )
    }
}

export default withRouter(ProfileComments)