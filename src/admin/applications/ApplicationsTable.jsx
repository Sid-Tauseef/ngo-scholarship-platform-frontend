import React from 'react';
import { 
  UserIcon, 
  AcademicCapIcon, 
  CalendarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export const statusColors = { // Export for reuse in ApplicationDetailsModal
  PENDING: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
};

const statusIcons = {
  PENDING: <ClockIcon className="w-5 h-5 text-yellow-500" />,
  APPROVED: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
  REJECTED: <XCircleIcon className="w-5 h-5 text-red-500" />,
};

export default function ApplicationsTable({ 
  applications, 
  onStatusChange,
  onViewDetails // New prop
}) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wider">
                Student
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wider">
                Scheme
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wider">
                Applied On
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.map((application) => (
              <tr
                key={application._id}
                className="group hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {application.fullName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {application.institution}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-5 w-5 text-emerald-500 mr-2" />
                    <span className="text-sm font-medium text-gray-800">
                      {application.scheme?.title || 'Scheme not found'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      {new Date(application.appliedAt).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="mr-2">
                      {statusIcons[application.status]}
                    </span>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[application.status]}`}
                    >
                      {application.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <button
                    onClick={() => onViewDetails(application)} // New button
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors mr-4"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onStatusChange(application)}
                    className="text-emerald-600 hover:text-emerald-800 font-medium transition-colors"
                  >
                    Change Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}