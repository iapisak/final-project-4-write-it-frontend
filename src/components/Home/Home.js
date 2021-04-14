import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment'

export default function Home ({ selectChannel }) {
    const [ posts, setPost ] = useState([])

    useEffect(()=> {
        if (!selectChannel) return
        const channel = selectChannel['_id']
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${ channel }`)
            .then((res) => setPost(res.data.data))
    }, [selectChannel])

    return  <>
            { selectChannel ? 
            <div className="jumbotron p-3 p-md-5 text-white rounded" style={{ backgroundImage: `url("${ selectChannel.photo }")`}}>
                <div className="col-8 mx-auto">
                    <h1 className="display-4 font-italic">{ selectChannel.name }</h1>
                    <p className="lead my-3">{ selectChannel.detail }</p>
                </div>
            </div>
            : null }
            <div className="container p-0" >
                { posts.length ? posts.map((post) => {   
                    return <div className="d-md-flex flex-md-row mb-4" key={ post._id + 'home'}>
                                <div className="col-md-4 pt-3 px-0">
                                    <img className="img-fluid rounded" src={ post.photo }  alt={  post.photo } / >
                                </div>
                                <div className="col-md-8 py-3">
                                    <Link className="nav-link p-0 text-dark" to={`/post/${ post._id }`}><h3 className="font-weight-bold">{ post.title }</h3></Link>
                                    <p className="text-secondary">{ moment(post.date).format('MMMM D, YYYY') } by <Link to={`/profile/${post.user}`}>{ post.userSlug }</Link></p>
                                    <p>{ post.content }</p>
                                </div>
                            </div>
                }) : null }
            </div>
            </>
}

// class Home extends Component {
//     state = {
//         posts: [],
//         postLoaded: false,
//         isToggle: false,
//     }

//     isToggle = () => {
//         this.setState({ isToggle: !this.state.isToggle, postLoaded: !this.state.postLoaded });
//     }

//     componentDidMount () {
//         const channel_Id = this.props.channel
//         axios.get(`${process.env.REACT_APP_API_URL}/posts/${channel_Id}`)
//         .then((res) => {
//             this.setState({ posts: res.data.data })
//         })
//     }

//     handleSubmit = (e, newPosts) => {
//         e.preventDefault()
//         axios.post(`${process.env.REACT_APP_API_URL}/posts/create`, newPosts)
//         .then((res) => {
//             this.componentDidMount()
//         })
//         this.isToggle()
//     }

//     render() {
//         return  <>
//                 <div className="jumbotron p-3 p-md-5 text-white rounded" style={{ backgroundImage: `url("${ this.props.channelPhoto }")`}}>
//                     <div className="col-8 mx-auto">
//                         <h1 className="display-4 font-italic">{ this.props.channelName }</h1>
//                         <p className="lead my-3">{ this.props.channelDetail }</p>
//                         {this.props.currentUser ? 
//                             <button className="btn btn-lg btn-primary" onClick={ this.isToggle } > Create post </button>
//                         : null}
//                     </div>
//                 </div>
//                 <div className="container p-0" >
//                     <CreatePosts 
//                         toggle={ this.state.isToggle }
//                         currentUser={ this.props.currentUser }
//                         userSlug={ this.props.userSlug }
//                         channel={ this.props.channel }
//                         handleSubmit={ this.handleSubmit } 
//                         postLoaded={ this.state.postLoaded } />

//                     { this.state.posts.map((post) => {
//                         const template = <div className="col-md-4 pt-3 px-0">
//                                             <img className="img-fluid rounded" src={ post.photo }  alt={  post.photo } / >
//                                          </div>
                                          
//                         return <div className="d-md-flex flex-md-row mb-4" key={ post._id + this.props.channelName  }>
//                                 { post.photo ? template : null }
//                                 <div className="col-md-8 py-3">
//                                     <Link className="nav-link p-0 text-dark" to={`/post/${ post._id }`}><h3 className="font-weight-bold">{ post.title }</h3></Link>
//                                     <p className="text-secondary">{ moment(post.date).format('MMMM D, YYYY') } by <Link to={`/profile/${post.user}`}>{ post.userSlug }</Link></p>
//                                     {/* <span style={{ fontSize: "12px"}} role="img" aria-label="comment">&#128172; { this.state.comment.length } 
//                                         { this.state.comment.length <= 1 ? " comment" : " comments" }
//                                     </span> */}
//                                     <p>{ post.content }</p>
//                                 </div>
//                             </div>
//                     })}
//                 </div>
//                 </>
//             }
// }
            
// export default Home