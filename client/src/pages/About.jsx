import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Briefcase, 
  ArrowUpRight, 
  Globe, 
  Mail,
  ChevronLeft, 
  ChevronRight, 
  Map, 
  CreditCard, 
  Plane,
  Target, 
  Users, 
  Award, 
  BookOpen
} from 'lucide-react';

// --- Animated Background Component ---
const AnimatedBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden">
      {/* Soft Ambient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100 rounded-full blur-[140px]" />
      </div>
      {children}
    </div>
  );
};

// --- Founding Member Card Component ---
const FoundingMemberCard = ({ initials, name, role, phone, delay, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const colors = [
    { 
      bg: 'bg-[#dba0f2]', 
      border: 'border-[#dba0f2]', 
      text: 'text-[#dba0f2]', 
      gradient: 'from-[#dba0f2] to-[#c37ee8]', 
      light: 'bg-[#f8e9fd]',
      glow: 'hover:shadow-[0_30px_60px_-15px_rgba(219,160,242,0.4)]' 
    },
  ];

  const color = colors[index % colors.length];

  return (
    <div
      className="relative group h-full"
      style={{
        animation: `slideUp 0.6s ease-out ${delay}s both`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative h-full bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.02)] ${color.glow} ${
        isHovered ? '-translate-y-4' : ''
      }`}>
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${color.gradient}`} />
        
        <div className={`p-8 pb-4 flex flex-col items-center text-center relative overflow-hidden`}>
          <div className={`w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br ${color.gradient} flex items-center justify-center shadow-lg transition-all duration-700 z-10 ${
            isHovered ? 'scale-110 rotate-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]' : 'scale-100'
          }`}>
            <span className={`text-2xl font-black text-white`}>{initials}</span>
          </div>
          <div className="z-10 space-y-1">
            <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight">{name}</h3>
            <div className="flex items-center justify-center gap-2">
              <Briefcase className={`w-3 h-3 ${color.text}`} />
              <p className={`font-bold text-[10px] ${color.text} uppercase tracking-wider`}>{role}</p>
            </div>
          </div>
          <div className={`absolute top-2 right-2 p-4 transition-all duration-500 ${isHovered ? 'text-gray-200' : 'text-gray-50'}`}>
            <ArrowUpRight size={32} />
          </div>
        </div>

        <div className="px-8 pb-8 pt-4 space-y-6">
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 group/item">
              <div className={`${color.light} p-2.5 rounded-xl transition-transform group-hover/item:scale-110`}>
                <Phone className={`w-4 h-4 ${color.text}`} />
              </div>
              <p className="text-sm font-mono text-gray-900 font-bold">{phone}</p>
            </div>
            <div className="flex items-center gap-4 group/item">
              <div className={`${color.light} p-2.5 rounded-xl transition-transform group-hover/item:scale-110`}>
                <MapPin className={`w-4 h-4 ${color.text}`} />
              </div>
              <p className="text-sm text-gray-600 font-bold tracking-tight">Pune, India</p>
            </div>
          </div>
          <button className={`w-full py-4 px-6 bg-gradient-to-r ${color.gradient} text-white font-bold rounded-2xl shadow-lg hover:shadow-[0_25px_40px_-10px_rgba(0,0,0,0.25)] transition-all duration-300 flex items-center justify-center gap-2 group/btn`}>
            <span>Profile</span>
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const themeColor = "#f093fb";

  const cards = [
    {
      title: "Our Story",
      icon: <Map className="text-orange-500" size={24} />,
      content: "MakeTechBerry LLP was founded in 2025 with a vision to bridge the gap between Academic learning and industry requirements. As a fresh startup based in Pune, Maharashtra, we bring innovative approaches to tech education."
    },
    {
      title: "Mission",
      icon: <CreditCard className="text-indigo-600" size={24} />,
      content: "To empower students and professionals with real-world skills, while delivering innovative, reliable, and affordable technology solutions."
    },
    {
      title: "Vision",
      icon: <Plane className="text-emerald-500" size={24} />,
      content: "To become a trusted name in technology-driven learning, research, and development, shaping future-ready professionals."
    }
  ];

  const valueItems = [
    { title: "Innovation", icon: <Target size={32} />, desc: "We constantly push boundaries to deliver cutting-edge training solutions." },
    { title: "Mentorship", icon: <Users size={32} />, desc: "Personalized guidance and support for every student’s learning journey." },
    { title: "Excellence", icon: <Award size={32} />, desc: "Committed to delivering the highest quality education and training." },
    { title: "Practical Learning", icon: <BookOpen size={32} />, desc: "Hands-on approach with real-world projects and industry exposure." }
  ];

  const members = [
    { initials: 'MM', name: 'Malhar Malavade', role: 'Tech Lead', phone: '+91 80871 05728', delay: 0.1 },
    { initials: 'PS', name: 'Pranav Shinde', role: 'Strategy Lead', phone: '+91 91455 98468', delay: 0.2 },
    { initials: 'JK', name: 'Janhvi Katakdhond', role: 'Operations Lead', phone: '+91 76205 95075', delay: 0.3 }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % cards.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <AnimatedBackground>
      <div className="font-['Poppins'] overflow-x-hidden">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Volkhov:wght@700&display=swap');
          .font-volkhov { font-family: 'Volkhov', serif; }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { 
            animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
          }
          .stagger-1 { animation-delay: 0.1s; }
          .stagger-2 { animation-delay: 0.2s; }
          .stagger-3 { animation-delay: 0.3s; }
          .stagger-4 { animation-delay: 0.4s; }
        `}</style>

        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-60 text-center overflow-visible">
          {/* VISIBLE HALF BACKGROUND */}
          <div className="absolute top-0 left-0 w-full h-[82%] bg-slate-100/80 -z-10 border-b border-slate-200" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <p className={`text-[#DF6951] font-bold text-xl uppercase tracking-widest mb-4 animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              Who We Are
            </p>
            <h1 className={`text-5xl md:text-7xl font-bold text-black mb-6 font-volkhov animate-fade-in-up stagger-1 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              Unleashing Innovation
            </h1>
            <p className={`text-gray-500 max-w-2xl mx-auto leading-relaxed text-lg animate-fade-in-up stagger-2 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              Building careers and shaping the future of technology. We are more than a tech company; we are the architects of the digital landscape.
            </p>
          </div>

          {/* Overlapping Cards */}
          <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 z-20 hidden md:block">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid gap-8 md:grid-cols-3">
                {cards.map((card, index) => (
                  <div key={index} className={`bg-white rounded-[32px] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-gray-100 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] group animate-fade-in-up stagger-${index + 1} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-6 shadow-xl shadow-indigo-100/30" style={{ backgroundColor: themeColor }}>
                      {card.icon}
                    </div>
                    <div className="w-10 h-1 bg-indigo-500 mb-6 rounded-full transition-all group-hover:w-16" />
                    <h3 className="text-2xl font-bold mb-4 text-[#181E4B] font-volkhov">{card.title}</h3>
                    <p className="text-[#5E6282] text-md leading-relaxed">{card.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile View */}
        <div className="md:hidden px-6 mt-[-80px] relative z-30 pb-20">
          <div className="bg-white rounded-[32px] p-10 shadow-2xl relative border border-gray-100">
            <div className="mb-6 w-12 h-12 rounded-xl flex items-center justify-center bg-[#E7DEFE]">
              {cards[currentSlide].icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#181E4B] font-volkhov">{cards[currentSlide].title}</h3>
            <p className="text-[#5E6282] leading-relaxed">{cards[currentSlide].content}</p>
            <div className="flex justify-between items-center mt-12">
              <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"><ChevronLeft size={24}/></button>
              <div className="flex gap-2">
                {cards.map((_, i) => (
                  <div key={i} className={`h-2 rounded-full transition-all ${currentSlide === i ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`} />
                ))}
              </div>
              <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"><ChevronRight size={24}/></button>
            </div>
          </div>
        </div>

        <div className="hidden md:block h-64"></div>

        {/* --- VALUES SECTION --- */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-[#DF6951] font-bold uppercase tracking-[0.2em] text-sm mb-4">Our Principles</p>
            <h2 className="text-4xl md:text-6xl font-bold text-[#181E4B] mb-12 font-volkhov">Our Values</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {valueItems.map((item, i) => (
                <div key={i} className={`group bg-white rounded-[2.5rem] p-10 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-50 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_45px_90px_-20px_rgba(124,58,237,0.2)] opacity-0 animate-fade-in-up`} style={{ animationDelay: `${i * 0.15 + 0.5}s` }}>
                  <div className="mx-auto mb-8 w-16 h-16 flex items-center justify-center rounded-2xl bg-[#E7DEFE] text-[#7C3AED] transition-transform group-hover:rotate-[10deg] shadow-xl shadow-indigo-100/50">
                    {React.cloneElement(item.icon, { size: 28 })}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-[#181E4B] font-volkhov">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FOUNDING MEMBERS SECTION --- */}
        <section className="relative py-24 overflow-visible">
          {/* VISIBLE HALF BACKGROUND FOR FOUNDERS */}
          <div className="absolute top-0 left-0 w-full h-[460px] bg-slate-100 -z-10 rounded-b-[120px] shadow-inner" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100 mb-6 transition-transform hover:scale-105">
                <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">The Core Leadership</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-volkhov">Founding Members</h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">The visionary core of MakeTechBerry LLP, dedicated to driving innovation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {members.map((member, index) => (
                <FoundingMemberCard key={index} {...member} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* --- FOOTER CTA --- */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="bg-purple-400 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden text-white shadow-[0_50px_100px_-20px_rgba(15,23,42,0.4)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 font-volkhov">Ready to shape the future with us?</h2>
              <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all flex items-center gap-3 mx-auto shadow-2xl active:scale-95">
                <span>Contact MakeTechBerry</span>
                <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </AnimatedBackground>
  );
};

export default App;