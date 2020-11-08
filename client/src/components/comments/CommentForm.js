import React, { useContext, useState } from 'react'
import '../../css/Comment.css'
import axios from 'axios'
import { UserContext } from '../../UserContext'
import Alert from 'react-bootstrap/Alert'

const CommentForm = (props) => {

    const { userProfile } = useContext(UserContext);
    const [alertText, setAlertText] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [count, setCount] = useState(0);

    const postComment = () => {
        console.log(userProfile)
        let commentText = document.getElementById("comment").value.trim();
        let data = {
            comment: commentText,
            author: userProfile.username,
            uid: userProfile.uid,
            pid: props.pid
        }
        // check if there is anything in the text area
        if (commentText) {
            axios.post('/api/post/comment', data)
                .then((response) => {
                    document.getElementById("comment").value = '';
                    setAlertText("Comment submitted!");
                    setShowSuccess(true);
                })
                .catch((error) => {
                    setAlertText("Could not submit comment.");
                    setShowWarning(true);
                })
        }
        else {
            setAlertText("Comment is empty.");
            setShowWarning(true);
        }
    }

    const textCounter = () => {
        setCount(document.getElementById('comment').value.trim().length);
    }

    return (
        <>  
            <Alert className="commentAlert" variant="danger"
                show={showWarning} onClose={() => setShowWarning(false)} dismissible>
                {alertText}
            </Alert>
            <Alert className="commentAlert" variant="success"
                show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
                {alertText}
            </Alert>
            <div className="commentFormWrapper">
                <textarea className="commentForm" id="comment" 
                rows="4" onChange={() => textCounter()}/>
            </div>
            <div class="charCount">{count}/512</div>
            <button className="commentButton" onClick={() => postComment()}>submit</button>
        </>
    )
}

export default CommentForm