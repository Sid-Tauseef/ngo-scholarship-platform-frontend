// src/admin/members/ManageMembers.jsx
import React from "react";
import MembersGrid from "./MembersGrid";
import AddMemberModal from "./AddMemberModal";
import EditMemberForm from "./EditMemberForm";

export default function ManageMembers() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [editingMember, setEditingMember] = React.useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Manage Members
            </h1>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all shadow-md"
            >
              + Add Member
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <MembersGrid
              onEdit={(member) => {
                setEditingMember(member);
              }}
            />
          </div>
        </div>
      </main>
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      {editingMember && (
        <EditMemberForm
          member={editingMember}
          onClose={() => setEditingMember(null)}
        />
      )}
    </div>
  );
}