import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../config/firebaseConfig';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { UserRole } from '../schemas/models';

@Injectable()
export class UserService {
  private readonly usersCollection = db.collection('users');

  async getUser(id: string): Promise<UserResponseDto> {
    const snapshot = await this.usersCollection.doc(id).get();
    if (!snapshot.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return {
      _id: snapshot.id,
      ...snapshot.data(),
    } as UserResponseDto;
  }

  async listUsers(): Promise<UserResponseDto[]> {
    const snapshot = await this.usersCollection.get();
    return snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    })) as UserResponseDto[];
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userData = {
        ...(createUserDto.role === UserRole.STUDENT
        ? {
            penaltyPoints: 0,
            rewardPoints: 0,
            hasCourt: false,
          }
        : {}),
        ...createUserDto,
    };

    const ref = await this.usersCollection.add(userData);

    return {
      _id: ref.id,
      ...userData,
    } as UserResponseDto;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const docRef = this.usersCollection.doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updateData = { ...updateUserDto } as { [key: string]: any };
    await docRef.update(updateData);

    const updatedDoc = await docRef.get();;
    return {
      _id: updatedDoc.id,
      ...updatedDoc.data(),
    } as UserResponseDto;
  }

  async deleteUser(id: string): Promise<void> {
    const docRef = this.usersCollection.doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await docRef.delete();
  }

  async getUsername(id: string): Promise<string> {
    const snapshot = await this.usersCollection.doc(id).get();
    if (!snapshot.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return snapshot.data()!.name
  }
}
