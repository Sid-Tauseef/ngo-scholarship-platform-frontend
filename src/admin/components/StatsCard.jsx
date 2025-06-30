const StatsCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    emerald: 'from-emerald-100 to-emerald-50',
    blue: 'from-blue-100 to-blue-50',
    purple: 'from-purple-100 to-purple-50',
    amber: 'from-amber-100 to-amber-50'
  };

  return (
    <div className="bg-gradient-to-br p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;