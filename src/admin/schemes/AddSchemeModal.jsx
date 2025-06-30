import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createScheme } from "../../api/schemesApi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  amount: z.preprocess((val) => Number(val), z.number().min(0)),
  eligibility_criteria: z.string().min(1),
  application_deadline: z.coerce.date(),
  exam_date: z.coerce.date(),
  duration: z.union([z.string(), z.number()]),
  mode: z.enum(["Online", "Offline", "Hybrid"]),
});

const AddSchemeModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    // Convert dates to ISO strings
    const payload = {
      ...data,
      application_deadline: data.application_deadline.toISOString(),
      exam_date: data.exam_date.toISOString()
    };
    
    await createScheme(payload);
    onClose();
    // Remove window.location.reload() - update state instead
  } catch (err) {
    console.error("Error creating scheme:", err);
  } finally {
    setIsSubmitting(false);
  }
};

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
          {/* Header */}
          <div className="sticky top-0 bg-white py-4 px-6 z-10 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Add New Scholarship</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                <input
                  id="title"
                  {...register("title")}
                  placeholder="Scholarship Title"
                  className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-gray-400"
                />
                {errors.title && <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>}
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)*</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">₹</span>
                  <input
                    id="amount"
                    {...register("amount", { valueAsNumber: true })}
                    placeholder="Amount"
                    type="number"
                    min="0"
                    className="w-full rounded-lg py-3 px-4 pl-8 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-gray-400"
                  />
                </div>
                {errors.amount && <p className="text-red-500 mt-1 text-sm">{errors.amount.message}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="Detailed description of the scholarship"
                className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-gray-400 min-h-[100px]"
              />
              {errors.description && <p className="text-red-500 mt-1 text-sm">{errors.description.message}</p>}
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria*</label>
                <input
                  id="eligibility"
                  {...register("eligibility_criteria")}
                  placeholder="Eligibility requirements"
                  className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-gray-400"
                />
                {errors.eligibility_criteria && <p className="text-red-500 mt-1 text-sm">{errors.eligibility_criteria.message}</p>}
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  id="duration"
                  {...register("duration")}
                  placeholder="Scholarship duration"
                  className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-gray-400"
                />
                {errors.duration && <p className="text-red-500 mt-1 text-sm">{errors.duration.message}</p>}
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">Application Deadline*</label>
                <input
                  id="deadline"
                  {...register("application_deadline", { valueAsDate: true })}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {errors.application_deadline && <p className="text-red-500 mt-1 text-sm">Deadline is required</p>}
              </div>
              <div>
                <label htmlFor="exam_date" className="block text-sm font-medium text-gray-700 mb-1">Exam Date*</label>
                <input
                  id="exam_date"
                  {...register("exam_date", { valueAsDate: true })}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                {errors.exam_date && <p className="text-red-500 mt-1 text-sm">Exam date is required</p>}
              </div>
            </div>

            {/* Mode Select */}
            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-1">Mode*</label>
              <select
                id="mode"
                {...register("mode")}
                className="w-full rounded-lg py-3 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.mode && <p className="text-red-500 mt-1 text-sm">Mode is required</p>}
            </div>

            {/* Submit Button */}
            <div className="sticky bottom-0 bg-white py-4 -mx-6 px-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-3 rounded-lg transition-all shadow-md ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:from-emerald-700 hover:to-blue-700 hover:shadow-lg"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "Create Scheme"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddSchemeModal;