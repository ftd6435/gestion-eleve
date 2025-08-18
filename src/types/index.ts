export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  class: string;
  avatar?: string;
  phone?: string;
  address?: string;
  birthDate?: string;
  gender?: string;
}

export interface Grade {
  id: string;
  subject: string;
  grade: number;
  maxGrade: number;
  date: string;
  type: 'exam' | 'quiz' | 'homework';
}

export interface Attendance {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  subject: string;
}

export interface Payment {
  id: string;
  amount: number;
  description: string;
  date: string;
  status: 'paid' | 'pending';
  receiptUrl?: string;
}

export interface Fee {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'unpaid';
}

export interface Classmate {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  email?: string;
  phone?: string;
}

export interface TimetableSlot {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}