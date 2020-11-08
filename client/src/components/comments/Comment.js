import React from 'react'
import '../../css/Comment.css'

const Comment = (props) => {
    return(
        <div className="commentWrapper">
            <div className="commentAuthor">{props.data.author}</div>
            <div className="commentText">{props.data.comment}</div>
        </div>
    )
}

export default Comment