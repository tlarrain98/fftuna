import React, { useState, useContext, useEffect } from 'react'
import '../css/ContentHandler.css'
import Home from './home/Home'
import TunaNavBar from './TunaNavBar'
import WeeklyRecap from './weeklyrecap/WeeklyRecap'
import CharlieFormulaPage from './charlieformula/CharlieFormulaPage'
import TeamHandler from './teams/TeamHandler'
import Landing from './landingpages/Landing'
import SetUsername from './SetUsername'
import Post from './posts/Post'
import Records from './records/Records'
import ShowProfile from './profile/ShowProfile'
// import { UserContext } from '../UserContext'

/*
 * Chooses the current page to display
 * landing: landing page where user can log in
 * setuser: if user has not set username, show prompt on login
 * home: home page including standings and league feed
 * times: shows the weekly recap page
 * charlie: shows the charlie formula page
 * teams: shows the teams page with the team list
 * post: loads an individual post when clicked on
 * records: shows the league records page
 * profile: shows profile that was clicked on
*/
const ContentHandler = () => {

    const [page, setPage] = useState('landing'); // stores page context
    const [pid, setPid] = useState(); // used for loading individual posts
    const [uid, setUid] = useState();
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
        setPage('post');
    }
    const goRecords = () => {
        setPage('records');
    }
    const goProfile = (userId) => {
        setUid(userId);
        setPage('profile');
    }

    const showNavBar = () => {
        if (page !== 'landing' && page !== 'setuser') {
            return (
                <TunaNavBar goHome={goHome}
                    goWeekly={goWeekly}
                    goCharlie={goCharlie}
                    goTeams={goTeams}
                    goLanding={goLanding}
                    goRecords={goRecords} />
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
                <Home goPost={goPost}
                    goProfile={goProfile}/>
            )
        }
        if (page === 'times') {
            return (
                <WeeklyRecap goPost={goPost} 
                    goProfile={goProfile}/>
            )
        }
        if (page === 'charlie') {
            return (
                <CharlieFormulaPage goPost={goPost} 
                    goProfile={goProfile}/>
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
            return <Post pid={pid}
                goHome={goHome} 
                goProfile={goProfile}/>
        }
        if (page === 'records') {
            return <Records />
        }
        if (page === 'profile') {
            return <ShowProfile uid={uid}/>
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