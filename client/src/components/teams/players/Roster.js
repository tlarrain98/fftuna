import React from 'react'
import '../../../css/TeamPage.css'
import Player from './Player'

const Roster = (props) => {

    const getQBs = () => {
        let qbs = [];

        for (let i = 0; i < props.players.length; i++) {
            if (props.players[i].defaultPosition === "TQB") {
                qbs.push(
                    <Player key={i} player={props.players[i]} />
                )
            }
        }

        return qbs
    }
    const getRBs = () => {
        let rbs = [];

        for (let i = 0; i < props.players.length; i++) {
            if (props.players[i].defaultPosition === "RB") {
                rbs.push(
                    <Player key={i} player={props.players[i]} />
                )
            }
        }

        return rbs
    }
    const getWRs = () => {
        let wrs = [];

        for (let i = 0; i < props.players.length; i++) {
            if (props.players[i].defaultPosition === "RB/WR") {
                wrs.push(
                    <Player key={i} player={props.players[i]} />
                )
            }
        }

        return wrs
    }
    const getTEs = () => {
        let tes = [];

        for (let i = 0; i < props.players.length; i++) {
            for (let j = 0; j < props.players[i].eligiblePositions.length; j++) {
                if (props.players[i].eligiblePositions[j] === "TE") {
                    tes.push(
                        <Player key={i} player={props.players[i]} />
                    )
                    break;
                }
            }
        }

        return tes
    }
    const getDSTs = () => {
        let dst = [];

        for (let i = 0; i < props.players.length; i++) {
            if (props.players[i].defaultPosition === "D/ST") {
                dst.push(
                    <Player key={i} player={props.players[i]} />
                )
            }
        }

        return dst
    }
    const getKs = () => {
        let ks = [];

        for (let i = 0; i < props.players.length; i++) {
            for (let j = 0; j < props.players[i].eligiblePositions.length; j++) {
                if (props.players[i].eligiblePositions[j] === "K") {
                    ks.push(
                        <Player key={i} player={props.players[i]} />
                    )
                    break;
                }
            }
        }

        return ks
    }

    return (
        <div className="roster">
            <div className="qb">
                <div className="position">QB</div>
                {getQBs()}
            </div>
            <div className="rb">
                <div className="position">RB</div>
                {getRBs()}
            </div>
            <div className="wr">
                <div className="position">WR</div>
                {getWRs()}
            </div>
            <div className="te">
                <div className="position">TE</div>
                {getTEs()}
            </div>
            <div className="dst">
                <div className="position">D/ST</div>
                {getDSTs()}
            </div>
            <div className="k">
                <div className="position">K</div>
                {getKs()}
            </div>






        </div>
    )
}

export default Roster