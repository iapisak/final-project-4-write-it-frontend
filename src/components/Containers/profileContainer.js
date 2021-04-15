import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'
import Profile from '../Profile/Profile';

class ProfileContainer extends Component {
    state = {
        profile: {},
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
            <>
            <Profile 
                posts={ this.state.posts.length}
                comments={ this.state.comments.length}
                user_Id = { this.props.id }
                user= { this.state.profile }/> 
            <div className="col-md-8 mx-auto p-0 my-3">
                <h2 className="px-3 px-md-0 font-weight-bold">My History</h2>
                <hr />
                <div className="d-md-flex">
                    <div className="col-md-7 p-0 mr-md-3">
                        { this.state.posts.map((post, index) => (
                            <div key={ post.photo}>
                                <a className="text-dark lead" href={`/post/${post._id}`} style={{ textDecoration: 'none'}}>
                                    <h4 className="px-3 px-md-0">{ index + 1 }. { post.title }</h4> 
                                </a>
                                <p className="text-secondary px-3 px-md-0">{ post.content }</p>
                                <img className="img-fluid img-thumbnail shadow-sm" src={ post.photo } alt={ post.title } />
                                <div className="d-flex justify-content-end px-3 px-md-0">
                                    <p className="text-secondary mt-3">On { moment(post.date).format('MMM D, YYYY') } | <span className="text-info">{ moment(post.date).fromNow() }</span></p>
                                </div>
                                <hr className="mt-0"/>
                            </div> )) }
                    </div>
                    <div className="col-md-5 my-3 m-md-0">
                        <div className="blog-post">
                            <h4 className="blog-post-title">Commented</h4>
                            <hr className="mt-0"/>
                            { this.state.comments.map(comment => {
                                return  <div className="text-secondary" key={ comment._id}>
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-1"><a href={`/post/${ comment.post }`}>See the article</a></p>
                                                <p className="mb-1">{moment(comment.date).fromNow()}</p>
                                            </div>
                                            <p className="text-secondary mb-1">{ comment.comment }</p>
                                            { this.props.currentUser === comment.user ?
                                            <div>
                                                <p className="text-danger text-right mb-1"
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={()=> {
                                                        axios.delete(`${process.env.REACT_APP_API_URL}/comment/delete/${comment._id}`)
                                                        .then(res => window.location.reload())
                                                        .catch(err => console.log(err));
                                                    }}>Delete</p>
                                            </div>
                                            : null }
                                            <hr />
                                        </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default ProfileContainer