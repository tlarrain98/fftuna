import React, { useState, useContext } from 'react'
import PostForm from './PostForm'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import {UserContext} from '../../UserContext'
import '../../css/Post.css'

const CreatePost = (props) => {

    const [create, setCreate] = useState(false);
    const [show, setShow] = useState(false);
    const [warning, setWarning] = useState(false);
    const [success, setSuccess] = useState(false);
    const {userProfile} = useContext(UserContext);

    const handleCancel = () => {
        setCreate(false);
    }

    const handleSubmit = () => {
        const data = {
            title: document.getElementById('title').value.trim(),
            body: document.getElementById('body').value.trim(),
            uid: userProfile.uid,
            username: userProfile.username,
            page: props.pageName
        }

        if(!isError(data)) {
            setShow(false);
            axios.post('/api/post/posttodb', data)
                .then(() => {
                    document.getElementById('title').value = '';
                    document.getElementById('body').value = '';
                    setSuccess(true);
                    setCreate(false);
                    props.handleRefresh();
                })
                .catch((err) => {
                    console.log(err);
                    setWarning("Server error, could not post.");
                    setShow(true);
                })
        }
        else {
            setShow(true);
        }
    }

    const isError = (data) => {
        if(data.title === '') {
            setWarning("Please set your post's title.");
            return true
        }
        if(data.username === null)  {
            setWarning("Username error, please refresh the page.");
            return true
        }
    }

    const chooseDisplay = () => {
        if(create) {
            return(
                <PostForm handleCancel={handleCancel} 
                    handleSubmit={handleSubmit}
                    pageName={props.pageName}/>
            )
        }
        else {
            return <button className="postButton" onClick={() => setCreate(true)}>Create Post</button>
        }
    }

    return (
        <div className="createPostWrapper">
            <Alert className="alertWarning" variant="danger" 
                show={show} onClose={() => setShow(false)} dismissible>
            Error: {warning}
            </Alert>
            <Alert className="alertSuccess" variant="success" 
                show={success} onClose={() => setSuccess(false)} dismissible>
            Post submitted!
            </Alert>
            {chooseDisplay()}
        </div>
    )
}

export default CreatePost