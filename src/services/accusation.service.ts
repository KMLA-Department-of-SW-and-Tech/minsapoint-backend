import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { db } from '../config/firebaseConfig';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  QueryConstraint,
} from 'firebase/firestore';
import {
  CreateAccusationDto,
  UpdateAccusationDto,
  AccusationResponseDto,
  AccusationFilters,
} from '../dto/accusation.dto';

@Injectable()
export class AccusationService {
  private readonly accusationsCollection = 'accusations';

  async getAccusation(id: string): Promise<AccusationResponseDto> {
    const accusationDoc = await getDoc(doc(db, this.accusationsCollection, id));
    
    if (!accusationDoc.exists()) {
      throw new NotFoundException(`Accusation with ID ${id} not found`);
    }

    return {
      _id: accusationDoc.id,
      ...accusationDoc.data(),
    } as AccusationResponseDto;
  }

  async listAccusations(
    filters: AccusationFilters,
  ): Promise<AccusationResponseDto[]> {
    const conditions: QueryConstraint[] = [];

    // Add date range conditions if provided
    if (filters.startDate) {
      conditions.push(where('date', '>=', filters.startDate));
    }
    if (filters.endDate) {
      conditions.push(where('date', '<=', filters.endDate));
    }

    // Add valid status condition if provided
    if (filters.valid !== undefined) {
      conditions.push(where('valid', '==', filters.valid));
    }

    // Add accuser filter if provided
    if (filters.accuserId) {
      conditions.push(where('accuserId', '==', filters.accuserId));
    }

    // Add student (defendant) filter if provided
    if (filters.studentId) {
      conditions.push(where('defendantId', '==', filters.studentId));
    }

    // If no date range is provided, default to current week
    if (!filters.startDate && !filters.endDate) {
      const today = new Date();
      const startOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay()),
      );
      startOfWeek.setHours(0, 0, 0, 0);
      conditions.push(where('date', '>=', startOfWeek.toISOString()));
    }

    // Create query
    const q = conditions.length > 0
      ? query(collection(db, this.accusationsCollection), ...conditions)
      : collection(db, this.accusationsCollection);

    // Execute query
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    })) as AccusationResponseDto[];
  }

  async createAccusation(
    createAccusationDto: CreateAccusationDto,
  ): Promise<AccusationResponseDto> {
    const accusationDoc = doc(collection(db, this.accusationsCollection));
    
    const accusationData = {
      ...createAccusationDto,
      valid: false, // New accusations are invalid by default
    };

    await setDoc(accusationDoc, accusationData);

    return {
      _id: accusationDoc.id,
      ...accusationData,
    } as AccusationResponseDto;
  }

  async updateAccusation(
    id: string,
    updateAccusationDto: UpdateAccusationDto,
  ): Promise<AccusationResponseDto> {
    const accusationDoc = doc(db, this.accusationsCollection, id);
    const accusationSnapshot = await getDoc(accusationDoc);

    if (!accusationSnapshot.exists()) {
      throw new NotFoundException(`Accusation with ID ${id} not found`);
    }

    const updateData = { ...updateAccusationDto } as { [key: string]: any };
    await updateDoc(accusationDoc, updateData);

    const updatedDoc = await getDoc(accusationDoc);
    return {
      _id: updatedDoc.id,
      ...updatedDoc.data(),
    } as AccusationResponseDto;
  }

  async deleteAccusation(id: string): Promise<void> {
    const accusationDoc = doc(db, this.accusationsCollection, id);
    const accusationSnapshot = await getDoc(accusationDoc);

    if (!accusationSnapshot.exists()) {
      throw new NotFoundException(`Accusation with ID ${id} not found`);
    }

    await deleteDoc(accusationDoc);
  }

  async createAccusationFromForm(
    createAccusationDto: CreateAccusationDto,
  ): Promise<AccusationResponseDto> {
    return this.createAccusation(createAccusationDto);
  }

  async createAccusationsFromFile(
    file: Express.Multer.File,
  ): Promise<AccusationResponseDto[]> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      // Parse file content (assuming CSV format)
      const content = file.buffer.toString();
      const rows = content.split('\n').slice(1); // Skip header row
      
      const createdAccusations: AccusationResponseDto[] = [];

      for (const row of rows) {
        if (!row.trim()) continue;
        
        const [accuserId, defendantId, date, article, schoolPoints, dormPoints, totalPoints] = row.split(',');
        
        const accusationDto: CreateAccusationDto = {
          accuserId: accuserId.trim(),
          defendantId: defendantId.trim(),
          date: date.trim(),
          article: article.trim(),
          schoolPoints: Number(schoolPoints),
          dormPoints: Number(dormPoints),
          totalPoints: Number(totalPoints),
        };

        const accusation = await this.createAccusation(accusationDto);
        createdAccusations.push(accusation);
      }

      return createdAccusations;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException('Failed to process file: ' + errorMessage);
    }
  }
}
