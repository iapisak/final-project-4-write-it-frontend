import React, { Component } from 'react';
import axios from 'axios';
import CreatePosts from '../Post/createPosts';
import PostDetail from '../Post/postDetail';

import '../Containers/postcontainer.css'

class PostContainer extends Component {
    state = {
        posts: [],
        postLoaded: false,
        isToggle: false,
    }

    isToggle = () => {
        this.setState({ isToggle: !this.state.isToggle, postLoaded: !this.state.postLoaded });
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
            this.componentDidMount()
        })
        this.isToggle()
    }

    render () {
        return (
            <>
                <div className="main-container" >
                    <div className="topic-container">
                        <h2>{ this.props.channelName } Topic</h2>
                        <p className="channel-detail">{ this.props.channelDetail }</p>
                        <div className="post-button-option">
                        {this.props.currentUser ? 
                            <button onClick={ this.isToggle } className="btn-dark"> Create post </button>
                            :
                            null}
                        </div>
                    </div>
                
                    <CreatePosts 
                        toggle={ this.state.isToggle }
                        currentUser={ this.props.currentUser }
                        userSlug={ this.props.userSlug }
                        channel={ this.props.channel }
                        handleSubmit={ this.handleSubmit } 
                        postLoaded={ this.state.postLoaded } />

                    <div>
                        {this.state.posts.map((post, index) => (
                            <PostDetail 
                                key={ index }
                                channel={ this.props.channelName }
                                detail={ post }/>
                        ))}
                    </div>
                </div>
            </>
        )
    }
}

export default PostContainer