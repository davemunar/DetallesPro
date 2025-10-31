import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProductCard from './components/common/ProductCard';
import QuoteModal from './components/common/QuoteModal';
import { useQuote } from './hooks/useQuote';
import { Product, PriceCategory, KitType, Experience } from './types';

const allProducts: Product[] = [
  // Esencial (hasta $50k) - This category is empty based on the new ranges.
  
  // Premium ($50k - $100k)
  { id: '1', name: 'Kit Café Navideño', description: 'Empieza el día con energía. Incluye café de origen, taza y galletas artesanales.', price: 85000, imageUrl: 'https://source.unsplash.com/600x400/?coffee,christmas,gift', category: 'Bebidas', priceCategory: 'Premium', kitType: 'Kits Empresariales', experience: 'Navidad y fin de año' },
  { id: '2', name: 'Set de Notas de Agradecimiento', description: 'Libreta, bolígrafos de colores y stickers para desatar la inspiración.', price: 90000, imageUrl: 'https://source.unsplash.com/600x400/?notebook,pen,stationery', category: 'Oficina', priceCategory: 'Premium', kitType: 'Kits Empresariales', experience: 'Agradecimiento y Lealtad' },
  { id: '3', name: 'Kit de Escritorio con Logo', description: 'Organizador de escritorio, temporizador pomodoro y un snack saludable con tu marca.', price: 95000, imageUrl: 'https://source.unsplash.com/600x400/?desk,organizer,office', category: 'Oficina', priceCategory: 'Premium', kitType: 'Kits Empresariales', experience: 'Promoción de Tú Logo / Marca' },
  { id: '28', name: 'Kit de Bienvenida Esencial', description: 'Taza corporativa, libreta y bolígrafo para un gran comienzo.', price: 89000, imageUrl: 'https://source.unsplash.com/600x400/?welcome,kit,corporate', category: 'Oficina', priceCategory: 'Premium', kitType: 'Kits Empresariales', experience: 'Bienvenida / Onboarding' },
  { id: '4', name: 'Ancheta Dulce Navidad', description: 'Té herbal, vela aromática y una selección de dulces navideños.', price: 80000, imageUrl: 'https://source.unsplash.com/600x400/?christmas,hamper,sweets', category: 'Snacks', priceCategory: 'Premium', kitType: 'Anchetas', experience: 'Navidad y fin de año' },
  { id: '5', name: 'Ancheta Gracias por tu Esfuerzo', description: 'Chocolates gourmet, caramelos y una tarjeta de agradecimiento.', price: 88000, imageUrl: 'https://source.unsplash.com/600x400/?chocolate,gift,box', category: 'Snacks', priceCategory: 'Premium', kitType: 'Anchetas', experience: 'Agradecimiento y Lealtad' },
  { id: '6', name: 'Ancheta Snack Corporativo', description: 'Barras de cereal, fruta deshidratada y bebida, todo con empaque de tu marca.', price: 92000, imageUrl: 'https://source.unsplash.com/600x400/?snack,box,healthy', category: 'Snacks', priceCategory: 'Premium', kitType: 'Anchetas', experience: 'Promoción de Tú Logo / Marca' },
  { id: '29', name: 'Ancheta de Onboarding', description: 'Snacks energéticos, bebida y una nota de bienvenida personalizada.', price: 84000, imageUrl: 'https://source.unsplash.com/600x400/?welcome,snacks,hamper', category: 'Snacks', priceCategory: 'Premium', kitType: 'Anchetas', experience: 'Bienvenida / Onboarding' },
  { id: '7', name: 'Botella de Agua Navideña', description: 'Botella térmica con logo y motivos de fin de año.', price: 75000, imageUrl: 'https://source.unsplash.com/600x400/?water,bottle,christmas', category: 'Promocional', priceCategory: 'Premium', kitType: 'Promocionales', experience: 'Navidad y fin de año' },
  { id: '8', name: 'Mug de Agradecimiento Especial', description: 'Mug de alta calidad con un diseño de gratitud y caja de dulces.', price: 82000, imageUrl: 'https://source.unsplash.com/600x400/?mug,gift,corporate', category: 'Promocional', priceCategory: 'Premium', kitType: 'Promocionales', experience: 'Agradecimiento y Lealtad' },
  { id: '9', name: 'Agenda Corporativa 2025', description: 'Agenda premium con tu logo en relieve y planificador de metas.', price: 98000, imageUrl: 'https://source.unsplash.com/600x400/?planner,diary,2025', category: 'Promocional', priceCategory: 'Premium', kitType: 'Promocionales', experience: 'Promoción de Tú Logo / Marca' },
  { id: '30', name: 'Gorra y Lanyard Corporativo', description: 'Identificación y estilo desde el primer día para el nuevo talento.', price: 79000, imageUrl: 'https://source.unsplash.com/600x400/?cap,lanyard,corporate', category: 'Promocional', priceCategory: 'Premium', kitType: 'Promocionales', experience: 'Bienvenida / Onboarding' },
  
  // VIP Pro (más de $100k)
  { id: '10', name: 'Kit Spa Fin de Año', description: 'Aceites esenciales, difusor, antifaz de gel y una suave toalla para relajarse.', price: 150000, imageUrl: 'https://source.unsplash.com/600x400/?spa,kit,relax', category: 'Cuidado Personal', priceCategory: 'VIP Pro', kitType: 'Kits Empresariales', experience: 'Navidad y fin de año' },
  { id: '11', name: 'Set de Arte Premium de Gratitud', description: 'Acuarelas profesionales, pinceles de calidad y papel especializado.', price: 180000, imageUrl: 'https://source.unsplash.com/600x400/?art,supplies,paint', category: 'Hobbies', priceCategory: 'VIP Pro', kitType: 'Kits Empresariales', experience: 'Agradecimiento y Lealtad' },
  { id: '12', name: 'Kit Tech con Tu Marca', description: 'Cargador inalámbrico, organizador de cables y soporte para laptop, todo con tu logo.', price: 220000, imageUrl: 'https://source.unsplash.com/600x400/?tech,gadgets,corporate', category: 'Tecnología', priceCategory: 'VIP Pro', kitType: 'Kits Empresariales', experience: 'Promoción de Tú Logo / Marca' },
  { id: '31', name: 'Kit Onboarding Plus', description: 'Termo, agenda de cuero y un power bank con logo para el nuevo miembro.', price: 175000, imageUrl: 'https://source.unsplash.com/600x400/?corporate,gift,tech', category: 'Tecnología', priceCategory: 'VIP Pro', kitType: 'Kits Empresariales', experience: 'Bienvenida / Onboarding' },
  { id: '13', name: 'Ancheta Gourmet Navideña', description: 'Vino, quesos maduros, jamón serrano y mermeladas para celebrar.', price: 240000, imageUrl: 'https://source.unsplash.com/600x400/?gourmet,hamper,christmas', category: 'Gourmet', priceCategory: 'VIP Pro', kitType: 'Anchetas', experience: 'Navidad y fin de año' },
  { id: '14', name: 'Ancheta de Mixología "Gracias"', description: 'Kit para preparar cócteles como agradecimiento por un gran año.', price: 190000, imageUrl: 'https://source.unsplash.com/600x400/?cocktail,kit,mixology', category: 'Gourmet', priceCategory: 'VIP Pro', kitType: 'Anchetas', experience: 'Agradecimiento y Lealtad' },
  { id: '15', name: 'Ancheta Café del Mundo Brandeada', description: 'Selección de cafés y prensa francesa en una caja con tu marca.', price: 210000, imageUrl: 'https://source.unsplash.com/600x400/?coffee,hamper,world', category: 'Gourmet', priceCategory: 'VIP Pro', kitType: 'Anchetas', experience: 'Promoción de Tú Logo / Marca' },
  { id: '32', name: 'Caja de Bienvenida Gourmet', description: 'Café premium, chocolates y galletas finas para recibir al nuevo talento.', price: 195000, imageUrl: 'https://source.unsplash.com/600x400/?gourmet,welcome,box', category: 'Gourmet', priceCategory: 'VIP Pro', kitType: 'Anchetas', experience: 'Bienvenida / Onboarding' },
  { id: '16', name: 'Manta Personalizada y Kit de Cine', description: 'Manta tejida con logo y snacks para una tarde de películas en fin de año.', price: 160000, imageUrl: 'https://source.unsplash.com/600x400/?blanket,movie,cozy', category: 'Promocional', priceCategory: 'VIP Pro', kitType: 'Promocionales', experience: 'Navidad y fin de año' },
  { id: '17', name: 'Kit de Escritura de Lujo "Lealtad"', description: 'Pluma fuente grabada y cuaderno de cuero como símbolo de aprecio.', price: 200000, imageUrl: 'https://source.unsplash.com/600x400/?fountain,pen,leather', category: 'Promocional', priceCategory: 'VIP Pro', kitType: 'Promocionales', experience: 'Agradecimiento y Lealtad' },
  { id: '18', name: 'Mochila Antirrobo Corporativa', description: 'Mochila para laptop con tu logo, power bank y organizador interno.', price: 250000, imageUrl: 'https://source.unsplash.com/600x400/?backpack,tech,corporate', category: 'Promocional', priceCategory: 'VIP Pro', kitType: 'Promocionales', experience: 'Promoción de Tú Logo / Marca' },
  { id: '33', name: 'Sudadera con Capucha Brandeada', description: 'Comodidad y sentido de pertenencia para el nuevo integrante del equipo.', price: 230000, imageUrl: 'https://source.unsplash.com/600x400/?hoodie,branded,apparel', category: 'Promocional', priceCategory: 'VIP Pro', kitType: 'Promocionales', experience: 'Bienvenida / Onboarding' },
  { id: '19', name: 'Kit de Relajación Superior Navideño', description: 'Masajeador, audífonos con cancelación de ruido y suscripción a app de meditación.', price: 350000, imageUrl: 'https://source.unsplash.com/600x400/?relax,tech,headphones', category: 'Tecnología', priceCategory: 'VIP Pro', kitType: 'Kits Empresariales', experience: 'Navidad y fin de año' },
  { id: '20', name: 'Kit Creativo de Lujo', description: 'Tableta gráfica y suscripción a software de diseño como agradecimiento.', price: 480000, imageUrl: 'https://source.unsplash.com/600x400/?graphic,tablet,design', category: 'Tecnología', priceCategory: 'VIP Pro', kitType: 'Kits Empresariales', experience: 'Agradecimiento y Lealtad' },
  { id: '21', name: 'Estación de Trabajo Portátil con Logo', description: 'Teclado y mouse ergonómicos, y soporte de laptop premium brandeado.', price: 450000, imageUrl: 'https://source.unsplash.com/600x400/?workstation,keyboard,mouse', category: 'Tecnología', priceCategory: 'VIP Pro', kitType: 'Kits Empresariales', experience: 'Promoción de Tú Logo / Marca' },
  { id: '34', name: 'Kit de Bienvenida Premium Tech', description: 'Audífonos inalámbricos, mouse ergonómico y libreta inteligente.', price: 400000, imageUrl: 'https://source.unsplash.com/600x400/?tech,onboarding,headphones', category: 'Tecnología', priceCategory: 'VIP Pro', kitType: 'Kits Empresariales', experience: 'Bienvenida / Onboarding' },
  { id: '22', name: 'Ancheta Cata de Whisky Navideña', description: 'Selección de whiskies single malt para una celebración de fin de año.', price: 500000, imageUrl: 'https://source.unsplash.com/600x400/?whisky,tasting,luxury', category: 'Licores', priceCategory: 'VIP Pro', kitType: 'Anchetas', experience: 'Navidad y fin de año' },
  { id: '23', name: 'Ancheta de Arte y Vino "Gracias"', description: 'Botella de vino reserva, set de óleos y lienzo como gesto de gratitud.', price: 420000, imageUrl: 'https://source.unsplash.com/600x400/?wine,art,gift', category: 'Gourmet', priceCategory: 'VIP Pro', kitType: 'Anchetas', experience: 'Agradecimiento y Lealtad' },
  { id: '24', name: 'Ancheta Ejecutiva con Logo', description: 'Productos gourmet importados y agenda de cuero en caja con tu marca.', price: 550000, imageUrl: 'https://source.unsplash.com/600x400/?executive,gourmet,hamper', category: 'Gourmet', priceCategory: 'VIP Pro', kitType: 'Anchetas', experience: 'Promoción de Tú Logo / Marca' },
  { id: '35', name: 'Ancheta de Celebración Onboarding', description: 'Vino espumoso, copa grabada y una selección de delicatessen.', price: 460000, imageUrl: 'https://source.unsplash.com/600x400/?celebration,champagne,gourmet', category: 'Gourmet', priceCategory: 'VIP Pro', kitType: 'Anchetas', experience: 'Bienvenida / Onboarding' },
  { id: '25', name: 'Audífonos Inalámbricos para Fin de Año', description: 'Audífonos de alta fidelidad con estuche de carga brandeado.', price: 300000, imageUrl: 'https://source.unsplash.com/600x400/?wireless,headphones,case', category: 'Promocional', priceCategory: 'VIP Pro', kitType: 'Promocionales', experience: 'Navidad y fin de año' },
  { id: '26', name: 'Reloj Inteligente de Agradecimiento', description: 'Smartwatch como reconocimiento a la lealtad y el esfuerzo.', price: 580000, imageUrl: 'https://source.unsplash.com/600x400/?smartwatch,tech,gift', category: 'Promocional', priceCategory: 'VIP Pro', kitType: 'Promocionales', experience: 'Agradecimiento y Lealtad' },
  { id: '27', name: 'Silla Ergonómica Corporativa', description: 'Silla de alta gama con tu logo bordado para máxima presencia de marca.', price: 600000, imageUrl: 'https://source.unsplash.com/600x400/?ergonomic,chair,office', category: 'Promocional', priceCategory: 'VIP Pro', kitType: 'Promocionales', experience: 'Promoción de Tú Logo / Marca' },
  { id: '36', name: 'Maletín Ejecutivo para Laptop', description: 'Maletín de alta calidad con logo para el equipo de trabajo del nuevo integrante.', price: 520000, imageUrl: 'https://source.unsplash.com/600x400/?briefcase,leather,laptop', category: 'Promocional', priceCategory: 'VIP Pro', kitType: 'Promocionales', experience: 'Bienvenida / Onboarding' },
];


