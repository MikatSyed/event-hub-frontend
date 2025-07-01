// src/App.tsx
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./components/pages/home";
import Events from "./components/pages/events";
import MyEvents from "./components/pages/my-events";
import AddEvent from "./components/pages/add-event";
import Register from "./components/pages/register";
import { Toaster } from "./components/ui/toaster";
import Login from "./components/pages/login";

// import other pages as you create them
// import About from "./components/pages/about";
// import Contact from "./components/pages/contact";

export default function App() {
  return (
    <div>
   
      <Routes>
        {/* Redirect “/” → “/home” */}
      

        {/* Your actual pages */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/add-event" element={<AddEvent />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}

        {/* Catch-all for unmatched URLs */}
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
