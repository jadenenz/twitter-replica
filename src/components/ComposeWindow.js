import React, { useState } from "react"
import {
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import imageSVG from "../svg/image.svg"

function ComposeWindow({ db, userInfo, authentication }) {
  const [formData, setFormData] = useState({
    message: "",
  })

  const [currentUploadedImage, setCurrentUploadedImage] = useState()

  //Init firebase storage
  const storage = getStorage()

  const resetFormData = () => {
    setFormData({
      message: "",
    })
  }

  const resetCurrentUploadedImage = () => {
    setCurrentUploadedImage()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "tweets"), {
        user: userInfo.displayName,
        message: formData.message,
        userPhotoURL: userInfo.photoURL,
        timestamp: serverTimestamp(),
        likes: 0,
      })
      // console.log("Doccument written with ID: ", docRef.id)
      //If the tweet has an attached image
      if (currentUploadedImage) {
        handleImageUpload(docRef)
      }
    } catch (e) {
      console.error("Error adding document: ", e)
    }
    resetCurrentUploadedImage()
    resetFormData()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }

  const handleProcessingImage = (e) => {
    const newImage = e.target.files[0]
    setCurrentUploadedImage(newImage)
  }

  async function handleImageUpload(docRef) {
    if (!currentUploadedImage) alert("Please choose a file first!")

    try {
      const filePath = `${authentication.currentUser.uid}/${docRef.id}/${currentUploadedImage.name}`
      const newImageRef = ref(storage, filePath)
      const fileSnapshot = await uploadBytesResumable(
        newImageRef,
        currentUploadedImage
      )

      //generate public URL for the file
      const publicImageURL = await getDownloadURL(newImageRef)

      //Update tweet with image's URL
      await updateDoc(docRef, {
        imageURL: publicImageURL,
      })
    } catch (error) {
      console.error(
        "There was an error uploading a file to Cloud Storage:",
        error
      )
    }
  }

  return (
    <div className="compose-window">
      <img
        className="compose-window__author-logo"
        alt="user logo"
        src={userInfo.photoURL}
      />
      <div className="compose-window__right-side">
        <form className="compose-window__form">
          <input
            className="compose-window__input"
            type="text"
            onChange={handleChange}
            placeholder="What's happening?"
            name="message"
            value={formData.message}
          ></input>
          <div className="compose-window__button-container">
            <div className="compose-window__svg-container">
              <div className="image-upload">
                <label htmlFor="file-input">
                  <img
                    className="compose-window__svg-icon"
                    src={imageSVG}
                    referrerPolicy="no-referrer"
                    alt="img upload button icon"
                  />
                </label>

                <input
                  id="file-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleProcessingImage}
                />
              </div>
            </div>
            <button
              className="compose-window__submit-button"
              type="submit"
              onClick={handleSubmit}
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ComposeWindow
