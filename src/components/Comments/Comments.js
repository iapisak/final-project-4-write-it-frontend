import React, { Component } from 'react';

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

        if (comment === '') commentError = `This field is empty`

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
        return <div className="d-flex mb-2 align-items-center">
                    <div className="mx-2">
                        <img src={ userPhoto } alt={ this.props.userSlug } style={{ width: '50px', borderRadius: '50%' }}/>
                    </div>
                    <form className="flex-shrink-1 w-100">
                        <div className="form-group d-flex m-0">
                            <input onChange={this.handleChange} className="form-control" name="comment"
                                   value={ this.state.comment } placeholder="Join the discussion..." />
                        <div>
                            <button type="submit" className="btn btn-primary ml-2" onClick={ this.handleSubmit }
                                    disabled={ this.state.disabled } >Summit</button>
                        </div>
                        </div>
                    </form>
                </div>
    }
}

export default Comments;