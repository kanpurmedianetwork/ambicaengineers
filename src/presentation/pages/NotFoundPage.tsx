import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Home, Package, PhoneCall } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0F1D] text-white">
      <SEOHead
        title="Page Not Found (404) | Ambica Engineers"
        description="The page you requested does not exist or has been moved. Explore our hydraulic components catalog or contact Ambica Engineers."
        canonicalPath="/404"
        noindex={true}
      />

      <div className="max-w-xl w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          HTTP 404 &bull; Resource Not Found
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold font-mono tracking-tight text-white">
          404 <span className="text-[#EF7D01]">NOT FOUND</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          The requested engineering resource or page URL is not available. Please verify the URL or explore our core inventory catalog below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-left">
          <Link
            to="/"
            className="flex items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#EF7D01]/50 hover:bg-slate-800/80 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-[#EF7D01]" />
              <div>
                <div className="text-xs font-bold text-white group-hover:text-[#EF7D01] transition-colors">Return Home</div>
                <div className="text-[11px] text-slate-400">Main company portal</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#EF7D01] transition-colors" />
          </Link>

          <Link
            to="/products"
            className="flex items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-[#EF7D01]/50 hover:bg-slate-800/80 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-[#EF7D01]" />
              <div>
                <div className="text-xs font-bold text-white group-hover:text-[#EF7D01] transition-colors">Products Catalog</div>
                <div className="text-[11px] text-slate-400">28+ hydraulic spares</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#EF7D01] transition-colors" />
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-400">
          <span>Need immediate assistance?</span>
          <Link to="/contact" className="text-[#EF7D01] font-semibold hover:underline inline-flex items-center gap-1">
            <PhoneCall className="w-3.5 h-3.5" /> Call Breakdown Desk (+91 7600025020)
          </Link>
        </div>
      </div>
    </div>
  );
};
