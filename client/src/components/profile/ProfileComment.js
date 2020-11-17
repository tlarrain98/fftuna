import React from 'react'
import '../../css/ProfileComment.css'

const ProfileComment = (props) => {

    return (
        <div className="pcWrapper" onClick={() => props.goPost(props.data.post_id)}>
            <div className="pcContent">
                <div className="pcAuthor"
                    onClick={() => props.goProfile(props.data.user_id)}>
                    {props.data.author}
                </div>
                <div className="pcText">{props.data.comment}</div>
            </div>
        </div>
    )
}

export default ProfileComment