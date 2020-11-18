import React, { useState } from 'react'
import '../../css/DeleteModal.css'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'

const DeleteComment = (props) => {

    const [message, setMessage] = useState("Deleting comment...");
    const [show, setShow] = useState(false); // dictates whether message is shown or not

    const handleDelete = () => {
        setShow(true);
        let data = {
            cid: props.cid
        }
        axios.delete('/api/delete/comment', { data })
            .then(() => {
                setMessage("Comment deleted.");
                props.handleRefresh();
                props.handleClose();
                window.scrollTo(0, 0);
            })
    }

    const showDeleting = () => {
        if (show) {
            return <div className="deleteMessage">{message}</div>
        }
    }

    return(
        <Modal show={props.show}
            onHide={() => props.handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete this comment?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <button className="deleteButton" onClick={() => handleDelete()}>
                    Delete
                </button>
                <button className="cancelDeleteButton" onClick={() => props.handleClose()}>
                    Cancel
                </button>
                {showDeleting()}
            </Modal.Body>
        </Modal>
    )
}

export default DeleteComment