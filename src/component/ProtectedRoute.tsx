import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const accessToken = localStorage.getItem("userToken"); // Use Redux or another state if needed

    if (!accessToken) {
        return <Navigate to="/signin" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
