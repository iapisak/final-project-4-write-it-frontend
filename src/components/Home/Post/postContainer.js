import React, { Component } from 'react';
import axios from 'axios';
import PostDetail from './postDetail';

class PostContainer extends Component {
    state = {
        posts: []
    }

    componentWillMount () {
        axios.get(`${process.env.REACT_APP_API_URL}/posts`)
        .then((res) => {
            this.setState({posts: res.data.data})
        })
    }

    render () {
        return (
            <div>
                {this.state.posts.map(post => (
                    <PostDetail detail={ post }/>
                ))}
            </div>
        )
    }
}

export default PostContainer