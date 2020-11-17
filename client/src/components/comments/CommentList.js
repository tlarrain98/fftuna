import React, { useEffect, useState } from 'react'
import '../../css/Comment.css'
import axios from 'axios'
import Comment from './Comment'
import zucc from '../../images/zucc.png'

const CommentList = (props) => {

    const [comments, setComments] = useState();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getComments();
    }, [props.refresh])

    const getComments = () => {
        axios.get('/api/get/commentsonpost', {
            params: { pid: props.pid }
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
                    <img src={zucc} alt="error" className="comZucc"/>
                    <div className="errorComments">Error while retrieving comments.</div>
                </div>
            )
        }
        if (comments) {
            // if no comments exist for the post
            if (!comments.length) {
                return <div className="noComments">No comments.</div>
            }
            else {
                let list = [];
                for (let i = 0; i < comments.length; i++) {
                    list.push(
                        <Comment key={i} 
                            data={comments[i]}
                            handleRefresh={props.handleRefresh}
                            goProfile={props.goProfile}/>
                    )
                }
                return list
            }
        }
    }

    return (
        <div className="commentList">
            {showComments()}
        </div>
    )
}

export default CommentList