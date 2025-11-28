
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { useConfig } from '../../contexts/ConfigContext';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const { config } = useConfig();
  
  // Parse title to handle potential HTML line breaks if we wanted, 
  // but for now keeping simple text replacement
  const titleParts = config.landing.heroTitle.split('Premium');

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
         <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            className="w-full h-full bg-[url('https://images.unsplash.com/photo-1600609842388-4394627ed319?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
         />
         <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
         
         <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-blob"></div>
         <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 flex justify-center">
            <span className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium tracking-wide backdrop-blur-md">
              ✨ A Plataforma #1 de Agendamento
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            {titleParts[0]}
            {titleParts.length > 1 ? (
              <>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                  Premium
               </span>
               {titleParts[1]}
              </>
            ) : config.landing.heroTitle}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {config.landing.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={onStart} className="w-full sm:w-auto shadow-blue-500/25">
              {config.landing.heroButtonText}
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto group">
              <Play className="w-4 h-4 mr-2 fill-white group-hover:scale-110 transition-transform" />
              Ver Vídeo Demo
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-slate-400 text-sm">
          <span>Descubra</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
};
