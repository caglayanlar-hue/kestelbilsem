import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { COMMUNICATION_QUIZ } from '../data/initialData';
import {
  MessageSquare,
  CheckCircle2,
  XCircle,
  Wand2,
  Copy,
  Check,
  HelpCircle,
  HeartHandshake,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

export const CommunicationTab: React.FC = () => {
  // Generator State
  const [behavior, setBehavior] = useState('');
  const [feeling, setFeeling] = useState('');
  const [request, setRequest] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<'sen' | 'ben' | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const currentQuiz = COMMUNICATION_QUIZ[quizIndex];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!behavior.trim() || !feeling.trim() || !request.trim()) return;

    let b = behavior.trim();
    // Normalize first character
    b = b.charAt(0).toLowerCase() + b.slice(1);

    const message = `Sen ${b}, ben ${feeling}. ${request.trim()}`;
    setGeneratedMessage(message);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!generatedMessage) return;
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQuizAnswer = (answer: 'sen' | 'ben') => {
    if (userAnswer !== null) return;
    setUserAnswer(answer);
    if (answer === currentQuiz.type) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setUserAnswer(null);
    setQuizIndex((prev) => (prev + 1) % COMMUNICATION_QUIZ.length);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-semibold mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Şefkatli İletişim Rehberi</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900">
            İletişim Köşesi
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-3xl">
            Aile içinde anlaşmazlıklar doğaldır. Önemli olan sorunları suçlamadan (&ldquo;Sen Dili&rdquo;) değil,
            duygularımızı ve ihtiyaçlarımızı paylaşarak (&ldquo;Ben Dili&rdquo;) ifade edebilmektir.
          </p>
        </div>
      </div>

      {/* Grid: Theory Comparison + Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Theory & Comparison (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 md:p-8">
            <h3 className="font-serif font-bold text-lg text-stone-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>Sen Dili vs. Ben Dili Arasındaki Fark</span>
            </h3>

            {/* Red Box: Sen Dili */}
            <div className="bg-rose-50/80 rounded-2xl p-5 border border-rose-100 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-rose-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>Sen Dili (Suçlayıcı & Yıkıcı)</span>
                </span>
                <span className="text-[10px] text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full font-semibold">
                  Savunmaya Geçirir
                </span>
              </div>
              <p className="text-xs text-rose-900/80 mb-3 leading-relaxed">
                Davranışa değil doğrudan kişiliğe saldırır, genelleme yapar (&ldquo;her zaman&rdquo;, &ldquo;hiç&rdquo;). Karşı tarafı suçlu hissettirir ve iletişimi kapatır.
              </p>
              <div className="bg-white px-4 py-3 rounded-xl text-stone-800 italic text-xs md:text-sm border border-rose-100 shadow-2xs">
                &ldquo;Beni hiç dinlemiyorsun, sürekli telefonuna bakıyorsun! Çok bencilsin.&rdquo;
              </div>
            </div>

            {/* Green Box: Ben Dili */}
            <div className="bg-teal-50/80 rounded-2xl p-5 border border-teal-100">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-teal-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Ben Dili (Empatik & Çözüm Odaklı)</span>
                </span>
                <span className="text-[10px] text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full font-semibold">
                  Bağ Kurdurur
                </span>
              </div>
              <p className="text-xs text-teal-900/80 mb-3 leading-relaxed">
                Somut davranışı tarif eder, bu davranışın sizde uyandırdığı duyguyu belirtir ve yapıcı bir rica ile tamamlanır.
              </p>
              <div className="bg-white px-4 py-3 rounded-xl text-stone-800 italic text-xs md:text-sm border border-teal-100 shadow-2xs">
                &ldquo;Ben konuşurken ekrana baktığında beni önemsemediğini hissediyorum ve üzülüyorum. Lütfen biraz dinler misin?&rdquo;
              </div>
            </div>

            {/* 3 Steps Recipe */}
            <div className="mt-6 pt-6 border-t border-stone-100">
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-3">
                Ben Dili Formülü (3 Basamak)
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/70">
                  <strong className="block text-stone-800 mb-0.5 font-bold">1. Davranış</strong>
                  <span className="text-[11px] text-stone-500">&ldquo;Sen ... yaptığında&rdquo;</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/70">
                  <strong className="block text-stone-800 mb-0.5 font-bold">2. Duygu</strong>
                  <span className="text-[11px] text-stone-500">&ldquo;Ben ... hissediyorum&rdquo;</span>
                </div>
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/70">
                  <strong className="block text-stone-800 mb-0.5 font-bold">3. İstek</strong>
                  <span className="text-[11px] text-stone-500">&ldquo;Rica etsem ...&rdquo;</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Generator (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl shadow-sm border border-stone-200 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Wand2 className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900">
                &ldquo;Ben Dili&rdquo; Cümle Kurucu
              </h3>
            </div>
            <p className="text-xs text-stone-500 mb-6">
              Duygularınızı kırmadan dökmeden, şefkatle ve net şekilde ifade etmek için aşağıdaki taslağı doldurun.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  1. Hangi Davranış Gerçekleşti? (Somut olay)
                </label>
                <input
                  type="text"
                  required
                  value={behavior}
                  onChange={(e) => setBehavior(e.target.value)}
                  placeholder="Örn: Odaya kapıyı çalmadan girdiğinde..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs md:text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-stone-50/50 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  2. Bu Durumda Ne Hissettin? (Duygunuz)
                </label>
                <select
                  required
                  value={feeling}
                  onChange={(e) => setFeeling(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs md:text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-stone-50/50 focus:bg-white"
                >
                  <option value="" disabled>Bir duygu seçin...</option>
                  <option value="üzülüyorum ve kırılıyorum">Üzülüyorum ve kırılıyorum</option>
                  <option value="öfkeleniyorum ve sabırsızlanıyorum">Öfkeleniyorum ve sabırsızlanıyorum</option>
                  <option value="değersiz ve yalnız hissediyorum">Değersiz ve yalnız hissediyorum</option>
                  <option value="kaygılanıyorum ve endişeleniyorum">Kaygılanıyorum ve endişeleniyorum</option>
                  <option value="yoruluyorum ve çaresiz hissediyorum">Yoruluyorum ve çaresiz hissediyorum</option>
                  <option value="kendimi güvende hissetmiyorum">Kendimi güvende hissetmiyorum</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  3. Çözüm İçin Ne İstiyorsun? (Açık ve nazik rica)
                </label>
                <input
                  type="text"
                  required
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  placeholder="Örn: Lütfen bir dahaki sefere kapıyı tıklar mısın?"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs md:text-sm focus:ring-2 focus:ring-teal-500 outline-none bg-stone-50/50 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs md:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>İfademi Oluştur</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Generated Result Box */}
          {generatedMessage && (
            <div className="mt-6 p-5 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                  Önerilen İletişim Cümlesi:
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Kopyala</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-stone-900 font-medium text-sm md:text-base italic leading-relaxed">
                &ldquo;{generatedMessage}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Quiz Practice Section */}
      <section className="bg-white rounded-3xl shadow-sm border border-stone-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              <h3 className="font-serif font-bold text-lg text-stone-900">
                Ailecek Pratik: Sen Dili mi, Ben Dili mi?
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Cümleyi okuyun, ailecek tahmin edin ve doğru yanıtı öğrenin.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-stone-600">
              Soru {quizIndex + 1} / {COMMUNICATION_QUIZ.length}
            </span>
            <span className="bg-purple-100 text-purple-800 font-bold text-xs px-2.5 py-1 rounded-full">
              Puan: {quizScore}
            </span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="bg-stone-50 p-6 md:p-8 rounded-2xl border border-stone-200">
            <p className="text-stone-900 text-base md:text-lg font-serif italic font-medium leading-relaxed">
              &ldquo;{currentQuiz.sentence}&rdquo;
            </p>
          </div>

          {/* Option buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleQuizAnswer('sen')}
              disabled={userAnswer !== null}
              className={`px-6 py-3 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 shadow-2xs ${
                userAnswer === 'sen'
                  ? currentQuiz.type === 'sen'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-200 text-rose-800'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <XCircle className="w-4 h-4 text-rose-500" />
              <span>Sen Dili</span>
            </button>

            <button
              onClick={() => handleQuizAnswer('ben')}
              disabled={userAnswer !== null}
              className={`px-6 py-3 rounded-xl font-bold text-xs md:text-sm transition-all flex items-center gap-2 shadow-2xs ${
                userAnswer === 'ben'
                  ? currentQuiz.type === 'ben'
                    ? 'bg-teal-600 text-white'
                    : 'bg-teal-200 text-teal-800'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Ben Dili</span>
            </button>
          </div>

          {/* Answer Feedback */}
          {userAnswer !== null && (
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-left animate-fade-in space-y-2">
              <div className="flex items-center gap-2">
                {userAnswer === currentQuiz.type ? (
                  <span className="text-emerald-700 font-bold text-sm flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Doğru Bildiniz!
                  </span>
                ) : (
                  <span className="text-rose-700 font-bold text-sm flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Yanlış Tahmin (Bu bir {currentQuiz.type === 'sen' ? 'Sen Dili' : 'Ben Dili'} cümlesi)
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {currentQuiz.explanation}
              </p>
              {currentQuiz.improvedVersion && (
                <div className="pt-2 text-xs text-teal-900 bg-teal-50 p-2.5 rounded-xl border border-teal-100">
                  <strong>Nasıl söylenmeliydi?</strong>
                  <p className="italic mt-0.5">&ldquo;{currentQuiz.improvedVersion}&rdquo;</p>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuiz}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <span>Sonraki Cümle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
