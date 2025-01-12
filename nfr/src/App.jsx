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
import Dashboard from "./pages/Dashboard";
import routes from "./constants/routes.js";
import { UserProvider, useUser } from "./contexts/UserContext";
import { ClientProvider } from "./contexts/ClientContext";
import { SaleProvider } from "./contexts/SaleContext.jsx";
import { PurchaseProvider } from "./contexts/PurchaseContext.jsx";
import { ProductProvider } from "./contexts/ProductContext";
import { BankOperationsProvider } from "./contexts/BankOperationsContext";
import { AccountProvider } from "./contexts/AccountContext";

import "./App.css";

function AppContent() {
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

  const accessibleRoutes = routes.filter(({ path }) => path !== "/login");

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {accessibleRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                {element}
              </ProtectedRoute>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

function AppProviders({ children }) {
  return (
    <UserProvider>
      <ClientProvider>
        <SaleProvider>
          <PurchaseProvider>
            <ProductProvider>
              <BankOperationsProvider>
                <AccountProvider>{children}</AccountProvider>
              </BankOperationsProvider>
            </ProductProvider>
          </PurchaseProvider>
        </SaleProvider>
      </ClientProvider>
    </UserProvider>
  );
}

export default function RootApp() {
  return (
    <Router>
      <AppProviders>
        <AppContent />
      </AppProviders>
    </Router>
  );
}
