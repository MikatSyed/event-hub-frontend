"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Calendar,
  MapPin,
  UserIcon,
  Users,
  Search,
  CalendarDays,
  RotateCcw,
  Loader2,
  AlertCircle,
  Home,
  ArrowLeft,
  Check,
} from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import { getEvents, jointEvent } from "../../api/eventApi"
import { useNavigate } from "react-router-dom"
import { getLoggedUser } from "../../api/authApi"
import type { ApiResponse, LoggedInUser ,Event} from "../../types"

// Debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [dateRange, setDateRange] = useState("all")
  const [loading, setLoading] = useState(false)
  const [userLoading, setUserLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [joiningEventId, setJoiningEventId] = useState<string | null>(null)
  const navigate = useNavigate()
  const { toast } = useToast()

  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0 })

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  // Fetch logged user
  const fetchLoggedUser = useCallback(async () => {
    try {
      setUserLoading(true)
      const response: any = await getLoggedUser()
      if (response?.data?.success && response.data.data) {
        setCurrentUser(response.data.data)
     
      }
    } catch (err: any) {
      console.error("Failed to fetch user:", err)
      // Don't show error toast for user fetch failure - user might not be logged in
    } finally {
      setUserLoading(false)
    }
  }, [toast])

  const fetchEvents = useCallback(
    async (params: any = {}) => {
      setLoading(true)
      setError(null)
      try {
        const response: any = await getEvents(params)
        if ("data" in response && response.data) {
          const apiResponse: any = response as ApiResponse
          console.log(apiResponse, "69")
          if (apiResponse.data?.data) {
            setEvents(apiResponse.data.data)
            if (apiResponse.data.meta) {
              setMeta(apiResponse.data.meta)
            }
          } else {
            const errorMessage = apiResponse.data?.message || "Failed to fetch events"
            setError(errorMessage)
            toast({
              title: "Error Loading Events ❌",
              description: errorMessage,
              variant: "destructive",
            })
          }
        } else {
          const errorMessage = "Error fetching events"
          setError(errorMessage)
          toast({
            title: "Network Error ⚠️",
            description: errorMessage,
            variant: "destructive",
          })
          console.error("Error fetching events:", response.error)
        }
      } catch (err: any) {
        const errorMessage = err.message || "Network error occurred"
        setError(errorMessage)
        toast({
          title: "Connection Failed 🔌",
          description: errorMessage,
          variant: "destructive",
        })
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    },
    [toast],
  )

  // Effect for initial load
  useEffect(() => {
    fetchLoggedUser()
    fetchEvents()
  }, [fetchLoggedUser, fetchEvents])

  // Effect for search and filters
  useEffect(() => {
    const params: any = {}

    // Add search term
    if (debouncedSearchTerm.trim()) {
      params.searchTerm = debouncedSearchTerm.trim()
    }

    // Add specific date filter
    if (selectedDate) {
      params.date = selectedDate
    }

    // Add date range filter (only if no specific date is selected)
    if (dateRange !== "all" && !selectedDate) {
      params.dateRange = dateRange
    }

    fetchEvents(params)
  }, [debouncedSearchTerm, selectedDate, dateRange, fetchEvents])

  // Check if user has joined an event
  const hasUserJoined = (event: Event): boolean => {
    return currentUser ? event.joined?.includes(currentUser._id) || false : false
  }

  // Handle join event
  const handleJoinEvent = async (eventId: string) => {
    if (!currentUser) {
      toast({
        title: "Authentication Required 🔐",
        description: "Please log in to join events and connect with other attendees.",
        variant: "destructive",
      })
      return
    }

    const event = events.find((e) => e._id === eventId)
    if (!event || hasUserJoined(event)) {
      return
    }

    setJoiningEventId(eventId)

 

    try {
      const response: any = await jointEvent(eventId, {})

      if (response?.data?.success || response?.success) {
        // Update the events list to reflect the join
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId
              ? {
                  ...event,
                  attendeeCount: event.attendeeCount + 1,
                  joined: [...(event.joined || []), currentUser._id],
                }
              : event,
          ),
        )

        // Show success toast
        toast({
          variant:'success',
          title: "Successfully Joined Event! 🎉",
          description: `You're now registered for "${event.title}"`,
        })
      } else {
        throw new Error("Failed to join event")
      }
    } catch (err: any) {
      console.error("Failed to join event:", err)

      const errorMessage = err?.response?.data?.message || err?.message || "Failed to join event"
      toast({
        title: "Failed to Join Event ❌",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setJoiningEventId(null)
    }
  }

  const handleReset = () => {
    setSearchTerm("")
    setSelectedDate("")
    setDateRange("all")
    toast({
      title: "Filters Cleared! 🧹",
      description: "All search filters have been reset. Showing all events.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      short: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      full: date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }
  }

  const hasActiveFilters = searchTerm || selectedDate || dateRange !== "all"

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-4 sm:py-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between mb-8">
            <button
              onClick={handleBack}
              className="inline-flex items-center text-gray-600 hover:text-orange-600 font-medium transition-colors rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Back to Previous Page"
              type="button"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#ff6900] mr-2">
                <ArrowLeft className="w-6 h-6 text-[#ff6900]" />
              </span>
              Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer inline-flex items-center bg-orange-600 text-white hover:bg-orange-700 font-semibold rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              aria-label="Go to Events List"
              type="button"
            >
              <Home className="w-6 h-6 mr-2" />
              Home
            </button>
          </div>

          <div className="mb-8 sm:mb-12">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-4">
                Our Events
              </h1>

              {/* User Welcome Message */}
              {currentUser && (
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-4">
                  <img
                    src={currentUser.photoURL || "/placeholder.svg"}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-medium">Welcome, {currentUser.name}!</span>
                </div>
              )}

              {!currentUser && !userLoading && (
                <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full mb-4">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Please log in to join events</span>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-white to-orange-50/30 rounded-3xl p-6 sm:p-8 border border-orange-200/50">
              {/* Search Input - Full width on mobile, flex layout on md+ */}
              <div className="mb-6 md:mb-0">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Search Input */}
                  <div className="relative flex-1 md:flex-1">
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-orange-600 h-6 w-6" />
                    <input
                      type="text"
                      placeholder="Search premium events by title..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-14 pr-5 h-14 w-full border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 bg-white text-lg rounded-2xl outline-none transition-all duration-300 placeholder-gray-500"
                    />
                    {loading && debouncedSearchTerm && (
                      <Loader2 className="absolute right-5 top-1/2 transform -translate-y-1/2 h-6 w-6 animate-spin text-orange-500" />
                    )}
                  </div>

                  {/* Filters Row - Show on md+ devices */}
                  <div className="hidden md:flex md:items-center gap-4">
                    {/* Calendar Date Picker */}
                    <div className="relative">
                      <CalendarDays className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-600 h-5 w-5 z-10" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="pl-12 pr-4 h-12 w-48 border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 bg-white rounded-xl outline-none transition-all duration-300 text-gray-700"
                      />
                    </div>

                    {/* Date Range Dropdown */}
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      disabled={!!selectedDate}
                      className="h-12 w-48 px-4 border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 bg-white rounded-xl outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                    >
                      <option value="all">All Time Periods</option>
                      <option value="current_week">Current Week</option>
                      <option value="last_week">Last Week</option>
                      <option value="current_month">Current Month</option>
                      <option value="last_month">Last Month</option>
                    </select>

                    {/* Reset Button */}
                    <button
                      onClick={handleReset}
                      disabled={!hasActiveFilters || loading}
                      className="h-12 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold whitespace-nowrap"
                      title="Reset all filters"
                    >
                      <RotateCcw className="h-5 w-5" />
                      <span>Reset</span>
                    </button>

                    {/* Active Filters Count */}
                    {hasActiveFilters && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 whitespace-nowrap">Active:</span>
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {[searchTerm, selectedDate, dateRange !== "all" ? dateRange : null].filter(Boolean).length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Filters - Show only on mobile */}
              <div className="flex md:hidden flex-col gap-4">
                {/* Calendar Date Picker */}
                <div className="relative">
                  <CalendarDays className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-600 h-5 w-5 z-10" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="pl-12 pr-4 h-12 w-full border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 bg-white rounded-xl outline-none transition-all duration-300 text-gray-700"
                  />
                </div>

                {/* Date Range Dropdown */}
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  disabled={!!selectedDate}
                  className="h-12 w-full px-4 border-2 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 bg-white rounded-xl outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700"
                >
                  <option value="all">All Time Periods</option>
                  <option value="current_week">Current Week</option>
                  <option value="last_week">Last Week</option>
                  <option value="current_month">Current Month</option>
                  <option value="last_month">Last Month</option>
                </select>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  disabled={!hasActiveFilters || loading}
                  className="h-12 w-full px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
                  title="Reset all filters"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>Reset All Filters</span>
                </button>

                {/* Active Filters Count - Mobile */}
                {hasActiveFilters && (
                  <div className="flex items-center justify-center gap-2 pt-2 border-t border-orange-200">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {[searchTerm, selectedDate, dateRange !== "all" ? dateRange : null].filter(Boolean).length}
                    </span>
                  </div>
                )}
              </div>

              {/* Active Filters Tags - Compact horizontal layout */}
              {hasActiveFilters && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Applied:</span>
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-1 hover:bg-orange-200 rounded-full p-0.5 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedDate && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      {new Date(selectedDate).toLocaleDateString()}
                      <button
                        onClick={() => setSelectedDate("")}
                        className="ml-1 hover:bg-orange-200 rounded-full p-0.5 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {dateRange !== "all" && !selectedDate && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      {dateRange.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      <button
                        onClick={() => setDateRange("all")}
                        className="ml-1 hover:bg-orange-200 rounded-full p-0.5 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && events.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Events</h2>
              <p className="text-gray-600">Discovering exclusive events for you...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-red-800 font-semibold">Error Loading Events</h3>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                  <button
                    onClick={() => fetchEvents()}
                    className="mt-2 text-red-700 hover:text-red-800 underline text-sm"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* No Events State */}
          {!loading && events.length === 0 && !error && (
            <div className="text-center py-12 sm:py-20">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-orange-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">No Events Found</h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">
                {hasActiveFilters
                  ? "Try adjusting your search or filter criteria."
                  : "No events are currently available."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={handleReset}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg transition-all duration-300 font-semibold px-6 py-3 text-white rounded-lg"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}

          {/* Events Grid */}
          {events.length > 0 && (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
                const dateFormatted = formatDate(event.date)
                const userJoined = hasUserJoined(event)
                const isJoining = joiningEventId === event._id

                return (
                  <div
                    key={event._id}
                    className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm  rounded-lg overflow-hidden"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <span className="bg-orange-100 text-orange-700 border border-orange-200 font-semibold px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                          Event
                        </span>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-orange-600">{dateFormatted.short}</div>
                          <div className="text-xs text-gray-500">{event.time}</div>
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <div className="p-1 bg-orange-100 rounded-full">
                          <UserIcon className="h-3 w-3 text-orange-600" />
                        </div>
                        <span className="font-medium text-sm sm:text-base truncate">{event.creatorName}</span>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-3 text-gray-600">
                          <div className="p-1.5 bg-orange-100 rounded-lg flex-shrink-0">
                            <Calendar className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="font-medium text-sm sm:text-base">
                            {dateFormatted.full} at {event.time}
                          </span>
                        </div>

                        <div className="flex items-start gap-3 text-gray-600">
                          <div className="p-1.5 bg-orange-100 rounded-lg flex-shrink-0">
                            <MapPin className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="font-medium text-sm sm:text-base line-clamp-2">{event.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 line-clamp-3 leading-relaxed mb-4 text-sm sm:text-base">
                        {event.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                          <Users className="h-3 w-3" />
                          {event.attendeeCount} attendees
                        </span>

                        {/* Join/Joined Button */}
                        {userJoined ? (
                          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-green-200">
                            <Check className="h-3 w-3" />
                            Joined
                          </div>
                        ) : (
                          <button
                            onClick={() => handleJoinEvent(event._id)}
                            disabled={isJoining || !currentUser}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                              isJoining || !currentUser
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg text-white hover:scale-105"
                            }`}
                          >
                            {isJoining ? (
                              <>
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Joining...
                              </>
                            ) : (
                              <>
                                <Users className="h-3 w-3" />
                                Join Event
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {!currentUser && (
                        <p className="text-center text-xs text-gray-500 mt-2">Please log in to join events</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Loading More Indicator */}
          {loading && events.length > 0 && (
            <div className="text-center mt-8">
              <Loader2 className="h-8 w-8 animate-spin text-orange-600 mx-auto" />
              <p className="text-gray-600 mt-2">Updating events...</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
