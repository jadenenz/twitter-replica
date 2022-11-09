import React, { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import likeSVG from "../svg/like.svg"

function Tweet({ message, user, userImgURL, uploadImgURL, likes, id, db }) {
  const [tweetLiked, setTweetLiked] = useState(false)

  const tweetRef = doc(db, "tweets", `${id}`)

  async function handleLikeButton() {
    if (!tweetLiked) {
      await updateDoc(tweetRef, {
        likes: likes + 1,
      })
    } else if (tweetLiked) {
      await updateDoc(tweetRef, {
        likes: likes,
      })
    }
    setTweetLiked(!tweetLiked)
  }

  const heartClasses = tweetLiked
    ? "tweet__heart-svg tweet__heart-svg-filled"
    : "tweet__heart-svg"

  const likeNumberClasses = tweetLiked
    ? "tweet__likes-number tweet__likes-number-red"
    : "tweet__likes-number"

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
          <div className="tweet__author-slug">@{user}</div>
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
        <div onClick={handleLikeButton} className="tweet__likes">
          <img className={heartClasses} src={likeSVG} alt="heart" />
          <div className={likeNumberClasses}>
            {tweetLiked ? likes + 1 : likes}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
