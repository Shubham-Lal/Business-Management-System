import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";
import AppLoader from "../components/Loader/AppLoader";

export default function ProtectedRoute() {
    const location = useLocation();
    const { isAuthenticated, isAuthenticating } = useAuthStore();

    if (isAuthenticating) {
        return <AppLoader />;
    }

    const authPages = ["/auth"];
    const isAuthPage = authPages.some((path) =>
        location.pathname.startsWith(path)
    );

    // If authenticated and visiting authPages - redirect back or to "/"
    if (isAuthenticated && isAuthPage) {
        const redirectTo = location.state?.from?.pathname;
        return <Navigate to={redirectTo || "/"} replace />;
    }

    // If NOT authenticated and NOT on authPages - save intended route
    if (!isAuthenticated && !isAuthPage) {
        return (
            <Navigate
                to="/auth"
                replace
                state={{ from: location }}
            />
        );
    }

    // If NOT authenticated and on authPages
    if (!isAuthenticated && isAuthPage) {
        return <Outlet />;
    }

    return <Outlet />;
}