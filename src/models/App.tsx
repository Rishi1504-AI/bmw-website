import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, MoveRight } from 'lucide-react';
import gsap from 'gsap';

// Assets are now served directly from the public folder with sanitized names
const bmwLogo = '/images/bmw_logo.webp';
const bmwBackground = '/images/bmw_background.jpg';

type Category = 'SUV' | 'Sedan' | 'Coupe' | 'Convertible';

type CarModel = {
  id: string;
  category: Category;
  name: string;
  tagline: string;
  specs: { speed: string; power: string; engine: string };
  price: string;
  modelPath: string;
  color: string;
};

const CATEGORIES: Category[] = ['SUV', 'Sedan', 'Coupe', 'Convertible'];

const CARS: CarModel[] = [
  {
    id: 'x7_m40i',
    category: 'SUV',
    name: 'BMW X7 xDrive40i',
    tagline: 'The ultimate statement of luxury and space.',
    specs: { speed: '5.8s', power: '375 hp', engine: '3.0L Turbo Inline-6' },
    price: '$81,900',
    modelPath: '/models/2019_bmw_x7_xdrive40i.glb',
    color: 'rgba(59, 130, 246, 0.15)'
  },
  {
    id: 'x3_30i',
    category: 'SUV',
    name: 'BMW X3 xDrive30i',
    tagline: 'Versatile performance for every adventure.',
    specs: { speed: '6.0s', power: '248 hp', engine: '2.0L Turbo Inline-4' },
    price: '$48,900',
    modelPath: '/models/2022_bmw_x3_xdrive_30i.glb',
    color: 'rgba(16, 185, 129, 0.12)'
  },
  {
    id: 'x3_m40i',
    category: 'SUV',
    name: 'BMW X3 M40i',
    tagline: 'Precision handling with M-series power.',
    specs: { speed: '4.4s', power: '382 hp', engine: '3.0L Inline-6' },
    price: '$61,900',
    modelPath: '/models/bmw_x3_m40i.glb',
    color: 'rgba(217, 119, 6, 0.1)'
  },
  {
    id: 'series_7_sedan',
    category: 'Sedan',
    name: 'BMW 7 Series Sedan',
    tagline: 'Executive comfort meets advanced BMW craftsmanship.',
    specs: { speed: '4.7s', power: '536 hp', engine: 'V8 / Electric Assist' },
    price: '$96,400',
    modelPath: '/models/bmw_7_series_sedan.glb',
    color: 'rgba(148, 163, 184, 0.16)'
  },
  {
    id: 'm3_40i',
    category: 'Sedan',
    name: 'BMW M3 40i',
    tagline: 'Sport sedan precision with everyday usability.',
    specs: { speed: '4.1s', power: '382 hp', engine: '3.0L Turbo Inline-6' },
    price: '$59,500',
    modelPath: '/models/bmw_m3_40i.glb',
    color: 'rgba(59, 130, 246, 0.14)'
  },
  {
    id: 'm3_ardo',
    category: 'Sedan',
    name: 'BMW M3 Ardo',
    tagline: 'Track-inspired M3 build with aggressive road stance.',
    specs: { speed: '3.9s', power: '503 hp', engine: '3.0L TwinPower Turbo' },
    price: '$78,000',
    modelPath: '/models/bmw_m3_ardo.glb',
    color: 'rgba(99, 102, 241, 0.12)'
  },
  {
    id: 'm3_touring',
    category: 'Sedan',
    name: 'BMW M3 CS Touring',
    tagline: 'High performance practicality in one premium package.',
    specs: { speed: '3.6s', power: '543 hp', engine: '3.0L Inline-6' },
    price: '$85,000',
    modelPath: '/models/2025_bmw_m3_cs_touring.glb',
    color: 'rgba(239, 68, 68, 0.1)'
  },
  {
    id: 'm4_comp',
    category: 'Coupe',
    name: 'BMW M4 Competition',
    tagline: 'Uncompromising power and aesthetic dominance.',
    specs: { speed: '3.4s', power: '523 hp', engine: '3.0L Twin-Turbo' },
    price: '$83,200',
    modelPath: '/models/2025_bmw_m4_competition.glb',
    color: 'rgba(59, 130, 246, 0.18)'
  },
  {
    id: 'm2_series',
    category: 'Coupe',
    name: 'BMW 2 Series M',
    tagline: 'Compact agility with heavyweight performance.',
    specs: { speed: '3.9s', power: '453 hp', engine: '3.0L TwinPower Turbo' },
    price: '$63,200',
    modelPath: '/models/bmw_2_series_m.glb',
    color: 'rgba(168, 85, 247, 0.12)'
  },
  {
    id: 'm3_coupe',
    category: 'Coupe',
    name: 'BMW M3 Coupe',
    tagline: 'The legend redefined for the modern driver.',
    specs: { speed: '4.1s', power: '473 hp', engine: '3.0L Twin-Turbo' },
    price: '$76,000',
    modelPath: '/models/bmw_coupe_m3.glb',
    color: 'rgba(236, 72, 153, 0.1)'
  },
  {
    id: 'm3_gtr',
    category: 'Convertible',
    name: 'BMW M3 GTR',
    tagline: 'Pure racing DNA with an open-top thrill.',
    specs: { speed: '3.7s', power: '444 hp', engine: '4.0L V8' },
    price: '$95,000',
    modelPath: '/models/bmw_m3_gtr.glb',
    color: 'rgba(251, 191, 36, 0.15)'
  },
  {
    id: 'm3_gtr_2',
    category: 'Convertible',
    name: 'BMW M3 GTR Special',
    tagline: 'Exclusive performance engineering for the elite.',
    specs: { speed: '3.5s', power: '460 hp', engine: '4.0L V8' },
    price: '$110,000',
    modelPath: '/models/bmw_m3_gtr_2.glb',
    color: 'rgba(245, 158, 11, 0.12)'
  }
];

