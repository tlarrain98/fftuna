import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import '../css/NavBar.css';
import LogoutButton from './LogoutButton.js';

const TunaNavBar = (props) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Nav className="container-fluid">
                <Navbar.Brand href="" onClick={props.goHome}>Tuna</Navbar.Brand>
                <Nav.Link onClick={props.goCharlie}>Charlie Formula</Nav.Link>
                <Nav.Link onClick={props.goTimes}>Tuna Times</Nav.Link>
                <Nav.Link onClick={props.goTeams}>Teams</Nav.Link>
                <Nav.Item className="ml-auto">
                    <LogoutButton goLanding={props.goLanding} />
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}
export default TunaNavBar;