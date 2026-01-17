import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"

import ProtectedRoute from "./components/common/ProtectedRoute"
import ManageUsers from "./components/Admin/ManageUsers"
import AdminDashboard from "./components/Admin/AdminDashboard"
import UserDashboard from "./components/User/UserDashboard"
import OwnerDashboard from "./components/StoreOwner/OwnerDashboard"
import ManageStores from "./components/Admin/ManageStores"
import UpdatePassword from "./pages/UpdatePassword"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner"
        element={
          <ProtectedRoute allowedRoles={["STORE_OWNER"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/stores"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <ManageStores />
          </ProtectedRoute>
        }
      />

      <Route
        path="/update-password"
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />


      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
