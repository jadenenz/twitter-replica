import React from "react"
import Tweet from "./Tweet"

function Timeline({ db, tweets, searchTerm }) {
  const tweetDivs = tweets
    .filter((tweet) => {
      if (searchTerm === "") {
        return tweet
      } else if (
        tweet.data.message.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return tweet
      }
    })
    .map((tweet, index) => {
      return (
        <Tweet
          message={tweet.data.message}
          user={tweet.data.user}
          userImgURL={tweet.data.userPhotoURL}
          uploadImgURL={tweet.data.imageURL}
          key={index}
          likes={tweet.data.likes}
          id={tweet.id}
          db={db}
        />
      )
    })

  return <div className="Timeline">{tweetDivs}</div>
}

export default Timeline

// function Timeline({ db, tweets }) {
//   const tweetDivs = tweets.map((tweet, index) => {
//     return (
//       <Tweet
//         message={tweet.data.message}
//         user={tweet.data.user}
//         userImgURL={tweet.data.userPhotoURL}
//         uploadImgURL={tweet.data.imageURL}
//         key={index}
//         likes={tweet.data.likes}
//         id={tweet.id}
//         db={db}
//       />
//     )
//   })
