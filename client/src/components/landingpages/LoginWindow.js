import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import '../../css/Landing.css';

const LoginWindow = (props) => {

    const handleSubmit = () => {
        console.log("submit");
    }

    return(
        <div className="cardWrapper">
            <Card>
                <Card.Header className="headers">Log in</Card.Header>
                <Card.Body>
                    <Form.Group>
                        <Form.Label className="headers">Username</Form.Label>
                        <Form.Control className="userForm" type="text" id="title"/>
                        <Form.Label className="headers">Password</Form.Label>
                        <Form.Control className="passForm" type="password" id="password"/>
                    </Form.Group>
                </Card.Body>
                <Card.Footer>
                    <Button className="submitButton" onClick={() => handleSubmit()}>
                        Submit
                    </Button>
                    <Button className="cancelButton" variant="secondary" 
                        onClick={() => props.setState('landing')}>
                        Cancel
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default LoginWindow;