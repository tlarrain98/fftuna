import React from 'react';
import Button from 'react-bootstrap/Button';
import '../../css/Landing.css';
// import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = (props) => {
    // const { loginWithRedirect } = useAuth0();

    return(
        <div>
            <Button className="loginButton"
                size="lg"
                onClick={() => props.setState('login')}>
                Log In
            </Button>
        </div>
    )
}

export default LoginButton;