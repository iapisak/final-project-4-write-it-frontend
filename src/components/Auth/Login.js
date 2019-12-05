import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';

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
            axios.post(`${process.env.REACT_APP_API_URL}/login`, this.state, { withCredentials: true })
            .then((res) => {
                this.props.setCurrentUser(res.data.data.id, res.data.data.name)
                this.setState(initialState)
                this.props.loginToggle()
                this.props.history.push('/')
            })
            .catch((err) => this.setState({passwordError: `Invalid password`, emailError: ''}))
        }
    }

    render () {
        const { emailError, passwordError } = this.state

        return (
            <form id="login" style={{ display: this.props.toggle ? 'block': 'none' }} className="container" onSubmit={ this.handleOnSubmit }>
                <div className="form-label-group">
                    <label htmlFor="email">Email address</label>
                    <input onChange={ this.handleOnChange } type="text" name='email' id="email" className="form-control"  value={this.state.email} />
                    <div className='alert'>{emailError}</div>
                </div>
                <div className="form-label-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={ this.handleOnChange } type="password" name='password' id="password" className="form-control" value={ this.state.password } />
                    <div className='alert'>{passwordError}</div>
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>
        )
    }
}

export default withRouter(Login)
