import React from 'react';
import '../../css/Home.css';

const StandingEntry = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.wins}</td>
            <td>{props.losses}</td>
        </tr>
    )
}

export default StandingEntry;