import React, { useState } from 'react';
import { Home, Coffee, Users, Menu, X, BookOpen, MessageSquare, CheckSquare, Sparkles } from 'lucide-react';
import { FamilyMember } from '../types';

export type TabKey = 'home' | 'daily' | 'book' | 'chat' | 'tasks' | 'meeting';

interface HeaderProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  members: FamilyMember[];
  onOpenMembersModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  members,
  onOpenMembersModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { key: TabKey; label: string; icon: React.ReactNode; highlight?: boolean }[] = [
    { key: 'home', label: 'Ana Sayfa', icon: <Home className="w-4 h-4" /> },
    { key: 'daily', label: 'Oyun & Etkinlik', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'book', label: 'Sohbet Rehberi', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'chat', label: 'İletişim Köşesi', icon: <MessageSquare className="w-4 h-4" /> },
    { key: 'tasks', label: 'Görevler', icon: <CheckSquare className="w-4 h-4" /> },
    { key: 'meeting', label: 'Aile Toplantısı', icon: <Coffee className="w-4 h-4" />, highlight: true }
  ];

  const handleTabClick = (key: TabKey) => {
    onSelectTab(key);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Zone 1: Brand Title */}
          <div
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Home className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl md:text-2xl text-stone-900 tracking-tight leading-none">
                Aile Bağları
              </span>
              <span className="text-[10px] text-stone-500 tracking-wider uppercase font-medium mt-0.5">
                "Aile Dediğin" Platformu
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              if (item.highlight) {
                return (
                  <button
                    key={item.key}
                    onClick={() => handleTabClick(item.key)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-amber-500 text-white shadow-xs shadow-amber-500/25'
                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/70'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.key}
                  onClick={() => handleTabClick(item.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-teal-700 bg-teal-50 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Family Members Action */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onOpenMembersModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-medium transition-colors"
              title="Aile Üyelerini Düzenle"
            >
              <Users className="w-3.5 h-3.5 text-stone-500" />
              <span>Ailemiz</span>
              <span className="bg-stone-200 text-stone-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {members.length}
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenMembersModal}
              className="p-2 text-stone-600 hover:text-stone-900"
              title="Aile Üyeleri"
            >
              <Users className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Menü"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 pt-3 pb-5 space-y-1 shadow-lg animate-fade-in">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleTabClick(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : item.highlight
                    ? 'bg-amber-50 text-amber-900 font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
