
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { CheckCircle2, Circle, AlertTriangle, ArrowRight, TrendingUp, Info } from 'lucide-react';
import { ComplianceItem, ComplianceCategory } from '../types';
import { DATA_CATEGORIES } from '../constants';

interface DashboardProps {
  data: ComplianceItem[];
  onToggle: (id: string) => void;
  setActiveSection: (section: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onToggle, setActiveSection }) => {
  // Calculate category progress
  const categories = Object.values(ComplianceCategory);
  const categoryProgress = categories.map(cat => {
    const items = data.filter(i => i.category === cat);
    const total = items.length;
    const completed = items.filter(i => i.status).length;
    return {
      name: cat,
      completion: total === 0 ? 0 : Math.round((completed / total) * 100),
      total,
      completed
    };
  });

  const overallCompletion = Math.round(
    (data.filter(i => i.status).length / data.length) * 100
  );

  const pieData = [
    { name: 'Completed', value: data.filter(i => i.status).length },
    { name: 'Pending', value: data.length - data.filter(i => i.status).length },
  ];

  const COLORS = ['#4f46e5', '#e2e8f0'];

  const priorityActions = [
    { text: "Appoint Data Protection Officer", urgent: true, link: 'rights' },
    { text: "Complete staff data protection training", urgent: true, link: 'residency' },
    { text: "Finalize DPAs with all vendors", urgent: false, link: 'vendors' },
    { text: "Implement automated DSR workflow", urgent: false, link: 'rights' },
    { text: "Complete breach response drill", urgent: false, link: 'breach' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-6">
          <div className="relative w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={45}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-slate-800">{overallCompletion}%</span>
            </div>
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider">Overall Status</h3>
            <p className="text-2xl font-bold text-slate-900">IN PROGRESS</p>
            <div className="flex items-center gap-1 mt-1 text-emerald-600 font-medium text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12% this week</span>
            </div>
          </div>
        </div>

        <div className="bg-indigo-600 p-6 rounded-2xl shadow-xl shadow-indigo-200 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-indigo-100" />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-75">Regulatory Risk</span>
          </div>
          <div className="mt-4">
            <p className="text-indigo-100 text-sm opacity-80">Non-compliance Penalty</p>
            <p className="text-3xl font-bold">₹250 Crore</p>
          </div>
          <p className="text-[11px] mt-2 opacity-60">As per DPDPA 2023 Sec 33(1)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Critical Factors</h3>
            <Info className="w-4 h-4 text-slate-400" />
          </div>
          <div className="mt-4 space-y-3">
             {DATA_CATEGORIES.slice(0, 3).map((item, idx) => (
               <div key={idx} className="flex items-center justify-between text-sm">
                 <span className="text-slate-600">{item.name}</span>
                 <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.risk === 'HIGHEST' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                   {item.risk}
                 </span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Completion by Category</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryProgress} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  width={150}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="completion" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Priority Actions</h3>
            <button 
              onClick={() => setActiveSection('inventory')}
              className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {priorityActions.map((action, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveSection(action.link)}
                className="group flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full ${action.urgent ? 'bg-red-500 animate-pulse' : 'bg-amber-400'}`} />
                <span className="flex-1 text-sm font-medium text-slate-700">{action.text}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-900">Recent Compliance Updates</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="px-8 py-4">Requirement</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.slice(0, 6).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 text-sm font-medium text-slate-800">{item.requirement}</td>
                  <td className="px-8 py-4">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    {item.status ? (
                      <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs">
                        <CheckCircle2 className="w-4 h-4" /> Compliant
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
                        <Circle className="w-4 h-4" /> Pending
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-4">
                    <button 
                      onClick={() => onToggle(item.id)}
                      className={`text-xs font-bold ${item.status ? 'text-slate-400 hover:text-slate-600' : 'text-indigo-600 hover:text-indigo-700'}`}
                    >
                      {item.status ? 'Revoke' : 'Complete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
