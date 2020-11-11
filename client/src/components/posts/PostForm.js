import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import '../../css/PostForm.css'
import MagicButton from '../charlieformula/MagicButton'
import CharlieFormula from '../charlieformula/CharlieFormula'

const PostForm = (props) => {

    const [count, setCount] = useState(0);
    const [magic, setMagic] = useState(); // used to store charlie formula

    let cf = new CharlieFormula();

    // once the magic state has been populated, calculate the formula
    // useEffect(() => {
    //     if(magic) {
    //         // console.log(magic);
    //         cf.cfHandler(magic);
    //     }
    // }, [magic])
    
    // trims the title and body text and submits it
    const handleText = () => {
        props.handleSubmit(document.getElementById('title').value.trim(), 
            document.getElementById('body').value.trim()); 
    }

    // counts the amount of characters in the title
    const textCounter = () => {
        setCount(document.getElementById('title').value.trim().length);
    }

    // if on the charlie formula page, show the magic button
    const showMagic = () => {
        if (props.pageName === "charlie") {
            return <MagicButton setMagic={setMagic}/>
        }
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
                <button className="cancelButton" onClick={() => props.handleCancel()}>
                    Cancel
                </button>
                {/* {showMagic()} */}
            </Form.Group>
        </div>
    )
}

export default PostForm;