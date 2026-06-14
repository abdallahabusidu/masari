import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Timeline from "./pages/Timeline.jsx";
import Resources from "./pages/Resources.jsx";
import Tasks from "./pages/Tasks.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import Calendar from "./pages/Calendar.jsx";
import Analytics from "./pages/Analytics.jsx";
import Profile from "./pages/Profile.jsx";
import AdminLevels from "./pages/admin/AdminLevels.jsx";
import AdminSubjects from "./pages/admin/AdminSubjects.jsx";
import AdminResources from "./pages/admin/AdminResources.jsx";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="panel-loading" style={{ paddingTop: 120 }}>جارٍ التحميل...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />

      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      <Route path="/timeline" element={<Protected><Timeline /></Protected>} />
      <Route path="/resources" element={<Protected><Resources /></Protected>} />
      <Route path="/tasks" element={<Protected><Tasks /></Protected>} />
      <Route path="/tasks/:id" element={<Protected><TaskDetails /></Protected>} />
      <Route path="/calendar" element={<Protected><Calendar /></Protected>} />
      <Route path="/analytics" element={<Protected><Analytics /></Protected>} />
      <Route path="/profile" element={<Protected><Profile /></Protected>} />

      {/* Admin panel (password-gated inside each page) */}
      <Route path="/admin" element={<Protected><AdminLevels /></Protected>} />
      <Route path="/admin/levels/:levelId" element={<Protected><AdminSubjects /></Protected>} />
      <Route path="/admin/subjects/:subjectId" element={<Protected><AdminResources /></Protected>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
