import { useState, useEffect } from "react";
import { getSchemes } from "../../api/schemesApi";
import SchemeCard from "./SchemeCard";

export default function SchemesPage() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    getSchemes()
      .then(res => {
        setSchemes(res.data.data);   // unwrap { success, data: [...] }
      })
      .catch(err => {
        console.error("Failed to fetch schemes:", err);
        setError("Could not load schemes.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="p-4 text-center">Loading available scholarships…</p>;
  if (error)
    return <p className="p-4 text-red-500 text-center">{error}</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Available Scholarships</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {schemes.map(s => (
          <SchemeCard key={s._id} scheme={s} />
        ))}
      </div>
    </div>
  );
}
