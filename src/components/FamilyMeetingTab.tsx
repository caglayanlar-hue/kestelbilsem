import React, { useState } from 'react';
import { FamilyMember, MeetingRecord } from '../types';
import {
  Coffee,
  Calendar,
  UserCheck,
  FileText,
  Save,
  Download,
  Trash2,
  Printer,
  Search,
  CheckCircle2,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface FamilyMeetingTabProps {
  members: FamilyMember[];
  meetings: MeetingRecord[];
  onSaveMeeting: (record: MeetingRecord) => void;
  onDeleteMeeting: (id: number) => void;
  onOpenMembersModal: () => void;
}

export const FamilyMeetingTab: React.FC<FamilyMeetingTabProps> = ({
  members,
  meetings,
  onSaveMeeting,
  onDeleteMeeting,
  onOpenMembersModal
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [meetingDate, setMeetingDate] = useState(todayStr);
  const [reporter, setReporter] = useState(members[0]?.name || '');
  const [issues, setIssues] = useState('');
  const [decisions, setDecisions] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [saveAlert, setSaveAlert] = useState<string | null>(null);

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingDate || !reporter || !issues.trim() || !decisions.trim()) {
      setSaveAlert('Lütfen tüm toplantı tutanak alanlarını doldurun.');
      setTimeout(() => setSaveAlert(null), 3000);
      return;
    }

    const formattedDate = new Date(meetingDate).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const newRecord: MeetingRecord = {
      id: Date.now(),
      date: formattedDate,
      reporter: reporter,
      issues: issues.trim(),
      decisions: decisions.trim()
    };

    onSaveMeeting(newRecord);
    setIssues('');
    setDecisions('');
    setSaveAlert('Toplantı tutanağı başarıyla kaydedildi! 🎉');
    setTimeout(() => setSaveAlert(null), 3000);
  };

  // Word Document export (.doc)
  const exportToWord = (record: MeetingRecord) => {
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Aile Toplantı Tutanağı - ${record.date}</title>
        <style>
          body { font-family: 'Calibri', 'Arial', sans-serif; padding: 40px; color: #333; }
          h1 { color: #b45309; text-align: center; border-bottom: 2px solid #b45309; padding-bottom: 10px; }
          .meta { margin-bottom: 20px; font-size: 14px; background: #fffbeb; padding: 12px; border-radius: 6px; }
          h2 { color: #92400e; font-size: 16px; margin-top: 24px; }
          p { font-size: 14px; line-height: 1.6; }
          .footer { margin-top: 50px; text-align: right; font-style: italic; color: #78716c; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>Haftalık Aile Toplantısı Tutanağı</h1>
        <div class="meta">
          <p><strong>Toplantı Tarihi:</strong> ${record.date}</p>
          <p><strong>Toplantı Raportörü:</strong> ${record.reporter}</p>
        </div>
        <h2>1. Gündem: Aile İçi Sorunlar, İhtiyaçlar ve Görüşler</h2>
        <p>${record.issues.replace(/\n/g, '<br/>')}</p>
        <h2>2. Alınan Ortak Kararlar ve Çözümler</h2>
        <p>${record.decisions.replace(/\n/g, '<br/>')}</p>
        <div class="footer">
          <p>Aile Bağları: "Aile Dediğin" Platformu tarafından oluşturulmuştur.</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Aile_Toplanti_Tutanagi_${record.date.replace(/ /g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Direct print preview
  const handlePrint = (record: MeetingRecord) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Toplantı Tutanağı - ${record.date}</title>
          <style>
            body { font-family: sans-serif; padding: 30px; line-height: 1.6; color: #292524; }
            h1 { color: #b45309; text-align: center; margin-bottom: 5px; }
            .info { border-bottom: 1px solid #e7e5e4; padding-bottom: 15px; margin-bottom: 20px; font-size: 14px; }
            h2 { color: #78350f; font-size: 16px; margin-top: 20px; }
            p { white-space: pre-line; }
          </style>
        </head>
        <body>
          <h1>Aile Toplantı Tutanağı</h1>
          <div class="info">
            <strong>Tarih:</strong> ${record.date} &nbsp;|&nbsp; <strong>Raportör:</strong> ${record.reporter}
          </div>
          <h2>Gündem & Paylaşılan Duygular:</h2>
          <p>${record.issues}</p>
          <h2>Alınan Ortak Kararlar:</h2>
          <p>${record.decisions}</p>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Filtered meetings
  const filteredMeetings = meetings.filter(
    (m) =>
      m.issues.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.decisions.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner - Tea & Cookies */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-100 via-orange-50 to-amber-50 p-6 md:p-8 border border-amber-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 text-amber-900 text-xs font-semibold mb-3">
            <Coffee className="w-3.5 h-3.5" />
            <span>Haftalık Aile Ritüeli</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-amber-950 mb-2">
            Haftalık Aile Toplantısı
          </h2>
          <p className="text-xs md:text-sm text-stone-700 leading-relaxed">
            Çayınızı, ıhlamurunuzu ve fırından yeni çıkmış kurabiyenizi masaya koyun. Bu hafta neleri iyi yaptık,
            neleri geliştirmeliyiz, birbirimize nasıl destek olabiliriz; suçlamadan &ldquo;Ben Dili&rdquo; ile konuşalım.
          </p>
        </div>

        {/* Turkish Tea Glass & Cookie illustration */}
        <div className="shrink-0 flex items-center gap-4 bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-amber-200 shadow-2xs">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-1">
              <Coffee className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-amber-900">Demli Çay & Ihlamur</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mx-auto mb-1">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-orange-900">Ev Kurabiyesi</span>
          </div>
        </div>
      </div>

      {saveAlert && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs md:text-sm font-semibold flex items-center justify-between animate-fade-in shadow-2xs">
          <span>{saveAlert}</span>
        </div>
      )}

      {/* Main Grid: Form + History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form: Left Column (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-200" />
              <h3 className="font-serif font-bold text-sm md:text-base">
                Yeni Toplantı Tutanak Formu
              </h3>
            </div>
            <span className="text-xs bg-amber-800/60 px-2.5 py-1 rounded-full text-amber-100">
              Haftalık Tutanak
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 flex-grow bg-stone-50/40">
            {/* Top Row: Date & Reporter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>Toplantı Tarihi</span>
                </label>
                <input
                  type="date"
                  required
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs md:text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Toplantı Raportörü (Yazan)</span>
                  </label>
                  {members.length === 0 && (
                    <button
                      type="button"
                      onClick={onOpenMembersModal}
                      className="text-[11px] text-teal-600 underline font-semibold"
                    >
                      Üye Ekle
                    </button>
                  )}
                </div>

                <select
                  required
                  value={reporter}
                  onChange={(e) => setReporter(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs md:text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white outline-none"
                >
                  {members.length === 0 ? (
                    <option value="">Aile üyesi bulunamadı</option>
                  ) : (
                    members.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Agenda & Issues */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>1. Gündem: Aile İçi Sorunlar, İhtiyaçlar ve Duygular</span>
              </label>
              <p className="text-[11px] text-stone-500 mb-2">
                Bu hafta hangi konularda yardıma ihtiyacımız oldu? Lütfen suçlayıcı olmadan, &ldquo;Ben Dili&rdquo; kullanarak yazın.
              </p>
              <textarea
                required
                rows={4}
                value={issues}
                onChange={(e) => setIssues(e.target.value)}
                placeholder="Örn: Akşamları herkes kendi odasına çekilince kendimi yalnız hissediyorum. Ev işlerinde biraz daha iş birliğine ihtiyacım var..."
                className="w-full px-4 py-3 border border-stone-300 rounded-2xl text-xs md:text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white resize-none"
              />
            </div>

            {/* Decisions & Solutions */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>2. Alınan Ortak Kararlar ve Çözümler</span>
              </label>
              <p className="text-[11px] text-stone-500 mb-2">
                Birlikte hangi somut kararları aldık? Kim hangi adımı atacak?
              </p>
              <textarea
                required
                rows={4}
                value={decisions}
                onChange={(e) => setDecisions(e.target.value)}
                placeholder="Örn: 1. Her akşam 20:00 - 21:00 arası teknoloji kapatma saati olacak.&#10;2. Yemek sonrası sofra temizliği sırayla yapılacak..."
                className="w-full px-4 py-3 border border-stone-300 rounded-2xl text-xs md:text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Toplantı Tutanaklarını Kaydet</span>
            </button>
          </form>
        </div>

        {/* History: Right Column (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden flex flex-col h-[740px]">
          <div className="bg-stone-50 px-5 py-4 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-stone-500" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-stone-800">
                Geçmiş Toplantı Tutanakları
              </h3>
            </div>
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {meetings.length}
            </span>
          </div>

          {/* Search Box */}
          <div className="p-3 border-b border-stone-100 bg-white">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tutanaklarda ara (karar, raportör, tarih)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-1 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>

          {/* List of Meetings */}
          <div className="p-4 space-y-4 overflow-y-auto flex-grow bg-stone-50/50">
            {filteredMeetings.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400 text-xs">
                <Coffee className="w-10 h-10 text-stone-300 mb-2" />
                <p className="font-medium text-stone-600">Henüz kayıtlı bir toplantı bulunmuyor.</p>
                <p className="mt-1">Çayınızı alın ve soldaki form ile ilk aile toplantınızı kaydedin!</p>
              </div>
            ) : (
              filteredMeetings.map((record) => (
                <div
                  key={record.id}
                  className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-3 relative group animate-fade-in hover:border-amber-200 transition-colors"
                >
                  {/* Top Bar of Record */}
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div>
                      <span className="font-bold text-amber-900 text-xs flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        {record.date}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        Raportör: <strong className="text-stone-700">{record.reporter}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => exportToWord(record)}
                        className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        title="Word Belgesi (.doc) Olarak İndir"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Word</span>
                      </button>
                      <button
                        onClick={() => handlePrint(record)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                        title="Yazdır"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteMeeting(record.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Issues */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                      Gündem & Paylaşılanlar:
                    </span>
                    <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl whitespace-pre-line leading-relaxed">
                      {record.issues}
                    </p>
                  </div>

                  {/* Decisions */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-0.5">
                      Alınan Kararlar:
                    </span>
                    <p className="text-xs text-amber-950 bg-amber-50/80 border border-amber-100 p-2.5 rounded-xl whitespace-pre-line font-medium leading-relaxed">
                      {record.decisions}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
