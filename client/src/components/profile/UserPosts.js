import React, { useEffect, useState } from 'react'
import '../../css/PostList.css'
import PostPreview from '../posts/PostPreview'
import axios from 'axios'
import zucc from '../../images/zucc.png'

const UserPosts = (props) => {

    const [posts, setPosts] = useState(null); // used for post data
    const [empty, setEmpty] = useState(false); // if no posts returned
    const [error, setError] = useState(false); // displays error

    // on page change, scroll to top and get data for page
    useEffect(() => {
        getUserPosts();
    }, [])

    // set the post data for the current page
    const getUserPosts = () => {
        axios.get('/api/get/postsfromuser', {
            params: {
                uid: props.uid
            }
        })
            .then((res) => {
                if (res.data.length) {
                    setPosts(res.data);
                    setEmpty(false);
                }
                else {
                    setEmpty(true);
                }
            })
            .catch(error => {
                setError(true);
            })
    }

    // returns a list of all the post preview components for the page
    const getPostPreviews = () => {
        let list = [];
        if (error) {
            return (
                <div className="errWrap">
                    <img src={zucc} alt="error" className="plZucc" />
                    <div className="plError">Error loading post list, please refresh.</div>
                </div>
            )
        }
        else if (empty) {
            return <div className="noPosts">No posts.</div>
        }
        else if (posts == null && !empty) {
            return <div>Loading...</div>
        }
        else if (posts !== null) {
            for (let i = 0; i < posts.length; i++) {
                list.push(
                    <PostPreview key={i}
                        post={posts[i]}
                        goPost={props.goPost}
                        goProfile={props.goProfile} />
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

export default UserPosts