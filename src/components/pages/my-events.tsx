"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, MapPin, User, Users, Edit, Trash2, Plus } from "lucide-react"

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

// Static demo data
const staticEvents: Event[] = [
  
]

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[]>(staticEvents)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [updateFormData, setUpdateFormData] = useState({
    title: "",
    creatorName: "",
    date: "",
    time: "",
    location: "",
    description: "",
    attendeeCount: 0,
  })

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setUpdateFormData({
      title: event.title,
      creatorName: event.creatorName,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      attendeeCount: event.attendeeCount,
    })
    setIsUpdateModalOpen(true)
  }

  const handleUpdate = () => {
    if (!editingEvent) return

    setIsUpdating(true)

    // Simulate API call delay
    setTimeout(() => {
      setEvents(events.map((event) => (event._id === editingEvent._id ? { ...event, ...updateFormData } : event)))
      setIsUpdateModalOpen(false)
      setEditingEvent(null)
      setIsUpdating(false)
    }, 1000)
  }

  const handleDeleteClick = (event: Event) => {
    setDeletingEvent(event)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = () => {
    if (!deletingEvent) return

    setIsDeleting(true)

    // Simulate API call delay
    setTimeout(() => {
      setEvents(events.filter((event) => event._id !== deletingEvent._id))
      setIsDeleteModalOpen(false)
      setDeletingEvent(null)
      setIsDeleting(false)
    }, 1000)
  }

  const handleUpdateFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUpdateFormData({
      ...updateFormData,
      [name]: name === "attendeeCount" ? Number.parseInt(value) || 0 : value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-3">
                My Premium Events
              </h1>
              <p className="text-lg text-gray-600">Manage and track your exclusive events</p>
            </div>
            <button
              onClick={() => (window.location.href = "/add-event")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg transition-all duration-300 font-semibold px-6 py-2 text-white rounded-lg flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create Event
            </button>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <Calendar className="h-16 w-16 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No events created yet</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Start creating premium events and build your community of engaged attendees.
            </p>
            <button
              onClick={() => (window.location.href = "/add-event")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg transition-all duration-300 font-semibold px-8 py-3 text-white rounded-lg flex items-center gap-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              Create Your First Event
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:transform hover:scale-105 rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{event.creatorName}</span>
                      </div>
                    </div>
                    <span className="bg-orange-100 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-sm font-semibold">
                      Premium
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="p-1.5 bg-orange-100 rounded-lg">
                        <Calendar className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="font-medium">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at {event.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="p-1.5 bg-orange-100 rounded-lg">
                        <MapPin className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 line-clamp-3 leading-relaxed mb-4">{event.description}</p>

                  <div className="flex items-center justify-between pt-2 mb-4">
                    <span className="flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-sm">
                      <Users className="h-3 w-3" />
                      {event.attendeeCount} attendees
                    </span>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(event)}
                      className="flex-1 border border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Update
                    </button>

                    <button
                      onClick={() => handleDeleteClick(event)}
                      className="flex-1 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Update Modal */}
        {isUpdateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Update Premium Event</h2>
                  <p className="text-gray-600">Make changes to your event details. All fields are required.</p>
                </div>

                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Event Title</label>
                    <input
                      name="title"
                      value={updateFormData.title}
                      onChange={handleUpdateFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="Enter event title"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Creator Name</label>
                    <input
                      name="creatorName"
                      value={updateFormData.creatorName}
                      onChange={handleUpdateFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Date</label>
                      <input
                        name="date"
                        type="date"
                        value={updateFormData.date}
                        onChange={handleUpdateFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Time</label>
                      <input
                        name="time"
                        type="time"
                        value={updateFormData.time}
                        onChange={handleUpdateFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Location</label>
                    <input
                      name="location"
                      value={updateFormData.location}
                      onChange={handleUpdateFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none"
                      placeholder="Event location"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                      name="description"
                      value={updateFormData.description}
                      onChange={handleUpdateFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none min-h-[100px] resize-none"
                      placeholder="Describe your event..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Attendee Count</label>
                    <input
                      name="attendeeCount"
                      type="number"
                      min="0"
                      value={updateFormData.attendeeCount}
                      onChange={handleUpdateFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setIsUpdateModalOpen(false)}
                    disabled={isUpdating}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg transition-all duration-300 font-semibold text-white px-4 py-2 rounded-lg"
                  >
                    {isUpdating ? "Updating..." : "Update Event"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-red-600 mb-2">Delete Event</h2>
                  <p className="text-gray-600">
                    Are you absolutely sure you want to delete this event? This action cannot be undone.
                  </p>
                </div>

                {deletingEvent && (
                  <div className="mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">{deletingEvent.title}</h4>
                      <p className="text-red-700 text-sm">
                        This will permanently delete the event and remove all associated data including{" "}
                        {deletingEvent.attendeeCount} attendees.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    disabled={isDeleting}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    {isDeleting ? "Deleting..." : "Delete Event"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
