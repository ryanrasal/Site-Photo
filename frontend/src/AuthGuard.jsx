import { Navigate } from "react-router-dom";
import PrivateRoute from "./pages/Admin/PrivateRoute";
import { useCurrentAdminContext } from "./context/AdminContext";

function AuthGuard() {
  const { logged } = useCurrentAdminContext();
  if (!logged) {
    return <Navigate to="/connexionAdmin" />;
  }
  return <PrivateRoute />;
}

export default AuthGuard;
