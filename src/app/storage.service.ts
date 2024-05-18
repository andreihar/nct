import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Location } from './Location';
import { Report } from './Report';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    locations:Location[] = new Array()
    reports:Report[] = new Array()
    constructor(private firestore: AngularFirestore) { }

    getReports(): Observable<Report[] | undefined> {
        return this.firestore.doc<{reports: Report[]}>('nct/reports').valueChanges()
            .pipe(map(data => data?.reports));
    }

    getObservable(document:string): Observable<Object[] | undefined> {
        return this.firestore.doc<{items: Object[]}>('nct/' + document).valueChanges()
            .pipe(map(data => data?.items));
    }

    updateDocument(document: string, data: string) {
        this.firestore.doc('nct/' + document).set({items: JSON.parse(data)});
    }
}
