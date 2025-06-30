import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Calendar, Menu, X, LogOut, ChevronDown } from "lucide-react"
import { getLoggedUser } from "../../api/authApi"
import { removeUserInfo } from "../../helpers/auth/auth.service"
import { authKey } from "../../helpers/constants/storageKey"



export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<{
    _id: string
    name: string
    email: string
    photoURL: string
  } | null>(null)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getLoggedUser()
        if (response?.data?.success && response.data.data) {
          setIsLoggedIn(true)
          setUserData(response.data.data)
        } else {
          setIsLoggedIn(false)
          setUserData(null)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
        setIsLoggedIn(false)
        setUserData(null)
      }
    }

    fetchUser()
  }, [])

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Your custom logout function
  const logout = () => {
    removeUserInfo(authKey)
    navigate("/login")
    setIsLoggedIn(false)
    setUserData(null)
    setIsProfileDropdownOpen(false)
  }

  const toggleProfileDropdown = () => setIsProfileDropdownOpen(prev => !prev)

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-orange-100 sticky top-0 z-50">
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
            <Link to="/events" className="text-gray-700 hover:text-orange-600 transition-colors font-medium relative group">
              Events
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/add-event" className="text-gray-700 hover:text-orange-600 transition-colors font-medium relative group">
                  Add Event
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/my-events" className="text-gray-700 hover:text-orange-600 transition-colors font-medium relative group">
                  My Events
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn && userData ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="relative h-12 w-12 rounded-full ring-2 ring-orange-200 hover:ring-orange-400 transition-all duration-300"
                >
                  {userData.photoURL ? (
                    <img
                      src={userData.photoURL}
                      alt={userData.name}
                      className="h-10 w-10 rounded-full object-cover mx-auto"
                      onError={(e) => { e.currentTarget.style.display = "none" }}
                    />
                  ) : (
                    <div className="h-10 w-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold mx-auto">
                      {getInitials(userData.name)}
                    </div>
                  )}
                  <ChevronDown className="absolute -bottom-1 -right-1 h-4 w-4 bg-white rounded-full p-0.5 text-gray-600" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-3">
                      {userData.photoURL ? (
                        <img
                          src={userData.photoURL}
                          alt={userData.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {getInitials(userData.name)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{userData.name}</p>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <LogOut className="h-4 w-4 text-gray-500" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
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
                  <Link to="/add-event" className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2">
                    Add Event
                  </Link>
                  <Link to="/my-events" className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2">
                    My Events
                  </Link>
                  <button
                    onClick={logout}
                    className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium py-2 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
