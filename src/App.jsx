import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import InitializeAuth from "./components/InitializeAuth";

// Public imports
import Landing from "./pages/public/Landing";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Gallery from "./pages/public/Gallery";
import Projects from "./pages/public/Projects";
import Donation from "./pages/public/Donation";
import Schemes from "./pages/public/Schemes";

// Shared
import Navbar from "./components/Navbar";

// Admin imports
import AdminDashboard from "./admin/pages/AdminDashboard";
import MembersPage from "./admin/members/MembersPage";
import InstitutesPage from "./admin/institutes/InstitutesPage";
import StudentsPage from "./admin/students/StudentsPage";
import ManageSchemes from "./admin/schemes/ManageSchemes";
import NotificationsPage from './admin/notifications/NotificationsPage';
import ApplicationsPage from "./admin/applications/ApplicationsPage";

// Student imports
import StudentDashboard from "./student/pages/StudentDashboard";
import SchemesPage from "./student/pages/SchemesPage";
import SchemeDetailsPage from "./student/pages/SchemeDetailsPage";
import ApplySchemePage from "./student/pages/ApplySchemePage";
import AppliedSchemesPage from "./student/pages/AppliedSchemesPage";
import AdmitCardPage from "./student/pages/AdmitCardPage";

const MainLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
  </div>
);

const ProtectedRoute = ({ children, allowedRole }) => {
  const { token, user, loading } = useSelector((s) => s.auth);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }
  
  if (!token) return <Navigate to="/login" replace />;
  
  if (user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default function App() {
  return (
    <Router>
      <InitializeAuth />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout><Landing/></MainLayout>} />
        <Route path="/login" element={<MainLayout><Login/></MainLayout>} />
        <Route path="/register" element={<MainLayout><Register/></MainLayout>} />
        <Route path="/gallery" element={<MainLayout><Gallery/></MainLayout>} />
        <Route path="/projects" element={<MainLayout><Projects/></MainLayout>} />
        <Route path="/donation" element={<MainLayout><Donation/></MainLayout>} />
        <Route path="/schemes" element={<MainLayout><Schemes/></MainLayout>} />

        {/* Admin routes */}
        <Route path="/admin/dashboard/*" element={
          <MainLayout>
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard/>
            </ProtectedRoute>
          </MainLayout>
        }>
          <Route index element={<StudentsPage />} />
          <Route path="members" element={<MembersPage/>} />
          <Route path="institutes" element={<InstitutesPage/>} />
          <Route path="students" element={<StudentsPage/>} />
          <Route path="schemes" element={<ManageSchemes/>} />
          <Route path="notifications" element={<NotificationsPage/>} />
          <Route path="applications" element={<ApplicationsPage/>} />
        </Route>

        {/* Student routes */}
        <Route path="/student/dashboard/*" element={
          <MainLayout>
            <ProtectedRoute allowedRole="STUDENT">
              <StudentDashboard/>
            </ProtectedRoute>
          </MainLayout>
        }>
          <Route index element={<Navigate to="schemes" replace/>} />
          <Route path="schemes" element={<SchemesPage/>} />
          <Route path="schemes/:id" element={<SchemeDetailsPage/>} />
          <Route path="schemes/:id/apply" element={<ApplySchemePage/>} />
          <Route path="applied-schemes" element={<AppliedSchemesPage/>} />
          <Route path="admit-card" element={<AdmitCardPage/>} />
          <Route path="*" element={<Navigate to="schemes" replace/>} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </Router>
  );
}