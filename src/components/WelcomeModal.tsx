import React, { useState, useEffect } from 'react';
import { FamilyMember } from '../types';
import { BookCoverArt } from './BookCoverArt';
import { Plus, X, Users, ArrowRight, Clock, Heart, Quote } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: FamilyMember[];
  onAddMember: (name: string) => void;
  onRemoveMember: (id: string) => void;
  isInitialSetup: boolean;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  members,
  onAddMember,
  onRemoveMember,
  isInitialSetup
}) => {
  const [nameInput, setNameInput] = useState('');
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('tr-TR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const timeStr = now.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentTimeStr(`${dateStr} · ${timeStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!nameInput.trim()) return;
    onAddMember(nameInput.trim());
    setNameInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-stone-200 animate-fade-in my-8">
        {/* Left Side: Book Cover & Warm Quote */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-stone-100 relative">
          <div className="absolute top-4 left-4 text-rose-200">
            <Quote className="w-8 h-8 opacity-40 rotate-180" />
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-800 mb-6 relative z-10 leading-snug">
            &ldquo;Aile, insanın ruhunu ısıtan en eski ocaktır.&rdquo;
          </h2>

          <BookCoverArt size="md" className="mb-4" />

          <p className="text-xs text-stone-500 italic mt-1">
            "Aile Dediğin" Platformu &copy; Birlikte Güçlüyüz
          </p>
        </div>

        {/* Right Side: Setup & Members */}
        <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-between bg-white">
          <div>
            {/* Live Clock */}
            <div className="flex items-center justify-center gap-2 text-teal-700 bg-teal-50/70 border border-teal-100/80 px-4 py-2 rounded-xl text-sm font-medium mb-6">
              <Clock className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{currentTimeStr}</span>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-stone-800 font-serif">
                {isInitialSetup ? 'Hoş Geldiniz' : 'Aile Üyeleri Yönetimi'}
              </h1>
              {!isInitialSetup && (
                <button
                  onClick={onClose}
                  className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <p className="text-stone-600 mb-6 text-sm leading-relaxed">
              {isInitialSetup
                ? 'Portala giriş yapmak, haftalık toplantı tutanaklarını kaydetmek ve görevleri paylaşmak için lütfen aile üyelerinin isimlerini ekleyin.'
                : 'Görev atamaları ve toplantı raportörleri için aile üyelerinizi güncelleyebilirsiniz.'}
            </p>

            {/* Input field */}
            <div className="space-y-4 mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Örn: Anne, Baba, Kerem, Zeynep..."
                  className="flex-grow px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-stone-50 focus:bg-white text-stone-800 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!nameInput.trim()}
                  className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 text-white px-5 py-3 rounded-xl font-semibold transition-colors flex items-center gap-1 shrink-0 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ekle</span>
                </button>
              </div>

              {/* Members List */}
              <div className="bg-stone-50/70 border border-stone-200/80 rounded-2xl p-3 min-h-[120px] max-h-[180px] overflow-y-auto">
                {members.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-400 text-xs py-6">
                    <Users className="w-7 h-7 mb-1 text-stone-300" />
                    <span>Henüz üye eklenmedi. Yukarıdan ekleyebilirsiniz.</span>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {members.map((member) => (
                      <li
                        key={member.id}
                        className="bg-white text-stone-800 px-3.5 py-2 rounded-xl flex justify-between items-center text-sm font-medium border border-stone-200/80 shadow-2xs animate-fade-in"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full ${member.avatarColor || 'bg-teal-600'} text-white flex items-center justify-center text-xs font-bold`}>
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                          <span>{member.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveMember(member.id)}
                          className="text-stone-400 hover:text-rose-500 p-1 rounded-md transition-colors"
                          title="Sil"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={onClose}
            disabled={members.length === 0}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              members.length > 0
                ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-700/20 cursor-pointer'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <span>{isInitialSetup ? 'Portala Giriş Yap' : 'Değişiklikleri Kaydet'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
