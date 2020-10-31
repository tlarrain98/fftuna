import React, { useState, useContext } from 'react'
import '../css/ContentHandler.css'
import Home from './home/Home'
import TunaNavBar from './TunaNavBar'
import TunaTimes from './weeklytimes/TunaTimes'
import CharlieFormula from './charlieformula/CharlieFormula'
import TeamHandler from './teams/TeamHandler'
import Landing from './landingpages/Landing'
import SetUsername from './SetUsername'
import { UserContext } from '../UserContext'

const ContentHandler = () => {

    const [page, setPage] = useState('landing');
    const {userProfile, setUserProfile} = useContext(UserContext);

    // helper functions
    const goLanding = () => {
        setPage('landing');
    }
    const goHome = () => {
        setPage('home');
    }
    const goTimes = () => {
        setPage('times');
    }
    const goCharlie = () => {
        setPage('charlie');
    }
    const goTeams = () => {
        setPage('teams');
    }

    const showNavBar = () => {
        if (page !== 'landing') {
            return (
                <TunaNavBar goHome={goHome}
                    goTimes={goTimes}
                    goCharlie={goCharlie}
                    goTeams={goTeams}
                    goLanding={goLanding}/>
            )
        }
    }

    if (userProfile && userProfile.username === null) {
        
    }

    // chooses which page to render
    const pagePicker = () => {
        if (page === 'landing') {
            return (
                <Landing goHome={goHome}/>
            )
        }
        if (page === 'username') {
            return(
                <div>
                    {console.log("set username page")}
                </div>
            )
        }
        if (page === 'home') {
            return (
                <Home />
            )
        }
        if (page === 'times') {
            return (
                <TunaTimes />
            )
        }
        if (page === 'charlie') {
            return (
                <CharlieFormula />
            )
        }
        if (page === 'teams') {
            return (
                <TeamHandler />
            )
        }
    }
    return (
        <div className='Wrapper'>
            {showNavBar()}
            <div className="pageWrapper">
                {pagePicker()}
            </div>
        </div>
    );
}

export default ContentHandler;