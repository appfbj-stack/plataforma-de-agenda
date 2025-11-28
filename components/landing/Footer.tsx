
import React from 'react';
import { Twitter, Instagram, Linkedin, Facebook, Settings } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-white mb-4">Agendapro</div>
            <p className="text-sm leading-relaxed">
              A plataforma definitiva para profissionais que buscam excelência no atendimento e gestão.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">Recursos</a></li>
              <li><a href="#" className="hover:text-blue-400">Preços</a></li>
              <li><a href="#" className="hover:text-blue-400">Integrações</a></li>
              <li><a href="#" className="hover:text-blue-400">Atualizações</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-blue-400">Comunidade</a></li>
              <li><a href="#" className="hover:text-blue-400">Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Social</h4>
            <div className="flex space-x-4">
               <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5"/></a>
               <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5"/></a>
               <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5"/></a>
               <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5"/></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; 2025 Agendapro Inc. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white">Privacidade</a>
             <a href="#" className="hover:text-white">Termos</a>
             {onAdminClick && (
               <button onClick={onAdminClick} className="flex items-center text-slate-500 hover:text-blue-500 transition-colors">
                  <Settings className="w-3 h-3 mr-1" /> Admin
               </button>
             )}
          </div>
        </div>
      </div>
    </footer>
  );
};
