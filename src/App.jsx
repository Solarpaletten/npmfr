import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import routes from "./constants/routes.js";
import { UserProvider, useUser } from "./contexts/UserContext";

import "./App.css";

function App() {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      const decodedToken = jwtDecode(user.token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        logoutUser();
        navigate("/login");
      }
    }
  }, [user, logoutUser, navigate]);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  const accessibleRoutes = routes.filter(
    ({ path }) => path !== "/dashboard" || user?.role === "admin"
  );

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        {accessibleRoutes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <Component />
              </ProtectedRoute>
            }
          />
        ))}
        <Route
          path="*"
          element={
            <Navigate
              to={user?.role === "admin" ? "/dashboard" : "/clients"}
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

export default function RootApp() {
  return (
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  );
}
