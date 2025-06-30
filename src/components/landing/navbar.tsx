import { Link } from 'react-router-dom';
import { useState } from "react"
import { Calendar, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Static state for demo

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                EventHub
              </span>
              <div className="text-xs text-gray-500 font-medium">Premium Events</div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors font-medium relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/events"
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium relative group"
            >
              Events
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/my-events"
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium relative group"
            >
             My Events
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  to="/add-event"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium relative group"
                >
                  Add Event
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link
                  to="/my-events"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium relative group"
                >
                  My Events
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button className="relative h-12 w-12 rounded-full ring-2 ring-orange-200 hover:ring-orange-400 transition-all duration-300">
                  <div className="h-10 w-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold mx-auto">
                    JD
                  </div>
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg transition-all duration-300 font-semibold px-6 py-2 text-white rounded-lg">
                  Sign In
                </button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-orange-100">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2">
                Home
              </Link>
              <Link to="/events" className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2">
                Events
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    to="/add-event"
                    className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  >
                    Add Event
                  </Link>
                  <Link
                    to="/my-events"
                    className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  >
                    My Events
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
