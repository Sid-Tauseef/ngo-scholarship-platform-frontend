import React from 'react';
import FormDialog from '../../components/FormDialog';
import { statusColors } from './ApplicationsTable';
import { 
  UserIcon, 
  AcademicCapIcon, 
  CurrencyRupeeIcon, 
  DocumentTextIcon, 
  CalendarIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const statusIcons = {
  PENDING: <ClockIcon className="w-5 h-5 text-yellow-500" />,
  APPROVED: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
  REJECTED: <XCircleIcon className="w-5 h-5 text-red-500" />,
};

export default function ApplicationDetailsModal({ 
  isOpen, 
  application, 
  onClose 
}) {
  if (!application) return null;

  return (
    <FormDialog
      title="Application Details"
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <div className="bg-white p-6 rounded-lg shadow-md space-y-8">
        {/* Student Information */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Student Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <UserIcon className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-gray-900 font-medium">{application.fullName}</p>
              </div>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-gray-900 font-medium">{new Date(application.dateOfBirth).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              <UserIcon className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="text-gray-900 font-medium">{application.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center">
              <UserIcon className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-900 font-medium">{application.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <AcademicCapIcon className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Institution</p>
                <p className="text-gray-900 font-medium">{application.institution}</p>
              </div>
            </div>
            <div className="flex items-center">
              <AcademicCapIcon className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">GPA</p>
                <p className="text-gray-900 font-medium">{application.gpa}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Financial Information</h3>
          <div className="flex items-center">
            <CurrencyRupeeIcon className="w-5 h-5 text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Annual Family Income</p>
              <p className="text-gray-900 font-medium">₹{application.familyIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Application Details */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Application Details</h3>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Statement of Purpose</p>
              <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">{application.statement}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Document</p>
              <a
                href={application.document}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                View Document
              </a>
            </div>
          </div>
        </div>

        {/* Scheme Information */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Scheme Information</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <AcademicCapIcon className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Scheme Title</p>
                <p className="text-gray-900 font-medium">{application.scheme?.title || 'Scheme not found'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Applied On</p>
                <p className="text-gray-900 font-medium">{new Date(application.appliedAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center">
              {statusIcons[application.status]}
              <div className="ml-2">
                <p className="text-sm text-gray-500">Status</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[application.status]}`}>
                  {application.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormDialog>
  );
}