import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  User,
  FileText,
  Heading3,
  AlertCircle,
  Plus,
  ArrowLeft,
  Star,
  List,
} from "lucide-react";
import { createEvent } from "../../api/eventApi";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import {
  validateEventForm,
  type EventFormErrors,
} from "../../utils/validation";
import { useToast } from "../../hooks/use-toast";


interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  creatorName: string;
}

export default function AddEvent() {
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    creatorName: "",
  });
  const [errors, setErrors] = useState<EventFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (errors[name as keyof EventFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (touched[name]) {
      const fieldErrors = validateEventForm(updatedForm);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name as keyof EventFormErrors],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validateEventForm(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name as keyof EventFormErrors],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    const validationErrors = validateEventForm(formData);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some((e) => e);

    if (hasErrors) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response:any = await createEvent(formData);

      if (response?.data?.success) {
        toast({
          title: "Event Created Successfully! 🎉",
          description: "Your premium event has been added and is now live.",
        });

        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          creatorName: "",
        });
        setErrors({});
        setTouched({});

       
      } else {
        toast({
          variant: "destructive",
          title: "Creation Failed",
          description: response?.error?.data || "Please try again later.",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong while creating the event.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
   navigate(-1);
  };

  const renderInput = (
    name: keyof EventFormData,
    label: string,
    icon: React.ReactNode,
    type: string,
    placeholder: string,
    isTextarea = false
  ) => (
    <div className="space-y-3">
      <Label
        htmlFor={name}
        className="text-base font-semibold text-gray-800 flex items-center gap-2"
      >
        <div className="p-1 bg-orange-100 rounded-lg">{icon}</div>
        {label}
        <span className="text-orange-500">*</span>
      </Label>
      <div className="relative">
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            rows={4}
            className={`w-full pl-12 pr-4 py-4 border-2 bg-white/90 backdrop-blur-sm text-base rounded-xl transition-all duration-300 resize-none focus:outline-none focus:ring-4 focus:ring-orange-500/20 ${
              errors[name]
                ? "border-red-300 focus:border-red-500"
                : "border-orange-200 focus:border-orange-500 hover:border-orange-300"
            }`}
          />
        ) : (
          <Input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`h-14 pl-12 pr-4 border-2 bg-white/90 backdrop-blur-sm text-base rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-500/20 ${
              errors[name]
                ? "border-red-300 focus:border-red-500"
                : "border-orange-200 focus:border-orange-500 hover:border-orange-300"
            }`}
          />
        )}
        <div className="absolute left-4 top-4 text-orange-500">{icon}</div>
        {errors[name] && (
          <AlertCircle className="absolute right-4 top-4 text-red-500 h-5 w-5" />
        )}
      </div>
      {errors[name] && (
        <p className="text-red-600 text-sm flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-300/10 to-yellow-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-200/5 to-amber-200/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 container mx-auto  py-8 lg:py-16">
          <div className="flex justify-between mb-8">
            <button
              onClick={handleBack}
              className="inline-flex items-center text-gray-600 hover:text-orange-600 font-medium transition-colors rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Back to Previous Page"
              type="button"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#ff6900] mr-2">
                <ArrowLeft className="w-6 h-6 text-[#ff6900]" />
              </span>
              Back
            </button>

            <button
              onClick={() => navigate("/events")}
              className="inline-flex items-center bg-orange-600 text-white hover:bg-orange-700 font-semibold rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition cursor-pointer"
              aria-label="Go to Events List"
              type="button"
            >
              <List className="w-6 h-6 mr-2" />
              Events List
            </button>
          </div>

          {/* Main Form Card */}
          <div className="max-w-8xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl  overflow-hidden rounded-md">
              {/* Card Header */}
              <CardHeader className=" p-6 lg:p-8 rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      Event Details
                    </CardTitle>
                    <CardDescription className="text-base lg:text-lg text-gray-600 mt-2">
                      Fill in the information below to create your event
                    </CardDescription>
                  </div>
                  <div className="hidden lg:flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                    <Star className="h-4 w-4 text-orange-600" />
                  </div>
                </div>
              </CardHeader>

              {/* Form Content */}
              <CardContent className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Form Grid - Responsive Layout */}
                  <div className="grid grid-cols-1 gap-6 lg:gap-8">
                    {/* Title - Full Width */}
                    <div>
                      {renderInput(
                        "title",
                        "Event Title",
                        <Heading3 className="h-5 w-5" />,
                        "text",
                        "Enter an engaging event title"
                      )}
                    </div>

                    {/* Date + Time - 50/50 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {renderInput(
                        "date",
                        "Event Date",
                        <Calendar className="h-5 w-5" />,
                        "date",
                        ""
                      )}
                      {renderInput(
                        "time",
                        "Event Time",
                        <Clock className="h-5 w-5" />,
                        "time",
                        ""
                      )}
                    </div>

                    {/* Description - Full Width */}
                    <div>
                      {renderInput(
                        "description",
                        "Event Description",
                        <FileText className="h-5 w-5" />,
                        "text",
                        "Describe your event in detail...",
                        true
                      )}
                    </div>

                    {/* Creator Name + Location - 50/50 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {renderInput(
                        "creatorName",
                        "Creator Name",
                        <User className="h-5 w-5" />,
                        "text",
                        "Your name or organization"
                      )}
                      {renderInput(
                        "location",
                        "Event Location",
                        <MapPin className="h-5 w-5" />,
                        "text",
                        "Venue or online platform"
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-200">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full h-16 text-lg font-semibold rounded-xl transition-all duration-300 transform ${
                        isLoading
                          ? "bg-gray-400 cursor-not-allowed scale-100"
                          : "bg-[#ff6900] hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 "
                      } text-white `}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating Event...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <Plus className="h-6 w-6" />
                          <span>Create Event</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
