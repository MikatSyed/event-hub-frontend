export interface FormErrors {
  name?: string
  email?: string
  password?: string
  photoURL?: string
}

export const validateName = (name: string): string | undefined => {
  if (!name.trim()) return "Full name is required"
  if (name.length < 2) return "Name must be at least 2 characters"
  if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters and spaces"
  return undefined
}

export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) return "Email address is required"
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!regex.test(email)) return "Enter a valid email"
  return undefined
}

export const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required"
  if (password.length < 6) return "Password must be at least 8 characters"
//   if (!/(?=.*[a-z])/.test(password)) return "Include a lowercase letter"
//   if (!/(?=.*[A-Z])/.test(password)) return "Include an uppercase letter"
//   if (!/(?=.*\d)/.test(password)) return "Include a number"
//   if (!/(?=.*[@$!%*?&])/.test(password)) return "Include a special character"
  return undefined
}

export const validatePhotoURL = (url: string): string | undefined => {
  if (!url) return "URL is required" // optional
 
  return undefined
}

export const validateFormRegister = (formData: {
  name: string
  email: string
  password: string
  photoURL: string
}): FormErrors => ({
  name: validateName(formData.name),
  email: validateEmail(formData.email),
  password: validatePassword(formData.password),
  photoURL: validatePhotoURL(formData.photoURL),
})
export const validateFormLogin = (formData: {

  email: string
  password: string

}): FormErrors => ({
 
  email: validateEmail(formData.email),
  password: validatePassword(formData.password),

})


export interface EventFormErrors {
  title?: string
  description?: string
  date?: string
  time?: string
  location?: string
  creatorName?: string
}

export function validateEventForm(data: Record<string, string>): EventFormErrors {
  const errors: EventFormErrors = {}

  if (!data.title?.trim()) errors.title = "Title is required."
  if (!data.description?.trim()) errors.description = "Description is required."
  if (!data.date?.trim()) errors.date = "Date is required."
  if (!data.time?.trim()) errors.time = "Time is required."
  if (!data.location?.trim()) errors.location = "Location is required."
  if (!data.creatorName?.trim()) errors.creatorName = "Creator name is required."

  return errors
}

