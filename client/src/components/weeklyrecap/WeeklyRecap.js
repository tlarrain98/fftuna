import React from 'react';
import '../../css/WeeklyRecap.css'
import CreatePost from '../posts/CreatePost'

const WeeklyRecap = () => {
    return (
        <div className="weeklyRecapWrapper">
            <div className="weeklyHeader">
                <div className="weeklyTitle">Weekly Recap</div>
                <div className="weeklySubtitle">by Jacob Morman</div>
                <div className="weeklyCreatePostWrapper">
                    <CreatePost pageName="weekly"/>
                </div>
            </div>
        </div>
    )
}

export default WeeklyRecap;