import React from 'react';

const Channel = (props) => {
    return (
        <div>
            <a href={`/${props.name}`}>{props.name}</a>
        </div>
    )
}

export default Channel