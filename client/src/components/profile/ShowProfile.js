import React, { useEffect, useState } from 'react'
import '../../css/ShowProfile.css'
import axios from 'axios'

const ShowProfile = (props) => {
    
    const [profile, setProfile] = useState();
    const [error, setError] = useState();

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

    const formatDate = () => {

    }

    if (!profile) {
        return (
            <div className="spWrapper">
                <div className="spLoading">Loading...</div>
            </div>
        )
    }
    else if (true) {
        return(
            <div className="spWrapper">
                <div className="spError">Could not load profile, please refresh.</div>
            </div>
        )
    }
    else {
        return (
            <div className="spWrapper">
                <div className="spHeader">
                    <div className="spUsername">{profile.username}</div>
                    <div className="spBio">{profile.bio}</div>
                    <div>{formatDate(profile.date_created)}</div>
                    <div>{formatDate(profile.last_login)}</div>
                </div>
            </div>
        )
    }
}

export default ShowProfile