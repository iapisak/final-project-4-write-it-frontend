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
              <form onSubmit={this.handleSubmit} className="card mx-auto border-0 rounded-0" style={{ backgroundColor: 'transparent' }}>
                <h1 className="font-weight-bold">Register</h1>
                <small className="mb-0">Please enter your details below</small>
                <hr className="mb-1"/>
                <small className="mb-0 mt-3">Name</small>
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
                <div className="row px-3 my-4 d-flex align-items-center">
                  <button type="submit" className="btn btn-primary px-3 mr-2">Register</button>
                  <small>or <a href="/" className="text-secondary">Log in</a></small>
                </div>
              </form>
          </div>
  }
}

export default withRouter(Signup);
