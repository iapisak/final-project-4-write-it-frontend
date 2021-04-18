import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import Home from '../components/Home/Home';
import Post from '../components/Post/Post';
import Profile from '../components/Profile/Profile';

export default ({ currentUser, userSlug, category, username, setCurrentUser  }) => {

    return <Switch>
                <Route exact path="/" render={()=> { 
                        if (currentUser) window.location.href = "/home"
                        else return <Login currentUser={ currentUser } username={ username } setCurrentUser={ setCurrentUser } /> } } />
                <Route path="/register" render={()=> { 
                        if (currentUser) window.location.href = "/home"
                        else return <Register /> } } />
                <Route path='/home'
                    render={() => { 
                        if (!currentUser) window.location.href = "/"
                        else return <Home 
                                        currentUser={ currentUser } 
                                        userSlug={ userSlug }
                                        channel="5fadad8b99d1600017502810" 
                                        // Change channel Id when u create general topic
                                        // channel="5ded57c5fc9751e68f2819f3"
                                        channelName="General-Article"
                                        channelDetail="You should be able to describe every aspect surrounding your topic without discrimination. A good description should be able to bring the reader of your essay to the real happening of events. The reader should not question themselves or be left in suspense in a way; you should ensure that you exhaust your descriptions. Every point has to come out clearly in your writing. To come up with a good essay, "
                                        channelPhoto="https://images.unsplash.com/photo-1508776781619-132e6a483b60?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80" /> }} />

                { category.map(channel => {
                    return <Route path={`/${channel.name}`} key={ channel._id}
                            render={() => {
                                if (!currentUser) window.location.href = "/"
                                else return <Home 
                                            currentUser={ currentUser } 
                                            userSlug={ userSlug }
                                            channel={ channel._id }
                                            channelName={ channel.name }
                                            channelDetail={ channel.detail }
                                            channelPhoto={ channel.photo } />} }/>
                })}


                <Route path="/post/:id" render={(props) => {
                        if (!currentUser) window.location.href = "/"
                        else return <Post currentUser={ currentUser } 
                                          userSlug={ userSlug }
                                          id={props.match.params.id}/> } } />

                <Route path="/profile/:id" render={(props) => {
                        if (!currentUser) window.location.href = "/"
                        else return <Profile currentUser={ currentUser } id={ props.match.params.id } /> }} />
            </Switch>
    
};