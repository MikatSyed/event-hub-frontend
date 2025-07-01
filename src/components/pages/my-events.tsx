"use client"

import { useEffect, useState, useCallback } from "react"
import { Calendar, MapPin, User, Users, Loader2, AlertCircle, Edit, Trash2, Plus } from "lucide-react"
import { getMyEvents, updateEvent, deleteEvent } from "../../api/eventApi"
import { useToast } from "../../hooks/use-toast"
import Footer from "../landing/footer"
import Navbar from "../landing/navbar"
import UpdateEventModal from "../update-event-modal"
import DeleteEventModal from "../delete-event-modal"


interface Event {
  _id: string
  title: string
  creatorName: string
  date: string
  time: string
  location: string
  description: string
  attendeeCount: number
}

interface ApiResponse {
  statusCode: number
  success: boolean
  message: string
  meta?: {
    page: number
    limit: number
    total: number
  }
  data: Event[]
}

interface EventFormData {
  title: string
  description: string
  date: string
  time: string
  location: string
  creatorName: string
}

export default function MyEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0 })

  // Modal states
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { toast } = useToast()

  const fetchMyEvents = useCallback(async (params: any = {}) => {
    setLoading(true)
    setError(null)
    try {
      const response: any = await getMyEvents(params)
      if ("data" in response && response.data) {
        const apiResponse: any = response as ApiResponse
        if (apiResponse) {
          setEvents(apiResponse.data.data)
          if (apiResponse.meta) {
            setMeta(apiResponse.meta)
          }
        } else {
          setError(apiResponse.message || "Failed to fetch events")
        }
      } else {
        setError("Error fetching events")
        console.error("Error fetching events:", response.error)
      }
    } catch (err: any) {
      setError(err.message || "Network error occurred")
      console.error("Fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMyEvents()
  }, [fetchMyEvents])

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

  // Handle Update Modal
  const handleUpdateClick = (event: Event) => {
    setSelectedEvent(event)
    setIsUpdateModalOpen(true)
  }

  const handleUpdateSubmit = async (formData: EventFormData) => {
    if (!selectedEvent) return

    setIsUpdating(true)
    try {
      const response: any = await updateEvent(selectedEvent._id, formData)
      if (response?.data?.success) {
        toast({
          title: "Event Updated Successfully! 🎉",
          description: "Your event has been updated.",
        })

        // Update the event in the local state
        setEvents(events.map((event) => (event._id === selectedEvent._id ? { ...event, ...formData } : event)))

        setIsUpdateModalOpen(false)
        setSelectedEvent(null)
      } else {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: response?.error?.data || "Please try again later.",
        })
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Something went wrong while updating the event.",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle Delete Modal
  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteSubmit = async () => {
    if (!selectedEvent) return

    setIsDeleting(true)
    try {
      const response: any = await deleteEvent(selectedEvent._id)
      if (response?.data?.success) {
        toast({
          title: "Event Deleted Successfully! 🗑️",
          description: "Your event has been deleted.",
        })

        // Remove the event from local state
        setEvents(events.filter((event) => event._id !== selectedEvent._id))

        setIsDeleteModalOpen(false)
        setSelectedEvent(null)
      } else {
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: response?.error?.data || "Please try again later.",
        })
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Something went wrong while deleting the event.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-4 sm:py-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-4">
                My Events
              </h1>
              <p className="text-lg text-gray-600">Manage and track your events</p>
            </div>
          </div>

          {/* Loading State */}
          {loading && events.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Your Events</h2>
              <p className="text-gray-600">Fetching your events...</p>
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
                    onClick={() => fetchMyEvents()}
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
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">No Events Created Yet</h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">
                You haven't created any events yet. Start creating your first event!
              </p>
              <button
                onClick={() => (window.location.href = "/add-event")}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg transition-all duration-300 font-semibold px-6 py-3 text-white rounded-lg flex items-center gap-2 mx-auto"
              >
                <Plus className="h-5 w-5" />
                Create Your First Event
              </button>
            </div>
          )}

          {/* Events Grid */}
          {events.length > 0 && (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
                const dateFormatted = formatDate(event.date)

                return (
                  <div
                    key={event._id}
                    className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-3">
                        <span className="bg-orange-100 text-orange-700 border border-orange-200 font-semibold px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                          My Event
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
                          <User className="h-3 w-3 text-orange-600" />
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

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
                        <span className="flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                          <Users className="h-3 w-3" />
                          {event.attendeeCount} attendees
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleUpdateClick(event)}
                          className="flex-1 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-300 font-semibold px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Update
                        </button>

                        <button
                          onClick={() => handleDeleteClick(event)}
                          className="flex-1 bg-red-100 text-red-700 hover:bg-red-200 transition-all duration-300 font-semibold px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
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

      {/* Update Modal */}
      <UpdateEventModal
        isOpen={isUpdateModalOpen}
        event={selectedEvent}
        onClose={() => {
          setIsUpdateModalOpen(false)
          setSelectedEvent(null)
        }}
        onUpdate={handleUpdateSubmit}
        isUpdating={isUpdating}
      />

      {/* Delete Modal */}
      <DeleteEventModal
        isOpen={isDeleteModalOpen}
        event={selectedEvent}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedEvent(null)
        }}
        onDelete={handleDeleteSubmit}
        isDeleting={isDeleting}
      />

      <Footer />
    </>
  )
}
