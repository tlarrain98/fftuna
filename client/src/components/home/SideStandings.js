import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import StandingEntry from './StandingEntry.js';
import '../../css/Home.css';
import { Client } from 'espn-fantasy-football-api/node';

const LID = '434534';
const ffClient = new Client({ leagueId: LID });

const SideStandings = (props) => {
    
    const [data, setData] = useState('');
    const [SID, setSID] = useState('2020');

    // only rerenders on change of SID, prevents infinite loop
    useEffect(() => {
        setSID('2020');
        getData();
    }, [SID]);

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
                <StandingEntry name={ordered[i].name}
                    wins={ordered[i].wins}
                    losses={ordered[i].losses} />
            )
        }

        return standings;
    }

    return (
        <div className="standings">
            <Table size="sm" striped>
                <thead>
                    <th className="leftalign">Team</th>
                    <th className="leftalign">W</th>
                    <th className="leftalign">L</th>
                </thead>
                <tbody className="leftalign">
                    {displayStandings()}
                </tbody>
            </Table>
        </div>
    )
}

export default SideStandings;