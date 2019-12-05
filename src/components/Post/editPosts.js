import React, { Component } from 'react';

class EditPosts extends Component {
    state = {
        title: '',
        photo: '',
        content: '',
        titleError: '',
        contentError: '',
        disabled: false,
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
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, }, this.postValidation)
    };

    render () {
        const editPost = this.state

        return (
            <form>
                <div className="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <input onChange={ this.handleChange } type="text" className="form-control" id="exampleFormControlInput1" name="title" value={ this.state.title } />
                    <div>{this.state.titleError}</div>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlInput1">Photo</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" value={ this.state.photo } name="photo" />
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Contents</label>
                    <textarea onChange={ this.handleChange } className="form-control" id="exampleFormControlTextarea1" name="content" value={ this.state.content } rows="3"></textarea>
                    <div>{this.state.contentError}</div>
                </div>
                <button
                    type="submit"
                    className={`btn btn-primary`}
                    onClick={(e) => this.props.handleSubmit(e, editPost)}
                    disabled={ this.state.disabled }>
                    Save</button>
            </form>
    )}

}

export default EditPosts