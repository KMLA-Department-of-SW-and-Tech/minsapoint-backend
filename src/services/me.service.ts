import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../config/firebaseConfig';
import { UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { UserRole } from '../schemas/models';
import { AccusationResponseDto, AccusationFilterDto } from '../dto/accusation.dto';
import { AccusationService } from './accusation.service';

@Injectable()
export class MeService {
  private readonly usersCollection = db.collection('users');
  constructor(private readonly accusationService: AccusationService) {}

  async getUserFromFirebaseUID(firebaseUID: string): Promise<UserResponseDto> {
    const snapshot = await this.usersCollection.where('firebaseUID', '==', firebaseUID).limit(1).get();
    if(snapshot.empty) {
      throw new NotFoundException(`User not found`);
    }
    /* remove */
    console.log("meService success");
    console.log(snapshot.docs[0].data());
    return {
      _id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    } as UserResponseDto;
  }
  
  async getMe(firebaseUID: string): Promise<UserResponseDto> {
    const snapshot = await this.usersCollection.where('firebaseUID', '==', firebaseUID).get();
    if(snapshot.empty) {
        throw new NotFoundException(`User not found`);
    }
    return {
        _id: snapshot.docs[0].id,
        ...snapshot.docs[0].data(),
    } as UserResponseDto;
  }

  async updateMe(firebaseUID: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const snapshot = await this.usersCollection.where('firebaseUID', '==', firebaseUID).limit(1).get();
    if(snapshot.empty) {
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

  async getMyAccusations(firebaseUID: string): Promise<AccusationResponseDto[]> {
    const snapshot = await this.usersCollection.where('firebaseUID', '==', firebaseUID).limit(1).get();
    if(snapshot.empty) {
        throw new NotFoundException(`User not found`);
    }

    const query = {defendantId: snapshot.docs[0].id};
    return this.accusationService.listAccusations(query as AccusationFilterDto);
  }
}
