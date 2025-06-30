import React from 'react';
import { BellIcon, MegaphoneIcon, EnvelopeIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const typeIcons = {
  alert: <MegaphoneIcon className="w-5 h-5 text-blue-500" />,
  update: <BellIcon className="w-5 h-5 text-emerald-500" />,
  message: <EnvelopeIcon className="w-5 h-5 text-blue-500" />,
  academic: <BookOpenIcon className="w-5 h-5 text-emerald-500" />,
  event: <MegaphoneIcon className="w-5 h-5 text-blue-500" />,
};

const typeLabels = {
  alert: 'Alert',
  update: 'Update',
  message: 'Message',
  academic: 'Academic',
  event: 'Event',
};

export default function NotificationsTable({ 
  notifications, 
  onEdit, 
  onDelete 
}) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 tracking-wider">
                Message
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <tr
                key={notification._id}
                className="group hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="mr-2">
                      {typeIcons[notification.type] || <BellIcon className="w-5 h-5 text-gray-500" />}
                    </span>
                    <span className="text-sm font-medium text-gray-800">
                      {typeLabels[notification.type] || 'Notification'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 max-w-md">
                    {notification.message}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right space-x-2">
                  <button
                    onClick={() => onEdit(notification)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(notification._id)}
                    className="text-red-600 hover:text-red-800 font-medium transition-colors"
                  >
                    Delete
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