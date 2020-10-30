import React, { useState } from 'react';
import LoginButton from './LoginButton.js';
import '../../css/Landing.css';
import { useAuth0 } from '@auth0/auth0-react';
import SignUpButton from './SignUpButton.js';
// import LoginWindow from './LoginWindow.js';
// import RegisterWindow from './RegisterWindow.js';

const Landing = (props) => {

    const [state, setState] = useState('landing');
    
    const isAuthenticated = useAuth0().isAuthenticated;
    const { isLoading } = useAuth0();

    if(isAuthenticated) {
        props.goHome();
    }

    if(isLoading) {
        return(
            <div className="landing">
                <div className="landingMargin">
                    <text className="loading">Loading...</text>
                </div>
            </div>
        )
    }

    return (
        <div className="landing">
            <div className="landingMargin">
                <text className="title">Show Me Your Tuna</text>
                <SignUpButton />
                <LoginButton />
            </div>
        </div>
    )
}

export default Landing;