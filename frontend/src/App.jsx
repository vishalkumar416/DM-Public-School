import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Academics from './pages/Academics';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import Faculty from './pages/Faculty';
import Gallery from './pages/Gallery';
import Videos from './pages/Videos';
import Infrastructure from './pages/Infrastructure';
import NoticeBoard from './pages/NoticeBoard';
import Curriculum from './pages/Curriculum';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminAdmissions from './pages/admin/AdminAdmissions';
import AdminGallery from './pages/admin/AdminGallery';
import AdminNotices from './pages/admin/AdminNotices';
import AdminFees from './pages/admin/AdminFees';
import AdminContacts from './pages/admin/AdminContacts';
import AdminContent from './pages/admin/AdminContent';

function App() {
  // Add error handling
  try {
    return (
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="academics" element={<Academics />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="videos" element={<Videos />} />
          <Route path="infrastructure" element={<Infrastructure />} />
          <Route path="notices" element={<NoticeBoard />} />
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="teachers" element={<AdminTeachers />} />
          <Route path="admissions" element={<AdminAdmissions />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="notices" element={<AdminNotices />} />
          <Route path="fees" element={<AdminFees />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="content" element={<AdminContent />} />
        </Route>
      </Routes>
    );
  } catch (error) {
    console.error('App Error:', error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Error Loading App</h1>
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }
}

export default App;
