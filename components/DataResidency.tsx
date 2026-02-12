
import React from 'react';
import { ComplianceItem, ComplianceCategory } from '../types';
// Added Database to the imports
import { CheckCircle2, Circle, ExternalLink, Globe, MapPin, Server, Database } from 'lucide-react';

interface DataResidencyProps {
  data: ComplianceItem[];
  onToggle: (id: string) => void;
}

const DataResidency: React.FC<DataResidencyProps> = ({ data, onToggle }) => {
  const residencyItems = data.filter(i => i.category === ComplianceCategory.DATA_RESIDENCY);

  const handleOpenAWS = () => {
    alert("Opening secure PDF: AWS_DPA_Addendum_India_2024.pdf\nAccessing restricted document vault...");
    window.open("https://aws.amazon.com/compliance/data-privacy-faq/", "_blank");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold mb-2">Section 1: Data Residency</h2>
          <p className="text-indigo-100 opacity-90 leading-relaxed">
            As a mental health provider in India, DPDPA 2023 requires all sensitive personal data (health records, assessments) to be stored primarily on local infrastructure. MANAS360 utilizes AWS Mumbai Region (ap-south-1).
          </p>
        </div>
        <div className="flex -space-x-2">
           <div className="w-12 h-12 rounded-full border-2 border-indigo-400 bg-indigo-500 flex items-center justify-center shadow-lg"><Globe className="w-6 h-6" /></div>
           <div className="w-12 h-12 rounded-full border-2 border-indigo-400 bg-indigo-500 flex items-center justify-center shadow-lg"><MapPin className="w-6 h-6" /></div>
           <div className="w-12 h-12 rounded-full border-2 border-indigo-400 bg-indigo-500 flex items-center justify-center shadow-lg"><Server className="w-6 h-6" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Infrastructure Location Checklist</h3>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold">100% COMPLIANT</span>
          </div>
          <div className="divide-y divide-slate-100">
            {residencyItems.map((item) => (
              <div key={item.id} className="p-6 flex items-start gap-6 hover:bg-slate-50 transition-colors">
                <button 
                  onClick={() => onToggle(item.id)}
                  className={`mt-1 transition-colors ${item.status ? 'text-emerald-500' : 'text-slate-300'}`}
                >
                  {item.status ? <CheckCircle2 className="w-6 h-6 fill-emerald-50" /> : <Circle className="w-6 h-6" />}
                </button>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900">{item.requirement}</h4>
                  <p className="text-sm text-slate-500 mt-1">Evidence Required: {item.evidence}</p>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                     {item.id}
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              {/* Database icon used here */}
              <Database className="w-5 h-5 text-indigo-600" />
              Primary Hosting Info
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Provider</p>
                <p className="text-sm font-semibold text-slate-800">Amazon Web Services (AWS)</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Primary Region</p>
                <p className="text-sm font-semibold text-slate-800">ap-south-1 (Mumbai, India)</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">DR Region</p>
                <p className="text-sm font-semibold text-slate-800">ap-south-2 (Hyderabad, India)</p>
              </div>
            </div>
            <button 
              onClick={handleOpenAWS}
              className="w-full mt-6 py-3 px-4 bg-slate-900 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View AWS DPA Addendum
            </button>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 shadow-sm border-l-4 border-l-amber-500">
            <h4 className="text-amber-800 font-bold text-sm mb-2">Cloud Sovereignty Note</h4>
            <p className="text-amber-700 text-xs leading-relaxed opacity-90">
              Cross-region replication to regions outside India (e.g., us-east-1) is strictly disabled in S3 and RDS console to prevent unintentional data leakage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataResidency;
