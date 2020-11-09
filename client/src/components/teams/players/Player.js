import React from 'react'
import '../../../css/TeamPage.css'

// individual players for each team's roster
const Player = (props) => {

    return (
        <div className="player">
            {props.player.fullName}
            <div className="teamAbb">{props.player.proTeamAbbreviation}</div>
        </div>
    )
}

export default Player