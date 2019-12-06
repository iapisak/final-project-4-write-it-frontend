import React, { Component } from 'react';
import axios from 'axios';

import Profile from '../Profile/Profile';

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
            <>
                <Profile />
            </>
        )
    }
}

export default ProfileContainer