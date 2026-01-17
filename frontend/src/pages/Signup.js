import { use, useState } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "../api/apiClient"

function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")


        try {
            await apiClient.post("/auth/signup", {
                name,
                email,
                address,
                password,
            })

            alert("signup successfull. Please login.")
            navigate("/")
        } catch (err) {
            setError(`Signup failed Error : ${err}`)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2> Signup </h2>

            <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <p style={{ textAlign: "center", marginTop: "10px" }}>
                Already registered? <a href="/">Login</a>
            </p>

            <button type="submit">Register</button>
        </form>
    )
}

export default Signup
