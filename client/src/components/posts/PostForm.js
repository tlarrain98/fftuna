import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import '../../css/PostForm.css'

const PostForm = (props) => {
    
    const handleText = () => {
        props.handleSubmit(document.getElementById('title').value, 
            document.getElementById('body').value); 
    }

    return(
        <div className="formWrapper">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control className="titleForm" type="text" id="title" placeholder="Enter post title" />
                <Form.Label>Body</Form.Label>
                <Form.Control className="bodyForm" as="textarea" id="body" rows={10} />
                <Button className="submitButton" onClick={() => handleText()}>
                    Submit
                </Button>
                <Button className="cancelButton" variant="secondary" onClick={() => props.handleCancel()}>
                    Cancel
                </Button>
            </Form.Group>
        </div>
    )
}

export default PostForm;