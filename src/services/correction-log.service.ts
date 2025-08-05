import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../config/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { CreateCorrectionLogDto, CorrectionLogResponseDto } from '../dto/correction-log.dto';


@Injectable()
export class CorrectionLogService {
  private readonly correctionLogsCollection = 'correctionLogs';

  async getCorrectionLog(id: string): Promise<CorrectionLogResponseDto> {
    const correctionLogDoc = await getDoc(doc(db, this.correctionLogsCollection, id));
    if (!correctionLogDoc.exists()) {
      throw new NotFoundException(`Correction Log with ID ${id} not found`);
    }

    return {
      _id: correctionLogDoc.id,
      ...correctionLogDoc.data(),
    } as CorrectionLogResponseDto;
  }

  async listCorrectionLogs(): Promise<CorrectionLogResponseDto[]> {
    const snapshot = await getDocs(collection(db, this.correctionLogsCollection));
    return snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    })) as CorrectionLogResponseDto[];
  }

  async createCorrectionLog(createCorrectionLogDto: CreateCorrectionLogDto): Promise<CorrectionLogResponseDto> {
    const correctionLogDoc = doc(collection(db, this.correctionLogsCollection));
    
    const correctionLogData = {
      ...createCorrectionLogDto,
    };

    await setDoc(correctionLogDoc, correctionLogData);

    return {
      _id: correctionLogDoc.id,
    } as CorrectionLogResponseDto;
  }

 

  async deleteCorrectionLog(id: string): Promise<void> {
    const correctionLogDoc = doc(db, this.correctionLogsCollection, id);
    const correctionLogSnapshot = await getDoc(correctionLogDoc);

    if (!correctionLogSnapshot.exists()) {
      throw new NotFoundException(`Correction Log with ID ${id} not found`);
    }

    await deleteDoc(correctionLogDoc);
  }
}
