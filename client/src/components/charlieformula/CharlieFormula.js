import React from 'react'
import CreatePost from '../posts/CreatePost'
import '../../css/CharlieFormula.css'
import PostPreview from '../posts/PostPreview'
import PostList from '../posts/PostList'

const CharlieFormula = () => {

    return (
        <div className="charlieWrapper">
            <div className="headerWrapper">
                <div className="charlieHeader">The Charlie Formula</div>
                <CreatePost page="charlie"/>
            </div>
        </div>
    )
}

export default CharlieFormula;