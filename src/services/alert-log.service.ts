import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../config/firebaseConfig';
import * as admin from 'firebase-admin';
import { CreateAlertLogDto, AlertLogResponseDto } from '../dto/alert-log.dto';

@Injectable()
export class AlertLogService {
  private readonly alertLogsCollection = db.collection('alertLogs');

  // get a single alert log with id
  async getAlertLog(id: string): Promise<AlertLogResponseDto> {
    const alertLogDoc = await this.alertLogsCollection.doc(id).get();
    if(!alertLogDoc.exists){
      throw new NotFoundException("alert log is not found");
    }
    return {
      _id: alertLogDoc.id,
      ...alertLogDoc.data(),
    } as AlertLogResponseDto;
  }


  // get all alert logs
  async listAlertLogs(): Promise<AlertLogResponseDto[]> {
    const snapshot = await this.alertLogsCollection.get();
    return snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    })) as AlertLogResponseDto[];
  }

  // create a single alert log
  async createAlertLog(dto: CreateAlertLogDto): Promise<AlertLogResponseDto> {
    const now = new Date();//admin.firestore.FieldValue.serverTimestamp();
    const docRef = await this.alertLogsCollection.add({
      date: String(now), 
      isRead: false,
      ...dto
    });
    return {
      _id: docRef.id,
      isRead: false,
      date: String(now),
      ...dto
    };
  }

  async markAsRead(id: string): Promise<AlertLogResponseDto> {
    const alertLogDoc = this.alertLogsCollection.doc(id);
    await alertLogDoc.update({isRead: true});
    return this.getAlertLog(id);
  }

  // delete a single alert log
  async deleteAlertLog(id: string): Promise<void> {
    await this.alertLogsCollection.doc(id).delete();
  }
}
