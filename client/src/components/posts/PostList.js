import React, { useEffect, useState } from 'react'
import '../../css/Post.css'
import PostPreview from './PostPreview'
import axios from 'axios'

const PostList = (props) => {

    const [pagination, setPagination] = useState(1);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        getPostData()
    }, [pagination])

    const getPostData = () => {
        axios.get('/api/get/postsfromdb', {
            params: {
                offset: (pagination - 1) * props.numposts,
                numposts: props.numposts
            }
        })
            .then((res) => {
                setPosts(res.data);
            })
            .catch(error => {
                console.log("error: " + error);
            })
    }

    const getPostPreviews = () => {
        let list = []
        if(posts !== null) {
            for (let i = 0; i < posts.length; i++) {
                list.push(
                    <PostPreview key={i} post={posts[i]} />
                )
            }
        }
        return list
    }

    return (
        <div className="postListWrapper">
            {getPostPreviews()}
        </div>
    )
}

export default PostList