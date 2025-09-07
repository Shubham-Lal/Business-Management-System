import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import useAuthFetch from "./hooks/useAuthFetch"
import ProtectedRoute from "./pages/ProtectedRoute"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import NotFound from "./pages/NotFound"
import BottomNavigation from "./components/BottomNavigation"

function App() {
  const { fetchUser } = useAuthFetch();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNavigation />
    </>
  )
}

export default App