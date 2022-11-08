import React from "react"

function Tweet({ message, user, userImgURL, uploadImgUrl }) {
  //This component will populate timeline, be passed props for username and tweet message content (setup proptypes for this I suppose).
  //The data will be collected from the database in Timeline.js

  return (
    <div className="tweet">
      <img
        className="tweet__author-logo"
        alt="author logo"
        src={userImgURL}
        referrerPolicy="no-referrer"
      />
      <div className="tweet__main">
        <div className="tweet__header">
          <div className="tweet__author-name">{user}</div>
          <div className="tweet__author-slug">@placeholder</div>
          <div className="tweet__publish-time">38m</div>
        </div>
        <div className="tweet__content">{message}</div>
        {uploadImgUrl !== undefined && (
          <img
            className="tweet__image"
            src={uploadImgUrl}
            alt="user uploaded file"
          />
        )}
      </div>
    </div>
  )
}

export default Tweet
