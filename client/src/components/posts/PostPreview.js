import React from 'react'
import '../../css/Post.css'
import Card from 'react-bootstrap/Card'

const PostPreview = (props) => {

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
        <div className="postPreview">
            <Card>
                <Card.Body>
                    <div className="postTitle">{props.post.title}</div>
                    <div className="postAuthor">by {props.post.author}</div>
                    <div className="postBody">{displayBody()}</div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PostPreview