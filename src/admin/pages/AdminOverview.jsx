import React from "react";
import StatsCard from "../components/StatsCard";
import {
  UsersIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const AdminOverview = () => {
  const stats = [
    {
      title: "Total Members",
      value: "2498897",
      icon: <UsersIcon className="h-6 w-6" />,
      color: "emerald",
    },
    {
      title: "Active Students",
      value: "1,234",
      icon: <AcademicCapIcon className="h-6 w-6" />,
      color: "blue",
    },
    {
      title: "Registered Institutes",
      value: "89",
      icon: <BuildingLibraryIcon className="h-6 w-6" />,
      color: "purple",
    },
    {
      title: "Total Donations",
      value: "$12,340",
      icon: <CurrencyDollarIcon className="h-6 w-6" />,
      color: "amber",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Platform Analytics</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Chart placeholder</span>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
