// src/App.tsx
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./components/pages/home";
import Events from "./components/pages/events";
import MyEvents from "./components/pages/my-events";
import AddEvent from "./components/pages/add-event";
import Register from "./components/pages/register";
import { Toaster } from "./components/ui/toaster";
import Login from "./components/pages/login";
import PrivateRoute from "./components/private-route/private-route";



export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/events"
          element={
            <PrivateRoute>
              <Events />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-event"
          element={
            <PrivateRoute>
              <AddEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <PrivateRoute>
              <MyEvents />
            </PrivateRoute>
          }
        />
     
        <Route
          path="*"
          element={
            <div className="p-8 text-red-500">
              <h1 className="text-2xl font-bold">404 — Page Not Found</h1>
            </div>
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
}
