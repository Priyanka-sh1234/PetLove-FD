import { Navigate } from "react-router-dom";

const ClinicProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("ClinicToken");

  if (!token) {

    return <Navigate to="/PageNotFound" replace />;
  }

  return children;
};

export default ClinicProtectedRoute;
