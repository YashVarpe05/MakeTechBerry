import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

const floatingShapes = [
  { size: 120, color: "from-purple-500/20 to-indigo-500/20", x: "10%", y: "20%", delay: 0 },
  { size: 80, color: "from-pink-500/15 to-rose-500/15", x: "80%", y: "15%", delay: 0.5 },
  { size: 60, color: "from-blue-500/20 to-cyan-500/20", x: "70%", y: "70%", delay: 1 },
  { size: 100, color: "from-amber-500/15 to-orange-500/15", x: "20%", y: "75%", delay: 1.5 },
  { size: 40, color: "from-emerald-500/20 to-green-500/20", x: "50%", y: "10%", delay: 0.8 },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950 flex items-center justify-center relative overflow-hidden px-4">
      {/* Floating background shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-xl`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Glitch 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative"
        >
          <h1 className="text-[160px] sm:text-[200px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/10 select-none">
            404
          </h1>
          {/* Glow effect */}
          <div className="absolute inset-0 text-[160px] sm:text-[200px] font-black leading-none text-purple-500/20 blur-2xl select-none pointer-events-none">
            404
          </div>
        </motion.div>

        {/* Search icon with pulse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center -mt-6 mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center"
          >
            <Search className="w-7 h-7 text-purple-400" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Page Not Found
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
        >
          <Link
            to="/"
            className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Home className="w-4.5 h-4.5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <ArrowLeft className="w-4.5 h-4.5 group-hover:-translate-x-0.5 transition-transform" />
            Go Back
          </button>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4 text-xs text-slate-600 tracking-wide uppercase"
        >
          MakeTechBerry • Error 404
        </motion.p>
      </div>
    </div>
  );
}
