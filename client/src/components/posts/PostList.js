import React, { useEffect, useState } from 'react'
import '../../css/Post.css'
import PostPreview from './PostPreview'
import axios from 'axios'

const PostList = (props) => {

    const [pagination, setPagination] = useState(1); // keeps track of the page #
    const [posts, setPosts] = useState(null); // used for post data

    // on page change, scroll to top and get data for page
    useEffect(() => {
        window.scrollTo(0, 0)
        getPostData();
    }, [pagination])

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

    // make sure that the prev and next page links displaying correctly
    const prevnext = () => {
        // if all the posts fit on one page, return nothing
        if (props.numPosts <= props.postsPerPage) {
            return
        }
        // show prev but not next if on last page
        else if (pagination * props.postsPerPage > props.numPosts) {
            return (
                <div className="prevnext">
                    <a className="prev" onClick={() => setPagination(pagination - 1)}>Previous page</a>
                </div>
            )
        }
        // if on the most current page, don't show prev
        else if (pagination === 1) {
            return (
                <div className="prevnext">
                    <a className="next" onClick={() => setPagination(pagination + 1)}>Next page</a>
                </div>
            )
        }
        // any other case, show both
        else {
            return (
                <div className="prevnext">
                    <a className="prev" onClick={() => setPagination(pagination - 1)}>Previous page</a>
                &emsp;
                    <a className="next" onClick={() => setPagination(pagination + 1)}>Next page</a>
                </div>
            )
        }
    }

    return (
        <div className="postListWrapper">
            {getPostPreviews()}
            {prevnext()}
        </div>
    )
}

export default PostList