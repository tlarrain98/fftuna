import React, { useState, useEffect, useContext } from 'react'
import '../../css/LikeDislike.css'
import { UserContext } from '../../UserContext'
import axios from 'axios'

const LikeDislike = (props) => {

    const [score, setScore] = useState(0); // displays score
    const [lod, setLod] = useState(0); // keeps track of whether use has liked or disliked post
    const { userProfile } = useContext(UserContext);

    useEffect(() => {
        setScore(props.post.likes - props.post.dislikes);
        checkLikes();
    }, [props.post])

    const checkLikes = () => {
        if (props.post.like_user_id.includes(userProfile.uid)) {
            console.log("liked!!!!!!!!")
            setLod(1);
        }
        else if (props.post.dislike_user_id.includes(userProfile.uid)) {
            console.log("dislikeeeeeeeeeeeeee")
            setLod(-1);
        }
    }

    // if already liked, remove like, else add like
    const handleLikes = () => {
        if (lod == 1) { // already liked, remove like
            removeLike();
        }
        else if (lod == 0) { // no likes or dislikes, add like
            addLike();
        }
        else { // was disliked, remove dislike and add like
            removeDislike();
            addLike();
        }
    }

    const handleDislikes = () => {
        if (lod == -1) { // if already disliked, remove dislike
            removeDislike();
        }
        else if (lod == 0) { // no likes or dislikes, add like
            addDislike();
        }
        else { // was liked, remove like and add dislike
            removeLike();
            addDislike();
        }
    }

    // these 4 functions are used to add/remove likes/dislikes from the post
    const addLike = () => {
        let data = {
            uid: userProfile.uid,
            offset: 1,
            pid: props.post.pid
        }
        axios.put('/api/put/likes', data)
            .then(res => {
                // console.log(res);
                props.setLikeRefresh(true); // refresh the page
            })
            .catch(err => {
                console.log(err);
            })
    }

    const removeLike = () => {
        let data = {
            uid: userProfile.uid,
            offset: -1,
            pid: props.post.pid
        }
        axios.put('/api/put/likes', data)
            .then(res => {
                // console.log(res);
                props.setLikeRefresh(true); // refresh the page
            })
            .catch(err => {
                console.log(err);
            })
    }

    const addDislike = () => {
        let data = {
            uid: userProfile.uid,
            offset: 1,
            pid: props.post.pid
        }
        axios.put('/api/put/dislikes', data)
            .then(res => {
                // console.log(res);
                props.setLikeRefresh(true); // refresh the page
            })
            .catch(err => {
                console.log(err);
            })
    }

    const removeDislike = () => {
        let data = {
            uid: userProfile.uid,
            offset: -1,
            pid: props.post.pid
        }
        axios.put('/api/put/dislikes', data)
            .then(res => {
                // console.log(res);
                props.setLikeRefresh(true); // refresh the page
            })
            .catch(err => {
                console.log(err);
            })
    }

    const displayLikeDislike = () => {
        // not liked or disliked
        if (lod == 0) {
            return (
                <div className="updown">
                    <div className="up" onClick={() => handleLikes()}>
                        like
                    </div>
                    <div className="down" onClick={() => handleDislikes()}>
                        dislike
                    </div>
                </div>
            )
        }
        // user has liked
        else if (lod == 1) {
            return(
                <div className="updown">
                    <div className="up" onClick={() => handleLikes()}>
                        like
                    </div>
                    <div className="down" onClick={() => handleDislikes()}>
                        dislike
                    </div>
                </div>
            )
        }
        // user has disliked
        else if (lod == -1) {
            return(
                <div className="updown">
                    <div className="up" onClick={() => handleLikes()}>
                        like
                    </div>
                    <div className="down" onClick={() => handleDislikes()}>
                        dislike
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="ldWrapper">
            {displayLikeDislike()}
            <div className="score">
                {score}
            </div>
        </div>
    )
}

export default LikeDislike