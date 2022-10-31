import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore"

function ComposeWindow({ db }) {
  const [formData, setFormData] = useState({
    user: "default",
    message: "",
  })

  const resetFormData = () => {
    setFormData({
      user: "default",
      message: "",
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "tweet"), {
        user: formData.user,
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
