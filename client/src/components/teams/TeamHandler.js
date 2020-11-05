import React,{ useState, useEffect }  from 'react';
import '../../css/Teams.css';
import TeamPage from './TeamPage.js';
import TeamList from './TeamList.js';
import { Client } from 'espn-fantasy-football-api/node';

const LID = '434534';
const ffClient = new Client({ leagueId: LID });

const TeamHandler = (props) => {

    const [team, setTeam] = useState(null);
    const [data, setData] = useState(null);
    const [SID, setSID] = useState('2020');

    useEffect(() => {
        window.scrollTo(0, 0)
        setSID('2020');
        getData();
    }, [team]);

    const getData = async () => {
        const response = await ffClient.getTeamsAtWeek({ seasonId: SID, scoringPeriodId: 18 });
        // console.log(response);
        setData(response);
    }

    // chooses to show either the team list or the team selected
    const teamPicker = () => {
        if(team === null) {
            return(
                <TeamList setTeam={setTeam}
                    data={data}/>
            )
        }
        else {
            return(
                <TeamPage data={data[team]}
                    setTeam={setTeam}/>
            )
        }
    }

    return (
        <div className="thWrapper">
            {teamPicker()}
        </div>
    )
}

export default TeamHandler;