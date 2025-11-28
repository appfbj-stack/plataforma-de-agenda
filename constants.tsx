import { 
  Scissors, Wrench, Camera, Sparkles, HardHat, Heart, 
  Stethoscope, Dumbbell, Scale, Brain, Dog, Monitor, 
  Utensils, Palette, Coffee, GraduationCap,
  Users, ShoppingBag, Car, Hash, MapPin, Activity,
  StickyNote, FileText, Target, FileBadge, CheckCircle2
} from 'lucide-react';
import { Profession, Plan, Testimonial, FieldConfig } from './types';

export const PROFESSIONS: Profession[] = [
  {
    id: 'barber',
    name: 'Barbearia',
    icon: Scissors,
    emoji: '💈',
    description: 'Gestão completa para cortes e barba.',
    color: 'text-amber-400',
    image: 'https://picsum.photos/seed/barber/600/400',
    tags: ['Cortes', 'Barba', 'Produtos'],
    screenshots: [
      'https://picsum.photos/seed/barber_app1/300/600',
      'https://picsum.photos/seed/barber_app2/300/600',
      'https://picsum.photos/seed/barber_app3/300/600'
    ],
    active: true
  },
  {
    id: 'mechanic',
    name: 'Oficina',
    icon: Wrench,
    emoji: '🔧',
    description: 'Agende revisões e manutenções.',
    color: 'text-slate-400',
    image: 'https://picsum.photos/seed/mechanic/600/400',
    tags: ['Revisão', 'Troca de Óleo'],
    screenshots: [
      'https://picsum.photos/seed/mech_app1/300/600',
      'https://picsum.photos/seed/mech_app2/300/600',
      'https://picsum.photos/seed/mech_app3/300/600'
    ],
    active: true
  },
  {
    id: 'photo',
    name: 'Fotografia',
    icon: Camera,
    emoji: '📸',
    description: 'Ensaios, eventos e bookings.',
    color: 'text-purple-400',
    image: 'https://picsum.photos/seed/photo/600/400',
    tags: ['Casamento', 'Estúdio'],
    screenshots: [
      'https://picsum.photos/seed/photo_app1/300/600',
      'https://picsum.photos/seed/photo_app2/300/600',
      'https://picsum.photos/seed/photo_app3/300/600'
    ],
    active: true
  },
  {
    id: 'beauty',
    name: 'Estética',
    icon: Sparkles,
    emoji: '✨',
    description: 'Clínicas e procedimentos.',
    color: 'text-pink-400',
    image: 'https://picsum.photos/seed/makeup/600/400',
    tags: ['Facial', 'Corporal'],
    screenshots: [
      'https://picsum.photos/seed/beauty_app1/300/600',
      'https://picsum.photos/seed/beauty_app2/300/600'
    ],
    active: true
  },
  {
    id: 'health',
    name: 'Saúde',
    icon: Stethoscope,
    emoji: '⚕️',
    description: 'Consultórios médicos e dentistas.',
    color: 'text-emerald-400',
    image: 'https://picsum.photos/seed/doctor/600/400',
    tags: ['Consultas', 'Exames'],
    screenshots: [
      'https://picsum.photos/seed/health_app1/300/600',
      'https://picsum.photos/seed/health_app2/300/600'
    ],
    active: true
  },
  {
    id: 'gym',
    name: 'Personal',
    icon: Dumbbell,
    emoji: '💪',
    description: 'Treinos e avaliações físicas.',
    color: 'text-red-500',
    image: 'https://picsum.photos/seed/gym/600/400',
    tags: ['Musculação', 'Crossfit'],
    screenshots: [
      'https://picsum.photos/seed/gym_app1/300/600',
      'https://picsum.photos/seed/gym_app2/300/600'
    ],
    active: true
  },
  {
    id: 'legal',
    name: 'Advocacia',
    icon: Scale,
    emoji: '⚖️',
    description: 'Reuniões e consultorias jurídicas.',
    color: 'text-blue-300',
    image: 'https://picsum.photos/seed/lawyer/600/400',
    tags: ['Civil', 'Trabalhista'],
    screenshots: [
      'https://picsum.photos/seed/legal_app1/300/600'
    ],
    active: true
  },
  {
    id: 'pet',
    name: 'Pet Shop',
    icon: Dog,
    emoji: '🐕',
    description: 'Banho, tosa e veterinário.',
    color: 'text-orange-400',
    image: 'https://picsum.photos/seed/dog/600/400',
    tags: ['Banho', 'Tosa'],
    screenshots: [
      'https://picsum.photos/seed/pet_app1/300/600'
    ],
    active: true
  }
];

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: '79',
    period: '/mês',
    features: ['1 Profissional', '100 Agendamentos/mês', 'Agenda Online', 'Lembretes por Email'],
    recommended: false
  },
  {
    id: 'pro',
    name: 'Profissional',
    price: '149',
    period: '/mês',
    features: ['3 Profissionais', 'Agendamentos Ilimitados', 'Lembretes WhatsApp', 'Gestão Financeira'],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Enterprise',
    price: '249',
    period: '/mês',
    features: ['Ilimitado', 'API de Integração', 'App Personalizado', 'Suporte VIP 24/7'],
    recommended: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Carlos Silva',
    role: 'Barbeiro',
    business: 'Barbearia Silva',
    content: 'Aumentei meus agendamentos em 200% no primeiro mês. A interface é incrível e meus clientes adoram.',
    avatar: 'https://picsum.photos/seed/u1/100/100',
    rating: 5
  },
  {
    id: 2,
    name: 'Ana Julia',
    role: 'Dentista',
    business: 'OdontoCare',
    content: 'A organização da minha clínica mudou da água para o vinho. O sistema de lembretes reduziu as faltas a zero.',
    avatar: 'https://picsum.photos/seed/u2/100/100',
    rating: 5
  },
  {
    id: 3,
    name: 'Roberto Mendes',
    role: 'Mecânico',
    business: 'AutoFix',
    content: 'Simples, direto e funcional. Consigo gerenciar o pátio e os horários pelo celular.',
    avatar: 'https://picsum.photos/seed/u3/100/100',
    rating: 5
  }
];

