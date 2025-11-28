
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { Profession } from '../../types';
import { useConfig } from '../../contexts/ConfigContext';

export const ProfessionShowcase: React.FC = () => {
  const { config } = useConfig();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Use only active professions
  const activeProfessions = config.professions.filter(p => p.active);

  return (
    <section className="py-24 bg-slate-900 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Qual é a sua área de atuação?
          </h2>
          <p className="text-slate-400 text-lg">
            Uma plataforma adaptável para mais de 20+ segmentos profissionais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeProfessions.map((prof, index) => (
            <ProfessionCard 
              key={prof.id} 
              profession={prof} 
              index={index}
              onPlay={() => setActiveVideo(prof.id)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
           <button className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
              + Ver todas as 20+ profissões
           </button>
        </div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-700 aspect-video relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fake Video Player Interface */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                <img 
                   src={config.professions.find(p => p.id === activeVideo)?.image} 
                   className="w-full h-full object-cover opacity-50"
                   alt="Video thumbnail"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                       <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 mx-auto animate-pulse">
                          <Play className="w-8 h-8 text-white fill-white" />
                       </div>
                       <h3 className="text-2xl font-bold text-white">Demonstração {config.professions.find(p => p.id === activeVideo)?.name}</h3>
                       <p className="text-slate-400">Simulando vídeo de 15 segundos...</p>
                    </div>
                </div>
                {/* Close button */}
                <button 
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ProfessionCard: React.FC<{ profession: Profession; index: number; onPlay: () => void }> = ({ profession, index, onPlay }) => {
  const Icon = profession.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative h-[320px] rounded-3xl overflow-hidden cursor-pointer"
      onClick={onPlay}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={profession.image} 
          alt={profession.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-70" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end items-start z-10">
        <div className={`p-3 rounded-2xl bg-white/10 backdrop-blur-md mb-4 group-hover:-translate-y-2 transition-transform duration-300 border border-white/5`}>
          <Icon className={`w-8 h-8 ${profession.color}`} />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:-translate-y-2 transition-transform duration-300">
          {profession.name}
        </h3>
        
        <p className="text-slate-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {profession.description}
        </p>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <div className="flex items-center text-xs font-bold text-white bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <Play className="w-3 h-3 mr-1 fill-white" /> 15s Demo
          </div>
        </div>
      </div>
    </motion.div>
  );
};
