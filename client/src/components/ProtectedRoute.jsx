import { Navigate } from "react-router-dom";

// [FIXED]: Added token expiry check — was only checking token existence
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  
  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  // Decode JWT payload and check expiry
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("adminToken");
      return <Navigate to="/admin/login" />;
    }
  } catch {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
