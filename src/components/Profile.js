import React, { useState } from "react"
import { updateProfile } from "firebase/auth"
import {
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  ref,
} from "firebase/storage"

function Profile({ userDisplayName, authentication }) {
  const [inputData, setInputData] = useState("")

  const [currentUploadedImage, setCurrentUploadedImage] = useState()

  const handleChange = (e) => {
    setInputData(e.target.value)
  }

  const handleSubmitChanges = () => {
    updateProfile(authentication.currentUser, {
      displayName: inputData,
    })
      .then(() => {
        console.log("display name changed to:", inputData)
      })
      .catch((error) => {
        console.error("An error has occured:", error)
      })

    if (currentUploadedImage) {
      handleImageUpload()
    }
  }

  const handleProcessingImage = (e) => {
    const newImage = e.target.files[0]
    setCurrentUploadedImage(newImage)
  }

  async function handleImageUpload() {
    const storage = getStorage()
    if (!currentUploadedImage) alert("Please choose a file first!")

    try {
      const filePath = `${authentication.currentUser.uid}/${currentUploadedImage.name}`
      const newImageRef = ref(storage, filePath)
      const fileSnapshot = await uploadBytesResumable(
        newImageRef,
        currentUploadedImage
      )

      //generate public URL for the file
      const publicImageURL = await getDownloadURL(newImageRef)

      //Update profile with image's URL
      updateProfile(authentication.currentUser, {
        photoURL: publicImageURL,
      })
        .then(() => {
          console.log("Photo successfully updated")
        })
        .catch((error) => {
          console.error(
            "There was an error changing the profile picture:",
            error
          )
        })
    } catch (error) {
      console.error(
        "There was an error uploading a file to Cloud Storage:",
        error
      )
    }
  }

  return (
    <div className="profile">
      <div className="profile__header"> Change your profile</div>
      <div className="profile__account-properties-list">
        <div className="profile__profile-picture"></div>
        <div className="profile__display-name">
          <input
            value={inputData}
            type="text"
            id="display-name"
            placeholder={userDisplayName}
            onChange={handleChange}
          />
        </div>
        <div className="profile__profile-picture">
          <input
            id="file-input"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleProcessingImage}
          />
        </div>
      </div>
      <button onClick={handleSubmitChanges}>Submit changes</button>
    </div>
  )
}

export default Profile
