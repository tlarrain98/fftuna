import React, { useEffect, useState } from 'react'
import '../../css/ShowProfile.css'
import axios from 'axios'
import zucc from '../../images/zucc.png'

const ShowProfile = (props) => {
    
    const [profile, setProfile] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        getUser();
    }, [])

    const getUser = () => {
        axios.get('/api/get/userbyuid', {
            params: { uid: props.uid }
        })
            .then(res => {
                setProfile(res.data[0]);
            })
            .catch(err => {
                setError(true);
                console.log(err);
            })
    }

    // formats date into MM/DD/YYYY
    const formatDate = (date) => {
        let year = date.substring(0, 4);
        let month = date.substring(5, 7);
        let day = date.substring(8, 10);
        let mdy = month + '/' + day + '/' + year;

        return mdy
    }

    if (!profile) {
        return (
            <div className="spWrapper">
                <div className="spLoading">Loading...</div>
            </div>
        )
    }
    else if (error) {
        return(
            <div className="spWrapper">
                <div className="errWrap">
                    <img src={zucc} alt="error" className="spZucc" />
                    <div className="spError">Could not load profile, please refresh.</div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="spWrapper">
                <div className="spHeader">
                    <div className="spUsername">{profile.username}</div>
                    <div className="spDates">date created: {formatDate(profile.date_created)}</div>
                    <div className="spDates">last online: {formatDate(profile.last_login)}</div>
                    <div className="spBio">{profile.bio}</div>
                </div>
                <div className="spPC">
                    <div className="spPosts">Recent posts</div>
                    <div className="spComments">Recent comments</div>
                </div>
            </div>
        )
    }
}

export default ShowProfile