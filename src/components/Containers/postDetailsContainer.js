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
        postId: '',
        title: '',
        photo: '',
        content: '',
        titleError: '',
        contentError: '',
        disabled: false,
        editing: false,
        comments: [],
    }

    componentDidMount () {
        const post_Id = this.props.id
        axios.get(`${process.env.REACT_APP_API_URL}/posts/post_detail/${post_Id}`)
        .then((res) => {
            console.log(res.data.data)
            this.setState({ 
                // channel: res.data.data.channel.name,
                userId: res.data.data.user,
                userSlug: res.data.data.userSlug,
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
        axios.delete(`${process.env.REACT_APP_API_URL}/posts/delete/${post_Id}`,{withCredentials:true})
        .then(
          this.props.history.push('/')
        )
        .catch(err => console.log(err));
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, }, this.postValidation)
    };

    handleEditSubmit = (e) => {
        e.preventDefault()
        const post_Id = this.state.postId
        axios.put(`${process.env.REACT_APP_API_URL}/posts/edit/${post_Id}`, this.state)
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
            <form className="container">
                <div className="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <input onChange={ this.handleChange } type="text" className="form-control" id="exampleFormControlInput1" name="title" value={ title } />
                    <div>{this.state.titleError}</div>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlInput1">Photo</label>
                    <input onChange={ this.handleChange } type="text" className="form-control" id="exampleFormControlInput1" value={ photo } name="photo" />
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Contents</label>
                    <textarea onChange={ this.handleChange } className="form-control" id="exampleFormControlTextarea1" name="content" value={ content } rows="3"></textarea>
                    <div>{this.state.contentError}</div>
                </div>
                <button
                    type="submit"
                    className={`btn btn-primary`}
                    onClick={ this.handleEditSubmit }
                    disabled={ this.state.disabled }
                    >Save</button>
            </form>

            :
            <>
                <section className="container">
                    <div className="postsDetail-container">
                        {/* <p>{ this.state.channel }</p> */}
                        <h2>{ title }</h2><span role="img" aria-label="comment">&#128172; { this.state.comments.length }</span>
                        <img src={ this.state.photo } alt={ this.state.title } / >
                        <p>{ content }</p>
                        
                        <p>Post By : 
                            <a href={`/profile/${this.state.userId}`}>{this.state.userSlug}</a>
                        </p>

                        { this.props.currentUser === this.state.userId ? 
                            <>
                                <button onClick={ this.handleEditChange } className="btn btn-primary" >Edit</button>
                                <button onClick={ this.handleDelete } className="btn btn-primary">Delete</button>
                            </>
                        : null }
                    </div>
                    <div className="comment-container">
                        {this.state.comments.map(comment => (
                            <CommentDetails 
                                currentUser= { this.props.currentUser }
                                detail={ comment }
                            />
                        ))}
                    </div>
                </section>
                <div className="comment-form-container">
                    <h1 className="text-center">Comment on this article</h1>
                    <div className="comment-form container">
                        <Comments
                            currentUser={ this.props.currentUser }
                            userSlug={ this.props.userSlug }
                            post_Id={ this.state.postId }
                            handleCommentSubmit={ this.handleCommentSubmit }
                        />
                    </div>
                </div>
            
            </>
        )
    }
}

export default withRouter(PostDetailsContainer)
