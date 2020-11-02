import React from 'react';
import CreatePost from '../posts/CreatePost';
import '../../css/CharlieFormula.css';

const CharlieFormula = () => {
    return (
        <div className="charlieWrapper">
            <div className="headerWrapper">
                <text className="charlieHeader">The Charlie Formula</text>
                <CreatePost page="charlie"/>
            </div>
        </div>
    )
}

export default CharlieFormula;