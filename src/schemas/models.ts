export enum UserRole {
  STUDENT = 'STUDENT',
  ACCUSER = 'ACCUSER',
  DEPT_OF_JUSTICE = 'DEPT_OF_JUSTICE',
  ADMIN = 'ADMIN',
}

export interface BaseUser {
  firebaseUID: string;
  role: UserRole;
  name: string;
}

export interface Student extends BaseUser {
  role: UserRole.STUDENT;
  studentNumber: number;
  penaltyPoints: number;
  rewardPoints: number;
  hasCourt: boolean;
}

export interface CorrectionLog {
  _id: string;
  correctedDoc: string;
  date: string;
  description: string;
}

export interface AlertLog{
  _id: string;
  recipientId: string;
  date: string;
  description: string;
  isRead: boolean;
}