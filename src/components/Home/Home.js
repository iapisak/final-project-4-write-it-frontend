import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment'

import './home.css'

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
          .then(() => this.componentDidMount())
          this.setState(initialState)
        }
    }

    render () {
        return  <>
                <div className="headline position-relative overflow-hidden"
                     style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${this.props.channelPhoto}")`}}>
                    <div className="captions">
                        <div className="col-md-8 mx-auto">
                            <h1 className="display-3 text-light">Write-it</h1>
                            <p>A simple of writing. <br />Here you will find news, and share your experiences.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 mx-auto p-0 p-md-3 mb-4">
                    <div className="p-3 pl-md-0">
                        <div className="d-flex">
                            { this.props.channelName === "General-Article" 
                                ? <h2 className="font-weight-bold">Open Topic</h2>
                                : <h2 className="font-weight-bold">{ this.props.channelName } Channel</h2>
                            }
                            { this.props.currentUser 
                                ? <a href="#create-post" className="ml-auto text-info" > Create post </a>
                                : null 
                            }
                        </div>
                        <hr className="mt-0"/>
                        <p className="text-secondary" style={{ fontWeight: "100", fontSize: '14px' }}>{ this.props.channelDetail }</p>
                    </div>
                    { this.state.posts.map(post => {
                        const template = <a className="text-info" href={`/post/${ post._id }`} style={{ textDecoration: 'none'}}><small>learn more</small></a>
                        let content 
                        if (post.content.length > 500) {
                            content = `${post.content.substring(0, 500)}...`
                        } else content = post.content

                        return  <div className="d-md-flex" key={ post.photo }>
                                    <div className="col-md-3 p-0 mb-3 py-md-1" style={{ height: "210px", overflow: "hidden" }}>
                                        { post.photo ? 
                                        <a href={`/post/${post._id}`}>
                                            <img className="img-fluid" src={ post.photo } alt={ post.photo} / >
                                        </a>
                                        : null }
                                    </div>
                                    <div className="col-md-9 mb-3">
                                        <a className="text-dark lead" href={`/post/${post._id}`} style={{ textDecoration: 'none'}}>
                                            <h5>{post.title}</h5>
                                        </a>    
                                        <p className="text-secondary mb-2">{ moment(post.date).format('MMM D, YYYY') } By <Link to={`/profile/${post.user}`}> <small>{ post.userSlug }</small></Link></p>
                                        <hr className=" mt-0 mb-2"/>
                                        <p className="text-secondary" style={{ fontWeight: "300", fontSize: '14px' }}>{ content } { template }</p>
                                    </div>
                                </div>
                    }) }

                    <div className="row m-0 p-3 p-md-0 py-md-4">
                        <div className="col-md-5 py-3 row m-0 mb-3 mb-md-0 mr-md-3 shadow" style={{ backgroundColor: "rgba(149,117,205,0.06)"}}>
                            <div>
                                <h4>Tell your story</h4>
                                <p className="text-muted mb-4" style={{ fontSize: '13px', fontWeight: '100' }}>Speaking of stories, every blog post needs to have a beginning, a middle and an end. Think of it as an introduction, the main information, and conclusion if you prefer. Even if you don’t give use to those sub-headings because, hopefully, you’ve come up with hotter ones, do follow the convention to avoid confusing your readers.</p>
                                <hr className=""/>
                                <h4>Use image</h4>
                                <p className="text-muted" style={{ fontSize: '13px', fontWeight: '100' }}>Good use of images will draw readers into your blog posts. Sometimes I read a post purely because I like the image. Ideally, your images will add to your blog or emphasize your message</p>
                            </div>
                        </div>
                        <div className="col py-3 shadow" style={{ backgroundColor: 'rgba(248,187,208 ,0.05)' }}>
                            <div className="d-flex mb-3">
                                <h4>Create new topic</h4>
                                <a className="ml-auto text-info" href="#top"><small>Back to the Top</small></a>
                            </div>
                            <form id="create-post">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="input1">Title</label>
                                    <input onChange={this.handleChange} type="search" className="form-control"
                                        id="input1" name="title" value={this.state.title}
                                        placeholder={ this.state.titleError ? this.state.titleError : "type your title here" } />
                                </div>                            
                                <div className="form-group">
                                    <label className="form-label" htmlFor="input2">Photo</label>
                                    <input onChange={this.handleChange} type="text" className="form-control" placeholder="example https://photo.com" id="input2" name="photo" value={this.state.photo} />
                                </div>       
                                <div className="form-group">
                                    <label className="form-label" htmlFor="input3">Contents</label>
                                    <textarea onChange={this.handleChange} className="form-control"  
                                            id="input3" name="content" value={ this.state.content } rows="5" cols="50"
                                            placeholder={ this.state.contentError ? this.state.contentError : "Description" }>
                                    </textarea>
                                </div>
                                <div className="text-right">
                                    <button type="submit" onClick={ this.handleSubmit } className="btn btn-primary mr-1" disabled={ this.state.disabled } style={{ borderRadius: '30px'}}>Create new article</button>
                                    <button type="button" onClick={()=> this.setState(initialState) } className="btn btn-danger" style={{ borderRadius: '30px', width: '80px'}}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </>
    }
}

export default Home