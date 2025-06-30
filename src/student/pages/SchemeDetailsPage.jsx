import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSchemeById } from "../../api/schemesApi";
import { safeDate, formatDate } from "../../utils/dateUtils";

export default function SchemeDetailsPage() {
  const { id } = useParams();
  const nav = useNavigate();

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadScheme = async () => {
      try {
        const res = await getSchemeById(id);
        
        if (!res?.data) {
          throw new Error("Empty response from server");
        }

        const payload = res.data.data ?? res.data;

        // Robust Promise detection
        if (payload && typeof payload.then === 'function') {
          throw new Error("API returned a Promise instead of resolved data");
        }

        setScheme(payload);
      } catch (err) {
        console.error("Failed to load scheme:", err);
        setError(err.message || "Failed to load scheme details.");
      } finally {
        setLoading(false);
      }
    };

    loadScheme();
  }, [id]);

  // Add rendering guard
  if (scheme && typeof scheme.then === 'function') {
    return (
      <div className="p-4 text-center text-red-500">
        Invalid scheme data format detected
      </div>
    );
  }

  // Loading state
  if (loading) {
    return <p className="p-4 text-center">Loading details…</p>;
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
        <button
          onClick={() => nav("/student/dashboard/schemes")}
          className="mt-4 underline"
        >
          ← Back to Schemes
        </button>
      </div>
    );
  }

  // Not found state
  if (!scheme) {
    return <p className="p-4 text-center">Scheme not found.</p>;
  }

  // Safely get deadline date
  const deadline = scheme?.application_deadline 
    ? safeDate(scheme.application_deadline) 
    : new Date();

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{scheme.title}</h2>
        <button
          onClick={() => nav("apply")}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          Apply Now
        </button>
      </div>

      <section className="mb-4">
        <h3 className="font-semibold">Eligibility</h3>
        <p>{scheme?.eligibility_criteria || "N/A"}</p>
      </section>

      <section className="mb-4">
        <h3 className="font-semibold">Amount</h3>
        <p>₹{scheme?.amount?.toLocaleString() || "N/A"}</p>
      </section>

      <section className="mb-4">
        <h3 className="font-semibold">Description</h3>
        <p>{scheme?.description || "No description available."}</p>
      </section>

      <section>
        <h3 className="font-semibold">Deadline</h3>
        <p>
          {formatDate(deadline)}
        </p>
      </section>

      <button
        onClick={() => nav("/student/dashboard/schemes")}
        className="mt-6 text-emerald-600 hover:underline"
      >
        ← Back to all schemes
      </button>
    </div>
  );
}