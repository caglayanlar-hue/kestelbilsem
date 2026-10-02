import React, { useState } from 'react';
import { Story } from '../types';
import { BookCoverArt } from './BookCoverArt';
import {
  BookOpen,
  Bookmark,
  MessageCircle,
  HelpCircle,
  PenTool,
  Save,
  Check,
  User,
  Quote
} from 'lucide-react';

interface BookGuideTabProps {
  stories: Story[];
  notes: Record<string, string>;
  onSaveNote: (storyId: string, text: string) => void;
}

export const BookGuideTab: React.FC<BookGuideTabProps> = ({
  stories,
  notes,
  onSaveNote
}) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const currentStory = stories[selectedStoryIndex] || stories[0];

  // Notes state
  const [currentNote, setCurrentNote] = useState(notes[currentStory.id] || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSelectStory = (idx: number) => {
    setSelectedStoryIndex(idx);
    setCurrentNote(notes[stories[idx].id] || '');
    setSavedSuccess(false);
  };

  const handleSaveNote = () => {
    onSaveNote(currentStory.id, currentNote);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/70 text-purple-800 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>"Aile Dediğin" Kitabı Sohbet Kılavuzu</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900">
            Aile Sohbet Rehberi
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Hikayeleri kitabınızdan ailecek okuyun, ardından buradaki sorularla derin bir aile sohbeti başlatın.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Table of Contents Sidebar */}
        <div className="w-full lg:w-1/3 xl:w-1/4">
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden sticky top-24">
            <div className="bg-purple-50/70 px-5 py-4 border-b border-purple-100 flex items-center justify-between">
              <h3 className="font-serif text-sm font-bold text-purple-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-purple-500" />
                <span>İçindekiler</span>
              </h3>
              <span className="text-[11px] font-semibold text-purple-700">
                {stories.length} Bölüm
              </span>
            </div>

            <div className="p-2 space-y-1">
              {stories.map((story, idx) => {
                const isSelected = idx === selectedStoryIndex;
                const hasNotes = Boolean(notes[story.id] && notes[story.id].trim());

                return (
                  <button
                    key={story.id}
                    onClick={() => handleSelectStory(idx)}
                    className={`w-full text-left px-3.5 py-3 rounded-2xl transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-purple-100/70 text-purple-950 font-bold border border-purple-200/80 shadow-2xs'
                        : 'text-stone-700 hover:bg-stone-50 border border-transparent'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs truncate">{story.title}</div>
                      <div className="text-[10px] text-stone-400 font-normal truncate mt-0.5">
                        {story.author}
                      </div>
                    </div>
                    {hasNotes && (
                      <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" title="Not var" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Book Cover Snippet in Sidebar */}
            <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex flex-col items-center">
              <BookCoverArt size="sm" className="mb-2" />
              <p className="text-[11px] text-stone-500 text-center">
                Hikayelerin tamamı için &ldquo;Aile Dediğin&rdquo; kitabınızı yanınızda bulundurun.
              </p>
            </div>
          </div>
        </div>

        {/* Reading & Discussion Area */}
        <div className="w-full lg:w-2/3 xl:w-3/4 space-y-6">
          <div className="bg-[#fffdf9] p-6 md:p-10 rounded-3xl border border-stone-200/90 shadow-sm relative">
            {/* Header info */}
            <div className="text-center mb-8 border-b border-stone-200/70 pb-6">
              <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 mb-2">
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span>Yazar / Derleyen: <strong className="text-stone-800">{currentStory.author}</strong></span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-2">
                {currentStory.title}
              </h2>
              <div className="w-16 h-0.5 bg-purple-200 mx-auto mt-3" />
            </div>

            {/* Story Content / Invitation */}
            {currentStory.isForeword ? (
              <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed font-serif text-sm md:text-base space-y-4 whitespace-pre-line">
                {currentStory.content}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Reading Callout */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50/70 rounded-2xl p-6 border border-amber-200/80 text-center shadow-2xs">
                  <BookOpen className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                  <h4 className="text-base font-bold font-serif text-amber-950 mb-1">
                    Okuma Zamanı: Kitabınızı Açın
                  </h4>
                  <p className="text-xs md:text-sm text-stone-600 max-w-md mx-auto">
                    Lütfen <strong className="text-stone-900">&ldquo;{currentStory.title}&rdquo;</strong> adlı hikayeyi <strong>Aile Dediğin</strong> kitabınızdan sırayla veya sesli olarak okuyun.
                  </p>
                </div>

                <div className="text-stone-700 leading-relaxed font-serif text-sm md:text-base bg-white/70 p-5 rounded-2xl border border-stone-200/70">
                  <p className="italic text-stone-600">{currentStory.content}</p>
                </div>
              </div>
            )}

            {/* Family Chat Topic */}
            {currentStory.chatTopic && (
              <div className="mt-8 bg-teal-50/70 p-5 md:p-6 rounded-2xl border border-teal-100 shadow-2xs">
                <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider mb-2">
                  <MessageCircle className="w-4 h-4 text-teal-600" />
                  <span>Aile Sohbeti Gündemi</span>
                </div>
                <p className="text-teal-950 text-sm md:text-base font-medium leading-relaxed">
                  {currentStory.chatTopic}
                </p>
              </div>
            )}

            {/* Reflection Questions */}
            {currentStory.questions && currentStory.questions.length > 0 && (
              <div className="mt-8 pt-8 border-t border-stone-200/80">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base md:text-lg text-stone-900">
                      Üzerine Düşünelim & Konuşalım
                    </h4>
                    <p className="text-xs text-stone-500">
                      Hikayeyi okuduktan sonra bu soruları çayınız eşliğinde ailecek tartışın.
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {currentStory.questions.map((q, idx) => (
                    <li
                      key={idx}
                      className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs flex items-start gap-3.5 hover:border-purple-200 transition-colors"
                    >
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs md:text-sm font-medium text-stone-800 leading-relaxed">
                        {q}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive Family Journal / Notes */}
            <div className="mt-8 pt-8 border-t border-stone-200/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-amber-600" />
                  <span className="font-serif font-bold text-sm text-stone-900">
                    Ailemizin Bu Hikayeden Çıkardığı Notlar
                  </span>
                </div>
                {savedSuccess && (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 animate-fade-in">
                    <Check className="w-3.5 h-3.5" />
                    <span>Kaydedildi</span>
                  </span>
                )}
              </div>

              <textarea
                rows={3}
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Ailecek konuştuklarımız, aldığımız kararlar veya çocuklarımızın söylediği güzel sözleri buraya not edin..."
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 text-xs md:text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white resize-none"
              />

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Notu Kaydet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
