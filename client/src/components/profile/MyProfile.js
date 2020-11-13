import React, { useContext, useState, useEffect } from 'react'
import '../../css/MyProfile.css'
import { UserContext } from '../../UserContext'
import axios from 'axios'
import EditProfile from './EditProfile'

// used to display user's profile on the home page
const MyProfile = () => {

    const [saved, setSaved] = useState(false);
    const [edit, setEdit] = useState(false);
    const { userProfile, setUserProfile } = useContext(UserContext);

    const isEdit = () => {
        // if in edit mode
        if (edit) {
            return <EditProfile setEdit={setEdit}/>
        }
        // else
        return(
            <div className="profileWrapper">
                <div className="username">{userProfile.username}&nbsp;</div>
                <div className="userBio">bio: test test test i'm writing things down here to test the bio div</div>
                <div className="userEdit" onClick={() => setEdit(true)}>edit profile</div>
            </div>
        )
    }
    return <>{ isEdit() }</>
}

export default MyProfile