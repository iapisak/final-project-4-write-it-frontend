import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

import './posts.css'

class postDetail extends Component {
    state = {
        comment: [],
    }

    componentDidMount () {
        const post_Id = this.props.detail._id
        axios.get(`${process.env.REACT_APP_API_URL}/comment/post/${post_Id}`)
        .then((res) => {
            this.setState({ comment: res.data.data})
        })
    }

    render () {
        return (
            <div className="posts-detail d-flex">
                <img src={ this.props.detail.photo } alt={ this.props.detail.photo} / >
                <div className="posts-content-box">
                    <a href={`/post/${this.props.detail._id}`}>
                        <h3>{this.props.detail.title}</h3>
                    </a>    
                        <p className="profile-slug">By : 
                            <Link to={`/profile/${this.props.detail.user}`}>
                            <span>{this.props.detail.userSlug}</span>
                            </Link> | <span>{ this.state.comment.length } comment</span>
                        </p>
                        <p className="posts-content">{this.props.detail.content}</p>
                    </div>
                
                
            </div>
        )
    }
}

export default withRouter(postDetail)