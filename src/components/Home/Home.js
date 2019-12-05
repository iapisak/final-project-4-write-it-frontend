import React, { Component } from 'react';

import Channel from './Channel/channel';
import PostContainer from './Post/postContainer';

class Home extends Component {

    render() {
        return (
            <div style={{ display: this.props.mainToggle ? 'block': 'none' }} className="main">
                <PostContainer />
                <div>
                    <h3>Channel</h3>
                    {this.props.category.map((channel) => (
                    <Channel name={ channel.name } key={ channel._id } />
                ))}
                </div>
            </div>
        )
    }
}

export default Home