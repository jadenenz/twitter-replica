import React from "react"

function Searchbar({ setSearchTerm }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => {
          setSearchTerm(event.target.value)
        }}
      />
    </div>
  )
}

export default Searchbar
