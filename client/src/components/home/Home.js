import React from 'react'
import '../../css/Home.css'
import PostList from '../posts/PostList'
import SideStandings from './SideStandings'


const Home = () => {

    return (
        <div className="home">
            <div className="col1">
                <PostList numposts={10}/>
            </div>
            <div className="col2">
                <div className="ls">
                    League Standings
                    </div>
                <SideStandings />
            </div>
        </div>
    )
}

export default Home;