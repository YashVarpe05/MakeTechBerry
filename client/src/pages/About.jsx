import React, { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Briefcase,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Map,
  CreditCard,
  Plane,
  Target,
  Users,
  Award,
  BookOpen,
} from "lucide-react";

/**
 * TestimonialCard Component
 */
const TestimonialCard = ({ quote, name, role, image, highlights, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Stagger logic for dynamic grid flow
  const staggerClass = index % 3 === 1 ? "lg:translate-y-12" : "";
  const tabletStagger =
    index % 2 === 1 ? "md:translate-y-8 lg:translate-y-0" : "";

  return (
    <div
      className={`relative group transition-all duration-700 ${staggerClass} ${tabletStagger}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_60px_-15px_rgba(144,98,255,0.2)] transition-all duration-500 border border-gray-50 group-hover:-translate-y-2">
        <div className="relative mb-6">
          <div
            className={`absolute -inset-2 rounded-full transition-all duration-500 opacity-20 ${isHovered ? "bg-[#9062FF] scale-110" : "bg-transparent scale-100"}`}
          />
          <svg
            className={`w-10 h-10 relative z-10 transition-colors duration-500 ${isHovered ? "text-[#9062FF]" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        <p className="text-gray-600 text-md leading-relaxed mb-8 italic">
          "
          {quote.map((part, idx) => (
            <span key={idx}>
              {highlights && highlights.includes(idx) ? (
                <span className="text-black font-bold not-italic">{part}</span>
              ) : (
                <span>{part}</span>
              )}
            </span>
          ))}
          "
        </p>

        <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-50"
          />
          <div>
            <h4 className="text-[#181E4B] font-bold text-base tracking-tight">
              {name}
            </h4>
            <p className="text-[#9062FF] font-medium text-xs uppercase tracking-wider">
              {role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * FoundingMemberCard Component
 */
const FoundingMemberCard = ({ initials, name, role, phone, delay, linkedinURL }) => {
  const [isHovered, setIsHovered] = useState(false);
  const color = {
    bg: "bg-[#E7DEFE]",
    text: "text-[#9062FF]",
    gradient: "from-[#E7DEFE] to-[#ddd0fe]",
    light: "bg-purple-20",
  };

  return (
    <div
      className="relative group h-full"
      style={{ animation: `slideUp 0.6s ease-out ${delay}s both` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative h-full bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] ${color.glow} ${isHovered ? "-translate-y-4" : ""}`}
      >
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${color.gradient}`}
        />
        <div
          className={`p-8 pb-4 flex flex-col items-center text-center relative`}
        >
          <div
            className={`w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br ${color.gradient} flex items-center justify-center shadow-lg transition-all duration-700 z-10 ${isHovered ? "scale-110 rotate-6 shadow-xl" : ""}`}
          >
            <span className={`text-2xl font-black text-[#9062FF]`}>
              {initials}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 tracking-tight leading-tight">
            {name}
          </h3>
          <p
            className={`font-bold text-[13px] ${color.text} uppercase tracking-wider mt-1`}
          >
            {role}
          </p>
        </div>
        <div className="px-8 pb-8 pt-4 space-y-4 border-t border-gray-100 mt-4">
          <div className="flex items-center gap-4">
            <div className={`${color.light} p-2 rounded-xl`}>
              <Phone className={`w-4 h-4 ${color.text}`} />
            </div>
            <p className="text-sm font-mono text-gray-900 font-bold">{phone}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`${color.light} p-2 rounded-xl`}>
              <MapPin className={`w-4 h-4 ${color.text}`} />
            </div>
            <p className="text-sm text-gray-600 font-bold tracking-tight">
              Pune, India
            </p>
          </div>
          <a
            href={linkedinURL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-4 py-4 px-6 bg-[#ddd0fe] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 group/btn hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <span className="text-[#9062FF]">View Profile</span>

            <ArrowUpRight className="w-4 h-4 text-[#9062FF] group-hover/btn:text-[#7A4DFF] transition-all" />
          </a>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const cards = [
    {
      title: "Our Story",
      icon: <Map className="text-[#9062FF]" size={24} />,
      content:
        "MakeTechBerry LLP was founded in 2025 with a vision to bridge the gap between academic learning and industry requirements.",
    },
    {
      title: "Mission",
      icon: <Target className="text-[#9062FF]" size={24} />,
      content:
        "To empower students and professionals with real-world skills while delivering innovative technology solutions.",
    },
    {
      title: "Vision",
      icon: <Plane className="text-[#9062FF]" size={24} />,
      content:
        "To become a trusted name in technology-driven learning, shaping future-ready professionals.",
    },
  ];

  const valueItems = [
    {
      title: "Innovation",
      icon: <Target size={32} />,
      desc: "Constantly pushing boundaries for cutting-edge training.",
    },
    {
      title: "Mentorship",
      icon: <Users size={32} />,
      desc: "Personalized guidance for every student’s journey.",
    },
    {
      title: "Excellence",
      icon: <Award size={32} />,
      desc: "Committed to delivering high-quality education.",
    },
    {
      title: "Practical",
      icon: <BookOpen size={32} />,
      desc: "Hands-on approach with real-world projects.",
    },
  ];

  const testimonials = [
    {
      quote: [
        "The ",
        "Mentors helped me",
        " with support and doubts cleared, they analysed my skills and ",
        "guided me",
        " to refine them.",
      ],
      highlights: [1, 3],
      name: "Sagrika Keshri",
      role: "Mentor Support",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    {
      quote: [
        "Newton School's ",
        "mentor provided confidence",
        " with their ",
        "placement support",
        ", I thoroughly prepared for interviews.",
      ],
      highlights: [1, 3],
      name: "Animesh Bhatt",
      role: "Placement Support",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    {
      quote: [
        "Mock interviews played a ",
        "vital role",
        " in my placement. It helped me ",
        "gain confidence",
        " for my actual interviews.",
      ],
      highlights: [1, 3],
      name: "Shaini Ghorai",
      role: "Interview Prep",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    },
  ];

  const members = [
    {
      initials: "MM",
      name: "Janhvi Katakdhond",
      role: "TECH LEAD",
      phone: "+91 76205 95075",
      delay: 0.1,
      linkedinURL: "https://www.linkedin.com/in/janhvi-katakdhond-870614264?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      initials: "PS",
      name: "Geet (Malhar) Malavade",
      role: "FINANCE HEAD",
      phone: " +91 80871 05728",
      delay: 0.2,
      linkedinURL: " https://www.linkedin.com/in/geet-malavade-38b9b22a7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      initials: "JK",
      name: "Pranav Shinde",
      role: "OPERATION HEAD",
      phone: "+91 91455 98468",
      delay: 0.3,
      linkedinURL: " https://www.linkedin.com/in/pranav-shinde-b68230283?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % cards.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4efff] to-white pt-20 sm:pt-24 md:pt-28 px-3 sm:px-4 md:px-6 pb-8 sm:pb-12 hide-scrollbar">
      <div className="font-['Poppins',sans-serif] overflow-x-hidden antialiased">
        <style>{`
          @keyframes slideUp { 
            from { opacity: 0; transform: translateY(40px); } 
            to { opacity: 1; transform: translateY(0); } 
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          .animate-fade-in-up { animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .shimmer-effect {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            background-size: 1000px 100%;
            animation: shimmer 2s infinite;
          }
          .glass-effect {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }
          .stagger-1 { animation-delay: 0.1s; } 
          .stagger-2 { animation-delay: 0.2s; } 
          .stagger-3 { animation-delay: 0.3s; }
        `}</style>

        {/* --- HERO SECTION --- */}
        <div className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
          {/* Floating decorative elements - hidden on mobile */}
          <div className="hidden sm:block absolute top-20 left-4 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-purple-300 rounded-full opacity-20 animate-float blur-xl"></div>
          <div className="hidden sm:block absolute bottom-20 right-4 sm:right-10 w-16 sm:w-32 h-16 sm:h-32 bg-blue-300 rounded-full opacity-20 animate-float blur-xl" style={{animationDelay: '1s'}}></div>
          <div className="hidden md:block absolute top-1/2 left-1/4 w-12 sm:w-16 h-12 sm:h-16 bg-pink-300 rounded-full opacity-20 animate-float blur-xl" style={{animationDelay: '0.5s'}}></div>

          <div className="text-center max-w-4xl mx-auto relative z-10 w-full px-2 sm:px-4">
            {/* Badge */}
            <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-effect mb-4 sm:mb-6 ${isVisible ? 'animate-fade-in-down' : 'opacity-0'}`}>
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-purple-700">🚀 About MakeTechBerry</span>
            </div>

            {/* Main Heading */}
            <h1 className={`text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2 ${isVisible ? 'animate-fade-in-up opacity-0' : 'opacity-0'}`}>
              <span className="text-gray-900">About </span>
              <span className="gradient-text relative inline-block">
                MakeTechBerry
                <div className="absolute inset-0 shimmer-effect"></div>
              </span>
            </h1>

            {/* Subheading */}
            <p className={`text-sm sm:text-base md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2 ${isVisible ? 'animate-fade-in-up opacity-0 delay-200' : 'opacity-0'}`}>
              A Pune-based startup founded in 2025, dedicated to <span className="text-purple-600 font-semibold">revolutionizing tech education</span> through comprehensive training and internship programs, while enabling <span className="text-blue-600 font-semibold">companies to submit real-world projects</span> that are built by our talented intern teams.
            </p>

            {/* Feature Pills */}
            <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 mt-8 sm:mt-12 px-2 ${isVisible ? 'animate-fade-in-up opacity-0 delay-300' : 'opacity-0'}`}>
              {['Innovation', 'Mentorship', 'Excellence', 'Practical'].map((feature, index) => (
                <span
                  key={index}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-default"
                  style={{animationDelay: `${0.4 + index * 0.1}s`}}
                >
                  ✨ {feature}
                </span>
              ))}
            </div>

            {/* Stats Section */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16 px-2 ${isVisible ? 'animate-fade-in-up opacity-0 delay-300' : 'opacity-0'}`}>
              {[
                { number: '500+', label: 'Interns Placed' },
                { number: '100+', label: 'Projects Completed' },
                { number: '50+', label: 'Partner Companies' }
              ].map((stat, index) => (
                <div key={index} className="glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Story Slider */}
        <div className="md:hidden px-6 mt-[-80px] relative z-30 pb-20">
          <div className="bg-white rounded-[32px] p-10 shadow-2xl border border-gray-100">
            <div className="mb-6 w-12 h-12 rounded-xl flex items-center justify-center bg-[#E7DEFE]">
              {cards[currentSlide].icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[#181E4B]">
              {cards[currentSlide].title}
            </h3>
            <p className="text-[#5E6282] leading-relaxed">
              {cards[currentSlide].content}
            </p>
            <div className="flex justify-between items-center mt-12">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex gap-2">
                {cards.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${currentSlide === i ? "w-6 bg-#E7DEFE" : "w-1.5 bg-slate-200"}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg active:scale-90 transition-transform"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* --- VALUES SECTION --- */}
        <section className="py-24 max-w-7xl mx-auto px-6 text-center">
          <p className="text-black font-bold uppercase tracking-[0.2em] text-sm mb-4">
            Our Principles
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {valueItems.map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50 hover:-translate-y-4 hover:shadow-2xl transition-all duration-700 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.15 + 0.5}s` }}
              >
                <div className="mx-auto mb-8 w-16 h-16 flex items-center justify-center rounded-2xl bg-[#E7DEFE] text-[#9062FF] group-hover:rotate-[10deg] transition-all shadow-lg">
                  {React.cloneElement(item.icon, { size: 28 })}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#181E4B]">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- TESTIMONIALS SECTION --- */}
        <section className="py-24 bg-white/50 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-24">
              <p className="text-black font-bold uppercase tracking-[0.2em] text-sm mb-4">
                Success Stories
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-black">
                What Students Say
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-y-24">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} index={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* --- FOUNDING MEMBERS SECTION --- */}
        <section className="relative py-24">
          <div className="absolute top-0 left-0 w-full h-[460px] bg-[#E7DEFE] -z-10 rounded-b-[120px]" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Leadership
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Founding Members
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {members.map((member, index) => (
                <FoundingMemberCard
                  key={index}
                  {...member}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default function App() {
  return <AboutPage />;
}
