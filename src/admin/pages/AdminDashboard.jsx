import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  ChartBarIcon,
  UsersIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  CogIcon,
  MegaphoneIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../../components/Navbar";

const navigation = [
  {
    name: "Students",
    href: "/admin/dashboard/students",
    icon: AcademicCapIcon,
  },
  { name: "Members", 
    href: "/admin/dashboard/members", 
    icon: UsersIcon },
  {
    name: "Institutes",
    href: "/admin/dashboard/institutes",
    icon: BuildingLibraryIcon,
  },
  { name: "Schemes", 
    href: "/admin/dashboard/schemes", 
    icon: MegaphoneIcon },
  {
    name: "Applications",
    href: "/admin/dashboard/applications",
    icon: DocumentTextIcon,
  },
  {
    name: "Notifications",
    href: "/admin/dashboard/notifications",
    icon: BellIcon,
  },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (!isMobile && sidebarOpen) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16">
        <Navbar />
      </header>

      <div className="flex flex-1 h-full">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-16 right-4 p-2 z-40 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        </button>

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-16 bottom-0 z-40 bg-white shadow-lg
            transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 transition-all duration-300 ease-in-out
            ${isCollapsed ? "w-20" : "w-64"}
            h-[calc(100vh-4rem)]
          `}
        >
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              {!isCollapsed && (
                <h2 className="text-xl font-bold text-emerald-600 truncate">
                  Admin Dashboard
                </h2>
              )}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-1 rounded hover:bg-gray-100"
                  aria-label={
                    isCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                >
                  {isCollapsed ? (
                    <ChevronRightIcon className="h-6 w-6 text-gray-600" />
                  ) : (
                    <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
                  )}
                </button>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-1 rounded hover:bg-gray-100"
                  aria-label="Close sidebar"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="mt-4 flex-1 overflow-y-auto">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 mx-2 my-1 rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                    }
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                >
                  <item.icon
                    className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`}
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`
    flex-1 transition-all duration-300 ease-in-out
    mt-16
    ${
      sidebarOpen
        ? isCollapsed
          ? "ml-28"
          : "ml-72" // 20px (collapsed) + 8px gap | 64px (expanded) + 8px gap
        : "ml-0"
    }
    min-h-[calc(100vh-4rem)]
    w-full
  `}
        >
          <div className="py-6 pl-0 pr-4 sm:pr-6 lg:pr-8 w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
