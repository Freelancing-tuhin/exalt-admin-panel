/* eslint-disable @typescript-eslint/no-explicit-any */
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
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
