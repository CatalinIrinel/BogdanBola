import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import Articole from './pages/Articole';
import EditArticol from './pages/EditArticol';
import ArticoleList from './pages/ArticoleList';
import Proiecte from './pages/Proiecte';
import ArticolPage from './pages/ArticolPage';
import ScrollToTop from './ScrollToTop';
// Toast alerts
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './components/AdminRoute';
import LogInPage from './pages/LoginPage';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      <Navbar toggle={toggle} />
      <Sidebar openBar={isOpen} toggle={toggle} />
      <ScrollToTop />
      <ToastContainer position="bottom-center" limit={1} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/despre" element={<About />} />
        <Route path="/articole" element={<Articole />} />
        <Route path="/:slug/:slugId" element={<ArticolPage />} />
        <Route path="/proiecte" element={<Proiecte />} />
        <Route path="/contacteaza-ma" element={<Contact />} />
        <Route path="/logare" element={<LogInPage />} />

        {/* Admin Routes */}

        <Route
          path="/admin/:id"
          element={
            <AdminRoute>
              <EditArticol />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/articole"
          element={
            <AdminRoute>
              <ArticoleList />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
