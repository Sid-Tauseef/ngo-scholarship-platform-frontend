import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getSchemeById } from "../../api/schemesApi";
import useSchemes from "../../hooks/useSchemes";
import { safeDate, formatLongDate } from "../../utils/dateUtils";

import {
  AcademicCapIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon,
  PaperClipIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Zod schema for validation
const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format"),
  phoneNumber: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .regex(/^\d+$/, "Phone must be numeric"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  institution: z.string().min(1, "Institution is required"),
  gpa: z
    .string()
    .regex(/^\d(\.\d{1,2})?$/, "Invalid GPA")
    .transform((v) => parseFloat(v)),
  familyIncome: z
    .string()
    .regex(/^\d+$/, "Income must be numeric")
    .transform((v) => parseInt(v, 10)),
  statement: z.string().min(10, "Statement must be at least 10 characters"),
  document: z.string().min(1, "Document URL is required"),
});

export default function ApplySchemePage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { applyForScheme } = useSchemes();

  // Scheme details state
  const [scheme, setScheme] = useState(null);
  const [loadingScheme, setLoadingScheme] = useState(true);
  const [schemeError, setSchemeError] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    getSchemeById(id)
      .then((res) => {
        const payload = res.data.data ?? res.data;

        // Robust Promise detection
        if (payload && typeof payload.then === "function") {
          throw new Error("API returned a Promise instead of resolved data");
        }

        setScheme(payload);

        // Calculate days left safely
        if (payload?.application_deadline) {
          const deadline = safeDate(payload.application_deadline);
          const today = new Date();
          const diffTime = Math.max(0, deadline - today);
          const calculatedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysLeft(calculatedDays);
        }
      })
      .catch((err) => {
        console.error("Failed to load scheme:", err);
        setSchemeError(err.message || "Failed to load scheme details.");
      })
      .finally(() => setLoadingScheme(false));
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
      };

      await applyForScheme(id, payload);
      alert("Application submitted successfully!");
      nav("/student/dashboard/schemes");
    } catch (err) {
      // Extract the error message from the backend response
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to apply. Please try again.";

      // Display specific error for duplicate applications
      if (errorMessage.includes("already applied")) {
        setSubmitError("You have already applied to this scheme");
      } else {
        setSubmitError(errorMessage);
      }
    }
  };

  if (loadingScheme) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (schemeError) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="mx-auto bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <XMarkIcon className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Scheme
          </h3>
          <p className="text-red-600">{schemeError}</p>
          <button
            onClick={() => nav("/student/dashboard/schemes")}
            className="mt-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Back to Schemes
          </button>
        </div>
      </div>
    );
  }

  // Safely get deadline date
  const deadline = scheme?.application_deadline
    ? safeDate(scheme.application_deadline)
    : new Date();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      {/* Scholarship Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="w-full">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {scheme.title}
            </h1>

            {/* Collapsible Description */}
            <div className="opacity-90">
              <p className={`${showFullDescription ? "" : "line-clamp-2"}`}>
                {scheme.description}
              </p>
              {scheme.description.length > 120 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="mt-2 flex items-center text-sm font-medium hover:underline"
                >
                  {showFullDescription ? (
                    <>
                      Show less <ChevronUpIcon className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Read full description{" "}
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3">
            <div className="flex items-center">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span className="font-semibold">
                {daysLeft > 0 ? `${daysLeft} days left` : "Closing soon"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scholarship Details Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Scheme Details
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-500 flex items-center">
                  <AcademicCapIcon className="h-5 w-5 mr-2 text-emerald-600" />
                  Eligibility
                </h3>
                <p className="mt-1 text-gray-800">
                  {scheme.eligibility_criteria}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-500 flex items-center">
                  <CurrencyRupeeIcon className="h-5 w-5 mr-2 text-emerald-600" />
                  Amount
                </h3>
                <p className="mt-1 text-2xl font-bold text-emerald-600">
                  ₹{scheme.amount}
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-500 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-emerald-600" />
                  Deadline
                </h3>
                <p className="mt-1 text-gray-800">
                  {formatLongDate(scheme.application_deadline)}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => nav(`/student/dashboard/schemes/${scheme._id}`)}
                className="w-full text-center bg-gray-100 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                View Scheme Details
              </button>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Application Form
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Please fill all required fields carefully. Incomplete
                applications will be rejected.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              {/* Personal Information Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <UserIcon className="h-5 w-5 text-emerald-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Personal Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        {...register("fullName")}
                        className={`mt-1 w-full border ${
                          errors.fullName ? "border-red-300" : "border-gray-300"
                        } rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                        placeholder="Your full name"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        {...register("dateOfBirth")}
                        className={`mt-1 w-full border ${
                          errors.dateOfBirth
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      />
                      {errors.dateOfBirth && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.dateOfBirth.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register("phoneNumber")}
                        className={`mt-1 w-full border ${
                          errors.phoneNumber
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-lg pl-10 px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                        placeholder="10-digit phone number"
                      />
                      {errors.phoneNumber && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        {...register("address")}
                        rows={3}
                        className={`mt-1 w-full border ${
                          errors.address ? "border-red-300" : "border-gray-300"
                        } rounded-lg pl-10 px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                        placeholder="Your complete address"
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <BuildingLibraryIcon className="h-5 w-5 text-emerald-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Academic Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Institution
                    </label>
                    <div className="relative">
                      <input
                        {...register("institution")}
                        className={`mt-1 w-full border ${
                          errors.institution
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                        placeholder="Your institution"
                      />
                      {errors.institution && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.institution.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GPA
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ChartBarIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register("gpa")}
                        placeholder="e.g. 3.5"
                        className={`mt-1 w-full border ${
                          errors.gpa ? "border-red-300" : "border-gray-300"
                        } rounded-lg pl-10 px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      />
                      {errors.gpa && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.gpa.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Information Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <CurrencyRupeeIcon className="h-5 w-5 text-emerald-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Financial Information
                  </h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Family Income (₹)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CurrencyRupeeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      {...register("familyIncome")}
                      className={`mt-1 w-full border ${
                        errors.familyIncome
                          ? "border-red-300"
                          : "border-gray-300"
                      } rounded-lg pl-10 px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                    />
                    {errors.familyIncome && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.familyIncome.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Application Details Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <DocumentTextIcon className="h-5 w-5 text-emerald-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Application Details
                  </h3>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statement of Purpose
                  </label>
                  <div className="relative">
                    <textarea
                      {...register("statement")}
                      rows={4}
                      className={`mt-1 w-full border ${
                        errors.statement ? "border-red-300" : "border-gray-300"
                      } rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      placeholder="Explain why you deserve this scholarship..."
                    />
                    {errors.statement && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.statement.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Document URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PaperClipIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register("document")}
                      className={`mt-1 w-full border ${
                        errors.document ? "border-red-300" : "border-gray-300"
                      } rounded-lg pl-10 px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                      placeholder="Paste document link (Google Drive, Dropbox, etc.)"
                    />
                    {errors.document && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.document.message}
                      </p>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Upload your documents to a cloud service and paste the
                    shareable link here
                  </p>
                </div>
              </div>

              {/* Form Submission */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <div className="flex items-center">
                    <XMarkIcon className="h-5 w-5 mr-2" />
                    <span>{submitError}</span>
                  </div>

                  {/* Show additional action for duplicate applications */}
                  {submitError.includes("already applied") && (
                    <div className="mt-3">
                      <button
                        onClick={() =>
                          nav("/student/dashboard/applied-schemes")
                        }
                        className="text-emerald-600 hover:underline font-medium"
                      >
                        View your applications →
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => nav("/student/dashboard/schemes")}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel Application
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow hover:shadow-md transition-all ${
                    isSubmitting
                      ? "opacity-75 cursor-not-allowed"
                      : "hover:from-emerald-600 hover:to-teal-700"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
