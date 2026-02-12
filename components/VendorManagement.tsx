
import React, { useState } from 'react';
import { Users, CheckCircle2, Circle, Globe, Shield, AlertTriangle, FileText, Loader2 } from 'lucide-react';

const VendorManagement: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  const vendors = [
    { name: "AWS", svc: "Cloud hosting", loc: "India (Mumbai)", dpa: true, status: "Active" },
    { name: "Anthropic", svc: "AI chatbot", loc: "USA", dpa: true, status: "Active" },
    { name: "Agora", svc: "Video SDK", loc: "Singapore", dpa: true, status: "Review" },
    { name: "Razorpay", svc: "Payments", loc: "India", dpa: true, status: "Active" },
    { name: "MSG91", svc: "SMS/OTP", loc: "India", dpa: false, status: "Urgent" },
  ];

  const handleDownloadDPA = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("SUCCESS: MANAS360_Standard_DPA_v2.0.pdf has been generated and downloaded.");
    }, 1000);
  };

  const handleStartAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      alert("AUDIT INITIATED: Automated vendor compliance probes have been dispatched for Anthropic and Agora. Report ready in 48 hours.");
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Third-Party Data Processors</h2>
            <p className="text-sm text-slate-500 mt-1">Assessment of vendors handling MANAS360 user data.</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-amber-200">
              <AlertTriangle className="w-4 h-4" /> 1 DPA Missing
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-4">Vendor</th>
                <th className="px-8 py-4">Service</th>
                <th className="px-8 py-4">Location</th>
                <th className="px-8 py-4">DPA Signed</th>
                <th className="px-8 py-4">Risk Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vendors.map((v, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400">{v.name[0]}</div>
                       <span className="font-bold text-slate-800">{v.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-600">{v.svc}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Globe className="w-3.5 h-3.5" /> {v.loc}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {v.dpa ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-200" />
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      v.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                      v.status === 'Review' ? 'bg-amber-50 text-amber-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-12 text-white relative overflow-hidden group">
         <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl font-bold mb-4">Vendor Compliance Framework</h3>
            <p className="text-slate-400 leading-relaxed mb-8">
              Every vendor must sign our Standard Data Processing Agreement (DPA) which mandates: India-first processing for PII, 256-bit encryption, and immediate breach notification within 24 hours of their detection.
            </p>
            <div className="flex flex-wrap gap-4">
               <button 
                onClick={handleDownloadDPA}
                disabled={isDownloading}
                className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-75"
               >
                 {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><FileText className="w-4 h-4" /> Download DPA Template</>}
               </button>
               <button 
                onClick={handleStartAudit}
                disabled={isAuditing}
                className="bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-700 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-75"
               >
                 {isAuditing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Shield className="w-4 h-4 text-indigo-400" /> Start Audit Process</>}
               </button>
            </div>
         </div>
         <Users className="w-64 h-64 absolute -right-12 -bottom-12 text-white opacity-5 group-hover:rotate-12 transition-transform duration-700" />
      </div>
    </div>
  );
};

export default VendorManagement;
