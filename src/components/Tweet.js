import React, { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import likeSVG from "../svg/like.svg"

function Tweet({
  message,
  user,
  userImgURL,
  uploadImgURL,
  likes,
  id,
  db,
  timestamp,
}) {
  const [tweetLiked, setTweetLiked] = useState(false)

  const tweetRef = doc(db, "tweets", `${id}`)

  async function handleLikeButton() {
    if (!tweetLiked) {
      await updateDoc(tweetRef, {
        likes: likes + 1,
      })
    } else if (tweetLiked) {
      await updateDoc(tweetRef, {
        likes: likes - 1,
      })
    }
    setTweetLiked(!tweetLiked)
  }

  // const testTimestampToDate = timestamp?.toDate()

  // const startTime = Date.now()
  // const endTime = testTimestampToDate

  // console.log(`Elapsed time: ${String(endTime - startTime)} milliseconds`)

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
          <div className="tweet__publish-time">
            {timestamp ? timestamp.toDate().toDateString() : "Wed Nov 08 2022"}
          </div>
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
          <div className={likeNumberClasses}>{likes}</div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
