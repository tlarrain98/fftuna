import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import '../css/NavBar.css'
import LogoutButton from './LogoutButton'

// navigation bar displayed on the top of the page
const TunaNavBar = (props) => {
    return (
        <Navbar className="NavBarContainer" bg="dark" variant="dark" expand="lg">
            <Nav className="container-fluid">
                <Navbar.Brand className="brand" onClick={props.goHome}>Tuna</Navbar.Brand>
                <Nav.Link className="link" onClick={props.goCharlie}>Charlie Formula</Nav.Link>
                <Nav.Link className="link" onClick={props.goWeekly}>Weekly Recap</Nav.Link>
                <Nav.Link className="link" onClick={props.goTeams}>Teams</Nav.Link>
                <Nav.Link className="link" onClick={props.goRecords}>Records</Nav.Link>
                <Nav.Item className="ml-auto">
                    <LogoutButton className="link" goLanding={props.goLanding} />
                </Nav.Item>
            </Nav>
        </Navbar>
    )
}
export default TunaNavBar;