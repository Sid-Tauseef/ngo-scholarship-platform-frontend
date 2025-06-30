import { useState, useEffect } from "react";
import { getMyApplications } from "../../api/studentsApi";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function AppliedSchemesPage() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyApplications()
      .then(res => {
        console.log("Applications response:", res.data); // Debug logging
        setApps(res.data.data || []);
      })
      .catch(err => {
        console.error("Failed to load applications:", err);
        setError("Failed to load applications. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading applications...</p>;
  
  if (error) return (
    <div className="p-4 text-red-600 flex items-center">
      <ExclamationCircleIcon className="h-5 w-5 mr-2" />
      {error}
    </div>
  );
  
  if (!apps.length) return (
    <div className="p-6 text-center">
      <p className="text-gray-600 mb-4">You haven't applied to any schemes yet.</p>
      <button 
        onClick={() => window.location.href = "/student/dashboard/schemes"}
        className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
      >
        Browse Available Schemes
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Applied Schemes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Scheme</th>
              <th className="px-4 py-2 text-left">Applied On</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(a => (
              <tr key={a._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  {a.scheme ? a.scheme.title : "Scheme not available"}
                </td>
                <td className="px-4 py-3">
                  {new Date(a.appliedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      a.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : a.status === "REJECTED"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}