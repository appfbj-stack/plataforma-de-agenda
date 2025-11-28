
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Settings, LogOut, Clock3
} from 'lucide-react';
import { useConfig } from '../../contexts/ConfigContext';

interface DashboardProps {
  initialProfession?: string;
  onExit: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ initialProfession, onExit }) => {
  const { config } = useConfig();
  const activeProfessions = config.professions.filter(p => p.active);
  
  // Ensure we have a valid initial tab
  const initialTab = activeProfessions.find(p => p.id === initialProfession) 
    ? initialProfession 
    : activeProfessions[0]?.id || 'barber';

  const [activeTab, setActiveTab] = useState(initialTab || 'barber');

  const activeProfession = config.professions.find(p => p.id === activeTab) || config.professions[0];
  const activeFields = config.fieldConfigs[activeTab] || config.fieldConfigs['barber'] || [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6 md:p-12">
      
      {/* Top Controls */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full hover:bg-slate-800 hover:border-slate-700 transition-colors text-slate-400 hover:text-white"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sair da Demo</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Demonstração Interativa</h1>
          <p className="text-lg text-slate-400">
            Visualize como a estrutura de dados se adapta para cada negócio.
          </p>
        </div>

        {/* Profession Selector */}
        <div className="mb-12">
          <div className="flex justify-center gap-3 flex-wrap">
            {activeProfessions.map((prof) => {
              const Icon = prof.icon;
              const isActive = activeTab === prof.id;
              return (
                <button
                  key={prof.id}
                  onClick={() => setActiveTab(prof.id)}
                  className={`flex items-center gap-2 px-6 py-4 rounded-2xl border transition-all ${
                    isActive 
                      ? `bg-slate-800 border-blue-500 text-white shadow-xl shadow-blue-500/10 ring-1 ring-blue-500 transform scale-105` 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : ''}`} />
                  <span className="font-medium text-lg">{prof.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Area - Focused on Fields/Structure */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full pointer-events-none`} />

            <div className="flex items-start md:items-center justify-between gap-6 mb-10 relative z-10">
               <div className="flex items-center gap-6">
                  <div className={`w-20 h-20 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-lg ${activeProfession?.color}`}>
                     {activeProfession && React.createElement(activeProfession.icon, { className: "w-10 h-10" })}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">{activeProfession?.name}</h2>
                    <p className="text-slate-400">Configuração de Campos do App</p>
                  </div>
               </div>
               
               <div className="hidden md:block text-right">
                  <div className="text-sm font-mono text-slate-500 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                    ID: {activeTab}
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
              
              {/* Standard Fields Column */}
              <div>
                 <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                    <Clock3 className="w-5 h-5 mr-2 text-slate-500" />
                    Campos Padrão
                 </h3>
                 <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between opacity-60">
                       <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-slate-500" />
                          <span className="text-slate-300">Nome do Cliente</span>
                       </div>
                       <span className="text-xs font-mono text-slate-600">REQUIRED</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between opacity-60">
                       <div className="flex items-center gap-3">
                          <Clock3 className="w-5 h-5 text-slate-500" />
                          <span className="text-slate-300">Data e Horário</span>
                       </div>
                       <span className="text-xs font-mono text-slate-600">SYSTEM</span>
                    </div>
                 </div>
              </div>

              {/* Custom Fields Column */}
              <div>
                 <h3 className="text-lg font-bold text-white mb-6 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-blue-400" />
                    Campos Personalizados
                 </h3>
                 
                 <div className="space-y-4">
                    {activeFields.map((field, i) => (
                       <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between group hover:border-blue-500/50 hover:bg-slate-800/80 transition-all"
                       >
                          <div className="flex items-center gap-4">
                             <div className={`p-2 rounded-lg bg-slate-900 ${field.color.replace('text-', 'bg-').replace('400', '500/10')}`}>
                                {field.icon && React.createElement(field.icon, { className: `w-5 h-5 ${field.color}` })}
                             </div>
                             <div>
                                <div className="font-semibold text-white">{field.label}</div>
                                <div className="text-xs text-slate-500 mt-0.5">Visível no agendamento</div>
                             </div>
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider bg-slate-950 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-800">
                             {field.type}
                          </span>
                       </motion.div>
                    ))}

                    {activeFields.length === 0 && (
                       <div className="p-8 rounded-xl bg-slate-950/50 border border-dashed border-slate-800 text-center text-slate-500">
                          Nenhum campo personalizado configurado para esta categoria.
                       </div>
                    )}
                 </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};
