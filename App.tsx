
import React, { useState } from 'react';
import { Hero } from './components/landing/Hero';
import { ProfessionShowcase } from './components/landing/ProfessionShowcase';
import { DemoSection } from './components/landing/DemoSection';
import { Footer } from './components/landing/Footer';
import { Onboarding } from './components/app/Onboarding';
import { Dashboard } from './components/app/Dashboard';
import { AdminPanel } from './components/admin/AdminPanel';
import { AppStep } from './types';
import { Button } from './components/ui/Button';
import { ConfigProvider } from './contexts/ConfigContext';
import { Settings } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  const [selectedProfession, setSelectedProfession] = useState<string>('barber');

  const startSignup = () => {
    setCurrentStep(AppStep.ONBOARDING);
  };

  const finishOnboarding = (professionId: string) => {
    setSelectedProfession(professionId);
    setCurrentStep(AppStep.DASHBOARD);
  };

  const openAdmin = () => {
    setCurrentStep(AppStep.ADMIN);
  };

  const closeAdmin = () => {
    setCurrentStep(AppStep.LANDING);
  };

  const exitDashboard = () => {
    setCurrentStep(AppStep.LANDING);
  };

  if (currentStep === AppStep.ADMIN) {
    return <AdminPanel onExit={closeAdmin} />;
  }

  if (currentStep === AppStep.ONBOARDING) {
    return <Onboarding onComplete={finishOnboarding} onBack={() => setCurrentStep(AppStep.LANDING)} />;
  }

  if (currentStep === AppStep.DASHBOARD) {
    return <Dashboard initialProfession={selectedProfession} onExit={exitDashboard} />;
  }

  // Landing Page Structure
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white selection:bg-blue-500 selection:text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center font-bold text-white">
              A
            </div>
            <span className="text-xl font-bold tracking-tight">Agendapro</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Recursos</a>
            <a href="#professions" className="hover:text-white transition-colors">Profissões</a>
            <a href="#pricing" className="hover:text-white transition-colors">Preços</a>
          </div>

          <div className="flex items-center space-x-4">
             <button 
               onClick={openAdmin}
               className="flex items-center gap-2 text-slate-300 hover:text-blue-400 font-medium text-sm bg-slate-800/50 hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-all"
             >
               <Settings className="w-4 h-4" />
               <span className="hidden sm:inline">Admin</span>
             </button>
             
             <div className="w-px h-4 bg-slate-700 hidden sm:block"></div>

             <button className="hidden sm:block text-slate-300 hover:text-white font-medium text-sm">Entrar</button>
             <Button size="sm" onClick={startSignup}>Criar Conta</Button>
          </div>
        </div>
      </nav>

      <main>
        <Hero onStart={startSignup} />
        <div id="professions">
          <ProfessionShowcase />
        </div>
        <div id="features">
          <DemoSection />
        </div>
        
        {/* Simple CTA Section before Footer */}
        <section className="py-24 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
             <h2 className="text-4xl font-bold text-white mb-6">Pronto para revolucionar sua agenda?</h2>
             <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
               Junte-se a mais de 1.000 profissionais que já automatizaram seus negócios.
             </p>
             <Button 
               size="lg" 
               className="bg-white text-blue-600 hover:bg-slate-100 hover:shadow-xl border-none"
               onClick={startSignup}
             >
               Criar Minha Agenda Grátis
             </Button>
             <p className="mt-4 text-blue-200 text-sm">Teste grátis por 7 dias. Sem cartão de crédito.</p>
          </div>
        </section>
      </main>

      <Footer onAdminClick={openAdmin} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
};

export default App;
