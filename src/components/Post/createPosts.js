import React, {Component} from 'react';

const initialState = {
      title : '',
      content : '',
      photo: '',
      titleError: '',
      contentError: '',
      disabled: true,
};

class CreatePosts extends Component{
    state = initialState
    
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
        this.setState({disabled: false, titleError, contentError})
        return true
      }
    }

    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value,
        }, this.postValidation)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const postValidation = this.postValidation()
        const userId = this.props.currentUser
        const newPosts = {
          title: this.state.title,
          content: this.state.content,
          photo: this.state.photo,
          user: userId,
          channel: this.props.channel,
        }

        if (postValidation) {
          this.props.handleSubmit(e, newPosts);
          this.setState(initialState)

        }
    }

  render() {
    return (
      <>
      {this.props.currentUser ? 
        <form style={{ display: this.props.toggle ? 'block': 'none' }}>
        <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Title</label>
            <input onChange={this.handleChange} type="text" className="form-control" id="exampleFormControlInput1" name="title" value={this.state.title} />
            <div>{this.state.titleError}</div>
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Photo</label>
            <input onChange={this.handleChange} type="text" className="form-control" id="exampleFormControlInput1" name="photo" value={this.state.photo} />
        </div>
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Contents</label>
            <textarea onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1" name="content" value={this.state.content} rows="3"></textarea>
            <div>{this.state.contentError}</div>
        </div>
        <button
            type="submit"
            onClick={this.handleSubmit}
            className={`btn btn-primary ${this.state.disable}`}
            disabled={this.state.disabled}>Submit</button>
        </form>

        : null }
      </>
      );
    }
}

export default CreatePosts;
