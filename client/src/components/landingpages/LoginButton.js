import React from 'react';
import Button from 'react-bootstrap/Button';
import '../../css/Landing.css';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return(
        <div>
            <button className="loginButton"
                size="lg"
                onClick={() => loginWithRedirect()}>
                Log In
            </button>
        </div>
    )
}

export default LoginButton;