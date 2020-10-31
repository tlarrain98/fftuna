import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import StandingEntry from './StandingEntry.js';
import '../../css/Home.css';
import { Client } from 'espn-fantasy-football-api/node';

const LID = '434534';
const ffClient = new Client({ leagueId: LID });

const SideStandings = () => {
    
    const [data, setData] = useState('');
    const [SID, setSID] = useState('2020');

    const getData = async () => {
        const response = await ffClient.getTeamsAtWeek({ seasonId: SID, scoringPeriodId: 18 });
        setData(response);
    }

    const getOrder = () => {
        let ordered = [];

        for (const team in Object.entries(data)) {
            ordered[data[team].playoffSeed - 1] = data[team];
        }

        return ordered;
    }

    const displayStandings = () => {
        let standings = [];
        let ordered = getOrder();
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
        <div className="standings">
            <Table size="sm" striped>
                <thead>
                    <tr>
                        <th className="leftalign">Team</th>
                        <th className="leftalign">W</th>
                        <th className="leftalign">L</th>
                    </tr>
                </thead>
                <tbody className="leftalign">
                    {displayStandings()}
                </tbody>
            </Table>
        </div>
    )
}

export default SideStandings;