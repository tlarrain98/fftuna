import React, { useState, useEffect } from 'react'
import '../../css/Teams.css'
import TeamPage from './TeamPage'
import TeamList from './TeamList'
import { Client } from 'espn-fantasy-football-api/node'
import * as Constants from '../../constants'
import TeamSeasonWeek from './TeamSeasonWeek'

const ffClient = new Client({ leagueId: Constants.LEAGUE_ID });

// handles the team list and navigation between teams
const TeamHandler = () => {

    const [team, setTeam] = useState(null);
    const [data, setData] = useState(null);
    const [SID, setSID] = useState(Constants.SEASON_ID); // year to retrieve data from
    const [SP, setSP] = useState(18); // scoring period, 18 gets most recent week
    const [loading, setLoading] = useState(true);

    // on team change, scroll to top and get new team's data
    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);
        getData();
    }, [team, SID, SP]);

    const getData = () => {
        ffClient.getTeamsAtWeek({
            seasonId: SID, scoringPeriodId: SP
        })
            .then(response => {
                setLoading(false);
                setData(response);
            })
            .catch(() => {
                setLoading(false);
                setData("error");
            })
    }

    // chooses to show either the team list or the team selected
    const teamPicker = () => {
        // retrieving data
        if (loading) {
            return(
                <>
                    <TeamSeasonWeek setSID={setSID} seasonID={SID}
                        setSP={setSP} scoringPeriod={SP}/>
                    <div className="loadingText">
                        Loading...
                    </div>
                </>
            )
        }
        // error
        else if (data === "error") {
            return (
                <>
                    <TeamSeasonWeek setSID={setSID} seasonID={SID}
                        setSP={setSP} scoringPeriod={SP}/>
                    <div className="errorMessage">
                        Could not retrieve data. Please try refreshing.
                        <br /><br />
                        If still broken, tell Galaxy Brain Tomas.
                    </div>
                </>
            )
        }
        // return team list
        else if (team === null) {
            return (
                <>
                    <TeamSeasonWeek setSID={setSID} seasonID={SID}
                        setSP={setSP} scoringPeriod={SP} />
                    <TeamList key={"hi"}
                        setTeam={setTeam}
                        data={data} />
                </>
            )
        }
        // return individual team
        else {
            return (
                <TeamPage data={data[team]}
                    setTeam={setTeam}
                    season={SID}
                    week={SP} />
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