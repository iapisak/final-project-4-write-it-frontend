import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home/Home';

export default ({ setCurrentUser, currentUser, mainToggle, category }) => {
    return (
        <Switch>
            <Route exact path='/' render={() => <Home mainToggle={ mainToggle } category={ category } />} />
        </Switch>
    )
};