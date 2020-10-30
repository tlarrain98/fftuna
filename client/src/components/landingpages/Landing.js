import React, { useState } from 'react';
import LoginButton from './LoginButton.js';
import '../../css/Landing.css';
import { useAuth0 } from '@auth0/auth0-react';
import SignUpButton from './SignUpButton.js';
import axios from 'axios';

const Landing = (props) => {
    
    const isAuthenticated = useAuth0().isAuthenticated;
    const { isLoading } = useAuth0();
    const { user } = useAuth0();

    if (isLoading) {
        return (
            <div className="landing">
                <div className="landingMargin">
                    <text className="loading">Loading...</text>
                </div>
            </div>
        )
    }

    if(isAuthenticated) {
        const data = {
            email: user.email
        }
        axios.post('/api/post/usertodb', data)
            .then(axios.get('/api/get/userfromdb', {
                params: { email: user.email }})
                .then(res => {
                    console.log(res.data[0].uid)
                    props.setUser({
                        uid: res.data[0].uid, // <------------------------------------these aren't working, make global context
                        username: res.data[0].username,
                        email: res.data[0].email
                    })
                }))

        props.goHome();
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