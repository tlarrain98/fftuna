import React, { useEffect, useState } from 'react'
import '../../css/Post.css'
import axios from 'axios'

const Post = (props) => {

    const [post, setPost] = useState();

    useEffect(() => {
        getPost()
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

    if (post) {
        return (
            <div className="postPageWrapper">
                <div className="postPageTitle">{post.title}</div>
                <div className="postPageAuthor">{post.author}</div>
                <div className="postPageBody">{post.body}</div>
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