import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../config/firebaseConfig';
import * as admin from 'firebase-admin';
import { CreateAlarmLogDto, AlarmLogResponseDto } from '../dto/alarm-log.dto';

@Injectable()
export class AlarmLogService {
  private readonly alarmLogsCollection = db.collection('alarmLogs');

  // get a single alarm log with id
  async getAlarmLog(id: string): Promise<AlarmLogResponseDto> {
    const alarmLogDoc = await this.alarmLogsCollection.doc(id).get();
    if(!alarmLogDoc.exists){
      throw new NotFoundException("alarm log is not found");
    }
    return {
      _id: alarmLogDoc.id,
      ...alarmLogDoc.data(),
    } as AlarmLogResponseDto;
  }


  // get all alarm logs
  async listAlarmLogs(): Promise<AlarmLogResponseDto[]> {
    const snapshot = await this.alarmLogsCollection.get();
    return snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...doc.data(),
    })) as AlarmLogResponseDto[];
  }

  // create a single alarm log
  async createAlarmLog(dto: CreateAlarmLogDto): Promise<AlarmLogResponseDto> {
    const now = new Date();//admin.firestore.FieldValue.serverTimestamp();
    const docRef = await this.alarmLogsCollection.add({
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

  async markAsRead(id: string): Promise<AlarmLogResponseDto> {
    const alarmLogDoc = this.alarmLogsCollection.doc(id);
    await alarmLogDoc.update({isRead: true});
    return this.getAlarmLog(id);
  }

  // delete a single alarm log
  async deleteAlarmLog(id: string): Promise<void> {
    await this.alarmLogsCollection.doc(id).delete();
  }
}
