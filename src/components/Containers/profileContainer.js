import React, { Component } from 'react';
import axios from 'axios';

import Profile from '../Profile/Profile';
import ProfilePosts from '../Profile/ProflePosts';

class ProfileContainer extends Component {
    state = {
        profile: [],
        posts: [],
        profileLoaded: false,
        postsLoaded: false,
    }

    componentDidMount () {
        const user_Id = this.props.currentUser
        axios.get(`${process.env.REACT_APP_API_URL}/profile/${user_Id}`)
        .then((res) => {
            this.setState({ profile: res.data.data })
        })
        this.fetchPosts()
    }

    fetchPosts = () => {
        const user_Id = this.props.currentUser
        axios.get(`${process.env.REACT_APP_API_URL}/profile/posts/${user_Id}`)
        .then((res) => {
            this.setState({ posts: res.data.data })
        })
    }

    render () {
        return (
            <div>
                <Profile user= { this.state.profile }/>
                <div>
                    <h1>Your Posts</h1>
                    { this.state.posts.map( posts => (
                        <ProfilePosts 
                            posts= { posts }
                        />
                    )) }
                </div>
            </div>
        )
    }
}

export default ProfileContainer