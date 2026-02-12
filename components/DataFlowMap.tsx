
import React from 'react';
import { ArrowDown, Globe, Shield, Laptop, Cloud, Database, FileDigit, Smartphone } from 'lucide-react';

const DataFlowMap: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-12">MANAS360 Data Flow Architecture</h2>
        
        {/* User Layer */}
        <div className="flex flex-col items-center group mb-8">
          <div className="w-64 bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 flex flex-col items-center shadow-sm group-hover:border-indigo-400 group-hover:bg-indigo-50 transition-all">
            <Smartphone className="w-10 h-10 text-slate-400 group-hover:text-indigo-600 mb-3" />
            <h3 className="font-bold text-slate-800">User (India)</h3>
            <p className="text-xs text-slate-500 mt-1">MANAS360 Frontend App</p>
          </div>
          <div className="h-12 w-px bg-slate-300 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[10px] font-bold text-slate-400 whitespace-nowrap">HTTPS (TLS 1.3)</div>
          </div>
          <ArrowDown className="w-6 h-6 text-slate-300" />
        </div>

        {/* Primary Infra Layer */}
        <div className="w-full max-w-4xl border-2 border-indigo-200 rounded-[32px] p-10 bg-indigo-50/20 relative">
          <div className="absolute -top-4 left-10 bg-indigo-600 text-white text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
            <Shield className="w-3 h-3" /> AWS MUMBAI (ap-south-1)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm flex flex-col items-center">
              <Cloud className="w-8 h-8 text-indigo-600 mb-3" />
              <h4 className="font-bold text-slate-800">API Server</h4>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 text-center">App Logic & Auth</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm flex flex-col items-center">
              <Database className="w-8 h-8 text-indigo-600 mb-3" />
              <h4 className="font-bold text-slate-800">RDS / SQL</h4>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 text-center">Health Records (Encrypted)</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm flex flex-col items-center">
              <FileDigit className="w-8 h-8 text-indigo-600 mb-3" />
              <h4 className="font-bold text-slate-800">S3 Storage</h4>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mt-1 text-center">Assessment Files / Voice</p>
            </div>
          </div>
        </div>

        {/* Split Flow Indicator */}
        <div className="flex items-center gap-32 h-16">
           <div className="w-px h-16 bg-slate-200 relative">
              <ArrowDown className="absolute -bottom-2 -left-[11px] text-slate-200" />
           </div>
           <div className="w-px h-16 bg-slate-200 relative">
              <ArrowDown className="absolute -bottom-2 -left-[11px] text-slate-200" />
           </div>
        </div>

        {/* Cross-Border / Vendor Layer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-white border-2 border-dashed border-amber-200 rounded-3xl p-8 relative hover:border-amber-400 transition-colors">
            <div className="absolute -top-4 left-6 bg-amber-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-md flex items-center gap-2">
              <Globe className="w-3 h-3" /> CROSS-BORDER (with consent)
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                   <h5 className="font-bold text-slate-800">Claude AI (US)</h5>
                   <p className="text-xs text-slate-500">Anthropic API</p>
                </div>
                <div className="text-right text-[10px] text-slate-400 uppercase font-black">Anonymized Prompts</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                   <h5 className="font-bold text-slate-800">Agora Video</h5>
                   <p className="text-xs text-slate-500">Singapore Region</p>
                </div>
                <div className="text-right text-[10px] text-slate-400 uppercase font-black">Encrypted Stream</div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-emerald-100 rounded-3xl p-8 relative">
            <div className="absolute -top-4 left-6 bg-emerald-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-md">
              INDIA VENDORS
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                   <h5 className="font-bold text-slate-800">Razorpay</h5>
                   <p className="text-xs text-slate-500">Payment Processing</p>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">LOCAL</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                   <h5 className="font-bold text-slate-800">MSG91 / SMS</h5>
                   <p className="text-xs text-slate-500">OTP Verification</p>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">LOCAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex items-center gap-8">
        <div className="p-4 bg-slate-800 rounded-2xl">
          <Shield className="w-10 h-10 text-indigo-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold">Data Privacy Protocol</h3>
          <p className="text-slate-400 text-sm mt-1">
            All user-identifiable health data is strictly held in the India partition. Only anonymized behavioral logs or encrypted real-time streams (video/audio) traverse borders with explicit user consent per-session.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataFlowMap;
