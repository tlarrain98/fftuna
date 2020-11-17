import React, { useEffect, useState } from 'react'
import '../../css/ProfileComment.css'
import axios from 'axios'
import ProfileComment from './ProfileComment'
import zucc from '../../images/zucc.png'

const UserComments = (props) => {

    const [comments, setComments] = useState();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getUserComments();
    }, [props.refresh])

    const getUserComments = () => {
        axios.get('/api/get/commentsfromuser', {
            params: { uid: props.uid }
        })
            .then((res) => {
                setIsError(false);
                setComments(res.data);
            })
            .catch(() => {
                setIsError(true);
            })
    }

    const showComments = () => {
        // if the server couldn't retrieve comments
        if (isError) {
            return (
                <div className="errWrap">
                    <img src={zucc} alt="error" className="comZucc" />
                    <div className="noPC">Error while retrieving comments.</div>
                </div>
            )
        }
        if (comments) {
            // if no comments exist for the post
            if (!comments.length) {
                return <div className="pcNoComments">No comments.</div>
            }
            else {
                let list = [];
                for (let i = 0; i < comments.length; i++) {
                    list.push(
                        <ProfileComment key={i}
                            data={comments[i]}
                            goProfile={props.goProfile}
                            goPost={props.goPost}/>
                    )
                }
                return list
            }
        }
    }

    return (
        <>
            {showComments()}
        </>
    )
}

export default UserComments