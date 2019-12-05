import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import PostDetailsContainer from '../components/Containers/postDetailsContainer';

export default ({ currentUser, category }) => {
    return (
        <Switch>
            <Route exact path='/' 
                render={() => <Home 
                                currentUser={ currentUser } 
                                channel="5de700e99b75e4131bac52ba" 
                                channelName="General"
                                channelDetail="Open topic"
                                category={ category } />} />

            {category.map(channel => {
                return <Route path={`/${channel.name}`}
                        render={() => <Home 
                                        currentUser={ currentUser } 
                                        channel={ channel._id }
                                        channelName={ channel.name }
                                        channelDetail={ channel.detail }
                                        channelPhoto={ channel.photo }
                                        category={ category } />} />
            })}

            <Route path="/post/:id"
                render={(props) => <PostDetailsContainer 
                                        currentUser={ currentUser } 
                                        id={props.match.params.id}/> } />
        </Switch>
    )
};