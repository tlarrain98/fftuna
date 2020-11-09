import React, {useState} from 'react'
import CreatePost from '../posts/CreatePost'
import '../../css/CharlieFormulaPage.css'
import axios from 'axios'
const CharlieFormulaPage = () => {

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
                <div className="charlieSubtitle">by Charlie Keefe</div>
                <div className="postWrapper">
                    <CreatePost pageName="charlie" />
                </div>
            </div>
        </div>
    )
}

export default CharlieFormulaPage;