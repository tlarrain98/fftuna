import React from 'react';
import '../../css/Home.css';
import HomeContent from './HomeContent.js';
import SideStandings from './SideStandings';

const Home = (props) => {

    return (
        <div className="row">
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