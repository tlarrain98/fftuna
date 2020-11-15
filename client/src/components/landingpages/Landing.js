import React, { useContext } from 'react'
import { UserContext } from '../../UserContext'
import LoginButton from './LoginButton'
import '../../css/Landing.css'
import { useAuth0 } from '@auth0/auth0-react'
import SignUpButton from './SignUpButton'
import axios from 'axios'

const Landing = (props) => {

    const { userProfile, setUserProfile } = useContext(UserContext);
    const isAuthenticated = useAuth0().isAuthenticated;
    const { isLoading } = useAuth0();
    const { user } = useAuth0();

    if (isLoading) {
        return (
            <div className="landing">
                <div className="landingMargin">
                    Loading...
                </div>
            </div>
        )
    }

    if (isAuthenticated) {
        const data = {
            email: user.email
        }
        axios.post('/api/post/usertodb', data)
            .then(
                axios.get('/api/get/userfromdb', {
                params: { email: user.email }
            })
                .then(res => {
                    setUserProfile(res.data[0]);
                    // check if username has been set
                    if (userProfile && userProfile.username === null) {
                        props.goSetUsername();
                    }
                    else {
                        props.goHome();
                    }
                })
            )
    }

    return (
        <div className="landing">
            <div className="landingMargin">
                <div className="title">Show Me Your Tuna</div>
                <SignUpButton />
                <LoginButton />
            </div>
        </div>
    )
}

export default Landing;