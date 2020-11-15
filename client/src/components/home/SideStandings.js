import React, { useState } from 'react';
import StandingEntry from './StandingEntry.js';
import '../../css/SideStandings.css';
import { Client } from 'espn-fantasy-football-api/node';
import * as Constants from '../../constants'

const ffClient = new Client({ leagueId: Constants.LEAGUE_ID });

const SideStandings = () => {
    
    const [data, setData] = useState('');

    // get league data on every team
    const getData = async () => {
        // 18 gets the week that was last played
        const response = await ffClient.getTeamsAtWeek({ 
            seasonId: Constants.SEASON_ID, scoringPeriodId: 18
        });
        setData(response);
    }

    // orders the list of teams by record
    const getOrder = () => {
        let ordered = [];

        for (const team in Object.entries(data)) {
            ordered[data[team].playoffSeed - 1] = data[team];
        }

        return ordered;
    }

    // displays standings
    const displayStandings = () => {

        // display loading
        if (!data) {
            return <div className="loadingStandings">Loading...</div>
        }
        let standings = [];
        let ordered = getOrder(); // find order by record
        for (let i = 0; i < ordered.length; i++) {
            standings.push(
                <StandingEntry key={i}
                    name={ordered[i].name}
                    wins={ordered[i].wins}
                    losses={ordered[i].losses} />
            )
        }

        return standings;
    }

    getData();

    return (
        <div className="standingsWrapper">
            <div className="lsHeader">League Standings</div>
            <table className="sideTable">
                <thead className="thead">
                    <tr className="trHeader">
                        <th className="thTeam">Team</th>
                        <th className="thW">W</th>
                        <th className="thL">L</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {displayStandings()}
                </tbody>
            </table>
        </div>
    )
}

export default SideStandings;