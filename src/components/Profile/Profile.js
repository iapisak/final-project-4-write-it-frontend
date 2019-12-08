import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
    state = {
        name: '',
        lastName: '',
        email: '',
        slug: '',
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
            !this.state.editing ? 
            <>
                <div><h1>Profile : {this.state.slug}</h1></div>
                <div>Name : {this.state.name}-{this.props.user.lastName}</div>
                <div>Email : {this.state.email}</div>
                <div>Join Date : {this.props.user.signup_date}</div>

                { currentUser === this.props.user_Id 
                ?
                    <button
                        className={`btn btn-primary`}
                        onClick={ this.handdleOnEdit }
                        >Edit Profile</button>
                :
                null
                }
            </>
            :
            <>
                <form>
                    <h1>Edit Your Profile</h1>
                    <div className="form-group">
                        <label htmlFor="slug">Profile Name</label>
                        <input onChange={ this.handleChange } className="form-control form-control-lg" type="text" id="slug" name="slug" 
                            value={ this.state.slug }/>
                        <div>{ this.state.slugError }</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input onChange={ this.handleChange } className="form-control form-control-lg" type="text" id="name" name="name" 
                            value={ this.state.name }/>
                        <div>{ this.state.nameError }</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input onChange={ this.handleChange } className="form-control form-control-lg" type="text" id="lastName" name="lastName" 
                        value={ this.state.lastName }/>
                        <div>{ this.state.lastNameError }</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input onChange={this.handleChange} className="form-control form-control-lg" type="text" id="email" name="email" 
                        value={ this.state.email }/>
                        <div>{this.state.emailError}</div>
                    </div>
                    <button
                        type="submit"
                        className={`btn btn-primary`}
                        disabled={ this.state.disabled }
                        onClick={ this.handleEditSubmit }
                        >Save</button>
                </form>
            </>
        )
    }
}

export default Profile