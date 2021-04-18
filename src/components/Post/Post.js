import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import Comments from './Comments';

import './post.css'

class Post extends Component {
    state = {
        channel: '',
        userId: '',
        userSlug: '',
        date: '',
        postId: '',
        title: '',
        photo: '',
        content: '',
        titleError: '',
        contentError: '',
        disabled: false,
        editing: false,
        comments: [],
        channelloaded: false,
    }

    componentDidMount () {
        const post_Id = this.props.id
        axios.get(`${process.env.REACT_APP_API_URL}/posts/post_detail/${post_Id}`)
        .then((res) => {
            this.setState({ 
                channel: res.data.data.channel.name,
                userId: res.data.data.user,
                userSlug: res.data.data.userSlug,
                date: res.data.data.date,
                postId: res.data.data._id,
                title: res.data.data.title,
                photo: res.data.data.photo,
                content: res.data.data.content
             })
        })

        this.fetchComment()
    }

    fetchComment = () => {
        const post_Id = this.props.id
        axios.get(`${process.env.REACT_APP_API_URL}/comment/post/${post_Id}`)
        .then((res) => {
            this.setState({ comments: res.data.data})
        })
    }

    postValidation = () => {
        const { title, content } = this.state
        let titleError = ''
        let contentError = ''
        
        if (title === '') {
            titleError = `Required, this field can not be empty`
        } 

        if (content === '') {
            contentError = `Required, this field can not be empty`
        }
        if (titleError || contentError) {
            this.setState({ titleError, contentError, disabled: true })
            return false
        }
        if (title !== '' && content !== '') {
            this.setState({disabled:false, titleError, contentError})
            return true
        }
    }
    // ==== Handle on Posts ==== //
    handleDelete = () => {
        const post_Id = this.state.postId
        axios.delete(`${process.env.REACT_APP_API_URL}/posts/delete/${post_Id}`)
        .then(() => {
            if (this.state.channel === "General-Article") {
                this.props.history.push(`/`)
            } else this.props.history.push(`/${ this.state.channel }`)
            this.setState({ channelloaded: !this.state.channelloaded })
        })
        .catch(err => console.log(err));
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, }, this.postValidation)
    };

    handleEditSubmit = (e) => {
        e.preventDefault()
        const post_Id = this.state.postId
        const newState = {
            title: this.state.title,
            photo: this.state.photo,
            content: this.state.content,
            date: Date.now(),
            post_Id,
        }

        axios.put(`${process.env.REACT_APP_API_URL}/posts/edit/${post_Id}`, newState)
        .then(() => {
            this.setState({ editing: !this.state.editing });
         })
    }

    // ==== Handle on Comment ==== //
    handleCommentSubmit = (e, newState) => {
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_API_URL}/comment/create`, newState)
        .then(() => {
            this.componentDidMount()
         })
        .catch(err => console.log(err))
    }

    render () {
        const { content, photo, title } = this.state
        const commentsLength = this.state.comments.length
        
        return  <>
                <div className="post-headline"></div>
                <div className="post-container mt-5">
                    <div className="col-md-8 mx-auto p-0 py-4 mt-3 mb-3 bg-white shadow p-md-3 border">
                        <div className="px-3 px-md-0">
                            <a className="text-dark" href={ this.state.channel === "General-Article" ? "/home": `/${this.state.channel}`}>
                                { this.state.channel === "General-Article" 
                                    ? <h3>From Open Topic</h3>
                                    : <h3>From { this.state.channel } Channel</h3>
                                }
                            </a>
                            <p className="text-secondary">By <a href={`/profile/${this.state.userId}`}><span><small>{this.state.userSlug}</small></span></a> | { moment(this.state.date).format('MMMM D, YYYY')} | <small>{ moment(this.state.date).fromNow() }</small></p>
                        </div>
                        <div className="d-md-flex">
                            <div className="col-md-6 p-md-0 pr-md-3 mb-0 mb-5 d-flex flex-column">
                                <div className="collapse navbar-collapse mb-4" id="post-edit">
                                    <h2 className="ml-2 font-weight-bold">Update Article</h2>
                                    <div className="shadow border p-3 flex-grow-1" style={{ backgroundColor: 'rgba(248,187,208 ,0.05)' }}>
                                        <div className="form-group">
                                            <label className="form-label font-weight-bold" htmlFor="input1">Title</label>
                                            <input onChange={this.handleChange} type="search" className={ this.state.titleError ? "form-control alert" : "form-control"}
                                                id="input1" name="title" value={ title }
                                                placeholder={ this.state.titleError ? this.state.titleError : "type your title here" } />
                                        </div>                            
                                        <div className="form-group">
                                            <label className="form-label font-weight-bold" htmlFor="input2">Photo</label>
                                            <input onChange={this.handleChange} type="search" className="form-control" placeholder="example https://photo.com" id="input2" name="photo" value={ photo } />
                                        </div>       
                                        <div className="form-group">
                                            <label className="form-label font-weight-bold" htmlFor="input3">Contents</label>
                                            <textarea onChange={this.handleChange} className={ this.state.contentError ? "form-control alert" : "form-control"} 
                                                    id="input3" name="content" value={ content } rows="20" cols="50"
                                                    placeholder={ this.state.contentError ? this.state.contentError : "Description" }>
                                            </textarea>
                                        </div>
                                        <div className="text-right">
                                            <button className="btn btn-primary mr-1" data-toggle="collapse" data-target="#post-edit" aria-expanded="false"
                                                    onClick={ this.handleEditSubmit } disabled={ this.state.disabled }><small>Update</small></button>
                                            <button className="btn btn-danger" data-toggle="collapse" data-target="#post-edit" aria-expanded="false"><small>Cancel</small></button>
                                        </div>
                                    </div>
                                </div>

                                {/* Start from here */}

                                <img className="img-fluid" src={ this.state.photo } alt={ this.state.title } />
                                { this.props.currentUser === this.state.userId ? 
                                <div className="d-flex justify-content-end">
                                    <p className="m-0 p-2 pb-0 text-primary" data-toggle="collapse" data-target="#post-edit" aria-expanded="false" style={{ cursor: 'pointer' }}><small>Edit</small></p>
                                    <p className="m-0 p-2 pb-0 text-danger" onClick={ this.handleDelete } style={{ cursor: 'pointer' }}><small>Delete</small></p>
                                </div>
                                : null }
                                <h4 className="display-5 border-bottom mt-3 pb-2">{ title }</h4> 
                                <p className="text-secondary mt-2 mb-4" style={{ whiteSpace: 'pre-line', fontWeight: '100', fontSize: '14px' }}>{ content }</p>
                                <a href="#top" className="text-center"><small>- Back to the top -</small></a>

                                {/* End here */}
                            </div>
                            <div className="col-md-6 my-3 m-md-0 p-md-0">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2 className="font-weight-bold">Comment</h2>
                                    <p className="text-dark m-0"><span className="icons" role="img" aria-label="comment">💬</span> <small>{ this.state.comments.length } { this.state.comments.length <= 1 ? " comment" : " comments"}</small></p>
                                </div>
                                <div className="blog-post p-3 border shadow-sm mb-5" style={{ backgroundColor: "rgba(149,117,205,0.06)"}}>
                                    { this.state.comments && !commentsLength
                                    ? <p className="mb-1" style={{ fontSize: '0.8rem' }}>No Comment</p>
                                    : this.state.comments.map((comment, index) => {
                                        return  <div className="text-dark" key={ comment._id}>
                                                    <div className="d-flex justify-content-between">
                                                        <a classname="font-weight-bold" href={`/profile/${comment.user}`}><small className="mb-1 text-info">{ comment.userSlug }</small></a>
                                                        <small className="mb-2">{moment(comment.date).fromNow()}</small>
                                                    </div>
                                                    <p className="mb-1" style={{ fontSize: '0.8rem' }}>{ comment.comment }</p>
                                                    { this.props.currentUser === comment.user 
                                                        ?   <small className="text-danger text-right mb-1"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={()=> {
                                                                    axios.delete(`${process.env.REACT_APP_API_URL}/comment/delete/${comment._id}`)
                                                                    .then(() => window.location.reload())
                                                                    .catch(err => console.log(err));
                                                                }}>Delete</small>
                                                        : null }
                                                    { index !== (commentsLength - 1) ? <hr /> : null}
                                                </div>
                                    }) }
                                </div>
                                <h4 className="font-weight-bold">Comment on this article</h4>
                                <div className="mb-3 border shadow-sm p-2 pt-4 rounded" style={{ backgroundColor: "rgba(149,117,205,0.06)"}}>
                                    <Comments
                                        numberComment={ this.state.comments.length }
                                        currentUser={ this.props.currentUser }
                                        userSlug={ this.props.userSlug }
                                        post_Id={ this.state.postId }
                                        handleCommentSubmit={ this.handleCommentSubmit } />
                                </div>
                                <p className="text-dark" style={{ fontSize: '0.8rem'}}>Write-It moderates comments to facilitate an informed, substantive, civil conversation. Abusive, profane, self-promotional, misleading, incoherent or off-topic comments will be rejected.</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                </>
    }
}

export default withRouter(Post)
