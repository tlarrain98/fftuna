import React from 'react';
import LoginButton from './LoginButton.js';
import '../../css/Landing.css';
import { useAuth0 } from '@auth0/auth0-react';
import SignUpButton from './SignUpButton.js';

const Landing = (props) => {
    
    const isAuthenticated = useAuth0().isAuthenticated;

    if(isAuthenticated) {
        props.goHome();
    }

    return(
        <div className="landing">
            <SignUpButton />
            <LoginButton/>
        </div>
    )
}

export default Landing;