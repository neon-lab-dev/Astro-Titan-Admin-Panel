/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../redux/Features/Auth/authSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector(useCurrentUser) as any;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
