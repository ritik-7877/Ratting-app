import { useState } from "react"
import apiClient from "../api/apiClient"
import Header from "../components/common/Header"

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      await apiClient.put("/auth/update-password", { newPassword })
      setMessage("Password updated successfully")
      setNewPassword("")
    } catch (error) {
      setMessage("Password update failed")
    }
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <h2>Update Password</h2>

        {message && <p>{message}</p>}

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button>Update</button>
      </form>
    </>
  )
}

export default UpdatePassword
