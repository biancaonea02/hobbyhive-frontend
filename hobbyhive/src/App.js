import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Friends from "./pages/Friends";
import ProtectedRoute from "./auth/routes/protected-route";
import { useSelector } from "react-redux";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Communities from "./pages/Communities";
import CommunityPage from "./components/community-page";
import { useEffect, useState } from "react";
import { getRole } from "./services/authentication-service";
import AdminDashboard from "./components/admin-dashboard/admin-dashboard";

function App() {
  const token = useSelector((state) => state.authentication.token);
  const role = useSelector((state) => state.authentication.role);

  return (
    <div className="App">
      {token && <Navbar />}
      <BrowserRouter>
        <Routes>
          <Route path="/log-in" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route
            path="/feed"
            element={
              <ProtectedRoute
                token={token}
                allowedRoles={["ROLE_USER"]}
                role={role}
              >
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                token={token}
                allowedRoles={["ROLE_USER"]}
                role={role}
              >
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/friends"
            element={
              <ProtectedRoute
                token={token}
                allowedRoles={["ROLE_USER"]}
                role={role}
              >
                <Friends />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                token={token}
                // allowedRoles={[["ROLE_USER"], ["ROLE_ADMIN"]]}
                allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}
                role={role}
              >
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communities"
            element={
              <ProtectedRoute
                token={token}
                allowedRoles={["ROLE_USER"]}
                role={role}
              >
                <Communities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community/:id"
            element={
              <ProtectedRoute
                token={token}
                allowedRoles={["ROLE_USER"]}
                role={role}
              >
                <CommunityPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                token={token}
                allowedRoles={["ROLE_ADMIN"]}
                role={role}
              >
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
