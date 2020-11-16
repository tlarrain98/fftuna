import React, { useState } from 'react'
import '../../css/Landing.css'
import axios from 'axios'

const LandingFeed = () => {

    const [feed, setFeed] = useState("Loading...");

    const getData = () => {
        return feed;
    }

    return(
        <div className="landingTicker">
            <div className="tickerHeading">BREAKING</div>
        </div>
    )
}

export default LandingFeed