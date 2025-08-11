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
import { ClientBriefs } from "./screens/client/briefs/ClientBriefs";
import { ClientData } from "./screens/client/data/ClientData";
import EventPage from "./screens/client/eventPage/EventPage";
import Home from "./screens/home/Home";
import ConstituentProfile from "./screens/client/constituentProfile/constituentProfile";

function App() {
  const { user } = useContext(AuthContext);

  const getHomeRedirect = () => {
    if (!user) return "/login";
    return user.role === "ADMIN" ? "/admin/events" : "/client/";
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
        path="/client/"
        element={
          <ProtectedRoute user={user} allowedRoles={["USER"]}>
            <ConstituentProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/briefs"
        element={
          <ProtectedRoute user={user} allowedRoles={["USER"]}>
            <ClientBriefs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/briefs/brief-view"
        element={
          <ProtectedRoute user={user} allowedRoles={["USER"]}>
            <BriefView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/data/viral-discussions/:title"
        element={
          <ProtectedRoute user={user} allowedRoles={["USER"]}>
            <ViralDiscussion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/data"
        element={
          <ProtectedRoute user={user} allowedRoles={["USER"]}>
            <ClientData />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/home"
        element={
          <ProtectedRoute user={user} allowedRoles={["USER"]}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/client/data/articles/:id"
        element={
          <ProtectedRoute user={user} allowedRoles={["USER"]}>
            <ClientArticles />
          </ProtectedRoute>
        }
      />

      <Route
        path="/client/events/detail/:id"
        element={
          <ProtectedRoute user={user} allowedRoles={["USER"]}>
            <EventPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
