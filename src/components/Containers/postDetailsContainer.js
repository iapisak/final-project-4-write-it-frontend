import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';

import Comments from '../Comments/Comments';
import CommentDetails from '../Comments/CommentDetails';

import './postcontainer.css'

class PostDetailsContainer extends Component {
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
            this.props.history.push(`/${ this.state.channel }`)
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
        .then((res) => {
            this.setState({ editing: !this.state.editing });
         })
    }

    handleEditChange = (e) => {
        e.preventDefault();
        this.setState({ editing: !this.state.editing });
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

        return (
            this.state.editing ?
            <div className="post-edit-form-container container">
                <h1 className="text-center">Update your post</h1>
                <form className="post-edit-form">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Title</label>
                        <input onChange={ this.handleChange } type="text" className="form-control" id="exampleFormControlInput1" name="title" value={ title } />
                        <div className="alert">{this.state.titleError}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput2">Photo</label>
                        <input onChange={ this.handleChange } type="text" className="form-control" id="exampleFormControlInput2" value={ photo } name="photo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Contents</label>
                        <textarea onChange={ this.handleChange } className="form-control" id="exampleFormControlTextarea1" name="content" value={ content } rows="3"></textarea>
                        <div className="alert">{this.state.contentError}</div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-info float-right"
                        onClick={ this.handleEditSubmit }
                        disabled={ this.state.disabled }
                        >Save</button>
                </form>
            </div>
            :
            <>
                <section className="container">
                    <div className="postsDetail-container">
                        <a href={`/${this.state.channel}`}>{ this.state.channel } channel</a>
                        <p>By <a href={`/profile/${this.state.userId}`}><span>{this.state.userSlug}</span></a>
                            | <span>{ new Date(this.state.date).toDateString() }</span>
                            | <span>{ new Date(this.state.date).toLocaleTimeString() }</span>
                        </p>
                        <h3>{ title }</h3> 
                        <p>
                            <span className="icons" role="img" aria-label="comment">
                                &#128172; { this.state.comments.length }
                                { this.state.comments.length <= 1 ? " comment" : " comments"}
                            </span> |
                            <span className="contents">{ content }</span>
                        </p>
                        { this.props.currentUser === this.state.userId ? 
                            <div className="button-container">
                                <button onClick={ this.handleEditChange } className="post-btn-edit btn btn-info">Edit</button>
                                <button onClick={ this.handleDelete } className="post-btn-delete btn btn-danger">Delete</button>
                            </div>
                        : null }
                        
                        <img src={ this.state.photo } alt={ this.state.title } / >
                    </div>
                    <div className="comment-container">
                        {this.state.comments.map((comment, index) => (
                            <CommentDetails 
                                index={ index }
                                currentUser= { this.props.currentUser }
                                detail={ comment }
                            />
                        ))}
                    </div>
                </section>

                {this.props.currentUser ?

                <div className="comment-form-container">
                    <h1 className="text-center">Comment on this article</h1>
                    <div className="comment-form container">
                        <Comments
                            numberComment={ this.state.comments.length }
                            currentUser={ this.props.currentUser }
                            userSlug={ this.props.userSlug }
                            post_Id={ this.state.postId }
                            handleCommentSubmit={ this.handleCommentSubmit }
                        />
                    </div>
                </div>

                : null }
            
            </>
        )
    }
}

export default withRouter(PostDetailsContainer)
