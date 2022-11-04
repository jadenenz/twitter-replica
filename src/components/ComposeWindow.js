import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import imageSVG from "../svg/image.svg"

function ComposeWindow({ db, userInfo }) {
  const [formData, setFormData] = useState({
    message: "",
  })

  const resetFormData = () => {
    setFormData({
      message: "",
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "tweets"), {
        user: userInfo.displayName,
        message: formData.message,
        photoURL: userInfo.photoURL,
      })
      console.log("Doccument written with ID: ", docRef.id)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
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
                    alt="img upload button icon"
                  />
                </label>

                <input
                  id="file-input"
                  type="file"
                  accept="image/png, image/jpeg"
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
