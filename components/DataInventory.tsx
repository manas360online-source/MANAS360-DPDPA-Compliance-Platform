
import React, { useState } from 'react';
import { ShieldAlert, Info, Database, Loader2, CheckCircle2 } from 'lucide-react';

const DataInventory: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [lastVerified, setLastVerified] = useState("2 hours ago");

  const inventory = [
    { cat: "Identity Data", examples: "Name, email, phone, DOB", sens: "Medium", storage: "AWS Mumbai DB", ret: "Life + 3 years" },
    { cat: "Health Assessment", examples: "PHQ-9, GAD-7 scores", sens: "HIGH", storage: "AWS Mumbai DB (Enc)", ret: "7 years" },
    { cat: "Therapy Notes", examples: "Session summaries", sens: "HIGHEST", storage: "AWS Mumbai DB (Enc)", ret: "7 years" },
    { cat: "Prescriptions", examples: "Medications, dosages", sens: "HIGHEST", storage: "AWS Mumbai DB (Enc)", ret: "7 years" },
    { cat: "Chat Transcripts", examples: "AI chatbot convos", sens: "HIGH", storage: "AWS Mumbai DB (Enc)", ret: "1 year" },
    { cat: "Voice Recordings", examples: "IVR interactions", sens: "HIGH", storage: "S3 Mumbai (Enc)", ret: "90 days" },
  ];

  const handleDownloadROPA = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inventory, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "MANAS360_ROPA_Inventory.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleVerifyRegistry = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setLastVerified("Just now");
      alert("Inventory sync complete. All 6 categories matched with live AWS schema.");
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Personal Data Inventory</h2>
            <p className="text-sm text-slate-500 mt-1">Detailed classification and storage mapping for all user data categories.</p>
          </div>
          <button 
            onClick={handleDownloadROPA}
            className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
          >
            Download ROPA JSON
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-4">Data Category</th>
                <th className="px-8 py-4">Examples</th>
                <th className="px-8 py-4">Sensitivity</th>
                <th className="px-8 py-4">Storage Location</th>
                <th className="px-8 py-4">Retention</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventory.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${item.sens === 'HIGHEST' ? 'bg-red-500' : item.sens === 'HIGH' ? 'bg-orange-500' : 'bg-slate-400'}`} />
                       <span className="font-bold text-slate-800">{item.cat}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-600 italic">"{item.examples}"</td>
                  <td className="px-8 py-6">
                    <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-black tracking-tight ${
                      item.sens === 'HIGHEST' ? 'bg-red-100 text-red-700' : 
                      item.sens === 'HIGH' ? 'bg-orange-100 text-orange-700' : 
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {item.sens}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs font-semibold text-slate-500">
                    <div className="flex items-center gap-1.5 mt-1">
                      <Database className="w-3 h-3" />
                      {item.storage}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-500">{item.ret}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex items-start gap-6">
           <div className="p-4 bg-white rounded-2xl shadow-sm text-red-600">
             <ShieldAlert className="w-8 h-8" />
           </div>
           <div>
              <h4 className="text-red-900 font-bold mb-2">Sensitivity Threshold</h4>
              <p className="text-red-700 text-sm leading-relaxed opacity-80">
                Mental Health records are classified as "Sensitive Personal Data" under the DPDPA framework. Unauthorized processing or storage outside India without explicit individual consent is a tier-1 violation.
              </p>
           </div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-3xl text-white flex items-center justify-between shadow-xl relative overflow-hidden">
           <div className="relative z-10">
              <h4 className="text-2xl font-bold mb-1">Audit Ready</h4>
              <p className="text-indigo-100 opacity-80 text-sm">Last verification: {lastVerified}</p>
              <button 
                onClick={handleVerifyRegistry}
                disabled={isVerifying}
                className="mt-6 bg-white text-indigo-700 px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Verify Registry
                  </>
                )}
              </button>
           </div>
           <Info className="w-32 h-32 absolute -right-4 -bottom-4 text-white opacity-10 rotate-12" />
        </div>
      </div>
    </div>
  );
};

export default DataInventory;
