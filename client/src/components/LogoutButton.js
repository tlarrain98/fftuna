import React from 'react'
import '../css/NavBar.css'
import { useAuth0 } from '@auth0/auth0-react'
import { Nav } from 'react-bootstrap'

// navbar button to log the user out
const LogoutButton = (props) => {
    const { logout } = useAuth0();

    function logoutHelper() {
        logout();
        props.goLanding();
    }

    return (
        <Nav.Link size="lg"
            onClick={() => logoutHelper()}>
            Log out
        </Nav.Link>
    )
}

export default LogoutButton;