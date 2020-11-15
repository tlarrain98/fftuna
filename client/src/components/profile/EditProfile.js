import React, { useContext, useEffect, useState } from 'react'
import '../../css/MyProfile.css'
import { UserContext } from '../../UserContext'
import axios from 'axios'

const EditProfile = (props) => {

    const { userProfile, setUserProfile } = useContext(UserContext);
    const [warning, setWarning] = useState(null);
    const [count, setCount] = useState(userProfile.username.length);

    useEffect(() => {
        // set forms to existing values
        if (userProfile) {
            document.getElementById("profileUserForm").value = userProfile.username;
            document.getElementById("profileBioForm").value = userProfile.bio;
        }
    }, [])

    const saveProfile = () => {
        let data = {
            uid: userProfile.uid,
            username: document.getElementById("profileUserForm").value.trim(),
            bio: document.getElementById("profileBioForm").value.trim()
        }
        // if values are okay, make changes
        if (data.username && data.username.length <= 25) {
            setWarning(null);
            axios.put('/api/put/username', data)
                .then(() => {
                    axios.get('/api/get/userfromdb', {
                        params: { email: userProfile.email }
                    })
                        .then(res => {
                            setUserProfile(res.data[0]);
                            props.setEdit(false);
                        })
                        .catch(err => {
                            console.log(err);
                            setWarning("Server error, please refresh.");
                        })
                })
                    .catch(err => {
                        if (err.response.status === 500) {
                            setWarning("This username has been taken.");
                        }
                        else {
                            setWarning("Server error: please refresh.");
                        }
                    })
        }
        // else, display warning
        else {
            setWarning("Please set username.");
        }
    }

    const textCounter = () => {
        setCount(document.getElementById('profileUserForm').value.trim().length);
    }

    return (
        <div className="profileWrapper">
            <div className="profileEdits">
                <div className="profileLabels">Username: </div>
                <textarea className="profileForms" id="profileUserForm" 
                    rows={1} onChange={() => textCounter()}/>
                    <div className="profileCounter">{count}/25</div>
                <div className="profileLabels">Bio: </div>
                <textarea className="profileForms" id="profileBioForm" rows={4} />
            </div>
            <div className="profileWarning">{warning}</div>
            <div className="profileButtons">
                <button className="saveProfileButton" onClick={() => saveProfile()}>
                    Save
                </button>
                <button className="cancelProfileButton" onClick={() => props.setEdit(false)}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default EditProfile