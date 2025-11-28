
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, RotateCcw, LayoutTemplate, Briefcase, ChevronLeft, Eye, EyeOff, Plus, Trash2, Settings, Edit2 } from 'lucide-react';
import { useConfig } from '../../contexts/ConfigContext';
import { Button } from '../ui/Button';

interface AdminPanelProps {
  onExit: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onExit }) => {
  const { 
    config, 
    updateLandingConfig, 
    toggleProfession, 
    updateProfession, 
    resetConfig,
    addField,
    removeField,
    updateField
  } = useConfig();
  
  const [activeTab, setActiveTab] = useState<'landing' | 'professions'>('landing');
  const [expandedProfession, setExpandedProfession] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onExit} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div className="flex items-center gap-2">
             <div className="bg-blue-600 p-1.5 rounded-lg">
                <LayoutTemplate className="w-4 h-4 text-white" />
             </div>
             <h1 className="font-bold text-lg">Painel Administrativo</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={resetConfig} className="text-red-400 hover:text-red-300 border-red-900/50">
            <RotateCcw className="w-4 h-4 mr-2" /> Restaurar Padrão
          </Button>
          <Button size="sm" onClick={onExit} className="bg-emerald-600 hover:bg-emerald-500 border-none">
            <Save className="w-4 h-4 mr-2" /> Salvar e Sair
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900/50 border-r border-slate-800 p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('landing')}
              className={`w-full flex items-center p-3 rounded-xl transition-all ${
                activeTab === 'landing' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <LayoutTemplate className="w-4 h-4 mr-3" /> Landing Page
            </button>
            <button
              onClick={() => setActiveTab('professions')}
              className={`w-full flex items-center p-3 rounded-xl transition-all ${
                activeTab === 'professions' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-4 h-4 mr-3" /> Profissões e Modelos
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-950">
          <div className="max-w-4xl mx-auto">
            
            {activeTab === 'landing' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div>
                   <h2 className="text-2xl font-bold mb-2">Configuração da Landing Page</h2>
                   <p className="text-slate-400">Edite os textos principais que aparecem para os visitantes.</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                   <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-300">Título Principal (Hero)</label>
                      <input 
                        type="text" 
                        value={config.landing.heroTitle}
                        onChange={(e) => updateLandingConfig('heroTitle', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                   </div>
                   
                   <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-300">Subtítulo</label>
                      <textarea 
                        rows={3}
                        value={config.landing.heroSubtitle}
                        onChange={(e) => updateLandingConfig('heroSubtitle', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-300">Texto do Botão (CTA)</label>
                      <input 
                        type="text" 
                        value={config.landing.heroButtonText}
                        onChange={(e) => updateLandingConfig('heroButtonText', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'professions' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div>
                   <h2 className="text-2xl font-bold mb-2">Gerenciar Profissões</h2>
                   <p className="text-slate-400">Ative, desative ou edite os nomes das profissões disponíveis.</p>
                </div>

                <div className="grid gap-4">
                  {config.professions.map((prof) => (
                    <div key={prof.id} className="flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all">
                      <div className={`p-4 flex items-center justify-between ${!prof.active ? 'opacity-60' : ''}`}>
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-800 ${prof.color}`}>
                             {React.createElement(prof.icon, { className: "w-5 h-5" })}
                          </div>
                          <div className="flex-1">
                             <input 
                               type="text"
                               value={prof.name}
                               onChange={(e) => updateProfession(prof.id, { name: e.target.value })}
                               disabled={!prof.active}
                               className="bg-transparent font-bold text-white border-b border-transparent hover:border-slate-600 focus:border-blue-500 outline-none px-1 w-full max-w-[200px]"
                             />
                             <input 
                               type="text"
                               value={prof.description}
                               onChange={(e) => updateProfession(prof.id, { description: e.target.value })}
                               disabled={!prof.active}
                               className="bg-transparent text-sm text-slate-400 border-b border-transparent hover:border-slate-600 focus:border-blue-500 outline-none px-1 w-full mt-1"
                             />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 border-l border-slate-800 pl-4 ml-4">
                          <button 
                             onClick={() => setExpandedProfession(expandedProfession === prof.id ? null : prof.id)}
                             className={`p-2 rounded-lg transition-colors bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-white ${expandedProfession === prof.id ? 'bg-blue-600 text-white' : ''}`}
                             title="Editar Campos"
                             disabled={!prof.active}
                          >
                             <Settings className="w-4 h-4" />
                          </button>
                          <button 
                             onClick={() => toggleProfession(prof.id)}
                             className={`p-2 rounded-lg transition-colors ${prof.active ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                             title={prof.active ? "Desativar Profissão" : "Ativar Profissão"}
                          >
                             {prof.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Field Editor */}
                      <AnimatePresence>
                        {expandedProfession === prof.id && prof.active && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-slate-950 border-t border-slate-800 p-4"
                          >
                             <div className="mb-4 flex justify-between items-center">
                                <h4 className="text-sm font-bold text-slate-300">Campos da Agenda ({prof.name})</h4>
                                <Button size="sm" onClick={() => addField(prof.id)}>
                                   <Plus className="w-3 h-3 mr-2" /> Adicionar Campo
                                </Button>
                             </div>

                             <div className="space-y-3">
                                {(config.fieldConfigs[prof.id] || []).map((field, idx) => (
                                   <div key={idx} className="flex items-center gap-3 bg-slate-900 p-3 rounded-lg border border-slate-800">
                                      <div className="p-2 bg-slate-800 rounded">
                                         {field.icon && React.createElement(field.icon, { className: "w-4 h-4 text-slate-400" })}
                                      </div>
                                      
                                      <div className="flex-1 grid grid-cols-2 gap-4">
                                         <div>
                                            <label className="text-[10px] text-slate-500 uppercase font-bold">Rótulo</label>
                                            <input 
                                               type="text" 
                                               value={field.label}
                                               onChange={(e) => updateField(prof.id, idx, { label: e.target.value })}
                                               className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm focus:border-blue-500 outline-none"
                                            />
                                         </div>
                                         <div>
                                            <label className="text-[10px] text-slate-500 uppercase font-bold">Tipo de Campo</label>
                                            <select 
                                               value={field.type}
                                               onChange={(e) => updateField(prof.id, idx, { type: e.target.value })}
                                               className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm focus:border-blue-500 outline-none text-slate-300"
                                            >
                                               <option value="Texto">Texto Curto</option>
                                               <option value="Texto Longo">Texto Longo</option>
                                               <option value="Número">Número</option>
                                               <option value="Seleção">Seleção</option>
                                               <option value="Data">Data</option>
                                               <option value="Boolean">Sim/Não</option>
                                            </select>
                                         </div>
                                      </div>

                                      <button 
                                        onClick={() => removeField(prof.id, idx)}
                                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-900/20 rounded transition-colors"
                                      >
                                         <Trash2 className="w-4 h-4" />
                                      </button>
                                   </div>
                                ))}
                                {(config.fieldConfigs[prof.id] || []).length === 0 && (
                                   <p className="text-sm text-slate-500 italic text-center py-4">Nenhum campo personalizado.</p>
                                )}
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};
