import React, { useState } from 'react';
import { TabKey } from './Header';
import { FamilyMember, TaskItem, MeetingRecord, Activity } from '../types';
import { INITIAL_LOVE_WORDS } from '../data/initialData';
import { BookCoverArt } from './BookCoverArt';
import {
  Quote,
  RefreshCw,
  Sparkles,
  Coffee,
  BookOpen,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Users,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';

interface HomeTabProps {
  onNavigate: (tab: TabKey) => void;
  members: FamilyMember[];
  tasks: TaskItem[];
  meetings: MeetingRecord[];
  todayActivity: Activity;
  onOpenMembersModal: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onNavigate,
  members,
  tasks,
  meetings,
  todayActivity,
  onOpenMembersModal
}) => {
  const [loveWordIndex, setLoveWordIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const handleNextLoveWord = () => {
    setIsRotating(true);
    setTimeout(() => {
      setLoveWordIndex((prev) => (prev + 1) % INITIAL_LOVE_WORDS.length);
      setIsRotating(false);
    }, 150);
  };

  const completedTasksCount = tasks.filter((t) => t.done).length;
  const taskPercent = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;
  const latestMeeting = meetings.length > 0 ? meetings[0] : null;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50/80 via-white to-rose-50/70 p-6 md:p-12 border border-stone-200/80 shadow-xs">
        {/* Soft atmospheric gradient blurs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/70 text-rose-800 text-xs font-semibold mb-4">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Sevgiyle Bir Araya Gelen Aile Ocağı</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold font-serif text-stone-900 tracking-tight leading-tight mb-4 text-balance">
            Ailemiz,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-rose-600 to-teal-700">
              En Büyük Hazinemiz
            </span>
          </h1>

          <p className="text-base md:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Modern çağın hızına inat, birbirimize daha sıkı sarılmak, iletişimimizi güçlendirmek ve
            dijital kopukluktan uzaklaşarak &ldquo;biz olma&rdquo; duygusunu yaşatmak için tasarlandı.
          </p>

          {/* Daily Love Word Box */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-7 border border-stone-200/90 shadow-sm max-w-2xl mx-auto text-left relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-rose-50 text-rose-500 shrink-0">
                <Quote className="w-6 h-6 rotate-180" />
              </div>
              <div className="flex-grow">
                <div className="text-xs uppercase tracking-wider font-bold text-rose-600 mb-1">
                  Günün Sevgi ve Takdir Sözcüğü
                </div>
                <p className="text-lg md:text-xl font-medium text-stone-800 italic transition-all duration-200">
                  &ldquo;{INITIAL_LOVE_WORDS[loveWordIndex]}&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="text-xs text-stone-500">
                    Bugün bu cümleyi bir aile ferdinize söylemeyi deneyin.
                  </span>
                  <button
                    onClick={handleNextLoveWord}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                    <span>Başka Sözcük</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Snapshot / Today in Our Family */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card A: Family Members */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Aile Üyelerimiz
            </span>
            <button
              onClick={onOpenMembersModal}
              className="text-xs text-teal-600 hover:text-teal-800 font-semibold"
            >
              Düzenle
            </button>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {members.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-1.5 bg-stone-50 border border-stone-200/80 px-2.5 py-1.5 rounded-xl shrink-0"
              >
                <div className={`w-5 h-5 rounded-full ${m.avatarColor || 'bg-teal-600'} text-white text-[10px] font-bold flex items-center justify-center`}>
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium text-stone-800">{m.name}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-stone-500 mt-2">
            Toplam {members.length} aile üyesi kayıtlı.
          </p>
        </div>

        {/* Card B: Tasks Summary */}
        <div
          onClick={() => onNavigate('tasks')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col justify-between cursor-pointer group hover:border-teal-200 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Ortak Görevler
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-2xl font-bold text-stone-800 tabular-nums">
                {completedTasksCount} / {tasks.length}
              </span>
              <span className="text-xs font-semibold text-emerald-600">%{taskPercent} tamamlandı</span>
            </div>
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${taskPercent}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-stone-500 mt-2 flex items-center gap-1 group-hover:text-teal-700">
            <span>Görev panosuna git</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </p>
        </div>

        {/* Card C: Weekly Meeting Status */}
        <div
          onClick={() => onNavigate('meeting')}
          className="bg-gradient-to-br from-amber-50 to-orange-50/60 p-5 rounded-2xl border border-amber-200/80 shadow-2xs flex flex-col justify-between cursor-pointer group hover:border-amber-300 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Aile Toplantısı
            </span>
            <Coffee className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-stone-900">
              {latestMeeting ? (
                <>Son Toplantı: {latestMeeting.date}</>
              ) : (
                <>Bu haftanın toplantısı henüz yapılmadı</>
              )}
            </div>
            <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
              {latestMeeting ? latestMeeting.decisions : 'Çayınızı demleyin, yeni toplantı tutanağı açın.'}
            </p>
          </div>
          <p className="text-[11px] font-semibold text-amber-800 mt-2 flex items-center gap-1 group-hover:text-amber-900">
            <span>Toplantı salonuna geç</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </p>
        </div>
      </section>

      {/* Feature Navigation Cards Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold font-serif text-stone-900">
            Platform Bölümleri
          </h2>
          <span className="text-xs text-stone-500">Birlikte vakit geçirmek için keşfedin</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Oyun & Etkinlik */}
          <div
            onClick={() => onNavigate('daily')}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-800 mb-1">
                Etkinlikler & Oyunlar
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Her güne özel, ailenizle kaliteli zaman geçirmenizi sağlayacak eğlenceli ve öğretici aktiviteler.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-orange-600">
              <span>Bugün: {todayActivity.day}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Aile Toplantısı */}
          <div
            onClick={() => onNavigate('meeting')}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-800 mb-1">
                Aile Toplantısı
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Çay ve kurabiye eşliğinde haftalık değerlendirme yapın, sorunları ve ihtiyaçları konuşup Word çıktısı alın.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-700">
              <span>Tutanak Hazırla</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Sohbet Rehberi */}
          <div
            onClick={() => onNavigate('book')}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-800 mb-1">
                Sohbet Rehberi
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                &ldquo;Aile Dediğin&rdquo; kitabındaki öyküleri okuyup üzerindeki sorularla derin aile sohbetinizi başlatın.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-purple-600">
              <span>Kitap Öyküleri</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: İletişim Köşesi */}
          <div
            onClick={() => onNavigate('chat')}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl mb-4 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-800 mb-1">
                İletişim Köşesi
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Anlaşmazlıkları suçlamadan (&ldquo;Sen Dili&rdquo; yerine &ldquo;Ben Dili&rdquo;) ile ifade etmeyi öğrenin ve pratik yapın.
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-teal-600">
              <span>Ben Dili Oluştur</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Book Spotlight Feature */}
      <section className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-6 md:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kitap Hakkında</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif mb-3 leading-snug">
            &ldquo;Aile Dediğin&rdquo; Kitabıyla Bağlarınızı Güçlendirin
          </h2>
          <p className="text-stone-300 text-sm leading-relaxed mb-6">
            Öğrencilerimizin samimi kaleminden çıkan hikayeler, her yaştan aile ferdini bir araya getiriyor.
            Ekransız saatler yaratın, kitabınızı açın ve portalımızdaki özel sohbet sorularıyla birbirinizi yeniden keşfedin.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('book')}
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <span>Hikayeleri & Soruları Gör</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('meeting')}
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              <span>Haftalık Toplantı Planla</span>
            </button>
          </div>
        </div>

        <div className="shrink-0 flex items-center justify-center">
          <BookCoverArt size="md" />
        </div>
      </section>
    </div>
  );
};
