import React, { useState } from 'react';
import { Activity } from '../types';
import {
  Sparkles,
  Dice5,
  CheckCircle2,
  Clock,
  Tag,
  Lightbulb,
  Heart,
  Plus,
  PartyPopper,
  Calendar,
  Utensils,
  Smile,
  Compass,
  Camera,
  Film,
  BookOpen
} from 'lucide-react';

interface DailyActivitiesTabProps {
  activities: Activity[];
  onAddCustomActivity: (newAct: Activity) => void;
}

export const DailyActivitiesTab: React.FC<DailyActivitiesTabProps> = ({
  activities,
  onAddCustomActivity
}) => {
  // Default to today's day index
  const todayDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // 0 is Monday
  const [selectedIndex, setSelectedIndex] = useState(
    todayDayIndex < activities.length ? todayDayIndex : 0
  );
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New activity form state
  const [newTitle, setNewTitle] = useState('');
  const [newDay, setNewDay] = useState('Pazartesi');
  const [newCategory, setNewCategory] = useState<'Oyun' | 'Sohbet' | 'Etkinlik'>('Oyun');
  const [newDuration, setNewDuration] = useState('20 Dk');
  const [newDesc, setNewDesc] = useState('');
  const [newRules, setNewRules] = useState('');
  const [newBenefit, setNewBenefit] = useState('');

  const currentActivity = activities[selectedIndex] || activities[0];
  const isCompleted = completedMap[currentActivity?.id] || false;

  const handleComplete = () => {
    if (!currentActivity) return;
    setCompletedMap((prev) => ({ ...prev, [currentActivity.id]: true }));
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
    }, 6000);
  };

  const handleRandom = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * activities.length);
    } while (nextIndex === selectedIndex && activities.length > 1);
    setSelectedIndex(nextIndex);
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const rulesArr = newRules
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const newAct: Activity = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      day: newDay,
      category: newCategory,
      duration: newDuration,
      iconName: 'Sparkles',
      desc: newDesc.trim(),
      rules: rulesArr.length > 0 ? rulesArr : ['Ailecek eğlenmek esastır.', 'Birbirinize destek olun.'],
      benefit: newBenefit.trim() || 'Aile içi bağı güçlendirir ve mutlu anılar biriktirmeyi sağlar.'
    };

    onAddCustomActivity(newAct);
    setIsAddingNew(false);
    // Reset form
    setNewTitle('');
    setNewDesc('');
    setNewRules('');
    setNewBenefit('');
    // Select newly created
    setSelectedIndex(activities.length);
  };

  // Helper to map icon names
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Smile':
        return <Smile className="w-8 h-8 text-orange-500" />;
      case 'Sparkles':
        return <Sparkles className="w-8 h-8 text-amber-500" />;
      case 'Utensils':
        return <Utensils className="w-8 h-8 text-rose-500" />;
      case 'Compass':
        return <Compass className="w-8 h-8 text-teal-500" />;
      case 'Camera':
        return <Camera className="w-8 h-8 text-indigo-500" />;
      case 'Film':
        return <Film className="w-8 h-8 text-purple-500" />;
      case 'BookOpen':
        return <BookOpen className="w-8 h-8 text-emerald-500" />;
      default:
        return <Sparkles className="w-8 h-8 text-orange-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Haftalık Aile Takvimi</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900">
            Etkinlikler ve Oyunlar
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Birlikte gülmek, öğrenmek ve ekranlardan uzak bağ kurmak için harika öneriler.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRandom}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-2xs transition-colors"
          >
            <Dice5 className="w-4 h-4 text-orange-500" />
            <span>Rastgele Seç</span>
          </button>
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Etkinlik Ekle</span>
          </button>
        </div>
      </div>

      {/* Add Custom Activity Form Modal / Panel */}
      {isAddingNew && (
        <form
          onSubmit={handleSaveCustom}
          className="bg-white rounded-2xl p-6 border border-orange-200 shadow-sm space-y-4 animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-bold text-stone-800 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-orange-500" />
              <span>Ailenize Özel Yeni Bir Etkinlik Ekleyin</span>
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-stone-400 hover:text-stone-600 text-xs font-semibold"
            >
              Vazgeç
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-stone-700 mb-1">Etkinlik Başlığı</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Örn: Hafta Sonu Bisiklet Gezisi"
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Günü</label>
              <select
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-orange-500 outline-none bg-white"
              >
                {['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'].map(
                  (d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Kategori</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-orange-500 outline-none bg-white"
              >
                <option value="Oyun">Oyun</option>
                <option value="Sohbet">Sohbet</option>
                <option value="Etkinlik">Etkinlik</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Açıklama (Nasıl Yapılır?)</label>
              <textarea
                required
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Etkinliğin amacını ve neler yapılacağını özetleyin..."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Kurallar (Her satıra bir kural)</label>
              <textarea
                rows={2}
                value={newRules}
                onChange={(e) => setNewRules(e.target.value)}
                placeholder="1. Herkes katılır.&#10;2. Telefonlar uzakta tutulur."
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs"
            >
              Etkinliği Kaydet
            </button>
          </div>
        </form>
      )}

      {/* Main Grid: Detail View + Plan Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Activity View (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
            {/* Top Bar of Card */}
            <div className="bg-gradient-to-r from-orange-50/90 to-amber-50/80 px-6 py-4 border-b border-orange-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-800 text-sm">
                  {currentActivity.day} Etkinliği
                </span>
                {todayDayIndex === selectedIndex && (
                  <span className="text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded-full font-bold">
                    Bugün
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-600">
                <span className="font-semibold text-orange-700">{currentActivity.category}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  {currentActivity.duration}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 shadow-2xs">
                  {renderIcon(currentActivity.iconName)}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-serif text-stone-900 mb-2">
                    {currentActivity.title}
                  </h3>
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                    {currentActivity.desc}
                  </p>
                </div>
              </div>

              {/* Rules & Steps */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80 mb-6">
                <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Nasıl Oynanır & Kurallar?</span>
                </h4>
                <ul className="space-y-2 text-xs md:text-sm text-stone-700">
                  {currentActivity.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefit Banner */}
              <div className="flex items-start gap-3 bg-teal-50/70 text-teal-900 p-4 rounded-2xl border border-teal-100 text-xs md:text-sm leading-relaxed">
                <Heart className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-teal-950 mb-0.5">
                    Neden Ailemize Faydalı?
                  </strong>
                  <span>{currentActivity.benefit}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="bg-stone-50/80 px-6 py-4 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={handleRandom}
                className="text-xs font-semibold text-stone-600 hover:text-orange-700 flex items-center gap-1.5 transition-colors"
              >
                <Dice5 className="w-4 h-4 text-stone-400" />
                <span>Rastgele Başka Bir Etkinlik</span>
              </button>

              <button
                onClick={handleComplete}
                disabled={isCompleted}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isCompleted
                    ? 'bg-emerald-100 text-emerald-800 cursor-default'
                    : 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs cursor-pointer'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Tamamlandı ✓' : 'Ailecek Tamamladık!'}</span>
              </button>
            </div>
          </div>

          {/* Celebration Banner */}
          {showCelebration && (
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 text-emerald-900 p-6 rounded-2xl border border-emerald-200 text-center animate-fade-in shadow-xs">
              <PartyPopper className="w-10 h-10 text-emerald-600 mx-auto mb-2 animate-bounce" />
              <h4 className="text-lg font-bold font-serif mb-1">
                Tebrikler! Harika Bir Aile Anı Biriktirdiniz!
              </h4>
              <p className="text-xs md:text-sm text-emerald-800 max-w-lg mx-auto">
                Birlikte geçirdiğiniz bu kıymetli anlar, evinize neşe katıyor ve bağlarınızı güçlendiriyor.
              </p>
            </div>
          )}
        </div>

        {/* Activity List Sidebar (1 Column) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden sticky top-24">
            <div className="bg-stone-50 px-5 py-4 border-b border-stone-100 flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-stone-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-stone-500" />
                <span>Haftalık Etkinlik Planı</span>
              </h3>
              <span className="text-[11px] text-stone-500">
                {activities.length} Etkinlik
              </span>
            </div>

            <div className="p-2 divide-y divide-stone-100 max-h-[540px] overflow-y-auto">
              {activities.map((act, idx) => {
                const isSelected = idx === selectedIndex;
                const done = completedMap[act.id];

                return (
                  <button
                    key={act.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3 rounded-2xl transition-all flex items-center gap-3 my-0.5 ${
                      isSelected
                        ? 'bg-orange-50 border border-orange-200 shadow-2xs'
                        : 'hover:bg-stone-50 border border-transparent'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                        isSelected
                          ? 'bg-orange-500 text-white shadow-xs'
                          : done
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {act.day.substring(0, 3)}
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4
                          className={`text-xs font-bold truncate ${
                            isSelected ? 'text-orange-950' : 'text-stone-800'
                          }`}
                        >
                          {act.title}
                        </h4>
                        {done && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                        <span>{act.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{act.duration}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
