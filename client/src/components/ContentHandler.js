import React, { useState, useContext } from 'react'
import '../css/ContentHandler.css'
import Home from './home/Home'
import TunaNavBar from './TunaNavBar'
import WeeklyRecap from './weeklyrecap/WeeklyRecap'
import CharlieFormula from './charlieformula/CharlieFormula'
import TeamHandler from './teams/TeamHandler'
import Landing from './landingpages/Landing'
import SetUsername from './SetUsername'
import Post from './posts/Post'
// import { UserContext } from '../UserContext'

/*
 * Chooses the current page to display
 * landing: landing page where user can log in
 * setuser: if user has not set username, show prompt on login
 * home: home page including standings and league feed
 * times: shows the weekly recap page
 * charle: shows the charlie formula page
 * teams: shows the teams page with the team list
 * post: loads an individual post when clicked on
*/
const ContentHandler = () => {

    const [page, setPage] = useState('landing'); // stores page context
    const [pid, setPid] = useState(); // used for loading individual posts
    // const { userProfile, setUserProfile } = useContext(UserContext);

    // helper functions to dictate which page to show
    const goLanding = () => {
        setPage('landing');
    }
    const goSetUsername = () => {
        setPage('setuser')
    }
    const goHome = () => {
        setPage('home');
    }
    const goWeekly = () => {
        setPage('times');
    }
    const goCharlie = () => {
        setPage('charlie');
    }
    const goTeams = () => {
        setPage('teams');
    }
    const goPost = (pageId) => {
        setPid(pageId);
        setPage('post')
    }

    const showNavBar = () => {
        if (page !== 'landing' && page !== 'setuser') {
            return (
                <TunaNavBar goHome={goHome}
                    goWeekly={goWeekly}
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
                <Home goPost={goPost} />
            )
        }
        if (page === 'times') {
            return (
                <WeeklyRecap />
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
        if (page === 'post') {
            return <Post pid={pid}/>
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