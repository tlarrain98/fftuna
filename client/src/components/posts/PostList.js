import React, { useEffect, useState } from 'react'
import '../../css/PostList.css'
import PostPreview from './PostPreview'
import PrevNext from './PrevNext'
import axios from 'axios'

const PostList = (props) => {

    const [pagination, setPagination] = useState(1); // keeps track of the page #
    const [posts, setPosts] = useState(null); // used for post data

    // on page change, scroll to top and get data for page
    useEffect(() => {
        getPostData();
    }, [pagination, props.refresh])

    // set the post data for the current page
    const getPostData = () => {
        axios.get('/api/get/postsfromdb', {
            params: {
                offset: (pagination - 1) * props.postsPerPage,
                postsPerPage: props.postsPerPage,
                pageName: props.pageName
            }
        })
            .then((res) => {
                setPosts(res.data);
            })
            .catch(error => {
                console.log("error: " + error);
            })
    }

    // returns a list of all the post preview components for the page
    const getPostPreviews = () => {
        let list = []
        if (posts !== null) {
            for (let i = 0; i < posts.length; i++) {
                list.push(
                    <PostPreview key={i} 
                        post={posts[i]}
                        goPost={props.goPost}/>
                )
            }
        }
        return list
    }

    return (
        <div className="postListWrapper">
            {getPostPreviews()}
            <PrevNext numPosts={props.numPosts}
                postsPerPage={props.postsPerPage}
                pagination={pagination}
                setPagination={setPagination}/>
        </div>
    )
}

export default PostList