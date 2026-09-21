"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Upload, X, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
<<<<<<< HEAD
import { serviceBookingService } from "@/services/serviceBooking.service";
=======
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateBookingMutation } from "@/features/service_bookings/api/serviceBookingsApi";
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1

const SERVICE_TYPES = [
  { label: "Installation", value: "INSTALLATION" },
  { label: "Repair", value: "REPAIR" },
  { label: "Maintenance", value: "MAINTENANCE" },
  { label: "Filter Replacement", value: "FILTER_REPLACEMENT" },
  { label: "Water Quality Check", value: "WATER_QUALITY_CHECK" },
  { label: "General Service", value: "GENERAL_SERVICE" },
];

<<<<<<< HEAD
export default function BookServicePage() {
  const [saving, setSaving] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [bookingId, setBookingId] = useState("");

  const [form, setForm] = useState({
    customer_name: "",
    phone_number: "",
    email: "",
    product_category: "",
    product_model_text: "",
    service_type: "",
    division: "",
    district: "",
    full_address: "",
    preferred_date: "",
    preferred_time: "",
    issue_description: "",
  });

  const [attachment, setAttachment] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
=======
const bookingSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required."),
  phone_number: z.string().min(1, "Phone number is required."),
  email: z.string().email("Invalid email").or(z.literal("")).optional(),
  product_category: z.string().optional(),
  product_model_text: z.string().min(1, "Product model is required."),
  service_type: z.string().min(1, "Service type is required."),
  division: z.string().min(1, "Division is required."),
  district: z.string().min(1, "District is required."),
  full_address: z.string().min(1, "Full address is required."),
  preferred_date: z.string().min(1, "Preferred date is required."),
  preferred_time: z.string().min(1, "Preferred time is required."),
  issue_description: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookServicePage() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [bookingId, setBookingId] = useState("");
  
  const [attachment, setAttachment] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customer_name: "",
      phone_number: "",
      email: "",
      product_category: "",
      product_model_text: "",
      service_type: "",
      division: "",
      district: "",
      full_address: "",
      preferred_date: "",
      preferred_time: "",
      issue_description: "",
    },
    mode: "onTouched",
  });

  const [createBookingApi] = useCreateBookingMutation();
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1

  useEffect(() => {
    if (attachment) {
      const objectUrl = URL.createObjectURL(attachment);
<<<<<<< HEAD
      // eslint-disable-next-line react-hooks/set-state-in-effect
=======
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [attachment]);

<<<<<<< HEAD
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.customer_name.trim()) newErrors.customer_name = "Customer name is required.";
    if (!form.phone_number.trim()) newErrors.phone_number = "Phone number is required.";
    if (!form.product_model_text.trim()) newErrors.product_model_text = "Product model is required.";
    if (!form.service_type) newErrors.service_type = "Service type is required.";
    if (!form.division.trim()) newErrors.division = "Division is required.";
    if (!form.district.trim()) newErrors.district = "District is required.";
    if (!form.full_address.trim()) newErrors.full_address = "Full address is required.";
    if (!form.preferred_date) newErrors.preferred_date = "Preferred date is required.";
    if (!form.preferred_time.trim()) newErrors.preferred_time = "Preferred time is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      setSaving(true);
      setSubmitStatus("idle");

      const payload = {
        ...form,
        attachment: attachment,
      };

      const response = await serviceBookingService.createBooking(payload);
=======
  const onSubmit = async (data: BookingFormValues) => {
    try {
      setSubmitStatus("idle");

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (attachment) {
        formData.append("attachment", attachment);
      }

      const response = await createBookingApi(formData).unwrap();
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
      
      setBookingId(response.booking_id || "REF-UNKNOWN");
      setSubmitStatus("success");
      toast.success(`Booking created successfully! Ref: ${response.booking_id || 'N/A'}`);
<<<<<<< HEAD
    } catch (error: unknown) {
      console.error("Booking Error:", error);
      setSubmitStatus("error");
    } finally {
      setSaving(false);
=======
    } catch (error: any) {
      console.error("Booking Error:", error);
      setSubmitStatus("error");
      toast.error(error.data?.detail || "Failed to create booking.");
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Thank you!</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Your service request has been submitted successfully. Our support team will contact you shortly.
          </p>
          {bookingId && (
            <div className="mt-6 rounded-lg bg-gray-50 p-4 border border-gray-100">
              <p className="text-sm text-gray-500">Booking Reference</p>
              <p className="mt-1 font-mono text-lg font-semibold text-gray-900">{bookingId}</p>
            </div>
          )}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-xl bg-brand-blue px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Homepage
        </Link>

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-200/50">
          <div className="border-b border-gray-100 bg-white px-8 py-6">
            <h1 className="text-2xl font-bold text-gray-900">Book a Service</h1>
            <p className="mt-2 text-sm text-gray-500">
              Schedule a maintenance, repair, or installation for your NeaPure product.
            </p>
          </div>

          {submitStatus === "error" && (
            <div className="mx-8 mt-6 flex items-start gap-3 rounded-lg bg-red-50 p-4 text-red-800">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Submission Failed</h3>
                <p className="mt-1 text-sm">
                  We couldn&apos;t submit your request right now. Please try again shortly, or reach us directly via Call Us or WhatsApp.
                </p>
              </div>
            </div>
          )}

<<<<<<< HEAD
          <form onSubmit={handleSubmit} className="p-8">
=======
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-8">
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              {/* Customer Name */}
              <div className="sm:col-span-2">
                <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="customer_name"
<<<<<<< HEAD
                    name="customer_name"
                    value={form.customer_name}
                    onChange={handleChange}
=======
                    {...register("customer_name")}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                    className={`block w-full rounded-lg border ${
                      errors.customer_name ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    } px-4 py-2.5 shadow-sm sm:text-sm`}
                    placeholder="John Doe"
                  />
<<<<<<< HEAD
                  {errors.customer_name && <p className="mt-1 text-xs text-red-500">{errors.customer_name}</p>}
=======
                  {errors.customer_name && <p className="mt-1 text-xs text-red-500">{errors.customer_name?.message as string}</p>}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="phone_number"
<<<<<<< HEAD
                    name="phone_number"
                    value={form.phone_number}
                    onChange={handleChange}
=======
                    {...register("phone_number")}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                    className={`block w-full rounded-lg border ${
                      errors.phone_number ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    } px-4 py-2.5 shadow-sm sm:text-sm`}
                    placeholder="e.g. 01xxxxxxxxx"
                  />
<<<<<<< HEAD
                  {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number}</p>}
=======
                  {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number?.message as string}</p>}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
<<<<<<< HEAD
                    name="email"
                    value={form.email}
                    onChange={handleChange}
=======
                    {...register("email")}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Product Category */}
              <div>
                <label htmlFor="product_category" className="block text-sm font-medium text-gray-700">
                  Product Category <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="product_category"
<<<<<<< HEAD
                    name="product_category"
                    value={form.product_category}
                    onChange={handleChange}
=======
                    {...register("product_category")}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
                    placeholder="e.g. Water Purifier"
                  />
                </div>
              </div>

              {/* Product Model */}
              <div>
                <label htmlFor="product_model_text" className="block text-sm font-medium text-gray-700">
                  Product Model <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="product_model_text"
<<<<<<< HEAD
                    name="product_model_text"
                    value={form.product_model_text}
                    onChange={handleChange}
=======
                    {...register("product_model_text")}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                    className={`block w-full rounded-lg border ${
                      errors.product_model_text ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    } px-4 py-2.5 shadow-sm sm:text-sm`}
                    placeholder="e.g. NeaPure Pro"
                  />
<<<<<<< HEAD
                  {errors.product_model_text && <p className="mt-1 text-xs text-red-500">{errors.product_model_text}</p>}
=======
                  {errors.product_model_text && <p className="mt-1 text-xs text-red-500">{errors.product_model_text?.message as string}</p>}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                </div>
              </div>

              {/* Service Type */}
              <div className="sm:col-span-2">
                <label htmlFor="service_type" className="block text-sm font-medium text-gray-700">
                  Service Type <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="service_type"
<<<<<<< HEAD
                    name="service_type"
                    value={form.service_type}
                    onChange={handleChange}
