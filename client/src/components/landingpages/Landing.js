import React, { useState } from 'react';
import LoginButton from './LoginButton.js';
import '../../css/Landing.css';
// import { useAuth0 } from '@auth0/auth0-react';
import SignUpButton from './SignUpButton.js';
import LoginWindow from './LoginWindow.js';
import RegisterWindow from './RegisterWindow.js';

const Landing = (props) => {

    const [state, setState] = useState('landing');
    
    // const isAuthenticated = useAuth0().isAuthenticated;

    // if(isAuthenticated) {
    //     props.goHome();
    // }

    const chooseDisplay = () => {
        if(state === 'landing') {
            return(
                <div className="landingMargin">
                    <text className="title">Show Me Your Tuna</text>
                    <SignUpButton setState={setState}/>
                    <LoginButton setState={setState}/>
                </div>
            )
        }
        if(state === 'login') {
            return(
                <LoginWindow setState={setState}/>
            )
        }
        if(state === 'register') {
            return(
                <RegisterWindow setState={setState}/>
            )
        }
    }

    return(
        <div className="landing">
            {chooseDisplay()}
        </div>
    )
}

export default Landing;