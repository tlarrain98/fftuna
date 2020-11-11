import * as Constants from '../../constants'
import { Client } from 'espn-fantasy-football-api/node';

const ffClient = new Client({ leagueId: Constants.LEAGUE_ID });

class CharlieFormula {

    // used in PostForm.js to generate values into the form
    getScores = function (week, setMagic) {

        ffClient.getBoxscoreForWeek({
            seasonId: Constants.SEASON_ID, matchupPeriodId: week, scoringPeriodId: week
        })
            .then(response => {
                if (response[0].homeScore === 0) {
                    // do nothing
                }
                else {
                    setMagic(response);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    cfHandler = function (scores) {
        // console.log(scores)
        let leagueAverages = this.getLeaguePositionAverages(scores);
        let teamAverages = this.getTeamPositionAverages(scores);
        let multipliers = this.getMultipliers(leagueAverages);
        let teamRatios = this.getTeamRatio(leagueAverages, teamAverages, multipliers);
        let teamAddedRatios = this.addRatios(teamRatios);

        console.log("league averages")
        console.log(leagueAverages);
        console.log("team averages")
        console.log(teamAverages[1]);
        console.log("multipliers")
        console.log(multipliers);
        console.log("team ratios")
        console.log(teamRatios[0]);
        console.log("team added ratios")
        console.log(teamAddedRatios[0]);
    }

    addRatios = function (teamRatios) {
        let teamAddedRatios = []
        for (let i = 0; i < teamRatios.length; i++) {
            teamAddedRatios[i] = {
                teamId: teamRatios[i].teamId,
                total: (teamRatios[i].qb + teamRatios[i].rb
                        + teamRatios[i].wr + teamRatios[i].te + teamRatios[i].dst
                        + teamRatios[i].k)
            }
        }

        return teamAddedRatios;
    }

    getTeamRatio = function (leagueAverages, teamAverages, multipliers) {

        let teamRatios = []; // each team's charlie ratio per position
        let count = 0; // used to keep track of index for teamPositionRatios

        for (let i = 0; i < teamAverages.length; i++) {
            if (!teamAverages[i]) {
                continue;
            }
            teamRatios[count] = {
                teamId: i,
                qb: teamAverages[i].qb.avg / leagueAverages.qb,
                rb: teamAverages[i].rb.avg / leagueAverages.rb,
                wr: teamAverages[i].wr.avg / leagueAverages.wr,
                te: teamAverages[i].te.avg / leagueAverages.te,
                dst: teamAverages[i].dst.avg / leagueAverages.dst,
                k: teamAverages[i].k.avg / leagueAverages.k,
            }
            count++;
        }

        // apply multipliers
        for (let i = 0; i < teamRatios.length; i++) {
            // console.log(teamRatios[i].qb *= multipliers.qb);
            teamRatios[i].qb *= multipliers.qb
            teamRatios[i].rb *= multipliers.rb
            teamRatios[i].wr *= multipliers.wr
            teamRatios[i].te *= multipliers.te
            teamRatios[i].dst *= multipliers.dst
            teamRatios[i].k *= multipliers.k
        }

        return teamRatios
    }

    getMultipliers = function (leagueAverages) {
        let positionMult = {
            qb: 0, rb: 0, wr: 0,
            te: 0, dst: 0, k: 0
        }

        positionMult.qb = leagueAverages.qb / leagueAverages.team;
        positionMult.te = leagueAverages.te / leagueAverages.team;
        positionMult.dst = leagueAverages.dst / leagueAverages.team;
        positionMult.k = leagueAverages.k / leagueAverages.team;
        positionMult.rb = leagueAverages.rb / leagueAverages.team;
        positionMult.wr = leagueAverages.wr / leagueAverages.team;

        return positionMult;
    }

    // calculate average points scored for each position in a week
    getLeaguePositionAverages = function (scores) {
        // used to keep track of how many times each position was started
        let qbCount = 0;
        let rbCount = 0;
        let wrCount = 0;
        let teCount = 0;
        let dstCount = 0;
        let kCount = 0;
        let teamCount = 0;

        // used to keep track of total points scored per position
        let qbTotal = 0.0;
        let rbTotal = 0.0;
        let wrTotal = 0.0;
        let teTotal = 0.0;
        let dstTotal = 0.0;
        let kTotal = 0.0;
        let teamTotal = 0.0;

        // iterates through each matchup and gets totals
        for (let i = 0; i < scores.length; i++) {
            // to find average team score
            teamCount += 2;
            teamTotal += scores[i].awayScore;
            teamTotal += scores[i].homeScore;

            // for away team
            for (let j = 0; j < scores[i].awayRoster.length; j++) {
                // just skip bench players
                if (scores[i].awayRoster[j].position !== "Bench") {
                    if (scores[i].awayRoster[j].position === "QB") {
                        qbCount++;
                        qbTotal += scores[i].awayRoster[j].totalPoints;
                    }
                    if (scores[i].awayRoster[j].position === "RB") {
                        rbCount++;
                        rbTotal += scores[i].awayRoster[j].totalPoints;
                    }
                    if (scores[i].awayRoster[j].position === "WR") {
                        wrCount++;
                        wrTotal += scores[i].awayRoster[j].totalPoints;
                    }
                    if (scores[i].awayRoster[j].position === "TE") {
                        teCount++;
                        teTotal += scores[i].awayRoster[j].totalPoints;
                    }
                    if (scores[i].awayRoster[j].position === "D/ST") {
                        dstCount++;
                        dstTotal += scores[i].awayRoster[j].totalPoints;
                    }
                    if (scores[i].awayRoster[j].position === "K") {
                        kCount++;
                        kTotal += scores[i].awayRoster[j].totalPoints;
                    }
                    // flex players
                    if (scores[i].awayRoster[j].position === "RB/WR/TE") {
                        // if rb
                        if (scores[i].awayRoster[j].player.defaultPosition === "RB") {
                            rbCount++;
                            rbTotal += scores[i].awayRoster[j].totalPoints;
                        }
                        // if wr or te, add it to receiver
                        else {
                            wrCount++;
                            wrTotal += scores[i].awayRoster[j].totalPoints;
                        }
                    }
                }
            }
            // for home team
            for (let j = 0; j < scores[i].homeRoster.length; j++) {
                // just skip bench players
                if (scores[i].homeRoster[j].position !== "Bench") {
                    if (scores[i].homeRoster[j].position === "QB") {
                        qbCount++;
                        qbTotal += scores[i].homeRoster[j].totalPoints;
                    }
                    if (scores[i].homeRoster[j].position === "RB") {
                        rbCount++;
                        rbTotal += scores[i].homeRoster[j].totalPoints;
                    }
                    if (scores[i].homeRoster[j].position === "WR") {
                        wrCount++;
                        wrTotal += scores[i].homeRoster[j].totalPoints;
                    }
                    if (scores[i].homeRoster[j].position === "TE") {
                        teCount++;
                        teTotal += scores[i].homeRoster[j].totalPoints;
                    }
                    if (scores[i].homeRoster[j].position === "D/ST") {
                        dstCount++;
                        dstTotal += scores[i].homeRoster[j].totalPoints;
                    }
                    if (scores[i].homeRoster[j].position === "K") {
                        kCount++;
                        kTotal += scores[i].homeRoster[j].totalPoints;
                    }
                    // flex players
                    if (scores[i].homeRoster[j].position === "RB/WR/TE") {
                        // if rb
                        if (scores[i].homeRoster[j].player.defaultPosition === "RB") {
                            rbCount++;
                            rbTotal += scores[i].homeRoster[j].totalPoints;
                        }
                        // if wr or te, add it to receiver
                        else {
                            wrCount++;
                            wrTotal += scores[i].homeRoster[j].totalPoints;
                        }
                    }
                }
            }
        }

        let averages = {
            qb: qbTotal / qbCount,
            rb: rbTotal / (scores.length * 2),
            wr: wrTotal / (scores.length * 2),
            te: teTotal / teCount,
            dst: dstTotal / dstCount,
            k: kTotal / kCount,
            team: teamTotal / teamCount
        }

        return averages;
    }

    getTeamPositionAverages = function (scores) {

        let teamAverages = [];
        // iterates through each matchup and gets totals
        for (let i = 0; i < scores.length; i++) {
            teamAverages[scores[i].awayTeamId] = {
                qb: { count: 0, total: 0, avg: 0 },
                rb: { count: 0, total: 0, avg: 0 },
                wr: { count: 0, total: 0, avg: 0 },
                te: { count: 0, total: 0, avg: 0 },
                dst: { count: 0, total: 0, avg: 0 },
                k: { count: 0, total: 0, avg: 0 },
            }
            teamAverages[scores[i].homeTeamId] = {
                qb: { count: 0, total: 0, avg: 0 },
                rb: { count: 0, total: 0, avg: 0 },
                wr: { count: 0, total: 0, avg: 0 },
                te: { count: 0, total: 0, avg: 0 },
                dst: { count: 0, total: 0, avg: 0 },
                k: { count: 0, total: 0, avg: 0 },
            }
            // for away team
            for (let j = 0; j < scores[i].awayRoster.length; j++) {
                // just skip bench players
                if (scores[i].awayRoster[j].position !== "Bench") {
                    if (scores[i].awayRoster[j].position === "QB") {
                        teamAverages[scores[i].awayTeamId].qb.count++;
                        teamAverages[scores[i].awayTeamId].qb.total += scores[i].awayRoster[j].totalPoints;
                    }
                    if (scores[i].awayRoster[j].position === "RB") {
                        teamAverages[scores[i].awayTeamId].rb.count++;
                        teamAverages[scores[i].awayTeamId].rb.total += scores[i].awayRoster[j].totalPoints;
                    }
                    if (scores[i].awayRoster[j].position === "WR") {
                        teamAverages[scores[i].awayTeamId].wr.count++;
                        teamAverages[scores[i].awayTeamId].wr.total += scores[i].awayRoster[j].totalPoints;
                    }
                    if (scores[i].awayRoster[j].position === "TE") {
                        teamAverages[scores[i].awayTeamId].te.count++;
                        teamAverages[scores[i].awayTeamId].te.total += scores[i].awayRoster[j].totalPoints;
                    }
                    if (scores[i].awayRoster[j].position === "D/ST") {
                        teamAverages[scores[i].awayTeamId].dst.count++;
                        teamAverages[scores[i].awayTeamId].dst.total += scores[i].awayRoster[j].totalPoints;
                    }
                    if (scores[i].awayRoster[j].position === "K") {
                        teamAverages[scores[i].awayTeamId].k.count++;
                        teamAverages[scores[i].awayTeamId].k.total += scores[i].awayRoster[j].totalPoints;
                    }
                    // flex players
                    if (scores[i].awayRoster[j].position === "RB/WR/TE") {
                        // if rb
                        if (scores[i].awayRoster[j].player.defaultPosition === "RB") {
                            teamAverages[scores[i].awayTeamId].rb.count++;
                            teamAverages[scores[i].awayTeamId].rb.total += scores[i].awayRoster[j].totalPoints;
                        }
                        // if wr or te, add it to receiver
                        else {
                            teamAverages[scores[i].awayTeamId].wr.count++;
                            teamAverages[scores[i].awayTeamId].wr.total += scores[i].awayRoster[j].totalPoints;
                        }
                    }
                }
            }
            // for home team
            for (let j = 0; j < scores[i].homeRoster.length; j++) {
                // just skip bench players
                if (scores[i].homeRoster[j].position !== "Bench") {
                    if (scores[i].homeRoster[j].position === "QB") {
                        teamAverages[scores[i].homeTeamId].qb.count++;
                        teamAverages[scores[i].homeTeamId].qb.total += scores[i].homeRoster[j].totalPoints;
                    }
                    if (scores[i].homeRoster[j].position === "RB") {
                        teamAverages[scores[i].homeTeamId].rb.count++;
                        teamAverages[scores[i].homeTeamId].rb.total += scores[i].homeRoster[j].totalPoints;
                    }
                    if (scores[i].homeRoster[j].position === "WR") {
                        teamAverages[scores[i].homeTeamId].wr.count++;
                        teamAverages[scores[i].homeTeamId].wr.total += scores[i].homeRoster[j].totalPoints;
                    }
                    if (scores[i].homeRoster[j].position === "TE") {
                        teamAverages[scores[i].homeTeamId].te.count++;
                        teamAverages[scores[i].homeTeamId].te.total += scores[i].homeRoster[j].totalPoints;
                    }
                    if (scores[i].homeRoster[j].position === "D/ST") {
                        teamAverages[scores[i].homeTeamId].dst.count++;
                        teamAverages[scores[i].homeTeamId].dst.total += scores[i].homeRoster[j].totalPoints;
                    }
                    if (scores[i].homeRoster[j].position === "K") {
                        teamAverages[scores[i].homeTeamId].k.count++;
                        teamAverages[scores[i].homeTeamId].k.total += scores[i].homeRoster[j].totalPoints;
                    }
                    // flex players
                    if (scores[i].homeRoster[j].position === "RB/WR/TE") {
                        // if rb
                        if (scores[i].homeRoster[j].player.defaultPosition === "RB") {
                            teamAverages[scores[i].homeTeamId].rb.count++;
                            teamAverages[scores[i].homeTeamId].rb.total += scores[i].homeRoster[j].totalPoints;
                        }
                        // if wr or te, add it to receiver
                        else {
                            teamAverages[scores[i].homeTeamId].wr.count++;
                            teamAverages[scores[i].homeTeamId].wr.total += scores[i].homeRoster[j].totalPoints;
                        }
                    }
                }
            }
            // away team averages
            teamAverages[scores[i].awayTeamId].qb.avg = (
                teamAverages[scores[i].awayTeamId].qb.total / teamAverages[scores[i].awayTeamId].qb.count
            )
            teamAverages[scores[i].awayTeamId].rb.avg = (
                teamAverages[scores[i].awayTeamId].rb.total / teamAverages[scores[i].awayTeamId].rb.count
            )
            teamAverages[scores[i].awayTeamId].wr.avg = (
                teamAverages[scores[i].awayTeamId].wr.total / teamAverages[scores[i].awayTeamId].wr.count
            )
            teamAverages[scores[i].awayTeamId].te.avg = (
                teamAverages[scores[i].awayTeamId].te.total / teamAverages[scores[i].awayTeamId].te.count
            )
            teamAverages[scores[i].awayTeamId].dst.avg = (
                teamAverages[scores[i].awayTeamId].dst.total / teamAverages[scores[i].awayTeamId].dst.count
            )
            teamAverages[scores[i].awayTeamId].k.avg = (
                teamAverages[scores[i].awayTeamId].k.total / teamAverages[scores[i].awayTeamId].k.count
            )
            // home team averages
            teamAverages[scores[i].homeTeamId].qb.avg = (
                teamAverages[scores[i].homeTeamId].qb.total / teamAverages[scores[i].homeTeamId].qb.count
            )
            teamAverages[scores[i].homeTeamId].rb.avg = (
                teamAverages[scores[i].homeTeamId].rb.total / teamAverages[scores[i].homeTeamId].rb.count
            )
            teamAverages[scores[i].homeTeamId].wr.avg = (
                teamAverages[scores[i].homeTeamId].wr.total / teamAverages[scores[i].homeTeamId].wr.count
            )
            teamAverages[scores[i].homeTeamId].te.avg = (
                teamAverages[scores[i].homeTeamId].te.total / teamAverages[scores[i].homeTeamId].te.count
            )
            teamAverages[scores[i].homeTeamId].dst.avg = (
                teamAverages[scores[i].homeTeamId].dst.total / teamAverages[scores[i].homeTeamId].dst.count
            )
            teamAverages[scores[i].homeTeamId].k.avg = (
                teamAverages[scores[i].homeTeamId].k.total / teamAverages[scores[i].homeTeamId].k.count
            )
        }

        return teamAverages;
    }
}

export default CharlieFormula