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
  schoolPoints: number;
  dormPoints: number;
  rewardPoints: number;
  totalPoints: number;
  hasCourt: boolean;
}

export interface Accuser extends BaseUser {
  role: UserRole.ACCUSER;
}

export interface DeptOfJustice extends BaseUser {
  role: UserRole.DEPT_OF_JUSTICE;
}

export interface Admin extends BaseUser {
  role: UserRole.ADMIN;
}

export type User = Student | Accuser | DeptOfJustice | Admin;

export interface Accusation {
  _id: string;
  accuserId: string;
  defendantId: string;
  date: string;
  article: string;
  schoolPoints: number;
  dormPoints: number;
  valid: boolean;
  courtId: number;
}
