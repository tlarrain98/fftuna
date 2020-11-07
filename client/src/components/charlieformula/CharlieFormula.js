import React, {useState} from 'react'
import CreatePost from '../posts/CreatePost'
import '../../css/CharlieFormula.css'
import PostPreview from '../posts/PostPreview'
import PostList from '../posts/PostList'
import axios from 'axios'
const CharlieFormula = () => {

    const [numPosts, setNumPosts] = useState(0)

    const getNumPosts = () => {
        axios.get('/api/get/numpostsfromdb', {
            params: {
                pageName: "charlie"
            }
        })
            .then(res => {
                setNumPosts(res.data[0].count)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="charlieWrapper">
            {getNumPosts()}
            <div className="headerWrapper">
                <div className="charlieHeader">The Charlie Formula</div>
                <div className="postWrapper">
                    <CreatePost pageName="charlie" />
                </div>
            </div>
            {/* <div className="charliePost">
                <PostList postsPerPage={5}
                    numPosts={numPosts}
                    pageName="charlie"/>
            </div> */}
        </div>
    )
}

export default CharlieFormula;