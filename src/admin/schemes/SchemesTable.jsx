import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import useSchemes from "../../hooks/useSchemes";
import AddSchemeModal from "./AddSchemeModal";
import EditSchemeForm from "./EditSchemeForm";
import SkeletonLoader from "../../components/SkeletonLoader";
import ErrorMessage from "../../components/ErrorMessage";
import EmptyState from "../../components/EmptyState";
import ConfirmDialog from "../../components/ConfirmDialog";

const SchemeCard = ({ scheme, onEdit, onDelete }) => (
  <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 p-5 flex flex-col h-full min-h-[280px]">
    <div className="flex-1 space-y-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {scheme.title}
        </h3>
        <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
          {scheme.mode}
        </span>
      </div>

      <p className="text-gray-600 line-clamp-3 text-sm">{scheme.description}</p>
    </div>

    <div className="mt-4 space-y-2 text-sm">
      <div className="flex justify-between items-center">
        <span className="text-gray-500">Funding Amount</span>
        <span className="font-medium text-emerald-600">
          ₹{scheme.amount?.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-500">Eligibility</span>
        <span className="text-gray-800 truncate max-w-[160px] text-right">
          {scheme.eligibility_criteria}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-500">Application Deadline</span>
        <time className="text-gray-800">
          {format(new Date(scheme.application_deadline), "dd MMM yyyy")}
        </time>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-500">Duration</span>
        <span className="text-gray-800">{scheme.duration}</span>
      </div>
    </div>

    {/* Always visible on mobile, hover on desktop */}
    <div className="absolute top-4 right-4 flex space-x-2 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
      <button
        onClick={onEdit}
        className="p-2 bg-white rounded-full shadow-md hover:shadow-lg text-gray-600 hover:text-emerald-500"
        aria-label="Edit scheme"
      >
        <PencilIcon className="h-5 w-5" />
      </button>
      <button
        onClick={onDelete}
        className="p-2 bg-white rounded-full shadow-md hover:shadow-lg text-red-500 hover:text-red-700"
        aria-label="Delete scheme"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  </div>
);

const SchemesTable = () => {
  const { schemes, loading, error, deleteScheme } = useSchemes();
  const [editingScheme, setEditingScheme] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleDelete = async (id) => {
    await deleteScheme(id);
    setDeleteCandidate(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonLoader key={i} className="h-64 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load schemes"
        error={error}
        className="mt-8"
      />
    );
  }

  if (!schemes?.length) {
    return (
      <div className="col-span-full">
        <EmptyState
          title="No scholarship schemes found"
          description="Start by creating a new scholarship scheme"
          action={
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-5 py-2.5 rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all shadow-md"
            >
              Add New Scheme
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme) => (
          <SchemeCard
            key={scheme._id}
            scheme={scheme}
            onEdit={() => setEditingScheme(scheme)}
            onDelete={() => setDeleteCandidate(scheme)}
          />
        ))}
      </div>

      {/* Conditionally render modals only when needed */}
      {deleteCandidate && (
        <ConfirmDialog
          isOpen={!!deleteCandidate}
          onClose={() => setDeleteCandidate(null)}
          title="Delete Scholarship Scheme"
          description="Are you sure you want to delete this scheme? This action cannot be undone."
          confirmText="Delete Scheme"
          onConfirm={() => handleDelete(deleteCandidate._id)}
          variant="danger"
        />
      )}

      {editingScheme && (
        <EditSchemeForm
          scheme={editingScheme}
          onClose={() => setEditingScheme(null)}
        />
      )}

      <AddSchemeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default SchemesTable;
