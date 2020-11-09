import React from 'react'
import '../../css/Teams.css'

// preview of team in team list
const TeamPreview = (props) => {

    // ensures only two numbers after the decimal are displayed
    const formatPoints = (points) => {
        let i = points.toString().indexOf('.');

        if (i !== -1) {
            return points.toString().substring(0, i + 3);
        }

        return points;
    }

    return (
        <div className="teamRow">
            <div className="imageBox">
                <img className="logo" alt="team" src={props.logoURL} />
            </div>
            <div className="descriptionBox">
                <div className="teamName">{props.name}</div>
                <div className="w-l"> ({props.wins} - {props.losses})</div>
                <div className="points">PF: {formatPoints(props.pf)}</div>
                <div className="points">PA: {formatPoints(props.pa)}</div>
            </div>
        </div>
    )
}

export default TeamPreview;