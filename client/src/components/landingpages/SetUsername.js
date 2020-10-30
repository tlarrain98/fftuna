import React from 'react';
import Modal from 'react-bootstrap/Modal';

const SetUsername = () => {

    const [show, setShow] = setState(false);

    return(
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Please set your username.</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
        </Modal>
    )
}

export default SetUsername;