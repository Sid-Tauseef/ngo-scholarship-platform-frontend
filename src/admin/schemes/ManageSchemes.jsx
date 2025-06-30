import { useState } from "react";
import SchemesTable from "./SchemesTable";
import AddSchemeModal from "./AddSchemeModal";

const ManageSchemes = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">
        <div className="max-w-full">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Manage Scholarship Schemes
            </h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all shadow-md"
            >
              Add New Scheme
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <SchemesTable />
          </div>
        </div>
      </main>

      <AddSchemeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default ManageSchemes;