import React, { useState } from 'react'
import '../../css/Home.css'
import PostList from '../posts/PostList'
import SideStandings from './SideStandings'
import axios from 'axios'
import CreatePost from '../posts/CreatePost'


const Home = () => {

    const [numPosts, setNumPosts] = useState(0);

    const getNumPosts = () => {
        axios.get('/api/get/numpostsfromdb', null)
            .then(res => {
                setNumPosts(res.data[0].count)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="home">
            {getNumPosts()}
            <div className="col1">
                <div className="feedHeader">
                    <div className="feedTitle">
                        League Feed
                    </div>
                    <div className="postButtonWrapper">
                        <CreatePost />
                    </div>
                </div>
                <PostList postsPerPage={10}
                    numPosts={numPosts}
                    pageName=''/>
            </div>
            <div className="col2">
                <SideStandings />
            </div>
        </div>
    )
}

export default Home;