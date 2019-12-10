import React, { Component } from 'react';
import axios from 'axios';

import './Profile.css'

class Profile extends Component {
    state = {
        name: '',
        lastName: '',
        email: '',
        slug: '',
        photo: '',
        theme: '',
        disabled: false,
        editing: false,

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
            slugError = `This field can not be empty`
        } else if (slug.length < 3 && name !== Number ) {
            slugError = `Profile must be at least 3 characters`
        }

        if (name === '') {
          nameError = `This field can not be empty`
        } else if (name.length < 3 && name !== Number ) {
          nameError = `Name must be at least 3 characters`
        }
    
        if (lastName === '') {
            lastNameError = `This field can not be empty`
          } else if (lastName.length < 3 && name !== Number ) {
            lastNameError = `Last Name must be at least 3 characters`
          }
    
        if (email === '') {
          emailError = `This field can not be empty`
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
        this.setState({ [e.target.name]: e.target.value, }, this.postValidation)
    };

    handdleOnEdit = () => {
        this.setState({ editing: !this.state.editing });
        setTimeout(1000)
    }

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

    handleEditSubmit = (e) => {
        e.preventDefault()
        const validation = this.formValidation()
        if (validation) {
        const user_Id = localStorage.getItem('uid')
        axios.put(`${process.env.REACT_APP_API_URL}/profile/edit/${user_Id}`, this.state)
        .then((res) => {
            this.setState({ editing: !this.state.editing });
         })}
    }

    render() {
        const currentUser = localStorage.getItem('uid')
        return (
            
            <div className="profile-box d-flex" style={{ backgroundImage:`url(${this.state.theme})` }} >
                <div className="profile-wrap d-flex">
                    <div className="profile-img">
                        <img src={ this.state.photo } alt="" />
                    </div>
                    <div className="profile-info">
                        <h2>Profile<span> : {this.state.slug}</span></h2>
                        <div>Name : {this.state.name}-{this.props.user.lastName}</div>
                        <div>Email : {this.state.email}</div>
                        <div>Member : {new Date(this.props.user.signup_date).toDateString()}</div>
                        <div>Post : { this.props.posts } { this.props.posts <=1 ? " post" : " posts" }</div>
                        <div>Comment : { this.props.comments } { this.props.comments <=1 ? " comment" : " comments" } </div>

                        { currentUser === this.props.user_Id 
                        ?
                            <button
                                className="btn btn-danger"
                                onClick={ this.handdleOnEdit }
                                >Edit Profile</button>
                        :
                        null
                        }
                    </div>
                </div>

            { this.state.editing ? 
    
            <form className="edit-profile-form">
                <div className="d-flex">
                    <h2>Edit profile</h2>

                    <input onChange={ this.handleChange } className="form-control" type="text" id="slug" name="slug" 
                        value={ this.state.slug }/>
                    <div>{ this.state.slugError }</div>
                </div>
                <div className="d-flex">
                    <label htmlFor="photo">Photo</label>
                    <input onChange={ this.handleChange } className="form-control" type="text" id="photo" name="photo" 
                        value={ this.state.photo } />
                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <label htmlFor="name">Name</label>
                        <input onChange={ this.handleChange } className="form-control" type="text" id="name" name="name" 
                            value={ this.state.name }/>
                        <div>{ this.state.nameError }</div>
                    </div>
                    <div className="d-flex">
                        <label htmlFor="lastName">Last Name</label>
                        <input onChange={ this.handleChange } className="last-name form-control" type="text" id="lastName" name="lastName" 
                        value={ this.state.lastName }/>
                        <div>{ this.state.lastNameError }</div>
                    </div>
                </div>
                <div className="d-flex">
                    <label htmlFor="email">Email</label>
                    <input onChange={this.handleChange} className="form-control" type="text" id="email" name="email" 
                        value={ this.state.email }/>
                    <div>{this.state.emailError}</div>
                </div>
                <div className="d-flex">
                    <label htmlFor="theme">Back ground</label>
                    <input onChange={this.handleChange} className="back-ground form-control" type="text" id="theme" name="theme" 
                        value={ this.state.theme } />
                </div>
                <button
                    type="submit"
                    className="btn btn-warning float-right"
                    disabled={ this.state.disabled }
                    onClick={ this.handleEditSubmit }
                    >Save</button>
            </form>
            :
            null
            }
            </div>
        )
    }
}

export default Profile