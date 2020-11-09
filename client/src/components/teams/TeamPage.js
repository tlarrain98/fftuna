import React from 'react'
import '../../css/TeamPage.css'
import Roster from './players/Roster'

const TeamPage = (props) => {

    const formatPoints = (points) => {
        let i = points.toString().indexOf('.');

        if (i !== -1) {
            return points.toString().substring(0, i + 3);
        }

        return points;
    }

    const getPlayers = () => {
        return <Roster players={props.data.roster}/>
    }

    const getWeek = () => {
        if(props.week === 18) {
            return "Current Week"
        }
        return "Week: " + props.week
    }

    return (
        <div className="teamPageWrapper">
            <button className="backButton"
                onClick={() => props.setTeam(null)}>
                Back to teams
            </button>
            <div className="seasonAndWeek">
                {getWeek()}<br />
                Season: {props.season}
            </div>
            <div className="teamPage">
                <div className="teamPageHeader">
                    <img className="image" alt="team" src={props.data.logoURL} />
                    <div className="teamInfo">
                        <div className="name">{props.data.name}</div>
                        <div style={{ color: "grey" }}>  {props.data.abbreviation}</div>
                        <div>Record: {props.data.wins} - {props.data.losses}</div>
                        <div>PF: {formatPoints(props.data.regularSeasonPointsFor)}</div>
                        <div>PA: {formatPoints(props.data.regularSeasonPointsAgainst)}</div>
                    </div>
                </div>
                <div className="teamContent">
                    <div className="rosterTitle">Roster</div>
                    {getPlayers()}
                </div>
            </div>
        </div>
    )
}

export default TeamPage;