const priceFilters: { label: string; category: PriceCategory }[] = [
  { label: 'Esencial (hasta $50k)', category: 'Esencial' },
  { label: 'Premium ($50k - $100k)', category: 'Premium' },
  { label: 'VIP Pro (más de $100k)', category: 'VIP Pro' },
];

const kitTypeFilters: KitType[] = ['Kits Empresariales', 'Anchetas', 'Promocionales'];
const experienceFilters: Experience[] = ['Navidad y fin de año', 'Agradecimiento y Lealtad', 'Promoción de Tú Logo / Marca', 'Bienvenida / Onboarding'];

const iconMap: { [key: string]: React.ReactNode } = {
    'Navidad y fin de año': (
      <div className="flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a1 1 0 00-1 1v1.586l-2.293-2.293a1 1 0 10-1.414 1.414L7.586 6H6a1 1 0 00-1 1v1.586l-2.293-2.293a1 1 0 10-1.414 1.414L3.586 8H2a1 1 0 00-1 1v2a1 1 0 001 1h1.586l-2.293 2.293a1 1 0 101.414 1.414L6 12.414V14a1 1 0 001 1h1.586l-2.293 2.293a1 1 0 101.414 1.414L8 16.414V18a1 1 0 002 0v-1.586l2.293 2.293a1 1 0 101.414-1.414L12.414 16H14a1 1 0 001-1v-1.586l2.293 2.293a1 1 0 101.414-1.414L16.414 12H18a1 1 0 001-1V9a1 1 0 00-1-1h-1.586l2.293-2.293a1 1 0 10-1.414-1.414L14 7.586V6a1 1 0 00-1-1h-1.586l2.293-2.293a1 1 0 00-1.414-1.414L12 3.586V3a1 1 0 00-1-1h-1z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1.2a3 3 0 01-1.37.456c-.534.13-1.04.38-1.5.728a1.5 1.5 0 00-.93.638_5.501 5.501 0 00-2.614 4.312 1.5 1.5 0 00.165 1.155.6.6 0 01.086.326v.288a.6.6 0 01-.086.326 1.5 1.5 0 00-.165 1.155_5.502 5.502 0 002.614 4.312 1.5 1.5 0 00.93.638c.46.348.966.598 1.5.728A3 3 0 018 14.8V16a2 2 0 104 0v-1.2a3 3 0 011.37-.456c.534-.13 1.04-.38 1.5-.728a1.5 1.5 0 00.93-.638_5.503 5.503 0 002.614-4.312 1.5 1.5 0 00-.165-1.155.6.6 0 01-.086-.326v-.288a.6.6 0 01.086-.326 1.5 1.5 0 00.165-1.155_5.501 5.501 0 00-2.614-4.312 1.5 1.5 0 00-.93-.638c-.46-.348-.966-.598-1.5-.728A3 3 0 0112 3.2V2a2 2 0 00-2-2zm-1.18 11.232a4.5 4.5 0 01-1.74-2.115 1 1 0 01.44-1.21 4.502 4.502 0 015.96 0 1 1 0 01.44 1.21 4.5 4.5 0 01-1.74 2.115c-.48.27-.99.49-1.52.659a1 1 0 01-1.04-.001c-.53-.17-.104-.39-1.52-.66z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    'Agradecimiento y Lealtad': (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 2.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 11H5a1 1 0 110-2h2.586l-1.293-1.293a1 1 0 010-1.414zm8.414 0a1 1 0 00-1.414 0L11 8.586V7a1 1 0 10-2 0v1.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 000-1.414z" />
        </svg>
    ),
    'Promoción de Tú Logo / Marca': (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.112-9.403a.75.75 0 111.061-1.061l1.121.374a2.251 2.251 0 001.487-2.312.75.75 0 011.494.155 3.751 3.751 0 01-2.479 3.856l.333 1a.75.75 0 11-1.42.474l-.334-1a3.751 3.751 0 01-3.69-1.928.75.75 0 01.55-.928l1.122-.373zM10 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 4z" clipRule="evenodd" />
        </svg>
    ),
    'Bienvenida / Onboarding': (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v2a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H4zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4zm2-1a1 1 0 00-1 1v4a1 1 0 001 1h12a1 1 0 001-1v-4a1 1 0 00-1-1H4z" clipRule="evenodd" />
        </svg>
    ),
    'Kits Empresariales': (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v2a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H4zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4zm2-1a1 1 0 00-1 1v4a1 1 0 001 1h12a1 1 0 001-1v-4a1 1 0 00-1-1H4z" clipRule="evenodd" />
        </svg>
    ),
    'Anchetas': (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2a1 1 0 01-1 1H3a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 011 1v2a4 4 0 008 0v-2a1 1 0 011-1h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 01-1-1V6a4 4 0 00-4-4zm0 2a2 2 0 00-2 2v2h4V6a2 2 0 00-2-2zM4 11v2h12v-2H4z" clipRule="evenodd" />
        </svg>
    ),
    'Promocionales': (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.112-9.403a.75.75 0 111.061-1.061l1.121.374a2.251 2.251 0 001.487-2.312.75.75 0 011.494.155 3.751 3.751 0 01-2.479 3.856l.333 1a.75.75 0 11-1.42.474l-.334-1a3.751 3.751 0 01-3.69-1.928.75.75 0 01.55-.928l1.122-.373zM10 4a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 4z" clipRule="evenodd" />
        </svg>
    ),
};


