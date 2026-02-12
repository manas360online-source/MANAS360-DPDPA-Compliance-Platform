
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  LayoutDashboard, 
  Map, 
  Database, 
  Lock, 
  UserCheck, 
  ClipboardCheck, 
  AlertCircle, 
  Users, 
  FileText,
  BarChart3,
  ChevronRight,
  Menu,
  X,
  Bot
} from 'lucide-react';
import { INITIAL_COMPLIANCE_DATA } from './constants';
import { ComplianceItem, ComplianceCategory } from './types';

// Sections
import Dashboard from './components/Dashboard';
import DataResidency from './components/DataResidency';
import DataInventory from './components/DataInventory';
import DataFlowMap from './components/DataFlowMap';
import SecurityMeasures from './components/SecurityMeasures';
import SubjectRights from './components/SubjectRights';
import BreachResponse from './components/BreachResponse';
import VendorManagement from './components/VendorManagement';
import AIChatAdvisor from './components/AIChatAdvisor';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [complianceData, setComplianceData] = useState<ComplianceItem[]>(INITIAL_COMPLIANCE_DATA);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAIAdvisor, setShowAIAdvisor] = useState(false);

  const toggleStatus = (id: string) => {
    setComplianceData(prev => prev.map(item => 
      item.id === id ? { ...item, status: !item.status } : item
    ));
  };

  const navItems = [
    { id: 'dashboard', label: 'Compliance Dashboard', icon: LayoutDashboard },
    { id: 'residency', label: 'Data Residency', icon: Database },
    { id: 'inventory', label: 'Data Inventory', icon: ClipboardCheck },
    { id: 'flow', label: 'Data Flow Mapping', icon: Map },
    { id: 'security', label: 'Security Measures', icon: Shield },
    { id: 'rights', label: 'Subject Rights', icon: UserCheck },
    { id: 'breach', label: 'Breach Response', icon: AlertCircle },
    { id: 'vendors', label: 'Vendor Management', icon: Users },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard data={complianceData} onToggle={toggleStatus} setActiveSection={setActiveSection} />;
      case 'residency': return <DataResidency data={complianceData} onToggle={toggleStatus} />;
      case 'inventory': return <DataInventory />;
      case 'flow': return <DataFlowMap />;
      case 'security': return <SecurityMeasures data={complianceData} onToggle={toggleStatus} />;
      case 'rights': return <SubjectRights data={complianceData} onToggle={toggleStatus} />;
      case 'breach': return <BreachResponse />;
      case 'vendors': return <VendorManagement />;
      default: return <Dashboard data={complianceData} onToggle={toggleStatus} setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 overflow-hidden">
      {/* Mobile Backdrop */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-slate-200 transition-transform duration-300 md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight">MANAS360</h1>
                <p className="text-xs text-slate-500 font-medium">Compliance Platform</p>
              </div>
            </div>
            <button 
              className="md:hidden p-2 text-slate-400 hover:text-slate-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${activeSection === item.id 
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm ring-1 ring-indigo-200' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
              >
                <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {activeSection === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <button 
              onClick={() => setShowAIAdvisor(true)}
              className="w-full bg-slate-900 text-white rounded-xl p-4 flex items-center gap-3 hover:bg-slate-800 transition-colors shadow-lg"
            >
              <Bot className="w-6 h-6 text-indigo-400" />
              <div className="text-left">
                <div className="text-sm font-semibold leading-none">AI Advisor</div>
                <div className="text-[10px] text-slate-400 mt-1">DPDPA Expert Ready</div>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto relative">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {navItems.find(i => i.id === activeSection)?.label}
              </h2>
              <p className="text-sm text-slate-500">DPDPA 2023 Compliance Track v1.0</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200 text-xs font-semibold">
               <AlertCircle className="w-4 h-4" />
               Critical Audit: 20 days left
             </div>
             <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-bold text-slate-600 shadow-sm">
               MP
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6 md:p-8 max-w-7xl mx-auto pb-24">
          {renderSection()}
        </div>
      </main>

      {/* AI Advisor Modal/Drawer */}
      {showAIAdvisor && (
        <AIChatAdvisor onClose={() => setShowAIAdvisor(false)} />
      )}
    </div>
  );
};

export default App;
