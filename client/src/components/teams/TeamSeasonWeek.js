import React, { useState } from 'react'
import '../../css/Teams.css'
import Form from 'react-bootstrap/Form'
import * as Constants from '../../constants'

const TeamSeasonWeek = (props) => {

    // const [season, setSeason] = useState()

    return (
        <div className="selectorWrapper">
            <div className="seasonSelect">
                <Form.Label>Season</Form.Label>
                <Form.Control id="season" as="select" defaultValue={props.seasonID}
                    onChange={() => props.setSID(document.getElementById('season').value)}>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                </Form.Control>
            </div>
            <div className="weekSelect">
                <Form.Label>Week</Form.Label>
                <Form.Control id="week" as="select" defaultValue={props.scoringPeriod}
                    onChange={() => props.setSP(document.getElementById('week').value)}>
                    <option value="18">Current Week</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                </Form.Control>
            </div>
            <div className="note">
                Note: Record, PF, and PA are only available for current week.
            </div>
        </div>
    )
}

export default TeamSeasonWeek