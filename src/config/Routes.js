import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import Post from '../components/Post/Post';
import Profile from '../components/Profile/Profile';

export default ({ currentUser, userSlug, category, username, setCurrentUser  }) => {

    return <Switch>
                <Route exact path='/'
                    render={() => <Home 
                                    currentUser={ currentUser } 
                                    userSlug={ userSlug }
                                    channel="5fadad8b99d1600017502810" 
                                    // Change channel Id when u create general topic
                                    // channel="5ded57c5fc9751e68f2819f3"
                                    channelName="General-Article"
                                    channelPhoto="https://w.wallhaven.cc/full/5w/wallhaven-5wx3r3.png"
                                    channelDetail="You should be able to describe every aspect surrounding your topic without discrimination. A good description should be able to bring the reader of your essay to the real happening of events. The reader should not question themselves or be left in suspense in a way; you should ensure that you exhaust your descriptions. Every point has to come out clearly in your writing. To come up with a good essay, "
                                    category={ category } />} />

                {category.map(channel => {
                    return <Route path={`/${channel.name}`} key={ channel._id}
                            render={() => <Home 
                                            currentUser={ currentUser } 
                                            userSlug={ userSlug }
                                            channel={ channel._id }
                                            channelName={ channel.name }
                                            channelDetail={ channel.detail }
                                            channelPhoto={ channel.photo }
                                            category={ category } />} />
                })}

                <Route path="/login" render={()=> <Login currentUser={ currentUser } username={ username } setCurrentUser={ setCurrentUser } /> } />
                <Route path="/register" render={()=> <Register /> } />
                <Route path="/post/:id" render={(props) => <Post currentUser={ currentUser } userSlug={ userSlug } id={props.match.params.id}/> } />
                <Route path="/profile/:id" render={(props) => <Profile currentUser={ currentUser } id={ props.match.params.id } /> } />
            </Switch>
    
};