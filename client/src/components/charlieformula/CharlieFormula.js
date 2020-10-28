import React from 'react';
import CreatePost from './CreatePost';
import '../../css/CharlieFormula.css';

const CharlieFormula = (props) => {
    return (
        <div className="charlieWrapper">
            <div className="headerWrapper">
                <text className="charlieHeader">The Charlie Formula</text>
                <CreatePost/>
            </div>
        </div>
    )
}

export default CharlieFormula;