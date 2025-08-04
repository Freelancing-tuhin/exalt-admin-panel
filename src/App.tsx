import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./screens/auth/login/login";
import { AdminEvents } from "./screens/admin/events/AdminEvents";
import { ClientEvents } from "./screens/client/events/ClientEvents";
import { AdminFinalBriefs } from "./screens/admin/briefs/AdminFinalBriefs";
import { AdminArticles } from "./screens/admin/articles/AdminArticles";
import { ClientArticles } from "./screens/client/articles/ClientArticles";
import { useContext } from "react";
import AuthContext from "./contexts/authContext/authContext";
import { ProtectedRoute } from "./utils/protectedRoutes/ProtectedRoute";
import Unauthorized from "./screens/unauthorized/Unauthorized";
import { ViralDiscussion } from "./screens/viralDiscussion/ViralDiscussion";
import { BriefView } from "./screens/admin/briefView/BriefView";

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
      <Route path="/unauthorized" element={<Unauthorized />} />

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
        path="/admin/articles"
        element={
          <ProtectedRoute user={user} allowedRoles={["ADMIN"]}>
            <AdminArticles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/brief-view"
        element={
          <ProtectedRoute user={user} allowedRoles={["ADMIN"]}>
            <BriefView />
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
      <Route
        path="/admin/final-briefs/viral-discussions/:title"
        element={
          <ProtectedRoute user={user} allowedRoles={["ADMIN"]}>
            <ViralDiscussion />
          </ProtectedRoute>
        }
      />

      {/* Client-only routes */}
      <Route
        path="/client/events"
        element={
          <ProtectedRoute user={user} allowedRoles={["USER"]}>
            <ClientEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/articles"
        element={
          <ProtectedRoute user={user} allowedRoles={["USER"]}>
            <ClientArticles />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
