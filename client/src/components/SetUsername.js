import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { useAuth0 } from '@auth0/auth0-react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import '../css/SetUsername.css'

// prompt that shows when user has not set username
const SetUsername = (props) => {

    const { user } = useAuth0();
    const { userProfile, setUserProfile } = useContext(UserContext); // used to retrieve user profile
    const [warning, setWarning] = useState(null);  // warning text for setting username
    const [count, setCount] = useState(0);         // counts username length

    // checks if username is valid or if error occurred
    const check = () => {
        setWarning(null);
        var data = {
            uid: userProfile.uid,
            username: document.getElementById("username").value.trim(),
            bio: ''
        }
        // if username isn't too short or too long
        if (data.username && data.username.length <= 25) {
            axios.put('/api/put/username', data)
                .then(() => {
                    axios.get('/api/get/userfromdb', {
                        params: { email: user.email }
                    })
                        .then(res => {
                            setUserProfile(res.data[0]);
                            props.goHome();
                        })
                        .catch(err => {
                            console.log(err);
                            setWarning("Server error, please refresh.");
                        })
                })
                .catch((err) => {
                    if (err.response.status === 500) {
                        setWarning("This username has been taken.");
                    }
                    else {
                        setWarning("Server error: please refresh.");
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
                    id="username" onChange={() => textCounter()} />
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