import React from "react"

function Tweet({ message, user }) {
  //This component will populate timeline, be passed props for username and tweet message content (setup proptypes for this I suppose).
  //The data will be collected from the database in Timeline.js

  return (
    <div className="Tweets">
      <h1>{user}</h1>
      <p>{message}</p>
    </div>
  )
}

export default Tweet
