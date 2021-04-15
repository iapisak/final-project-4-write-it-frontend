import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment'

const initialState = {
    title : '',
    content : '',
    photo: '',
    titleError: '',
    contentError: '',
    disabled: true,
};

class Home extends Component {
    state = {
        posts: [],
        title : '',
        content : '',
        photo: '',
        titleError: '',
        contentError: '',
        disabled: true,
    }

    postValidation = () => {
        const { title, content } = this.state
        let titleError = ''
        let contentError = ''
  
        if (title === '') titleError = `Required`
        if (content === '') contentError = `Required`
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

    componentDidMount () {
        const channel_Id = this.props.channel
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${channel_Id}`)
        .then((res) => this.setState({ posts: res.data.data }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const postValidation = this.postValidation()
        const user = this.props.currentUser
        const userSlug = this.props.userSlug
        const channel = this.props.channel
        const date = Date.now()
        const newPosts = {...this.state, user, userSlug, channel, date}

        if (postValidation) {
          axios.post(`${process.env.REACT_APP_API_URL}/posts/create`, newPosts)
          .then(res => this.componentDidMount())
          this.setState(initialState)
        }
    }

    render () {
        return  <div className="col-md-8 mx-auto p-0 my-3" id="main-channel">
                    <div className="p-3 pl-md-0">
                        <div className="d-flex">
                            <h2>{ this.props.channelName } Channel</h2>
                            { this.props.currentUser ? <a href="#create-post" className="ml-auto" > Create post </a>
                                : null }
                        </div>
                        <p className="text-secondary">{ this.props.channelDetail }</p>
                    </div>
                    { this.state.posts.map(post => (
                        <div className="d-md-flex" key={ post.photo }>
                            <div className="col-md-4 p-0 mb-3">
                                { post.photo ? 
                                <a href={`/post/${post._id}`}>
                                    <img className="img-fluid rounded" src={ post.photo } alt={ post.photo} / >
                                </a>
                                : null }
                            </div>
                            <div className="col-md-8 mb-3">
                                <a className="text-dark lead" href={`/post/${post._id}`} style={{ textDecoration: 'none'}}>
                                    <h4>{post.title}</h4>
                                </a>    
                                <p className="text-secondary">{ moment(post.date).format('MMMM D YYYY') } By <Link to={`/profile/${post.user}`}> { post.userSlug }</Link></p>
                                <p className="text-secondary">{post.content}</p>
                                <hr />
                            </div>
                        </div>
                    )) }

                    { this.props.currentUser ? 
                    <form id="create-post" className="p-3">
                        <div className="d-flex">
                            <h3>Create new topic</h3>
                            <a className="ml-auto" href="#main-channel">Back to the Top</a>
                        </div>
                        <div className="form-group">
                            <label htmlFor="input1">Title</label>
                            <input onChange={this.handleChange} type="search" className={ !this.state.titleError ? "form-control" : "alert"} 
                                id="input1" name="title" value={this.state.title}
                                placeholder={ this.state.titleError ? this.state.titleError : "type your title here" } />
                        </div>
                        <div className="form-group">
                            <label htmlFor="input2">Photo</label>
                            <input onChange={this.handleChange} type="text" className="form-control" placeholder="example https://photo.com" id="input2" name="photo" value={this.state.photo} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="input3">Contents</label>
                            <textarea onChange={this.handleChange} className={ !this.state.contentError ? "form-control" : "textarea-alert"}  
                                    id="input3" name="content" value={ this.state.content } rows="3"
                                    placeholder={ this.state.contentError ? this.state.contentError : "Description" }>
                            </textarea>
                        </div>
                        <button type="submit" onClick={ this.handleSubmit } className="btn btn-primary float-right mb-3"
                                disabled={ this.state.disabled }>Submit</button>
                    </form>
                    : null }
                </div>
    }
}

export default Home