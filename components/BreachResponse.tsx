
import React, { useState } from 'react';
import { AlertCircle, ShieldAlert, Phone, Users, FileText, Send, Loader2, CheckCircle2 } from 'lucide-react';

const BreachResponse: React.FC = () => {
  const [isReporting, setIsReporting] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [reportStatus, setReportStatus] = useState<'idle' | 'finalized'>('idle');

  const handleReportBreach = () => {
    const confirmed = window.confirm("CRITICAL ACTION: Are you sure you want to trigger the Emergency Breach Protocol? This will notify the Incident Response Team immediately.");
    if (confirmed) {
      setIsReporting(true);
      setTimeout(() => {
        setIsReporting(false);
        alert("EMERGENCY ALERT SENT: The Incident Response Team has been paged. Security logs are being locked for audit.");
      }, 1500);
    }
  };

  const handleFinalizeReport = () => {
    setIsFinalizing(true);
    setTimeout(() => {
      setIsFinalizing(false);
      setReportStatus('finalized');
      alert("SUCCESS: The DPDPA Sec 33 Notification has been prepared and queued for submission to the Data Protection Board.");
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-red-600 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-red-100">
        <div className="p-6 bg-red-700 rounded-3xl">
          <ShieldAlert className="w-16 h-16" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">Emergency Breach Protocol</h2>
          <p className="text-red-100 leading-relaxed max-w-2xl">
            Under DPDPA 2023, the Data Protection Board of India must be notified of any personal data breach within 72 hours of detection. Every second counts.
          </p>
        </div>
        <button 
          onClick={handleReportBreach}
          disabled={isReporting}
          className="bg-white text-red-600 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:bg-red-50 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-75"
        >
          {isReporting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'REPORT BREACH NOW'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
           <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
             <AlertCircle className="w-5 h-5 text-red-500" />
             Response Workflow
           </h3>
           <div className="space-y-6">
             {[
               { t: "Detection (Hour 0)", d: "Automated alert or employee report triggered.", color: "bg-red-100 text-red-700" },
               { t: "Containment (Hour 0-4)", d: "Isolate affected systems, preserve evidence.", color: "bg-amber-100 text-amber-700" },
               { t: "Assessment (Hour 4-24)", d: "Determine scope, users affected, and risk vector.", color: "bg-indigo-100 text-indigo-700" },
               { t: "Notification (Within 72 hrs)", d: "Inform DPB and affected users (if high risk).", color: "bg-emerald-100 text-emerald-700" },
             ].map((step, idx) => (
               <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">{idx + 1}</div>
                    {idx < 3 && <div className="w-0.5 h-full bg-slate-100 my-1" />}
                  </div>
                  <div className="pb-2">
                    <h4 className="font-bold text-slate-800 leading-none mb-1">{step.t}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.d}</p>
                  </div>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            DPB Notification Template
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
               <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Data Fiduciary</label>
               <p className="text-sm font-semibold text-slate-700">MANAS360 Health Technologies Pvt. Ltd.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Date of Breach</label>
                  <p className="text-sm font-medium text-slate-400">DD/MM/YYYY</p>
               </div>
               <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Nature</label>
                  <p className="text-sm font-medium text-slate-400">Unauthorized Access...</p>
               </div>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl h-24">
               <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">Likely Consequences</label>
               <div className={`w-full h-1 bg-slate-200 rounded mt-2 ${reportStatus === 'idle' ? 'animate-pulse' : 'bg-indigo-100'}`} />
               <div className={`w-2/3 h-1 bg-slate-200 rounded mt-2 ${reportStatus === 'idle' ? 'animate-pulse' : 'bg-indigo-100'}`} />
            </div>
            <button 
              onClick={handleFinalizeReport}
              disabled={isFinalizing || reportStatus === 'finalized'}
              className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                reportStatus === 'finalized' 
                  ? 'bg-emerald-600 text-white cursor-default' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
              }`}
            >
              {isFinalizing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : reportStatus === 'finalized' ? (
                <><CheckCircle2 className="w-4 h-4" /> SUBMITTED TO DPB</>
              ) : (
                <><Send className="w-4 h-4" /> Finalize DPB Report</>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col items-center text-center">
            <Phone className="w-8 h-8 text-indigo-600 mb-3" />
            <h4 className="font-bold">Hotline</h4>
            <p className="text-xs text-slate-500 mt-1">24/7 Security Operations</p>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col items-center text-center">
            <Users className="w-8 h-8 text-indigo-600 mb-3" />
            <h4 className="font-bold">Incident Team</h4>
            <p className="text-xs text-slate-500 mt-1">Ready for deployment</p>
         </div>
         <div className="bg-slate-900 p-6 rounded-3xl text-white flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-red-500 animate-ping mb-3" />
            <h4 className="font-bold">Live Monitoring</h4>
            <p className="text-xs text-slate-400 mt-1 italic">Scanning for anomalies...</p>
         </div>
      </div>
    </div>
  );
};

export default BreachResponse;
