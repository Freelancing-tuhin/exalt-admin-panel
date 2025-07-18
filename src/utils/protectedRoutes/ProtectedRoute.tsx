/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ProtectedRoute.tsx
// components/ProtectedRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  user,
  allowedRoles,
  children,
}: {
  user: any;
  allowedRoles: string[];
  children: JSX.Element;
}) => {
  // 🔒 If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 If user exists but role is not allowed, redirect to home
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ User exists and role is valid
  return children;
};
