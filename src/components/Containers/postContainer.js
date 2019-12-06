import React, { Component } from 'react';
import axios from 'axios';
import CreatePosts from '../Post/createPosts';
import PostDetail from '../Post/postDetail';

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
            this.setState({posts: res.data.data})
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
            <div>
                <div className="topic-container">
                    <h2>{ this.props.channelName } Topic</h2>
                    <p>{ this.props.channelDetail }</p>

                    {this.props.currentUser ? 
                    <button onClick={ this.isToggle } className="btn btn-primary">Post</button>
                    : 
                    <button className="btn btn-primary">You must be log in</button>}

                    <CreatePosts 
                        toggle={ this.state.isToggle }
                        isToggle
                        currentUser={ this.props.currentUser }
                        channel={ this.props.channel }
                        handleSubmit={ this.handleSubmit } />
                </div>

                {this.state.posts.map(post => (
                    <PostDetail detail={ post }/>
                ))}

            </div>
        )
    }
}

export default PostContainer