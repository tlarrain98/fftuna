import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PostForm from './PostForm.js';
import '../../css/CharlieFormula.css';
import axios from 'axios';

const CreatePost = (props) => {

    const [create, setCreate] = useState(false);

    const handleCancel = () => {
        setCreate(false);
    }

    const handleSubmit = (titleText, bodyText) => {
        const data = {
            title: document.getElementById('title').value,
            body: document.getElementById('body').value,
            uid: 10,
            username: 'exampleusername',
            page: 'charlie'
        }

        console.log(data);

        axios.post('/api/post/posttodb', data)
            .then(response => console.log(response))
            .catch((err) => console.log(err))
            .then(setTimeout(() => console.log("timeout"), 700))
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
            {chooseDisplay()}
        </div>
    )
}

export default CreatePost;