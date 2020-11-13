import React from 'react';
import Button from 'react-bootstrap/Button';
import '../../css/Landing.css';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div>
            <button className="signupButton"
                variant="secondary"
                size="lg"
                onClick={() => loginWithRedirect({
                    screen_hint: 'signup'
                })}>
                Sign Up
            </button>
        </div>
    )
}

export default SignUpButton;