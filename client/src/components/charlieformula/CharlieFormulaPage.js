import React, { useState, useEffect, useContext } from 'react'
import CreatePost from '../posts/CreatePost'
import '../../css/BlogPage.css'
import axios from 'axios'
import PostList from '../posts/PostList'
import { UserContext } from '../../UserContext'

const CharlieFormulaPage = (props) => {

    const { userProfile } = useContext(UserContext)
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

    const showCreatePost = () => {
        if (userProfile.email === "mormanjacob7@gmail.com" ||
            userProfile.email === "tlarrain98@gmail.com")
        return <CreatePost pageName="charlie" handleRefresh={handleRefresh} />
    }

    return (
        <div className="blogWrapper">
            <div className="blogHeaderWrapper">
                <div className="blogTitle">The Charlie Formula</div>
                <div className="blogSubtitle">by Charlie Keefe</div>
                <div className="blogCreatePost">
                    {showCreatePost()}
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