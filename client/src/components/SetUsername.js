import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

const SetUsername = (props) => {

    const { userProfile, setUserProfile } = useContext(UserContext);
    const [warning, setWarning] = useState(null)

    const check = () => {
        var data = {
            uid: userProfile.uid,
            username: document.getElementById("username").value
        }
        axios.put('/api/put/username', data)
            .catch((error) => {
                if(error.response) {
                    console.log(error.response.data)
                }
            })
                // if(response.username === null) {
                //     setWarning("username unavailable")
                //     console.log(warning)
                // }  
            
    }

    return (
        <Modal show className="modal">
            <Modal.Header>
                <Modal.Title>Set your username:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control className="userForm" type="text" id="username"/>
                {warning}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => check()}>Set username</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SetUsername;