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
import "./css/blocks/layout.css"
import "./css/blocks/brand.css"
import twitterSVG from "./svg/twitter.svg"

function App() {
  const [displayName, setDisplayName] = useState()

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
      setDisplayName(newDisplayName)
    } else {
      const newDisplayName = undefined
      setDisplayName(newDisplayName)
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
        <img src={twitterSVG} alt="twitter icon" className="brand" />
        Left sidebar
      </div>
      <div className="layout__main">
        Main Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        imperdiet elit ac aliquam sodales. Cras scelerisque ornare rhoncus.
        Maecenas ut vehicula lorem. In facilisis risus sem, sed suscipit massa
        convallis non. Morbi vel risus quis neque tincidunt iaculis et eu
        sapien. In non tristique nisl, pretium placerat erat. Maecenas nulla
        est, fermentum sed tempus in, sollicitudin a nisi. Aliquam finibus
        rhoncus maximus. Morbi eget orci sit amet elit blandit tincidunt.
        Vivamus feugiat quis velit vel accumsan. Cras pharetra, diam luctus
        fermentum ultricies, nisl sem auctor massa, vel tincidunt risus odio nec
        velit. Proin faucibus vehicula est in varius. Pellentesque nulla mauris,
        consequat gravida blandit efficitur, sodales sit amet sem. Nullam
        congue, ex in vehicula luctus, diam velit egestas est, vel aliquam mi
        nibh sollicitudin nunc. Donec ultrices, lorem a eleifend ultricies,
        lacus tellus ullamcorper erat, in rutrum elit arcu eget ligula. Etiam
        sollicitudin lorem vel hendrerit porttitor. Sed a tortor aliquam, tempor
        ligula fringilla, hendrerit nulla. Donec ut leo dui. Nulla facilisi.
        Nulla ac augue non sapien cursus commodo. Nam suscipit imperdiet
        hendrerit. Integer mollis vehicula vulputate. Nulla neque mauris,
        consectetur nec nulla accumsan, aliquet maximus elit. Curabitur eget
        erat sapien. Sed a arcu dolor. Aliquam condimentum lectus purus, eget
        euismod mi tincidunt a. Quisque eu nibh varius, bibendum libero quis,
        aliquet leo. Vestibulum vel ultricies purus, in porta erat. Etiam
        venenatis dui vestibulum lorem dictum, sit amet faucibus nulla suscipit.
        Fusce hendrerit sed ipsum sit amet sagittis. Donec eu egestas purus,
        quis mattis libero. Praesent quis diam fringilla, maximus leo in,
        viverra nisi. Integer euismod mi id massa venenatis, auctor fermentum
        purus ultricies. Praesent vel dolor eget velit mollis tempor. Donec
        rutrum ipsum sed mi rhoncus, eu molestie massa dapibus. Sed vehicula et
        ligula sed aliquam. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Mauris blandit ipsum sit amet sapien dapibus semper. Integer
        ultrices metus sit amet leo ornare eleifend. Phasellus pretium
        ullamcorper nisl id elementum. Cras varius quam arcu, sed pharetra risus
        gravida at. Vivamus mattis risus nec varius ultricies. Quisque in
        iaculis arcu, sed feugiat odio. Suspendisse eget porta tellus, a
        molestie orci. Etiam euismod, nisl nec scelerisque eleifend, augue urna
        elementum ipsum, eu dapibus nunc lectus eu mi. Etiam ornare at lorem
        vitae hendrerit. Suspendisse pellentesque libero nec lacinia congue.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo
        felis vitae est egestas pretium. Aliquam orci diam, eleifend euismod
        semper id, luctus ut mi. Sed egestas tempor tellus, ac fermentum eros
        finibus a. Aliquam ut cursus lectus, at ornare metus. In hac habitasse
        platea dictumst. Morbi fermentum, ex vel ultricies lacinia, ex orci
        dictum risus, at porttitor erat orci nec metus.{" "}
      </div>
      <div className="layout__right-sidebar-container">
        <div className="layout__right-sidebar">Right sidebar</div>
      </div>
      <div className="App">
        <p>Twitter ^_^</p>
        <button onClick={signInWithGoogle}>Sign in</button>
        <button onClick={signOutWithGoogle}>Sign out</button>
        <ComposeWindow db={db} displayName={displayName} />
        <Timeline db={db} />
      </div>
    </div>
  )
}

export default App

//Next is at least starting the html and css layout
//Proptypes when props become more complex !! user authentication works for now but will be improved soon.

//Setup the ability to compose a tweet, have it store in database, and have it show up on Timeline.

//Functionality to add:

//Composing tweets
//...Tweets are stored in documents based on user and displayed for those following each user?
//...Or I have a universal timeline instead and a fake following feature that does nothing but shows you who you're following

//Ability to set a profile, including a pfp

//DM's maybe?

//Notifications
