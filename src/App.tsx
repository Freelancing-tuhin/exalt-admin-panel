import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./screens/auth/login/login";
import { AdminEvents } from "./screens/admin/events/AdminEvents";
import { ClientEvents } from "./screens/client/events/ClientEvents";
import { AdminFinalBriefs } from "./screens/admin/briefs/AdminFinalBriefs";
import { useContext } from "react";
import AuthContext from "./contexts/authContext/authContext";
import { ProtectedRoute } from "./utils/protectedRoutes/ProtectedRoute";

function App() {
  const { user } = useContext(AuthContext);

  const getHomeRedirect = () => {
    if (!user) return "/login";
    return user.role === "ADMIN" ? "/admin/events" : "/client/events";
  };

  return (
    <Routes>
      {/* Dynamic public route */}
      <Route path="/" element={<Navigate to={getHomeRedirect()} replace />} />
      <Route path="/login" element={<Login />} />

      {/* Admin-only routes */}
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute user={user} allowedRoles={["ADMIN"]}>
            <AdminEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/final-briefs"
        element={
          <ProtectedRoute user={user} allowedRoles={["ADMIN"]}>
            <AdminFinalBriefs />
          </ProtectedRoute>
        }
      />

      {/* Client-only routes */}
      <Route
        path="/client/events"
        element={
          <ProtectedRoute user={user} allowedRoles={["CLIENT"]}>
            <ClientEvents />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
