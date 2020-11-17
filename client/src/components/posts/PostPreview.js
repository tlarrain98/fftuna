import React from 'react'
import '../../css/PostPreview.css'
import LikeDislike from './LikeDislike'

const PostPreview = (props) => {

    // cut off long bodies so that the preview isn't too big
    const displayBody = () => {
        let body = props.post.body;
        body.replace(/[\r\n]+/g, " "); // newlines are only counted as one character so we need to
        if(body.length > 355) {        // replace them with spaces so that the card isn't too long
            body = body.substring(0, 350);
            body += '...'
        }
        return body
    }

    return(
        <div className="previewWrapper">
            <LikeDislike post={props.post}/>
            <div className="previewContent">
                <div className="previewTitle" onClick={() => props.goPost(props.post.pid)}>
                    {props.post.title}        
                </div>
                <div className="previewAuthor" 
                    onClick={() => props.goProfile(props.post.user_id)}>
                    {props.post.author}
                </div>
                <div className="previewBody">{displayBody()}</div>
            </div>
        </div>
    )
}

export default PostPreview