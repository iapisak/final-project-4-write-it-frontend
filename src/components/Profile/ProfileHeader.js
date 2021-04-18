import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'

class Profile extends Component {
    state = {
        name: '',
        lastName: '',
        email: '',
        slug: '',
        photo: '',
        theme: '',
        disabled: false,
        nameError: '',
        lastNameError: '',
        emailError: '',
        slugError: '',
    }

    formValidation = () => {
        const { email, name, lastName, slug, } = this.state

        let slugError = ''
        let nameError = ''
        let emailError = ''
        let lastNameError = ''

        if (slug === '') {
            slugError = `Required`
        } else if (slug.length < 3 && name !== Number ) {
            slugError = `Profile must be at least 3 characters`
        }

        if (!name) {
          nameError = `Required`
        } else if (name.length < 3 && name !== Number ) {
          nameError = `Name must be at least 3 characters`
        }
    
        if (lastName === '') {
            lastNameError = `Required`
          } else if (lastName.length < 3 && name !== Number ) {
            lastNameError = `Last Name must be at least 3 characters`
          }
    
        if (email === '') {
          emailError = `Required`
        } else if (email !== '' && !email.includes('@')) {
            emailError = `Email must includes '@'`
        }
    
        if (emailError || nameError || lastNameError || slugError) {
          this.setState({ emailError, nameError, lastNameError, slugError })
          return false
        }
        return true
      }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, }, this.formValidation)
    };

    componentDidMount () {
        const user_Id = this.props.user_Id
        axios.get(`${process.env.REACT_APP_API_URL}/profile/${user_Id}`)
        .then((res) => {
            this.setState({
                name: res.data.data.name,
                lastName: res.data.data.lastName,
                email: res.data.data.email,
                slug: res.data.data.slug,
                photo: res.data.data.photo,
                theme: res.data.data.theme,
            })
        })
    }

    handleEditSubmit = async (e) => {
        e.preventDefault()
        const validation = this.formValidation()
        if (validation) {
        const user_Id = localStorage.getItem('uid')
        await axios.put(`${process.env.REACT_APP_API_URL}/profile/edit/${user_Id}`, this.state)
        .then(() => {
            this.setState({ editing: !this.state.editing });
         })}
    }

    render() {
        const currentUser = localStorage.getItem('uid')
        const { name, lastName, email, photo, signup_date, slug } = this.state
        
        return (
            <>
            <div className="overflow-hidden">
                <div className="px-4 pt-0 pb-4" style={{ backgroundColor: "#001630" }}>
                    <div className="col-md-8 mx-auto p-0 media align-items-end profile-head" style={{ zIndex: '999'}}>
                        <div className="profile mr-3">
                            <img src={ photo } alt={ photo } width="150" height="auto" className="rounded mb-2 img-thumbnail" />
                            { currentUser === this.props.user_Id ?
                            <button className="btn btn-info btn-block" 
                                    type="button" data-toggle="collapse" data-target="#edit-profile" aria-expanded="false">Edit profile</button>
                            : <div className="d-block text-light">{ name }</div> }
                        </div>
                        <div className="media-body mb-5 text-light">
                            <h2 className="mt-0 mb-0">{ name + ' ' + lastName }</h2>
                            <p className="m-0">Email : { email }</p>
                            <p className="m-0">Created : { moment(signup_date).format("MMMM D, YYYY") }</p>
                            <p className="mb-4">Call me { slug }</p>
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <div className="col-md-8 mx-auto p-0 d-flex justify-content-end text-center">
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                                <h3 className="font-weight-bold mb-0 d-block">{ this.props.posts }</h3>
                                <small className="text-muted">{ this.props.posts > 1 ? 'Articles' : 'Article' }</small>
                            </li>
                            <li className="list-inline-item">
                                <h3 className="font-weight-bold mb-0 d-block">{ this.props.comments }</h3>
                                <small className="text-muted">{ this.props.comments > 1 ? 'Comments' : 'Comment' }</small>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-md-8 mx-auto p-0 mb-5 collapse navbar-collapse" id="edit-profile">
                <div id="edit-profile-form" className="d-md-flex border shadow py-3" style={{ backgroundColor: "rgba(149,117,205,0.06)"}}>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">Name</label>
                            <input onChange={this.handleChange} type="search" className={ this.state.nameError ? "form-control alert" : "form-control"}
                                id="name" name="name" value={this.state.name}
                                placeholder={ this.state.nameError ? this.state.nameError : "John" } />
                        </div> 
                        <div className="form-group">
                            <label className="form-label" htmlFor="lastName">Last Name</label>
                            <input onChange={this.handleChange} type="search" className={ this.state.lastNameError ? "form-control alert" : "form-control"}
                                id="lastName" name="lastName" value={this.state.lastName}
                                placeholder={ this.state.lastNameError ? this.state.lastNameError : "Doe" } />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input onChange={this.handleChange} type="search" className={ this.state.emailError ? "form-control alert" : "form-control"}
                                id="email" name="email" value={this.state.email}
                                placeholder={ this.state.emailError ? this.state.emailError : "JohnDoe@gmail.com" } />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="photo">Photo</label>
                            <input onChange={this.handleChange} type="search" className="form-control"
                                id="photo" name="photo" value={this.state.photo}
                                placeholder="photo" />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="slug">Nick Name</label>
                            <input onChange={this.handleChange} type="search" className={ this.state.slugError ? "form-control alert" : "form-control"}
                                id="slug" name="slug" value={this.state.slug}
                                placeholder={ this.state.slugError ? this.state.slugError : "JohnDoe" } />
                        </div>                

                        <div className="text-right">
                            <button type="submit" className="btn btn-primary mr-1" data-toggle="collapse" data-target="#edit-profile" aria-expanded="false" 
                                    disabled={ this.state.disabled } onClick={ this.handleEditSubmit }><small>Update</small></button>
                            <button className="btn btn-danger" data-toggle="collapse" data-target="#edit-profile" aria-expanded="false"><small>Cancel</small></button>
                        </div>
                    </div>
                </div>
            </div>
            </>
            )
    }
}

export default Profile