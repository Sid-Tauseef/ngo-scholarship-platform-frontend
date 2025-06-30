// src/hooks/useSchemes.js

import { useState, useEffect } from "react";
import {
  getSchemes,
  deleteScheme as deleteSchemeApi,
  applyForScheme as applyForSchemeApi
} from "../api/schemesApi";




const useSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Track mounted state

    const fetchSchemes = async () => {
      try {
        const res = await getSchemes();

        // Simplify response handling
        const data = res.data?.data || res.data?.schemes || res.data;

        // Detect promise-like objects
        if (data && typeof data.then === 'function') {
          throw new Error("Server response included a Promise");
        }

        if (Array.isArray(data)) {
          isMounted && setSchemes(data);
        } else if (data && Array.isArray(data.items)) {
          isMounted && setSchemes(data.items);
        } else {
          throw new Error("Invalid data format from server");
        }

      } catch (err) {
        console.error("Error fetching schemes:", err);
        isMounted && setError(err);
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchSchemes();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  // Delete a scheme (admin use)
  const deleteScheme = async (id) => {
    try {
      await deleteSchemeApi(id);
      setSchemes((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting scheme:", err);
      setError(err);
    }
  };

  // NEW: apply to a scheme (student use)
  const applyForScheme = async (id, applicationData) => {
    try {
      const res = await applyForSchemeApi(id, applicationData);
      return res.data;
    } catch (err) {
      console.error("Error applying for scheme:", err);
      throw err;
    }
  };

  return {
    schemes,
    loading,
    error,
    deleteScheme,
    applyForScheme   // exposed here
  };
};

export default useSchemes;
