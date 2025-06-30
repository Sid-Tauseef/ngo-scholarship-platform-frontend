import React from 'react';
import { XMarkIcon } from "@heroicons/react/24/outline";

const FormDialog = ({
  isOpen,
  onClose,
  title,
  children,
  size = "max-w-lg"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
      <div
        className={`relative bg-white rounded-2xl shadow-xl w-full ${size} p-6 max-h-[90vh] overflow-y-auto overflow-x-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close dialog"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
};

export default FormDialog;