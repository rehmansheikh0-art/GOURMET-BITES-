import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, CheckCircle2, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  return (
    <div id="toast-container" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = CheckCircle2;
          let iconColor = 'text-[#D4AF37]';
          let borderAccent = 'border-[#D4AF37]/40';

          if (toast.type === 'cart') {
            Icon = ShoppingBag;
            iconColor = 'text-[#D4AF37]';
          } else if (toast.type === 'wishlist') {
            Icon = Heart;
            iconColor = 'text-[#D4AF37]';
            borderAccent = 'border-[#D4AF37]/50';
          } else if (toast.type === 'info') {
            Icon = Info;
            iconColor = 'text-[#C5A059]';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`pointer-events-auto flex items-start gap-3.5 p-4 bg-[#26140D] border ${borderAccent} shadow-2xl backdrop-blur-md text-[#F5E6D3]`}
            >
              <div className={`p-2 bg-[#1A0F0A] border border-[#C5A059]/30 shrink-0 ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 pr-2">
                <h4 className="text-sm font-semibold text-[#F5E6D3] tracking-wide">{toast.title}</h4>
                <p className="text-xs text-[#F5E6D3]/70 mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
              <button
                id={`toast-close-${toast.id}`}
                onClick={() => removeToast(toast.id)}
                className="text-[#F5E6D3]/50 hover:text-[#D4AF37] transition-colors p-1 cursor-pointer"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
