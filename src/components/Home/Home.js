import React, { Component } from 'react';

import Channel from '../Channel/channel';
import PostContainer from '../Containers/postContainer';

import './Home.css'

class Home extends Component {

    render() {
        return (
            <div className="container">
                <section className="d-flex">
                    <PostContainer 
                        currentUser={ this.props.currentUser } 
                        userSlug={ this.props.userSlug }
                        channel={ this.props.channel } 
                        channelName={ this.props.channelName } 
                        channelDetail={ this.props.channelDetail } 
                        channelPhoto={ this.props.channelPhoto } />

                    <div className="channel-container col-2">
                        <h4>Channel</h4>
                        {this.props.category.map((channel) => (
                        <Channel name={ channel.name } key={ channel._id } />
                    ))}
                    </div>
                </section>
            </div>
        )
    }
}

export default Home