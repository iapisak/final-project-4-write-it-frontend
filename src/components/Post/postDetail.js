import React from 'react';

const postDetail = (props) => {
    // console.log(props)
    return (
        <div>
            <h3>{props.detail.title}</h3>
            <p>{props.detail.content}</p>
            <p>User id : {props.detail.user}</p>
        </div>
    )
}

export default postDetail