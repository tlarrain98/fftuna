import React, { useEffect, useState } from 'react'
import '../../css/Home.css'
import PostList from '../posts/PostList'
import SideStandings from './SideStandings'
import axios from 'axios'
import CreatePost from '../posts/CreatePost'
import MyProfile from '../profile/MyProfile'


const Home = (props) => {

    const [numPosts, setNumPosts] = useState(0);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getNumPosts();
    }, [])

    const getNumPosts = () => {
        axios.get('/api/get/numpostsfromdb', null)
            .then(res => {
                setNumPosts(res.data[0].count)
            })
            .catch(error => {
                console.log(error)
            })
    }

    // sets to true then false to ensure that post list can refresh more than once
    const handleRefresh = () => {
        setRefresh(true);
        setRefresh(false);
    }

    return (
        <div className="home">
            <div className="col1">
                <div className="feedHeader">
                    <div className="feedTitle">
                        League Feed
                    </div>
                    <div className="postButtonWrapper">
                        <CreatePost handleRefresh={handleRefresh}/>
                    </div>
                </div>
                <PostList goPost={props.goPost}
                    postsPerPage={10}   // posts per page on the league feed
                    numPosts={numPosts} // total number of posts in the database
                    pageName=''
                    refresh={refresh}/>
            </div>
            <div className="col2">
                <MyProfile />
                <SideStandings />
            </div>
        </div>
    )
}

export default Home;