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
                <Card.Header>{props.post.author} posted:</Card.Header>
                <Card.Body>
                    <Card.Title>{props.post.title}</Card.Title>
                    {displayBody()}
                </Card.Body>
            </Card>
        </div>
    )
}

export default PostPreview