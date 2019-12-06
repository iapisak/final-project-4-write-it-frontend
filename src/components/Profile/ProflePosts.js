import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class ProfilePosts extends Component {

    render () {
        return (
            <div>
                <Link to={`/post/${this.props.posts._id}`}>
                    <h3>{ this.props.posts.title }</h3>
                </Link>
                <p>{ this.props.posts.content }</p>
                {/* <p>Post By : { this.props.posts.userSlug }</p> */}
            </div>
        )
    }
}

export default withRouter(ProfilePosts)