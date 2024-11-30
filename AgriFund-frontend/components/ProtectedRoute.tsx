'use client';

import React from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { FileWarningIcon } from 'lucide-react';
import Loader from './ui/loader/loader';
import ErrorPage from './ui/errorPage';
import Loading from './ui/loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string; // Optional redirect path
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo = '/get-started' }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return Loading('Loading...', false)
  }

  if (!user) {
    ErrorPage('You are not logged in!', true, 'Login')
  }

  // console.log('Authenticated user:', user);

  return <>{children}</>;
};

export default ProtectedRoute;
