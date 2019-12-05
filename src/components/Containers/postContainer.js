import React, { Component } from 'react';
import axios from 'axios';
import CreatePosts from '../Post/createPosts';
import PostDetail from '../Post/postDetail';

class PostContainer extends Component {
    state = {
        posts: [],
    }

    componentDidMount () {
        const channel = this.props.channel
        // console.log(channel)
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${channel}`)
        .then((res) => {
            this.setState({posts: res.data.data})
        })
    }

    handleSubmit = (e, newPosts) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/posts/create`, newPosts)
        .then((res) => {
           this.componentDidMount()
         })
    }

    render () {
        return (
            <div>
                {this.state.posts.map(post => (
                    <PostDetail detail={ post }/>
                ))}
                <CreatePosts 
                    currentUser={ this.props.currentUser }
                    channel={ this.props.channel }
                    handleSubmit={ this.handleSubmit } />
            </div>
        )
    }
}

export default PostContainer