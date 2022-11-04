import React, { useState } from "react"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import ComposeWindow from "./components/ComposeWindow"
import Timeline from "./components/Timeline"
import RightSidebar from "./components/RightSidebar"
import "./css/global.css"
import "./css/blocks/layout.css"
import "./css/blocks/brand.css"
import "./css/blocks/sidebar-menu.css"
import "./css/blocks/tweet.css"
import "./css/blocks/trends-for-you.css"
import "./css/blocks/compose-window.css"
import twitterSVG from "./svg/twitter.svg"
import homeSVG from "./svg/home.svg"
import exploreSVG from "./svg/explore.svg"
import messagesSVG from "./svg/messages.svg"
import moreSVG from "./svg/more.svg"
import notificationsSVG from "./svg/notifications.svg"
import profileSVG from "./svg/profile.svg"
function App() {
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    photoURL: "",
  })

  const firebaseConfig = {
    apiKey: "AIzaSyAb0LqPzcFSz5CViR6Cf20PXHiyanOEN14",

    authDomain: "twitter-replica-2d303.firebaseapp.com",

    projectId: "twitter-replica-2d303",

    storageBucket: "twitter-replica-2d303.appspot.com",

    messagingSenderId: "615991751229",

    appId: "1:615991751229:web:a38156eed94a3bc2027054",
  }

  // Initialize Firebase

  const app = initializeApp(firebaseConfig)

  // Initialize cloud firestore and get a reference to the service
  const db = getFirestore(app)

  //Initialize firebase authentication
  const authentication = getAuth()

  onAuthStateChanged(authentication, (user) => {
    if (user) {
      //User is signed in
      const newDisplayName = user.displayName
      const newPhotoURL = user.photoURL
      setUserInfo({
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      })
    } else {
      setUserInfo({
        displayName: undefined,
        photoURL: undefined,
      })
    }
  })

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(authentication, provider)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const signOutWithGoogle = () => {
    signOut(authentication)
      .then(() => {
        console.log("sign out successful")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="layout">
      <div className="layout__left-sidebar">
        <button onClick={signInWithGoogle}>Sign in</button>
        <button onClick={signOutWithGoogle}>Sign out</button>
        <img src={twitterSVG} alt="twitter icon" className="brand" />
        <div className="sidebar-menu">
          <div className="sidebar-menu__item sidebar-menu__item--active">
            <img
              src={homeSVG}
              alt="home icon"
              className="sidebar-menu__item-icon"
            />
            Home
          </div>
          <div className="sidebar-menu__item">
            <img
              src={exploreSVG}
              alt="explore icon"
              className="sidebar-menu__item-icon"
            />
            Explore
          </div>
          <div className="sidebar-menu__item">
            <img
              src={notificationsSVG}
              alt="notifications icon"
              className="sidebar-menu__item-icon"
            />
            Notifications
          </div>
          <div className="sidebar-menu__item">
            <img
              src={messagesSVG}
              alt="messages icon"
              className="sidebar-menu__item-icon"
            />
            Messages
          </div>
          <div className="sidebar-menu__item">
            <img
              src={profileSVG}
              alt="profile icon"
              className="sidebar-menu__item-icon"
            />
            Profile
          </div>
          <div className="sidebar-menu__item">
            <img
              src={moreSVG}
              alt="more icon"
              className="sidebar-menu__item-icon"
            />
            More
          </div>
        </div>
      </div>
      <div className="layout__main">
        <div className="App">
          <ComposeWindow db={db} userInfo={userInfo} />
          <Timeline db={db} />
        </div>
      </div>
      <RightSidebar />
    </div>
  )
}

export default App

//Figure out how to manipulate images uploaded by input: file for tweeting pictures!!!
//Proptypes when props become more complex !! user authentication works for now but will be improved soon.

//Setup the ability to compose a tweet, have it store in database, and have it show up on Timeline.

//Functionality to add:

//Composing tweets
//...Tweets are stored in documents based on user and displayed for those following each user?
//...Or I have a universal timeline instead and a fake following feature that does nothing but shows you who you're following

//Ability to set a profile, including a pfp

//DM's maybe?

//Notifications
