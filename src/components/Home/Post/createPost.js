import React, {Component} from 'react';
import axios from 'axios';

const initialState = {
      title : '',
      content : '',
      photo: '',
      titleError: '',
      contentError: '',
      disabled: true,
      channel: '',
};

class CreatePost extends Component{
    state = initialState
    
    categoryList = (e) =>{
      this.setState({ channel:e.target.value })
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
          channel: this.state.channel,
        }

        if (postValidation) {
             axios.post(`${process.env.REACT_APP_API_URL}/posts/create`, newPosts)
            .then((res) => {
               this.setState(initialState)
             })
            .catch((err) => console.log(err))
        }
    }

  render() {
    return (
      <>
        <div className="modal fade" id="createPost" tabIndex="-1" role="dialog" aria-labelledby="Edit post form" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span onClick={()=> {this.setState(initialState)}} aria-hidden="true">&times;</span>
                </button>
              </div>
              <form>
                <div className="modal-body">
                  <select onChange={ this.categoryList }>
                    {this.props.category.map(channel => {
                      return <option value={channel._id} key={channel._id}>{channel.name}</option>
                    })}
                  </select>
                  <label htmlFor="postTitle">Title</label>
                  <input onChange={this.handleChange} type="text" id="postTitle" name="title" value={this.state.title} />
                  <div className='alert'>{this.state.titleError}</div>

                  <label htmlFor="postPhoto">Photo</label>
                  <input onChange={this.handleChange} type="text" id="postPhoto" name="photo" value={this.state.photo} />

                  <textarea onChange={this.handleChange} name="content" value={this.state.content} />
                  <div className='alert'>{this.state.contentError}</div>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    onClick={this.handleSubmit}
                    className={`btn btn-primary ${this.state.disable}`}
                    data-dismiss="modal"
                    disabled={this.state.disabled}> Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
      );
    }
}

export default CreatePost;