// Configuration of fields shown for each profession
export const PROFESSION_FIELDS_CONFIG: Record<string, FieldConfig[]> = {
  barber: [
    { label: 'Profissional', type: 'Seleção', icon: Users, color: 'text-blue-400' },
    { label: 'Serviço', type: 'Catálogo', icon: Scissors, color: 'text-amber-400' },
    { label: 'Produtos Usados', type: 'Multi-select', icon: ShoppingBag, color: 'text-emerald-400' },
    { label: 'Bebida/Cortesia', type: 'Opção', icon: Coffee, color: 'text-slate-400' },
  ],
  mechanic: [
    { label: 'Modelo do Veículo', type: 'Texto', icon: Car, color: 'text-blue-400' },
    { label: 'Placa', type: 'Máscara', icon: Hash, color: 'text-slate-400' },
    { label: 'Box de Serviço', type: 'Número', icon: MapPin, color: 'text-red-400' },
    { label: 'Quilometragem', type: 'Número', icon: Activity, color: 'text-emerald-400' },
  ],
  health: [
    { label: 'Convênio', type: 'Seleção', icon: FileBadge, color: 'text-blue-400' },
    { label: 'Tipo de Consulta', type: 'Seleção', icon: Activity, color: 'text-emerald-400' },
    { label: 'Sintomas', type: 'Texto Longo', icon: StickyNote, color: 'text-amber-400' },
    { label: 'Anexos/Exames', type: 'Arquivo', icon: FileText, color: 'text-slate-400' },
  ],
  gym: [
    { label: 'Objetivo', type: 'Seleção', icon: Target, color: 'text-red-500' },
    { label: 'Grupo Muscular', type: 'Seleção', icon: Dumbbell, color: 'text-blue-400' },
    { label: 'Peso Atual', type: 'Medida', icon: Activity, color: 'text-emerald-400' },
  ],
  photo: [
    { label: 'Locação', type: 'Texto', icon: MapPin, color: 'text-purple-400' },
    { label: 'Equipamento', type: 'Lista', icon: Camera, color: 'text-slate-400' },
    { label: 'Qtd. Fotos', type: 'Número', icon: Hash, color: 'text-blue-400' },
  ],
  beauty: [
    { label: 'Tipo de Pele', type: 'Seleção', icon: Sparkles, color: 'text-pink-400' },
    { label: 'Alergias', type: 'Texto', icon: Activity, color: 'text-red-400' },
    { label: 'Área do Corpo', type: 'Seleção', icon: Users, color: 'text-slate-400' },
  ],
  legal: [
    { label: 'Número do Processo', type: 'Máscara', icon: Hash, color: 'text-slate-400' },
    { label: 'Área Jurídica', type: 'Seleção', icon: Scale, color: 'text-blue-300' },
    { label: 'Tribunal', type: 'Texto', icon: MapPin, color: 'text-amber-400' },
  ],
  pet: [
    { label: 'Nome do Pet', type: 'Texto', icon: Dog, color: 'text-orange-400' },
    { label: 'Raça', type: 'Seleção', icon: Activity, color: 'text-slate-400' },
    { label: 'Porte', type: 'Seleção', icon: Scale, color: 'text-blue-400' },
    { label: 'Vacinação em Dia?', type: 'Boolean', icon: CheckCircle2, color: 'text-emerald-400' },
  ]
};