function categoryFromSearch(): Category {
  const query = new URLSearchParams(window.location.search);
  const cat = query.get('category') as Category;
  return CATEGORIES.includes(cat) ? cat : 'SUV';
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>(categoryFromSearch());
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const wheelTimeout = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  const handleNext = () => {
    if (filteredCars.length === 0) return;
    setActiveIndex(prev => (prev + 1) % filteredCars.length);
  };
  
  const handlePrevSafe = () => {
    if (filteredCars.length === 0) return;
    setActiveIndex(prev => (prev - 1 + filteredCars.length) % filteredCars.length);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (wheelTimeout.current) return;
    if (Math.abs(e.deltaY) > 50) {
      if (e.deltaY > 0) handleNext();
      else handlePrevSafe();
      wheelTimeout.current = setTimeout(() => { wheelTimeout.current = null }, 600);
    }
  };

  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX - 10, y: e.clientY - 10, duration: 0.1 });
      gsap.to(follower, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x < -50) {
      handleNext();
    } else if (info.offset.x > 50) {
      handlePrevSafe();
    }
  };

  const filteredCars = CARS.filter(car => car.category === activeCategory);
  const currentCar = filteredCars[activeIndex] || filteredCars[0];

  return (
    <div 
      className="w-full min-h-screen bg-[#020204] overflow-x-hidden relative text-white font-['Barlow',sans-serif] selection:bg-blue-500/30 flex flex-col"
      onWheel={handleWheel}
    >
      <div className="custom-cursor"></div>
      <div className="cursor-follower"></div>
      
      <div className="relative w-full h-screen flex-shrink-0 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={bmwBackground}
          alt="BMW Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentCar?.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 50%, ${currentCar?.color || 'rgba(59, 130, 246, 0.1)'} 0%, transparent 70%)` }}
        />
      </AnimatePresence>

      <div className="relative z-10 w-full h-full flex flex-col items-center pt-24 md:pt-32">
        <div className="flex gap-4 md:gap-12 mb-8 md:mb-16">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs md:text-sm font-bold tracking-[0.3em] uppercase transition-all duration-500 relative pb-2 ${
                activeCategory === cat ? 'text-white' : 'text-gray-600 hover:text-gray-400'
              } pointer-events-auto`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500" />
              )}
            </button>
          ))}
        </div>

        <div className="relative w-full h-[400px] md:h-[600px] flex items-center justify-center overflow-visible">
          {filteredCars.map((car, idx) => {
            const relIdx = idx - activeIndex;
            const isActive = idx === activeIndex;
            const isStacked = idx > activeIndex;
            const isPast = idx < activeIndex;

            let x = 0;
            let y = 0;
            let scale = 1;
            let opacity = 0;
            let zIndex = 10;

            if (isActive) {
              x = windowSize.width > 768 ? windowSize.width * 0.15 : 0;
              y = 50;
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (isPast) {
              x = -windowSize.width * 0.8;
              y = 100;
              scale = 0.8;
              opacity = 0;
              zIndex = 10;
            } else if (isStacked) {
              x = (windowSize.width * 0.3) + (relIdx * (windowSize.width < 768 ? 40 : 80));
              y = (-windowSize.height * 0.25) + (relIdx * 20);
              scale = (windowSize.width < 768 ? 0.35 : 0.5) - (relIdx * 0.08);
              opacity = 0; // Hide stacked cars in the background as per user request
            }

            return (
              <motion.div
                key={car.id}
                animate={{ x, y, scale, opacity }}
                transition={{ type: 'spring', damping: 25, stiffness: 120, mass: 1.2 }}
                style={{ zIndex }}
                className={`absolute w-[150vw] md:w-[1400px] h-[80vh] md:h-[900px] flex items-center justify-center ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
              >
              <div className="relative w-full h-full flex items-center justify-center">
                <model-viewer
                  src={car.modelPath}
                  auto-rotate
                  camera-controls
                  disable-zoom
                  shadow-intensity="2"
                  environment-image="neutral"
                  exposure="1.5"
                  interaction-prompt="none"
                  camera-orbit="0deg 75deg 80%"
                  min-camera-orbit="auto auto 5%"
                  max-camera-orbit="auto auto 100%"
                  interpolation-decay="200"
                  loading="eager"
                  style={{ width: '100%', height: '100%', backgroundColor: 'transparent', outline: 'none' }}
                  className="w-full h-full"
                ></model-viewer>
                {/* Custom floor shadow */}
                <div className="absolute bottom-[5%] w-[80%] h-[30px] bg-black/50 blur-3xl rounded-[100%] -z-10" />
              </div>
            </motion.div>
          );
          })}
        </div>

        <div className="absolute bottom-20 left-0 w-full px-8 md:px-20 flex flex-col md:flex-row justify-between items-end gap-12 z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCar?.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="flex flex-col gap-4 max-w-xl"
            >
              <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
                {currentCar?.name.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? 'text-white' : 'text-white/20'}>{word} </span>
                ))}
              </h1>
              <p className="text-gray-400 text-sm md:text-base tracking-widest uppercase font-medium">
                {currentCar?.tagline}
              </p>
              
              <div className="flex gap-12 mt-4 md:mt-8">
                {Object.entries(currentCar?.specs || {}).map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">{key}</span>
                    <span className="text-sm font-bold text-white tracking-wider">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col items-end gap-6 pointer-events-auto">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Starting at</span>
              <span className="text-4xl font-bold tracking-tighter">{currentCar?.price}</span>
            </div>
            
            <button className="group flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500">
              <span className="text-xs font-bold uppercase tracking-widest">Reserve Now</span>
              <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-white/20 group-hover:translate-x-2 transition-all">
                <MoveRight size={16} />
              </div>
            </button>
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-20 flex flex-col gap-4 z-40">
          {filteredCars.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-1 h-12 transition-all duration-500 rounded-full pointer-events-auto ${
                i === activeIndex ? 'bg-blue-500 h-20' : 'bg-white/10 hover:bg-white/30'
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-32 right-8 md:right-20 flex gap-3 z-40">
          <button 
            onClick={handlePrevSafe}
            disabled={filteredCars.length <= 1}
            className="p-4 rounded-full border border-white/10 bg-black/20 hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-black/20 transition-all backdrop-blur-xl text-white group pointer-events-auto"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button 
            onClick={handleNext}
            disabled={filteredCars.length <= 1}
            className="p-4 rounded-full border border-white/10 bg-black/20 hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-black/20 transition-all backdrop-blur-xl text-white group pointer-events-auto"
          >
            <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
      
      <div className="absolute top-8 left-8 md:top-12 md:left-20 z-50 pointer-events-none opacity-80">
         <div className="text-2xl font-['Barlow',sans-serif] font-bold tracking-widest flex items-center gap-3">
           <a href="/" style={{ pointerEvents: 'auto', textDecoration: 'none', color: 'white' }}>
             <img src={bmwLogo} alt="BMW" className="h-8 w-auto object-contain" />
           </a>
           BMW
         </div>
         <div className="flex gap-8 ml-20 text-[10px] uppercase tracking-[0.3em] font-medium text-white/40">
           <a href="/tech.html" className="hover:text-white transition-colors pointer-events-auto">Innovation</a>
           <a href="#" className="hover:text-white transition-colors pointer-events-auto">Configurator</a>
         </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-8 md:bottom-12 md:left-20 z-50 pointer-events-none flex items-center gap-3 text-sm text-gray-400 tracking-widest font-['Barlow_Condensed',sans-serif] uppercase"
      >
        <div className="w-8 h-[1px] bg-gray-500" />
        Explore in 3D
      </motion.div>
    </div>

    <footer className="w-full bg-black py-20 px-8 md:px-20 border-t border-white/10 z-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 text-2xl font-bold tracking-tighter">
            <img src={bmwLogo} alt="BMW" className="h-8 w-8 object-contain" />
            <span className="tracking-[0.2em] uppercase text-xl">BMW</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Experience the ultimate driving machine. Innovation, performance, and luxury redefined for the modern era.
          </p>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Models</h4>
          <ul className="flex flex-col gap-4">
            {CATEGORIES.map(cat => (
              <li key={cat}>
                <button 
                  onClick={() => setActiveCategory(cat)}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-light"
                >
                  {cat} Series
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-gray-400 text-sm font-light">
            <li><a href="/" className="hover:text-blue-400 transition-colors">Home Page</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Book Test Drive</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Find a Dealer</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">BMW Financial</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Follow Us</h4>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest font-medium">
          © 2026 BMW OF NORTH AMERICA, LLC. THE BMW NAME, MODEL NAMES AND LOGO ARE REGISTERED TRADEMARKS.
        </p>
        <div className="flex gap-8 text-[10px] text-gray-600 uppercase tracking-widest font-medium">
          <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Legal</a>
          <a href="#" className="hover:text-gray-400 transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  </div>
);
}
