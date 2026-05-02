import { useToast as useGlobalToast } from "../components/ui/Toast.jsx";

/**
 * Custom hook for managing toast notifications.
 * Wraps the global ToastProvider for backward compatibility with
 * the old showToast(message, type) API used across admin pages.
 */
export const useToast = () => {
  const toast = useGlobalToast();

  const showToast = (message, type = "info") => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else if (type === "warning") {
      toast.warning(message);
    } else {
      toast.info(message);
    }
  };

  // hideToast is now a no-op — the global provider handles auto-dismiss
  const hideToast = () => {};

  return { toast: null, showToast, hideToast };
};
