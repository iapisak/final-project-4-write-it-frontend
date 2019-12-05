import React, { Component } from 'react';

import Channel from '../Channel/channel';
import PostContainer from '../Containers/postContainer';

class Home extends Component {

    render() {
        return (
            <section className="d-flex">
                <PostContainer 
                    currentUser={ this.props.currentUser } 
                    channel={ this.props.channel } />

                <div className="col-3">
                    <h4>Channel</h4>
                    {this.props.category.map((channel) => (
                    <Channel name={ channel.name } key={ channel._id } />
                ))}
                </div>
            </section>
        )
    }
}

export default Home