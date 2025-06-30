// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { logout } from "../features/auth/authSlice";
import { useRole } from "../contexts/RoleContext";
import { 
  Bars3Icon, 
  XMarkIcon, 
  ChevronDownIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { role } = useRole();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Determine dashboard path based on role
  const dashboardPath = role === "ADMIN" 
    ? "/admin/dashboard" 
    : "/student/dashboard";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle body overflow for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navItems = [
    { path: "/gallery", label: "Gallery" },
    { path: "/schemes", label: "Schemes" },
    { path: "/projects", label: "Projects" },
    { path: "/donation", label: "Donation" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-blue-100' 
          : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-80"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-lg">M</span>
              </div>
              <span className="font-semibold text-xl text-gray-900 hidden sm:block">
                Maulana Zahid Educational Trust
              </span>
              <span className="font-semibold text-xl text-gray-900 sm:hidden">
                MZET
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}

              {/* Dashboard Link */}
              {user && (
                <Link
                  to={dashboardPath}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02]"
                >
                  <span>Dashboard</span>
                </Link>
              )}

              {/* User Actions */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="font-medium text-white text-sm">
                        {user.name?.charAt(0) || user.email?.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium hidden lg:block">
                      {user.name || user.email.split('@')[0]}
                    </span>
                    <ChevronDownIcon 
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div className={`absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-blue-100 transition-all duration-200 transform origin-top-right ${
                    isDropdownOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                  }`}>
                    <div className="p-4 border-b border-blue-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="font-medium text-white">
                            {user.name?.charAt(0) || user.email?.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name || user.email}</p>
                          <p className="text-sm text-blue-600">{role === 'ADMIN' ? 'Administrator' : 'Student'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50 rounded-md transition-colors duration-200"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02]"
                >
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute top-0 left-0 right-0 bg-white shadow-lg transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="px-4 py-6 space-y-1">
            
            {/* User Info */}
            {user && (
              <div className="flex items-center gap-3 px-3 py-4 border-b border-blue-50 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="font-medium text-white">
                    {user.name?.charAt(0) || user.email?.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name || user.email}</p>
                  <p className="text-sm text-blue-600">{role === 'ADMIN' ? 'Administrator' : 'Student'}</p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}

            {/* Dashboard Link */}
            {user && (
              <Link
                to={dashboardPath}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-blue-700"
              >
                <UserIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            )}

            {/* Action Button */}
            <div className="pt-4 border-t border-blue-50 mt-4">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-blue-700"
                >
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;