const App: React.FC = () => {
  const { quoteItems, isQuoteModalOpen, addToQuote, removeFromQuote, updateQuoteItemQuantity, openQuoteModal, closeQuoteModal, clearQuote } = useQuote();
  
  const [selectedPriceCategories, setSelectedPriceCategories] = useState<PriceCategory[]>(priceFilters.map(f => f.category));
  const [selectedKitTypes, setSelectedKitTypes] = useState<KitType[]>(kitTypeFilters);
  const [selectedExperiences, setSelectedExperiences] = useState<Experience[]>(experienceFilters);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [wantsAdvisory, setWantsAdvisory] = useState(false);

  // Condition: Disable "Anchetas" if ONLY "Bienvenida / Onboarding" is selected
  const isAnchetasDisabled = useMemo(() => {
    return selectedExperiences.length === 1 && selectedExperiences[0] === 'Bienvenida / Onboarding';
  }, [selectedExperiences]);

  // Effect: If "Anchetas" becomes disabled, uncheck it
  useEffect(() => {
    if (isAnchetasDisabled) {
      setSelectedKitTypes(prev => prev.filter(k => k !== 'Anchetas'));
    }
  }, [isAnchetasDisabled]);


  const handleProductCardClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setWantsAdvisory(false);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleAddToQuote = () => {
    if (selectedProduct) {
      addToQuote(selectedProduct, quantity, wantsAdvisory);
      handleCloseDetailModal();
    }
  };

  const handleKitTypeChange = (kitType: KitType) => {
    setSelectedKitTypes(prev =>
      prev.includes(kitType) ? prev.filter(k => k !== kitType) : [...prev, kitType]
    );
  };

  const handleExperienceChange = (experience: Experience) => {
    setSelectedExperiences(prev =>
      prev.includes(experience) ? prev.filter(e => e !== experience) : [...prev, experience]
    );
  };
  
  const handlePriceCategoryChange = (category: PriceCategory) => {
    setSelectedPriceCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const priceMatch = selectedPriceCategories.length === 0 || selectedPriceCategories.includes(product.priceCategory);
      const kitTypeMatch = selectedKitTypes.length === 0 || selectedKitTypes.includes(product.kitType);
      const experienceMatch = selectedExperiences.length === 0 || selectedExperiences.includes(product.experience);
      return priceMatch && kitTypeMatch && experienceMatch;
    });
  }, [selectedPriceCategories, selectedKitTypes, selectedExperiences]);
  
  const quoteItemCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Header quoteItemCount={quoteItemCount} onQuoteClick={openQuoteModal} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Escoge tus DetallesPro:</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Purpose Filter */}
                <div className="lg:col-span-1">
                    <h3 className="font-semibold text-gray-700 mb-3">Propósito del Detalle:</h3>
                    <div className="flex flex-col space-y-2">
                        {experienceFilters.map(exp => (
                            <label key={exp} className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" checked={selectedExperiences.includes(exp)} onChange={() => handleExperienceChange(exp)} className="h-4 w-4 rounded text-primary focus:ring-secondary"/>
                                {iconMap[exp]}
                                <span className="text-gray-600">{exp}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Kit Type Filter */}
                <div className="lg:col-span-1">
                    <h3 className="font-semibold text-gray-700 mb-3">¿Qué Quieres regalar?:</h3>
                     <div className="flex flex-col space-y-2">
                        {kitTypeFilters.map(kitType => {
                            const isDisabled = kitType === 'Anchetas' && isAnchetasDisabled;
                            return (
                                <label key={kitType} className={`flex items-center space-x-2 ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedKitTypes.includes(kitType)} 
                                        onChange={() => handleKitTypeChange(kitType)} 
                                        disabled={isDisabled}
                                        className="h-4 w-4 rounded text-primary focus:ring-secondary"
                                    />
                                    {iconMap[kitType]}
                                    <span className="text-gray-600">{kitType}</span>
                                </label>
                            )
                        })}
                    </div>
                </div>

                {/* Price Filter */}
                <div className="lg:col-span-1">
                    <h3 className="font-semibold text-gray-700 mb-3">Rango de Inversión:</h3>
                    <div className="flex flex-col space-y-2">
                        {priceFilters.map(filter => (
                           <label key={filter.category} className="flex items-center space-x-2 cursor-pointer">
                               <input
                                   type="checkbox"
                                   checked={selectedPriceCategories.includes(filter.category)}
                                   onChange={() => handlePriceCategoryChange(filter.category)}
                                   className="h-4 w-4 rounded text-primary focus:ring-secondary"
                               />
                               <span className="text-gray-600">{filter.label}</span>
                           </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="mb-4 flex items-center justify-start">
          <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M4 11V20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20V11H4Z" fill="#ffc107"/>
            <rect x="3" y="8" width="18" height="3" fill="#ffc107"/>
            <path d="M11 3V21H13V3H11Z" fill="#dc2626"/>
            <path d="M3 11H21V13H3V11Z" fill="#dc2626"/>
            <path d="M11 8C8.79086 8 7 6.20914 7 4C7 1.79086 8.79086 0 11 0V8Z" fill="#b91c1c"/>
            <path d="M13 8C15.2091 8 17 6.20914 17 4C17 1.79086 15.2091 0 13 0V8Z" fill="#dc2626"/>
          </svg>
          <span className="text-lg font-semibold text-gray-700">
            {filteredProducts.length}
          </span>
          <span className="text-gray-500 ml-1">
            {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onCardClick={handleProductCardClick} />
          ))}
        </div>
      </main>

      <div className="bg-slate-800 py-4">
        <div className="flex justify-center items-center">
            <span className="text-white text-xl mr-4">Cotizar es muy fácil: Ir a</span>
            <button
              onClick={openQuoteModal}
              className="relative bg-accent text-primary font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H4.72l-.21-1.054A1 1 0 003 1z" />
              </svg>
              Mi Cotización
              {quoteItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {quoteItemCount}
                </span>
              )}
            </button>
        </div>
      </div>
      
      <Footer />
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={closeQuoteModal}
        quoteItems={quoteItems}
        onRemoveItem={removeFromQuote}
        onUpdateItemQuantity={updateQuoteItemQuantity}
        onClearQuote={clearQuote}
      />
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg relative">
            <button onClick={handleCloseDetailModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-primary mb-4">{selectedProduct.name}</h2>
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-md mb-4"/>
              <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
              <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-bold text-primary">${selectedProduct.price.toLocaleString('es-CO')}</span>
                  <div className="flex items-center">
                      <label htmlFor="quantity" className="mr-2 font-semibold text-gray-700">Cantidad:</label>
                      <input 
                          id="quantity"
                          type="number" 
                          value={quantity} 
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 text-center border border-gray-300 rounded-md shadow-sm"
                          min="1"
                      />
                  </div>
              </div>
              <div className="mb-6">
                  <label className="flex items-center cursor-pointer">
                      <input 
                          type="checkbox"
                          checked={wantsAdvisory}
                          onChange={(e) => setWantsAdvisory(e.target.checked)}
                          className="h-5 w-5 rounded text-primary focus:ring-secondary border-gray-300"
                      />
                      <span className="ml-3 text-sm text-gray-700">Sí, deseo recibir una consulta de asesoría gratuita para la personalización de mi logo.</span>
                  </label>
              </div>
              <button onClick={handleAddToQuote} className="w-full bg-accent text-primary font-bold py-3 px-4 rounded-lg hover:bg-yellow-400 transition-transform transform hover:scale-105">
                  Añadir a la Cotización
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;