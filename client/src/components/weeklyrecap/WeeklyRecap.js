import React, { useState, useEffect } from 'react'
import '../../css/BlogPage.css'
import CreatePost from '../posts/CreatePost'
import axios from 'axios'
import PostList from '../posts/PostList'

const WeeklyRecap = (props) => {

    const [numPosts, setNumPosts] = useState(0);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getNumPosts();
    }, [])

    // sets to true then false to ensure that post list can refresh more than once
    const handleRefresh = () => {
        setRefresh(true);
        setRefresh(false);
    }

    const getNumPosts = () => {
        axios.get('/api/get/numpostsfromdb', {
            params: {
                pageName: 'weekly'
            }
        })
            .then(res => {
                setNumPosts(res.data[0].count);
            })
            .catch(error => {
                console.log(error);
            })
    }



    return (
        <div className="blogWrapper">
            <div className="blogHeaderWrapper">
                <div className="blogTitle">Weekly Recap</div>
                <div className="blogSubtitle">by Jacob Morman</div>
                <div className="blogCreatePost">
                    <CreatePost pageName="weekly"
                        handleRefresh={handleRefresh}/>
                </div>
            </div>
            <PostList goPost={props.goPost}
                postsPerPage={5}
                numPosts={numPosts}
                pageName='weekly'
                refresh={refresh} />
        </div>
    )
}

export default WeeklyRecap;