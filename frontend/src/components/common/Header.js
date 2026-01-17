import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

function Header() {
  const { role, logout } = useAuth()

  return (
    <div style={styles.header}>
      <h3>Roxiler Rating App</h3>

      <div style={styles.links}>
        {role === "ADMIN" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/stores">Stores</Link>
          </>
        )}

        {role === "USER" && (
          <>
            <Link to="/user">Stores</Link>
          </>
        )}

        {role === "STORE_OWNER" && (
          <>
            <Link to="/owner">Dashboard</Link>
          </>
        )}

        <Link to="/update-password">Change Password</Link>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 20px",
    background: "#1f2933",
    color: "#fff",
  },
  links: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
}

export default Header
