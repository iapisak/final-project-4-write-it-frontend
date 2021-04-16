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
        return  <>
                <div className="position-relative overflow-hidden p-3 p-md-4 text-center bg-light">
                    <div className="col-md-5 p-lg-5 mx-auto my-5">
                        <h1 className="display-4 font-weight-normal">Punny headline</h1>
                        <p className="lead font-weight-normal">And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple's marketing pages.</p>
                    </div>
                </div>
                <div className="col-md-8 mx-auto p-0 my-3">
                    <div className="p-3 pl-md-0">
                        <div className="d-flex">
                            { this.props.channelName === "General-Article" 
                                ? <h2>Open Topic</h2>
                                : <h2>{ this.props.channelName } Channel</h2>
                            }
                            { this.props.currentUser 
                                ? <a href="#create-post" className="ml-auto text-info" > Create post </a>
                                : null 
                            }
                        </div>
                        <p className="text-secondary" style={{ fontWeight: "300"}}>{ this.props.channelDetail }</p>
                    </div>
                    { this.state.posts.map(post => {
                        let content 
                        if (post.content.length > 500) {
                            content = `${post.content.substring(0, 500)} ... `
                        } else content = post.content

                        return  <div className="d-md-flex" key={ post.photo }>
                                    <div className="col-md-4 p-0 mb-3">
                                        { post.photo ? 
                                        <a href={`/post/${post._id}`}>
                                            <img className="img-fluid" src={ post.photo } alt={ post.photo} / >
                                        </a>
                                        : null }
                                    </div>
                                    <div className="col-md-8 mb-3">
                                        <a className="text-dark lead" href={`/post/${post._id}`} style={{ textDecoration: 'none'}}>
                                            <h4>{post.title}</h4>
                                        </a>    
                                        <p className="text-secondary mb-2">{ moment(post.date).format('MMM D, YYYY') } By <Link to={`/profile/${post.user}`}> <small>{ post.userSlug }</small></Link></p>
                                        <hr className=" mt-0 mb-2"/>
                                        <p className="text-secondary" style={{ fontWeight: "300"}}>{ content }</p>
                                    </div>
                                </div>
                    }) }

                    { this.props.currentUser ? 
                    <div className="col-md-10 mx-auto p-0 my-5 bg-light shadow rounded">
                        <form id="create-post" className="p-3">
                            <div className="d-flex">
                                <h3>Create new topic</h3>
                                <a className="ml-auto text-info" href="#top">Back to the Top</a>
                            </div>
                            <div className="form-group px-md-4">
                                <label className="mt-3" htmlFor="input1">Title</label>
                                <input onChange={this.handleChange} type="search" className={ !this.state.titleError ? "form-control" : "alert"} 
                                    id="input1" name="title" value={this.state.title}
                                    placeholder={ this.state.titleError ? this.state.titleError : "type your title here" } />
                                <label className="mt-3" htmlFor="input2">Photo</label>
                                <input onChange={this.handleChange} type="text" className="form-control" placeholder="example https://photo.com" id="input2" name="photo" value={this.state.photo} />
                                <label className="mt-3" htmlFor="input3">Contents</label>
                                <textarea onChange={this.handleChange} className={ !this.state.contentError ? "form-control" : "textarea-alert"}  
                                        id="input3" name="content" value={ this.state.content } rows="3"
                                        placeholder={ this.state.contentError ? this.state.contentError : "Description" }>
                                </textarea>
                                <button type="submit" onClick={ this.handleSubmit } className="btn btn-primary float-right my-3"
                                        disabled={ this.state.disabled }>Submit</button>
                            </div>

                        </form>
                    </div>
                    : null }
                </div>
                </>
    }
}

export default Home