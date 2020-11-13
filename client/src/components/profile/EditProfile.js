import React, { useContext } from 'react'
import '../../css/MyProfile.css'
import { UserContext } from '../../UserContext'
import axios from 'axios'

const EditProfile = (props) => {

    return(
        <div className="profileWrapper">
            <div className="profileButtons">
                <button className="saveProfileButton">
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