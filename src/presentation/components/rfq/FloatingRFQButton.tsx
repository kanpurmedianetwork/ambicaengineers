import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useRFQ } from '../../context/RFQContext';

export const FloatingRFQButton: React.FC = () => {
  const { totalItemCount, openDrawer } = useRFQ();

  return (
    <button
      onClick={openDrawer}
      className="fixed bottom-6 right-6 z-40 bg-[#EF7D01] hover:bg-[#D66D00] text-white font-bold px-5 py-3.5 rounded-full shadow-xl shadow-orange-500/30 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20"
      aria-label="Open RFQ BOM Schedule"
    >
      <div className="relative">
        <ShoppingCart className="w-5 h-5 text-white" />
        {totalItemCount > 0 && (
          <span className="absolute -top-2.5 -right-2.5 bg-[#0A0F1D] text-white text-[10px] font-mono font-bold rounded-full h-5 w-5 flex items-center justify-center border border-white/30">
            {totalItemCount}
          </span>
        )}
      </div>
      <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">
        RFQ BOM ({totalItemCount})
      </span>
    </button>
  );
};
