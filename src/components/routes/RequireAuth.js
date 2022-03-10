import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const Token = Cookies.get("token");

  if (Token) {
    return true;
  } else {
    return false;
  }
};

const RequireAuth = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" />;
};

const PublicRoutes = () => {
  const auth = useAuth();
  return auth ? <Navigate to="/welcome-page" /> : <Outlet />;
};

export { RequireAuth, PublicRoutes };
