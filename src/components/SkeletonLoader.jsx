const SkeletonLoader = ({ className = '', count = 1 }) => {
  if (count > 1) {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className={`animate-pulse bg-gray-200 rounded-xl ${className}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
  );
};

export default SkeletonLoader;