import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient"
import Header from "../common/Header"

function ManageUsers() {
  const [users, setUsers] = useState([])

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/admin/users")
      setUsers(response.data)
    } catch (error) {
      console.log("Failed to load users")
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const createUser = async (e) => {
    e.preventDefault()

    try {
      await apiClient.post("/admin/users", form)
      alert("User created successfully")
      setForm({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      })
      fetchUsers()
    } catch (error) {
      alert("User creation failed")
    }
  }

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Create User</h2>

        <form onSubmit={createUser}>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="password" placeholder="Password" value={form.password} onChange={handleChange} />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="STORE_OWNER">STORE_OWNER</option>
          </select>

          <button>Create User</button>
        </form>

        <h2>Users</h2>

        {users.map((user) => (
          <div key={user.id} style={styles.card}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>Address: {user.address}</p>
          </div>
        ))}
      </div>
    </>
  )
}

const styles = {
  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "5px",
  },
}

export default ManageUsers
