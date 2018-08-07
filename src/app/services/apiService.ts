import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
    baseUrl: string;
    subUrl: string;

    constructor(
        private http: Http,
    ) {
        this.baseUrl = 'http://task.taj-it.com/api'
    }

    postItem(
        subUrl: string,
        data: any,
        contentType = 'application/json',
    ): Observable<any> {
        let headers = new Headers({ 'Content-Type': contentType });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(data);

        return this.http
            .post(this.baseUrl + subUrl, body, options)
            .pipe(map(res => {
                return { status: res.status, data: res.json() };
            }))
    }
    updateItem(
        subUrl: string,
        data: any,
        contentType = 'application/json',
    ): Observable<any> {
        let headers = new Headers({ 'Content-Type': contentType });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(data);

        return this.http
            .put(this.baseUrl + subUrl, body, options)
            .pipe(map(res => {
                return { status: res.status, data: res.json() };
            }))
    }
    deleteItem(
        subUrl: string,
        contentType = 'application/json',
    ): Observable<any> {
        let headers = new Headers({ 'Content-Type': contentType });
        let options = new RequestOptions({ headers: headers });
        return this.http
            .delete(this.baseUrl + subUrl, options)
            .pipe(map(res => {
                return { status: res.status, data: res.json() };
            }))
    }
    getData(subUrl: string): Observable<any> {
        let headers = new Headers()

        let options = new RequestOptions({ headers: headers })

        return this.http
            .get(this.baseUrl + subUrl, options)
            .pipe(map(res => {
                return { status: res.status, data: res.json() }
            }))
    }


}
