// src/student/pages/StudentDashboard.jsx
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Bars3Icon, DocumentTextIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon, UsersIcon } from "@heroicons/react/24/outline";
import Navbar from "../../components/Navbar";

const navItems = [
  { name: "Available Schemes",   href: "schemes",        icon: DocumentTextIcon },
  { name: "My Applied Schemes",   href: "applied-schemes", icon: UsersIcon      },
  { name: "Admit Card",           href: "admit-card",     icon: DocumentTextIcon },
];

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed]     = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-16 right-4 p-2 z-50 bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <Bars3Icon className="h-6 w-6 text-gray-600" />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 bg-white shadow-lg transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          transition-transform duration-200 ease-in-out z-40
          ${collapsed ? "w-20" : "w-64"} mt-16
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <h2 className="text-xl font-bold text-emerald-600">Student Dashboard</h2>}
          <div className="flex space-x-2">
            <button onClick={() => setCollapsed((v) => !v)}>
              {collapsed
                ? <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                : <ChevronLeftIcon  className="h-6 w-6 text-gray-600" />}
            </button>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
        <nav className="mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={`/student/dashboard/${item.href}`}
              className={({ isActive }) => `
                flex items-center px-4 py-3 mx-2 my-1 rounded transition-colors
                ${isActive ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-gray-600 hover:bg-gray-100"}
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 pt-16">
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
