import React, { useEffect } from 'react'
import '../../css/PostList.css'

// displays "previous" and "next" buttons below the post list
const PrevNext = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0); // not working for whatever reason
    })

    // if all the posts fit on one page, return nothing
    if (props.numPosts <= props.postsPerPage) {
        return <></>
    }
    // show prev but not next if on last page
    else if (props.pagination * props.postsPerPage > props.numPosts) {
        return (
            <div className="prevnext">
                <div className="prev" onClick={() => props.setPagination(props.pagination - 1)}>Previous page</div>
            </div>
        )
    }
    // if on the most current page, don't show prev
    else if (props.pagination === 1) {
        return (
            <div className="prevnext">
                <div className="next" onClick={() => props.setPagination(props.pagination + 1)}>Next page</div>
            </div>
        )
    }
    // any other case, show both
    else {
        return (
            <div className="prevnext">
                <div className="prev" onClick={() => props.setPagination(props.pagination - 1)}>Previous page</div>
                &emsp;
                <div className="next" onClick={() => props.setPagination(props.pagination + 1)}>Next page</div>
            </div>
        )
    }
}

export default PrevNext