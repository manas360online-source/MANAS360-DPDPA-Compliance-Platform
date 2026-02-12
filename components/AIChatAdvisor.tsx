
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, AlertCircle, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface AIChatAdvisorProps {
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChatAdvisor: React.FC<AIChatAdvisorProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your MANAS360 Compliance Assistant. I have deep knowledge of our DPDPA checklist and data residency architecture. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      // Initialize Gemini with the API key directly from process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are the MANAS360 Compliance Advisor, an expert on the Digital Personal Data Protection Act (DPDPA) 2023 of India.
          MANAS360 is a mental health platform.
          Our architecture:
          - Servers: AWS Mumbai (ap-south-1).
          - Database: RDS/MySQL (Mumbai).
          - Cross-border: Claude API (US) for AI chat, Agora (Singapore) for Video sessions.
          - Consent: Explicitly obtained for cross-border transfers.
          - Penalties: Up to ₹250 Crore for non-compliance.
          Provide short, professional, and accurate compliance advice based on our checklist.`,
        },
      });

      // Directly accessing the text property as per guidelines
      const assistantContent = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error connecting to my brain. Please check the network.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[450px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold leading-none">Compliance Advisor</h3>
            <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Powered by Gemini AI</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl flex gap-3 ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
            }`}>
              <div className="flex-shrink-0">
                {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-indigo-600" />}
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span className="text-sm text-slate-500 italic">Advisor is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a DPDPA compliance question..."
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping}
            className="bg-slate-900 text-white p-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400 justify-center">
           <AlertCircle className="w-3 h-3" />
           Answers are for guidance only and do not replace legal advice.
        </div>
      </div>
    </div>
  );
};

export default AIChatAdvisor;
