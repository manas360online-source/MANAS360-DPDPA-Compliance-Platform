
import React from 'react';
import { ComplianceItem, ComplianceCategory } from '../types';
// Added Database to the imports
import { CheckCircle2, Circle, ShieldCheck, Lock, Key, Activity, Database } from 'lucide-react';

interface Props {
  data: ComplianceItem[];
  onToggle: (id: string) => void;
}

const SecurityMeasures: React.FC<Props> = ({ data, onToggle }) => {
  const securityItems = data.filter(i => i.category === ComplianceCategory.SECURITY);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
           <div>
              <h2 className="text-xl font-bold text-slate-900">Section 4: Security Measures</h2>
              <p className="text-sm text-slate-500 mt-1">DPDPA mandates robust protection for personal data against unauthorized access or breach.</p>
           </div>
           <div className="hidden sm:flex bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl border border-indigo-100 items-center gap-2 font-bold text-sm">
             <ShieldCheck className="w-5 h-5" /> 80% Secure
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100">
          {securityItems.map((item) => (
            <div key={item.id} className="bg-white p-8 group hover:bg-indigo-50/20 transition-all cursor-pointer" onClick={() => onToggle(item.id)}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl transition-all ${item.status ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                    {/* Database icon used here */}
                    {item.id.includes('4.1.1') || item.id.includes('4.1.3') ? <Database className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.requirement}</h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium">{item.evidence}</p>
                  </div>
                </div>
                {item.status ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-300 shrink-0" />
                )}
              </div>
              {item.implementation && (
                <div className="mt-4 flex items-center gap-2">
                   <span className="text-[10px] font-black tracking-widest bg-slate-900 text-white px-2 py-1 rounded">
                     {item.implementation}
                   </span>
                   <span className="text-[10px] text-slate-400 font-bold uppercase">Standard Protocol</span>
                </div>
              )}
            </div>
          ))}
          
          {/* Add placeholder cards to finish the grid if needed */}
          <div className="bg-white p-8 flex flex-col justify-center border-l border-slate-100">
            <div className="flex items-center gap-3 text-slate-400 mb-2">
              <Lock className="w-5 h-5" />
              <h4 className="font-bold">Next Milestone</h4>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Automated penetration testing (DAST/SAST) scheduled for next quarter to ensure zero-day vulnerability compliance.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-3xl text-white shadow-xl flex items-center gap-4">
          <Key className="w-10 h-10 text-indigo-400" />
          <div>
            <h4 className="font-bold leading-tight">Key Management</h4>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">AWS KMS in Mumbai</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4">
          <Activity className="w-10 h-10 text-emerald-500" />
          <div>
            <h4 className="font-bold leading-tight">Access Logging</h4>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">Real-time CloudTrail</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-4">
          <ShieldCheck className="w-10 h-10 text-amber-500" />
          <div>
            <h4 className="font-bold leading-tight">WAF / DDoS</h4>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">AWS Shield Advanced</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityMeasures;
