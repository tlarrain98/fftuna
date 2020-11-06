import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import '../css/NavBar.css';
import LogoutButton from './LogoutButton.js';

const TunaNavBar = (props) => {
    return (
        <Navbar className="NavBarContainer" bg="dark" variant="dark" expand="lg">
            <Nav className="container-fluid">
                <Navbar.Brand className="brand" onClick={props.goHome}>Tuna</Navbar.Brand>
                <Nav.Link className="link" onClick={props.goCharlie}>Charlie Formula</Nav.Link>
                <Nav.Link className="link" onClick={props.goTimes}>Tuna Times</Nav.Link>
                <Nav.Link className="link" onClick={props.goTeams}>Teams</Nav.Link>
                <Nav.Item className="ml-auto">
                    <LogoutButton className="link" goLanding={props.goLanding} />
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}
export default TunaNavBar;