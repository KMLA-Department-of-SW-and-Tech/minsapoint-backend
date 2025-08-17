import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../config/firebaseConfig';
import { UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { UserRole } from '../schemas/models';

@Injectable()
export class MeService {
  private readonly usersCollection = db.collection('users');

  async getMe(user: any): Promise<UserResponseDto> {
    const snapshot = await this.usersCollection.where('firebaseUID', '==', user.uid).get();
    if(!snapshot.empty) {
        throw new NotFoundException(`User not found`);
    }
    return {
        _id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
    } as UserResponseDto;
  }

  async updateMe(user:any, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const snapshot = await this.usersCollection.where('firebaseUID', '==', user.uid).limit(1).get();
    if(!snapshot.empty) {
        throw new NotFoundException(`User not found`);
    }

    const updateData = {
        studentNumber: updateUserDto.studentNumber === undefined ? snapshot.docs[0].data().studentNumber : updateUserDto.studentNumber,
        name: updateUserDto.name === undefined ? snapshot.docs[0].data().name : updateUserDto.name,
    }

    const ref = this.usersCollection.doc(snapshot.docs[0].id);
    await snapshot.docs[0].ref.update(updateData);
    
    return {
        ...snapshot.docs[0].data(),
        ...updateData,
    } as UserResponseDto;
  } 
}
