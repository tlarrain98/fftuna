import React, { useEffect, useState } from 'react';
import '../css/ContentHandler.css';
import Home from './home/Home.js';
import TunaNavBar from './TunaNavBar.js';
import TunaTimes from './weeklytimes/TunaTimes.js';
import CharlieFormula from './charlieformula/CharlieFormula.js';
import TeamHandler from './teams/TeamHandler.js';
import Landing from './landingpages/Landing.js';


const ContentHandler = () => {

    const [page, setPage] = useState('landing');

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

    // chooses which page to render
    const pagePicker = () => {
        if (page === 'landing') {
            return (
                <Landing goHome={goHome} />
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