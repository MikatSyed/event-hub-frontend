
import { Calendar, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
     
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  EventHub
                </span>
                <div className="text-xs text-gray-400 font-medium">Premium Events</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Discover and create premium events that bring people together. Join thousands of professionals and
              enthusiasts who trust EventHub for their most important gatherings.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  to="#"
                  className="p-2 bg-gray-800 hover:bg-orange-600 rounded-lg transition-colors duration-300"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { to: "/", label: "Home" },
                { to: "/events", label: "Browse Events" },
                { to: "/add-event", label: "Create Event" },
                { to: "/my-events", label: "My Events" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center group text-gray-300 hover:text-orange-400 transition-colors duration-300"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-4">
              {["Help Center", "Contact Support", "Privacy Policy", "Terms of Service"].map((label) => (
                <li key={label}>
                  <Link
                    to="#"
                    className="flex items-center group text-gray-300 hover:text-orange-400 transition-colors duration-300"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 transition-all duration-300 mr-0 group-hover:mr-2" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Get in Touch</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-600/20 rounded-lg">
                  <Mail className="h-4 w-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-gray-300">Email</p>
                  <Link to="mailto:hello@eventhub.com" className="text-white hover:text-orange-400 transition-colors">
                    hello@eventhub.com
                  </Link>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-600/20 rounded-lg">
                  <Phone className="h-4 w-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-gray-300">Phone</p>
                  <Link to="tel:+1234567890" className="text-white hover:text-orange-400 transition-colors">
                    +1 (234) 567-890
                  </Link>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-600/20 rounded-lg">
                  <MapPin className="h-4 w-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-gray-300">Address</p>
                  <p className="text-white">
                    123 Event Street
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold text-white mb-2">Stay Updated</h3>
            <p className="text-gray-300">Get notified about the latest premium events and exclusive offers.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 md:w-80 px-4 py-3 bg-gray-800 border border-gray-600 rounded-l-lg focus:outline-none focus:border-orange-500 placeholder-gray-400"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg transition-all duration-300 rounded-r-lg font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <span>© 2024 EventHub Premium. All rights reserved.</span>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Privacy", "Terms", "Cookies", "Accessibility"].map((item) => (
              <Link key={item} to="#" className="hover:text-orange-400">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
