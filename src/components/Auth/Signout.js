import React from 'react'

export default function Signout({token,isLoggedIn}) {
    return (
        <div>
            {
                !token || !isLoggedIn 
                ? <h1>You have signed out. Go back to <a href="/">signin page</a></h1>
                : null
            }
            
        </div>
    )
}
