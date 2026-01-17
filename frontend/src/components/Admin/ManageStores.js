import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient"
import Header from "../common/Header"

function ManageStores() {
  const [stores, setStores] = useState([])

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  })

  useEffect(() => {
    fetchStores()
  }, [])

  const fetchStores = async () => {
    try {
      const response = await apiClient.get("/admin/stores")
      setStores(response.data)
    } catch (error) {
      console.log("Failed to load stores")
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const createStore = async (e) => {
    e.preventDefault()

    try {
      await apiClient.post("/admin/stores", form)
      alert("Store created successfully")
      setForm({ name: "", email: "", address: "", ownerId: "" })
      fetchStores()
    } catch (error) {
      alert("Store creation failed")
    }
  }

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Create Store</h2>

        <form onSubmit={createStore}>
          <input name="name" placeholder="Store Name" value={form.name} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
          <input name="ownerId" placeholder="Owner User ID" value={form.ownerId} onChange={handleChange} />

          <button>Create Store</button>
        </form>

        <h2>Stores</h2>

        {stores.map((store) => (
          <div key={store.id} style={styles.card}>
            <p>Name: {store.name}</p>
            <p>Email: {store.email}</p>
            <p>Address: {store.address}</p>
            <p>Rating: {Number(store.rating).toFixed(1)}</p>
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

export default ManageStores
