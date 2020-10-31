import React, { useContext } from 'react'
import '../../css/Home.css'
import { UserContext } from '../../UserContext'
import HomeContent from './HomeContent.js'
import SideStandings from './SideStandings'


const Home = () => {

    return (
        <div className="home">
            <div className="col1">
                <HomeContent />
            </div>
            <div className="col2">
                <div className="ls">
                    League Standings
                    </div>
                <SideStandings />
            </div>
        </div>
    )
}

export default Home;