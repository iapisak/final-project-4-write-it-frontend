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
            commentError = `This field is empty`
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
        const newState = {...this.state, post, user, userSlug, date: Date.now()}
        this.props.handleCommentSubmit(e, newState)
        this.setState(initialState)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, }, this.postValidation)
    };

    render() {
        const userPhoto = localStorage.getItem('photo')
        return (            
            <div className="comment-box">
                <p className="text-center">Write-It moderates comments to facilitate an informed, substantive, civil conversation. Abusive, profane, self-promotional, misleading, incoherent or off-topic comments will be rejected.</p>
                <h6>
                <span className="icons" role="img" aria-label="comment">
                    &#128172;
                </span>
                { this.props.numberComment } {this.props.numberComment <=1 ? "comment" : "comments" }
                </h6>
                <form>
                    <div className="d-flex">
                        <div className="current-photo">
                            <img src={ userPhoto } alt="" />
                        </div>
                        <div className="form-group comment-textarea">
                            <textarea onChange={this.handleChange} className="form-control" name="comment"  rows="3" value={ this.state.comment } placeholder="Join the discussion..."></textarea>
                            <div className="alert">{this.state.commentError}</div>
                        </div>
                    </div>
                
                <button
                    type="submit"
                    className="btn btn-info float-right"
                    onClick={ this.handleSubmit }
                    disabled={ this.state.disabled } >
                    Send your comment</button>
                </form>
            </div>
        )
    }
}

export default Comments;