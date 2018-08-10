
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class imageUploadService {
    constructor(
        private http: Http,
    ) {
    }
    post(
        image: any
    ): Observable<any> {
        const endpoint = 'http://task.taj-it.com/api/UploadImage';
        const formData: FormData = new FormData();
        formData.append('image', image, image.name);
        return this.http
            .post(endpoint, formData)
            .pipe(map(res => {
                return { res: res };
            }))
    }
}