import { useState } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "../api/apiClient"
import useAuth from "../hooks/useAuth"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      })

      login(response.data.token, response.data.role)

      if (response.data.role === "ADMIN") navigate("/admin")
      else if (response.data.role === "STORE_OWNER") navigate("/owner")
      else navigate("/user")
    } catch (err) {
      setError("Invalid credentials")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don't have an account? <a href="/signup">Signup</a>
      </p>

      <button type="submit">Login</button>
    </form>
  )
}

export default Login
