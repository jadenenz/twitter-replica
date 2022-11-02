import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore"

function ComposeWindow({ db, displayName }) {
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
        user: displayName,
        message: formData.message,
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
    <div className="ComposeWindow">
      <form className="compose--form">
        <input
          type="text"
          onChange={handleChange}
          placeholder="What's happening?"
          name="message"
          value={formData.message}
        ></input>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default ComposeWindow
