import React from 'react';
import '../../css/SideStandings.css';

const StandingEntry = (props) => {
    return (
        <tr className="trTeam">
            <td className="tdTeam">{props.name}</td>
            <td className="tdW">{props.wins}</td>
            <td className="tdL">{props.losses}</td>
        </tr>
    )
}

export default StandingEntry;