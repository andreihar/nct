import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Location } from './Location';
import { Report } from './Report';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    locations:Location[] = new Array()
    reports:Report[] = new Array()
    server:string = 'https://272.selfip.net/apps/4MUGoCA0QP/collections/nct2/documents/'
    constructor(private http:HttpClient) { }

    getReports():Report[] {
        this.http.get(this.server + 'reports/').subscribe((data:any) => {this.reports = JSON.parse(data.data)})
        return this.reports
    }

    getObservable(document:string):Observable<Object> {
        return this.http.get(this.server + document + '/')
    }

    updateDocument(document: string, data: string) {
        this.http.put(this.server + document + '/', { "key": document, "data": data }).subscribe();
    }
}
