import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import '../css/Landing.css'

const SetUsername = (props) => {

    const { userProfile, setUserProfile } = useContext(UserContext);
    const [warning, setWarning] = useState(null)

    const check = () => {
        setWarning(null);
        var data = {
            uid: userProfile.uid,
            username: document.getElementById("username").value
        }
        axios.put('/api/put/username', data)
            .then(() => {
                getUpdate();
                props.goHome();
            })
            .catch((err) => {
                if(err.response.status === 500) {
                    setWarning("This username has been taken.")
                }
            })
            
    }

    // needs more testing
    const getUpdate = () => {
        axios.get('/api/get/userfromdb', {
            params: { email: userProfile.email }
        })
        .then(res => {
            setUserProfile(res.data[0])
        })
    }

    return (
        <Modal show className="modal">
            <Modal.Header>
                <Modal.Title>Set your username:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control className="userForm" type="text" id="username"/>
                <div className="warning">
                    {warning}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => check()}>Set username</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SetUsername;