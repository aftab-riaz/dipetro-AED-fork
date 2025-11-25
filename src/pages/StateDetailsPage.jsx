import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function StateDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [stateData, setStateData] = useState(location.state?.lawsData || null);

  useEffect(() => {
    // Only fetch if lawsData not passed via navigate
    if (!stateData) {
      const fetchLaws = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/laws/${slug}`);
          const data = await res.json();
          setStateData(data);
        } catch (err) {
          console.error("Failed to fetch laws:", err);
        }
      };
      fetchLaws();
    }
  }, [slug, stateData]);

  if (!stateData) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <button onClick={() => navigate(-1)} className="mb-6 px-4 py-2 bg-[#301a41] text-white rounded-lg hover:bg-[#41245a] transition-colors duration-200">
          ← Back to Map
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">{slug.replace(/-/g, " ").toUpperCase()} AED Laws</h1>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          {stateData.map((law, i) => (
            <div key={i}>
              <h3 className="font-semibold">{law.title}</h3>
              <p>{law.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
