import React, { useState } from 'react'
import '../../css/Post.css'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'

const DeletePost = (props) => {

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("Deleting comments.");

    const handleDelete = () => {
        setShow(true);
        let data = {
            pid: props.pid
        }
        axios.delete('/api/delete/allcomments', { data })
            .then(() => {
                setMessage("Deleting post.");
                axios.delete('/api/delete/post', { data })
                    .then(() => {
                        setMessage("Post deleted.");
                        props.goHome();
                    })
                    .catch((error) => {
                        setMessage("Error: could not delete post.");
                        console.log(error)
                    })
            })
            .catch((error) => {
                setMessage("Error: could not delete post.");
                console.log(error)
            })
    }

    const showDeleting = () => {
        if (show) {
            return <div className="deleteMessage">{message}</div>
        }
    }

    return (
        <Modal show={props.show} 
            onHide={() => props.handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete this post?</Modal.Title>
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

export default DeletePost