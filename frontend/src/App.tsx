import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useAuthFetch from "./hooks/auth/useAuthFetch";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";
import BottomNavigation from "./components/BottomNavigation";

function App() {
  const { fetchUser } = useAuthFetch();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <BottomNavigation />
    </>
  )
}

export default App