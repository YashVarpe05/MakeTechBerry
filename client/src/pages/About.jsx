import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Map, 
  CreditCard, 
  Plane,
  Target, 
  Users, 
  Award, 
  BookOpen 
} from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const themeColor = "#f093fb ";
  // const primaryBlue = "#181E4B";

  const cards = [
    {
      title: "Our Story",
      icon: <Map className="text-orange-500" size={24} />,
      content:
        "MakeTechBerry LLP was founded in 2025 with a vision to bridge the gap between Academic learning and industry requirements. As a fresh startup based in Pune,Maharashtra, we bring innovative approaches to tech education."
    },
    {
      title: "Mission",
      icon: <CreditCard className="text-indigo-600" size={24} />,
      content:
        "To empower students and professionals with real-world skills, while delivering innovative, reliable, and affordable technology solutions."
    },
    {
      title: "Vision",
      icon: <Plane className="text-emerald-500" size={24} />,
      content:
        "To become a trusted name in technology-driven learning, research, and development, shaping future-ready professionals."
    }
  ];

  const valueItems = [
    {
      title: "Innovation",
      icon: <Target size={32} />,
      desc: "We constantly push boundaries to deliver cutting-edge training solutions."
    },
    {
      title: "Mentorship",
      icon: <Users size={32} />,
      desc: "Personalized guidance and support for every student’s learning journey."
    },
    {
      title: "Excellence",
      icon: <Award size={32} />,
      desc: "Committed to delivering the highest quality education and training."
    },
    {
      title: "Practical Learning",
      icon: <BookOpen size={32} />,
      desc: "Hands-on approach with real-world projects and industry exposure."
    }
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % cards.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <AnimatedBackground>
    <div className="font-['Poppins'] overflow-x-hidden ">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Volkhov:wght@700&display=swap');
        .font-volkhov { font-family: 'Volkhov', serif; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }

        .hover-float:hover {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* ================= HERO / STORY HEADER ================= */}
      <section className="x relative overflow-visible">
        {/* Content Wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-60 text-center">
          <p className={`text-[#DF6951] font-bold text-xl uppercase tracking-widest  mb-4 animate-fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Who We Are
          </p>
          <h1 className={`text-4xl md:text-6xl font-bold text-black mb-6 font-volkhov animate-fade-in-up stagger-1 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Unleashing Innovation
          </h1>
          <p className={`text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg animate-fade-in-up stagger-2 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Building careers and shaping the future of technology. We are more than a tech company; we are the architects of the digital landscape.
          </p>
        </div>

        {/* Desktop Cards - Overlapping with translate-y-1/2 */}
        <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 z-20 hidden md:block">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid gap-8 md:grid-cols-3">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-[32px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transform group animate-fade-in-up stagger-${index + 1} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-indigo-100/10"
                    style={{ backgroundColor: themeColor }}
                  >
                    {card.icon}
                  </div>
                  <div className="w-10 h-1 bg-indigo-500 mb-6 rounded-full transition-all group-hover:w-16" />
                  <h3 className="text-2xl font-bold mb-4 text-[#181E4B] font-volkhov">
                    {card.title}
                  </h3>
                  <p className="text-[#5E6282] text-md leading-relaxed">
                    {card.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Slider View */}
      <div className="md:hidden px-6 mt-[-80px] relative z-30 pb-20">
        <div className="bg-white rounded-[32px] p-10 shadow-2xl relative overflow-hidden">
          <div className="w-12 h-1.5 bg-[#E7DEFE] mb-8 rounded-full" />
          <div className="mb-6 w-12 h-12 rounded-xl flex items-center justify-center bg-[#E7DEFE]">
            {cards[currentSlide].icon}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#181E4B] font-volkhov">
            {cards[currentSlide].title}
          </h3>
          <p className="text-[#5E6282] leading-relaxed">
            {cards[currentSlide].content}
          </p>
          
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg text-slate-900 active:scale-90 transition-transform"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {cards.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`} />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg text-slate-900 active:scale-90 transition-transform"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for desktop */}
      <div className="hidden md:block h-64"></div>

      {/* ================= OUR VALUES SECTION ================= */}
      <section className="py-16 md:py-24 lg:py-32 overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#DF6951] font-bold  uppercase tracking-[0.2em] text-[10px] md:text-xl mb-4">
            Our Principles
          </p>
          <h2 className="text-3xl md:text-7xl font-bold text-[#181E4B] mb-6 font-volkhov">
            Our Values
          </h2>
          <p className="text-gray-500 mb-12 md:mb-20 max-w-xl mx-auto text-sm md:text-base font-medium px-4">
            The guiding principles that drive our commitment to excellence and innovation in every project.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueItems.map((item, i) => (
              <div
                key={i}
                className={`group bg-white rounded-[24px] md:rounded-[32px] p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-50 
                transition-all duration-700 hover:-translate-y-3 md:hover:-translate-y-4
                hover:shadow-[0_20px_50px_rgba(179,141,216,0.2)] lg:hover:shadow-[0_40px_80px_rgba(179,141,216,0.25)]
                opacity-0 animate-fade-in-up stagger-${i + 1}`}
                style={{ animationDelay: `${i * 0.15 + 0.5}s` }}
              >
                <div className="mx-auto mb-6 md:mb-8 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl
                bg-[#E7DEFE] text-[#7C3AED] transition-all duration-500
                group-hover:scale-110 group-hover:rotate-[10deg] shadow-lg shadow-indigo-100/50">
                  {/* Cloned icon with responsive size */}
                  {React.cloneElement(item.icon, { size: 28 })}
                </div>

                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-[#181E4B] font-volkhov tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
                
                <div className="mt-6 md:mt-8 h-1 w-0 bg-gradient-to-r from-indigo-500 to-purple-400 mx-auto transition-all duration-500 group-hover:w-2/3 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Decoration */}
      <div className="py-12 md:py-20 flex justify-center opacity-10 grayscale select-none">
         <div className="text-2xl md:text-3xl font-black tracking-tighter">FURTHER CONTENT</div>
      </div>
    </div>
    </AnimatedBackground>
  );
};

export default About;