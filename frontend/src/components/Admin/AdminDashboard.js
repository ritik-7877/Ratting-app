import { useEffect, useState } from "react"
import apiClient from "../../api/apiClient"
import Header from "../common/Header"

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await apiClient.get("/admin/dashboard")
      setStats(response.data)
    } catch (error) {
      console.log("Failed to load dashboard stats")
    }
  }

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Admin Dashboard</h2>

        <div style={styles.card}>
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Stores: {stats.totalStores}</p>
          <p>Total Ratings: {stats.totalRatings}</p>
        </div>
      </div>
    </>
  )
}

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "6px",
  },
}

export default AdminDashboard
