import React, { Component } from 'react';
import axios from 'axios';
import CreatePosts from '../Post/createPosts';
import PostDetail from '../Post/postDetail';

import '../Containers/postcontainer.css'

class PostContainer extends Component {
    state = {
        posts: [],
        isToggle: false,
    }

    isToggle = () => {
        this.setState({ isToggle: !this.state.isToggle });
    }

    componentDidMount () {
        const channel_Id = this.props.channel
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${channel_Id}`)
        .then((res) => {
            this.setState({ posts: res.data.data })
        })
    }

    handleSubmit = (e, newPosts) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/posts/create`, newPosts)
        .then((res) => {
            this.isToggle()
            this.componentDidMount()
         })
    }

    render () {
        return (
            <>
                <div className="flex-grow-1" >
                    <div className="topic-container" style={{ backgroundImage:`url('${ this.props.channelPhoto}')` }}>
                        {/* <img src={ this.props.channelPhoto } alt={ this.props.channelName} / > */}
                        <h2>{ this.props.channelName } Topic</h2>
                        <p className="channel-detail text-right">{ this.props.channelDetail }</p>
                        <div className="post-button-option">
                        {this.props.currentUser ? 
                            <button onClick={ this.isToggle } className="btn-primary"> Post </button>
                            : 
                            <button className="btn-primary">You must be log in before post</button>}
                        </div>
                    </div>
                    <CreatePosts 
                        toggle={ this.state.isToggle }
                        isToggle
                        currentUser={ this.props.currentUser }
                        userSlug={ this.props.userSlug }
                        channel={ this.props.channel }
                        handleSubmit={ this.handleSubmit } />
                
                {this.state.posts.map(post => (
                    <PostDetail detail={ post }/>
                ))}
                </div>
            </>
        )
    }
}

export default PostContainer