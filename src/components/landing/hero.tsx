import { Calendar, MapPin, Users, Star, Zap, Shield, ArrowRight } from "lucide-react"
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        
               <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-5"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mb-8 leading-tight">
              Discover Premium Events
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join the most exclusive event platform where extraordinary experiences meet exceptional people. Create,
              discover, and attend premium events that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/events">
                <button className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Explore Events
                  <ArrowRight className="ml-2 h-5 w-5 inline" />
                </button>
              </Link>
              <Link to="/add-event">
                <button className="px-12 py-4 text-lg font-semibold border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition-all duration-300 bg-transparent rounded-lg">
                  Create Event
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-orange-300 rounded-full opacity-30 animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-orange-400 rounded-full opacity-25 animate-bounce delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose EventHub Premium?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our premium features designed for discerning event creators and attendees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:transform hover:scale-105 bg-gradient-to-br from-white to-orange-50 rounded-lg p-8">
              <div className="text-center pb-4">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl w-fit shadow-lg">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Event Creation</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Create stunning events with our advanced tools. Rich descriptions, custom branding, and professional
                  layouts that captivate your audience.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:transform hover:scale-105 bg-gradient-to-br from-white to-orange-50 rounded-lg p-8">
              <div className="text-center pb-4">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl w-fit shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Exclusive Communities</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Connect with like-minded professionals and enthusiasts. Join curated communities and build meaningful
                  relationships through shared experiences.
                </p>
              </div>
            </div>

            <div className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:transform hover:scale-105 bg-gradient-to-br from-white to-orange-50 rounded-lg p-8">
              <div className="text-center pb-4">
                <div className="mx-auto mb-6 p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl w-fit shadow-lg">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Discovery</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Discover events tailored to your interests with our intelligent recommendation system. Never miss an
                  opportunity that matters to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-24 px-4 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Premium Features for Premium Events</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Events</h3>
                    <p className="text-gray-600">All events are verified for authenticity and quality assurance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Notifications</h3>
                    <p className="text-gray-600">
                      Get real-time updates about your favorite events and new opportunities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
                    <p className="text-gray-600">Your data is protected with enterprise-grade security measures.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-lg p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Premium Event</h4>
                      <p className="text-sm text-gray-600">Exclusive Access</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tech Innovation Summit 2024</h3>
                  <p className="text-gray-600 mb-4">Join industry leaders for an exclusive networking experience.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-semibold">250+ Attendees</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm">
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-gray-600 font-medium">Premium Events</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                1M+
              </div>
              <div className="text-gray-600 font-medium">Happy Members</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                100+
              </div>
              <div className="text-gray-600 font-medium">Cities Worldwide</div>
            </div>
            <div className="group">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                99%
              </div>
              <div className="text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Experience Premium Events?</h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join thousands of professionals and enthusiasts who trust EventHub for their most important events.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register">
              <button className="px-12 py-4 text-lg font-semibold bg-white text-orange-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
                Start Free Trial
              </button>
            </Link>
            <Link to="/events">
              <button className="px-12 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-orange-600 transition-all duration-300 bg-transparent rounded-lg">
                Browse Events
              </button>
            </Link>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        </div>
      </section>
    </div>
      
    );
};

export default Hero;