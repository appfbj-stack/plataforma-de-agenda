import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Bell, Settings, Home } from 'lucide-react';

export const DemoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'client' | 'pro'>('client');

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Text Side */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              A experiência do App,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Sem instalar nada.
              </span>
            </h2>
            <p className="text-slate-300 text-xl mb-8 leading-relaxed">
              Seus clientes não precisam baixar aplicativos. Eles acessam, escolhem o horário e agendam em segundos.
            </p>

            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => setActiveTab('client')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'client' 
                    ? 'bg-white text-slate-900 shadow-lg' 
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Visão do Cliente
              </button>
              <button
                onClick={() => setActiveTab('pro')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 'pro' 
                    ? 'bg-white text-slate-900 shadow-lg' 
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Visão do Profissional
              </button>
            </div>

            <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-lg">
                  <Bell className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Notificações Automáticas</h4>
                  <p className="text-slate-400 text-sm mt-1">
                    Lembretes via WhatsApp reduzem o "no-show" em até 85%.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Phone Mockup Side */}
        <div className="lg:w-1/2 flex justify-center perspective-1000">
          <motion.div
            initial={{ rotateY: 15, rotateX: 5 }}
            whileInView={{ rotateY: 0, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="relative w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10"
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>

            {/* Screen Content */}
            <div className="w-full h-full bg-slate-50 overflow-y-auto hide-scrollbar text-slate-900 relative">
              {activeTab === 'client' ? <ClientView /> : <ProView />}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-900/20 rounded-full z-20"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ClientView = () => (
  <div className="flex flex-col h-full bg-slate-50">
    {/* Header with Cover */}
    <div className="h-40 bg-[url('https://picsum.photos/seed/barber/500/300')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-bold text-xl">Barbearia Vintage</h3>
        <p className="text-xs opacity-90">⭐⭐⭐⭐⭐ (124 avaliações)</p>
      </div>
    </div>
    
    {/* Services List */}
    <div className="flex-1 p-4 space-y-3">
      <h4 className="font-bold text-slate-800 mb-2">Serviços Populares</h4>
      
      {[
        { name: 'Corte Degradê', price: 'R$ 45', time: '40min' },
        { name: 'Barba Terapia', price: 'R$ 35', time: '30min' },
        { name: 'Combo Completo', price: 'R$ 70', time: '1h 10min' },
      ].map((service, i) => (
        <div key={i} className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-slate-100">
          <div>
            <p className="font-semibold text-slate-800">{service.name}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {service.time}
            </p>
          </div>
          <button className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
            Agendar {service.price}
          </button>
        </div>
      ))}

      <h4 className="font-bold text-slate-800 mt-6 mb-2">Profissionais</h4>
      <div className="flex gap-3 overflow-x-auto pb-2">
         {[1,2,3].map(i => (
            <div key={i} className="flex-shrink-0 text-center">
               <div className="w-14 h-14 rounded-full bg-slate-200 mb-1 overflow-hidden">
                 <img src={`https://picsum.photos/seed/${i}/100/100`} alt="" />
               </div>
               <span className="text-xs font-medium">Pro {i}</span>
            </div>
         ))}
      </div>
    </div>

    {/* Sticky Bottom Button */}
    <div className="p-4 bg-white border-t border-slate-100">
      <div className="w-full bg-slate-900 text-white py-3 rounded-xl text-center font-bold">
        Ver Horários Disponíveis
      </div>
    </div>
  </div>
);

const ProView = () => (
  <div className="flex flex-col h-full bg-slate-50">
    <div className="bg-slate-900 text-white p-6 pt-12 rounded-b-3xl shadow-lg z-10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider">Terça, 24 Out</p>
          <h3 className="text-2xl font-bold">Olá, João</h3>
        </div>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md">
          <p className="text-2xl font-bold">8</p>
          <p className="text-xs text-slate-300">Hoje</p>
        </div>
        <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md">
          <p className="text-2xl font-bold text-emerald-400">R$ 450</p>
          <p className="text-xs text-slate-300">Faturamento</p>
        </div>
      </div>
    </div>

    <div className="flex-1 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
         <h4 className="font-bold text-slate-900">Próximos</h4>
         <span className="text-xs text-blue-600 font-medium">Ver agenda</span>
      </div>

      <div className="space-y-3 relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>

        {[
          { time: '09:00', client: 'Pedro Santos', service: 'Corte + Barba', status: 'confirmed' },
          { time: '10:00', client: 'Marcos Oliveira', service: 'Corte', status: 'pending' },
          { time: '11:30', client: 'Lucas Silva', service: 'Barba', status: 'confirmed' },
          { time: '14:00', client: 'Almoço', service: '', status: 'break' },
        ].map((item, i) => (
          <div key={i} className="relative pl-10">
            <div className="absolute left-[11px] top-4 w-3 h-3 rounded-full bg-white border-2 border-blue-500 z-10"></div>
            <div className={`p-4 rounded-xl border-l-4 shadow-sm ${
                item.status === 'break' ? 'bg-slate-100 border-slate-300 opacity-70' : 'bg-white border-blue-500'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                   <p className="font-bold text-slate-800 text-sm">{item.time}</p>
                   <p className="font-medium text-slate-900">{item.client}</p>
                   {item.service && <p className="text-xs text-slate-500">{item.service}</p>}
                </div>
                {item.status !== 'break' && (
                  <span className={`px-2 py-0.5 text-[10px] rounded-full uppercase font-bold ${
                    item.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Bottom Nav */}
    <div className="bg-white border-t border-slate-200 p-3 flex justify-around text-slate-400">
       <Home className="w-6 h-6 text-slate-900" />
       <Calendar className="w-6 h-6" />
       <Settings className="w-6 h-6" />
    </div>
  </div>
);