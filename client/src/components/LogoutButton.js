import React from 'react';
import Button from 'react-bootstrap/Button';
import '../css/NavBar.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Nav, Navbar } from 'react-bootstrap';

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