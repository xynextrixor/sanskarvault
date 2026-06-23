/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, Suspense, lazy, ReactNode, ErrorInfo, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SecureRoute } from './components/SecureRoute';
import { Navbar } from './components/Navbar';
import { PWABadge } from './components/PWABadge';
import { Loader2 } from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const HomeInfo = lazy(() => import('./pages/HomeInfo'));
const CourseInfo = lazy(() => import('./pages/CourseInfo'));
const Explore = lazy(() => import('./pages/Explore'));
const DocumentView = lazy(() => import('./pages/DocumentView'));
const Login = lazy(() => import('./pages/Login'));
const Products = lazy(() => import('./pages/Products'));
const Resources = lazy(() => import('./pages/Resources'));
const Pricing = lazy(() => import('./pages/Pricing'));
const MyPDFs = lazy(() => import('./pages/MyPDFs'));
const Settings = lazy(() => import('./pages/Settings'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));
const CProgram = lazy(() => import('./pages/CProgram'));
const PythonProgram = lazy(() => import('./pages/PythonProgram'));
const HtmlCssProgram = lazy(() => import('./pages/HtmlCssProgram'));
const DsaProgram = lazy(() => import('./pages/DsaProgram'));
const DbmsProgram = lazy(() => import('./pages/DbmsProgram'));
const WebDevProgram = lazy(() => import('./pages/WebDevProgram'));
const Contact = lazy(() => import('./pages/Contact'));

class ErrorBoundary extends React.Component<{children: ReactNode}, {hasError: boolean}> {
  props: {children: ReactNode};
  state: {hasError: boolean};

  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-on-surface p-4">
          <h1 className="text-3xl font-display font-bold text-primary mb-4">Something went wrong</h1>
          <p className="text-on-surface-variant max-w-md text-center mb-6">
            We've encountered an unexpected error. Please refresh the page or return to safety.
          </p>
          <a href="/" className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-container transition-colors">
            Return Home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

function LoadingFallback() {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );
}

function RouteWrapper({ Component }: { Component: import('react').ElementType }) {
  const navigate = useNavigate();
  const handleNavigate = useCallback((route: string) => {
    navigate(route === 'home' ? '/' : `/${route}`);
  }, [navigate]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component onNavigate={handleNavigate} />
    </Suspense>
  );
}

function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex-1 flex flex-col pt-0">
        <Outlet />
      </div>
      <PWABadge />
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
      <ErrorBoundary>
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
                <Route path="/contact" element={<RouteWrapper Component={Contact} />} />
                <Route path="/pdfs" element={<SecureRoute><RouteWrapper Component={MyPDFs} /></SecureRoute>} />
                <Route path="/bookmarks" element={<SecureRoute><RouteWrapper Component={Bookmarks} /></SecureRoute>} />
                <Route path="/settings" element={<SecureRoute><RouteWrapper Component={Settings} /></SecureRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
}
