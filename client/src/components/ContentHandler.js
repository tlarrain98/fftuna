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
    const { userProfile, setUserProfile } = useContext(UserContext);

    // helper functions
    const goLanding = () => {
        setPage('landing');
    }
    const goSetUsername = () => {
        setPage('setuser')
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
        if (page !== 'landing' && page !== 'setuser') {
            return (
                <TunaNavBar goHome={goHome}
                    goTimes={goTimes}
                    goCharlie={goCharlie}
                    goTeams={goTeams}
                    goLanding={goLanding} />
            )
        }
    }

    // chooses which page to render
    const pickPage = () => {
        if (page === 'landing') {
            return (
                <Landing goHome={goHome}
                    goSetUsername={goSetUsername} />
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
        if (page === 'setuser') {
            return (
                <SetUsername goHome={goHome} />
            )
        }
    }
    return (
        <div className='Wrapper'>
            {showNavBar()}
            <div className="pageWrapper">
                {pickPage()}
            </div>
        </div>
    );
}

export default ContentHandler;