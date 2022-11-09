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
          const docInfo = {
            id: doc.id,
            data: doc.data(),
          }
          tempArr.push(docInfo)
        })
        setTweets(tempArr)
      }

      console.log("use effect fired -- fetching tweets")
      getTweets()
    }
  }, [db])

  const tweetDivs = tweets.map((tweet, index) => {
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
