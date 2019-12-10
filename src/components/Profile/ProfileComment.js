import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import './Profile.css'

class ProfileComments extends Component {

    render () {
        console.log(this.props.comments.comment.length)
        return (
            <div className="profile-comment-container">
                <p className="date">Date { new Date(this.props.comments.date).toLocaleDateString() }</p>
                <p >{ this.props.comments.comment }
                    <Link to={`/post/${this.props.comments.post }`}>
                        <span>  more...</span>
                    </Link>            
                </p>
   
            </div>
        )
    }
}

export default withRouter(ProfileComments)

// className={ this.props.comments.comment.length >= 150 ? 'overflow ellipsis' : null} 