import React, { useEffect, useState } from 'react'
import '../../css/Post.css'
import axios from 'axios'
import CommentForm from '../comments/CommentForm'
import CommentList from '../comments/CommentList'

const Post = (props) => {

    const [post, setPost] = useState(); // used to set and store post data

    // get post data on load
    useEffect(() => {
        getPost();
    }, [])

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
    const formatDate = (temp) => {
        let year = temp.substring(0, 4);
        let month = temp.substring(5, 7);
        let day = temp.substring(8, 10);
        let date = month + '/' + day + '/' + year

        return date
    }

    if (post) {
        return (
            <div className="postPageWrapper">
                <div className="postContent">
                    <div className="postPageTitle">{post.title}</div>
                    <div className="postPageTS">posted on {formatDate(post.date_created)}</div>
                    <div className="postPageAuthor">by {post.author}</div>
                    <div className="postPageBody">{post.body}</div>
                </div>
                <div className="postCommentWrapper">
                    <div className="commentTitle">Comments</div>
                    <CommentForm pid={props.pid}/>
                    <CommentList pid={props.pid}/>
                </div>
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