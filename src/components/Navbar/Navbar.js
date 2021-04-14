import React from 'react';

export default function Navbar ({ channels, setSelectChannel }) {
    return  <header className="container">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4 pt-1">
                        <a className="text-muted" href="/">Subscribe</a>
                    </div>
                    <div className="col-4 text-center">
                        <a className="blog-header-logo text-dark" href="/">Write-It</a>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        {/* { this.authenticated(this.props.currentUser) } */}
                    </div>
                </div>
                <div className="nav-scroller py-1 mb-2">
                    <nav className="nav d-flex justify-content-center">
                        { channels ? channels.map(channel=>{
                            return <div className="p-2 text-muted" key={ channel.name } 
                                        onClick={()=> setSelectChannel(channel)}>{ channel.name }</div> }) 
                        : null }
                    </nav>
                </div>
            </header>
}

// class Navbar extends Component {
//     state = {
//         dropdown: '',
//         change: false,
//     }

//     authenticated = (currentUser) => {
//         const isUser = (
//             <>
//                 <div className="nav-item">Welcome <img src={ this.props.userPhoto } alt="" width="25" height="25"/> { this.props.slug }</div>
//                 <li className="nav-item">
//                     <a className="nav-link" href={`/profile/${this.props.currentUser}`}>Profile</a>
//                 </li>
//                 <div className="btn btn-sm btn-outline-secondary" onClick={ this.props.logout }>Sign out</div>
//             </>
//         )

//         const isGuest = (
//             <>
//                 {/* <div className="">Welcome you are guess!</div> */}
//                 <div className="btn btn-sm btn-outline-secondary" onClick={ this.props.loginToggle } >Sign in</div>
//                 <div className="btn btn-sm btn-outline-secondary" onClick={ this.props.signupToggle } >Sign up</div>
//             </>
//         );
    
//         if (currentUser !== null) {
//           return isUser
//         } else {
//           return isGuest
//         }
//     }

//     handleDropdown = (e) =>{
//         this.setState({
//           dropdown: e.target.value,
//           changed: true
//         })
//     }

//     render() {
//         return (
//             <>
//             <header className="container blog-header py-3">
//                 <div className="row flex-nowrap justify-content-between align-items-center">
//                     <div className="col-4 pt-1">
//                         <a className="text-muted" href="/">Subscribe</a>
//                     </div>
//                     <div className="col-4 text-center">
//                         <a className="blog-header-logo text-dark" href="/">Write-It</a>
//                     </div>
//                     <div className="col-4 d-flex justify-content-end align-items-center">
//                         { this.authenticated(this.props.currentUser) }
//                     </div>
//                 </div>
//             </header>
//             <div className="nav-scroller py-1 mb-2">
//                 <nav className="nav d-flex justify-content-center">
//                     {this.props.category.map(channel=>{
//                         return <a className="p-2 text-muted" href={ `/${channel.name}` } key={ channel.name}>{ channel.name }</a>
//                     })}
//                 </nav>
//             </div>
            
//             <Login 
//                 currentUser={ this.props.currentUser }
//                 username={ this.props.username }
//                 setCurrentUser={ this.props.setCurrentUser }
//                 toggle={ this.props.login }
//                 loginToggle={ this.props.loginToggle } />
//             <Signup 
//                 toggle={ this.props.signup }
//                 signupToggle={ this.props.signupToggle } />
//             </>
//         )
//     }
// }

// export default Navbar