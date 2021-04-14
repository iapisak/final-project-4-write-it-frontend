import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Routes from './config/Routes';
import Navbar from './components/Navbar/Navbar';

import './App.css'

const initialChannel = {
  '_id': "5fadad8b99d1600017502810",
  name: "General-Article",
  photo: "https://w.wallhaven.cc/full/5w/wallhaven-5wx3r3.png", 
  detail: "You should be able to describe every aspect surrounding your topic without discrimination. A good description should be able to bring the reader of your essay to the real happening of events. The reader should not question themselves or be left in suspense in a way; you should ensure that you exhaust your descriptions. Every point has to come out clearly in your writing. To come up with a good essay."
}

function App () {
  const [ channels, setChannels ] = useState()
  const [ selectChannel, setSelectChannel ] = useState()
  
  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_API_URL}/channel`)
    .then(res => setChannels(res.data.data))
    .catch(err => console.log(err))
    setSelectChannel(initialChannel)
  }, [])

  useEffect(() => {
    if (!selectChannel) return
    setSelectChannel(selectChannel)
  }, [selectChannel])

  return  <div>
              <Navbar channels={ channels } setSelectChannel={ setSelectChannel } />
              <main>
                <Routes selectChannel={ selectChannel } />
              </main>
          </div>
}


// class App extends Component {
//   state = {
//     currentUser: localStorage.getItem('uid'),
//     username: localStorage.getItem('username'),
//     userSlug: localStorage.getItem('slug'),
//     userPhoto: localStorage.getItem('photo'),
//     loginToggle: false,
//     signupToggle: false,
//     mainToggle: true,
//     channel: [],
//   }

//   setCurrentUser = (userId, username, userSlug, userPhoto) => {
//     this.setState({ currentUser: userId, username, userSlug, userPhoto });
//     localStorage.setItem('uid', userId);
//     localStorage.setItem('username', username);
//     localStorage.setItem('slug', userSlug);
//     localStorage.setItem('photo', userPhoto);
//   };

//   logout = () => {
//     localStorage.removeItem('uid');
//     localStorage.removeItem('username');
//     localStorage.removeItem('slug')
//     localStorage.removeItem('photo')
//     axios.delete(`${process.env.REACT_APP_API_URL}/logout`)
//     .then(res => {
//       this.setState({ currentUser: null, username: '' });
//       this.props.history.push('/');
//       })
//       .catch(err => console.log(err));
//   };

//   loginToggle = (e) => {
//     this.setState({ 
//         loginToggle: !this.state.loginToggle, 
//         signupToggle: false, 
//         mainToggle: this.state.loginToggle === true ? true: false, });
//   }

//   signupToggle = (e) => {
//     this.setState({ 
//         signupToggle: !this.state.signupToggle, 
//         loginToggle: false, 
//         mainToggle: this.state.signupToggle === true ? true: false, });
//   }

//   componentDidMount () {
//     axios.get(`${process.env.REACT_APP_API_URL}/channel`)
//     .then(res => {
//         this.setState({ channel: res.data.data });
//         })
//     .catch(err => console.log(err));
//   }

//   render() {
    
//     return (
//       <>
//       <Navbar 
//         currentUser={ this.state.currentUser }
//         username={ this.state.username }
//         userPhoto={ this.state.userPhoto }
//         slug={ this.state.userSlug }
//         setCurrentUser={ this.setCurrentUser }
//         logout={ this.logout }
//         login={ this.state.loginToggle }
//         signup={ this.state.signupToggle }
//         loginToggle={ this.loginToggle }
//         signupToggle={ this.signupToggle } 
//         category={ this.state.channel } />

//         <main style={{ display: this.state.mainToggle ? 'block': 'none' }}>
//           <Routes 
//             currentUser={ this.state.currentUser } 
//             username={ this.state.username }
//             userSlug={ this.state.userSlug}
//             category={ this.state.channel } />
//         </main>
//       </>
//     );
//   }
// }

export default withRouter(App);