=======
                    {...register("service_type")}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                    className={`block w-full rounded-lg border ${
                      errors.service_type ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    } px-4 py-2.5 shadow-sm sm:text-sm bg-white`}
                  >
                    <option value="">Select a service type</option>
                    {SERVICE_TYPES.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
<<<<<<< HEAD
                  {errors.service_type && <p className="mt-1 text-xs text-red-500">{errors.service_type}</p>}
=======
                  {errors.service_type && <p className="mt-1 text-xs text-red-500">{errors.service_type?.message as string}</p>}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                </div>
              </div>

              <div className="sm:col-span-2 border-t border-gray-100 pt-6 mt-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Location Details</h3>
              </div>

              {/* Division */}
              <div>
                <label htmlFor="division" className="block text-sm font-medium text-gray-700">
                  Division <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="division"
<<<<<<< HEAD
                    name="division"
                    value={form.division}
                    onChange={handleChange}
=======
                    {...register("division")}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                    className={`block w-full rounded-lg border ${
                      errors.division ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    } px-4 py-2.5 shadow-sm sm:text-sm`}
                    placeholder="e.g. Dhaka"
                  />
<<<<<<< HEAD
                  {errors.division && <p className="mt-1 text-xs text-red-500">{errors.division}</p>}
=======
                  {errors.division && <p className="mt-1 text-xs text-red-500">{errors.division?.message as string}</p>}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                </div>
              </div>

              {/* District */}
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                  District <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="district"
<<<<<<< HEAD
                    name="district"
                    value={form.district}
                    onChange={handleChange}
=======
                    {...register("district")}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                    className={`block w-full rounded-lg border ${
                      errors.district ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    } px-4 py-2.5 shadow-sm sm:text-sm`}
                    placeholder="e.g. Gazipur"
                  />
<<<<<<< HEAD
                  {errors.district && <p className="mt-1 text-xs text-red-500">{errors.district}</p>}
=======
                  {errors.district && <p className="mt-1 text-xs text-red-500">{errors.district?.message as string}</p>}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                </div>
              </div>

              {/* Full Address */}
              <div className="sm:col-span-2">
                <label htmlFor="full_address" className="block text-sm font-medium text-gray-700">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="full_address"
<<<<<<< HEAD
                    name="full_address"
                    rows={3}
                    value={form.full_address}
                    onChange={handleChange}
=======
                    rows={3}
                    {...register("full_address")}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                    className={`block w-full rounded-lg border ${
                      errors.full_address ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    } px-4 py-2.5 shadow-sm sm:text-sm`}
                    placeholder="Enter your complete address"
                  />
<<<<<<< HEAD
                  {errors.full_address && <p className="mt-1 text-xs text-red-500">{errors.full_address}</p>}
=======
                  {errors.full_address && <p className="mt-1 text-xs text-red-500">{errors.full_address?.message as string}</p>}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                </div>
              </div>

              <div className="sm:col-span-2 border-t border-gray-100 pt-6 mt-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Scheduling & Details</h3>
              </div>

              {/* Preferred Date */}
              <div>
                <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    id="preferred_date"
<<<<<<< HEAD
                    name="preferred_date"
                    value={form.preferred_date}
                    onChange={handleChange}
=======
                    {...register("preferred_date")}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                    className={`block w-full rounded-lg border ${
                      errors.preferred_date ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    } px-4 py-2.5 shadow-sm sm:text-sm`}
                  />
<<<<<<< HEAD
                  {errors.preferred_date && <p className="mt-1 text-xs text-red-500">{errors.preferred_date}</p>}
=======
                  {errors.preferred_date && <p className="mt-1 text-xs text-red-500">{errors.preferred_date?.message as string}</p>}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                </div>
              </div>

              {/* Preferred Time */}
              <div>
                <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700">
                  Preferred Time <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="preferred_time"
<<<<<<< HEAD
                    name="preferred_time"
                    value={form.preferred_time}
                    onChange={handleChange}
=======
                    {...register("preferred_time")}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                    className={`block w-full rounded-lg border ${
                      errors.preferred_time ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
                    } px-4 py-2.5 shadow-sm sm:text-sm`}
                    placeholder="e.g. 10:00 AM"
                  />
<<<<<<< HEAD
                  {errors.preferred_time && <p className="mt-1 text-xs text-red-500">{errors.preferred_time}</p>}
=======
                  {errors.preferred_time && <p className="mt-1 text-xs text-red-500">{errors.preferred_time?.message as string}</p>}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                </div>
              </div>

              {/* Issue Description */}
              <div className="sm:col-span-2">
                <label htmlFor="issue_description" className="block text-sm font-medium text-gray-700">
                  Description <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="issue_description"
<<<<<<< HEAD
                    name="issue_description"
                    rows={4}
                    value={form.issue_description}
                    onChange={handleChange}
=======
                    rows={4}
                    {...register("issue_description")}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm focus:border-brand-blue focus:ring-brand-blue sm:text-sm"
                    placeholder="Please describe the issue or service required..."
                  />
                </div>
              </div>

              {/* Attachment */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachment <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                
                <div className="mt-1 flex justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-8 hover:border-brand-blue hover:bg-blue-50/50 transition-colors">
                  <div className="text-center w-full">
                    {preview ? (
                      <div className="relative mx-auto h-48 w-full max-w-sm overflow-hidden rounded-lg border border-gray-200">
                        <Image
                          src={preview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setAttachment(null)}
                          className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-gray-700 shadow-sm transition-colors hover:bg-white hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-brand-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-blue focus-within:ring-offset-2 hover:text-blue-700"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-end">
              <button
                type="submit"
<<<<<<< HEAD
                disabled={saving}
                className="w-full sm:w-auto inline-flex justify-center rounded-xl bg-brand-blue px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {saving ? "Submitting..." : "Submit Request"}
=======
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex justify-center rounded-xl bg-brand-blue px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
>>>>>>> 02ec055c2225ae4c379ee496ee3cdecace9fe8a1
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}