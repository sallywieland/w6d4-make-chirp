import React from 'react'


const OtherUser = (props) => (
    <div className="individual_users">
        <input type="button" onClick={props.addUser} value="Follow"/>
        {/* <span className={props.data.following?'following':''}> */}
        {props.data.firstname} {props.data.lastname} {props.data.username}
        {/* </span> */}
    </div>
)



export default OtherUser
