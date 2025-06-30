import type React from "react"
import { useState } from "react"

import {Link} from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Calendar } from "lucide-react"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
//   const navigate = useNavigation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("token", data.token)
        //  navigate("/events")
      } else {
        setError(data.message || "Registration failed")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-premium-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-premium-gradient rounded-2xl shadow-premium">
              <Calendar className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-premium-gradient bg-clip-text text-transparent">
            Join Premium
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Create your account and start discovering exclusive events
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3">
              <Label htmlFor="name" className="text-base font-semibold text-gray-700">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="h-12 border-primary-200 focus:border-primary-500 focus:ring-primary-500 text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-base font-semibold text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="h-12 border-primary-200 focus:border-primary-500 focus:ring-primary-500 text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-base font-semibold text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a secure password"
                className="h-12 border-primary-200 focus:border-primary-500 focus:ring-primary-500 text-lg"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="photoURL" className="text-base font-semibold text-gray-700">
                Photo URL (Optional)
              </Label>
              <Input
                id="photoURL"
                name="photoURL"
                type="url"
                value={formData.photoURL}
                onChange={handleChange}
                placeholder="Enter your photo URL"
                className="h-12 border-primary-200 focus:border-primary-500 focus:ring-primary-500 text-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-premium-gradient hover:shadow-premium transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Premium Account"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
