import React from 'react';

const CommentDetails = (props) => {
    return (
        <>
        <div>{ props.detail.comment }</div>
        <div>{ props.detail.user }</div>
        </>
    )
}

export default CommentDetails