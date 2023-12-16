import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HashService {

    constructor(private http:HttpClient) { }

    MD5Observable(input:string):Observable<Object> {
        return this.http.get('https://api.hashify.net/hash/md5/hex?value=' + input)
    }
}
