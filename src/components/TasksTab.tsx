import React, { useState } from 'react';
import { FamilyMember, TaskItem } from '../types';
import {
  CheckSquare,
  Plus,
  Trash2,
  UserPlus,
  CheckCircle2,
  Users,
  Filter,
  Sparkles,
  Layers
} from 'lucide-react';

interface TasksTabProps {
  tasks: TaskItem[];
  members: FamilyMember[];
  onAddTask: (text: string, category?: string) => void;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onAssignMember: (taskId: number, memberName: string) => void;
  onOpenMembersModal: () => void;
}

export const TasksTab: React.FC<TasksTabProps> = ({
  tasks,
  members,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onAssignMember,
  onOpenMembersModal
}) => {
  const [newTaskInput, setNewTaskInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Genel');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [assigningTaskId, setAssigningTaskId] = useState<number | null>(null);

  const categories = ['Genel', 'Mutfak', 'Temizlik', 'Etkinlik', 'Düzen', 'Alışveriş'];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    onAddTask(newTaskInput.trim(), selectedCategory);
    setNewTaskInput('');
  };

  const filteredTasks = tasks.filter((t) => {
    if (filterAssignee === 'all') return true;
    if (filterAssignee === 'unassigned') return t.assignees.length === 0;
    return t.assignees.includes(filterAssignee);
  });

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-semibold mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Evde Birlikte Yaşama Kültürü</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-stone-900">
            Adil Görev Paylaşımı
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Ev işlerini ve sorumlulukları adilce paylaşmak, ailede &ldquo;biz&rdquo; ve dayanışma duygusunu pekiştirir.
          </p>
        </div>

        {/* Progress Pill */}
        <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs min-w-[200px]">
          <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
            <span className="text-stone-600">Tamamlanan Görevler</span>
            <span className="text-emerald-700 tabular-nums">%{progressPercent}</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Board */}
      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
        {/* Top Controls: Add input & Category */}
        <div className="p-6 bg-stone-50/70 border-b border-stone-200">
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow flex gap-2">
              <input
                type="text"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                placeholder="Yeni bir aile görevi yazın (örn: Çamaşırları katlamak, ekmek almak)..."
                className="flex-grow px-4 py-2.5 rounded-xl border border-stone-300 text-xs md:text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={!newTaskInput.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Görevi Ekle</span>
            </button>
          </form>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-200/60 overflow-x-auto text-xs">
            <span className="text-stone-400 font-semibold flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3" /> Filtrele:
            </span>
            <button
              onClick={() => setFilterAssignee('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterAssignee === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              Tümü ({tasks.length})
            </button>
            <button
              onClick={() => setFilterAssignee('unassigned')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterAssignee === 'unassigned'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:bg-stone-200/60'
              }`}
            >
              Atanmamış
            </button>
            {members.map((m) => (
              <button
                key={m.id}
                onClick={() => setFilterAssignee(m.name)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  filterAssignee === m.name
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:bg-stone-200/60'
                }`}
              >
                <span>{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Task List Table */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50 border-b border-stone-200 text-stone-500 text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 w-12 text-center">Durum</th>
                <th className="py-3 px-4">Görev</th>
                <th className="py-3 px-4 w-28">Kategori</th>
                <th className="py-3 px-4 w-60">Sorumlu(lar)</th>
                <th className="py-3 px-4 w-16 text-center">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 bg-white text-xs md:text-sm">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-stone-400">
                    <CheckCircle2 className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                    <p className="font-medium text-stone-600">Bu filtrede gösterilecek görev yok.</p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Yukarıdaki kutucuktan hemen yeni bir sorumluluk ekleyebilirsiniz.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    className={`transition-colors ${
                      task.done ? 'bg-stone-50/50 text-stone-400' : 'hover:bg-stone-50/80 text-stone-800'
                    }`}
                  >
                    {/* Status Checkbox */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onToggleTask(task.id)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                          task.done
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-stone-300 hover:border-emerald-500 bg-white'
                        }`}
                        title={task.done ? 'Tamamlandı olarak işaretlendi' : 'Tamamla'}
                      >
                        {task.done && <CheckSquare className="w-3.5 h-3.5" />}
                      </button>
                    </td>

                    {/* Task text */}
                    <td className="py-3 px-4">
                      <span className={task.done ? 'line-through text-stone-400' : 'font-medium'}>
                        {task.text}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="text-[11px] text-stone-500 font-semibold">
                        {task.category || 'Genel'}
                      </span>
                    </td>

                    {/* Assignees */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap items-center gap-1.5 relative">
                        {task.assignees.length === 0 ? (
                          <span className="text-[11px] text-stone-400 italic">Kimseye atanmadı</span>
                        ) : (
                          task.assignees.map((a, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-semibold"
                            >
                              {a}
                            </span>
                          ))
                        )}

                        {/* Assign Button */}
                        <button
                          type="button"
                          onClick={() =>
                            setAssigningTaskId(assigningTaskId === task.id ? null : task.id)
                          }
                          className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                          title="Sorumlu Ata / Değiştir"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                        </button>

                        {/* Assignee Dropdown Picker */}
                        {assigningTaskId === task.id && (
                          <div className="absolute top-8 left-0 z-20 bg-white shadow-lg border border-stone-200 rounded-xl p-2 min-w-[140px] animate-fade-in">
                            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 px-1">
                              Aile Üyesi Seç:
                            </div>
                            {members.length === 0 ? (
                              <button
                                type="button"
                                onClick={onOpenMembersModal}
                                className="text-xs text-teal-600 underline p-1 text-left w-full"
                              >
                                Önce üye ekleyin
                              </button>
                            ) : (
                              members.map((m) => (
                                <button
                                  key={m.id}
                                  type="button"
                                  onClick={() => {
                                    onAssignMember(task.id, m.name);
                                    setAssigningTaskId(null);
                                  }}
                                  className="w-full text-left px-2 py-1 text-xs text-stone-700 hover:bg-stone-100 rounded-md font-medium"
                                >
                                  {m.name}
                                </button>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Delete button */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onDeleteTask(task.id)}
                        className="text-stone-300 hover:text-rose-600 p-1 rounded-md transition-colors"
                        title="Görevi Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
