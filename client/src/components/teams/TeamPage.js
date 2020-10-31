import React from 'react';
import '../../css/TeamPage.css';
import Button from 'react-bootstrap/Button';

const TeamPage = (props) => {

    const formatPoints = (points) => {
        let i = points.toString().indexOf('.');

        if (i !== -1) {
            return points.toString().substring(0, i + 3);
        }

        return points;
    }

    return (
        <div className="teamPageWrapper">
            {console.log(props.data)}
            <Button className="backButton"
                onClick={() => props.setTeam(null)}>
                &#60; Back to teams
            </Button>
            <div className="teamPage">
                <div className="imageWrapper">
                    <img className="image" alt="team" src={props.data.logoURL} />
                </div>
                <div className="teamInfo">
                    <text className="name">{props.data.name}</text>
                    <text style={{color: "grey"}}>  {props.data.abbreviation}</text>
                    <br/>
                    <text>Record: {props.data.wins} - {props.data.losses}</text>
                    <br/>
                    <text>PF: {formatPoints(props.data.regularSeasonPointsFor)}</text>
                    <br />
                    <text>PA: {formatPoints(props.data.regularSeasonPointsAgainst)}</text>
                </div>
            </div>
        </div>
    )
}

export default TeamPage;