import React from 'react';
import { BookOpen, Users, Terminal, GraduationCap, ArrowRight } from 'lucide-react';

const TrainingSection = () => {
  const trainingFeatures = [
    { title: "Technical Workshops", icon: <Terminal size={24} />, color: "bg-blue-50 text-blue-600" },
    { title: "Hands-on Training", icon: <BookOpen size={24} />, color: "bg-green-50 text-green-600" },
    { title: "Guest Lectures", icon: <Users size={24} />, color: "bg-orange-50 text-orange-600" },
    { title: "Bootcamps", icon: <GraduationCap size={24} />, color: "bg-purple-50 text-purple-600" }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-purple-50 border border-purple-100 rounded-full">
              <span className="text-purple-600 text-sm font-bold tracking-wide uppercase">Learning Hub</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1]">
              Training, Workshops & <br />
              <span className="text-purple-600">Knowledge Sharing</span>
            </h2>
            
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Training remains a core part of our identity. We focus on bridging the skill gap by providing industry-relevant exposure.
              </p>
              <p className="font-medium">
                We have successfully completed multiple workshops and continue to expand our learning initiatives through both <span className="text-gray-900 underline decoration-purple-400 decoration-2">online and offline modes</span>.
              </p>
            </div>

            <button className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-purple-600 transition-all shadow-xl shadow-gray-200">
              Join a Program
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Right Side: Bento Grid Layout (Differs from normal cards) */}
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4">
              {trainingFeatures.map((item, index) => (
                <div 
                  key={index}
                  className={`relative p-8 rounded-[2rem] border-2 border-gray-200 bg-white
                    flex flex-col justify-between h-48
                    transition-all duration-300 ease-in-out
                    hover:-translate-y-2 hover:shadow-xl hover:border-purple-300 hover:z-20
                    group
                    ${index >= 2 ? "-mt-10" : ""}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 leading-tight">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrainingSection;