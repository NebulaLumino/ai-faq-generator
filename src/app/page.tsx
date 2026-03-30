"use client";
import { useState } from "react";
export default function FaqGenerator() {
  const [productName, setProductName] = useState("");
  const [features, setFeatures] = useState("");
  const [objections, setObjections] = useState("");
  const [tone, setTone] = useState("helpful");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!productName.trim()) { setError("Product/service name is required."); return; }
    setLoading(true); setError(""); setOutput("");
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ productName, features, objections, tone }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOutput(data.result);
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent mb-3">❓ FAQ Generator</h1>
          <p className="text-gray-400 text-lg">Generate comprehensive knowledge base articles</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Product/Service Name *</label>
              <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="e.g., NovaChat AI Assistant"
                className="w-full bg-gray-900/80 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Features (one per line)</label>
              <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={5} placeholder={"AI-powered chat\nImage generation\nCode assistance\nMulti-language support"}
                className="w-full bg-gray-900/80 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Common Objections / Questions (one per line)</label>
              <textarea value={objections} onChange={(e) => setObjections(e.target.value)} rows={4} placeholder={"Is my data private?\nHow accurate is it?\nDoes it support X language?\nWhat's the pricing?"}
                className="w-full bg-gray-900/80 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 transition resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full bg-gray-900/80 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition">
                <option value="helpful">Helpful & Informative</option><option value="professional">Professional</option><option value="casual">Casual & Friendly</option><option value="technical">Technical</option>
              </select>
            </div>
            {error && <div className="bg-red-900/40 border border-red-700 rounded-xl px-4 py-3 text-red-300 text-sm">{error}</div>}
            <button onClick={generate} disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all duration-200 cursor-pointer">
              {loading ? "Generating..." : "Generate FAQ"}
            </button>
          </div>
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Generated FAQ</h2>
            {output ? <pre className="whitespace-pre-wrap text-sm text-gray-300 bg-gray-900/80 rounded-xl p-4 overflow-auto max-h-[600px] font-mono leading-relaxed">{output}</pre>
              : <div className="flex items-center justify-center h-64 text-gray-500"><div className="text-center"><div className="text-4xl mb-3">❓</div><p>Your FAQ will appear here</p></div></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
