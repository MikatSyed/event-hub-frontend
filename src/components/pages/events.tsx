

import { useEffect, useState } from "react"
import { Calendar, MapPin, User, Users, Search } from "lucide-react"
import { getEvents } from "../../api/eventApi"

// Static demo data
const staticEvents = [
  {
    id: "1",
    title: "Tech Conference 2024",
    creatorName: "John Doe",
    date: "2024-02-15",
    time: "09:00",
    location: "Convention Center, NYC",
    description:
      "Join us for the biggest tech conference of the year featuring industry leaders and innovative technologies.",
    attendeeCount: 150,
    isJoined: false,
  },
  {
    id: "2",
    title: "Music Festival",
    creatorName: "Jane Smith",
    date: "2024-02-20",
    time: "18:00",
    location: "Central Park, NYC",
    description: "An amazing outdoor music festival featuring local and international artists.",
    attendeeCount: 500,
    isJoined: true,
  },
  {
    id: "3",
    title: "Startup Networking",
    creatorName: "Mike Johnson",
    date: "2024-02-10",
    time: "19:00",
    location: "WeWork, Manhattan",
    description: "Network with fellow entrepreneurs and startup enthusiasts in a casual setting.",
    attendeeCount: 75,
    isJoined: false,
  },
]

export default function Events() {
  const [events, setEvents] = useState(staticEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const [loading, setLoading] = useState(false)

    const fetchItems = async () => {
    setLoading(true)
    const response = await getEvents()
    if ('data' in response) {
      setEvents(response.data)
    } else {
      console.error('Error fetching items:', response.error)
    }
    setLoading(false)
  }

   useEffect(() => {
    fetchItems()
  }, [])



  const filteredEvents = events.filter((event) => event.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleJoinEvent = (eventId: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              isJoined: !event.isJoined,
              attendeeCount: event.isJoined ? event.attendeeCount - 1 : event.attendeeCount + 1,
            }
          : event,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-4">
              Premium Events
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exclusive events curated for professionals and enthusiasts like you
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-orange-100">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search premium events by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 w-full border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 bg-white/90 text-lg rounded-lg outline-none"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full lg:w-64 h-12 border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 bg-white/90 rounded-lg outline-none"
              >
                <option value="all">All Events</option>
                <option value="today">Today</option>
                <option value="current-week">Current Week</option>
                <option value="last-week">Last Week</option>
                <option value="current-month">Current Month</option>
                <option value="last-month">Last Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:transform hover:scale-105 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-orange-100 text-orange-700 border border-orange-200 font-semibold px-3 py-1 rounded-full text-sm">
                    Premium Event
                  </span>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-orange-600">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                    <div className="text-xs text-gray-500">{event.time}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <div className="p-1 bg-orange-100 rounded-full">
                    <User className="h-3 w-3 text-orange-600" />
                  </div>
                  <span className="font-medium">{event.creatorName}</span>
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

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-2 bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-sm">
                    <Users className="h-3 w-3" />
                    {event.attendeeCount} attendees
                  </span>

                  <button
                    onClick={() => handleJoinEvent(event.id)}
                    className={
                      event.isJoined
                        ? "bg-green-100 text-green-700 hover:bg-green-100 cursor-default px-4 py-2 rounded-lg text-sm font-semibold"
                        : "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg transition-all duration-300 font-semibold text-white px-4 py-2 rounded-lg text-sm"
                    }
                  >
                    {event.isJoined ? "✓ Joined" : "Join Event"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
