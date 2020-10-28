import React from 'react';
import Button from 'react-bootstrap/Button';
import '../../css/Landing.css';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div>
            <Button className="signupButton"
                variant="secondary"
                size="lg"
                onClick={() => loginWithRedirect({
                    screen_hint: "signup"
                })}>
                Sign Up
            </Button>
        </div>
    )
}

export default SignUpButton;