import { Link } from "react-router-dom";
import { AcademicCapIcon, ClockIcon, CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { safeDate, formatDate } from "../../utils/dateUtils";

const SchemeCard = ({ scheme }) => {
  const [daysLeft, setDaysLeft] = useState(0);
  const [urgencyColor, setUrgencyColor] = useState("bg-emerald-100 text-emerald-800");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    try {
      // Safely parse dates
      const deadline = safeDate(scheme.application_deadline);
      const today = new Date();
      
      // Calculate days left safely
      const diffTime = Math.max(0, deadline - today);
      const calculatedDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Determine urgency color
      let colorClass = "bg-emerald-100 text-emerald-800";
      if (calculatedDays <= 3) {
        colorClass = "bg-red-100 text-red-800";
      } else if (calculatedDays <= 7) {
        colorClass = "bg-orange-100 text-orange-800";
      }
      
      // Calculate progress width
      const width = Math.min(100, Math.max(0, 100 - (calculatedDays * 2)));
      
      // Update state
      setDaysLeft(calculatedDays);
      setUrgencyColor(colorClass);
      setDeadlineDate(formatDate(deadline, { day: 'numeric', month: 'short' }));
      setProgressWidth(width);
    } catch (error) {
      console.error("Error processing scheme data:", error);
      setDaysLeft(0);
      setUrgencyColor("bg-gray-100 text-gray-800");
      setDeadlineDate("Invalid date");
      setProgressWidth(0);
    }
  }, [scheme]);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <div className="relative">
        <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-full">
          Scholarship
        </div>
        
        <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 p-6 flex justify-center">
          <div className="bg-white p-3 rounded-full shadow-inner group-hover:scale-105 transition-transform">
            <AcademicCapIcon className="h-10 w-10 text-emerald-600" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
          {scheme.title}
        </h3>
        
        <div className="relative mb-4 min-h-[3rem]">
          <div className="text-gray-600 text-sm h-12 overflow-hidden relative">
            {scheme.description}
            <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center">
            <div className="bg-emerald-50 p-2 rounded-lg mr-3">
              <CurrencyRupeeIcon className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Amount</p>
              <p className="font-semibold">₹{scheme.amount}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-amber-50 p-2 rounded-lg mr-3">
              <ClockIcon className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Deadline</p>
              <p className="font-semibold">{deadlineDate}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-5">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${urgencyColor}`}
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>
          <span className={`text-xs font-semibold ml-3 px-2 py-1 rounded-full ${urgencyColor}`}>
            {daysLeft > 0 ? `${daysLeft} days left` : 'Closing soon'}
          </span>
        </div>
        
        <Link
          to={`/student/dashboard/schemes/${scheme._id}/apply`}
          className="block w-full text-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-3 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default SchemeCard;