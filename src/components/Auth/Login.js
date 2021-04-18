import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';

import './auth.css'

const initialState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
}

class Login extends Component {
    state = initialState

    formValidation = () => {
        const { email, password } = this.state
        let emailError = ''
        let passwordError = ''

        if (email === '') {
            emailError = `Required`
        } else if (email !== '' && !email.includes('@')) {
            this.setState({ email: '' })
            emailError = `Email must includes '@'`
        }

        if (password === '') {
            passwordError = `Required`
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
                this.props.setCurrentUser(res.data.data.id, res.data.data.name, res.data.data.slug, res.data.data.photo)
                this.setState(initialState)
                this.props.history.push('/home')
            })
            .catch(() => this.setState({ email: '', password: '', passwordError: 'password',
                                         emailError: 'Invalid Email or Password Please try again'}))
        }
    }

    render () {
        return  <div id="login">
                    <div className="container p-0 py-3">
                        <div className="d-flex justify-content-center align-items-center flex-wrap">
                        <div className="col-md-6 p-md-0 pr-md-4 mb-4 mb-md-0">
                            <div className="my-3 p-2 p-md-3 welcome-card"> 
                                <div className="h2 font-weight-bold mb-1">Welcome to Write-it</div>
                                    <p className="pl-2 text-secondary">
                                        A simple of writing. 
                                        <br /> Here you will find news, and share your experiences.
                                        <br /><br />
                                        <span className="h5 text-dark">Try this application with :</span>
                                        <br /> User : test@gmail.com 
                                        <br /> Password: test
                                    </p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <a className="btn btn-success me-4" href="https://github.com/iapisak/final-project-4-write-it-frontend" rel="noopener noreferrer" target="_blank">See my Github</a>
                                </div>
                            </div>
                            <div className="col-md-6 p-0">
                                <form onSubmit={ this.handleOnSubmit } className="card border-0 rounded-0">
                                    <h1 className="font-weight-bold">Sign in</h1>
                                    <small className="m-0 mb-4 pb-1 text-muted border-bottom border-secondary">Please login with your account</small>
                                    <small className="mb-0">Email</small> 
                                    <input onChange={ this.handleOnChange } type="text" name="email" value={this.state.email}
                                        className={ this.state.emailError ? "control mb-3" : "mb-3"}
                                        placeholder={ this.state.emailError ? this.state.emailError : "john@gmail.com" } /> 
                                    <small className="mb-0">Password</small> 
                                    <input onChange={ this.handleOnChange } type="password" name="password" value={ this.state.password }
                                        className={ this.state.passwordError ? "control mb-4" : "mb-4"}
                                        placeholder={ this.state.passwordError ? this.state.passwordError : 'password' } />
                                    <div className="row justify-content-center mb-2"> 
                                        <button type="submit" className="btn btn-primary px-5">Login</button> 
                                    </div>
                                    <div className="row justify-content-center mb-4">
                                        <small>or <a href="/register" className="text-secondary">Register</a></small>
                                    </div>
                                    <img style={{ backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}
                                        src="https://images.unsplash.com/photo-1508776781619-132e6a483b60?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80" alt=""/>
                                </form> 
                            </div>
                        </div>
                    </div>
                </div>
    }
}

export default withRouter(Login)


        

