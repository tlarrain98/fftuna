import React, { useEffect, useState, useContext } from 'react'
import '../../css/Post.css'
import axios from 'axios'
import CommentForm from '../comments/CommentForm'
import CommentList from '../comments/CommentList'
import DeletePost from './DeletePost'
import { UserContext } from '../../UserContext'

const Post = (props) => {

    const { userProfile } = useContext(UserContext);

    const [post, setPost] = useState(); // used to set and store post data
    const [refresh, setRefresh] = useState(false); // refreshes page
    const [show, setShow] = useState(false); // show delete post modal

    // get post data on load
    useEffect(() => {
        getPost();
    }, [])

    // sets to true then false to ensure that post list can refresh more than once
    const handleRefresh = () => {
        setRefresh(true);
        setRefresh(false);
    }

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const getPost = () => {
        axios.get('/api/get/post', {
            params: {
                pid: props.pid
            }
        })
            .then((res) => {
                setPost(res.data[0]);
            })
            .catch(error => {
                console.log("error: " + error)
            })
    }

    // formats date into MM/DD/YYYY
    const formatDate = (date) => {
        let year = date.substring(0, 4);
        let month = date.substring(5, 7);
        let day = date.substring(8, 10);
        let mdy = month + '/' + day + '/' + year;

        return mdy
    }

    const showDelete = () => {
        if (userProfile.uid == post.user_id) {
            return <div className="postDelete" onClick={() => handleShow()}>delete post</div>
        }
    }

    if (post) {
        return (
            <div className="postPageWrapper">
                <div className="postContent">
                    <div className="postPageTitle">{post.title}</div>
                    <div className="postPageTS">{formatDate(post.date_created)}</div>
                    <div className="postPageAuthor">by {post.author}</div>
                    <div className="postPageBody">{post.body}</div>
                    {showDelete()}
                </div>
                <div className="postCommentWrapper">
                    <div className="commentTitle">Comments</div>
                    <CommentForm pid={post.pid}
                        handleRefresh={handleRefresh} />
                    <CommentList pid={post.pid}
                        refresh={refresh} 
                        handleRefresh={handleRefresh}/>
                </div>
                <DeletePost goHome={props.goHome}
                    show={show}
                    handleClose={handleClose}
                    pid={post.pid} />
            </div>

        )
    }
    else {
        return (
            <div className="postPageWrapper">
                Loading...
            </div>
        )
    }
}

export default Post