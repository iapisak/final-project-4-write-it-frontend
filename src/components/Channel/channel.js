import React from 'react';

import './channel.css'

const Channel = (props) => {
    return (
        <div className="channel-link">
            <a href={`/${props.name}`}>{props.name}</a>
        </div>
    )
}

export default Channel