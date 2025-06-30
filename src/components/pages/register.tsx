"use client"

import type React from "react"
import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import { Calendar, User, Mail, Lock, ImageIcon, AlertCircle } from "lucide-react"
import { signup } from "../../api/authApi"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { validateFormRegister, type FormErrors } from "../../utils/validation"
import { useToast } from "../../hooks/use-toast"


interface FormData {
  name: string
  email: string
  password: string
  photoURL: string
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Update form data with the new value
    const updatedFormData = { ...formData, [name]: value }
    setFormData(updatedFormData)

    // Clear existing error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    // Validate field if it has been touched
    if (touched[name]) {
      const fieldErrors = validateFormRegister(updatedFormData)
      const fieldError = fieldErrors[name as keyof FormErrors]
      setErrors((prev) => ({ ...prev, [name]: fieldError }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target

    setTouched((prev) => ({ ...prev, [name]: true }))

    // Validate the field with current form data
    const fieldErrors = validateFormRegister(formData)
    const fieldError = fieldErrors[name as keyof FormErrors]
    setErrors((prev) => ({ ...prev, [name]: fieldError }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      photoURL: true,
    })

    // Validate the entire form
    const formValidationErrors = validateFormRegister(formData)
    setErrors(formValidationErrors)

    // Check if there are any validation errors
    const hasErrors = Object.values(formValidationErrors).some((error) => error !== undefined && error !== "")

    if (hasErrors) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
      })
      return
    }

    setIsLoading(true)

    try {
      console.log("Submitting form data:", formData)
      const response:any = await signup(formData)
     

      // Check for successful response
      if (response?.data?.success) {
        // Show success toast
        toast({
          title: "Registration Successful! 🎉",
          description: "Welcome! Redirecting to login page...",
          variant: "default",
        })

        // Reset form data
        setFormData({
          name: "",
          email: "",
          password: "",
          photoURL: "",
        })

        // Reset errors and touched state
        setErrors({})
        setTouched({})

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login")
        }, 3000)
      } else {
        // Handle API error response
        const errorMessage = response?.error?.data || "Registration failed. Please try again."
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: errorMessage,
        })
      }
    } catch (err: any) {
      console.error("Registration error:", err)

      let errorMessage = "Something went wrong. Please try again."
      let errorTitle = "Registration Error"

      // Handle different types of errors
     
      toast({
        variant: "destructive",
        title: errorTitle,
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderInput = (
    name: keyof FormData,
    label: string,
    icon: React.ReactNode,
    type: string,
    placeholder: string,
    optional = false,
  ) => (
    <div className="space-y-2">
      <Label htmlFor={name} className="font-semibold text-gray-700 flex items-center gap-2">
        {icon} {label} {optional ? "" : "*"}
      </Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type}
          required={!optional}
          value={formData[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`h-12 pl-10 pr-4 border-2 bg-white/80 backdrop-blur-sm text-base transition-colors ${
            errors[name] ? "border-red-300 focus:border-red-500" : "border-orange-200 focus:border-orange-500"
          }`}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500">{icon}</div>
        {errors[name] && (
          <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 h-4 w-4" />
        )}
      </div>
      {errors[name] && (
        <p className="text-red-500 text-sm flex items-center gap-1">
          <AlertCircle className="h-4 w-4" /> {errors[name]}
        </p>
      )}
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 px-4 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-300/20 to-yellow-300/20 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-lg bg-white/95 backdrop-blur-xl border-0  relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600" />

        <CardHeader className="text-center pt-8 pb-6">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Calendar className="text-white h-12 w-12" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-2">
            Join to explore, host, and manage amazing events.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {renderInput("name", "Full Name", <User className="h-5 w-5" />, "text", "Enter your full name")}
            {renderInput("email", "Email", <Mail className="h-5 w-5" />, "email", "Enter your email")}
            {renderInput("password", "Password", <Lock className="h-5 w-5" />, "password", "Create a strong password")}
            {renderInput(
              "photoURL",
              "Photo URL",
              <ImageIcon className="h-5 w-5" />,
              "url",
              "Add profile picture",
              true,
            )}

           <Button
  type="submit"
  className={`w-full h-14 text-lg font-semibold transition-all duration-300 ${
    isLoading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#ff6900] hover:bg-orange-600 hover:via-amber-600 hover:to-orange-700 cursor-pointer"
  } text-white rounded-lg`}
  disabled={isLoading}
>
  {isLoading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      Creating Account...
    </div>
  ) : (
    "Create Account"
  )}
</Button>

          </form>

          <div className="text-center pt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-600 font-semibold hover:text-orange-700 hover:underline transition-colors"
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
