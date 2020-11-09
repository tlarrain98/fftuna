import React,{ useState, useEffect }  from 'react'
import '../../css/Teams.css'
import TeamPage from './TeamPage'
import TeamList from './TeamList'
import { Client } from 'espn-fantasy-football-api/node'
import * as Constants from '../../constants'

const ffClient = new Client({ leagueId: Constants.LEAGUE_ID });

// handles the team list and navigation between teams
const TeamHandler = () => {

    const [team, setTeam] = useState(null);
    const [data, setData] = useState(null);

    // on team change, scroll to top and get new team's data
    useEffect(() => {
        window.scrollTo(0, 0)
        getData();
    }, [team]);

    const getData = async () => {
        const response = await ffClient.getTeamsAtWeek({ 
            seasonId: Constants.SEASON_ID, scoringPeriodId: 18   
        });
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