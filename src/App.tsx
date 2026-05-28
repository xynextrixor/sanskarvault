/**
 * @license
 * SPDX-License-Identifier: Apache-2.    0
 * 54545465654654654654654654654654654654654654654654654654654654654654654654
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SecureRoute } from './components/SecureRoute';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import HomeInfo from './pages/HomeInfo';
import CourseInfo from './pages/CourseInfo';
import Explore from './pages/Explore';
import DocumentView from './pages/DocumentView';
import Login from './pages/Login';
import Products from './pages/Products';
import Resources from './pages/Resources';
import Pricing from './pages/Pricing';
import MyPDFs from './pages/MyPDFs';
import Settings from './pages/Settings';
import Bookmarks from './pages/Bookmarks';
import CProgram from './pages/CProgram';
import PythonProgram from './pages/PythonProgram';
import HtmlCssProgram from './pages/HtmlCssProgram';
import DsaProgram from './pages/DsaProgram';
import DbmsProgram from './pages/DbmsProgram';
import WebDevProgram from './pages/WebDevProgram';

function RouteWrapper({ Component }: { Component: import('react').ElementType }) {
  const navigate = useNavigate();
  return <Component onNavigate={(route: string) => navigate(route === 'home' ? '/' : `/${route}`)} />;
}

function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex-1 flex flex-col pt-0">
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  useEffect(() => {
    // Check initial dark mode from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background text-on-surface font-sans antialiased selection:bg-primary-dim/30 selection:text-primary">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/" element={<RouteWrapper Component={Home} />} />
              <Route path="/homeinfo" element={<RouteWrapper Component={HomeInfo} />} />
              <Route path="/courseinfo" element={<SecureRoute><RouteWrapper Component={CourseInfo} /></SecureRoute>} />
              <Route path="/cprogram" element={<SecureRoute><RouteWrapper Component={CProgram} /></SecureRoute>} />
              <Route path="/pythonprogram" element={<SecureRoute><RouteWrapper Component={PythonProgram} /></SecureRoute>} />
              <Route path="/htmlcssprogram" element={<SecureRoute><RouteWrapper Component={HtmlCssProgram} /></SecureRoute>} />
              <Route path="/dsaprogram" element={<SecureRoute><RouteWrapper Component={DsaProgram} /></SecureRoute>} />
              <Route path="/dbmsprogram" element={<SecureRoute><RouteWrapper Component={DbmsProgram} /></SecureRoute>} />
              <Route path="/webdevprogram" element={<SecureRoute><RouteWrapper Component={WebDevProgram} /></SecureRoute>} />
              <Route path="/explore" element={<SecureRoute><RouteWrapper Component={Explore} /></SecureRoute>} />
              <Route path="/explore/*" element={<SecureRoute><RouteWrapper Component={Explore} /></SecureRoute>} />
              <Route path="/document" element={<SecureRoute><RouteWrapper Component={DocumentView} /></SecureRoute>} />
              <Route path="/products" element={<SecureRoute><RouteWrapper Component={Products} /></SecureRoute>} />
              <Route path="/resources" element={<SecureRoute><RouteWrapper Component={Resources} /></SecureRoute>} />
              <Route path="/pricing" element={<RouteWrapper Component={Pricing} />} />
              <Route path="/pdfs" element={<SecureRoute><RouteWrapper Component={MyPDFs} /></SecureRoute>} />
              <Route path="/bookmarks" element={<SecureRoute><RouteWrapper Component={Bookmarks} /></SecureRoute>} />
              <Route path="/settings" element={<SecureRoute><RouteWrapper Component={Settings} /></SecureRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}
