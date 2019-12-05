import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';

export default ({ currentUser, username, category }) => {
    return (
        <Switch>
            <Route exact path='/' 
                render={() => <Home currentUser={ currentUser } channel="5de700e99b75e4131bac48bb" category={ category } />} />

            {category.map(channel => {
                return <Route path='/' 
                        render={() => <Home currentUser={ currentUser } channel={ channel._id } category={ category } />} />
            })}
            
        </Switch>
    )
};