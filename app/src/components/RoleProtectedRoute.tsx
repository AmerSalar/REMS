import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface RoleRouteProps {
  allowedRoles?: string[];
}

export const RoleProtectedRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { user, isAuthenticated } = useAuthStore();

  // 1. If not logged in -> redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. If route specifies allowedRoles, check if user's role matches
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Unauthorized access attempt -> redirect to their default home page
    return <Navigate to="/login" replace />;
  }

  // 3. Authorized -> Render requested child route
  return <Outlet />;
};
