import React, { useContext, useState } from 'react'
import '../../css/Comment.css'
import { UserContext } from '../../UserContext'
import DeleteComment from './DeleteComment'

const Comment = (props) => {

    const { userProfile } = useContext(UserContext);
    const [show, setShow] = useState(false);

    const showDelete = () => {
        if (userProfile.uid == props.data.user_id) {
            return <div className="commentDelete"
                onClick={() => handleShow()}>delete</div>
        } 
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

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
            {showDelete()}
            <DeleteComment show={show}
                handleRefresh={props.handleRefresh}
                handleClose={handleClose}
                handleShow={handleShow}
                cid={props.data.cid}/>
        </div>
    )
}

export default Comment