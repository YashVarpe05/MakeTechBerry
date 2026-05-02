import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react";

const ToastContext = createContext(null);

let toastIdCounter = 0;

const TOAST_STYLES = {
  success: {
    bg: "bg-gradient-to-r from-emerald-500 to-green-600",
    icon: CheckCircle,
    border: "border-emerald-400/30",
  },
  error: {
    bg: "bg-gradient-to-r from-red-500 to-rose-600",
    icon: XCircle,
    border: "border-red-400/30",
  },
  warning: {
    bg: "bg-gradient-to-r from-amber-500 to-orange-600",
    icon: AlertTriangle,
    border: "border-amber-400/30",
  },
  info: {
    bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
    icon: Info,
    border: "border-blue-400/30",
  },
};

function ToastItem({ toast, onDismiss }) {
  const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info;
  const Icon = style.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`
        ${style.bg} ${style.border}
        relative flex items-start gap-3 px-4 py-3.5 rounded-xl
        text-white shadow-2xl shadow-black/20
        border backdrop-blur-sm
        min-w-[320px] max-w-[420px]
        cursor-pointer
      `}
      onClick={() => onDismiss(toast.id)}
    >
      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: (toast.duration || 4000) / 1000, ease: "linear" }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/40 origin-left rounded-b-xl"
      />

      <Icon className="w-5 h-5 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="font-semibold text-sm leading-tight">{toast.title}</p>
        )}
        <p className={`text-sm ${toast.title ? "mt-0.5 text-white/90" : "font-medium"} leading-snug`}>
          {toast.message}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDismiss(toast.id);
        }}
        className="shrink-0 p-0.5 rounded-md hover:bg-white/20 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = "info", title, message, duration = 4000 }) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    return id;
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    {
      success: (message, title) => addToast({ type: "success", message, title }),
      error: (message, title) => addToast({ type: "error", message, title }),
      warning: (message, title) => addToast({ type: "warning", message, title }),
      info: (message, title) => addToast({ type: "info", message, title }),
    },
    [addToast]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={dismissToast} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
