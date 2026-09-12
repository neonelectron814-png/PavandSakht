import React from 'react';

export const SkeletonCard: React.FC<{ height?: string }> = ({ height = 'h-64' }) => {
  return (
    <div className={`w-full ${height} rounded-2xl bg-white border border-slate-200 p-5 animate-pulse flex flex-col justify-between shadow-xs`}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200" />
          <div className="space-y-1.5 flex-1">
            <div className="h-4 bg-slate-200 rounded w-2/3" />
            <div className="h-3 bg-slate-100 rounded w-1/3" />
          </div>
        </div>
        <div className="h-28 bg-slate-100 rounded-xl w-full mt-4" />
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <div className="h-4 bg-slate-200 rounded w-24" />
        <div className="h-8 bg-slate-200 rounded-lg w-28" />
      </div>
    </div>
  );
};
