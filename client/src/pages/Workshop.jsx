import React, { useState } from 'react';
import { Users, Calendar, Clock, MapPin, ExternalLink, Activity } from 'lucide-react';

const WORKSHOPS_DATA = [
  {
    id: 1,
    title: "Full-Stack Web Development Bootcamp",
    category: "Development",
    date: "July 15-16, 2026",
    duration: "16 Hours",
    location: "Virtual & In-person",
    description: "Master the MERN stack in this intensive two-day bootcamp. Learn to build scalable applications from scratch, implement authentication, and deploy your projects.",
    instructor: "Sarah Jenkins, Sr. Engineer",
    capacity: 50,
    tags: ["React", "Node.js", "MongoDB", "Express"],
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "AI & Machine Learning Foundations",
    category: "Data Science",
    date: "August 5, 2026",
    duration: "8 Hours",
    location: "Online",
    description: "An interactive workshop on the practical applications of AI. Build your first neural network, understand fine-tuning models, and integrate AI into existing systems.",
    instructor: "Dr. Alex Chen",
    capacity: 100,
    tags: ["Python", "TensorFlow", "OpenAI"],
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    category: "Design",
    date: "September 12, 2026",
    duration: "4 Hours",
    location: "MakeTechBerry HQ",
    description: "Learn how to design stunning, user-centric interfaces. From wireframing to prototyping in Figma, this workshop covers modern design principles and animations.",
    instructor: "Mia Wong, Principal Designer",
    capacity: 30,
    tags: ["Figma", "UI/UX", "Prototyping"],
    status: "Open",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Cloud Architecture & DevOps",
    category: "Infrastructure",
    date: "October 20-22, 2026",
    duration: "24 Hours",
    location: "Virtual",
    description: "Deep dive into AWS, Docker, and Kubernetes. Learn how to design resilient architectures, automate deployments, and monitor system health.",
    instructor: "James Miller, Cloud Architect",
    capacity: 40,
    tags: ["AWS", "Docker", "CI/CD"],
    status: "Registration Opening Soon",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function Workshop() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Development', 'Design', 'Data Science', 'Infrastructure'];

  const filteredWorkshops = activeCategory === 'All' 
    ? WORKSHOPS_DATA 
    : WORKSHOPS_DATA.filter(w => w.category === activeCategory);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'upcoming': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'open': return 'text-green-600 bg-green-50 border-green-100';
      default: return 'text-purple-600 bg-purple-50 border-purple-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ff] to-white pt-20 sm:pt-24 md:pt-28 px-3 sm:px-4 md:px-6 pb-12">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden min-h-[40vh] md:min-h-[50vh]">
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-48 h-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>

        <div className="text-center max-w-4xl mx-auto z-10 w-full relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/40 mb-6 shadow-sm">
            <Activity className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-800">Learn & Grow with MakeTechBerry</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-slate-900">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Workshops</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Enhance your skills with hands-on sessions led by industry experts. Join our upcoming workshops and advance your career.
          </p>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-white/50 inline-flex shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-md scale-105'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredWorkshops.map((workshop) => (
            <div 
              key={workshop.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={workshop.image} 
                  alt={workshop.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${getStatusColor(workshop.status)}`}>
                    {workshop.status}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 z-20">
                  <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-black/50 backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                    <Users size={14} /> {workshop.capacity} Spots
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {workshop.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {workshop.title}
                </h3>
                
                <p className="text-slate-500 mb-6 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                  {workshop.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6 text-sm text-slate-600 bg-slate-50 rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span className="font-medium truncate">{workshop.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{workshop.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <MapPin className="w-4 h-4 text-pink-500" />
                    <span className="font-medium truncate">{workshop.location}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {workshop.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-semibold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer action */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-slate-400 block text-xs font-medium mb-0.5">Instructor</span>
                    <span className="font-semibold text-slate-800">{workshop.instructor}</span>
                  </div>
                  
                  <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 group/btn">
                    Register
                    <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkshops.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No workshops found</h3>
            <p className="text-slate-500">Check back later for new workshops in this category.</p>
          </div>
        )}
      </main>

      {/* Global minimal CSS for basic animations using Tailwind arbitrary values if not in config */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
