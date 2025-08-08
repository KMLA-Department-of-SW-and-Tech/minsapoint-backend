import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../config/firebaseConfig';
import * as admin from 'firebase-admin';
import { CreateCorrectionLogDto, CorrectionLogResponseDto } from '../dto/correction-log.dto';

@Injectable()
export class CorrectionLogService {
  private readonly correctionLogsCollection = 'correctionLogs';

  // get a single correction log with id
  async getCorrectionLog(id: string): Promise<CorrectionLogResponseDto> {
    const correctionLogDoc = await db.collection(this.correctionLogsCollection).doc(id).get();
    if(!correctionLogDoc.exists){
      throw new NotFoundException("CORRECTION LOG NOT FOUND");
    }
    return {
      _id: correctionLogDoc.id,
      ...correctionLogDoc.data(),
    } as CorrectionLogResponseDto;
  }


  // get all correction logs
  async listCorrectionLogs(): Promise<CorrectionLogResponseDto[]> {
    const snapshot = await db.collection(this.correctionLogsCollection).get();
    return snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    })) as CorrectionLogResponseDto[];
  }


  // create a single correction log
  async createCorrectionLog(dto: CreateCorrectionLogDto): Promise<CorrectionLogResponseDto> {
    const docRef = await db.collection(this.correctionLogsCollection).add(dto);
    const now = admin.firestore.FieldValue.serverTimestamp();
    await docRef.set({...dto, date: now})
    return {
      _id: docRef.id,
      ...dto
    };
  }

  // delete a single correction log
  async deleteCorrectionLog(id: string): Promise<void> {
    await db.collection(this.correctionLogsCollection).doc(id).delete();
  }
}


// if the accuser change 'valid' field, should we also make the a correction log allong with alarm log? 
// if we make correction log for them either, the authorization logic will get futher complex(YK)