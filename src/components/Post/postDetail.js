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

                { this.props.detail.photo ? 
                <img className="posts-detail-image" src={ this.props.detail.photo } alt={ this.props.detail.photo} / >
                : null }
                
                <div className="posts-content-box">
                    <a href={`/post/${this.props.detail._id}`}>
                        <h6>{this.props.detail.title}</h6>
                    </a>    
                        <p className="profile-slug">By : 
                            <Link to={`/profile/${this.props.detail.user}`}>
                            <span className="user-slug">{this.props.detail.userSlug}</span>
                            </Link> 
                            
                            | <span style={{ fontSize: "12px"}}>{ new Date(this.props.detail.date).toLocaleDateString() }</span>
                            
                            | <span  style={{ fontSize: "12px"}} role="img" aria-label="comment">&#128172; { this.state.comment.length } 
                                { this.state.comment.length <= 1 ? " comment" : " comments" }
                            </span>
                        </p>
                        <p className="posts-content">{this.props.detail.content}</p>
                    </div>
            </div>
        )
    }
}

export default withRouter(postDetail)