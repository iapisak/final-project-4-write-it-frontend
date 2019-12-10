import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './Auth.css'

const initialState = {
    name: '',
    lastName: '',
    email: '',
    slug: '',
    password: '',
    password2: '',
    
    nameError: '',
    lastNameError: '',
    emailError: '',
    passwordError: '',
    password2Error: '',
}

class Signup extends Component {
  state = initialState;

  formValidation = () => {
    const { email, name, lastName, password, password2 } = this.state

    let nameError = ''
    let emailError = ''
    let lastNameError = ''
    let passwordError = ''
    let password2Error = ''

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

    if (password === '') {
      passwordError = `This field can not be empty`
    } else if (password.length < 4) {
      passwordError = `Your password is too weak. Please try again`
    }

    if (password2 === '') {
      password2Error = `This field can not be empty`
    } else if (password !== password2) {
      password2Error = `Please confirm your password again`
    }

    if (emailError || nameError || lastNameError||  passwordError || password2Error) {
      this.setState({ emailError, nameError, lastNameError, passwordError, password2Error })
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
        .then((res) => {
            if (res.data.status === 201) {
            this.setState(initialState)
            this.props.signupToggle()
            this.props.history.push('/')
            } else {
                this.setState({ emailError: `Invalid Email, Please try again`, password2Error: ''})
            }
        })
        .catch((err) => this.setState({ emailError: `Invalid Email, Please try again`}));
    }
  };

  handleOneClick = () => {
    this.setState(initialState)
    this.props.signupToggle()
  }

  render() {
    return (
      <div className="signup-box" style={{ display: this.props.toggle ? 'block': 'none' }} >
        <form id="signup" className="container" onSubmit={this.handleSubmit}>
            <h1>Sign up</h1>
            <div className="form-group">
                <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="email" name="email" placeholder="Email" value={this.state.email} />
                <div className='alert'>{this.state.emailError}</div>
            </div>
            <div className="form-group">
                <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="slug" name="slug" placeholder="Profile-Name" value={this.state.slug} />
                <div className='alert'></div>
            </div>
            <div className="form-group">
                <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="name" name="name" placeholder="First name" value={this.state.name} />
                <div className='alert'>{this.state.nameError}</div>
            </div>
            <div className="form-group">
                <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="lastName" name="lastName" placeholder="Last name" value={this.state.lastName} />
                <div className='alert'>{this.state.lastNameError}</div>
            </div>
            <div className="form-group">
                <input onChange={this.handleChange} className="form-control form-control-lg" type="password" id="password-1" name="password" placeholder="Password" value={this.state.password} />
                <div className='alert'>{this.state.passwordError}</div>
            </div>
            <div className="form-group">
                <input onChange={this.handleChange} className="form-control form-control-lg" type="password" id="password-2" name="password2" placeholder="Confirm your password" value={this.state.password2} />
                <div className='alert'>{this.state.password2Error}</div>
            </div>
            <button className="btn btn-info" type="submit">Sign up</button>
        </form>
        <p onClick={ this.handleOneClick } className="delete-button" type="text"><span role="img" aria-label="delete">&#10060;</span></p>
      </div>
    );
  }
}

export default withRouter(Signup);
