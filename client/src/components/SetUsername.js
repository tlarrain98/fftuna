import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import '../css/Landing.css'

// prompt that shows when user has not set username
const SetUsername = (props) => {

    const {userProfile} = useContext(UserContext); // used to retrieve user profile
    const [warning, setWarning] = useState(null);  // warning text for setting username
    const [count, setCount] = useState(0);         // counts username length

    // checks if username is valid or if error occurred
    const check = () => {
        setWarning(null);
        var data = {
            uid: userProfile.uid,
            username: document.getElementById("username").value.trim()
        }
        // if username isn't too short or too long
        if(data.username && data.username.length <= 25) {
            axios.put('/api/put/username', data)
                .then(() => {
                    window.location.reload(); // make sure that user profile is set in state
                })
                .catch((err) => {
                    if (err.response.status === 500) {
                        setWarning("This username has been taken.");
                    }
                })
        }
        else {
            setWarning("Invalid username.");
        }  
    }

    // counts the length of the username
    const textCounter = () => {
        setCount(document.getElementById('username').value.trim().length)
    }

    return (
        <Modal show className="modal">
            <Modal.Header>
                <Modal.Title>Set your username:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control className="userForm" type="text" 
                    id="username" onChange={() => textCounter()}/>
                <div className="userCharCounter">{count}/25</div>
                <div className="warning">{warning}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => check()}>Set username</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SetUsername;