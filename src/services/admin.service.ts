import {Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { db } from '../config/firebaseConfig';

@Injectable()
export class AdminService {
    private readonly accusationsCollection = db.collection('accusations');
    
    async createCourtList(): Promise<any> {
        const allValidAccSnapshots = await this.accusationsCollection.where('courtId', '==', -1).where('valid', '==', true).get();
        return allValidAccSnapshots.docs.map((doc) => ({
            _id: doc.id,
            ...doc.data(),
        }));
    }

    async createFirstCourtList(): Promise<any> {
        //change all null courtIDs to -1
        const allAccSnapshots = await this.accusationsCollection.where('courtId', '==', null).get();
        allAccSnapshots.docs.forEach(async (doc) => {
            await this.accusationsCollection.doc(doc.id).update({ courtId: -1 });
        });

        return await this.createCourtList();
    }
}
