import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import PostForm from './PostForm'
import '../../css/CharlieFormula.css'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import {UserContext} from '../../UserContext'

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
            title: document.getElementById('title').value,
            body: document.getElementById('body').value,
            uid: userProfile.uid,
            username: userProfile.username,
            page: props.page
        }

        if(!isError(data)) {
            setShow(false)
            axios.post('/api/post/posttodb', data)
                .then(response => {
                    document.getElementById('title').value = ''
                    document.getElementById('body').value = ''
                    setSuccess(true);
                    setCreate(false);
                })
                .catch((err) => {
                    console.log("error: " + err)
                    setWarning("Server error, could not post.")
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
                <PostForm handleCancel={handleCancel} handleSubmit={handleSubmit}/>
            )
        }
        else {
            return <Button onClick={() => setCreate(true)}>Create Post</Button>
        }
    }

    return (
        <div className="createPostWrapper">
            <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
            Error: {warning}
            </Alert>
            <Alert variant="success" show={success} onClose={() => setSuccess(false)} dismissible>
            Post submitted!
            </Alert>
            {chooseDisplay()}
        </div>
    )
}

export default CreatePost