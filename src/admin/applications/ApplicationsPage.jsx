import React, { useState } from 'react';
import useApplications from '../../hooks/useApplications';
import ApplicationsTable from './ApplicationsTable';
import ApplicationStatusModal from './ApplicationStatusModal';
import ApplicationDetailsModal from './ApplicationDetailsModal'; // New import

export default function ApplicationsPage() {
  const {
    applications,
    loading,
    error,
    updateStatus
  } = useApplications();

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false); // New state for details modal
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleStatusChange = (application) => {
    setSelectedApplication(application);
    setStatusModalOpen(true);
  };

  const handleViewDetails = (application) => { // New handler for viewing details
    setSelectedApplication(application);
    setDetailsModalOpen(true);
  };

  const handleStatusUpdate = async (newStatus) => {
    if (selectedApplication) {
      await updateStatus(selectedApplication._id, newStatus);
      setStatusModalOpen(false);
      setSelectedApplication(null);
    }
  };

  return (
    <div className="pl-4 sm:pl-6 lg:pl-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Student Applications</h1>
        <p className="text-gray-600 mt-2">
          Manage scholarship applications from students
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Applications
          </h3>
          <p className="text-red-600">
            {error.message || 'Failed to load applications. Please try again.'}
          </p>
        </div>
      ) : (
        <ApplicationsTable 
          applications={applications} 
          onStatusChange={handleStatusChange}
          onViewDetails={handleViewDetails} // Pass new handler
        />
      )}

      {selectedApplication && (
        <ApplicationStatusModal
          isOpen={statusModalOpen}
          application={selectedApplication}
          onClose={() => {
            setStatusModalOpen(false);
            setSelectedApplication(null);
          }}
          onSave={handleStatusUpdate}
        />
      )}

      {selectedApplication && ( // Add new details modal
        <ApplicationDetailsModal
          isOpen={detailsModalOpen}
          application={selectedApplication}
          onClose={() => {
            setDetailsModalOpen(false);
            setSelectedApplication(null);
          }}
        />
      )}
    </div>
  );
}