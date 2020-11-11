import React, { useState } from 'react'
import CreatePost from '../posts/CreatePost'
import '../../css/CharlieFormulaPage.css'
import axios from 'axios'

const CharlieFormulaPage = () => {

    return (
        <div className="charlieWrapper">
            {/* {getNumPosts()} */}
            <div className="headerWrapper">
                <div className="charlieHeader">The Charlie Formula</div>
                <div className="charlieSubtitle">by Charlie Keefe</div>
                <div className="postWrapper">
                    <CreatePost pageName="charlie" />
                </div>
            </div>
        </div>
    )
}

export default CharlieFormulaPage;