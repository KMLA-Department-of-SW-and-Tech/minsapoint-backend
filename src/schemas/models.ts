export enum UserRole {
  STUDENT = 'STUDENT',
  ACCUSER = 'ACCUSER',
  DEPT_OF_JUSTICE = 'DEPT_OF_JUSTICE',
  ADMIN = 'ADMIN',
}

export interface BaseUser {
  _id: string;
  firebase_uid: string;
  role: UserRole;
  name: string;
}

export interface Student extends BaseUser {
  role: UserRole.STUDENT;
  studentNumber: number;
  penaltyPoints: number;
  rewardPoints: number;
  totalPoints: number;
  hasCourt: boolean;
}

export interface CorrectionLog {
  _id: string;
  correctedDocs: string;
  date: string;
  description: string;
}

