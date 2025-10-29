
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AppContextProvider>
      <HashRouter>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-slate-900 text-slate-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/property/:id" element={<PropertyDetailsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminLoginPage />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </HashRouter>
    </AppContextProvider>
  );
}

export default App;
