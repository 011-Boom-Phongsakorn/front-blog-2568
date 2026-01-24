import { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
    const { userInfo } = useContext(UserContext);

    if (!userInfo) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
