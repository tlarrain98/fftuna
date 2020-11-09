import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import '../../css/PostForm.css'

const PostForm = (props) => {

    const [count, setCount] = useState(0);
    
    // trims the title and body text and submits it
    const handleText = () => {
        props.handleSubmit(document.getElementById('title').value.trim(), 
            document.getElementById('body').value.trim()); 
    }

    // counts the amount of characters in the title
    const textCounter = () => {
        setCount(document.getElementById('title').value.trim().length);
    }

    return(
        <div className="formWrapper">
            <Form.Group>
                <Form.Label>
                    Title <div className="charCounter">{count}/256</div>
                </Form.Label>
                <Form.Control className="titleForm" type="text" id="title" 
                    placeholder="Enter post title" onChange={() => textCounter()}/>
                <Form.Label>Body</Form.Label>
                <Form.Control className="bodyForm" 
                    as="textarea" id="body" rows={10}/>
                <button className="submitButton" onClick={() => handleText()}>
                    Submit
                </button>
                <button className="cancelButton" variant="secondary" onClick={() => props.handleCancel()}>
                    Cancel
                </button>
            </Form.Group>
        </div>
    )
}

export default PostForm;