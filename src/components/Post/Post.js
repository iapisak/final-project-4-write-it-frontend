import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import Comments from './Comments';

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
        .then((res) => {
            this.componentDidMount()
         })
        .catch(err => console.log(err))
    }

    render () {
        const { content, photo, title } = this.state
        
        return  <div className="col-md-8 mx-auto p-0 mt-4 mb-3">
                    <div className="px-3 px-md-0">
                        <a className="text-dark" href={ this.state.channel === "General-Article" ? "/": `/${this.state.channel}`}>
                            { this.state.channel === "General-Article" 
                                ? <h3>Open Topic</h3>
                                : <h3>{ this.state.channel } Channel</h3>
                            }
                        </a>
                        <p className="text-secondary">By <a href={`/profile/${this.state.userId}`}><span>{this.state.userSlug}</span></a> | { moment(this.state.date).format('MMMM D, YYYY')} | <small>{ moment(this.state.date).fromNow() }</small></p>                            
                    </div>
                    <div className="d-md-flex">
                        <div className="col-md-7 p-md-0 mr-md-3 mb-0 mb-md-5 d-flex flex-column">
                            <div className="post-edit-form collapse navbar-collapse mb-4 p-3 bg-light shadow-sm rounded" id="post-edit">
                                <h2>Update Article</h2>
                                <div className="form-group">
                                    <label htmlFor="editPosts-1">Title</label>
                                    <input onChange={ this.handleChange } type="text" className={ !this.state.titleError ? "form-control" : "alert"}
                                           id="editPosts-1" name="title" value={ title } 
                                           placeholder={ this.state.titleError ? this.state.titleError : "type your title here" }/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="editPosts-2">Contents</label>
                                    <textarea onChange={ this.handleChange } className={ !this.state.contentError ? "form-control" : "textarea-alert"}  
                                              id="editPosts-2" name="content" value={ content } rows="10"
                                              placeholder={ this.state.contentError ? this.state.contentError : "Description" }></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="editPosts-3">Photo</label>
                                    <input onChange={ this.handleChange } type="text" className="form-control" id="editPosts-3" value={ photo } name="photo" />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary mr-1" data-toggle="collapse" data-target="#post-edit" aria-expanded="false"
                                            onClick={ this.handleEditSubmit } disabled={ this.state.disabled }>Update</button>
                                    <button className="btn btn-danger" data-toggle="collapse" data-target="#post-edit" aria-expanded="false">Cancel</button>
                                </div>
                            </div>
                            <h2 className="display-5">{ title }</h2> 
                            <img className="img-fluid mt-2" src={ this.state.photo } alt={ this.state.title } />
                            { this.props.currentUser === this.state.userId ? 
                            <div className="d-flex justify-content-end">
                                <p className="m-0 p-2 text-primary" data-toggle="collapse" data-target="#post-edit" aria-expanded="false" style={{ cursor: 'pointer' }}>Edit</p>
                                <p className="m-0 p-2 text-danger" onClick={ this.handleDelete } style={{ cursor: 'pointer' }}>Delete</p>
                            </div>
                            : null }
                            <p className="text-secondary mt-3" style={{ whiteSpace: 'pre-line', fontWeight: '300' }}>{ content }</p>
                            <a href="#top" className="text-center">- Back to the top -</a>
                        </div>
                        <div className="col-md-5 my-3 m-md-0 bg-light shadow-sm rounded">
                            <div className="blog-post">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2 className="blog-post-title mt-3">Comment</h2>
                                    <p className="text-dark m-0"><span className="icons" role="img" aria-label="comment">💬</span> <small>{ this.state.comments.length } { this.state.comments.length <= 1 ? " comment" : " comments"}</small></p>
                                </div>
                                <hr className="mt-0"/>
                                { this.state.comments.map(comment => {
                                    return  <div className="text-secondary" key={ comment._id}>
                                                <div className="d-flex justify-content-between">
                                                    <small className="mb-1">By <a href={`/profile/${comment.user}`}>{ comment.userSlug }</a></small>
                                                    <small className="mb-1 text-info">{moment(comment.date).fromNow()}</small>
                                                </div>
                                                <p className="text-secondary mb-1" style={{ fontSize: '0.9rem', fontWeight: '300' }}>{ comment.comment }</p>
                                                { this.props.currentUser === comment.user ?
                                                <div>
                                                    <p className="text-danger text-right mb-1"
                                                       style={{ cursor: 'pointer' }}
                                                       onClick={()=> {
                                                            axios.delete(`${process.env.REACT_APP_API_URL}/comment/delete/${comment._id}`)
                                                            .then(() => window.location.reload())
                                                            .catch(err => console.log(err));
                                                        }}><small>Delete</small></p>
                                                </div>
                                                : null }
                                                <hr />
                                            </div>
                                })}
                            { this.props.currentUser ?
                            <div className="my-4 p-0">
                                <h3>Comment on this article</h3>
                                <p className="text-secondary" style={{ fontSize: '0.8rem'}}>Write-It moderates comments to facilitate an informed, substantive, civil conversation. Abusive, profane, self-promotional, misleading, incoherent or off-topic comments will be rejected.</p>
                                <Comments
                                    numberComment={ this.state.comments.length }
                                    currentUser={ this.props.currentUser }
                                    userSlug={ this.props.userSlug }
                                    post_Id={ this.state.postId }
                                    handleCommentSubmit={ this.handleCommentSubmit } />
                            </div>
                            : null }
                          </div>
                        </div>
                    </div>
                </div>
    }
}

export default withRouter(Post)
