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
        const querySnapshot = await getDocs(collection(db, "tweets"))
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data())
          setTweets((prevTweets) => {
            return [...prevTweets, doc.data()]
          })
        })
      }

      console.log("use effect fired")
      getTweets()
    }
  }, [db])

  const tweetDivs = tweets.map((tweet, index) => {
    return <Tweet message={tweet.message} user={tweet.user} key={index} />
  })

  return (
    <div className="Timeline">
      <h3>Timeline content goes here</h3>
      {tweetDivs}
    </div>
  )
}

export default Timeline
