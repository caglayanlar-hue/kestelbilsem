export interface FamilyMember {
  id: string;
  name: string;
  role?: string;
  avatarColor?: string;
}

export interface Activity {
  id: string;
  title: string;
  day: string;
  category: 'Oyun' | 'Sohbet' | 'Etkinlik';
  duration: string;
  iconName: string;
  desc: string;
  rules: string[];
  benefit: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  isForeword?: boolean;
  content: string;
  questions: string[];
  chatTopic: string;
}

export interface MeetingRecord {
  id: number;
  date: string;
  reporter: string;
  attendees?: string[];
  issues: string;
  decisions: string;
}

export interface TaskItem {
  id: number;
  text: string;
  assignees: string[];
  done: boolean;
  category?: string;
  dueDate?: string;
}

export interface QuizQuestion {
  id: number;
  sentence: string;
  type: 'sen' | 'ben';
  explanation: string;
  improvedVersion?: string;
}
