import React from 'react'
import '../../css/Comment.css'

const Comment = (props) => {

    // formats date into MM/DD/YYYY
    const formatDate = (date) => {
        let year = date.substring(0, 4);
        let month = date.substring(5, 7);
        let day = date.substring(8, 10);
        let mdy = month + '/' + day + '/' + year

        return mdy
    }
    
    return(
        <div className="commentWrapper">
            <div className="commentTop">
                <div className="commentAuthor">{props.data.author}</div>
                <div className="commentDate">{formatDate(props.data.date_created)}</div>
            </div>
            <div className="commentText">{props.data.comment}</div>
        </div>
    )
}

export default Comment