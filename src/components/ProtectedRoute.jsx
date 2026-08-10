import { Navigate, useLocation } from "react-router-dom";

import { ACCESS } from "../api/constants";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem(ACCESS);

  if (!token) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;