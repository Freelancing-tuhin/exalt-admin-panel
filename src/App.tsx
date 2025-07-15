import { Routes, Route } from "react-router-dom";
// import Home from "./screens/home/Home";
import { Login } from "./screens/auth/login/login";
import { AdminEvents } from "./screens/admin/events/AdminEvents";
import { ClientEvents } from "./screens/client/events/ClientEvents";
import { AdminFinalBriefs } from "./screens/admin/briefs/AdminFinalBriefs";

// Admin Screens

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<ClientEvents />} />
      <Route path="/login" element={<Login />} />

      {/* Admin routes */}
      <Route path="/admin/events" element={<AdminEvents />} />
      {/* <Route path="/admin/issues" element={<AdminIssues />} /> */}
      <Route path="/admin/final-briefs" element={<AdminFinalBriefs />} />

      {/* Client routes */}
      <Route path="/client/events" element={<ClientEvents />} />
      {/* <Route path="/client/briefs" element={<ClientBriefs />} /> */}
      {/* <Route path="/client/holidays" element={<ClientHolidays />} /> */}
    </Routes>
  );
}

export default App;
