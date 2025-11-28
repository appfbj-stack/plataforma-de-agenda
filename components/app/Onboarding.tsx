
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, Play, Settings, Smartphone, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Profession } from '../../types';
import { useConfig } from '../../contexts/ConfigContext';

interface OnboardingProps {
  onComplete: (professionId: string) => void;
  onBack: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onBack }) => {
  const { config } = useConfig();
  const [selectedProfession, setSelectedProfession] = useState<Profession | null>(null);

  // Filter only active professions
  const activeProfessions = config.professions.filter(p => p.active);

  const handleWhatsAppRedirect = (professionName: string) => {
    const phoneNumber = "5515992724313";
    const message = encodeURIComponent(`Olá! Tenho interesse no modelo de agendamento para ${professionName}. Gostaria de mais informações.`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  // If a profession is selected, show the Detail View
  if (selectedProfession) {
    // Change: Use config.fieldConfigs instead of static constant
    const fields = config.fieldConfigs[selectedProfession.id] || config.fieldConfigs['barber'] || [];
    const Icon = selectedProfession.icon;

    return (
      <div className="min-h-screen bg-slate-950 text-white overflow-y-auto pb-12">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-white/5 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <button 
              onClick={() => setSelectedProfession(null)}
              className="flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Voltar para escolha</span>
            </button>
            <div className="font-bold text-lg hidden sm:block">Detalhes do Modelo</div>
            <div className="w-24"></div> {/* Spacer */}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-8 mb-12"
          >
            <div className="md:w-2/3">
              <div className="flex items-center gap-4 mb-4">
                 <div className={`p-3 rounded-2xl bg-slate-900 border border-slate-700 ${selectedProfession.color}`}>
                    <Icon className="w-8 h-8" />
                 </div>
                 <h1 className="text-4xl font-bold">{selectedProfession.name}</h1>
              </div>
              <p className="text-xl text-slate-400 leading-relaxed mb-6">
                Este modelo vem pré-configurado com tudo que uma {selectedProfession.name.toLowerCase()} precisa. 
                Desde campos personalizados até notificações automáticas específicas para o seu público.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                 {selectedProfession.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-slate-800 rounded-full text-sm text-slate-300 border border-slate-700">
                     #{tag}
                   </span>
                 ))}
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  onClick={() => handleWhatsAppRedirect(selectedProfession.name)}
                  className="!bg-[#25D366] hover:!bg-[#128C7E] text-white !border-none !bg-none shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300"
                >
                   <MessageCircle className="w-5 h-5 mr-2 fill-current" />
                   Pedir Amostra
                </Button>
              </div>
            </div>

            {/* Video Placeholder */}
            <div className="md:w-1/3">
               <div className="relative aspect-video bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group cursor-pointer">
                  <img src={selectedProfession.image} className="w-full h-full object-cover opacity-60 transition-opacity group-hover:opacity-40" alt="Video cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white text-white ml-1" />
                     </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                     <p className="text-sm font-bold text-white">Tour do App: {selectedProfession.name}</p>
                     <p className="text-xs text-slate-300">1 min 30s</p>
                  </div>
               </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             
             {/* Left Col: Fields Structure */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
             >
                <div className="flex items-center gap-2 mb-6 text-blue-400">
                   <Settings className="w-5 h-5" />
                   <h2 className="text-2xl font-bold text-white">Campos Personalizados</h2>
                </div>
                <p className="text-slate-400 mb-6">
                   Ao selecionar este modelo, seus agendamentos já virão com estes campos estruturados para organizar seu negócio:
                </p>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
                   <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between opacity-70">
                      <span className="text-slate-400">Nome do Cliente</span>
                      <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-500">Padrão</span>
                   </div>
                   <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between opacity-70">
                      <span className="text-slate-400">Data e Hora</span>
                      <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-500">Padrão</span>
                   </div>
                   
                   <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent my-2"></div>

                   {fields.map((field, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="p-4 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between group hover:border-blue-500/30 transition-colors"
                      >
                         <div className="flex items-center gap-3">
                            {field.icon && React.createElement(field.icon, { className: `w-5 h-5 ${field.color}` })}
                            <span className="font-semibold text-slate-200">{field.label}</span>
                         </div>
                         <span className="text-xs font-bold uppercase bg-slate-950 text-blue-400 px-2 py-1 rounded border border-slate-800">
                            {field.type}
                         </span>
                      </motion.div>
                   ))}
                </div>
             </motion.div>

             {/* Right Col: App Gallery */}
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3 }}
             >
                <div className="flex items-center gap-2 mb-6 text-purple-400">
                   <Smartphone className="w-5 h-5" />
                   <h2 className="text-2xl font-bold text-white">Visualização do App</h2>
                </div>
                <p className="text-slate-400 mb-6">
                   Veja como o aplicativo ficará para seus clientes e para sua gestão.
                </p>

                <div className="grid grid-cols-2 gap-4">
                   {selectedProfession.screenshots?.map((src, idx) => (
                      <div key={idx} className={`rounded-2xl overflow-hidden border border-slate-800 shadow-xl ${idx === 0 ? 'col-span-2 aspect-video' : 'aspect-[9/16]'}`}>
                         <img src={src} alt="App Screen" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                   )) || (
                     <div className="col-span-2 h-64 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
                        Sem preview disponível
                     </div>
                   )}
                </div>

                <div className="mt-8 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex gap-3">
                   <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                   <div>
                      <h4 className="font-bold text-white text-sm">Pronto para usar</h4>
                      <p className="text-slate-400 text-sm mt-1">Este template configura 95% do seu app. Você pode ajustar tudo depois.</p>
                   </div>
                </div>
             </motion.div>

          </div>
        </div>
      </div>
    );
  }

  // DEFAULT VIEW: Profession Grid
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-50">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-800 border border-slate-800 rounded-full transition-all backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Voltar ao Início</span>
        </button>
      </div>

      <div className="z-10 max-w-6xl w-full py-12">
        <motion.div 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
           <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
             Qual é o seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Negócio?</span>
           </h1>
           <p className="text-xl text-slate-400 max-w-2xl mx-auto">
             Selecione sua área para ver os detalhes da estrutura e demonstração.
           </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {activeProfessions.map((prof, index) => {
            const Icon = prof.icon;
            return (
              <motion.button
                key={prof.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProfession(prof)}
                className="group relative flex flex-col items-center p-6 bg-slate-900 border border-slate-800 rounded-3xl hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 transition-all text-left overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-slate-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className={`w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-700 group-hover:border-blue-500/30 ${prof.color.replace('text-', 'text-opacity-80 text-')}`}>
                  <Icon className={`w-8 h-8 ${prof.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 relative z-10">{prof.name}</h3>
                <p className="text-sm text-slate-500 text-center relative z-10 group-hover:text-slate-400 transition-colors">
                  {prof.description}
                </p>

                <div className="mt-6 flex items-center text-blue-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  Ver Detalhes <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
