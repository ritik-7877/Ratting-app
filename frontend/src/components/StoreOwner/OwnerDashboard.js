import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient"
import Header from "../common/Header"

function OwnerDashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const response = await apiClient.get("/owner/dashboard")
      setData(response.data)
    } catch (error) {
      console.log("Failed to load owner dashboard")
    }
  }

  if (!data) return null

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>{data.storeName}</h2>
        <h3>Average Rating: {Number(data.averageRating).toFixed(1)}</h3>

        <h3>Users Who Rated</h3>

        {data.users.map((user, index) => (
          <div key={index} style={styles.card}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Rating: {user.rating}</p>
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

export default OwnerDashboard
