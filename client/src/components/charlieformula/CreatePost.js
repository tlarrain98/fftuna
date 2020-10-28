import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../css/CharlieFormula.css';
import axios from 'axios';

const CreatePost = (props) => {

    const [create, setCreate] = useState(false);

    const handleSubmit = () => {
        const data = {
            title: document.getElementById('title').value,
            body: document.getElementById('body').value,
            uid: 10,
            username: 'exampleusername',
            page: 'charlie'
        }

        //console.log(data);

        axios.post('/api/post/posttodb', data)
            .then(response => console.log(response))
            .catch((err) => console.log(err))
            .then(setTimeout(() => console.log("timeout"), 700))
    }

    const chooseDisplay = () => {
        if(create) {
            return(
                <div className="formWrapper">
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control className="titleForm" type="text" id="title" placeholder="Enter post title"/>
                        <Form.Label>Body</Form.Label>
                        <Form.Control className="bodyForm" as="textarea" id="body" rows={10}/>
                        <Button className="submitButton" onClick={() => handleSubmit()}>
                            Submit
                        </Button>
                        <Button className="cancelButton" variant="secondary" onClick={() => setCreate(false)}>
                            Cancel
                        </Button>
                    </Form.Group>
                </div>
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