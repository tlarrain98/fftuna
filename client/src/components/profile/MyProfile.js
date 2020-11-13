import React, { useContext } from 'react'
import '../../css/MyProfile.css'
import { UserContext } from '../../UserContext'
import axios from 'axios'

const MyProfile = () => {
    
    const { userProfile, setUserProfile } = useContext(UserContext);

    return(
        <div className="profileWrapper">
            <div className="username">{userProfile.username}&nbsp;</div>
            <div className="userBio">bio: test test test i'm writing things down here to test the bio div</div>
            <div className="userEdit">edit profile</div>
        </div>
    )
}

export default MyProfile