import React, { useState, useEffect } from 'react';
import { FamilyMember, Activity, Story, MeetingRecord, TaskItem } from './types';
import {
  INITIAL_ACTIVITIES,
  INITIAL_STORIES,
  INITIAL_TASKS,
  DEFAULT_MEMBERS
} from './data/initialData';
import { Header, TabKey } from './components/Header';
import { WelcomeModal } from './components/WelcomeModal';
import { HomeTab } from './components/HomeTab';
import { DailyActivitiesTab } from './components/DailyActivitiesTab';
import { BookGuideTab } from './components/BookGuideTab';
import { FamilyMeetingTab } from './components/FamilyMeetingTab';
import { CommunicationTab } from './components/CommunicationTab';
import { TasksTab } from './components/TasksTab';
import { Heart } from 'lucide-react';

const STORAGE_KEYS = {
  MEMBERS: 'aile_baglari_members',
  MEETINGS: 'aile_baglari_meetings',
  TASKS: 'aile_baglari_tasks',
  NOTES: 'aile_baglari_notes',
  HAS_VISITED: 'aile_baglari_has_visited'
};

export default function App() {
  // Members State
  const [members, setMembers] = useState<FamilyMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEMBERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_MEMBERS;
  });

  // Welcome modal visibility
  const [welcomeModalOpen, setWelcomeModalOpen] = useState<boolean>(() => {
    try {
      const visited = localStorage.getItem(STORAGE_KEYS.HAS_VISITED);
      return !visited;
    } catch {
      return true;
    }
  });

  const [isInitialSetup, setIsInitialSetup] = useState<boolean>(() => {
    try {
      return !localStorage.getItem(STORAGE_KEYS.HAS_VISITED);
    } catch {
      return true;
    }
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  // Activities & Custom Activities
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);

  // Stories
  const [stories] = useState<Story[]>(INITIAL_STORIES);

  // Notes for Book Stories
  const [storyNotes, setStoryNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  // Meetings
  const [meetings, setMeetings] = useState<MeetingRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEETINGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 1,
        date: '28 Eylül 2026',
        reporter: 'Anne',
        issues:
          'Hafta içi herkesin okul ve iş yorgunluğundan dolayı akşam sofrasında acele etmesi. Ekran kullanım süresinin artması.',
        decisions:
          '1. Hafta içi her akşam 20:00 - 21:00 arası telefonlar kutuya konacak.\n2. Cumartesi akşamı ailece mısır patlatılıp film izlenecek.\n3. Sofrayı toplamaya herkes yardım edecek.'
      }
    ];
  });

  // Tasks
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_TASKS;
  });

  // Save to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    } catch {
      // ignore
    }
  }, [members]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEETINGS, JSON.stringify(meetings));
    } catch {
      // ignore
    }
  }, [meetings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(storyNotes));
    } catch {
      // ignore
    }
  }, [storyNotes]);

  // Handler: Add Family Member
  const handleAddMember = (name: string) => {
    const avatarColors = [
      'bg-teal-600',
      'bg-rose-500',
      'bg-amber-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-emerald-600'
    ];
    const newMember: FamilyMember = {
      id: `member-${Date.now()}`,
      name,
      avatarColor: avatarColors[members.length % avatarColors.length]
    };
    setMembers((prev) => [...prev, newMember]);
  };

  // Handler: Remove Family Member
  const handleRemoveMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Close welcome modal
  const handleCloseWelcomeModal = () => {
    setWelcomeModalOpen(false);
    setIsInitialSetup(false);
    try {
      localStorage.setItem(STORAGE_KEYS.HAS_VISITED, 'true');
    } catch {
      // ignore
    }
  };

  // Add custom activity
  const handleAddCustomActivity = (newAct: Activity) => {
    setActivities((prev) => [newAct, ...prev]);
  };

  // Save Story Note
  const handleSaveStoryNote = (storyId: string, text: string) => {
    setStoryNotes((prev) => ({ ...prev, [storyId]: text }));
  };

  // Meeting Handlers
  const handleSaveMeeting = (record: MeetingRecord) => {
    setMeetings((prev) => [record, ...prev]);
  };

  const handleDeleteMeeting = (id: number) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  };

  // Tasks Handlers
  const handleAddTask = (text: string, category?: string) => {
    const newTask: TaskItem = {
      id: Date.now(),
      text,
      assignees: [],
      done: false,
      category: category || 'Genel'
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAssignMember = (taskId: number, memberName: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const exists = t.assignees.includes(memberName);
        const updated = exists
          ? t.assignees.filter((a) => a !== memberName)
          : [...t.assignees, memberName];
        return { ...t, assignees: updated };
      })
    );
  };

  // Calculate today's activity
  const todayDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const todayActivity = activities[todayDayIndex] || activities[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-stone-700 font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        members={members}
        onOpenMembersModal={() => {
          setIsInitialSetup(false);
          setWelcomeModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {activeTab === 'home' && (
          <HomeTab
            onNavigate={setActiveTab}
            members={members}
            tasks={tasks}
            meetings={meetings}
            todayActivity={todayActivity}
            onOpenMembersModal={() => {
              setIsInitialSetup(false);
              setWelcomeModalOpen(true);
            }}
          />
        )}

        {activeTab === 'daily' && (
          <DailyActivitiesTab
            activities={activities}
            onAddCustomActivity={handleAddCustomActivity}
          />
        )}

        {activeTab === 'book' && (
          <BookGuideTab
            stories={stories}
            notes={storyNotes}
            onSaveNote={handleSaveStoryNote}
          />
        )}

        {activeTab === 'chat' && <CommunicationTab />}

        {activeTab === 'tasks' && (
          <TasksTab
            tasks={tasks}
            members={members}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onAssignMember={handleAssignMember}
            onOpenMembersModal={() => {
              setIsInitialSetup(false);
              setWelcomeModalOpen(true);
            }}
          />
        )}

        {activeTab === 'meeting' && (
          <FamilyMeetingTab
            members={members}
            meetings={meetings}
            onSaveMeeting={handleSaveMeeting}
            onDeleteMeeting={handleDeleteMeeting}
            onOpenMembersModal={() => {
              setIsInitialSetup(false);
              setWelcomeModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-rose-500 text-white flex items-center justify-center text-xs">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-serif font-bold text-stone-800 text-sm">
              Aile Bağları: "Aile Dediğin" Platformu
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <span>Sevgi paylaştıkça büyür.</span>
            <span aria-hidden="true">·</span>
            <span>Hümeyra EKMEN & Öğrencileri Eseri Kılavuzu</span>
          </div>
        </div>
      </footer>

      {/* Welcome / Family Members Setup Modal */}
      <WelcomeModal
        isOpen={welcomeModalOpen}
        onClose={handleCloseWelcomeModal}
        members={members}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
        isInitialSetup={isInitialSetup}
      />
    </div>
  );
}
