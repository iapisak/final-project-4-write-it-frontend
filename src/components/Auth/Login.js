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
                    <div className="container p-0 pt-3">
                        <div className="d-flex justify-content-center align-items-center flex-wrap">
                            <div className="col-md-6 p-md-0 pr-md-4 mb-4 mb-md-0">
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
                                <form onSubmit={ this.handleOnSubmit } className="card border-0 rounded-0">
                                    <h1 className="font-weight-bold">Welcome!</h1>
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
                                    <div className="w-100 d-none d-md-block">
                                        <img className="img-fluid" style={{ opacity: "0.9" }}
                                            src="https://images.unsplash.com/photo-1478728073286-db190d3d8ce6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1868&q=80" alt=""/>
                                    </div>
                                </form> 
                            </div>
                        </div>
                    </div>
                </div>
    }
}

export default withRouter(Login)


        

