import type React from "react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Calendar, Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react"
import { login } from "../../api/authApi"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { validateFormLogin, type FormErrors } from "../../utils/validation"
import { useToast } from "../../hooks/use-toast"
import { storeUserInfo } from "../../helpers/auth/auth.service"

interface FormData {
  email: string
  password: string
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const callback = params.get("callback") || "/";

 
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedFormData = { ...formData, [name]: value }
    setFormData(updatedFormData)

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }

    if (touched[name]) {
      const fieldErrors = validateFormLogin(updatedFormData)
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const fieldErrors = validateFormLogin(formData)
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof FormErrors] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ email: true, password: true })

    const validationErrors = validateFormLogin(formData)
    setErrors(validationErrors)

    const hasErrors = Object.values(validationErrors).some(Boolean)
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
      const response: any = await login(formData)

      if (response?.data?.success) {
        toast({
          variant: "success",
          title: "Login Successful 🎉",
          description: "Redirecting to your home...",
        })
        console.log(response,'78')

       storeUserInfo({ accessToken: response?.data?.data?.accessToken });
         setFormData({
        
          email: "",
          password: ""
        })
        navigate(callback, { replace: true });
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: response?.error?.data || "Invalid credentials. Please try again.",
        })
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Login Error",
        description: "Something went wrong. Please try again.",
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
    optional = false
  ) => {
    const isPasswordField = name === "password"
    return (
      <div className="space-y-2">
        <Label htmlFor={name} className="font-semibold text-gray-700 flex items-center gap-2">
          {icon} {label} {optional ? "" : "*"}
        </Label>
        <div className="relative">
          <Input
            id={name}
            name={name}
            type={isPasswordField ? (showPassword ? "text" : "password") : type}
            required={!optional}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`h-12 pl-10 pr-10 border-2 bg-white/80 backdrop-blur-sm text-base transition-colors ${
              errors[name] ? "border-red-300 focus:border-red-500" : "border-orange-200 focus:border-orange-500"
            }`}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500">{icon}</div>

          {/* Toggle visibility icon for password */}
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {errors[name] && (
            <AlertCircle className="absolute right-8 top-1/2 transform -translate-y-1/2 text-red-500 h-4 w-4" />
          )}
        </div>
        {errors[name] && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle className="h-4 w-4" /> {errors[name]}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-300/20 to-yellow-300/20 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-lg bg-white/95 backdrop-blur-xl border-0 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600" />
        <CardHeader className="text-center pt-8 pb-6">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Calendar className="text-white h-12 w-12" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-2">
            Sign in to access your events.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {renderInput("email", "Email", <Mail className="h-5 w-5" />, "email", "Enter your email")}
            {renderInput("password", "Password", <Lock className="h-5 w-5" />, "password", "Enter your password")}

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
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-orange-600 font-semibold hover:text-orange-700 hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
