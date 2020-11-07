import React from 'react'
import '../../../css/TeamPage.css'

const Player = (props) => {

    return (
        <div className="player">
            {props.player.fullName}
            <div className="teamAbb">{props.player.proTeamAbbreviation}</div>
        </div>
    )
}

export default Player