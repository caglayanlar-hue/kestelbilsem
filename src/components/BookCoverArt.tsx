import React from 'react';
import { Heart, Sparkles, BookOpen } from 'lucide-react';

interface BookCoverArtProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BookCoverArt: React.FC<BookCoverArtProps> = ({ className = '', size = 'md' }) => {
  const heightClass = size === 'sm' ? 'h-52 w-36' : size === 'lg' ? 'h-[440px] w-72' : 'h-80 w-52';

  return (
    <div
      className={`relative rounded-2xl shadow-xl overflow-hidden border-4 border-white/90 bg-gradient-to-br from-rose-100 via-amber-50 to-teal-50 flex flex-col justify-between p-6 select-none transition-transform duration-300 hover:scale-[1.02] ${heightClass} ${className}`}
      style={{
        boxShadow: '0 20px 25px -5px rgba(180, 83, 9, 0.15), 0 8px 10px -6px rgba(180, 83, 9, 0.1)'
      }}
    >
      {/* Decorative Book Spine Texture */}
      <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-stone-400/20 via-stone-300/10 to-transparent" />
      <div className="absolute top-0 bottom-0 left-2 w-px bg-white/40" />

      {/* Subtle background ornamentation */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-200/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-teal-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header on Book */}
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-1.5 text-rose-500/80 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-stone-600">Öğrenci Yazarlar & Rehberlik</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div className="h-px w-16 mx-auto bg-stone-300/60 my-2" />
      </div>

      {/* Main Title & Hearth Illustration */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
        {/* Hearth & Family SVG Vector Iconography */}
        <div className="relative mb-3 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-200/60 to-rose-200/60 flex items-center justify-center border border-white/70 shadow-inner">
            <svg viewBox="0 0 64 64" className="w-12 h-12 text-amber-700/85 fill-current">
              {/* Family Silhouette (Father, Child, Mother) */}
              <circle cx="22" cy="18" r="5" />
              <path d="M14 36c0-6 4-10 8-10s8 4 8 10v4H14v-4z" />
              <circle cx="42" cy="20" r="4.5" />
              <path d="M35 37c0-5 3.5-9 7-9s7 4 7 9v3H35v-3z" />
              <circle cx="32" cy="27" r="3.5" />
              <path d="M26 42c0-4 3-7 6-7s6 3 6 7v3H26v-3z" />
              {/* Hearth Foundation */}
              <path d="M8 50h48v3H8z" opacity="0.6" />
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm text-rose-500">
            <Heart className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-stone-800 leading-tight">
          Aile Dediğin
        </h3>
        <p className="text-xs text-stone-600 font-serif italic mt-1 max-w-[180px]">
          İnsanın ruhunu ısıtan en eski ocak
        </p>
      </div>

      {/* Bottom Footer on Book */}
      <div className="relative z-10 text-center pt-2 border-t border-stone-200/60">
        <p className="text-[11px] font-medium text-stone-600">
          Proje & Editör: <strong className="font-semibold text-stone-800">Hümeyra EKMEN</strong>
        </p>
        <div className="mt-1 flex items-center justify-center gap-1 text-[10px] text-stone-500">
          <BookOpen className="w-3 h-3" />
          <span>Hikayeler & Sohbet Rehberi</span>
        </div>
      </div>
    </div>
  );
};
