import { doc, getDocs, collection } from "firebase/firestore"
import { useEffect } from "react"
import React, { useState } from "react"
import Tweet from "./Tweet"

let didInit = false

function Timeline({ db }) {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    if (!didInit) {
      didInit = true
      async function getTweets() {
        console.log("getTweets() ran")
        const tempArr = []
        const querySnapshot = await getDocs(collection(db, "tweets"))
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data())
          tempArr.push(doc.data())
        })
        setTweets(tempArr)
      }

      console.log("use effect fired -- fetching tweets")
      getTweets()
    }
  }, [db])

  const tweetDivs = tweets.map((tweet, index) => {
    // console.log({
    //   message: tweet.message,
    //   uploadImgURL: tweet.imageUrl,
    // })
    return (
      <Tweet
        message={tweet.message}
        user={tweet.user}
        userImgURL={tweet.userPhotoURL}
        uploadImgURL={tweet.imageURL}
        key={index}
      />
    )
  })

  return <div className="Timeline">{tweetDivs}</div>
}

export default Timeline
