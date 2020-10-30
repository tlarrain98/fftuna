import React from 'react';
import '../css/NavBar.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Nav } from 'react-bootstrap';

const LogoutButton = (props) => {
    // const { logout } = useAuth0();

    // function logoutHelper() {
    //     logout();
    //     props.goLanding();
    // }

    return (
        <Nav.Link size="lg"
            onClick={() => props.goLanding()}>
            Log out
        </Nav.Link>
    )
}

export default LogoutButton;