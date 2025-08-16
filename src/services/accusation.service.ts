import {Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { db } from '../config/firebaseConfig';
import {CreateAccusationDto, UpdateAccusationDto, AccusationResponseDto, AccusationFilterDto} from '../dto/accusation.dto';

@Injectable()
export class AccusationService {
  private readonly accusationsCollection = db.collection('accusations');

  async getAccusation(id: string): Promise<AccusationResponseDto> {
    const snapshot = await this.accusationsCollection.doc(id).get();

    if (!snapshot.exists) {
      throw new NotFoundException(`Accusation with ID ${id} not found`);
    }

    return {
      _id: snapshot.id,
      ...snapshot.data(),
    } as AccusationResponseDto;
  }

  async listAccusations(
    filters: AccusationFilterDto,
  ): Promise<AccusationResponseDto[]> {

    let query: FirebaseFirestore.Query = this.accusationsCollection;
    if(filters.startDate !== undefined) query = query.where('date', '>=', new Date(filters.startDate));
    if(filters.endDate !== undefined) query = query.where('date', '<=', new Date(filters.endDate));
    if(filters.valid !== undefined) query = query.where('valid', '==', filters.valid);
    if(filters.accuserId !== undefined) query = query.where('accuserId', '==', filters.accuserId);
    if(filters.studentId !== undefined) query = query.where('studentId', '==', filters.studentId);
    if(filters.courtId !== undefined) query = query.where('courtId', '==', filters.courtId);

    const snapshot = await query.get();

    return snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    })) as AccusationResponseDto[];
  }

  async updateAccusation(
    id: string,
    updateAccusationDto: UpdateAccusationDto,
  ): Promise<AccusationResponseDto> {
    const docRef = this.accusationsCollection.doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      throw new NotFoundException(`Accusation with ID ${id} not found`);
    }

    const updateData = { ...updateAccusationDto } as { [key: string]: any };
    await docRef.update(updateData);

    const updatedDoc = await docRef.get();
    return {
      _id: updatedDoc.id,
      ...updatedDoc.data(),
    } as AccusationResponseDto;
  }

  async deleteAccusation(id: string): Promise<void> {
    const docRef = this.accusationsCollection.doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      throw new NotFoundException(`Accusation with ID ${id} not found`);
    }

    await docRef.delete();
  }
}
