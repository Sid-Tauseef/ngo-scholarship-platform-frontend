import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { updateScheme } from "../../api/schemesApi";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  amount: z.number().min(0),
  eligibility_criteria: z.string().min(1),
  application_deadline: z.coerce.date(),
  exam_date: z.coerce.date(),
  duration: z.union([z.string(), z.number()]),
  mode: z.enum(["Online", "Offline", "Hybrid"]),
});

const EditSchemeForm = ({ scheme, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!scheme) return null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: scheme.title,
      description: scheme.description,
      amount: scheme.amount,
      eligibility_criteria: scheme.eligibility_criteria,
      application_deadline: new Date(scheme.application_deadline),
      exam_date: new Date(scheme.exam_date),
      duration: scheme.duration,
      mode: scheme.mode,
    },
  });

  useEffect(() => {
    reset({
      title: scheme.title,
      description: scheme.description,
      amount: scheme.amount,
      eligibility_criteria: scheme.eligibility_criteria,
      application_deadline: new Date(scheme.application_deadline),
      exam_date: new Date(scheme.exam_date),
      duration: scheme.duration,
      mode: scheme.mode,
    });
  }, [scheme, reset]);

const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    // Convert dates to ISO strings
    const payload = {
      ...data,
      application_deadline: data.application_deadline.toISOString(),
      exam_date: data.exam_date.toISOString()
    };
    
    await updateScheme(scheme._id, payload);
    onClose();
    // Remove window.location.reload() - update state instead
  } catch (err) {
    console.error("Error updating scheme:", err);
  } finally {
    setIsSubmitting(false);
  }
};

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
              <h3 className="text-xl font-bold text-gray-800">Edit Scholarship</h3>
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

            {/* Actions */}
            <div className="sticky bottom-0 bg-white py-4 -mx-6 px-6 border-t border-gray-100">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-blue-600 text-white transition-all shadow-md ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:from-emerald-700 hover:to-blue-700 hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditSchemeForm;