import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../../helpers/auth/auth.service";


interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();

  if (isLoggedIn()) {
    return children;
  }

  // Redirect to login with callback to current path
  const callbackUrl = encodeURIComponent(location.pathname + location.search);
  return <Navigate to={`/login?callback=${callbackUrl}`} replace />;
};

export default PrivateRoute;
