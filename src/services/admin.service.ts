import {Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { db } from '../config/firebaseConfig';
import * as ExcelJS from 'exceljs';
import { promises as fs } from 'node:fs';
import { join, dirname } from 'node:path';
import { randomUUID } from 'node:crypto';
import { UserService } from './user.service';

@Injectable()
export class AdminService {
    private readonly accusationsCollection = db.collection('accusations');
    constructor(private readonly userService: UserService) {}
    
    async createCourtList(): Promise<any> {
        const allValidAccSnapshots = await this.accusationsCollection.where('courtId', '==', -1).where('valid', '==', true).get();
        const srcPath = join(process.cwd(), 'src', 'excel', 'courtListTemplate.xlsx');
        const outPath = join(process.cwd(), 'src', 'excel', `courtList-${randomUUID()}.xlsx`);
        console.log(srcPath);

        const wb = new ExcelJS.Workbook();
        await wb.xlsx.readFile(srcPath);   

        const ws = wb.getWorksheet("Sheet1");

        let defendantName = await Promise.all(allValidAccSnapshots.docs.map(doc => this.userService.getUsername(doc.data().defendantId)));
        let accuserName = await Promise.all(allValidAccSnapshots.docs.map(doc => this.userService.getUsername(doc.data().accuserId)));

        defendantName.sort((a, b) => a.localeCompare(b, 'ko'));
        accuserName.sort((a, b) => a.localeCompare(b, 'ko'));


        allValidAccSnapshots.docs.forEach(async (doc, index) => {
            ws!.insertRow(10 + index, ["", "", defendantName[index], new Date(doc.data().date).toLocaleDateString("en-US"), accuserName[index], doc.data().article, doc.data().penaltyPoints]);
        });

        for(let i = 1; i <= 8; i++) {
            ws!.getColumn(i).font = {name: "Calibri", size: 10};
        };

        let prev = defendantName[0];
        let prevIdx = 0;
        for(let i = 1; i < defendantName.length; i++) {
            if(defendantName[i] !== prev) {
                console.log(`C${10 + prevIdx}:C${10 + i-1}`);
                ws!.mergeCells(`C${10 + prevIdx}:C${10 + i-1}`);
                prev = defendantName[i];
                prevIdx = i;
            }
        }
        console.log(`C${10 + prevIdx}:C${10 + defendantName.length-1}`);
        ws!.mergeCells(`C${10 + prevIdx}:C${10 + defendantName.length-1}`);

        await wb.xlsx.writeFile(outPath); 

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

    async createSecondCourtList(): Promise<any> {
        return await this.createCourtList();
    }
}
