import React, { useState, useEffect } from 'react';
import { Users, Calendar, Clock, MapPin, Activity, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function Workshop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['All', 'Development', 'Design', 'Data Science', 'Infrastructure'];

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/workshops');
      
      if (response.data?.success) {
        setWorkshops(response.data.data);
      } else {
        throw new Error("Failed to fetch workshops data");
      }
    } catch (err) {
      console.error('Failed to fetch workshops:', err);
      setError('Unable to load workshops at this time. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkshops = activeCategory === 'All' 
    ? workshops 
    : workshops.filter(w => w.category === activeCategory);

  const getStatusColor = (status) => {
    if (!status) return 'text-blue-600 bg-blue-50 border-blue-100';
    switch(status.toLowerCase()) {
      case 'open':
      case 'completed': 
        return 'text-green-600 bg-green-50 border-green-100';
      case 'closed':
        return 'text-red-600 bg-red-50 border-red-100';
      default: 
        return 'text-purple-600 bg-purple-50 border-purple-100';
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
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 font-medium">Loading workshops...</p>
            </div>
          </div>
        ) : error ? (
           <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-red-700 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
            {filteredWorkshops.map((workshop) => (
              <div 
                key={workshop._id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={workshop.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"} 
                    alt={workshop.title || "Workshop Event"}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" }}
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${getStatusColor(workshop.status)}`}>
                      {workshop.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 z-20">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-black/50 backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                      <Users size={14} /> {workshop.capacity || 50} Spots
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {workshop.category || "General"}
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
                      <span className="font-medium truncate">{workshop.date || "TBD"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{workshop.duration || "TBD"}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin className="w-4 h-4 text-pink-500" />
                      <span className="font-medium truncate">{workshop.location || "TBD"}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {workshop.tags && workshop.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                      {workshop.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs font-semibold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-4 mt-auto border-t border-slate-100">
                    <div className="text-sm">
                      <span className="text-slate-400 block text-xs font-medium mb-0.5">Instructor</span>
                      <span className="font-semibold text-slate-800">{workshop.instructor || "TBA"}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredWorkshops.length === 0 && (
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
