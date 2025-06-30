import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Plus } from "lucide-react"

export default function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    creatorName: "",
    date: "",
    time: "",
    location: "",
    description: "",
    attendeeCount: 0,
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()

  // Check for authentication
//   const checkAuth = async () => {
//     const token = localStorage.getItem("token")
//     if (!token) {
//       navigate("/login")
//       return
//     }

//     try {
//       const response = await fetch("/api/auth/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       if (response.ok) {
//         const userData = await response.json()
//         setUser(userData)
//         setFormData((prev) => ({ ...prev, creatorName: userData.name }))
//       } else {
//         navigate("/login")
//       }
//     } catch (error) {
//       navigate("/login")
//     }
//   }

//   // Initialize checkAuth on component mount
//   React.useEffect(() => {
//     checkAuth()
//   }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "attendeeCount" ? Number.parseInt(value) || 0 : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
       navigate("/events")
      } else {
        setError(data.message || "Failed to create event")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-premium-gradient bg-clip-text text-transparent mb-4">
            Create Premium Event
          </h1>
          <p className="text-lg text-gray-600">Design an exceptional event experience for your audience</p>
        </div>

        <Card className="shadow-premium-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-premium-gradient rounded-2xl shadow-premium">
                <Plus className="h-12 w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Event Details</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Fill in the information below to create your premium event
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-8">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-base font-semibold text-gray-700">
                    Event Title *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter an engaging event title"
                    className="h-12 border-primary-200 focus:border-primary-500 focus:ring-primary-500 text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="creatorName" className="text-base font-semibold text-gray-700">
                    Creator Name *
                  </Label>
                  <Input
                    id="creatorName"
                    name="creatorName"
                    type="text"
                    required
                    value={formData.creatorName}
                    onChange={handleChange}
                    placeholder="Your name or organization"
                    className="h-12 border-primary-200 focus:border-primary-500 focus:ring-primary-500 text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="date" className="text-base font-semibold text-gray-700">
                      Event Date *
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="h-12 border-primary-200 focus:border-primary-500 focus:ring-primary-500 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="time" className="text-base font-semibold text-gray-700">
                      Event Time *
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="h-12 border-primary-200 focus:border-primary-500 focus:ring-primary-500 text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="location" className="text-base font-semibold text-gray-700">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Event venue or online platform"
                    className="h-12 border-primary-200 focus:border-primary-500 focus:ring-primary-500 text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-base font-semibold text-gray-700">
                    Event Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your event in detail. What makes it special? What will attendees experience?"
                    rows={6}
                    className="border-primary-200 focus:border-primary-500 focus:ring-primary-500 text-lg resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="attendeeCount" className="text-base font-semibold text-gray-700">
                    Initial Attendee Count
                  </Label>
                  <Input
                    id="attendeeCount"
                    name="attendeeCount"
                    type="number"
                    min="0"
                    value={formData.attendeeCount}
                    onChange={handleChange}
                    placeholder="0"
                    className="h-12 border-primary-200 focus:border-primary-500 focus:ring-primary-500 text-lg"
                  />
                  <p className="text-sm text-gray-500">
                    Set to 0 if this is a new event, or enter current number of confirmed attendees
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-semibold bg-premium-gradient hover:shadow-premium-lg transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Premium Event...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Plus className="h-5 w-5" />
                      Create Premium Event
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
