import React from 'react';
import Button from 'react-bootstrap/Button';
import '../../css/Landing.css';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton = (props) => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div>
            <Button className="signupButton"
                variant="secondary"
                size="lg"
                onClick={() => props.setState('register')}>
                Sign Up
            </Button>
        </div>
    )
}

export default SignUpButton;