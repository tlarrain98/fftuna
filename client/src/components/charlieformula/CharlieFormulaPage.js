import React, { useState, useEffect } from 'react'
import CreatePost from '../posts/CreatePost'
import '../../css/BlogPage.css'
import axios from 'axios'
import PostList from '../posts/PostList'

const CharlieFormulaPage = (props) => {

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
                pageName: 'charlie'
            }
        })
            .then(res => {
                setNumPosts(res.data[0].count)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="blogWrapper">
            <div className="blogHeaderWrapper">
                <div className="blogTitle">The Charlie Formula</div>
                <div className="blogSubtitle">by Charlie Keefe</div>
                <div className="blogCreatePost">
                    <CreatePost pageName="charlie" 
                        handleRefresh={handleRefresh}/>
                </div>
            </div>
            <PostList goPost={props.goPost}
                postsPerPage={5}
                numPosts={numPosts}
                pageName='charlie'
                refresh={refresh}/>
        </div>
    )
}

export default CharlieFormulaPage;