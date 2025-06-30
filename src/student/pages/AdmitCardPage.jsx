import { useEffect, useState } from "react";
import { getMyAdmitCard } from "../../api/studentsApi";
import { ArrowDownTrayIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function AdmitCardPage() {
  const [url, setUrl]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    getMyAdmitCard()
      .then(res => {
        if (res.data.url) setUrl(res.data.url);
        else setError("Not available yet.");
      })
      .catch(() => setError("Failed to fetch."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Checking admit card…</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Admit Card</h2>

      {error && (
        <div className="flex items-center text-yellow-600">
          <XCircleIcon className="h-6 w-6 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Download PDF
        </a>
      )}
    </div>
  );
}
