import React, { Component } from 'react';
import axios from 'axios';

import Profile from '../Profile/Profile';
import ProfilePosts from '../Profile/ProflePosts';
import ProfileComments from '../Profile/ProfileComment';

import './profileContainer.css'

class ProfileContainer extends Component {
    state = {
        profile: [],
        posts: [],
        comments: [],
        profileLoaded: false,
        postsLoaded: false,
    }

    componentDidMount () {
        const user_Id = this.props.id
        axios.get(`${process.env.REACT_APP_API_URL}/profile/${user_Id}`)
        .then((res) => {
            this.setState({ profile: res.data.data })
        })
        this.fetchPosts()
    }

    fetchPosts = () => {
        const user_Id = this.props.id
        axios.get(`${process.env.REACT_APP_API_URL}/profile/posts/${user_Id}`)
        .then((res) => {
            this.setState({ posts: res.data.data })
        })

        axios.get(`${process.env.REACT_APP_API_URL}/profile/comments/${user_Id}`)
        .then((res) => {
            this.setState({ comments: res.data.data })
        })
    }

    render () {
        return (
            <div className="profile-container container">
                <div>
                    <Profile 
                        posts={ this.state.posts.length}
                        comments={ this.state.comments.length}
                        user_Id = { this.props.id }
                        user= { this.state.profile }/>
                </div>
                <div className="profile-box-post-comment d-flex">
                    <div className="profile-post-history">
                        <div className="d-flex">
                            <h2>Posts history</h2>
                        </div>
                        { this.state.posts.map( posts => (
                            <ProfilePosts 
                                posts= { posts }
                            />
                        )) }
                    </div>
                    <div className="profile-comment-history">
                        <div className="history-box">
                            <h2>Comments history</h2>
                        </div>
                        { this.state.comments.map( comments => (
                            <ProfileComments 
                                comments= { comments } />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileContainer