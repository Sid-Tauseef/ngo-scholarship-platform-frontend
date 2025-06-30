// src/utils/dateUtils.js

// Safe date parsing and formatting
export const safeDate = (value) => {
  if (value instanceof Date) return value;
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return isNaN(date) ? new Date() : date;
  }
  return new Date();
};

export const formatDate = (value, options = {}) => {
  const date = safeDate(value);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    ...options
  });
};

export const formatLongDate = (value) => {
  return formatDate(value, {
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  });
};