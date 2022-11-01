import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth"
import ComposeWindow from "./components/ComposeWindow"
import Timeline from "./components/Timeline"

function App() {
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
    <div className="App">
      <p>Twitter ^_^</p>
      <button onClick={signInWithGoogle}>Sign in</button>
      <button onClick={signOutWithGoogle}>Sign out</button>
      <ComposeWindow db={db} />
      <Timeline />
    </div>
  )
}

export default App

//Proptypes !! and User authentication next !!

//Setup the ability to compose a tweet, have it store in database, and have it show up on Timeline.

//Functionality to add:

//Composing tweets
//...Tweets are stored in documents based on user and displayed for those following each user?
//...Or I have a universal timeline instead and a fake following feature that does nothing but shows you who you're following

//Ability to set a profile, including a pfp

//DM's maybe?

//Notifications
