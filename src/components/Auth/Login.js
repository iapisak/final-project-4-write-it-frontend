import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';

import './Auth.css'

const initialState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    messageError: '',
}

class Login extends Component {
    state = initialState

    formValidation = () => {
        const { email, password } = this.state
        let emailError = ''
        let passwordError = ''

        if (email === '') {
            emailError = `Please input your Email`
        } else if (email !== '' && !email.includes('@')) {
            emailError = `Email must includes '@'`
        }

        if (password === '') {
            passwordError = `Please input your Password`
        }

        if (emailError || passwordError) {
          this.setState({ emailError, passwordError })
          return false
        }
        return true
    }

    handleOnChange = e => {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleOnSubmit = e => {
        e.preventDefault()
        const formValidation = this.formValidation()
        if (formValidation) {
            axios.post(`${process.env.REACT_APP_API_URL}/login`, this.state)
            .then((res) => {
                console.log(res.data.data)
                this.props.setCurrentUser(res.data.data.id, res.data.data.name, res.data.data.slug, res.data.data.photo)
                this.setState(initialState)
                this.props.loginToggle()
                this.props.history.push('/')
            })
            .catch((err) => this.setState({passwordError: `Invalid password`, emailError: ''}))
        }
    }

    handleOneClick = () => {
        this.setState(initialState)
        this.props.loginToggle()
    }

    render () {
        const { emailError, passwordError } = this.state

        return (
            <div className="login-box" style={{ display: this.props.toggle ? 'block': 'none' }}>
                <form id="login" className="container" onSubmit={ this.handleOnSubmit }>
                    <h1>Sign in</h1>
                    <div className="form-label-group">
                        <label htmlFor="email-address">Email address</label>
                        <input onChange={ this.handleOnChange } type="text" name='email' id="email-address" className="form-control"  value={this.state.email} />
                        <div className='alert'>{emailError}</div>
                    </div>
                    <div className="form-label-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={ this.handleOnChange } type="password" name='password' id="password" className="form-control" value={ this.state.password } />
                        <div className='alert'>{passwordError}</div>
                    </div>
                    <button type="submit" className="btn btn-info">Submit</button>
                </form>
                <p onClick={ this.handleOneClick } className="delete-button" type="text"><span role="img" aria-label="delete">&#10060;</span></p>
            </div>
        )
    }
}

export default withRouter(Login)
