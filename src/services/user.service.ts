import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../config/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { UserRole } from '../schemas/models';

@Injectable()
export class UserService {
  private readonly usersCollection = 'users';

  async getUser(id: string): Promise<UserResponseDto> {
    const userDoc = await getDoc(doc(db, this.usersCollection, id));
    if (!userDoc.exists()) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      _id: userDoc.id,
      ...userDoc.data(),
    } as UserResponseDto;
  }

  async listUsers(): Promise<UserResponseDto[]> {
    const snapshot = await getDocs(collection(db, this.usersCollection));
    return snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    })) as UserResponseDto[];
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userDoc = doc(collection(db, this.usersCollection));
    
    const userData = {
      ...createUserDto,
      ...(createUserDto.role === UserRole.STUDENT
        ? {
            schoolPoints: 0,
            dormPoints: 0,
            rewardPoints: 0,
            totalPoints: 0,
            hasCourt: false
          }
        : {}),
    };

    await setDoc(userDoc, userData);

    return {
      _id: userDoc.id,
      ...userData,
    } as UserResponseDto;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const userDoc = doc(db, this.usersCollection, id);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updateData = { ...updateUserDto } as { [key: string]: any };
    await updateDoc(userDoc, updateData);

    const updatedDoc = await getDoc(userDoc);
    return {
      _id: updatedDoc.id,
      ...updatedDoc.data(),
    } as UserResponseDto;
  }

  async deleteUser(id: string): Promise<void> {
    const userDoc = doc(db, this.usersCollection, id);
    const userSnapshot = await getDoc(userDoc);

    if (!userSnapshot.exists()) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await deleteDoc(userDoc);
  }
}
