import React from 'react';
import '../../css/Teams.css';
import TeamPreview from './TeamPreview.js';

const TeamList = (props) => {

    const showTeams = () => {
        if(props.data != null) {
            let teams = [];
            for (let i = 0; i < props.data.length; i++) {
                teams.push(
                    <div className="teamWrapper" onClick={() => props.setTeam(i)}>
                        <TeamPreview key={i} 
                            name={props.data[i].name} 
                            wins={props.data[i].wins}
                            losses={props.data[i].losses}
                            logoURL={props.data[i].logoURL}
                            pf={props.data[i].regularSeasonPointsFor}
                            pa={props.data[i].regularSeasonPointsAgainst} />
                    </div>
                )
            }
            return teams;
        }
    }
    return (
        <div className="teamListWrapper">
            {showTeams()}
        </div>
    )
}

export default TeamList;