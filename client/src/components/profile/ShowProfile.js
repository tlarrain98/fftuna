import React, { useEffect, useState } from 'react'
import '../../css/ShowProfile.css'
import axios from 'axios'
import zucc from '../../images/zucc.png'
import UserPosts from './UserPosts'
import UserComments from './UserComments'

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

    const getDates = () => {
        if (profile.date_created && profile.last_login) {
            return (
                <>
                    <div className="spDates">date created: {formatDate(profile.date_created)}</div>
                    <div className="spDates">last online: {formatDate(profile.last_login)}</div>
                </>
            )
        }
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
        return (
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
                <div className="pCol1">
                    <div className="spHeader">
                        <div className="spUsername">{profile.username}</div>
                        {getDates()}
                        <div className="spBio">{profile.bio}</div>
                    </div>
                    <div className="spPosts">
                        <div className="spPostsTitle">Recent posts</div>
                        <UserPosts uid={props.uid}
                            goProfile={props.goProfile}
                            goPost={props.goPost} />
                    </div>
                </div>
                <div className="pCol2">
                    <div className="spComments">
                        <div className="spCommentsTitle">Recent comments</div>
                        <UserComments uid={props.uid}
                            goProfile={props.goProfile}
                            goPost={props.goPost} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowProfile