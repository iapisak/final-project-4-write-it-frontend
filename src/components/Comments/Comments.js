import React, { Component } from 'react';
import axios from 'axios';

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
        const newState = {...this.state, post, user}
        axios.put(`${process.env.REACT_APP_API_URL}/comment/create`, newState)
        .then((res) => {
            this.setState(initialState)
         })
        .catch(err => console.log(err))
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, }, this.postValidation)
    };

    render() {
        return (
            <form>
            <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Comment</label>
                <textarea onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1" name="comment"  rows="3" value={ this.state.comment } ></textarea>
                <div>{this.state.commentError}</div>
            </div>
            <button
                type="submit"
                className={`btn btn-primary`}
                onClick={ this.handleSubmit }
                disabled={ this.state.disabled } >
                Send your comment</button>
            </form>
        )
    }
}

export default Comments;