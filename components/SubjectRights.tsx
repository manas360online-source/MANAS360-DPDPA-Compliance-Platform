
import React, { useState } from 'react';
import { ComplianceItem, ComplianceCategory } from '../types';
import { UserCheck, ArrowRight, Clock, Trash2, Edit3, Eye, Mail, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  data: ComplianceItem[];
  onToggle: (id: string) => void;
}

const SubjectRights: React.FC<Props> = ({ data, onToggle }) => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'workflow'>('checklist');
  const rightsItems = data.filter(i => i.category === ComplianceCategory.SUBJECT_RIGHTS);

  const workflowSteps = [
    { title: "User Submits Request", desc: "App / Email / Support Portal", icon: Mail, day: 0 },
    { title: "Identity Verification", desc: "OTP / Registered Email check", icon: UserCheck, day: 1 },
    { title: "Request Processing", desc: "Compile data / Update records", icon: Edit3, day: 3 },
    { title: "Completion Notification", desc: "User notified + Audit log updated", icon: CheckCircle2, day: 30 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 w-fit">
        <button 
          onClick={() => setActiveTab('checklist')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'checklist' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Rights Checklist
        </button>
        <button 
          onClick={() => setActiveTab('workflow')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'workflow' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'}`}
        >
          DSR Workflow
        </button>
      </div>

      {activeTab === 'checklist' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rightsItems.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl ${item.status ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                  {item.requirement.includes('Access') && <Eye className="w-6 h-6" />}
                  {item.requirement.includes('Correction') && <Edit3 className="w-6 h-6" />}
                  {item.requirement.includes('Erasure') && <Trash2 className="w-6 h-6" />}
                </div>
                <button onClick={() => onToggle(item.id)}>
                   <CheckCircle2 className={`w-8 h-8 ${item.status ? 'text-emerald-500' : 'text-slate-200'}`} />
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{item.requirement}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">DPDPA Sec {item.id.includes('6.1.1') ? '11' : item.id.includes('6.1.2') ? '12' : '13'}: Self-service tool for users to manage their data footprint.</p>
              
              <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4" /> 72 Hours SLA
                </div>
                <button className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <FileText className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
             {/* Connector Line (Desktop) */}
             <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
             
             {workflowSteps.map((step, idx) => (
               <div key={idx} className="flex flex-col items-center relative z-10 text-center">
                 <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-xl mb-4">
                    <step.icon className="w-8 h-8" />
                 </div>
                 <h4 className="font-bold text-slate-800">{step.title}</h4>
                 <p className="text-xs text-slate-500 mt-1 max-w-[150px]">{step.desc}</p>
                 <span className="mt-3 text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded">DAY {step.day}</span>
                 {idx < workflowSteps.length - 1 && (
                   <div className="md:hidden my-4">
                     <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
                   </div>
                 )}
               </div>
             ))}
          </div>
        </div>
      )}

      <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-bold text-indigo-900 text-lg">Standard Data Export Format</h4>
          <p className="text-indigo-700 text-sm mt-1 opacity-80">We use a structured JSON schema for "Right to Access" requests as per DPDPA guidelines.</p>
        </div>
        <pre className="bg-white p-6 rounded-2xl text-[10px] font-mono text-slate-600 border border-indigo-100 w-full md:w-[350px] overflow-hidden">
{`{
  "export_metadata": {
    "generated_at": "2025-01-21T10:30:00Z",
    "user_id": "usr_78231",
    "format_version": "1.0"
  },
  "personal_info": { ... },
  "health_records": [ ... ]
}`}
        </pre>
      </div>
    </div>
  );
};

export default SubjectRights;
