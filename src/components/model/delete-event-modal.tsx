
import { X, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "../ui/button"



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

interface DeleteEventModalProps {
  isOpen: boolean
  event: Event | null
  onClose: () => void
  onDelete: () => Promise<void>
  isDeleting: boolean
}

export default function DeleteEventModal({ isOpen, event, onClose, onDelete, isDeleting }: DeleteEventModalProps) {
  if (!isOpen || !event) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-600">Delete Event</h2>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Warning Message */}
          <div className="mb-6">
            <p className="text-gray-700 mb-4 leading-relaxed">
              Are you sure you want to permanently delete this event? All event data and attendee information will be
              lost forever.
            </p>

            {/* Event Details Card */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-red-900 text-lg mb-1">{event.title}</h4>
                  <p className="text-red-700 text-sm font-medium">by {event.creatorName}</p>
                </div>
                <div className="text-right">
                  <div className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {event.attendeeCount} attendees
                  </div>
                </div>
              </div>

           
            </div>

           
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 border-2 border-gray-300 hover:bg-gray-50 font-semibold bg-transparent"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={onDelete}
              className="flex-1 h-12 bg-[#ff6800]  text-white hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold cursor-pointer"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Delete Forever</span>
                </div>
              )}
            </Button>
          </div>

          {/* Additional Confirmation */}
          {!isDeleting && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">Type the event title to confirm deletion (coming soon)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
