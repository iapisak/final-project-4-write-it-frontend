import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './auth.css'

const initialState = {
    name: '',
    lastName: '',
    email: '',
    slug: '',
    password: '',
    password2: '',
    
    nameError: '',
    lastNameError: '',
    slugError: '',
    emailError: '',
    passwordError: '',
    password2Error: '',
}

class Signup extends Component {
  state = initialState;

  formValidation = () => {
    const { email, name, slug, lastName, password, password2 } = this.state

    let nameError = ''
    let lastNameError = ''
    let slugError = ''
    let emailError = ''
    let passwordError = ''
    let password2Error = ''

    if (name === '') {
      nameError = `Required`
    } else if (name.length < 3 && name !== Number ) {
      this.setState({ name: '' })
      nameError = `Name must be at least 3 characters`
    }

    if (lastName === '') {
        lastNameError = `Required`
      } else if (lastName.length < 3 && name !== Number ) {
        this.setState({ lastName: '' })
        lastNameError = `Last Name must be at least 3 characters`
      }
    
    if (slug === '') slugError = 'Required'
     

    if (email === '') {
      emailError = `Required`
    } else if (email !== '' && !email.includes('@')) {
      this.setState({ email: '' })
        emailError = `Email must includes '@'`
    }

    if (password === '') {
      passwordError = `Required`
    } else if (password.length < 4) {
      this.setState({ password: '' })
      passwordError = `Your password is too weak. Please try again`
    }

    if (password2 === '') {
      password2Error = `Required`
    } else if (password !== password2) {
      this.setState({ password2: '' })
      password2Error = `Please confirm your password again`
    }

    if (emailError || nameError || lastNameError|| slugError || passwordError || password2Error) {
      this.setState({ emailError, nameError, lastNameError, slugError, passwordError, password2Error })
      return false
    }
    return true
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formValidation = this.formValidation()

    if (formValidation) {
        axios.post(`${process.env.REACT_APP_API_URL}/signup`, this.state,)
        .then(() => {
            this.setState(initialState)
            this.props.history.push('/')
        })
        .catch(() => {
          this.setState({ email: '',
                          emailError: `Invalid Email, Please try again`,
                          password: '',
                          password2: '' }) 
        })
    }
  };

  handleOneClick = () => {
    this.setState(initialState)
  }

  render() {

    return  <div id="signup" >
              <div className="container p-0 pt-md-3">
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <div className="col-md-6 p-md-0 pr-md-4 mb-4 mb-md-0 d-none d-md-block">
                      <div className="my-3 pr-md-3 text-md-right welcome"> 
                          <h1 className="display-3 font-weight-bold ">Write-it</h1>
                          <p className="content mb-5">Write-It is social Blog with different communities that users can join. In these communities, users can create posts to share their experiences with other users or comment on other user's posts. The goal of this site is to create an online community for users to share their interests and ideas</p>
                          <h2 className="display-6 font-weight-bold">Test with this account</h2>
                          <p className="content">
                              Email: test@gmail.com || Password: test
                          </p>
                      </div>
                      <div className="text-md-right pr-md-3">
                          <a className="btn btn-outline-light mr-2" href="https://github.com/iapisak/final-project-4-write-it-frontend" rel="noopener noreferrer" target="_blank">Github</a>
                          <a className="btn btn-outline-light" href="https://github.com/iapisak/final-project-4-write-it-frontend" rel="noopener noreferrer" target="_blank">Portfolio</a>
                      </div>
                    </div>
                    <div className="col-md-6 p-0">
                      <form onSubmit={this.handleSubmit} className="card flex-grow-1 mx-auto border-0 rounded-0" style={{ background: "linear-gradient(112deg, white 50%, #007bff 50%)" }}>
                        <h1 className="font-weight-bold">Register</h1>
                        <small className="m-0 mb-4 pb-1 text-muted border-bottom border-secondary">Please enter your details below</small>
                        <small className="mb-0">Name</small>
                        <input onChange={this.handleChange} type="text" name="name" value={this.state.name}
                              className={ this.state.nameError ? "control mb-3" : "mb-3"}
                                placeholder={ this.state.nameError ? this.state.nameError : "John" } />
                        <small className="mb-0">Last Name</small>
                        <input onChange={this.handleChange} type="text" name="lastName" value={this.state.lastName}
                              className={ this.state.lastNameError ? "control mb-3" : "mb-3"}
                                placeholder={ this.state.lastNameError ? this.state.lastNameError : "Smith" } />
                        <small className="mb-0">Email</small>
                        <input onChange={this.handleChange} type="text" name="email" value={this.state.email}
                                className={ this.state.emailError ? "control mb-3" : "mb-3"}
                                placeholder={ this.state.emailError ? this.state.emailError : "john@gmail.com" } />
                        <small className="mb-0">Profile Name</small>
                        <input onChange={this.handleChange} type="text" name="slug" value={this.state.slug}
                                className={ this.state.slugError ? "control mb-3" : "mb-3"}
                                placeholder={ this.state.slugError ? this.state.slugError : "Jonh Smith" }/>
                        <small className="mb-0">Password</small>
                        <input onChange={this.handleChange} type="password" name="password" value={this.state.password}
                              className={ this.state.passwordError ? "control mb-3" : "mb-3"}
                                placeholder={ this.state.passwordError ? this.state.passwordError : 'password' } />
                        <small className="mb-0">Confirm your password</small>
                        <input onChange={this.handleChange} type="password" name="password2" value={this.state.password2}
                              className={ this.state.password2Error ? "control mb-3" : "mb-3"}
                                placeholder={ this.state.password2Error ? this.state.password2Error : 'password' } />
                        <small className="text-muted">Min length is 4 characters</small>
                        <div className="row px-3 my-4 d-flex justify-content-between align-items-center">
                          <button type="submit" className="btn btn-primary px-3 mr-2">Register</button>
                          <a href="/" className="text-light">Have an account?</a>
                        </div>
                      </form>
                    </div>
                </div>
              </div>
            </div>
  }
}

export default withRouter(Signup);
