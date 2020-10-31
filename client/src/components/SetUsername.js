import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export const SetUsername = () => {

    const {userProfile, setUserProfile} = useContext(UserContext);

    return (
        <Modal>
            <Modal.Header>
                <Modal.Title>Set your username:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                this is the username section
                </Modal.Body>
            <Modal.Footer>
                <Button onClick={console.log("submit")}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}