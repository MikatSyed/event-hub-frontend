

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar, MapPin, User, X, Loader2, AlertCircle } from "lucide-react"
import { validateEventForm, type EventFormErrors } from "../../utils/validation"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

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

interface EventFormData {
  title: string
  description: string
  date: string
  time: string
  location: string
  creatorName: string
}

interface UpdateEventModalProps {
  isOpen: boolean
  event: Event | null
  onClose: () => void
  onUpdate: (formData: EventFormData) => Promise<void>
  isUpdating: boolean
}

export default function UpdateEventModal({ isOpen, event, onClose, onUpdate, isUpdating }: UpdateEventModalProps) {
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    creatorName: "",
  })
  const [errors, setErrors] = useState<EventFormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Update form data when event changes
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        creatorName: event.creatorName,
      })
      setErrors({})
      setTouched({})
    }
  }, [event])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updatedForm = { ...formData, [name]: value }
    setFormData(updatedForm)

    if (errors[name as keyof EventFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    if (touched[name]) {
      const fieldErrors = validateEventForm(updatedForm)
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof EventFormErrors] }))
    }
  }

  const handleFormBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const fieldErrors = validateEventForm(formData)
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof EventFormErrors] }))
  }

  const handleSubmit = async () => {
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
    const validationErrors = validateEventForm(formData)
    setErrors(validationErrors)

    const hasErrors = Object.values(validationErrors).some((e) => e)
    if (hasErrors) {
      return
    }

    await onUpdate(formData)
  }

  const renderInput = (
    name: keyof EventFormData,
    label: string,
    icon: React.ReactNode,
    type: string,
    placeholder: string,
    isTextarea = false,
  ) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <div className="text-orange-600">{icon}</div>
        <span>{label}</span>
        <span className="text-red-500">*</span>
      </Label>
      <div className="relative">
        {isTextarea ? (
          <Textarea
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleFormChange}
            onBlur={handleFormBlur}
            placeholder={placeholder}
            rows={4}
            className={`w-full pl-12 pr-4 py-3 bg-white border-2 rounded-xl text-gray-900 transition-all duration-300 resize-none ${
              errors[name]
                ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
            }`}
          />
        ) : (
          <Input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleFormChange}
            onBlur={handleFormBlur}
            placeholder={placeholder}
            className={`w-full h-12 pl-12 pr-4 bg-white border-2 rounded-xl text-gray-900 transition-all duration-300 ${
              errors[name]
                ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
            }`}
          />
        )}
        <div className="absolute left-4 top-3.5 text-orange-600 pointer-events-none">{icon}</div>
        {errors[name] && <AlertCircle className="absolute right-4 top-3.5 text-red-500 h-5 w-5" />}
      </div>
      {errors[name] && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm font-medium">{errors[name]}</p>
        </div>
      )}
    </div>
  )

  if (!isOpen || !event) return null

  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Update Event</h2>
              <p className="text-gray-600 text-sm mt-1">Make changes to your event details</p>
            </div>
            <button
              onClick={onClose}
              disabled={isUpdating}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Event Title */}
            <div className="bg-gradient-to-r from-orange-50/30 to-white p-4 rounded-xl border border-orange-100">
              {renderInput("title", "Event Title", <Calendar className="h-5 w-5" />, "text", "Enter event title")}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50/30 to-white p-4 rounded-xl border border-blue-100">
                {renderInput("date", "Event Date", <Calendar className="h-5 w-5" />, "date", "")}
              </div>
              <div className="bg-gradient-to-r from-purple-50/30 to-white p-4 rounded-xl border border-purple-100">
                {renderInput("time", "Event Time", <Calendar className="h-5 w-5" />, "time", "")}
              </div>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-r from-green-50/30 to-white p-4 rounded-xl border border-green-100">
              {renderInput(
                "description",
                "Event Description",
                <Calendar className="h-5 w-5" />,
                "text",
                "Describe your event",
                true,
              )}
            </div>

            {/* Creator and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-cyan-50/30 to-white p-4 rounded-xl border border-cyan-100">
                {renderInput("creatorName", "Creator Name", <User className="h-5 w-5" />, "text", "Your name")}
              </div>
              <div className="bg-gradient-to-r from-pink-50/30 to-white p-4 rounded-xl border border-pink-100">
                {renderInput("location", "Event Location", <MapPin className="h-5 w-5" />, "text", "Event location")}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            <Button onClick={onClose} variant="outline" className="flex-1 h-12 bg-transparent" disabled={isUpdating}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 h-12 bg-[#ff6800] text-white cursor-pointer hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </div>
              ) : (
                "Update Event"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
