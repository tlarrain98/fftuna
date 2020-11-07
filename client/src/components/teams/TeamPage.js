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

    return (
        <div className="teamPageWrapper">
            {console.log(props.data)}
            <button className="backButton"
                onClick={() => props.setTeam(null)}>
                Back to teams
            </button>
            <div className="teamPage">
                <div className="teamPageHeader">
                    <img className="image" alt="team" src={props.data.logoURL} />
                    <div className="teamInfo">
                        <text className="name">{props.data.name}</text>
                        <text style={{ color: "grey" }}>  {props.data.abbreviation}</text>
                        <br />
                        <text>Record: {props.data.wins} - {props.data.losses}</text>
                        <br />
                        <text>PF: {formatPoints(props.data.regularSeasonPointsFor)}</text>
                        <br />
                        <text>PA: {formatPoints(props.data.regularSeasonPointsAgainst)}</text>
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