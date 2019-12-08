import React, { Component } from 'react';

import './Comment.css'

const initialState = {
    comment: '',
    commentError: '',
    disabled: true,
}

class Comments extends Component {
    state = initialState

    postValidation = () => {
        const { comment } = this.state
        let commentError = ''

        if (comment === '') {
            commentError = `Required, this field can not be empty`
        }

        if (commentError) {
            this.setState({ commentError, disabled: true })
            return false
        }
        if (comment !== '') {
        this.setState({ disabled: false, commentError })
        return true
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const post = this.props.post_Id
        const user = this.props.currentUser
        const userSlug = this.props.userSlug
        const newState = {...this.state, post, user, userSlug}
        this.props.handleCommentSubmit(e, newState)
        this.setState(initialState)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, }, this.postValidation)
    };

    render() {
        return (
            this.props.currentUser ?
            <div className="comment-box">
                <form>
                <div className="form-group">
                    <textarea onChange={this.handleChange} className="form-control" name="comment"  rows="3" value={ this.state.comment } placeholder="Join the discussion..."></textarea>
                    <div>{this.state.commentError}</div>
                </div>
                
                <button
                    type="submit"
                    className={`btn btn-primary`}
                    onClick={ this.handleSubmit }
                    disabled={ this.state.disabled } >
                    Send your comment</button>
                </form>
            </div>
            :
            null
        )
    }
}

export default Comments;