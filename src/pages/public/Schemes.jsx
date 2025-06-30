import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { useRole } from '../../contexts/RoleContext';
import useSchemes from '../../hooks/useSchemes';
import { CalendarDaysIcon, CurrencyRupeeIcon, AcademicCapIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Schemes = () => {
  const { schemes, loading, error } = useSchemes();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { role } = useRole();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
        </div>
        <p className="text-gray-600 font-medium">Loading scholarships...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-red-200 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-gray-600 mb-6">Error loading schemes: {error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const activeSchemes = schemes.filter(s => new Date(s.application_deadline) > new Date());
  const totalValue = schemes.reduce((sum, scheme) => sum + scheme.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <svg className="absolute bottom-0 left-0 w-full h-20 text-gray-50" fill="currentColor" viewBox="0 0 1440 120">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
        <div className="relative container mx-auto px-6 py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Scholarship <span className="text-green-300">Opportunities</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8 leading-relaxed">
              Unlock your potential with financial support for your educational journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-2xl font-bold">{schemes.length}</div>
                <div className="text-sm opacity-80">Total Schemes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="text-2xl font-bold">{activeSchemes.length}</div>
                <div className="text-sm opacity-80">Active Now</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <AcademicCapIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{schemes.length}</div>
                <div className="text-gray-600 text-sm">Available Schemes</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <CurrencyRupeeIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString('en-IN')}</div>
                <div className="text-gray-600 text-sm">Total Value</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{activeSchemes.length}</div>
                <div className="text-gray-600 text-sm">Active Opportunities</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="container mx-auto px-6 pb-16">
        {schemes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AcademicCapIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Scholarships Available</h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              We're working on bringing you new scholarship opportunities. Check back soon for updates.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme) => {
              const isActive = new Date(scheme.application_deadline) > new Date();
              const deadlineDate = new Date(scheme.application_deadline);
              const today = new Date();
              const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
              
              return (
                <div 
                  key={scheme._id} 
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                >
                  {/* Card Header */}
                  <div className="p-6 pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {scheme.title}
                        </h3>
                        {isActive ? (
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            Active
                          </div>
                        ) : (
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            Closed
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {scheme.description}
                    </p>
                  </div>

                  {/* Card Details */}
                  <div className="px-6 pb-6 space-y-4">
                    <div className="flex items-center text-sm">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                        <CurrencyRupeeIcon className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">₹{scheme.amount.toLocaleString('en-IN')}</div>
                        <div className="text-gray-500 text-xs">Scholarship Amount</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start text-sm">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 mt-0.5">
                        <AcademicCapIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">Eligibility</div>
                        <div className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                          {scheme.eligibility_criteria}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                        <CalendarDaysIcon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className={`font-semibold ${isActive ? 'text-gray-900' : 'text-red-600'}`}>
                          {deadlineDate.toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {isActive && daysLeft > 0 ? `${daysLeft} days left` : 'Application Deadline'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {isActive && (
                    <div className="px-6 pb-6">
                      {isAuthenticated && role === 'STUDENT' ? (
                        <Link
                          to={`/student/dashboard/schemes/${scheme._id}`}
                          className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-center font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          Apply Now
                        </Link>
                      ) : !isAuthenticated && (
                        <Link
                          to="/login"
                          className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-center font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                          Login to Apply
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schemes;