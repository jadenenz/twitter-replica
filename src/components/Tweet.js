import React from "react"

function Tweet({ message, user, userImgURL, uploadImgURL }) {
  // const lookInside = {
  //   message: message,
  //   user: user,
  //   userImgURL: userImgURL,
  //   uploadImgUrl: uploadImgUrl,
  // }

  // console.log(lookInside)

  console.log(message, uploadImgURL, userImgURL)

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
        {uploadImgURL && (
          <img
            className="tweet__image"
            src={uploadImgURL}
            alt="user uploaded file"
          />
        )}
      </div>
    </div>
  )
}

export default Tweet
