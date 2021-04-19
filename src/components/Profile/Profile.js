import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'
import Header from './ProfileHeader';

class Profile extends Component {
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
        const commentsLength = this.state.comments.length

        return (
            <>
            <Header
                posts={ this.state.posts.length}
                comments={ this.state.comments.length}
                user_Id = { this.props.id }
                user= { this.state.profile }/> 
            <div className="col-md-8 mx-auto p-0 my-3">
                <div className="d-md-flex">
                    <div className="col-md-6 p-0 pr-md-3">
                        <h2 className="px-3 px-md-0 font-weight-bold">Article Created</h2>
                        { this.state.posts && this.state.posts.length 
                            ? this.state.posts.map((post, index) => {
                                const template = <a className="text-primary" href={`/post/${ post._id }`} style={{ textDecoration: 'none'}}><small>Views...</small></a>
                                let content 
                                if (post.content.length > 250) {
                                    content = `${post.content.substring(0, 250)} `
                                } else content = post.content
    
                                return  <div className="p-3 p-md-0" key={ post.photo}>
                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2 text-dark" style={{ fontWeight: '300', fontSize: '13px' }}>Post on { moment(post.date).format('MMMM D, YYYY') }</p> 
                                                    <small className="">{ moment(post.date).fromNow() }</small>
                                                </div>
                                                <div className="mb-3 d-flex justify-content-center" style={{ height: "240px", overflow: "hidden" }}>
                                                { post.photo 
                                                    ? <a href={`/post/${post._id}`}><img className="img-fluid" src={ post.photo } alt={ post.photo} onError={ (e)=>  e.target.src = 'https://www.pmchospitals.com/libs/images/error-404.png' } / ></a>
                                                    : <a href={`/post/${post._id}`}><img className="img-fluid" src="https://www.xlcncm.com/images/products/vertical-honing.jpg" alt="error"/></a> 
                                                }
                                                </div>
                                                <a className="text-dark lead mb-2" href={`/post/${post._id}`} style={{ textDecoration: 'none'}}><h5 className="display-5">{ index + 1 }. { post.title }</h5></a>
                                                <p className="text-secondary" style={{ fontWeight: '100', fontSize: '14px' }}>{ content } { template }</p>
                                                <hr className=""/>
                                        </div> })
                            : <div className="p-3 p-md-0">
                                <p className="text-secondary" style={{ fontWeight: '100', fontSize: '14px' }}>No Article created</p>
                              </div>
                        }
                    </div>
                    <div className="col-md-6 my-3 m-md-0 p-md-0 d-flex flex-column" >
                        <h2 className="font-weight-bold">Comment History</h2>
                        <div className="blog-post p-3 flex-grow-1" style={{ backgroundColor: "rgba(149,117,205,0.06)"}}>
                            { this.state.comments && this.state.comments.length 
                                ? this.state.comments.map((comment, index) => {
                                    return  <div className="text-secondary" key={ comment._id}>
                                                <div className="d-flex justify-content-between">
                                                    <small className="mb-1"><a href={`/post/${ comment.post }`}>Read the Article...</a></small>
                                                    <small className="mb-1 text-dark">{moment(comment.date).fromNow()}</small>
                                                </div>
                                                <p className="text-secondary mb-1" style={{ fontWeight: '100', fontSize: '14px' }}>{ comment.comment }</p>
                                                { this.props.currentUser === comment.user._id 
                                                    ? <small className="text-danger text-right mb-1"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={()=> {
                                                            axios.delete(`${process.env.REACT_APP_API_URL}/comment/delete/${comment._id}`)
                                                            .then(() => window.location.reload())
                                                            .catch(err => console.log(err));
                                                        }}>Delete</small>
                                                    : null }
                                                { index !== (commentsLength - 1) ? <hr /> : null}
                                            </div>
                                })
                            : <div><p className="text-secondary mb-1" style={{ fontWeight: '100', fontSize: '14px' }}>No comment found</p></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default Profile